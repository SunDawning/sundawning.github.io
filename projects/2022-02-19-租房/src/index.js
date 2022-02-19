Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYWFkMDIyOC0zZjQyLTRlMzUtYjQ4YS0xNjBhMDgwNTE4YTAiLCJpZCI6NzY5MDcsImlhdCI6MTY0NTI2NDUzMH0.N9v17oLP08jFvYtSns4GXGAXNf6pPqdKI_FpQx8QADA";

const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);
const viewer = new Cesium.Viewer(container);
viewer.scene.terrainProvider = Cesium.createWorldTerrain();

function getDistrictRectangleByAmap() {
  // https://zhuanlan.zhihu.com/p/409983169
  // 深圳区域
  // https://lbs.amap.com/api/webservice/guide/api/district
  // https://lbs.amap.com/service/api/restapi?keywords=440300&subdistrict=0&extensions=all
  const longitudeLatitude = temp1.districts[0].polyline
    .split(";")
    .map(function (item) {
      return item.split(",").map(function (c) {
        return Number.parseFloat(c);
      });
    });
  const maxX = Math.max.apply(
    null,
    longitudeLatitude.map(function (item) {
      return item[0];
    })
  );
  const maxY = Math.max.apply(
    null,
    longitudeLatitude.map(function (item) {
      return item[1];
    })
  );
  const minX = Math.min.apply(
    null,
    longitudeLatitude.map(function (item) {
      return item[0];
    })
  );
  const minY = Math.min.apply(
    null,
    longitudeLatitude.map(function (item) {
      return item[1];
    })
  );
  console.log(JSON.stringify([minX, minY, maxX, maxY]));
}
{
  // 飞到指定范围 https://www.cnblogs.com/xym0710/p/14949107.html
  // 某地的行政区域 https://www.zhoulujun.cn/html/GIS/WebGIS/8155.html
  viewer.camera.setView({
    destination: new Cesium.Rectangle.fromDegrees(
      113.751453,
      22.396344,
      114.628466,
      22.861748
    ),
  });
}
function importAmapDistrict() {
  const src = "../public/district_440300.js";
  {
    const baseURL = window.location.href;
    const fullSrc = new URL(src, baseURL).href;
    const isAppend =
      Object.values(document.scripts).filter(function (item) {
        return item.src === fullSrc;
      }).length > 0;
    if (isAppend === true) {
      console.log("script load", src);
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      document.head.appendChild(script);
      script.addEventListener("load", function (event) {
        console.log("script load", script);
        {
          const polyline = district_440300.districts[0].polyline
            .split(/[,;]/)
            .map(function (item) {
              return Number.parseFloat(item);
            });
          let hierarchy = Cesium.Cartesian3.fromDegreesArray(polyline);
          hierarchy = hierarchy.slice(0, hierarchy.length - 100);
          viewer.entities.add({
            name: "district_440300",
            polygon: {
              hierarchy: hierarchy,
              outline: true,
              outlineColor: Cesium.Color.RED,
              fill: false,
            },
          });
        }
      });
    }
  }
}
{
  // https://zhuanlan.zhihu.com/p/344395928
  // https://github.com/TangSY/echarts-map-demo
  // https://hxkj.vip/demo/echartsMap/
  // https://sandcastle.cesium.com/index.html?src=GeoJSON%20and%20TopoJSON.html
  // 加载JSON文件并显示属性 https://blog.csdn.net/qq_41553157/article/details/91040920
  Cesium.GeoJsonDataSource.load("../public/440300.geoJson", {
    fill: new Cesium.Color(0, 0, 0, 0),
    // clampToGround: true,
    // height:0
  }).then(function (dataSource) {
    const instances = [];
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
      // Cesium环境实现Geojson河流效果并实现贴地（任何Polygon均可） https://its304.com/article/qq_38370387/118668228
      {
        let geometry = new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
              entity.polygon.hierarchy.getValue().positions
            ),
            extrudedHeight: 0,
            height: 0,
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.fromRandom({
                alpha: 0.5,
              })
            ),
          },
        });
        instances.push(geometry);
      }
    });
    viewer.scene.primitives.add(
        new Cesium.GroundPrimitive({
            geometryInstances:instances
        })
    )
  });
}
