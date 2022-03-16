import getCameraWorldPositionAndDistance from '@/modules/getCameraWorldPositionAndDistance';
import { Cartesian3, Matrix4 } from 'cesium';

/**
 * 将camera0的视角同步到camera1的视角
 */
export default function syncTwoCamera(canvas0, camera0, camera1) {
  let data = getCameraWorldPositionAndDistance(canvas0, camera0);
  if (data === undefined) {
    return;
  }
  const [worldPosition, distance] = data;
  camera1.lookAt(worldPosition, new Cartesian3(0.0, 0.0, distance));
  camera1.lookAtTransform(Matrix4.IDENTITY);
}
