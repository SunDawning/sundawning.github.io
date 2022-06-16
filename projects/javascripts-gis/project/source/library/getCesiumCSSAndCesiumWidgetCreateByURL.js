/**
 * 添加Cesium的CSS样式和CesiumWidget
 * @param {HTMLElement} container
 * @param {string} widgets_css
 * @param {string} Cesium_js
 * @param {object} Cesium_Widget_Options
 * @returns Cesium.CesiumWidget
 */
globalThis.getCesiumCSSAndCesiumWidgetCreateByURL = async function (
  container,
  widgets_css,
  Cesium_js,
  Cesium_Widget_Options
) {
  {
    await import("./appendStyleCSS.js");
    await appendStyleCSS(container, widgets_css);
  }
  {
    await import("./cesiumWidgetCreditsToNone.js");
    await cesiumWidgetCreditsToNone(container);
  }
  await import("./getCesiumWidgetCreateByURL.js");
  return await getCesiumWidgetCreateByURL(
    container,
    Cesium_js,
    Cesium_Widget_Options
  );
};
