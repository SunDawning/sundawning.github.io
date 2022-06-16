/**
 * 创建一个Cesium.CesiumWidget
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @param {object} Cesium_Widget_Options
 * @returns
 */
globalThis.getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot =
  async function (root, CESIUM_BASE_URL, Cesium_Widget_Options) {
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
        CESIUM_BASE_URL,
        Cesium_Widget_Options
      );
    }
    return cesiumWidget;
  };
