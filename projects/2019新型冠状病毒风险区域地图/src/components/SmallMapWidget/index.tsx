import { useEffect } from 'react';

import createWidget from '@/modules/createDefaultWidget';
import Amap_webrd_Imagery from '@/modules/Amap_webrd_Imagery';
import syncTwoCamera from '@/modules/syncTwoCamera';

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
      function onCamera0Changed() {
        syncTwoCamera(canvas0, camera0, camera);
      }
      camera0.changed.addEventListener(onCamera0Changed);
      function onCameraChanged() {
        syncTwoCamera(canvas, camera, camera0);
      }
      camera.changed.addEventListener(onCameraChanged);
      return function () {
        camera0.changed.removeEventListener(onCamera0Changed);
        camera.changed.removeEventListener(onCameraChanged);
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
