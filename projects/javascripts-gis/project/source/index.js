async function index() {
  const root = document.body;
  {
    globalThis.CESIUM_BASE_URL =
      "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
    await import(
      "./library/getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
    );
    await import(`${CESIUM_BASE_URL}/Cesium.js`);
    globalThis.cesiumWidget =
      await getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
        root,
        CESIUM_BASE_URL,
        {
          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
          }),
        }
      );
    // cesiumWidget.scene.imageryLayers.removeAll();
  }
}
index();
