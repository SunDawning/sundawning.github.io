获取随机可用的端口

2022-06-05 21:38:15

# 安装

```sh
pnpm add @sundawning/get-random-port
```

# 使用

```js
const get_random_port = require("@sundawning/get-random-port");
const log = require("@sundawning/console-log-timestamp");
index();
async function index() {
  log(await get_random_port());
  log(await get_random_port());
}
```

```
[2022/6/5 21:36:04] 5294
[2022/6/5 21:36:04] 57796
```
