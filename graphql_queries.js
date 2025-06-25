/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;

export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;

export const searchNotes = /* GraphQL */ `
  query SearchNotes(
    $filter: SearchableNoteFilterInput
    $sort: [SearchableNoteSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableNoteAggregationInput]
  ) {
    searchNotes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;

export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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

export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      name
      color
      createdAt
      updatedAt
      owner
    }
  }
`;

export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        color
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const getNoteTag = /* GraphQL */ `
  query GetNoteTag($id: ID!) {
    getNoteTag(id: $id) {
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

export const listNoteTags = /* GraphQL */ `
  query ListNoteTags(
    $filter: ModelNoteTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNoteTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

export const noteTagsByNoteId = /* GraphQL */ `
  query NoteTagsByNoteId(
    $noteId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNoteTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    noteTagsByNoteId(
      noteId: $noteId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;

export const noteTagsByTagId = /* GraphQL */ `
  query NoteTagsByTagId(
    $tagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNoteTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    noteTagsByTagId(
      tagId: $tagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        