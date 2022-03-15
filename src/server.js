const { ApolloServer, gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { merge } = require("lodash");
const {
  typeDefs: todoSchema,
  resolvers: todoResolvers,
} = require("./schemas/todo");

const typeDef = `
union ResponseData = SuccessResponse | ErrorResponse
  type Query {
    getTodos: ResponseData
  }

  type Mutation {
    addTodo(todo: String): ResponseData!
    updateTodo(todoInfo: TodoInfo!): ResponseData!
    deleteTodo(todoInfo: TodoInfo!): ResponseData!
    getSpecificTodo(todoInfo: TodoInfo!): ResponseData!
  }

  type SuccessResponse {
    success: Boolean!
    data: [Todo]!
  }

  type ErrorResponse {
    success: Boolean!
    error: String
  }

  
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDef, todoSchema],
  resolvers: merge(todoResolvers),
});

const server = new ApolloServer({ schema: schema });

server.listen({ port: 3000 }).then((data) => console.log(data));
