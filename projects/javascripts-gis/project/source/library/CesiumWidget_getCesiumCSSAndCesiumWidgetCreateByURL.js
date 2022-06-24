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
SunDawningGIS.CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByURL =
  async function (container, widgets_css, Cesium_js, Cesium_Widget_Options) {
    {
      await import("./HTMLElement_appendStyleCSS.js");
      await SunDawningGIS.HTMLElement_appendStyleCSS(container, widgets_css);
    }
    {
      await import("./Cesium_cesiumWidgetCreditsToNone.js");
      await SunDawningGIS.Cesium_cesiumWidgetCreditsToNone(container);
    }
    await import("./CesiumWidget_getCesiumWidgetCreateByURL.js");
    return await SunDawningGIS.CesiumWidget_getCesiumWidgetCreateByURL(
      container,
      Cesium_js,
      Cesium_Widget_Options
    );
  };
