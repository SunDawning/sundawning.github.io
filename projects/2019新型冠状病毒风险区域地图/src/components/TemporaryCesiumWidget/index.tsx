import { useEffect } from 'react';

import createWidget from '@/modules/createDefaultWidget';
import ArcGIS_World_Imagery from '@/modules/ArcGIS_World_Imagery';

import styles from './index.less';

import Sky_Atmosphere from '@/modules/Sandcastle_Sky_Atmosphere';
import SmallMapWidget from '@/components/SmallMapWidget';

let scene;
let camera;
const className = styles.container;

/**
 * 基于CesiumJS默认的简化界面所配置的界面
 */
export default function IndexPage() {
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
    scene.imageryLayers.addImageryProvider(ArcGIS_World_Imagery);
    scene.skyAtmosphere = Sky_Atmosphere;
    return function () {
      widget.destroy();
    };
  }, []);
  return (
    <div className={styles.container}>
      <SmallMapWidget></SmallMapWidget>
    </div>
  );
}
