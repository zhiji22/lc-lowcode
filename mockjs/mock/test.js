const Mock = require("mockjs");

const Random = Mock.Random;

module.exports = [
  {
    url: "/api/test",
    method: "get",
    response() {
      return {
        code: 0,
        data: {
          name: Random.cname(),
        },
      };
    },
  },
];
