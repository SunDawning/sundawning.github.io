将 pm2 的操作转为 async

2022-09-08 22:08:38

# 安装

```sh
pnpm add @sundawning/pm2-async
```

# 使用

```js
const pm2 = require("@sundawning/pm2-async");
async function index() {
  await pm2.connect();
  console.log("list", await pm2.list());
  await pm2.disconnect();
}
index();
```

将打印出：

```
list [
  {
    pid: 12812,
    name: 'index',
    pm2_env: {
      kill_retry_time: 100,
      windowsHide: true,
      ...
      unstable_restarts: 0,
      version: '1.0.0',
      node_version: '18.0.0',
      versioning: [Object],
      exit_code: 0
    },
    pm_id: 0,
    monit: { memory: 43708416, cpu: 0 }
  }
]
```
