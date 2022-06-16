/**
 * 创建一个Cesium.CesiumWidget
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @returns
 */
window.getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot = async function (
  root,
  CESIUM_BASE_URL
) {
  let cesiumWidget;
  let container;
  {
    await import("./getShadowRootContainerCreateAndAppend.js");
    container = await getShadowRootContainerCreateAndAppend(root);
  }
  {
    await import("./getCesiumCSSAndCesiumWidgetCreateByBaseURL.js");
    cesiumWidget = await getCesiumCSSAndCesiumWidgetCreateByBaseURL(
      container.shadowRoot,
      CESIUM_BASE_URL
    );
  }
  return cesiumWidget;
};
