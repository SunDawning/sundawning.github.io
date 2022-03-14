import { useEffect, useState } from 'react';

import { Cartesian2, defined, Cartesian3 } from 'cesium';
import createWidget from '@/modules/createDefaultWidget';
import ArcGIS_World_Imagery from '@/modules/ArcGIS_World_Imagery';

import styles from './index.less';

import Sky_Atmosphere from '@/modules/Sandcastle_Sky_Atmosphere';
import SmallMapWidget from '@/components/SmallMapWidget';

let scene;
let camera;
const className = styles.container;
let canvas;

/**
 * 基于CesiumJS默认的简化界面所配置的界面
 */
export default function IndexPage() {
  const [worldPosition, setWorldPosition] = useState();
  const [distance, setDistance] = useState();
  function onChanged() {
    if (canvas === undefined) {
      return;
    }
    const viewCenter = new Cartesian2(
      Math.floor(canvas.clientWidth / 2),
      Math.floor(canvas.clientHeight / 2),
    );
    const newWorldPosition = camera.pickEllipsoid(viewCenter);
    if (defined(newWorldPosition)) {
      setWorldPosition(newWorldPosition);
      setDistance(Cartesian3.distance(newWorldPosition, camera.positionWC));
    }
  }
  useEffect(function () {
    const container = document.querySelector('.' + className);
    // Argument of type 'Element | null' is not assignable to parameter of type 'Element'.
    if (container === null) {
      // Argument of type '() => (() => void) | null' is not assignable to parameter of type 'EffectCallback'.
      return;
    }
    const widget = createWidget(container);
    scene = widget.scene;
    camera = widget.camera;
    canvas = widget.canvas;
    scene.imageryLayers.addImageryProvider(ArcGIS_World_Imagery);
    scene.skyAtmosphere = Sky_Atmosphere;
    camera.changed.addEventListener(onChanged);
    return function () {
      widget.destroy();
    };
  }, []);
  return (
    <div className={styles.container}>
      <SmallMapWidget
        worldPosition={worldPosition}
        distance={distance}
      ></SmallMapWidget>
    </div>
  );
}
