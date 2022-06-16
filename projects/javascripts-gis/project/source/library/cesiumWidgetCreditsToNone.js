/**
 * 隐藏CesiumWidget的版权声明
 * @param {HTMLElement} container
 */

window.cesiumWidgetCreditsToNone = async function (container) {
  await import("./appendStyleText.js");
  appendStyleText(
    container,
    `
.cesium-widget-credits,
.cesium-credit-lightbox-overlay{
display:none;
}      
    `
  );
};
