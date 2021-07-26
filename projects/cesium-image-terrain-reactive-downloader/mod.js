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
    console.log("下载",path);
    //确保下载目录存在
    let dir=dirname(path);
    await ensureDir(dir);
    //下载到指定路径
    await Deno.writeFile(path,new Uint8Array(await(await fetch(url)).arrayBuffer()));
}
/**
 * Cesium - 地图下载器(python)_qgbihc的专栏-CSDN博客_cesium 地图下载器: https://blog.csdn.net/qgbihc/article/details/109134671
 */
function WGS84Tile(){
    let SELF={};
    SELF.width=function(zoom){
        return Math.pow(2,zoom);
    };
    SELF.wgs84ToTileX=function(longitude,zoom){
        if(longitude<0){
            longitude=180+longitude;
        }else{
            longitude=(longitude+180)/360;
        }
        let x=Math.floor(longitude*SELF.width(zoom));
        if(x>0){
            return x-1;
        }else{
            return x;
        }
    };
    SELF.wgs84ToTileY=function(latitude,zoom){
        if(latitude>85.0511287798){
            latitude=85.0511287798;
        }
        if(latitude<-85.0511287798){
            latitude=-85.0511287798;
        }
        latitude=1-((((Math.log(Math.tan((90+latitude)*Math.PI/360))/(Math.PI/180))/180)+1)/2);
        return Math.floor(latitude*SELF.width(zoom));
    };
    SELF.wgs84RegionToTile=function(longitude1,latitude1,longitude2,latitude2,zoom){
        let tiles=[];
        for(let x=SELF.wgs84ToTileY(longitude1,zoom);x<SELF.wgs84ToTileX(longitude2,zoom)+1;x=x+1){
            for(let y=SELF.wgs84ToTileY(latitude1,zoom);y<SELF.wgs84ToTileY(latitude2,zoom)+1;y=y+1){
                tiles.push({z:zoom,y:y,x:x});
            }
        }
        return tiles;
        
    };
    return SELF;
}
[
    {z:1,y:1,x:0},
    {z:2,y:1,x:1}
].forEach(function(item){
    let{z,y,x}=item;
    download(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,`./World_Imagery/MapServer/tile/${z}/${y}/${x}.jpg`);
});
