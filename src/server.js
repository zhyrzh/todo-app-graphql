const { ApolloServer, gql } = require("apollo-server");
const { v4 } = require("uuid");

const todoList = [];

const typeDefs = gql`
  type Todo {
    id: String!
    todo: String!
  }

  type QueryResponse{
    success: Boolean!,
    data: [Todo!]! || Todo!
  }

  type Query {
    getTodos: QueryResponse
  }

  type Mutation {
    addTodo(todo: String!): [Todo!]!
    updateTodo(todoId: String!, updatedtodo: !String): Todo!
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
  updateTodo: (parent, args, context, info) => {
    const { todoId, updatedtodo } = args;

    const toBeUpdatedTodoIndex = todoList.findIndex(
      (todo) => todo.id === todoId
    );
    todoList[toBeUpdatedTodoIndex] = {
      ...todoList[toBeUpdatedTodoIndex],
      todo: updatedtodo,
    };
    return {
      success: true,
      data: todoList[toBeUpdatedTodoIndex],
    };
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 3000 }).then((data) => console.log(data));
