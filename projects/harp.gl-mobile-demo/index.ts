/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import { GeoCoordinates } from "@here/harp-geoutils";

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

// center the camera to New York
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
// mapView.lookAt({ target: figureGeoPosition, zoomLevel: 20, tilt: 40, heading: 40 });
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
    transformControls.setMode( 'rotate' );
    transformControls.setSize(0.0001);
    mapView.scene.add(transformControls);
    transformControls.attach(figure);
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
