/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput, $owner: String) {
    onCreateNote(filter: $filter, owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput, $owner: String) {
    onUpdateNote(filter: $filter, owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput, $owner: String) {
    onDeleteNote(filter: $filter, owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory(
    $filter: ModelSubscriptionCategoryFilterInput
    $owner: String
  ) {
    onCreateCategory(filter: $filter, owner: $owner) {
      id
      name
      description
      notes {
        items {
          id
          name
          description
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory(
    $filter: ModelSubscriptionCategoryFilterInput
    $owner: String
  ) {
    onUpdateCategory(filter: $filter, owner: $owner) {
      id
      name
      description
      notes {
        items {
          id
          name
          description
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory(
    $filter: ModelSubscriptionCategoryFilterInput
    $owner: String
  ) {
    onDeleteCategory(filter: $filter, owner: $owner) {
      id
      name
      description
      notes {
        items {
          id
          name
          description
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput, $owner: String) {
    onCreateTag(filter: $filter, owner: $owner) {
      id
      name
      color
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput, $owner: String) {
    onUpdateTag(filter: $filter, owner: $owner) {
      id
      name
      color
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput, $owner: String) {
    onDeleteTag(filter: $filter, owner: $owner) {
      id
      name
      color
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onCreateNoteTag = /* GraphQL */ `
  subscription OnCreateNoteTag(
    $filter: ModelSubscriptionNoteTagFilterInput
    $owner: String
  ) {
    onCreateNoteTag(filter: $filter, owner: $owner) {
      id
      noteId
      tagId
      note {
        id
        name
        description
        createdAt
        updatedAt
        owner
      }
      tag {
        id
        name
        color
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onUpdateNoteTag = /* GraphQL */ `
  subscription OnUpdateNoteTag(
    $filter: ModelSubscriptionNoteTagFilterInput
    $owner: String
  ) {
    onUpdateNoteTag(filter: $filter, owner: $owner) {
      id
      noteId
      tagId
      note {
        id
        name
        description
        createdAt
        updatedAt
        owner
      }
      tag {
        id
        name
        color
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const onDeleteNoteTag = /* GraphQL */ `
  subscription OnDeleteNoteTag(
    $filter: ModelSubscriptionNoteTagFilterInput
    $owner: String
  ) {
    onDeleteNoteTag(filter: $filter, owner: $owner) {
      id
      noteId
      tagId
      note {
        id
        name
        description
        createdAt
        updatedAt
        owner
      }
      tag {
        id
        name
        color
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;