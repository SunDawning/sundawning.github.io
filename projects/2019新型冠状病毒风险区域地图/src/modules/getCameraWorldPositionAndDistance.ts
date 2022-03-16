import { Cartesian2, defined, Cartesian3 } from 'cesium';
/**
 * 计算相机的世界坐标和距离
 */
export default function (canvas, camera) {
  if (canvas === undefined) {
    return;
  }
  const viewCenter = new Cartesian2(
    Math.floor(canvas.clientWidth / 2),
    Math.floor(canvas.clientHeight / 2),
  );
  const newWorldPosition = camera.pickEllipsoid(viewCenter);
  if (defined(newWorldPosition)) {
    return [
      newWorldPosition,
      Cartesian3.distance(newWorldPosition, camera.positionWC),
    ];
  }
}
