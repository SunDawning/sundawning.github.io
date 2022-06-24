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
SunDawningGIS.CesiumWidget_getCesiumWidgetCreateByURL = async function (
  container,
  url,
  Cesium_Widget_Options
) {
  await import(url);
  await import("./CesiumWidget_getCesiumWidgetCreateByCesium.js");
  return SunDawningGIS.CesiumWidget_getCesiumWidgetCreateByCesium(
    container,
    Cesium,
    Cesium_Widget_Options
  );
};
