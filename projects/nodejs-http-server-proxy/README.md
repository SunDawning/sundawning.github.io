在 UE4 的 ArcGIS 插件和临港的二维影像服务之间增加一个中间服务器（本程序），用来拦截 ArcGIS 插件的每张图片请求（形如：http://localhost:8280/10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer），根据所拦截的请求，读取本地缓存或请求临港原始影像服务（形如：http://10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer），再计算出正确的影像图片，最后返回给 ArcGIS 插件。

程序分为两部分：

一部分在 UE4 里的，一部分在 NodeJS 里的。

1. UE4 的 ArcGIS 添加一个图层
   1. 原点的经纬度是(0,0)
   2. 相机位置的纬度是是(0.2192,-0.331623,67501.445312)
   3. 图层的地址是：
      - http://localhost:8280/10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer
      - 要素服务单个图层：http://localhost:8280/10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_LGTS_DT/MapServer?layers=53&tile=
      - 要素服务多个图层：http://localhost:8280/10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_LGTS_DT/MapServer?layers=0,46,49,50,53&tile=
2. NodeJS 里启动一个服务器，转发来自 http://localhost:8280/10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer 的请求

# 安装

```
npm install
```

# 运行

## 启动 VPN 连接临港

## 使用 NodeJS 启动服务器

```sh
npm run start
```

## 在 UE4 的 ArcGIS 里导入关卡

https://developers.arcgis.com/unreal-engine-sdk/get-started/

1. （只创建一次，已有则忽略）创建 UE4 ArcGIS 项目
2. （只安装一次，已有则忽略）在 UE4 4.27.2 里安装好 ArcGIS 插件
3. 复制关卡“explore/DisplayASpecificAreaDetailsPanelUIAddLinGangLayers.umap”到项目的“Content”文件夹下
4. 在 UE4 里打开项目
5. 在内容浏览器里双击加载所导入的关卡
6. 运行（Alt+P）

## 在浏览器里预览

- 双击“explore/Cesium.html”查看 Cesium 下预览
- 双击“explore/ArcGIS.html”查看 ArcGIS 下预览

# 只显示一定区域的地图

https://developers.arcgis.com/unreal-engine-sdk/local-scene/tutorials/display-a-specific-area-ui/

通过 MapServer?f=json 里的 fullExtent 计算区域形状为“Rectangle”的长和宽。

```json
"fullExtent": {
  "xmin": 370663.4930111199,
  "ymin": 2947220.9788201684,
  "xmax": 635105.5869901509,
  "ymax": 3175115.2860342884,
}
```

长为：xmax-xmin，宽为 ymax-ymin。

# 生成 exe

```sh
npm run build
```

# git archive

```sh
npm run archive
```
