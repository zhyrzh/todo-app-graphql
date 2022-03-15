const Todo = require("./todo");

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

module.exports = [typeDef, Todo];
