使用 Diigo 网页笔记的接口，创建一个新的 Diigo。

程序分成两部分，浏览器里的内容与本地服务器。

浏览器里的内容使用 Vite+Vue 来创建。

浏览器的内容来自于：

https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

```sh
pnpm create vite vue -- --template vue
```

# 安装

```sh
pnpm install
```

# 运行

```sh
pnpm run start
```

# 开发

## 编写新的 API

以“/api/check-new-version”API 为例（该 API 为网页里请求执行 exe 程序）：

```
modified:   proxy/index.js
modified:   vue/vite.config.js
modified:   vue/src/modules/axios.ts
modified:   vue/src/components/Menu.vue
```

1. 定义接口地址“/api/check-new-version”
2. 在服务器上测试可以执行 exe 程序，并将数据返回给接口地址。
3. 在 vite 里设置接口代理
4. 在页面里设置接口预处理
5. 在页面里使用接口返回的数据
