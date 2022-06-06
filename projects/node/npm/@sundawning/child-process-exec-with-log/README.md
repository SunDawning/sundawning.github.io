异步执行命令，并输出到主进程里。

2022-06-06 09:15:51

# 安装

```sh
pnpm add @sundawning/child-process-exec-with-log
```

# 使用

```js
const exec = require("@sundawning/child-process-exec-with-log");
// "C:\Users\SunDawning\Downloads\ngrok-v3-stable-windows-amd64\ngrok.exe"
exec(
  "c:/users/sundawning/downloads/ngrok-v3-stable-windows-amd64/ngrok http 3000"
);
```

```
[6/6/2022, 9:19:30 AM] 执行命令 c:/users/sundawning/downloads/ngrok-v3-stable-windows-amd64/ngrok http 3000
The system cannot find the path specified.
```
