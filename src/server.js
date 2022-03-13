const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello worlddd",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(url));
