生成 min 和 max 之间的随机整数

2022-06-05 19:38:58

# 安装

```sh
pnpm add @sundawning/get-random-int
```

# 使用

```js
const log = require("@sundawning/console-log-timestamp");
const get_random_int = require("@sundawning/get-random-int");
log(get_random_int({ min: 10 }));
log(get_random_int({ max: 100 }));
log(get_random_int({ min: 20, max: 100 }));
```

```
[2022/6/5 19:41:33] 10
[2022/6/5 19:41:33] 50
[2022/6/5 19:41:33] 95
```
