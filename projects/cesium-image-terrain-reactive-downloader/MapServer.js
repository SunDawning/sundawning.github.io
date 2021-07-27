/*
 * deno run --allow-net --allow-read --allow-write --watch --unstable MapServer.js 
 */
import{FileServer}from"../../../deno/FileServer/mod.js";
import{download}from"./mod.js";
let fileServer=new FileServer({
    port:8088,
    cors:true,
    onNotExistsFile:async function(file){
        //访问不存在的地图
        if(file.search("World_Imagery/MapServer/tile")>-1){
            let[match,z,y,x]=file.match(/World_Imagery\/MapServer\/tile\/(\d*)\/(\d*)\/(\d*)/);
            await download(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,file);
        }
    }
});
fileServer.start();
