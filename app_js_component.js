import React, { useState, useEffect } from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, Button, Heading, Text, TextField, View, Card } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote, deleteNote, updateNote } from './graphql/mutations';
import { onCreateNote, onDeleteNote, onUpdateNote } from './graphql/subscriptions';

const initialFormState = { name: '', description: '' };

function App({ signOut, user }) {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
    
    // Set up real-time subscriptions
    const createSubscription = API.graphql(graphqlOperation(onCreateNote)).subscribe({
      next: (noteData) => {
        const newNote = noteData.value.data.onCreateNote;
        setNotes(prevNotes => [...prevNotes, newNote]);
      }
    });

    const deleteSubscription = API.graphql(graphqlOperation(onDeleteNote)).subscribe({
      next: (noteData) => {
        const deletedNote = noteData.value.data.onDeleteNote;
        setNotes(prevNotes => prevNotes.filter(note => note.id !== deletedNote.id));
      }
    });

    const updateSubscription = API.graphql(graphqlOperation(onUpdateNote)).subscribe({
      next: (noteData) => {
        const updatedNote = noteData.value.data.onUpdateNote;
        setNotes(prevNotes => 
          prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note)
        );
      }
    });

    // Cleanup subscriptions
    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
      updateSubscription.unsubscribe();
    };
  }, []);

  async function fetchNotes() {
    try {
      const apiData = await API.graphql(graphqlOperation(listNotes));
      const notesFromAPI = apiData.data.listNotes.items;
      setNotes(notesFromAPI);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async function createNoteHandler() {
    try {
      if (!formData.name || !formData.description) {
        alert('Please fill in both name and description');
        return;
      }

      await API.graphql(graphqlOperation(createNote, {
        input: formData
      }));
      
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  }

  async function deleteNoteHandler(id) {
    try {
      await API.graphql(graphqlOperation(deleteNote, {
        input: { id }
      }));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  async function updateNoteHandler() {
    try {
      if (!formData.name || !formData.description) {
        alert('Please fill in both name and description');
        return;
      }

      await API.graphql(graphqlOperation(updateNote, {
        input: {
          id: editingNote.id,
          name: formData.name,
          description: formData.description
        }
      }));
      
      setFormData(initialFormState);
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  function editNote(note) {
    setEditingNote(note);
    setFormData({ name: note.name, description: note.description });
  }

  function cancelEdit() {
    setEditingNote(null);
    setFormData(initialFormState);
  }

  return (
    <View className="App">
      <Card>
        <View padding="1rem">
          <Heading level={1}>My Notes App</Heading>
          <Text>Welcome {user.username}!</Text>
          <Button onClick={signOut} variation="link">Sign out</Button>
        </View>
      </Card>

      <Card variation="outlined" marginTop="1rem">
        <View padding="1rem">
          <Heading level={2}>
            {editingNote ? 'Edit Note' : 'Create Note'}
          </Heading>
          
          <TextField
            label="Note Name"
            placeholder="Enter note name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            marginBottom="1rem"
          />
          
          <TextField
            label="Note Description"
            placeholder="Enter note description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            marginBottom="1rem"
            isMultiline={true}
            rows={3}
          />
          
          <View>
            {editingNote ? (
              <>
                <Button onClick={updateNoteHandler} marginRight="0.5rem">
                  Update Note
                </Button>
                <Button onClick={cancelEdit} variation="secondary">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={createNoteHandler}>
                Create Note
              </Button>
            )}
          </View>
        </View>
      </Card>

      <View marginTop="2rem">
        <Heading level={2}>Notes ({notes.length})</Heading>
        
        {notes.length === 0 ? (
          <Card variation="outlined" marginTop="1rem">
            <View padding="2rem" textAlign="center">
              <Text>No notes yet. Create your first note above!</Text>
            </View>
          </Card>
        ) : (
          <View>
            {notes.map((note) => (
              <Card key={note.id} variation="outlined" marginTop="1rem">
                <View padding="1rem">
                  <Heading level={3}>{note.name}</Heading>
                  <Text marginBottom="1rem">{note.description}</Text>
                  <Text fontSize="0.8rem" color="var(--amplify-colors-neutral-60)">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                  </Text>
                  <Text fontSize="0.8rem" color="var(--amplify-colors-neutral-60)">
                    Updated: {new Date(note.updatedAt).toLocaleDateString()}
                  </Text>
                  
                  <View marginTop="1rem">
                    <Button 
                      onClick={() => editNote(note)} 
                      size="small"
                      marginRight="0.5rem"
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => deleteNoteHandler(note.id)} 
                      variation="destructive"
                      size="small"
                    >
                      Delete
                    </Button>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}
      </View>

      <Card marginTop="2rem">
        <View padding="1rem" textAlign="center" backgroundColor="var(--amplify-colors-neutral-10)">
          <Text fontSize="0.9rem" color="var(--amplify-colors-neutral-80)">
            Built with AWS Amplify, React, and GraphQL
          </Text>
        </View>
      </Card>
    </View>
  );
}

export default withAuthenticator(App);