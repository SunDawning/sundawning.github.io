只使用 JavaScript 来创建 GIS 页面

2022-06-14 20:23:11

- 在内存里存在一个唯一的数据库，可以保存到浏览器里，可以保存到远程服务器上。
- html 和 css 都由 js 生成
- js 文件扁平化
- 易读的内容即源码，不易读的内容经过压缩而形成能分发的产品
- 只有一个 html 和无数个 js 文件
- 一个 js 即是一个函数，当满足相应的条件时，即返回或执行相应的操作。
- 全局的函数、全局的变量，便于调试和就地修改。

# 运行

```sh
pnpm run start
```

http://localhost:8080/

# 打包

```sh
pnpm run build
```

# 最少文件数的源码

```sh
pnpm run source-in-minimum-files
```

相当于：

```sh
rollup -i project/source/index.js --dir project/source-in-minimum-files
```

便于将某个 js 分离出来

譬如

```sh
rollup -i project/source/library/HTMLElement_createWindows10TaskbarContainer.js --dir project/source-in-minimum-files/HTMLElement_createWindows10TaskbarContainer --chunkFileNames '[name].js'
```

用于将
HTMLElement_createWindows10TaskbarContainer.js
功能分离出来
