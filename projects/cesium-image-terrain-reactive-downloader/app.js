/*
 * 下载指定经纬度区域的地图
 * deno run --allow-net --allow-write --allow-read --unstable ./app.js
 */
import{downloads}from"./mod.js";
downloads({
    zoom:[0,6],
    region:[-180,90,180,-90],
    output:"./World_Imagery/MapServer/tile/"
});
