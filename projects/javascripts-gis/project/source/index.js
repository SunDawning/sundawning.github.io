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
async function onLoadWindow() {
  const root = document.body;
  appendRootStyle(root);
  {
    globalThis.CESIUM_BASE_URL =
      "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
    let imageryProvider;
    {
      await import(
        "./library/getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL.js"
      );
      imageryProvider =
        await getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL(
          CESIUM_BASE_URL
        );
    }
    await import(
      "./library/getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
    );
    globalThis.cesiumWidget =
      await getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
        root,
        CESIUM_BASE_URL,
        { imageryProvider }
      );
    {
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
      appendChild(container.shadowRoot, div);
    }
  }
}
globalThis.onload = onLoadWindow;
