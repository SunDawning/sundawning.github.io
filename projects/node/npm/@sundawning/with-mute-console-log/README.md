让 console.log 失效

2022-07-29 21:53:20

# 安装

```sh
pnpm add @sundawning/with-mute-console-log
```

# 使用

```js
const with_mute_console_log = require("@sundawning/with-mute-console-log");
const log = require("@sundawning/console-log-timestamp");
log("with_mute_console_log");
with_mute_console_log(log, "with_mute_console_log");
```

```
[2022/7/29 21:53:42] with_mute_console_log
[2022/7/29 21:53:42]
```
