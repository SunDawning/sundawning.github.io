let{MongoClient}=require(`mongodb`);
let fs=require(`fs-extra`);
let csv_parse=require(`csv-parse/lib/sync`);
let path=require(`path`);
/**
 * 导入CSV文件里的数据到mongodb数据库
 */
let host=`127.0.0.1`;
let port=`27017`;
let dbName="lianjia";
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
                header.forEach(function(columnName){
                    if(columnName==="rent_price_listing"){return;}
                    let columnIndex=header.indexOf(columnName);
                    item[columnName]=line[columnIndex];
                });
                let index={"m_url":line[m_url_index]};
                let exists=await collection.find(index).toArray();
                let one=exists[0];
                let rent_price_listing=line[header.indexOf("rent_price_listing")];
                // 没有该房子的记录
                if(one===undefined){
                    item["rent_price_listings"]=[];
                    item["rent_price_listings"].push({
                        "timestamp":name,
                        "rent_price_listing":rent_price_listing
                    });
                    await collection.insertOne(item);
                    n=n+1;
                }else{
                    let existsRentPrices=one["rent_price_listings"].filter(function(rent_price){
                        // - 已经记录相应时间的房租：避免导入相同时间的数据
                        // - 房租相同：避免导入没有变化的数据
                        return (rent_price["timestamp"]===name)||(rent_price["rent_price_listing"]===rent_price_listing);
                    });
                    if(existsRentPrices.length===0){
                        item["rent_price_listings"]=one["rent_price_listings"];
                        item["rent_price_listings"].push({
                            "timestamp":name,
                            "rent_price_listing":rent_price_listing
                        });
                        console.log(`房价发生变化：`,index,item["rent_price_listings"]);
                    }
                    await collection.updateOne(index,{"$set":item});
                    n=n+1;
                }
            }
            console.log(`已更新数据：[${n}/${total}]`);
            let stat=fs.statSync(csvFile);
            let passed=new Date().getTime()-stat["mtimeMs"];
            if(passed>20*1000){
                let backupPath=`${dbDirectoryBackup}/${file}`;
                fs.renameSync(csvFile,backupPath);
                console.log(`移动文件：${csvFile} => ${backupPath}`);
            }else{
                console.log(`文件可能刚被修改了，暂时不移动文件：${csvFile}`);
                console.log(`已过去：${passed}ms`);
            }
        }
    }
}
index().then(console.log).catch(console.error).finally(function(){
    mongoClient.close();
});
