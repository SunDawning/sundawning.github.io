/**
 * 使用Cesium的JavaScript异步创建Viewer
 * @param {HTMLElement} container
 * @param {string} url
 * @returns Cesium.Viewer
 */
SunDawningGIS.getCesiumViewerCreateByURL = async function a(container, url) {
  await import(url);
  await import("./getCesiumViewerCreateByCesium.js");
  return SunDawningGIS.getCesiumViewerCreateByCesium(container, Cesium);
};
