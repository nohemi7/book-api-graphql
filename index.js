const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLScalarType
} = require('graphql');
// const db = require('./database');

// DUMMY DATA
const authors = [
    { id: 1, name: 'J.R.R Tolkien' },
    { id: 2, name: 'Robin Hobb' },
    { id: 3, name: 'Andrzej Sapkowski' }
]

const books = [
    { id: 1, title: 'The Fellowship of the Ring', authorId: 1 },
    { id: 2, title: 'The Two Towers', authorId: 1 },
    { id: 3, title: 'The Return of the King', authorId: 1 },
    { id: 4, title: 'The Last Wish', authorId: 2 },
    { id: 5, title: 'Sword of Destiny', authorId: 2 },
    { id: 6, title: 'Blood of Elves', authorId: 2 },
    { id: 7, title: 'Baptism of Fire', authorId: 2 },
    { id: 8, title: 'Assassin\'s Apprentice', authorId: 3 }
]

// Init express app
const app = express();
const PORT = 1001;

// Custom ObjectTypes
const bookType = new GraphQLObjectType ({
    name: 'book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: { 
            type: authorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        } 
    })
});

const authorType = new GraphQLObjectType ({
    name: 'author',
    description: 'This represents an author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(bookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
        
    })
});

// Root
const root = new GraphQLObjectType ({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: bookType,
            description: 'A single book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(bookType),
            description: 'A list of all books',
            // This resolve is where we would query our db for the list of books
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(authorType),
            description: 'A list of all authors',
            // This resolve is where we would query our db for the list of books
            resolve: () => authors
        },
        author: {
            type: authorType,
            description: 'A single authors',
            args: {
                id: { type: GraphQLInt }
            },
            // This resolve is where we would query our db for the list of books
            resolve: (parent, args) => authors.find(author => authors.id === args.id)
        }
    })
});

// Define a schema
const schema = new GraphQLSchema ({
    query: root
});

// Route
app.use('/graphql', graphqlHTTP ({
    schema: schema,
    graphiql: true
}));


// Listen on port for GraphQL requests
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});