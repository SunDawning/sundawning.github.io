/**
 * 使用Cesium创建CesiumWidget
 * @param {HTMLElement} container
 * @param {object} Cesium
 * @param {object} Cesium_Widget_Options
 * @returns Cesium.CesiumWidget
 */
globalThis.getCesiumWidgetCreateByCesium = function (
  container,
  Cesium,
  Cesium_Widget_Options
) {
  return new Cesium.CesiumWidget(container, Cesium_Widget_Options);
};
