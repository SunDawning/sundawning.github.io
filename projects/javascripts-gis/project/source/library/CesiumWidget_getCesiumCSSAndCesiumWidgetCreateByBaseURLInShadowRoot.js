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
SunDawningGIS.CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot =
  async function (root, CESIUM_BASE_URL, Cesium_Widget_Options) {
    let cesiumWidget;
    let container;
    {
      await import("./HTMLElement_getShadowRootContainerCreateAndAppend.js");
      container =
        await SunDawningGIS.HTMLElement_getShadowRootContainerCreateAndAppend(
          root
        );
    }
    {
      await import(
        "./CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURL.js"
      );
      cesiumWidget =
        await SunDawningGIS.CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURL(
          container.shadowRoot,
          CESIUM_BASE_URL,
          Cesium_Widget_Options
        );
    }
    return cesiumWidget;
  };
