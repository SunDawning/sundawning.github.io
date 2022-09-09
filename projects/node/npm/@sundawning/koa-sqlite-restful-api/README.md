使用 Koa 来启动 HTTP 服务器，使用 SQLite 作为数据库，来提供 RESTful API。

2022-09-09 21:48:08

# 安装

```sh
pnpm add @sundawning/koa-sqlite-restful-api
```

# 使用

```js
const KoaSQLiteRESTfulAPI = require("@sundawning/koa-sqlite-restful-api");
const path = require("path");
KoaSQLiteRESTfulAPI.start({
  koa: {
    port: 8080,
  },
  sqlite: {
    filename: path.resolve(__dirname, "./database.db"),
    table_name: "todos",
  },
});
```

执行后将启动服务器并打印出：

```
app.listen(8080)
```

- Koa 接口服务器的地址为：http://localhost:8080
- SQLite 数据库文件在 database.db

## POST /api/todos

POST http://localhost:8080/api/todos

```json
{
  "title": "title",
  "content": "content"
}
```

将打印出：

```
[2022/9/9 21:48:42] POST /api/todos PostmanRuntime/7.29.2
[2022/9/9 21:48:42] post_data {
    "title": "title",
    "content": "content"
}
```

并返回：

```json
{
  "key": 1,
  "title": "title",
  "content": "content"
}
```

## GET /api/todos?current=1&pageSize=10

GET http://localhost:8080/api/todos?current=1&pageSize=10

打印出：

```
[2022/9/9 21:51:59] GET /api/todos?current=1&pageSize=10 PostmanRuntime/7.29.2
```

返回：

```json
{
  "pagination": {
    "current": 1,
    "pageSize": 10,
    "pageTotal": 1,
    "total": 1
  },
  "dataSource": [
    {
      "key": 1,
      "title": "title",
      "content": "content"
    }
  ]
}
```

## GET /api/todos/:key

GET http://localhost:8080/api/todos/1

打印出：

```
[2022/9/9 21:53:05] GET /api/todos/1 PostmanRuntime/7.29.2
```

返回：

```json
{
  "key": 1,
  "title": "title",
  "content": "content"
}
```

## PATCH /api/todos/:key

DELETE http://localhost:8080/api/todos/1

```json
{
  "content": "_content",
  "deleted": true
}
```

打印出：

```
[2022/9/9 21:56:09] PATCH /api/todos/1 PostmanRuntime/7.29.2
[2022/9/9 21:56:09] post_data {
    "content": "_content",
    "deleted": true
}
```

返回：

```json
{
  "key": 1,
  "title": "title",
  "content": "_content",
  "deleted": "true"
}
```

## DELETE /api/todos/:key

DELETE http://localhost:8080/api/todos/1

打印出：

```
[2022/9/9 22:00:16] DELETE /api/todos/1 PostmanRuntime/7.29.2
```

返回状态码 204
