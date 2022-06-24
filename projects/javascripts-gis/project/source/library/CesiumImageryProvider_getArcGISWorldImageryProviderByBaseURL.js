if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * services.arcgisonline.com下的世界影像
 * @param {string} CESIUM_BASE_URL
 * @returns Cesium.ArcGisMapServerImageryProvider
 */
SunDawningGIS.CesiumImageryProvider_getArcGISWorldImageryProviderByBaseURL =
  async function (CESIUM_BASE_URL) {
    await import(`${CESIUM_BASE_URL}/Cesium.js`);
    return new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    });
  };
