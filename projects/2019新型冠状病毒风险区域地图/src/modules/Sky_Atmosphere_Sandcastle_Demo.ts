import { SkyAtmosphere } from 'cesium';
const Sky_Atmosphere = new SkyAtmosphere();
Object.assign(Sky_Atmosphere, {
  saturationShift: 0.2,
  brightnessShift: 0.2,
});
export default Sky_Atmosphere;
