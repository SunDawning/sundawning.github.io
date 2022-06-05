查找可用的端口

2022-06-05 21:27:36

# 安装

```sh
pnpm add @sundawning/get-port
```

# 使用

```js
const get_port = require("@sundawning/get-port");
const log = require("@sundawning/console-log-timestamp");
index();
async function index() {
  const port_0 = await get_port();
  log("查找到可用端口", port_0);
  const port_1 = await get_port({ port: port_0 + 1 });
  log("查找到可用端口", port_1);
}
```

```
[2022/6/5 21:29:42] 查找到可用端口 8000
[2022/6/5 21:29:43] 查找到可用端口 8001
```
