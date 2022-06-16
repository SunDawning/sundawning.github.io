async function index() {
  const root = document.body;
  {
    globalThis.CESIUM_BASE_URL =
      "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
    await import(
      "./library/getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
    );
    globalThis.cesiumWidget =
      await getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
        root,
        CESIUM_BASE_URL
      );
  }
}
index();
