if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 隐藏CesiumWidget的版权声明
 * @param {HTMLElement} container
 */

SunDawningGIS.Cesium_cesiumWidgetCreditsToNone = async function (container) {
  await import("./HTMLElement_appendStyleText.js");
  SunDawningGIS.HTMLElement_appendStyleText(
    container,
    `
.cesium-widget-credits,
.cesium-credit-lightbox-overlay{
display:none;
}      
    `
  );
};
