import { useEffect } from 'react';
import styles from './index.less';
import { Viewer } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
/**
 * CesiumJS默认的界面
 */
export default function IndexPage() {
  const className = styles.container;
  useEffect(function () {
    const container = document.querySelector('.' + className);
    const viewer = new Viewer(container);
  }, []);
  return <div className={className}></div>;
}
