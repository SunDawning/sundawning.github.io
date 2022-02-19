Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYWFkMDIyOC0zZjQyLTRlMzUtYjQ4YS0xNjBhMDgwNTE4YTAiLCJpZCI6NzY5MDcsImlhdCI6MTY0NTI2NDUzMH0.N9v17oLP08jFvYtSns4GXGAXNf6pPqdKI_FpQx8QADA";

const container=document.createElement("div");
container.className="container";
document.body.appendChild(container);
const viewer=new Cesium.Viewer(container);

function getDistrictRectangleByAmap(){
    // https://zhuanlan.zhihu.com/p/409983169
    // 深圳区域
    // https://lbs.amap.com/api/webservice/guide/api/district
    // https://lbs.amap.com/service/api/restapi?keywords=440300&subdistrict=0&extensions=all
    const longitudeLatitude=temp1.districts[0].polyline.split(";").map(function(item){
        return item.split(",").map(function(c){
            return Number.parseFloat(c);
        });
    });
    const maxX=Math.max.apply(null,longitudeLatitude.map(function(item){
        return item[0];
    }));
    const maxY=Math.max.apply(null,longitudeLatitude.map(function(item){
        return item[1];
    }));
    const minX=Math.min.apply(null,longitudeLatitude.map(function(item){
        return item[0];
    }));
    const minY=Math.min.apply(null,longitudeLatitude.map(function(item){
        return item[1];
    }));
    console.log(JSON.stringify([minX,minY,maxX,maxY]));
}
{
    // 飞到指定范围 https://www.cnblogs.com/xym0710/p/14949107.html
    // 某地的行政区域
    viewer.camera.setView({destination:new Cesium.Rectangle.fromDegrees(113.751453,22.396344,114.628466,22.861748)});
}
{
    const src="../public/district_440300.js";
    {
        const baseURL=window.location.href;
        const fullSrc=new URL(src,baseURL).href;
        const isAppend=(Object.values(document.scripts).filter(function(item){
            return item.src===fullSrc;
        }).length>0);
        if(isAppend===true){
            console.log("script load",src);
        }else{
            const script=document.createElement("script");
            script.type="text/javascript";
            script.src=src;
            document.head.appendChild(script);
            script.addEventListener("load",function(event){
                console.log("script load",script);
            });
        }
    }
}
