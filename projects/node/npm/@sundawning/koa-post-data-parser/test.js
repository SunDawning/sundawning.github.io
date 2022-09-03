const Koa = require("koa");
const app = new Koa();
app.listen(28080);
const parse = require("./index");
app.use(async function (context) {
  const { method, url } = context;
  // POST
  if (method === "POST") {
    // /hello
    if (url.startsWith("/hello")) {
      const body = await parse(context);
      console.log("body", body);
      const json = JSON.parse(body);
      console.log("json", json);
      context.response.body = json;
      return;
    }
    return;
  }
});
