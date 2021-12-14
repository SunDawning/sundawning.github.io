/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import { GeoCoordinates } from "@here/harp-geoutils";

import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";


import { View } from "./View";

const app = new View({
    canvas: document.getElementById("map") as HTMLCanvasElement
});
console.log("app",app);

const mapView = app.mapView;

// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener("resize", () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

// 大气层
import { MapViewAtmosphere, AtmosphereLightMode } from "@here/harp-mapview";
const map = mapView;
const { camera, projection, mapAnchors } = map;
const updateCallback = () => map.update();
const atmosphere = new MapViewAtmosphere(
    mapAnchors,
    camera,
    projection,
    map.renderer.capabilities,
    updateCallback
);
atmosphere.lightMode = AtmosphereLightMode.LightDynamic;

// center the camera
mapView.lookAt({
    // 查找经纬度，https://www.latlong.net/
    target: new GeoCoordinates(22.606020,113.998273),
    zoomLevel: 17,
    // 倾斜 mapView.tilt
    tilt: 70
});

// 添加动画模型
import { MapAnchor, MapViewEventNames, RenderEvent } from "@here/harp-mapview";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
const figureGeoPosition = new GeoCoordinates(22.606020,113.998273);
mapView.lookAt({ target: figureGeoPosition, zoomLevel: 18});
const clock = new THREE.Clock();
let figure: MapAnchor<THREE.Group> | undefined;
let mixer: THREE.AnimationMixer | undefined;
const onLoad = (object: any) => {
    mixer = new THREE.AnimationMixer(object);

    const action = mixer.clipAction(object.animations[0]);
    action.play();

    figure = object as THREE.Group;
    figure.traverse((child: THREE.Object3D) => {
        child.renderOrder = 10000;
    });
    figure.renderOrder = 10000;
    // figure.rotateX(Math.PI / 2);
    // figure.rotateZ(Math.PI / 2);
    figure.rotation.set(0.38301767159470745, 0.10773774308833531, 0.38685412993645246);
    console.log("figure",figure);
    figure.scale.set(0.3, 0.3, 0.3);
    figure.name = "guy";

    // snippet:harp_gl_threejs_add_animated-object_add_to_scene.ts
    figure.anchor = figureGeoPosition;
    // Make sure the object is rendered on top of labels
    figure.overlay = true;
    mapView.mapAnchors.add(figure);

    // 调整位置
    const transformControls = new TransformControls(mapView.camera, mapView.canvas);
    transformControls.setSpace("local");
    transformControls.setMode("rotate");
    transformControls.setSize(0.0001);
    // mapView.scene.add(transformControls);
    // transformControls.attach(figure);
    console.log("transformControls",transformControls,figure);
};
const loader = new FBXLoader();
loader.load("resources/dancing.fbx", onLoad);
const onRender = (event: RenderEvent) => {
    if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
    }
};
mapView.addEventListener(MapViewEventNames.Render, onRender);
mapView.beginAnimation();

// make sure the map is rendered
mapView.update();

import { MapControls } from "@here/harp-map-controls";
const mapControls = new MapControls(mapView);
console.log("mapControls",mapControls);

// 添加界面
import { MapControlsUI } from "@here/harp-map-controls";
const ui = new MapControlsUI(mapControls, {
    // 可以手动输入地图的缩放级别
    zoomLevel: "input",
});
mapView.canvas.parentElement!.appendChild(ui.domElement);
console.log("ui",ui);
// 不显示＂3D＂按钮
const tiltButton = ui.domElement.querySelector("#harp-gl_controls_tilt-button-ui");
const buttonsElement = tiltButton.parentElement;
tiltButton.remove();
const homeButton = document.createElement("button");
homeButton.innerText = "H";
homeButton.title = "Reset to home view";
homeButton.classList.add("harp-gl_controls-button");
homeButton.classList.add("harp-gl_controls_button-bottom");
buttonsElement.appendChild(homeButton);
homeButton.addEventListener("click", event => {
    mapView.lookAt({ target: figureGeoPosition, zoomLevel: 18});    
});
const markButton = document.createElement("button");
markButton.innerText = "M";
markButton.title = "Clear markers";
markButton.classList.add("harp-gl_controls-button");
markButton.classList.add("harp-gl_controls_button-bottom");
buttonsElement.appendChild(markButton);
markButton.addEventListener("click", event => {
    clearMarkers();
});

// TODO 在移动设备上，一个手指转动地图
// https://github.com/heremaps/harp.gl/blob/9ee5cac7/@here/harp-map-controls/lib/MapControls.ts
// 源码 touchMove无法直接修改

// 点击添加标记
const icons = [
    {
        name: "redIcon",
        url:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NyIgdmlld0JveD0iMCAwIDM4IDQ3Ij48ZyBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjMEYxNjIxIiBmaWxsLW9wYWNpdHk9Ii40IiBkPSJNMTUgNDZjMCAuMzE3IDEuNzkuNTc0IDQgLjU3NHM0LS4yNTcgNC0uNTc0YzAtLjMxNy0xLjc5LS41NzQtNC0uNTc0cy00IC4yNTctNCAuNTc0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNiNjAxMDEiIGQ9Ik0zMy4yNSAzMS42NTJBMTkuMDE1IDE5LjAxNSAwIDAgMCAzOCAxOS4wNkMzOCA4LjU0OSAyOS40NzggMCAxOSAwUzAgOC41NSAwIDE5LjA1OWMwIDQuODIzIDEuNzk1IDkuMjMzIDQuNzUgMTIuNTkzTDE4Ljk3NSA0NiAzMy4yNSAzMS42NTJ6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzZBNkQ3NCIgZmlsbC1vcGFjaXR5PSIuNSIgZD0iTTI2Ljg2MiAzNy41bDQuNzE0LTQuNzdjMy44MjItMy41NzYgNS45MjQtOC40MTEgNS45MjQtMTMuNjJDMzcuNSA4Ljg0NyAyOS4yLjUgMTkgLjVTLjUgOC44NDguNSAxOS4xMWMwIDUuMjA5IDIuMTAyIDEwLjA0NCA1LjkxOSAxMy42MTRsNC43MTkgNC43NzZoMTUuNzI0ek0xOSAwYzEwLjQ5MyAwIDE5IDguNTI1IDE5IDE5LjA0MSAwIDUuNTA3LTIuMzQ4IDEwLjQ1NC02LjA3OSAxMy45MzJMMTkgNDYgNi4wNzkgMzIuOTczQzIuMzQ4IDI5LjQ5NSAwIDI0LjU0OCAwIDE5LjA0IDAgOC41MjUgOC41MDcgMCAxOSAweiI+PC9wYXRoPjwvZz48L3N2Zz4K"
    },
    {
        name: "greenIcon",
        url:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NyIgdmlld0JveD0iMCAwIDM4IDQ3Ij48ZyBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjMEYxNjIxIiBmaWxsLW9wYWNpdHk9Ii40IiBkPSJNMTUgNDZjMCAuMzE3IDEuNzkuNTc0IDQgLjU3NHM0LS4yNTcgNC0uNTc0YzAtLjMxNy0xLjc5LS41NzQtNC0uNTc0cy00IC4yNTctNCAuNTc0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwNGI2MDEiIGQ9Ik0zMy4yNSAzMS42NTJBMTkuMDE1IDE5LjAxNSAwIDAgMCAzOCAxOS4wNkMzOCA4LjU0OSAyOS40NzggMCAxOSAwUzAgOC41NSAwIDE5LjA1OWMwIDQuODIzIDEuNzk1IDkuMjMzIDQuNzUgMTIuNTkzTDE4Ljk3NSA0NiAzMy4yNSAzMS42NTJ6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzZBNkQ3NCIgZmlsbC1vcGFjaXR5PSIuNSIgZD0iTTI2Ljg2MiAzNy41bDQuNzE0LTQuNzdjMy44MjItMy41NzYgNS45MjQtOC40MTEgNS45MjQtMTMuNjJDMzcuNSA4Ljg0NyAyOS4yLjUgMTkgLjVTLjUgOC44NDguNSAxOS4xMWMwIDUuMjA5IDIuMTAyIDEwLjA0NCA1LjkxOSAxMy42MTRsNC43MTkgNC43NzZoMTUuNzI0ek0xOSAwYzEwLjQ5MyAwIDE5IDguNTI1IDE5IDE5LjA0MSAwIDUuNTA3LTIuMzQ4IDEwLjQ1NC02LjA3OSAxMy45MzJMMTkgNDYgNi4wNzkgMzIuOTczQzIuMzQ4IDI5LjQ5NSAwIDI0LjU0OCAwIDE5LjA0IDAgOC41MjUgOC41MDcgMCAxOSAweiI+PC9wYXRoPjwvZz48L3N2Zz4K"
    },
    {
        name: "blueIcon",
        url:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NyIgdmlld0JveD0iMCAwIDM4IDQ3Ij48ZyBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjMEYxNjIxIiBmaWxsLW9wYWNpdHk9Ii40IiBkPSJNMTUgNDZjMCAuMzE3IDEuNzkuNTc0IDQgLjU3NHM0LS4yNTcgNC0uNTc0YzAtLjMxNy0xLjc5LS41NzQtNC0uNTc0cy00IC4yNTctNCAuNTc0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMTgwYjYiIGQ9Ik0zMy4yNSAzMS42NTJBMTkuMDE1IDE5LjAxNSAwIDAgMCAzOCAxOS4wNkMzOCA4LjU0OSAyOS40NzggMCAxOSAwUzAgOC41NSAwIDE5LjA1OWMwIDQuODIzIDEuNzk1IDkuMjMzIDQuNzUgMTIuNTkzTDE4Ljk3NSA0NiAzMy4yNSAzMS42NTJ6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzZBNkQ3NCIgZmlsbC1vcGFjaXR5PSIuNSIgZD0iTTI2Ljg2MiAzNy41bDQuNzE0LTQuNzdjMy44MjItMy41NzYgNS45MjQtOC40MTEgNS45MjQtMTMuNjJDMzcuNSA4Ljg0NyAyOS4yLjUgMTkgLjVTLjUgOC44NDguNSAxOS4xMWMwIDUuMjA5IDIuMTAyIDEwLjA0NCA1LjkxOSAxMy42MTRsNC43MTkgNC43NzZoMTUuNzI0ek0xOSAwYzEwLjQ5MyAwIDE5IDguNTI1IDE5IDE5LjA0MSAwIDUuNTA3LTIuMzQ4IDEwLjQ1NC02LjA3OSAxMy45MzJMMTkgNDYgNi4wNzkgMzIuOTczQzIuMzQ4IDI5LjQ5NSAwIDI0LjU0OCAwIDE5LjA0IDAgOC41MjUgOC41MDcgMCAxOSAweiI+PC9wYXRoPjwvZz48L3N2Zz4K"
    }
];
// Register the icon image referenced in the style.
for (const { name, url } of icons) {
    map.userImageCache.addImage(name, url);
}
// Create a [[FeaturesDataSource]] for the markers.
import { FeaturesDataSource } from "@here/harp-features-datasource";
const markersDataSource = new FeaturesDataSource({
    name: "geojson",
    styleSetName: "geojson",
    gatherFeatureAttributes: true
});
mapView.addDataSource(markersDataSource);
import { MapViewPointFeature } from "@here/harp-features-datasource";
let markerId = 0;
function addMarker(x: number, y: number) {
    const geo = mapView.getGeoCoordinatesAt(x, y);
    if (geo) {
        // Add a new marker to the data source at the click coordinates.
        markersDataSource.add(
            new MapViewPointFeature(geo.toGeoPoint() as number[], {
                text: markerId.toString(),
                id: markerId,
                icon: icons[markerId % icons.length].name,
                renderOrder: markerId
            })
        );
        markerId++;
    }
}
import {
    GeoJsonDataProvider,
} from "@here/harp-vectortile-datasource";
function removeMarker(x: number, y: number): void {
    // Intersection test filtering the results by layer name to get only markers.
    const layerName = (markersDataSource.dataProvider() as GeoJsonDataProvider).name;
    const results = mapView.intersectMapObjects(x, y).filter(result => {
        return result.userData?.$layer === layerName;
    });

    if (results.length === 0) {
        return;
    }

    const uuid = results[0].userData?.__mapViewUuid;
    if (uuid !== undefined) {
        const feature = new MapViewPointFeature([]);
        feature.uuid = uuid;
        markersDataSource.remove(feature);
    }
}
function clearMarkers() {
    markersDataSource.clear();
    markerId = 0;
}
function getCanvasPosition(event: MouseEvent | Touch): { x: number; y: number } {
    const { left, top } = mapView.canvas.getBoundingClientRect();
    return { x: event.clientX - Math.floor(left), y: event.clientY - Math.floor(top) };
}
import { LongPressHandler } from "@here/harp-map-controls";
function attachInputEvents() {
    const canvas = mapView.canvas;
    new LongPressHandler(
        canvas,
        event => {
            const canvasPos = getCanvasPosition(event);
            removeMarker(canvasPos.x, canvasPos.y);
        },
        event => {
            const canvasPos = getCanvasPosition(event);
            addMarker(canvasPos.x, canvasPos.y);
        }
    );
    window.addEventListener("keypress", event => {
        if (event.key === "c") {
            clearMarkers();
        }
    });
}
attachInputEvents();
