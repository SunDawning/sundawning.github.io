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
/**
 * @param {HTMLElement} root
 * @param {Cesium.CesiumWidget} cesiumWidget
 */
async function printCesiumCameraPosition(root, cesiumWidget) {
  await import("./library/getShadowRootContainerCreateAndAppend.js");
  const container = await getShadowRootContainerCreateAndAppend(root);
  {
    await import("./library/appendStyleText.js");
    appendStyleText(
      container.shadowRoot,
      `
div{
position: absolute;
top: 0;
right: 0;
color: white;
white-space: pre;
}
    `
    );
  }
  const div = document.createElement("div");
  function printCameraPositionOnMoveEnd() {
    div.innerHTML = JSON.stringify(cesiumWidget.camera.position, null, 4);
  }
  printCameraPositionOnMoveEnd();
  {
    cesiumWidget.camera.moveEnd.addEventListener(
      printCameraPositionOnMoveEnd,
      "cameara_position"
    );
  }
  {
    await import("./library/appendChild.js");
    appendChild(container.shadowRoot, div);
  }
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
  printCesiumCameraPosition(root, cesiumWidget);
};
