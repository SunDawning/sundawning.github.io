/**
 * 创建一个Cesium.Viewer
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @returns
 */
window.getCesiumCSSAndCesiumViewerCreateByBaseURLInShadowRoot = async function (
  root,
  CESIUM_BASE_URL
) {
  let viewer;
  const container = document.createElement("div");
  container.attachShadow({ mode: "open" });
  {
    await import("./getCesiumCSSAndCesiumViewerCreateByBaseURL.js");
    viewer = await getCesiumCSSAndCesiumViewerCreateByBaseURL(
      container.shadowRoot,
      CESIUM_BASE_URL
    );
  }
  {
    await import("./appendChild.js");
    appendChild(root, container);
  }
  return viewer;
};
