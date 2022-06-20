if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加Cesium的CSS样式和CesiumWidget
 * @param {HTMLElement} container
 * @param {string} widgets_css
 * @param {string} Cesium_js
 * @param {object} Cesium_Widget_Options
 * @returns Cesium.CesiumWidget
 */
SunDawningGIS.getCesiumCSSAndCesiumWidgetCreateByURL = async function (
  container,
  widgets_css,
  Cesium_js,
  Cesium_Widget_Options
) {
  {
    await import("./appendStyleCSS.js");
    await SunDawningGIS.appendStyleCSS(container, widgets_css);
  }
  {
    await import("./cesiumWidgetCreditsToNone.js");
    await SunDawningGIS.cesiumWidgetCreditsToNone(container);
  }
  await import("./getCesiumWidgetCreateByURL.js");
  return await SunDawningGIS.getCesiumWidgetCreateByURL(
    container,
    Cesium_js,
    Cesium_Widget_Options
  );
};
