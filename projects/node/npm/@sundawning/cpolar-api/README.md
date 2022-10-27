cpolar 的 API，https://www.cpolar.com/

2022-10-27 09:48:45

# 安装

```sh
pnpm add @sundawning/cpolar-api
```

# 使用

```js
const cpolar = require("@sundawning/cpolar-api");
cpolar.untilGetURL({
  session: "YOUR_SESSION_ID",
  timeout: 10 * 1000,
});
```

将打印出：

```
data [
  { public_url: 'tcp://2.tcp.vip.cpolar.cn:12158', proto: 'tcp' },
  { public_url: 'http://7634c6a2.r2.vip.cpolar.cn', proto: 'http' },
  { public_url: 'https://7634c6a2.r2.vip.cpolar.cn', proto: 'https' }
]
url https://7634c6a2.r2.vip.cpolar.cn
```
