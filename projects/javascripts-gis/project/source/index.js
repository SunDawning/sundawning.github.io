async function index() {
  const root = document.body;
  {
    await import("./library/appendStyleText.js");
    appendStyleText(
      root,
      `
body{
  margin:0;
}
    `
    );
  }
  {
    globalThis.CESIUM_BASE_URL =
      "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
    await import(
      "./library/getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
    );
    let imageryProvider;
    {
      await import(
        "./library/getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL.js"
      );
      imageryProvider =
        await getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL(
          CESIUM_BASE_URL
        );
    }
    globalThis.cesiumWidget =
      await getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
        root,
        CESIUM_BASE_URL,
        { imageryProvider }
      );
  }
}
index();
