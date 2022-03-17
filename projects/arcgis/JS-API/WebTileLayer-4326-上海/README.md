在三维场景下加载上海地图，其坐标系是 4326。

因为图层的 lods 不符合要求，不能使用 TileLayer 直接加载。

上海地图
https://mape.shanghai-map.net/arcgis/rest/services/wxmap/MapServer

# 运行

```sh
pnpm run start
# http://127.0.0.1:8080
```
