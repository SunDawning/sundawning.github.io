使用 pm2 启动.js 文件，不重复启动。

2022-09-08 22:36:27

# 安装

```sh
pnpm add @sundawning/pm2-start-js-file
```

# 使用

```js
const pm2 = require("@sundawning/pm2-start-js-file");
const path = require("path");
pm2.start({
  name: "pm2-start-js-file",
  script: path.resolve(__dirname, "./server.js"),
});
```

首次执行时：

```
正在运行 []
启动 pm2-start-js-file
{
  script: '\\@sundawning\\pm2-start-js-file\\server.js',
  name: 'pm2-start-js-file',
  cwd: undefined,
  args: undefined,
  env: { io: undefined },
  username: 'username',
  merge_logs: true
}
```

再次执行时：

```
正在运行 [ 'pm2-start-js-file' ]
```
