/*
 * 离线下载地图
 * deno run --allow-net --allow-write --allow-read --unstable ./mod.js
 */
import{
    ensureDir,
    exists
}from"https://deno.land/std/fs/mod.ts";
import{
    dirname
}from"https://deno.land/std/path/mod.ts";
// https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/1/1/0
/**
 * javascript - How to convert an arrayBuffer to a Uint8Array, in Deno? - Stack Overflow: https://stackoverflow.com/questions/62762623/how-to-convert-an-arraybuffer-to-a-uint8array-in-deno
 */
async function download(url,path,options){
    //下载的文件已经存在
    let isExists=await exists(path);
    if(isExists===true){
        console.log("下载的文件已经存在",path);
        return;
    }
    //确保下载目录存在
    let dir=dirname(path);
    await ensureDir(dir);
    //下载到指定路径
    await Deno.writeFile(path,new Uint8Array(await(await fetch(url)).arrayBuffer()));
}
download("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/1/1/0","./World_Imagery/MapServer/tile/1/1/0.jpg");
download("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/2/1/1","./World_Imagery/MapServer/tile/2/1/1.jpg");
