let fs=require(`fs-extra`);
let readline=require(`readline`);
let axios=require(`axios`);
let async=require(`async`);
/**
 * 读取增量的索引页面的数据，从中提取出详情页面的链接，在已有的详情数据里查找，如果已经存在，则忽略该链接，不存在则访问详情页面，获取详情数据。
 */
let indexPageIncrementFile=`indexPageIncrement.txt`;
if(fs.existsSync(indexPageIncrementFile)===false){
    console.error(`不存在：${indexPageIncrementFile}`);
    process.exit();
}
let detailPageFile=`detailPage.txt`;
/**
 * 读取所有详情数据
 * @param {String} detailPageFile
 */
function getDetailPageURLs(detailPageFile){
    let fs=require(`fs`);
    if(fs.existsSync(detailPageFile)===false){return [];};
    let content=fs.readFileSync(detailPageFile,{encoding:"utf-8"});
    let detailPageURLs=[];
    let lines=content.split(/\r?\n/);
    let total=lines.length;
    for(let c=0;c<total;c=c+1){
        let line=lines[c];
        {
            if(line===""){continue;}
            let url=JSON.parse(line)["m_url"];
            if(detailPageURLs.indexOf(url)>-1){continue;}
            detailPageURLs.push(url);
        }
    }
    console.log(`已读取所有详情数据：[${detailPageURLs.length}/${total}]`);
    return detailPageURLs;
}
// 加载整个详情数据（因为详情数据数量少，不会更新）
let detailPageURLs=getDetailPageURLs(detailPageFile);
let interface=readline.createInterface({
    input:fs.createReadStream(indexPageIncrementFile),
    output:process.stdout,
    terminal:false
});
// 一行一行读取增量索引数据（不直接加载整个文件，因为索引数据总是更新，其全量一直在增长，直接判断增量索引文件里的数据），只处理不在详情数据里的链接。
let indexPageIncrementURLs=[];
interface.on(`line`,function(line){
    if(line===""){return;}
    let url=JSON.parse(line)["m_url"];
    if(indexPageIncrementURLs.indexOf(url)>-1){return;}
    if(detailPageURLs.indexOf(url)>-1){return;}
    indexPageIncrementURLs.push(url);
});
// 索引数据读取完成，并发访问详情页面，获取详情数据。
interface.on(`close`,function(){
    let limit=30;
    let n=0;
    let total=indexPageIncrementURLs.length;
    async.mapLimit(indexPageIncrementURLs,limit,async function(url){
        let response=await axios.get(url);
        {
            let item=filterDetailHtmlData(response.data);
            item["m_url"]=url;
            item["timestamp"]=new Date().getTime();
            fs.appendFile(detailPageFile,JSON.stringify(item)+"\n");
            n=n+1;
            console.log(`[${n}/${total}] ${url}`);
        }
    },function(error,result){
        if(error){
            console.log(error);
        }else{
            console.log(`已下载完增量索引数据里的详情数据`);
            fs.unlink(indexPageIncrementFile);
            packTo7z(detailPageFile);
            console.log(`使用7z打包详情数据，便于共享。`);
        }
    });
});
/**
 * 使用7z打包
 * @example
 * packTo7z("detailPage.txt");
 */
function packTo7z(file){
    let path=require(`path`);
    let packedName=path.basename(file,`.txt`);
    let packedFile=`${packedName}.7z`;
    console.log(`将打包到：${packedFile}`);
    if(process.platform==="android"){
        /**
         * 启动一个同步程序
         * @param {string} cmd 一串命令
         * @returns {object} 一个Buffer对象
         * @example
         * // 同步修改npm源为淘宝源
         * child_process_exec_sync("npm config set registry https://registry.npm.taobao.org")
         */
        function child_process_exec_sync(cmd){
            let{execSync}=require("child_process");
            console.log("同步启动程序：",cmd);
            return execSync(cmd);
        }
        /**
         * 查找是否存在命令
         * @param {string} command 命令
         * @returns {undefined|buffer} 存在该命令则返回buffer，不存在时则返回undefined。
         * @example
         * // returns <Buffer 43 3a 5c 55 73 65 72 73 5c 73 67 73 5c 41 70 70 44 61 74 61 5c 52 6f 61 6d 69 6e 67 5c 6e 70 6d 5c 70 6e 70 6d 0d 0a 43 3a 5c 55 73 65 72 73 5c 73 67 ... 32 more bytes>
         * executable_find("pnpm");
         */
        function executable_find(command){
            try{
                return child_process_exec_sync(`which ${command}`);
            }catch(error){
                return undefined;
            }
        }
        if(executable_find(`7za`)===undefined){
            child_process_exec_sync(`pkg install p7zip -y`);
        }
        child_process_exec_sync(`7za a ${packedFile} ${file}`);
    }else{
        /**
         * @see https://www.npmjs.com/package/7zip-min
         */
        let p7zip=require(`7zip-min`);
        p7zip.pack(file,packedFile,function(error){
            if(error){
                console.log(error);
            }
        });
    }
}
/**
 * 避免match错误，返回正则表达式的第一个所匹配到的字符串，没找到则返回空字符串。
 * @param {Regex|String} regex 正则
 * @param {String} string 字符串
 * @returns {String}
 */
function matchAsString(regex,string){
    try{
        return string.match(regex)[1];
    }catch(error){
        return "";
    }
}
/**
 * 从详情页面里再获取数据
 * @param {string} data 详情页面的HTML源码
 */
function filterDetailHtmlData(data){
    /**
     * ```text
     *   g_conf.coord = {
     *       longitude: '114.420268',
     *       latitude: '22.620305'
     *   };
     * ```
     */
    let coord=(function(){
        try{
            return data.match(`
  g_conf.coord = {
      longitude: '(.*)',
      latitude: '(.*)'
  };
`);
        }catch(error){
            return ["","",""];
        }
    })();
    let longitude=matchAsString(`longitude: '(.*)',`,data);
    let latitude=matchAsString(`latitude: '(.*)'`,data);
    let floor=matchAsString(`                        <label>楼层：</label>
                        <span>(.*)</span>`,data);
    let elevator=matchAsString(`                        <label>电梯：</label>
                        <span>(.*)</span>`,data);
    let maintain=matchAsString(`                        <label>维护：</label>
                        <span>(.*)</span>`,data);
    let checkin=matchAsString(`                        <label>入住：</label>
                        <span>(.*)</span>`,data);
    let carport=matchAsString(`                        <label>车位：</label>
                        <span>(.*)</span>`,data);
    let water=matchAsString(`                        <label>用水：</label>
                        <span>(.*)</span>`,data);
    let electricity=matchAsString(`                        <label>用电：</label>
                        <span>(.*)</span>`,data);
    let gas=matchAsString(`                        <label>燃气：</label>
                        <span>(.*)</span>`,data);
    let tenancy_period=matchAsString(`            <span>租期：</span>
            <label href="javascript:null">(.*)</label>
`,data);
    let see_house=matchAsString(`            <span>看房：</span>
            <label href="javascript:null">(.*)</label>`,data);
    let distance=matchAsString(`<span class="fr">(.*)米</span>`,data);
    return{
        distance,
        longitude,latitude,
        floor,elevator,maintain,checkin,carport,water,electricity,gas,tenancy_period,see_house
    };
}
