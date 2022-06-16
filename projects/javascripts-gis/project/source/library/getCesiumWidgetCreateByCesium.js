/**
 * 使用Cesium创建CesiumWidget
 * @param {HTMLElement} container
 * @param {object} Cesium
 * @returns Cesium.CesiumWidget
 */
globalThis.getCesiumWidgetCreateByCesium = function (container, Cesium) {
  return new Cesium.CesiumWidget(container);
};
