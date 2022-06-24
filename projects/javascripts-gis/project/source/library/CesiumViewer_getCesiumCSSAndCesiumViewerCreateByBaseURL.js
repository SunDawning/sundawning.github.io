if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加Cesium的CSS样式和Cesium.Viewer
 * @param {HTMLElement} container
 * @param {string} CESIUM_BASE_URL
 * @returns Cesium.Viewer
 */
SunDawningGIS.CesiumViewer_getCesiumCSSAndCesiumViewerCreateByBaseURL =
  async function (container, CESIUM_BASE_URL) {
    await import("./CesiumViewer_getCesiumCSSAndCesiumViewerCreateByURL.js");
    return await SunDawningGIS.CesiumViewer_getCesiumCSSAndCesiumViewerCreateByURL(
      container,
      `${CESIUM_BASE_URL}/Widgets/widgets.css`,
      `${CESIUM_BASE_URL}/Cesium.js`
    );
  };
