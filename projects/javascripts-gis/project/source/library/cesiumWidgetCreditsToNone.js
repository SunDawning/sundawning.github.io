if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 隐藏CesiumWidget的版权声明
 * @param {HTMLElement} container
 */

SunDawningGIS.cesiumWidgetCreditsToNone = async function (container) {
  await import("./appendStyleText.js");
  SunDawningGIS.appendStyleText(
    container,
    `
.cesium-widget-credits,
.cesium-credit-lightbox-overlay{
display:none;
}      
    `
  );
};
