let{MongoClient}=require(`mongodb`);
let host=`127.0.0.1`;
let port=`27017`;
/**
 * 数据库的名称
 *
 * 在连接一个可能存在可能不存在的数据库后：
 * - 该数据库不存在
 *   - 不操作该数据库，则不自动创建该数据库。
 *   - 操作该数据库之前会自动创建该数据库。
 * - 该数据库存在
 *   - 操作该数据库
 *
 * @type {String}
 * @const
 */
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
    /**
     * 从数据库里所收集的数据
     *
     * 需要提供一堆数据的名称来从数据库里得到，这堆数据或许有另一个名称，数据＂表＂。
     *
     * @type {Collection}
     */
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
