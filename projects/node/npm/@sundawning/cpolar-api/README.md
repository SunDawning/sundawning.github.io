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
  email: "YOUR_EMAIL",
  password: "YOUR_PASSWORD",
  timeout: 10 * 1000,
});
```

将打印出：

```
POST /login，出现302时，不跳转，拿到cookie
(node:4456) ExperimentalWarning: The Fetch API is an experimental featur
e. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
AxiosHeaders {
  server: 'nginx',
  date: 'Sat, 29 Oct 2022 08:35:47 GMT',
  'content-length': '0',
  connection: 'close',
  location: '/get-started',
  'set-cookie': [
    'session=c7e708c3-9767-456f-c6a6-f6c9e5ef4c45; Path=/; Domain=dashbo
ard.cpolar.com; Expires=Sat, 07 Sep 2047 17:00:05 GMT; Max-Age=784455858
; HttpOnly; SameSite=Lax'
  ],
  'x-frame-options': 'SAMEORIGIN',
  'x-xss-protection': '1; mode=block',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer-when-downgrade',
  'content-security-policy': "default-src * data: 'unsafe-eval' 'unsafe-
inline'",
  [Symbol(defaults)]: null
}
cookie session=c7e708c3-9767-456f-c6a6-f6c9e5ef4c45
data [
  { public_url: 'tcp://3.tcp.vip.cpolar.cn:11164', proto: 'tcp' },
  { public_url: 'http://1c52a264.r3.vip.cpolar.cn', proto: 'http' },
  { public_url: 'https://1c52a264.r3.vip.cpolar.cn', proto: 'https' }
]
url https://1c52a264.r3.vip.cpolar.cn
```
