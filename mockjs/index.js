const koa = require("koa");
const Router = require("koa-router");
const mockList = require("./mock");

const app = new koa();
const router = new Router();

const getRes = async (fn, ctx) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 500);
  });
};

mockList.forEach((item) => {
  const { url, method, response } = item;
  router[method](url, async (ctx) => {
    const res = await getRes(response, ctx);
    ctx.body = res;
  });
});

app.use(router.routes());
app.listen(3001);
