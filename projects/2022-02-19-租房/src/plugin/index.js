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
