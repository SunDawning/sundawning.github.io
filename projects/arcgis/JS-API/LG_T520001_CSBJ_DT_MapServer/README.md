使用 TileLayer 加载临港要素服务

2022-07-28 13:50:25

http://10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_CSBJ_DT/MapServer

# 运行

直接双击 index.html 在浏览器里打开

# 一些示例

http://10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_CSBJ_DT/MapServer/export?bbox=-117141.71919069548,-66810.99433875605,111210.48189185861,74929.81162120512&bboxSR=102100&imageSR=102100&size=2048%2C2048&dpi=47.99999999999999&format=png32&transparent=true&layers=show%3A0%2C16%2C140%2C198%2C219&f=image

使用
http://10.89.9.234:8080/geoserver/rest/services/LG/HX_T520001_HP_2022_TILE/MapServer
的
Full Extent

http://10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_CSBJ_DT/MapServer/export?bbox=-7992.517615209649,-70556.87173461914,70310.3600224362,-21603.489959716797&bboxSR=102100&imageSR=102100&size=256%2C256&dpi=96&format=png32&transparent=true&layers=show%3A0%2C16%2C140%2C198%2C219&f=image

## 9,256,256

```js
// 行列号转经纬度 @see https://blog.csdn.net/u012260672/article/details/123633641
function xyz2prj3857(z, x, y) {
  const n = Math.pow(2, z);
  const lon_min = (x / n) * 40075016.0 - 20037508.0;
  const lat_min = 20037508.0 - ((y + 1) / n) * 40075016.0;
  const lon_max = ((x + 1) / n) * 40075016.0 - 20037508.0;
  const lat_max = 20037508.0 - (y / n) * 40075016.0;
  const rectangle = [lon_min, lat_min, lon_max, lat_max];
  return rectangle;
}
```

xyz2prj3857(9,256,256);
9,256,256

http://10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_CSBJ_DT/MapServer/export?bbox=0,-78271.515625,78271.515625,0&bboxSR=102100&imageSR=102100&size=256%2C256&dpi=96&format=png32&transparent=true&layers=show%3A0%2C16%2C140%2C198%2C219&f=image

## 12,2052,2051

JSON.stringify(xyz2prj3857(12,2052,2051))
'[39135.7578125,-39135.7578125,48919.697265625,-29351.818359375]'

http://10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_CSBJ_DT/MapServer/export?bbox=39135.7578125,-39135.7578125,48919.697265625,-29351.818359375&bboxSR=102100&imageSR=102100&size=256%2C256&dpi=96&format=png32&transparent=true&layers=show%3A0%2C16%2C140%2C198%2C219&f=image
