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
// 1. https://www.iconfont.cn/search/index?searchType=icon&q=clear&page=1&fromCollection=1&fills=&tag=
// 2. https://tiomg.org/compress-image
// 3. https://oktools.net/image2base64
homeButton.innerHTML = `
<img style="width:100%;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURUxpcdTW19TU1tXV19TV11XGEd8AAAAEdFJOUwC/gUQuuPM0AAACN0lEQVR42u2abXKCMBRFTdIFaMsCrGYBoCxAIftfU+1YqEQgX+/O6My9v8Uj75Dk6XOzYRiGYRiGYRiGYVZizmc44+Sc24MZ+sZwVzDE/kLcF5Sh3D01Unr1B+mAkMYNwbk3IwPo3v5DYO61ewzIfTWBdGDrOPfGY0DcD9Y7i3M/Wt9rnPvBer/ZtCj3g/Vr/bC5CLs3Ew8Nxr2dFmh0v4VY99d+DbF+D8D9o3XvYBFzb2YMKGn3dq40wu71bGWE3VfzW9XovodYl3c/vtd+qT0ScN8uLwgx93pFr5h7u3ZANTLu1YJ1SffL1gXdt6FtUMC9DorV5bdiw21JsXsV8ykL3YesewXrMNYF3OvI5WxK3NvYZrTAvYr/fFXuFhZnvdB9m3JdpnudVIFM9zbtK8jo/oKxnu0+xXq2+yb9wbepW5hZPQ6F3NucBzLRvc5bWmnuq7wDQqdsYU3udtfG34rOsO49+D3GeuISNiWHqY2sly5pC2IvVkUNThtXapVpfeI+DpLddKoESHaTrgkhhBBCCCHkZSDmsNsdaizkr708IiGnoRM94iAmOJoTgNjgaK4coh4HgFsQxIYHpsUQb5pZQyBqCtlCINaFB8ylkKfZbw2AaBcxxS6FKB+yBUA+fMgFAGl9SP+uEOtDOkIIIYQQQgghhBBCCCHkdSGHmTxD5l6VACkMIe8H0RKQ0O+kRgJSh350FWCE/8HQlkPCM11T4at1o3zvivIZwWAYhmEYhmEYhnnOD6nzOTwrW3mgAAAAAElFTkSuQmCC">
`;
homeButton.title = "Reset to home view";
homeButton.style.padding="8px";
homeButton.classList.add("harp-gl_controls-button");
homeButton.classList.add("harp-gl_controls_button-bottom");
buttonsElement.appendChild(homeButton);
homeButton.addEventListener("click", event => {
    mapView.lookAt({ target: figureGeoPosition, zoomLevel: 18, tilt: 70});    
});
const markButton = document.createElement("button");
markButton.innerHTML = `
<img style="width:100%;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUxpcdTU19TW19TU1tXV19TV19TV12FsSSYAAAAGdFJOUwBBvoAf38yblZoAAAKFSURBVHja7Zo/b8IwEMUJAWZSqsy0VTNDkTLThRl1YAZC/f0/QqWShebsvPM5VK3e21CMfo7/vDtfPBpRFEVRFEX9C2Wv7oc+5skhpevolBxy6EI+UzNyJ2iVGDKWIEtCCCHktyDN5lv1oJDj9deMEEIIIYQQQgghhBBCrposNrLeJMiLp/F6G4TULqxbiFeN+iAdAQkevutUkNCrVKkgZ0IIIeSvQM6FV20BNfO3qFCIJfAQQgghhBBCCCFRkI1BlT1bQUUIIYTYIHUqSKhYUKaCnCy1FVSh2sroIQ3jKezU74V5yE7FY29AaCd/Xai1AIpdt8t4ro9XmYNjXnsLZhtRW8TvzBhu17T9g7tzjo/vwCBk+Oz51kz/dOZ2yAqtMkddqyrRmvT02vASA9ld/7vvbThDG/o7eER7E1WGH6OjUBruh+XofNZ2SDOgdSnMC7YGi3kZXAXu4cQEAc3LYl2weeUGV4GXprCfxr7d2X0AmpfgKjvfNu4+mGG+InzcK30D2H0AmpfgKgoIGCdsEHDZCItQD2mw7TSKg4BbWXAfBaT9u9O7igYCZYaSq2ggUKCQlocGAvlKLkRpDQQK3tKW1UCgpEhKiDQQyLykhEgDgVJDaUw1EMi8pNCmgUC+IriKCgIlRQcjBDqnSR2JgDjAupp4CGBemRkCJEWSq0RBVv0J0TEeAiRFU8l6VBDgoCbedoqBHLXHLBUE8JVSWhsqCJAU1dJWUkGAU0FlhgBJ0UFyHhWk37xEV1FCen0lc8k0H75iG/KVu0DG6SDLPutKoX1fQpRCl+G/B4R8pU4HaYb/RhOC3OVN7jInd9knCT+cBRKv/DmRoqqLFEVRFEVRlFFfEumzImAJwbEAAAAASUVORK5CYII=">
`;
markButton.title = "Clear markers";
markButton.style.padding="8px";
markButton.classList.add("harp-gl_controls-button");
markButton.classList.add("harp-gl_controls_button-bottom");
buttonsElement.appendChild(markButton);
markButton.addEventListener("click", event => {
    clearMarkers();
});
const earthButton = document.createElement("button");
earthButton.innerHTML = `
<img style="width:100%;" src="data:image/png;base64,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">
`;
earthButton.title = "Go to earth view";
earthButton.style.padding="8px";
earthButton.classList.add("harp-gl_controls-button");
earthButton.classList.add("harp-gl_controls_button-bottom");
buttonsElement.appendChild(earthButton);
earthButton.addEventListener("click", event => {
    mapView.lookAt({
	zoomLevel:2,
	tilt:0,
	target:figureGeoPosition,
    });
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
