const { merge } = require("lodash");
const todoResolvers = require("./todo");

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
};

module.exports = merge(resolvers, todoResolvers);
