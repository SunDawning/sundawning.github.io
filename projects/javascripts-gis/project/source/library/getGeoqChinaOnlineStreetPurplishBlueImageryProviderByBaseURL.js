/**
 * map.geoq.cn域名下的中国深色街道地图
 * @param {string} CESIUM_BASE_URL
 * @returns Cesium.ArcGisMapServerImageryProvider
 */
globalThis.getGeoqChinaOnlineStreetPurplishBlueImageryProviderByBaseURL =
  async function (CESIUM_BASE_URL) {
    await import(`${CESIUM_BASE_URL}/Cesium.js`);
    return new Cesium.ArcGisMapServerImageryProvider({
      url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
    });
  };
