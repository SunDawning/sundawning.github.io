if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建一个Cesium.Viewer
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @returns
 */
SunDawningGIS.CesiumViewer_getCesiumCSSAndCesiumViewerCreateByBaseURLInShadowRoot =
  async function (root, CESIUM_BASE_URL) {
    let viewer;
    let container;
    {
      await import("./HTMLElement_getShadowRootContainerCreateAndAppend.js");
      container =
        await SunDawningGIS.HTMLElement_getShadowRootContainerCreateAndAppend(
          root
        );
    }
    {
      await import(
        "./CesiumViewer_getCesiumCSSAndCesiumViewerCreateByBaseURL.js"
      );
      viewer =
        await SunDawningGIS.CesiumViewer_getCesiumCSSAndCesiumViewerCreateByBaseURL(
          container.shadowRoot,
          CESIUM_BASE_URL
        );
    }
    return viewer;
  };
