/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from "@here/harp-datasource-protocol";
import { MapControls } from "@here/harp-map-controls";
import { MapView } from "@here/harp-mapview";
import { VectorTileDataSource } from "@here/harp-vectortile-datasource";
import { sphereProjection } from "@here/harp-geoutils";
import { HereTileProvider, HereWebTileDataSource } from "@here/harp-webtile-datasource";
import { MapControlsUI } from "@here/harp-map-controls";

const defaultTheme = "resources/berlin_tilezen_base.json";

export interface ViewParameters {
    theme?: string | Theme;
    canvas: HTMLCanvasElement;
}

export class View {
    readonly canvas: HTMLCanvasElement;
    readonly theme: string | Theme;

    readonly mapView: MapView;

    constructor(args: ViewParameters) {
        this.canvas = args.canvas;
        this.theme = args.theme === undefined ? defaultTheme : args.theme;
        this.mapView = this.initialize();
    }

    protected initialize(): MapView {
        const mapView = new MapView({
            canvas: this.canvas,
            // 太空背景
            theme: {
                extends: "resources/berlin_tilezen_base_globe.json",
                styles: {
                    // Specify the styling for the markers.
                    geojson: [
                        {
                            when: ["==", ["geometry-type"], "Point"],
                            technique: "labeled-icon",
                            imageTexture: ["get", "icon"],
                            text: ["get", "text"],
                            size: 15,
                            priority: 1000,
                            color: "black",
                            iconMayOverlap: true,
                            textMayOverlap: true,
                            renderOrder: ["get", "renderOrder"],
                            iconFadeTime: 0,
                            textFadeTime: 0
                        }
                    ]
                }
            },
            delayLabelsUntilMovementFinished: false,
            projection: sphereProjection,
            decoderUrl: "decoder.bundle.js"
        });

        // 影像地图 https://www.harp.gl/docs/master/examples/#datasource_satellite-tile.html
        const webTileDataSource = new HereWebTileDataSource({
            apikey: "q3APtmHHMHQYazxrvQ-_4YEXPwL5VO3bKCZzSyD2KqI",
            tileBaseAddress: HereTileProvider.TILE_AERIAL_SATELLITE
        });
        mapView.addDataSource(webTileDataSource);

        const dataSource = new VectorTileDataSource({
            authenticationCode: "q3APtmHHMHQYazxrvQ-_4YEXPwL5VO3bKCZzSyD2KqI"
        });
        mapView.addDataSource(dataSource);

        return mapView;
    }
}
