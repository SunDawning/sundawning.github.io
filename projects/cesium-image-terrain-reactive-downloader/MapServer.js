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
        }else if(file.search(/1\/(\d*)\/(\d*)\/(\d*).terrain/)>-1){//访问不存在的地形
            let[match,z,y,x]=file.match(/1\/(\d*)\/(\d*)\/(\d*).terrain/);
            let headers=new Headers();
            headers.set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYTBhN2U4Ny1hODkzLTQzMWItODBjNy0xNzMzZjdkOWU3MzEiLCJpZCI6MjU5LCJhc3NldHMiOnsiMSI6eyJ0eXBlIjoiVEVSUkFJTiIsImV4dGVuc2lvbnMiOlt0cnVlLHRydWUsdHJ1ZV0sInB1bGxBcGFydFRlcnJhaW4iOmZhbHNlfX0sInNyYyI6IjUwMDY3NWFiLTk2OWMtNDZlZC1hYmRkLWNhODg3MDhiMTM0YyIsImlhdCI6MTYyNzQ3NDgzNywiZXhwIjoxNjI3NDc4NDM3fQ.A6QkTvRgioGVBF1miilfCXI0F-7dkovxmj4WnPW3LCk")
            try{
                await download(`https://assets.cesium.com/1/${z}/${y}/${x}.terrain?extensions=octvertexnormals-watermask-metadata&v=1.2.0`,file,{headers:headers})
            }catch(error){
                console.log(file,error);
            }
        }else if(file.search("1/layer.json")>-1){//访问地形的索引文件
            let headers=new Headers();
            headers.set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYTBhN2U4Ny1hODkzLTQzMWItODBjNy0xNzMzZjdkOWU3MzEiLCJpZCI6MjU5LCJhc3NldHMiOnsiMSI6eyJ0eXBlIjoiVEVSUkFJTiIsImV4dGVuc2lvbnMiOlt0cnVlLHRydWUsdHJ1ZV0sInB1bGxBcGFydFRlcnJhaW4iOmZhbHNlfX0sInNyYyI6IjUwMDY3NWFiLTk2OWMtNDZlZC1hYmRkLWNhODg3MDhiMTM0YyIsImlhdCI6MTYyNzQ3NDgzNywiZXhwIjoxNjI3NDc4NDM3fQ.A6QkTvRgioGVBF1miilfCXI0F-7dkovxmj4WnPW3LCk")
            await download(`https://assets.cesium.com/1/layer.json`,file,{headers:headers})
        }
    }
});
fileServer.start();
