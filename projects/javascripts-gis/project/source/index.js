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
async function index() {
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
      const container = await getShadowRootContainerCreateAndAppend(
        document.body
      );
      appendStyleText(
        container.shadowRoot,
        `
      div{
        position: absolute;
        top: 0;
        right: 0;
        color: white;
      }
      `
      );
      const div = document.createElement("div");
      div.innerHTML = cesiumWidget.camera.position;
      {
        cesiumWidget.camera.moveEnd.addEventListener(function () {
          div.innerHTML = cesiumWidget.camera.position;
        }, "");
      }
      appendChild(container.shadowRoot, div);
    }
  }
}
index();
