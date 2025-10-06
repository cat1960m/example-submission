const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Book = require("./models/Book");
const User = require("./models/User");
const Author = require("./models/Author");
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const resolvers = {
  Book: {
    genresString: (root) => root.genres.join(";"),
    publish: (root) => {
      const data = {
        year: root.published + "____",
        isOld: root.published < 2010,
      };

      return data;
    },
    id: (root) => root._id.toString(),
  },

  Author: {
    bookCount: (root) => {
      const count = root.books?.length;
      return count;
    },
    id: (root) => root._id.toString(),
  },

  Query: {
    booksCount: async () => Book.collection.countDocuments(),
    authorsCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let foundBooks = await Book.find({}).populate("author");

      if (args.author) {
        foundBooks = foundBooks.filter(
          (book) => book.author.name === args.author
        );
      }

      if (args.genre) {
        foundBooks = foundBooks.filter((book) => {
          return book.genres.includes(args.genre);
        });
      }

      return foundBooks;
    },
    allAuthors: async () => {
      return await Author.find({});
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const { title, author, published, genres } = args;

      let bookAuthor = await Author.findOne({ name: author });

      if (!bookAuthor) {
        const newAuthor = new Author({ name: author, books: [] });
        try {
          bookAuthor = await newAuthor.save();
        } catch (error) {
          console.log("error save author", error.toString());
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const newBook = new Book({
        title,
        author: bookAuthor._id,
        published,
        genres,
      });

      try {
        const result = await newBook.save();

        bookAuthor.books = [...bookAuthor.books, result._id];
        await bookAuthor.save();

        const addedBook = await result.populate("author");
        pubsub.publish('BOOK_ADDED', { bookAdded: addedBook })

        return addedBook;


      } catch (error) {
        console.log("error", error.toString());
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const { name, bornYear } = args;
      const author = await Author.findOne({ name });
      if (author) {
        author.born = bornYear;
        try {
          return await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.bornYear],
              error,
            },
          });
        }
      } else {
        throw new GraphQLError("author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: [args.name],
            error: "author not found",
          },
        });
      }
    },

    removeBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        const booksCount1 = await Book.collection.countDocuments();
        const book = await Book.findById(args.id);
        if (!book) {
          return;
        }
        const booksCount2 = await Book.collection.countDocuments();
        console.log("book count", booksCount1, booksCount2);
        const auCount1 = await Author.collection.countDocuments();
        const authorsToUpdate = (await Author.find({})).filter((item) =>
          item.books.find((book) => book.toString() === args.id)
        );
        console.log("authorsToUpdate", authorsToUpdate.length);
        const promises = [];
        for (let i = 0; i < authorsToUpdate.length; i++) {
          authorsToUpdate[i].books = authorsToUpdate[i].books.filter(
            (book) => book.toString() !== args.id
          );
          console.log(
            "authorsToUpdate[i].books.length",
            authorsToUpdate[i].books.length
          );
          if (authorsToUpdate[i].books.length) {
            promises.push(authorsToUpdate[i].save());
            console.log("author saved");
          } else {
            promises.push(authorsToUpdate[i].deleteOne({}));
            console.log("author deleted");
          }
        }
        await Promise.all(promises);
        const auCount2 = await Author.collection.countDocuments();
        console.log("author count", auCount1, auCount2);
        await book.deleteOne({});
        pubsub.publish('BOOK_DELETED', { bookDeleted: {id: args.id }})
        console.log("book deleted");
        return book;
      } catch (error) {
        throw new GraphQLError("delete book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: [args.id],
            error,
          },
        });
      }
    },

    createUser: async (root, args) => {
      const { username, password } = args;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ username, passwordHash });
      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("save user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: [args.username, args.password],
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const { username, password } = args;
      const userFound = await User.findOne({ username });

      const isPasswordCorrect = userFound
        ? await bcrypt.compare(password, userFound.passwordHash)
        : false;

      if (isPasswordCorrect) {
        const userForToken = {
          username: userFound.username,
          id: userFound._id,
        };

        console.log("userForToken", userForToken);
        const token = jwt.sign(userForToken, process.env.JWT_SECRET);
        return { value: token };
      } else {
        throw new GraphQLError("login failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
    bookDeleted: {
      subscribe: () => pubsub.asyncIterator('BOOK_DELETED')
    },
  },
};

module.exports = resolvers;
