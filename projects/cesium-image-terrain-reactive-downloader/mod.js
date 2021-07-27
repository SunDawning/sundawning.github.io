/*
 * 离线下载地图
 * deno run --allow-net --allow-write --allow-read --unstable ./mod.js
 * deno compile --allow-net --allow-write --allow-read --unstable ./mod.js
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
export async function download(url,path,options){
    if(url===undefined){return;}
    if(path===undefined){return;}
    //下载的文件已经存在
    if((await exists(path))===true){return;}
    //确保下载目录存在
    await ensureDir(dirname(path));
    //下载到指定路径
    await Deno.writeFile(path,new Uint8Array(await(await fetch(url)).arrayBuffer()));
}
/**
 * Cesium - 地图下载器(python)_qgbihc的专栏-CSDN博客_cesium 地图下载器: https://blog.csdn.net/qgbihc/article/details/109134671
 */
export function WGS84Tile(){
    let SELF={};
    SELF.width=function(zoom){
        return Math.pow(2,zoom);
    };
    SELF.longitudeToTileX=function(longitude,zoom){
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
    SELF.latitudeToTileY=function(latitude,zoom){
        if(latitude>85.0511287798){
            latitude=85.0511287798;
        }
        if(latitude<-85.0511287798){
            latitude=-85.0511287798;
        }
        latitude=1-((((Math.log(Math.tan((90+latitude)*Math.PI/360))/(Math.PI/180))/180)+1)/2);
        return Math.floor(latitude*SELF.width(zoom));
    };
    SELF.onRegionToTile=function(longitude1,latitude1,longitude2,latitude2,zoom,onTile){
        let y1=SELF.latitudeToTileY(latitude1,zoom);
        let y2=SELF.latitudeToTileY(latitude2,zoom);
        let x1=SELF.longitudeToTileX(longitude1,zoom);
        let x2=SELF.longitudeToTileX(longitude2,zoom);
        for(let y=y1;y<y2+1;y=y+1){
            for(let x=x1;x<x2+1;x=x+1){
                onTile({z:zoom,y:y,x:x});
            }
        }
    };
    SELF.regionToTiles=function(longitude1,latitude1,longitude2,latitude2,zoom){
        let tiles=[];
        function onTile(tile){
            tiles.push(tile);
        }
        SELF.onRegionToTile(longitude1,latitude1,longitude2,latitude2,zoom,onTile);
        return tiles;
    };
    return SELF;
}
let wgs84Tile=new WGS84Tile();
export function downloads(options){
    let[minZ,maxZ]=options.zoom;
    let[longitude1,latitude1,longitude2,latitude2]=options.region;
    let output=options.output;
    for(let z=minZ;z<=maxZ;z=z+1){
        wgs84Tile.onRegionToTile(longitude1,latitude1,longitude2,latitude2,z,async function onTile(tile){
            let{z,y,x}=tile;
            await download(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,`${output}${z}/${y}/${x}.jpg`);
        });
    }
}
