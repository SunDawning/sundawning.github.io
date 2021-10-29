/**
 * 将indexPage文件夹下索引数据和detailPage.txt里的详情数据导入Mongodb数据库里
 */
let{MongoClient}=require(`mongodb`);
let fs=require(`fs-extra`);
let csv_parse=require(`csv-parse/lib/sync`);
let path=require(`path`);
/**
 * 导入CSV文件里的数据到mongodb数据库
 */
let host=`127.0.0.1`;
let port=`27017`;
let dbName="lianjia_chuzu_zufang";
let url=`mongodb://${host}:${port}`;
let mongoClient=new MongoClient(url);
async function index(){
    await mongoClient.connect();
    console.log(`已连接数据库：${url}`);
    let db=mongoClient.db(dbName);
    /**
     * 导入indexPage文件夹
     */
    async function importIndexPage(){
        let dbDirectory=`indexPage`;
        let dbDirectoryBackup=`indexPageBackup`;
        if(fs.existsSync(dbDirectoryBackup)===false){
            fs.mkdirSync(dbDirectoryBackup);
        }
        let files=fs.readdirSync(dbDirectory);
        let collectionName=`index`;
        let collection=db.collection(collectionName);
        await collection.createIndex({"m_url":1,"timestamp":1},{"unique":true});
        let totalFiles=files.length;
        console.log(`导入文件数量：${totalFiles}`);
        for(let c=0;c<files.length;c=c+1){
            let file=files[c];
            {
                let dataFile=`${dbDirectory}/${file}`;
                let data=fs.readFileSync(dataFile,{encoding:`utf-8`});
                console.log(`将导入文件到mongodb: ${dataFile}`);
                let lines=data.split(/\r?\n/);
                let total=lines.length;
                if(total===0){
                    console.log(`没有数据`);
                    fs.unlinkSync(dataFile);
                    console.log(`删除文件：${dataFile}`);
                    return;
                }
                let n=0;
                let progress=require(`progress`);
                let progressBar=new progress(`已完成：:percent|已用时：:elapsed|速度：:rate|剩余时间：:eta|当前：${dataFile}`,{total:total});
                for(let c=0;c<total;c=c+1){
                    progressBar.tick();
                    let line=lines[c];
                    if(line===""){continue;}
                    let item=JSON.parse(line);
                    let index={"m_url":item["m_url"],"timestamp":item["timestamp"]};
                    let exists=await collection.find(index).toArray();
                    let one=exists[0];
                    // 没有该时刻该房子的记录
                    if(one===undefined){
                        await collection.insertOne(item);
                        n=n+1;
                    }
                }
                console.log(`[${n}/${total}]`);
                let stat=fs.statSync(dataFile);
                let passed=new Date().getTime()-stat["mtimeMs"];
                if(passed>20*1000){
                    let backupPath=`${dbDirectoryBackup}/${file}`;
                    fs.renameSync(dataFile,backupPath);
                    console.log(`移动文件：${dataFile} => ${backupPath}`);
                }else{
                    console.log(`文件可能刚被修改了，暂时不移动文件：${dataFile}`);
                    console.log(`已过去：${passed}ms`);
                }
            }
        }
    }
    /**
     * 导入detailPage.txt文件
     */
    async function importDetailPage(){
        let collectionName=`detail`;
        let collection=db.collection(collectionName);
        await collection.createIndex({"m_url":1},{"unique":true});
        let dataFile=`detailPage.txt`;
        let data=fs.readFileSync(dataFile,{encoding:`utf-8`});
        console.log(`将导入文件到mongodb: ${dataFile}`);
        let lines=data.split(/\r?\n/);
        let total=lines.length;
        if(total===0){
            console.log(`没有数据`);
            fs.unlinkSync(dataFile);
            console.log(`删除文件：${dataFile}`);
        }
        let n=0;
        let progress=require(`progress`);
        let progressBar=new progress(`已完成：:percent|已用时：:elapsed|速度：:rate|剩余时间：:eta|当前：${dataFile}`,{total:total});
        for(let c=0;c<total;c=c+1){
            progressBar.tick();
            let line=lines[c];
            if(line===""){continue;}
            let item=JSON.parse(line);
            let index={"m_url":item["m_url"]};
            let exists=await collection.find(index).toArray();
            let one=exists[0];
            // 没有该时刻该房子的记录
            if(one===undefined){
                await collection.insertOne(item);
                n=n+1;
            }
        }
    }

    await importDetailPage();
    importIndexPage();
}
index().then(console.log).catch(console.error);

