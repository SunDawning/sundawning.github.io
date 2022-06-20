if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 使用Cesium的JavaScript异步创建CesiumWidget
 * @param {HTMLElement} container
 * @param {string} url
 * @param {object} Cesium_Widget_Options
 * @returns Cesium.CesiumWidget
 */
SunDawningGIS.getCesiumWidgetCreateByURL = async function (
  container,
  url,
  Cesium_Widget_Options
) {
  await import(url);
  await import("./getCesiumWidgetCreateByCesium.js");
  return SunDawningGIS.getCesiumWidgetCreateByCesium(
    container,
    Cesium,
    Cesium_Widget_Options
  );
};
