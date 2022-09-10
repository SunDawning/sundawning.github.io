使用 pm2 来运行一段 javascript 文本

2022-09-10 09:48:12

# 安装

```sh
pnpm add @sundawning/pm2-start-javascript
```

# 使用

```js
const pm2 = require("@sundanwing/pm2-start-javascript");
pm2.start({
  name: "hello",
  javascript: `require("child_process").exec("npx http-server");`,
});
```

将在当前目录 cwd 创建“.temporary/hello.js”文件，内容是 javascript 文本，并在 pm2 里运行且名称是“hello”。
