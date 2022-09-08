将 freenom 域名重定向到 URL，相当于在 freenom 里给域名设置 URL Forwarding。

2022-07-30 15:20:03

# 安装

```sh
pnpm add @sundawning/freenom-url-forwarding
```

# 使用

```js
const FreenomURLForwarding = require("@sundawning/freenom-url-forwarding");
FreenomURLForwarding.redirect({
  username: "username",
  password: "password",
  domain: "domain",
  url: "https://www.bing.com/",
});
```

将打印出：

```
1. GET https://my.freenom.com/clientarea.php 获取set-cookie [ 'WHMCSZH5eHTGhfvzP=h35tgk7r0qog; path=/; HttpOnly' ]
2. 302重定向 GET https://my.freenom.com/clientarea.php，带上cookie请求，获取token 778a5fddba9cc63561d201b3
(node:8616) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
3. POST https://my.freenom.com/dologin.php，带上cookie、token、账号和密码，content-type: application/x-www-form-urlencoded，获取新的cookie [
  'WHMCSZH5eHTGhfvzP=tbb5039ciq; path=/; HttpOnly',
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
59108cb3e65e02973a2
https://www.bing.com/
域名重定向到 domain => https://www.bing.com/
```
