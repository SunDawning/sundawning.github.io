/**
 * 添加Cesium的CSS样式和CesiumWidget
 * @param {HTMLElement} container
 * @param {string} CESIUM_BASE_URL
 * @returns Cesium.CesiumWidget
 */
globalThis.getCesiumCSSAndCesiumWidgetCreateByBaseURL = async function (
  container,
  CESIUM_BASE_URL
) {
  await import("./getCesiumCSSAndCesiumWidgetCreateByURL.js");
  return await getCesiumCSSAndCesiumWidgetCreateByURL(
    container,
    `${CESIUM_BASE_URL}/Widgets/widgets.css`,
    `${CESIUM_BASE_URL}/Cesium.js`
  );
};
