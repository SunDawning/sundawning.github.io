/**
 * 使用Cesium的JavaScript异步创建Viewer
 * @param {HTMLElement} container
 * @param {string} url
 * @returns Cesium.Viewer
 */
SunDawningGIS.CesiumViewer_getCesiumViewerCreateByURL = async function a(
  container,
  url
) {
  await import(url);
  await import("./CesiumViewer_getCesiumViewerCreateByCesium.js");
  return SunDawningGIS.CesiumViewer_getCesiumViewerCreateByCesium(
    container,
    Cesium
  );
};
