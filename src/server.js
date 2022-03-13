const { ApolloServer, gql } = require("apollo-server");
const { v4 } = require("uuid");

const todoList = [];

const typeDefs = gql`
  type Todo {
    id: String!
    todo: String!
  }

  type Query {
    getTodo: [Todo!]!
  }

  type Mutation {
    addTodo(todo: String!): [Todo!]!
  }
`;

const resolvers = {
  Query: {
    getTodo: () => todoList,
  },
  Mutation: {
    addTodo: (parents, args, context, info) => {
      const { todo } = args;
      const createdTodo = {
        id: v4(),
        todo,
      };
      todoList.push(createdTodo);
      return todoList;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 3000 }).then((data) => console.log(data));
