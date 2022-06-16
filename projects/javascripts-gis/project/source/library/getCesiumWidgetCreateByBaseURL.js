/**
 * 创建一个Cesium.CesiumWidget
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @returns
 */
window.getCesiumWidgetCreateByBaseURL = async function (root, CESIUM_BASE_URL) {
  let cesiumWidget;
  const container = document.createElement("div");
  container.attachShadow({ mode: "open" });
  {
    await import("./appendStyleCSS.js");
    appendStyleCSS(
      container.shadowRoot,
      `${CESIUM_BASE_URL}/Widgets/widgets.css`
    );
  }
  {
    await import("./getCesiumWidgetCreateByURL.js");
    cesiumWidget = await getCesiumWidgetCreateByURL(
      container.shadowRoot,
      `${CESIUM_BASE_URL}/Cesium.js`
    );
  }
  {
    await import("./appendStyleText.js");
    appendStyleText(
      container.shadowRoot,
      `
.cesium-widget-credits,
.cesium-credit-lightbox-overlay{
  display:none;
}      
      `
    );
  }
  {
    await import("./appendChild.js");
    appendChild(root, container);
  }

  return cesiumWidget;
};
