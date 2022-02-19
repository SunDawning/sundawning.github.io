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
