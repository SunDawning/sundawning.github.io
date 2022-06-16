/**
 * 创建一个Cesium.CesiumWidget
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @returns
 */
window.getCesiumWidgetCreateByBaseURLInShadowRoot = async function (
  root,
  CESIUM_BASE_URL
) {
  let cesiumWidget;
  const container = document.createElement("div");
  container.attachShadow({ mode: "open" });
  {
    await import("./getCesiumCSSAndCesiumWidgetCreateByBaseURL.js");
    cesiumWidget = await getCesiumCSSAndCesiumWidgetCreateByBaseURL(
      container.shadowRoot,
      CESIUM_BASE_URL
    );
  }
  {
    await import("./appendChild.js");
    appendChild(root, container);
  }
  return cesiumWidget;
};
