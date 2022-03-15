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

module.exports = typeDefs;
