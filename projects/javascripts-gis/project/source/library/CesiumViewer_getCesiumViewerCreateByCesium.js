if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 使用Cesium创建Viewer
 * @param {HTMLElement} container
 * @param {object} Cesium
 * @returns Cesium.Viewer
 */
SunDawningGIS.CesiumViewer_getCesiumViewerCreateByCesium = function (
  container,
  Cesium
) {
  return new Cesium.Viewer(container);
};
