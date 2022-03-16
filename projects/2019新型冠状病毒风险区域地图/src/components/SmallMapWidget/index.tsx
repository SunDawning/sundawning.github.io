import { useEffect } from 'react';

import { SceneMode, Cartesian3 } from 'cesium';
import createWidget from '@/modules/createDefaultWidget';
import Amap_webrd_Imagery from '@/modules/Amap_webrd_Imagery';
import getCameraWorldPositionAndDistance from '@/modules/getCameraWorldPositionAndDistance';

import styles from './index.less';

const className = styles.container;
let scene;
let camera;
let canvas;

/**
 * 小地图
 */
export default function IndexPage({ widget }) {
  /**
   * 同步widget的视角
   */
  useEffect(
    function () {
      if (widget === undefined) {
        return;
      }
      let camera0 = widget.camera;
      let canvas0 = widget.canvas;
      console.log('widget', widget, camera0, canvas0);
      function onChanged() {
        let data = getCameraWorldPositionAndDistance(canvas0, camera0);
        if (data === undefined) {
          return;
        }
        const [worldPosition, distance] = data;
        camera.lookAt(worldPosition, new Cartesian3(0.0, 0.0, distance));
      }
      camera0.changed.addEventListener(onChanged);
      return function () {
        camera0.changed.removeEventListener(onChanged);
      };
    },
    [widget],
  );
  useEffect(
    function () {
      if (widget === undefined) {
        return;
      }
      function onChanged() {
        let camera0 = widget.camera;
        let data = getCameraWorldPositionAndDistance(canvas, camera);
        if (data === undefined) {
          return;
        }
        const [worldPosition, distance] = data;
        camera0.lookAt(worldPosition, new Cartesian3(0.0, 0.0, distance));
      }
      camera.changed.addEventListener(onChanged);
      return function () {
        camera.changed.removeEventListener(onChanged);
      };
    },
    [widget],
  );
  useEffect(function () {
    const container = document.querySelector('.' + className);
    if (container === null) {
      return;
    }
    const widget = createWidget(container);
    scene = widget.scene;
    camera = widget.camera;
    canvas = widget.canvas;
    // scene.mode = SceneMode.SCENE2D;
    scene.imageryLayers.addImageryProvider(Amap_webrd_Imagery);
    return function () {
      widget.destroy();
    };
  }, []);
  return <div className={styles.container}></div>;
}
