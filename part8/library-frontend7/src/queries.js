import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    id
    genres
  }
`;

export const ALL_BOOKS = gql`
  query allBooksByVariable($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBookByVariable(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_AUTHOR = gql`
  mutation updateAuthorByVariable($name: String!, $year: Int) {
    editAuthor(name: $name, bornYear: $year) {
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation loginByVariables($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBookByVariable($id: String!) {
    removeBook(id: $id) {
      id
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_DELETED = gql`
  subscription {
    bookDeleted {
      id
    }
  }
`;
