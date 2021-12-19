/**
 * 查询租房的热力地图数据
 */
const MongoClient = require('mongodb').MongoClient;
let host=`127.0.0.1`;
let port=`27017`;
let dbName="lianjia_chuzu_zufang";
let url=`mongodb://${host}:${port}`;
let mongoClient=new MongoClient(url);
async function index(){
    await mongoClient.connect();
    let db=mongoClient.db(dbName);
    let heatmapData=[];
    {
        let collectionName="detail";
        let collection=db.collection(collectionName);
        let exists=await collection.find({},{
            projection:{
                'longitude': 1,
                'latitude': 1,
                'm_url':1,
                '_id': 0
            }
        }).toArray();
        heatmapData=exists;
    }
    let filteredHeatmapData=[];
    {
        let collectionName=`index`;
        let collection=db.collection(collectionName);
        for(let item of heatmapData){
            let m_url=item["m_url"];
            // 一室一卫一厨，25-50平米，租金在2500以下。
            let exists=await collection.find({
                'm_url': m_url,
                'frame_bedroom_num': '1',
                'frame_bathroom_num': '1',
                // 'frame_kitchen_num': '1',
                "rent_area":{"$gte":"25","$lte":"50"},
            },{
                sort:{
                    'timestamp': -1
                },
                limit:1
            }).toArray();
            let one=exists[0];
            // 不存在符合要求的数据
            if(one===undefined){continue;}
            let rent_price_listing=parseFloat(one.rent_price_listing);
            if(rent_price_listing>2500){continue;}
            item["lng"]=parseFloat(item["longitude"]);
            delete item["longitude"];
            item["lat"]=parseFloat(item["latitude"]);
            delete item["latitude"];
            item["count"]=rent_price_listing;
            delete item["m_url"];
            filteredHeatmapData.push(item);
            console.log(item);
        }
    }
    let fs=require("fs-extra");
    fs.writeFile(`heatmapData.js`,`
var heatmapData=${JSON.stringify(filteredHeatmapData)}
`);
    mongoClient.close();
}
index();
