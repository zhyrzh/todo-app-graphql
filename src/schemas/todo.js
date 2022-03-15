const { v4 } = require("uuid");
let todoList = [];

const typeDefs = `
  input TodoInfo {
    id: String!
    todo: String!
  }

  type Todo {
    id: String!
    todo: String!
  }
  
`;

const resolvers = {
  ResponseData: {
    __resolveType: (obj) => {
      if (obj.data) {
        return "SuccessResponse";
      }
      if (obj.error) {
        return "ErrorResponse";
      }
      return null;
    },
  },
  Query: {
    getTodos: () => ({
      success: true,
      data: todoList,
    }),
  },
  Mutation: {
    getSpecificTodo: (parents, args, context, info) => {
      const { todoId } = args;
      let isSuccessful;
      let data;
      const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
      if (todoIndex <= -1) {
        isSuccessful = false;
        error = "Todo not found";
      } else {
        isSuccessful = true;
        data = todoList[todoIndex];
      }
      return { success: isSuccessful, data };
    },
    addTodo: (parents, args, context, info) => {
      const { todo } = args;
      let success;
      let data;
      const todoId = v4();
      const createdTodo = {
        id: todoId,
        todo,
      };
      todoList.push(createdTodo);
      const addedTodo = todoList.filter((todo) => todo.id === todoId);

      if (!addedTodo) {
        success = false;
        error = "Todo not added";
      } else {
        success = true;
        data = addedTodo;
      }

      return {
        success,
        data,
      };
    },
    updateTodo: (parent, args, context, info) => {
      const { todoId, updatedtodo } = args;
      let success;
      let data;
      const toBeUpdatedTodoIndex = todoList.findIndex(
        (todo) => todo.id === todoId
      );

      if (toBeUpdatedTodoIndex <= -1) {
        success = false;
        error = "Failed to update todo. Todo not found.";
      } else {
        todoList[toBeUpdatedTodoIndex] = {
          ...todoList[toBeUpdatedTodoIndex],
          todo: updatedtodo,
        };
        success = true;
        data = todoList[toBeUpdatedTodoIndex];
      }

      return { success, data };
    },
    deleteTodo: (parent, args, context, info) => {
      const { todoId } = args;
      let success;
      let data;
      const toBeDeletedTodoIndex = todoList.findIndex(
        (todo) => todo.id === todoId
      );
      if (toBeDeletedTodoIndex <= -1) {
        success = false;
        error = "Failed to delete todo. Todo not found.";
      } else {
        const updatedTodoList = todoList.filter((todo) => todo.id !== todoId);
        todoList = updatedTodoList;
      }

      return { success, data };
    },
  },
};

module.exports = { typeDefs, resolvers };
