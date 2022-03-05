import { ArcGisMapServerImageryProvider } from 'cesium';
/**
 * Cesium.CesiumWidget配置：
 * 使用Arcgis全球影像地图
 */
export default {
  imageryProvider: new ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  }),
};
