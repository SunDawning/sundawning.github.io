import { ArcGisMapServerImageryProvider } from 'cesium';
/**
 * Cesium.CesiumWidget的配置
 */
export default {
  imageryProvider: new ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  }),
};
