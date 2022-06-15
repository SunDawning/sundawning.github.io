/**
 * 创建一个Cesium.Viewer
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @returns
 */
window.getCesiumViewerCreateByBaseURL = async function (root, CESIUM_BASE_URL) {
  let viewer;
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
    await import("./getCesiumViewerCreateByURL.js");
    viewer = await getCesiumViewerCreateByURL(
      container.shadowRoot,
      `${CESIUM_BASE_URL}/Cesium.js`
    );
  }
  {
    await import("./appendChild.js");
    appendChild(root, container);
  }
  return viewer;
};
