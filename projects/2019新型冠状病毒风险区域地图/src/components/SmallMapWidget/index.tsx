import { useEffect } from 'react';

import { SceneMode } from 'cesium';
import createWidget from '@/modules/createDefaultWidget';
import Amap_webrd_Imagery from '@/modules/Amap_webrd_Imagery';

import styles from './index.less';

const className = styles.container;
let scene;

/**
 * 小地图
 */
export default function IndexPage() {
  useEffect(function () {
    const container = document.querySelector('.' + className);
    if (container === null) {
      return;
    }
    const widget = createWidget(container);
    scene = widget.scene;
    scene.mode = SceneMode.SCENE2D;
    scene.imageryLayers.addImageryProvider(Amap_webrd_Imagery);
    return function () {
      widget.destroy();
    };
  }, []);
  return <div className={styles.container}></div>;
}
