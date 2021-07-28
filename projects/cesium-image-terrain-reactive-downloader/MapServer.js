/*
 * deno run --allow-net --allow-read --allow-write --watch --unstable MapServer.js
 */
import{FileServer}from"../deno/FileServer/mod.js";
import{download}from"./mod.js";
let fileServer=new FileServer({
    port:8088,
    cors:true,
    onNotExistsFile:async function(file){
        if(file.search("World_Imagery/MapServer/tile")>-1){//访问不存在的地图
            let[match,z,y,x]=file.match(/World_Imagery\/MapServer\/tile\/(\d*)\/(\d*)\/(\d*)/);
            if(z===undefined){return;}
            if(z>17){return;}
            try{
                await download(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,file);
            }catch(error){
                console.log(file,error);
            }
        }
    }
});
fileServer.start();
