SQLite 数据库服务器，用一堆 SQLite 格式的文件来搭建服务器，以 HTTP 的方式来管理数据库。

2022-09-21 20:19:25

# 安装

```sh
pnpm add @sundawning/sqlite-database-server
```

# 使用

启动服务器：

```js
const SQLiteServer = require("@sudnawning/sqlite-database-server");
SQLiteServer.start({
  port: 1234,
});
```

可以处理如下请求：

- POST /api/databases/:database_name

## POST /api/databases/:database_name

查询 hello 数据库的所有表名：

POST /api/databases/hello

Content-Type: application/json

```json
{
  "sql": "SELECT * FROM sqlite_master WHERE type = 'table'"
}
```

会返回：

```json
[
  {
    "type": "table",
    "name": "table_1",
    "tbl_name": "table_1",
    "rootpage": 2,
    "sql": "CREATE TABLE table_1 ( key INTEGER PRIMARY KEY AUTOINCREMENT )"
  },
  {
    "type": "table",
    "name": "sqlite_sequence",
    "tbl_name": "sqlite_sequence",
    "rootpage": 3,
    "sql": "CREATE TABLE sqlite_sequence(name,seq)"
  }
]
```

# 命令行

## 安装

```sh
pnpm add -g @sundawning/sqlite-database-server
```

## 使用

参数与包在代码里的参数保持一致，在命令行中以“--”开头即可。

比如 28080 端口，数据库文件夹在“./files”（默认是“./databases”）：

```sh
sundawning-sqlite-database-server --port 28080 --databases_directory ./files
```
