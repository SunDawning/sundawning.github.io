启动 ngrok 后获取网址并将设置为 freenom 域名的重定向网址

2022-09-09 14:03:06

# 安装

```sh
pnpm add @sundawning/ngrok-freenom-redirect
```

# 使用

```js
const NgrokFreenom = require("@sundawning/ngrok-freenom-redirect");
NgrokFreenom.start({
  ngrok: {
    token: "token",
    port: 8080,
  },
  freenom: {
    username: "username",
    password: "password",
    domain: "domain",
  },
});
```

```
启动ngrok内网穿透服务器 http 8080 => https://2363-183-240-6-199.eu.ngrok.io
1. GET https://my.freenom.com/clientarea.php 获取set-cookie [ 'WHMCSZH5eHTGhfvzP=sl6h0m; path=/; HttpOnly' ]
2. 302重定向 GET https://my.freenom.com/clientarea.php，带上cookie请求，获取token
11df1efc9235009b75364580
3. POST https://my.freenom.com/dologin.php，带上cookie、token、账号和密码，content-type: application/x-www-form-urlencoded，获取新的cookie [
  'WHMCSZH5eHTGhfvzP=gadq3vbk; path=/; HttpOnly',
  'WHMCSUser=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; httponly'
]
domains [
  {
    domain: 'domain',
    registration: '2022-07-30',
    expiry: '2023-07-30',
    status: 'Active',
    type: 'Free',
    id: 'id'
  }
]
676dbc9dd1d8e3
https://2363-183-240-6-199.eu.ngrok.io
域名重定向到 domain => https://2363-183-240-6-199.eu.ngrok.io
```
