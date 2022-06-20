if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建一个Cesium.CesiumWidget
 * @param {HTMLElement} root 根元素
 * @param {url} CESIUM_BASE_URL
 * @param {object} Cesium_Widget_Options
 * @returns
 */
SunDawningGIS.getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot =
  async function (root, CESIUM_BASE_URL, Cesium_Widget_Options) {
    let cesiumWidget;
    let container;
    {
      await import("./getShadowRootContainerCreateAndAppend.js");
      container = await SunDawningGIS.getShadowRootContainerCreateAndAppend(
        root
      );
    }
    {
      await import("./getCesiumCSSAndCesiumWidgetCreateByBaseURL.js");
      cesiumWidget =
        await SunDawningGIS.getCesiumCSSAndCesiumWidgetCreateByBaseURL(
          container.shadowRoot,
          CESIUM_BASE_URL,
          Cesium_Widget_Options
        );
    }
    return cesiumWidget;
  };
