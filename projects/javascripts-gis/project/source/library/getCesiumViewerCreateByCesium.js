/**
 * 使用Cesium创建Viewer
 * @param {HTMLElement} container
 * @param {object} Cesium
 * @returns Cesium.Viewer
 */
window.getCesiumViewerCreateByCesium = function (container, Cesium) {
  return new Cesium.Viewer(container);
};
