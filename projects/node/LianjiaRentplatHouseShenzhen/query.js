/**
 * 查询索引数据里某租房的最新一条数据
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
    {
        let collectionName=`index`;
        let collection=db.collection(collectionName);
        for(let item of heatmapData){
            let m_url=item["m_url"];
            let exists=await collection.find({
                'm_url': m_url
            },{
                sort:{
                    'timestamp': -1
                },
                limit:1
            }).toArray();
            let one=exists[0];
            let rent_price_listing=one.rent_price_listing;
            item["lng"]=parseFloat(item["longitude"]);
            delete item["longitude"];
            item["lat"]=parseFloat(item["latitude"]);
            delete item["latitude"];
            item["count"]=parseFloat(rent_price_listing);
            delete item["m_url"];
        }
    }
    let fs=require("fs-extra");
    fs.writeFile(`heatmapData.js`,`
var heatmapData=${JSON.stringify(heatmapData)}
`);
    mongoClient.close();
}
index();
