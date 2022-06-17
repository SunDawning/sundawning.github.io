/**
 * 给根节点添加全局样式
 */
async function appendRootStyle(root) {
  await import("./library/appendStyleText.js");
  appendStyleText(
    root,
    `
body{
  margin:0;
}
  `
  );
}
/**
 * @param {HTMLElement} root
 * @param {function} getImageryProvider
 * @returns Cesium.CesiumWidget
 */
async function createEarth(root, getImageryProvider) {
  globalThis.CESIUM_BASE_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
  await import(
    "./library/getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
  );
  globalThis.cesiumWidget =
    await getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
      root,
      CESIUM_BASE_URL,
      { imageryProvider: await getImageryProvider(CESIUM_BASE_URL) }
    );
  return globalThis.cesiumWidget;
}
globalThis.onload = async function () {
  const root = document.body;
  appendRootStyle(root);
  await import(
    "./library/getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL.js"
  );
  const cesiumWidget = await createEarth(
    root,
    getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL
  );
  await import("./library/printCesiumCameraSetViewOptionsOnMoveEnd.js");
  printCesiumCameraSetViewOptionsOnMoveEnd(root, cesiumWidget);
  cesiumWidget.camera.setView({
    destination: {
      x: -2924819.4945182353,
      y: 9022799.347751182,
      z: 4775396.196561911,
    },
    orientation: {
      heading: 0,
      pitch: -1.3768327359474233,
      roll: 0,
    },
  });
};
