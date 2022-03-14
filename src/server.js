const { ApolloServer, gql } = require("apollo-server");
const { v4 } = require("uuid");

let todoList = [];

const typeDefs = gql`
  type Query {
    getTodos: QueryResponse
  }

  type Mutation {
    addTodo(todo: String): QueryResponse!
    updateTodo(todoInfo: TodoInfo!): Todo!
    deleteTodo(todoInfo: TodoInfo!): Todo!
    getSpecificTodo(todoInfo: TodoInfo!): Todo!
  }

  input TodoInfo {
    id: String!
    todo: String!
  }

  type Todo {
    id: String!
    todo: String!
  }

  type QueryResponse {
    success: Boolean!
    data: [Todo!]!
  }
`;

const resolvers = {
  Query: {
    getTodos: () => ({
      success: true,
      data: todoList,
    }),
  },
  Mutation: {
    getSpecificTodo: (parents, args, context, info) => {
      const { todoId } = args;
      const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
      return todoList[todoIndex];
    },
    addTodo: (parents, args, context, info) => {
      const { todo } = args;
      const todoId = v4();
      const createdTodo = {
        id: todoId,
        todo,
      };
      todoList.push(createdTodo);
      const data = todoList.filter((todo) => todo.id === todoId);
      return {
        success: true,
        data,
      };
    },
    updateTodo: (parent, args, context, info) => {
      const { todoId, updatedtodo } = args;
      const toBeUpdatedTodoIndex = todoList.findIndex(
        (todo) => todo.id === todoId
      );
      todoList[toBeUpdatedTodoIndex] = {
        ...todoList[toBeUpdatedTodoIndex],
        todo: updatedtodo,
      };
      return todoList[toBeUpdatedTodoIndex];
    },
    deleteTodo: (parent, args, context, info) => {
      const { todoId, updatedtodo } = args;
      const updatedTodoList = todoList.filter((todo) => todo.id !== todoId);
      todoList = updatedTodoList;
      return todoList;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 3000 }).then((data) => console.log(data));
