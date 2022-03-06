import { useEffect } from 'react';
import styles from './index.less';
import { CesiumWidget } from 'cesium';
import ArcGIS_World_Imagery from '@/modules/ArcGIS_World_Imagery';
import Sky_Atmosphere from '@/modules/Sky_Atmosphere_Sandcastle_Demo';
/**
 * 基于CesiumJS默认的简化界面所配置的界面
 */
export default function IndexPage() {
  const className = styles.container;
  useEffect(function () {
    const container = document.querySelector('.' + className);
    const widget = new CesiumWidget(container, {
      imageryProvider: false,
    });
    console.log('widget', widget);
    const { scene } = widget;
    scene.imageryLayers.addImageryProvider(ArcGIS_World_Imagery);
    scene.skyAtmosphere = Sky_Atmosphere;
    return function () {
      widget.destroy();
    };
  }, []);
  return <div className={className}></div>;
}
