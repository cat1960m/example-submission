
const typeDefs = `

  type Publish {
      year : String!,
      isOld: Boolean,
  }

  type Author {
    name: String
    born: Int
    id: ID!
    bookCount: Int
  }


  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!,
    genres: [String!]!
    genresString: String!
    publish: Publish!
  }

  type User {
    username: String!
    passwordHash: String!
    id:ID!
  }

  type Token {
    value: String!
  }

  type Del {
    id: String!
  }


  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!,
        author: String,
        published: Int!,
        genres:[String!]!
    ): Book

    editAuthor(name: String!, bornYear: Int): Author

    createUser(username: String!, password: String!): User

    login(username: String!, password: String!): Token

    removeBook(id: String!): Book
  }

  type Subscription {
    bookAdded: Book!
    bookDeleted: Del!
  }
`;

module.exports = typeDefs
