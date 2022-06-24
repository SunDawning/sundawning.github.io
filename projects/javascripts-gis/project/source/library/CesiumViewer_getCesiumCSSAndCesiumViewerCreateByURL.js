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
SunDawningGIS.CesiumViewer_getCesiumCSSAndCesiumViewerCreateByURL =
  async function (container, widgets_css, Cesium_js) {
    {
      await import("./HTMLElement_appendStyleCSS.js");
      await SunDawningGIS.HTMLElement_appendStyleCSS(container, widgets_css);
    }
    await import("./CesiumViewer_getCesiumViewerCreateByURL.js");
    return await SunDawningGIS.CesiumViewer_getCesiumViewerCreateByURL(
      container,
      Cesium_js
    );
  };
