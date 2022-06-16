/**
 * 使用Cesium的JavaScript异步创建CesiumWidget
 * @param {HTMLElement} container
 * @param {string} url
 * @param {object} Cesium_Widget_Options
 * @returns Cesium.CesiumWidget
 */
globalThis.getCesiumWidgetCreateByURL = async function (
  container,
  url,
  Cesium_Widget_Options
) {
  await import(url);
  await import("./getCesiumWidgetCreateByCesium.js");
  return getCesiumWidgetCreateByCesium(
    container,
    Cesium,
    Cesium_Widget_Options
  );
};
