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
    let collectionName=`index`;
    let collection=db.collection(collectionName);
    let exists=await collection.find({
        'm_url': 'https://m.lianjia.com/chuzu/sz/zufang/SZ2636962691410821120.html'
    },{
        sort:{
            'timestamp': -1
        },
        limit:1
    }).toArray();
    let one=exists[0];
    let rent_price_listing=one.rent_price_listing;
    console.log(rent_price_listing);
    mongoClient.close();
}
index();
