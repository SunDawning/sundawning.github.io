/**
 * 使用Cesium的JavaScript异步创建CesiumWidget
 * @param {HTMLElement} container
 * @param {string} url
 * @returns Cesium.CesiumWidget
 */
globalThis.getCesiumWidgetCreateByURL = async function (container, url) {
  await import(url);
  await import("./getCesiumWidgetCreateByCesium.js");
  return getCesiumWidgetCreateByCesium(container, Cesium);
};
