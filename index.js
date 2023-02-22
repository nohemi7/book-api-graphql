const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define a schema

// Init express app
const app = express();
const PORT = 1001;

// Listen on port for GraphQL requests
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});