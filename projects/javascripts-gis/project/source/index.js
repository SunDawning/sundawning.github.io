async function index() {
  const root = document.body;
  {
    window.CESIUM_BASE_URL =
      "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
    await import("./library/getCesiumWidgetCreateByBaseURL.js");
    window.cesiumWidget = await getCesiumWidgetCreateByBaseURL(
      root,
      CESIUM_BASE_URL
    );
  }
}
index();