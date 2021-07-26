/*
 * 离线下载地图
 * deno run --allow-net --allow-write ./mod.js
 */
// https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/1/1/0
/**
 * javascript - How to convert an arrayBuffer to a Uint8Array, in Deno? - Stack Overflow: https://stackoverflow.com/questions/62762623/how-to-convert-an-arraybuffer-to-a-uint8array-in-deno
 */
async function download(url,path,options){
    await Deno.writeFile(path,new Uint8Array(await(await fetch(url)).arrayBuffer()));
}
download("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/1/1/0","./0.jpg");
