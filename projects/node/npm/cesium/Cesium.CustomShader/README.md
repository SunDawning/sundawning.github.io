Cesium 给 3D Tiles 创建着色器，Cesium 版本不小于 1.85

2022-07-07 14:13:26

# 安装

```sh
pnpm install
```

# 运行

```sh
pnpm run start
```

# 存档

```sh
pnpm run archive
```

## 分发带有依赖的包

1. 解压 master，文件夹重命名为“某某功能”。或者复制压缩包，重命名为“某某功能.zip”，解压到文件夹，并删除压缩包。
2. cd 文件夹
3. 安装依赖
   npm install --registry=https://registry.npm.taobao.org
4. 测试运行
5. 在文件夹下全选所有文件创建 zip 压缩包
6. 重命名压缩包为“某某功能-v0.0.1-孙曙光.zip”
7. 移动并发送压缩包
