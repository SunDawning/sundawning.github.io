let{MongoClient}=require(`mongodb`);
let fs=require(`fs-extra`);
let csv_parse=require(`csv-parse/lib/sync`);
let path=require(`path`);
/**
 * 导入CSV文件里的数据到mongodb数据库
 */
let host=`127.0.0.1`;
let port=`27017`;
let dbName="Lianjia";
let collectionName=`zufang`;
let url=`mongodb://${host}:${port}`;
let mongoClient=new MongoClient(url);
// 读取CSV文件夹
let dbDirectory=`dbDirectory`;
let dbDirectoryBackup=`dbDirectoryBackup`;
if(fs.existsSync(dbDirectoryBackup)===false){
    fs.mkdirSync(dbDirectoryBackup);
}
let files=fs.readdirSync(dbDirectory);
async function index(){
    await mongoClient.connect();
    console.log(`已连接数据库：${url}`);
    let db=mongoClient.db(dbName);
    let collection=db.collection(collectionName);
    await collection.createIndex({"m_url":1},{"unique":true});
    let totalFiles=files.length;
    for(let c=0;c<totalFiles;c=c+1){
        let file=files[c];
        console.log(`导入文件数量：[${c+1}/${totalFiles}]`);
        {
            let csvFile=`${dbDirectory}/${file}`;
            let data=fs.readFileSync(csvFile,{encoding:`utf-8`});
            console.log(`将导入csv文件到mongodb: ${csvFile}`);
            let output=csv_parse(data.trim());
            let header=output[0];
            let lines=output.slice(1);
            let total=lines.length;
            if(total===0){
                console.log(`没有数据`);
                fs.unlinkSync(csvFile);
                console.log(`删除文件：${csvFile}`);
                continue;
            }
            let m_url_index=header.indexOf(`m_url`);
            let n=0;
            for(let c=0;c<total;c=c+1){
                let line=lines[c];
                let name=path.basename(file,".csv");
                let item={};
                item["city"]="深圳";
                item["type"]="整租";
                item["timestamp"]=name;
                header.forEach(function(columnName){
                    let columnIndex=header.indexOf(columnName);
                    item[columnName]=line[columnIndex];
                });
                let index={"m_url":line[m_url_index]};
                let exists=await collection.find(index).toArray();
                let one=exists[0];
                if(one===undefined){
                    // 记录首次将该租房数据存到数据库的时间戳
                    item["first_timestamp"]=name;
                    await collection.insertMany([item]);
                    n=n+1;
                }else if(one["timestamp"]<name){
                    await collection.updateOne(index,{"$set":item});
                    n=n+1;

                }
            }
            console.log(`已更新数据：[${n}/${total}]`);
            let backupPath=`${dbDirectoryBackup}/${file}`;
            fs.renameSync(csvFile,backupPath);
            console.log(`移动文件：${csvFile} => ${backupPath}`);
        }
    }
}
index().then(console.log).catch(console.error).finally(function(){
    mongoClient.close();
});
