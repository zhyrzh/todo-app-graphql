const { ApolloServer, gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { merge } = require("lodash");
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema: schema });

server.listen({ port: 3000 }).then((data) => console.log(data));
