ngrok-api-with-axios 使用 axios 来使用 ngrok 的 API，https://ngrok.com/docs/api#api-tunnels-list

2022-10-26 16:54:05

# 安装

```sh
pnpm add @sundawning/ngrok-api-with-axios
```

# 使用

```js
const ngrok = require("@sundawning/ngrok-api-with-axios");
ngrok.untilGetURL({
  API_KEY: "YOUR_API_KEY",
  filter: function ({ region, proto }) {
    return region === "jp" && proto === "https";
  },
  timeout: 10 * 1000,
});
```

将打印出：

```
data {
  tunnels: [
    {
      id: 'tn_2GeYNYfyAs8LL3xBRZD8bKqexcZ',
      public_url: 'tcp://0.tcp.ap.ngrok.io:15642',
      started_at: '2022-10-26T02:14:36Z',
      proto: 'tcp',
      region: 'ap',
      tunnel_session: [Object],
      endpoint: [Object],
      forwards_to: ''
    },
    {
      id: 'tn_2GeYNYWsp3Is6B5PgBMcWquYDWW',
      public_url: 'http://5459-120-229-49-179.jp.ngrok.io',
      started_at: '2022-10-26T02:14:36Z',
      proto: 'http',
      region: 'jp',
      tunnel_session: [Object],
      endpoint: [Object],
      forwards_to: ''
    },
    {
      id: 'tn_2GeYNUla9w07AJW67patzzDODB8',
      public_url: 'https://5459-120-229-49-179.jp.ngrok.io',
      started_at: '2022-10-26T02:14:36Z',
      proto: 'https',
      region: 'jp',
      tunnel_session: [Object],
      endpoint: [Object],
      forwards_to: ''
    }
  ],
  uri: 'https://api.ngrok.com/tunnels',
  next_page_uri: null
}
url https://5459-120-229-49-179.jp.ngrok.io
```
