let fs=require(`fs-extra`);
let readline=require(`readline`);
let axios=require(`axios`);
/**
 * 读取索引页面的数据，从中提取出详情页面的链接，在已有的详情数据里查找，如果已经存在，则忽略该链接，不存在则访问详情页面，获取详情数据。
 */
let indexPageFile=`scratch.txt`;
let detailPageFile=`detailPage.txt`;
let content=fs.readFileSync(detailPageFile,{encoding:"utf-8"});
let detailPageURLs=[];
content.split(/\r?\n/).forEach(function(line){
    if(line===""){return;}
    detailPageURLs.push(JSON.parse(line)["m_url"]);
});
let interface=readline.createInterface({
    input:fs.createReadStream(indexPageFile),
    output:process.stdout,
    terminal:false
});
let n=0;
interface.on(`line`,function(line){
    if(line===""){return;}
    let url=JSON.parse(line)["m_url"];
    if(detailPageURLs.includes(url)===true){return;}
    axios.get(url,{timeout:600000}).then(function(response){
        let item=filterDetailHtmlData(response.data);
        item["m_url"]=url;
        item["timestamp"]=new Date().getTime();
        fs.appendFile(detailPageFile,JSON.stringify(item)+"\n");
        n=n+1;
        console.log(n);
    });
});
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
