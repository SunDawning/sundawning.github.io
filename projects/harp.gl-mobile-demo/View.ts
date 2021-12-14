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
            theme: "resources/berlin_tilezen_base_globe.json",
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

        const mapControls = new MapControls(mapView);

        // 添加界面
        const ui = new MapControlsUI(mapControls, {
            // 可以手动输入地图的缩放级别
            zoomLevel: "input",
        });
        this.canvas.parentElement!.appendChild(ui.domElement);
        console.log("ui",ui);
        // 不显示＂3D＂按钮
        const tiltButton = ui.domElement.querySelector("#harp-gl_controls_tilt-button-ui");
        tiltButton.remove();

        // TODO 在移动设备上，一个手指转动地图
        // https://github.com/heremaps/harp.gl/blob/9ee5cac7/@here/harp-map-controls/lib/MapControls.ts
        // 源码 touchMove无法直接修改

        return mapView;
    }
}
