Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYWFkMDIyOC0zZjQyLTRlMzUtYjQ4YS0xNjBhMDgwNTE4YTAiLCJpZCI6NzY5MDcsImlhdCI6MTY0NTI2NDUzMH0.N9v17oLP08jFvYtSns4GXGAXNf6pPqdKI_FpQx8QADA";
const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);
const viewer = new Cesium.Viewer(container);
{
  // 添加地形
  viewer.scene.terrainProvider = Cesium.createWorldTerrain();
}
{
  // 添加地图
  // https://www.cnblogs.com/fuckgiser/p/5647429.html
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(
    new Cesium.ArcGisMapServerImageryProvider({
      url: "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    })
  );
}
const rectangle = Cesium.Rectangle.fromDegrees(
  113.751453,
  22.396344,
  114.628466,
  22.861748
);
{
  // 飞到指定范围 https://www.cnblogs.com/xym0710/p/14949107.html
  // 某地的行政区域 https://www.zhoulujun.cn/html/GIS/WebGIS/8155.html
  viewer.camera.setView({
    destination: rectangle,
  });
}
{
  // https://zhuanlan.zhihu.com/p/344395928
  // https://github.com/TangSY/echarts-map-demo
  // https://hxkj.vip/demo/echartsMap/
  // https://sandcastle.cesium.com/index.html?src=GeoJSON%20and%20TopoJSON.html
  // 加载JSON文件并显示属性 https://blog.csdn.net/qq_41553157/article/details/91040920
  Cesium.GeoJsonDataSource.load("../public/440300.geoJson", {
    fill: new Cesium.Color(0, 0, 0, 0),
  }).then(function (dataSource) {
    viewer.dataSources.add(dataSource);
    const labels = viewer.scene.primitives.add(new Cesium.LabelCollection());
    dataSource.entities.values.forEach(function (entity) {
      labels.add({
        position: Cesium.Cartesian3.fromDegrees.apply(
          null,
          entity.properties.centroid._value
        ),
        text: entity.name,
        scaleByDistance: new Cesium.NearFarScalar(50000, 1, 1000000, 0),
      });
    });
  });
}
{
  //   // 1.影像图
  // https://webst01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&style=6
  // // 2.道路纯图
  // https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x=54658&y=26799&z=16&scl=1&ltype=2
  // // 3.道路简图
  // http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&size=1&scale=1&style=7
  // // 4.道路详图
  // http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8
  // // 5.纯道路图
  // http://wprd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scl=1&style=8&ltype=11
  // // 6.纯地标图
  // https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x=54658&y=26799&z=16&scl=1&ltype=4
  // // 7.路网注记图
  // http://webst01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8

  // ————————————————
  // 版权声明：本文为CSDN博主「右弦」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
  // 原文链接：https://blog.csdn.net/weixin_45782925/article/details/122984175

  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: "http://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
      minimumLevel: 3,
      maximumLevel: 18,
      rectangle: rectangleg,
    })
  );
}
