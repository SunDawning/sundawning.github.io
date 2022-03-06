import { SkyAtmosphere } from 'cesium';
/**
 * 在Sandcastle里设置的大气参数
 * https://sandcastle.cesium.com/index.html?src=Sky%2520Atmosphere.html
 */
const Sky_Atmosphere = new SkyAtmosphere();
Object.assign(Sky_Atmosphere, {
  saturationShift: 0.2,
  brightnessShift: 0.2,
});
export default Sky_Atmosphere;
