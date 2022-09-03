koa 处理 post 请求

2022-09-03 21:09:23

# 安装

```sh
pnpm add @sundawning/koa-post-data-parser
```

# 使用

启动 HTTP Server：

```js
const Koa = require("koa");
const app = new Koa();
app.listen(28080);
const parse = require("@sundawning/koa-post-data-parser");
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
```

以 POST 方式发送数据：

```
POST http://localhost:28080/hello
Content-Type: application/json; charset=utf-8
{
    "name": "jobsimi"
}
```

Response：

```
{
    "name": "jobsimi"
}
```

在 HTTP Server 里打印出的内容：

```
body {
    "name": "jobsimi"
}
json { name: 'jobsimi' }
```
