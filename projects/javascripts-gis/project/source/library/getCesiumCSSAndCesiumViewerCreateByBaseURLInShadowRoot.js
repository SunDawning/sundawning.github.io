if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建一个Cesium.Viewer
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @returns
 */
SunDawningGIS.getCesiumCSSAndCesiumViewerCreateByBaseURLInShadowRoot =
  async function (root, CESIUM_BASE_URL) {
    let viewer;
    let container;
    {
      await import("./getShadowRootContainerCreateAndAppend.js");
      container = await SunDawningGIS.getShadowRootContainerCreateAndAppend(root);
    }
    {
      await import("./getCesiumCSSAndCesiumViewerCreateByBaseURL.js");
      viewer = await SunDawningGIS.getCesiumCSSAndCesiumViewerCreateByBaseURL(
        container.shadowRoot,
        CESIUM_BASE_URL
      );
    }
    return viewer;
  };
