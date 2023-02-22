const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const db = require('./database');

// Define a schema
// for now I will use dummy data until I refresh SQL and design schema

// Init express app
const app = express();
const PORT = 1001;

// Listen on port for GraphQL requests
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});