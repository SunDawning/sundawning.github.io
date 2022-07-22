```
White3DTilesetStyle - LINEARtoSRGB - model._rendererResources.sourceShaders - 仿百度 - 上海市区城市白模
```

https://blog.csdn.net/weixin_39150852/article/details/124710094

2022-07-22 10:19:09

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

# 模型数据来源

https://mars3d.cn/config/config.json

dataServer <=> https://data.mars3d.cn

```json
{
  "id": 204012,
  "pid": 2040,
  "type": "3dtiles",
  "name": "上海市区",
  "url": "{dataServer}/3dtiles/jzw-shanghai/tileset.json",
  "maximumScreenSpaceError": 4,
  "maximumMemoryUsage": 1024,
  "style": {
    "color": {
      "conditions": [
        ["${floor} >= 200", "rgba(45, 0, 75, 0.5)"],
        ["${floor} >= 100", "rgb(170, 162, 204)"],
        ["${floor} >= 50", "rgb(224, 226, 238)"],
        ["${floor} >= 25", "rgb(252, 230, 200)"],
        ["${floor} >= 10", "rgb(248, 176, 87)"],
        ["${floor} >= 5", "rgb(198, 106, 11)"],
        ["true", "rgb(127, 59, 8)"]
      ]
    }
  },
  "highlight": { "type": "click", "color": "#FFFF00" },
  "popup": [
    { "field": "name", "name": "名称" },
    { "field": "floor", "name": "楼层" }
  ],
  "center": {
    "lat": 31.257341,
    "lng": 121.466139,
    "alt": 2170.8,
    "heading": 122.2,
    "pitch": -31.8
  }
}
```
