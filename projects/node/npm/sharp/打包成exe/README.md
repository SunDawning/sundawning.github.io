https://www.npmjs.com/package/sharp

2022-08-02 21:06:57

图片处理

# 安装

```sh
npm install
```

# 运行

```sh
npm run start
```

# 打包

```sh
npm run build
```

## exe 无法执行及执行出现的问题

```
The directory must be distributed with executable as %2.

Cannot find module '../build/Release/sharp-win32-x64.node
```

将“build/Release/sharp-win32-x64.node”文件增加到在 package.json 的 assets 里：

https://www.npmjs.com/package/pkg#native-addons

> Native addons (.node files) use is supported. When pkg encounters a .node file in a require call, it will package this like an asset. In some cases (like with the bindings package), the module path is generated dynamicaly and pkg won't be able to detect it. In this case, you should add the .node file directly in the assets field in package.json.

pkg 会在“C:\Users\jobsimi\AppData\Local\Temp\pkg\c607d483f61cf7ec2c900fe66c2c7ba8e7078af2421a62e7d8705205d8422e0c\sharp”下创建依赖，只是添加“sharp-win32-x64.node”路径，会提示不存在该路径，因而将整个“sharp/build/Release”添加到 package.json 的 assets 里：

```json
{
  "name": "sharp-hello-exe",
  "bin": "index.js",
  "pkg": {
    "outputPath": "dist",
    "compress": "GZip",
    "targets": ["win"],
    "assets": ["node_modules/sharp/build/Release/*"]
  }
}
```

另外使用 pnpm 安装依赖后，也会带来找不到.pnpm 的问题，因而使用 npm install 来安装依赖。
