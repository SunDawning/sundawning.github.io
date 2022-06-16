/**
 * 添加Cesium的CSS样式和CesiumWidget
 * @param {HTMLElement} container
 * @param {string} CESIUM_BASE_URL
 * @param {object} Cesium_Widget_Options
 * @returns Cesium.CesiumWidget
 */
globalThis.getCesiumCSSAndCesiumWidgetCreateByBaseURL = async function (
  container,
  CESIUM_BASE_URL,
  Cesium_Widget_Options
) {
  await import("./getCesiumCSSAndCesiumWidgetCreateByURL.js");
  return await getCesiumCSSAndCesiumWidgetCreateByURL(
    container,
    `${CESIUM_BASE_URL}/Widgets/widgets.css`,
    `${CESIUM_BASE_URL}/Cesium.js`,
    Cesium_Widget_Options
  );
};
