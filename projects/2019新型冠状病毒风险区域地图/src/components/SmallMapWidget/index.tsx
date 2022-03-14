import { useEffect } from 'react';

import { SceneMode, Cartesian3 } from 'cesium';
import createWidget from '@/modules/createDefaultWidget';
import Amap_webrd_Imagery from '@/modules/Amap_webrd_Imagery';

import styles from './index.less';

const className = styles.container;
let scene;
let camera;

/**
 * 小地图
 */
export default function IndexPage({ worldPosition, distance }) {
  useEffect(function () {
    const container = document.querySelector('.' + className);
    if (container === null) {
      return;
    }
    const widget = createWidget(container);
    scene = widget.scene;
    camera = widget.camera;
    // scene.mode = SceneMode.SCENE2D;
    scene.imageryLayers.addImageryProvider(Amap_webrd_Imagery);
    return function () {
      widget.destroy();
    };
  }, []);
  useEffect(
    function () {
      if (worldPosition === undefined) {
        return;
      }
      if (distance === undefined) {
        return;
      }
      // console.log(worldPosition, distance);
      camera.lookAt(worldPosition, new Cartesian3(0.0, 0.0, distance));
    },
    [worldPosition, distance],
  );
  return <div className={styles.container}></div>;
}
