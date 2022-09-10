使用 pm2 来运行@sundawning/koa-sqlite-restful-api

2022-09-10 11:15:18

# 安装

```sh
pnpm add @sundawning/pm2-koa-sqlite-restful-api @sundawning/koa-sqlite-restful-api
```

# 使用

```js
const PM2KoaSQLiteRESTfulAPI = require("@sundawning/pm2-koa-sqlite-restful-api");
const path = require("path");
PM2KoaSQLiteRESTfulAPI.start({
  pm2: { cwd: __dirname },
  koa: {
    port: 8080,
  },
  sqlite: {
    filename: path.resolve(__dirname, "./database.db"),
    table_name: "todos",
  },
});
```

第一次执行：

```
正在运行 []
启动 nginxTODOSServer
{
  script: 'pm2-koa-sqlite-restful-api\
i\\.temporary\\nginxTODOSServer.js',
  name: 'nginxTODOSServer',
  cwd: 'pm2-koa-sqlite-restful-api',

  args: undefined,
  env: { io: undefined },
  username: 'username',
  merge_logs: true
}
```

会在当前目录 cwd 下创建“.temporary/nginxTODOSServer.js”临时文件和“database.db”数据库文件。

第二次执行时:

```
正在运行 [ 'nginxTODOSServer' ]
```
