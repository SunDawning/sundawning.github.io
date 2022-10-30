在 node 17、node 18 和 node 19 里需要设置
NODE_OPTIONS=--openssl-legacy-provider
但在 node 16 里不需要设置，解决
Error: error:0308010C:digital envelope routines::unsupported
问题。

2022-06-07 15:06:41

# 安装

```sh
pnpm add @sundawning/node-options-openssl-legacy-provider
```

# 使用

譬如对于 Umi 项目，创建 start.js 并用 node start.js 来替换 start 命令：

```js
const node_options_openssl_legacy_provider = require("@sundawning/node-options-openssl-legacy-provider");
const log = require("@sundawning/console-log-timestamp");
log(`cross-env ${node_options_openssl_legacy_provider()} umi dev`);
```

在 Node 18 下输出：

```
[6/7/2022, 3:09:10 PM] cross-env NODE_OPTIONS=--openssl-legacy-provider umi dev
```

在 Node 16 下输出：

```
[6/7/2022, 3:09:10 PM] cross-env  umi dev
```
