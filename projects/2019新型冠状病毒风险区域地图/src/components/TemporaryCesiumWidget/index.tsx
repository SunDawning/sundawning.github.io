import { useState, useEffect } from 'react';
import styles from './index.less';
import createWidget from '@/modules/createDefaultWidget';
import ArcGIS_World_Imagery from '@/modules/ArcGIS_World_Imagery';
import Sky_Atmosphere from '@/modules/Sandcastle_Sky_Atmosphere';
import { Button } from 'antd';
/**
 * 基于CesiumJS默认的简化界面所配置的界面
 */
export default function IndexPage() {
  let scene;
  let camera;
  const className = styles.container;
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
  function onClick(event) {
    console.log('onClick', event, event.target.innerText);
    camera.flyHome();
  }
  return (
    <div className={className}>
      <Button type="primary" style={{ position: 'absolute' }} onClick={onClick}>
        全球
      </Button>
    </div>
  );
}
