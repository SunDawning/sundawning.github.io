/*
 * 离线下载地图
 * deno run --allow-net --allow-write --allow-read --unstable ./mod.js
 * deno compile --allow-net --allow-write --allow-read --unstable ./mod.js
 */
import{
    parse
}from"https://deno.land/std/flags/mod.ts";
let commandLineArgs=parse(Deno.args);
console.log(commandLineArgs);
if(commandLineArgs.help){
    console.log(`
A Simple Map Downloader.

Version: <2021-07-26 Mon 21:56:54 UTC+08:00>

  USAGE:
    downloader [options]

  OPTIONS:
    --help                      Prints help information
    --z           <zoom>        Set Zoom
    --y           <Y>           Set Tile Y
    --x           <X>           Set Tile X
    --output      <DIRECTORY>   Set output directory
`);
    Deno.exit();
}

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
    if(url===undefined){return;}
    if(path===undefined){return;}
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
        let y1=SELF.wgs84ToTileY(latitude1,zoom);
        let y2=SELF.wgs84ToTileY(latitude2,zoom);
        let x1=SELF.wgs84ToTileX(longitude1,zoom);
        let x2=SELF.wgs84ToTileX(longitude2,zoom);
        for(let y=y1;y<y2+1;y=y+1){
            for(let x=x1;x<x2+1;x=x+1){
                tiles.push({z:zoom,y:y,x:x});
            }
        }
        return tiles;

    };
    return SELF;
}
async function main(){
    let z=commandLineArgs.z;
    if(z===undefined){return;}
    let y=commandLineArgs.y;
    if(y===undefined){return;}
    let x=commandLineArgs.x;
    if(x===undefined){return;}
    let output=commandLineArgs.output;
    if(output===undefined){
        console.log("没有指定保存的位置");
        return;
    }else{
        if(output.endsWith("/")===false){
            output=output+"/";
        }
    }
    await download(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,`${output}${z}/${y}/${x}.jpg`);
}
if(import.meta.main){
    main();
}
