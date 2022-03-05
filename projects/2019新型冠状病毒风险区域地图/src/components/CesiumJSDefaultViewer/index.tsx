import { useEffect } from 'react';
import { Viewer } from 'cesium';
import styles from './index.less';
import 'cesium/Build/Cesium/Widgets/widgets.css';
/**
 * CesiumJS默认的界面
 */
export default function IndexPage() {
  const className = styles.container;
  window.CESIUM_BASE_URL = 'Cesium';
  useEffect(function () {
    const container = document.querySelector('.' + className);
    const viewer = new Viewer(container);
    return function () {
      delete window.CESIUM_BASE_URL;
    };
  }, []);
  return <div className={className}></div>;
}
