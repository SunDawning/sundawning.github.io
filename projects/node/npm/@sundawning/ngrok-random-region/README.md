使用随机的地区来启动 ngrok 内网穿透服务器

2022-09-08 21:38:26

# 安装

```sh
pnpm add @sundawning/ngrok-random-region
```

# 使用

```js
const NgrokRandomRegion = require("@sundawning/ngrok-random-region");
NgrokRandomRegion.start({
  token: "token",
});
```

打印出并一直处于运行中：

```
启动ngrok内网穿透服务器 http 8080 =>  https://63a0-120-229-49-9.ngrok.io
```

停止后再次执行：

```
启动ngrok内网穿透服务器 http 8080 => https://c7e0-120-229-49-9.eu.ngrok.io
```
