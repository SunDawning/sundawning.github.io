let{MongoClient}=require(`mongodb`);
let host=`127.0.0.1`;
let port=`27017`;
let dbName="myProject";
let url=`mongodb://${host}:${port}`;
let mongoClient=new MongoClient(url);
/**
 * @see https://mongodb.github.io/node-mongodb-native/4.1/
 */
async function index(){
    await mongoClient.connect();
    console.log(`已连接数据库`);
    let db=mongoClient.db(dbName);
    let collection=db.collection(`documents`);
    await collection.insertMany([{a:1},{a:2},{a:3}]);
    await collection.updateOne({a:3},{$set:{b:1}});
    let found=await collection.find({a:3}).toArray();
    console.log(found);
    return `完成数据库操作`;
}
index().then(console.log).catch(console.error).finally(function(){
    mongoClient.close();
});
