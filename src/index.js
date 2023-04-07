const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('graphql-tag');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers/accountResolver');
const sequelize = require('./config/database');

const typeDefs = gql(
  fs.readFileSync(
    path.join(__dirname, './schema/accountSchema.graphql'),
    'utf8'
  )
);

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Create Express app
const app = express();

// Function to start Apollo Server and Express app
async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  // Connect to the database
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection failed:', err);
    });

  // Start Express server
  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT }, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

// Start the server
startServer();
