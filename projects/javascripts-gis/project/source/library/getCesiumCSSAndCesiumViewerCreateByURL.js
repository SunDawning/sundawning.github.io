if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加Cesium的CSS样式和Cesium.Viewer
 * @param {HTMLElement} container
 * @param {string} widgets_css
 * @param {string} Cesium_js
 * @returns Cesium.Viewer
 */
SunDawningGIS.getCesiumCSSAndCesiumViewerCreateByURL = async function (
  container,
  widgets_css,
  Cesium_js
) {
  {
    await import("./appendStyleCSS.js");
    await SunDawningGIS.appendStyleCSS(container, widgets_css);
  }
  await import("./getCesiumViewerCreateByURL.js");
  return await SunDawningGIS.getCesiumViewerCreateByURL(container, Cesium_js);
};
