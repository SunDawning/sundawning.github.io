if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 给根节点添加全局样式
 */
async function appendRootStyle(root) {
  await import("./library/appendStyleText.js");
  SunDawningGIS.appendStyleText(
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
  SunDawningGIS.cesiumWidget =
    await SunDawningGIS.getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
      root,
      CESIUM_BASE_URL,
      {
        imageryProvider: await getImageryProvider(CESIUM_BASE_URL),
      }
    );
  return SunDawningGIS.cesiumWidget;
}
/**
 * 创建UI，在右上角输出相机的视角，鼠标移动停下随即更新
 * @param {HTMLElement} root
 * @param {Cesium.Viewer||Cesium.CesiumWidget} cesiumWidget
 */
async function create_ui_printCesiumCameraSetViewOptionsOnMoveEnd(
  root,
  cesiumWidget
) {
  await import("./library/printCesiumCameraSetViewOptionsOnMoveEnd.js");
  SunDawningGIS.ui_printCesiumCameraSetViewOptionsOnMoveEnd =
    await SunDawningGIS.printCesiumCameraSetViewOptionsOnMoveEnd(
      root,
      cesiumWidget
    );
}
globalThis.onload = async function () {
  SunDawningGIS.root = document.body;
  appendRootStyle(SunDawningGIS.root);
  await import(
    "./library/getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL.js"
  );
  const cesiumWidget = await createEarth(
    SunDawningGIS.root,
    SunDawningGIS.getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL
  );
  create_ui_printCesiumCameraSetViewOptionsOnMoveEnd(
    SunDawningGIS.root,
    SunDawningGIS.cesiumWidget
  );
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
