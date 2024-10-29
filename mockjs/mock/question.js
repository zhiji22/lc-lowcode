const Mock = require("mockjs");
const getQuestionList = require("./data/getQuestionList");

const Random = Mock.Random;

module.exports = [
  {
    // 根据id查找
    url: "/api/question/:id",
    method: "get",
    response() {
      return {
        code: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          componentList: [
            {
              fe_id: Random.id(),
              type: "questionTitle",
              title: "标题",
              props: { text: "个人信息", level: 1, isCenter: false },
            },
            {
              fe_id: Random.id(),
              type: "questionInput",
              title: "输入框",
              props: { text: "input1", placeholder: "请输入..." },
            },
            {
              fe_id: Random.id(),
              type: "questionInput",
              title: "输入框2",
              props: { text: "input2", placeholder: "请输入..." },
            },
          ],
        },
      };
    },
  },
  {
    // 创建
    url: "/api/question",
    method: "post",
    response() {
      return {
        code: 0,
        data: {
          code: 0,
          id: Random.id(),
        },
      };
    },
  },
  {
    // 查询
    url: "/api/question",
    method: "get",
    response(ctx) {
      const { url, query = {} } = ctx;
      // 星标页面请求数据
      const isStar = url.indexOf("isStar=true") >= 0;
      // 回收站页面请求数据
      const isDeleted = url.indexOf("isDeleted=true") >= 0;
      const pageSize = parseInt(query.pageSize) || 10;

      return {
        code: 0,
        data: {
          // 当前页的数据
          list: getQuestionList({ len: pageSize, isStar, isDeleted }),
          total: 100,
        },
      };
    },
  },
  {
    // 部分 更新数据
    url: "/api/question/:id",
    method: "patch",
    response() {
      return {
        code: 0,
        msg: "更新成功",
      };
    },
  },
  {
    // 复制
    url: "/api/question/duplicate/:id",
    method: "post",
    response() {
      return {
        code: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    // 批量删除
    url: "/api/question",
    method: "delete",
    response() {
      return {
        code: 0,
      };
    },
  },
];
