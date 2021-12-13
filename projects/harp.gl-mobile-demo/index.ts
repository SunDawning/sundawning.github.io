/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

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

// center the camera to New York
mapView.lookAt({
    // 查找经纬度，https://www.latlong.net/
    target: new GeoCoordinates(22.606020,113.998273),
    zoomLevel: 17,
    // 倾斜 mapView.tilt
    tilt: 70
});

// make sure the map is rendered
mapView.update();
