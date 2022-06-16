/**
 * 添加Cesium的CSS样式和Cesium.Viewer
 * @param {HTMLElement} container
 * @param {string} CESIUM_BASE_URL
 * @returns Cesium.Viewer
 */
window.getCesiumCSSAndCesiumViewerCreateByBaseURL = async function (
  container,
  CESIUM_BASE_URL
) {
  await import("./getCesiumCSSAndCesiumViewerCreateByURL.js");
  return await getCesiumCSSAndCesiumViewerCreateByURL(
    container,
    `${CESIUM_BASE_URL}/Widgets/widgets.css`,
    `${CESIUM_BASE_URL}/Cesium.js`
  );
};
