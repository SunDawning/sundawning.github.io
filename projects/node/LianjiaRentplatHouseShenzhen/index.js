let axios=require(`axios`);
let fs=require(`fs-extra`);
let assert=require(`assert`);
async function index(){
    /**
     * 从API获取行政区
         */
    let response=await axios.get(`https://m.lianjia.com/chuzu/aj/config/filter?city_id=440300`);
    {
        /**
         * 返回的JSON里的数据
         * @type {object}
         * @example
         * ```json
         * {
         *     "li": {
         *         "name": "全深圳",
         *         "type": "radio",
         *         "options": [
         *             {
         *                 "name": "不限",
         *                 "id": 0,
         *                 "pinyin": "/",
         *                 "baidu_code": "",
         *                 "line_color": "FFFFFF",
         *                 "children": []
         *             },
         *             {
         *                 "name": "10号线",
         *                 "id": 24000005340542,
         *                 "pinyin": "li24000005340542/",
         *                 "baidu_code": "e7b626f8e4ec7e0c8b2fb55d",
         *                 "line_color": "FFFFFF",
         *                 "children": [
         *                     {
         *                         "id": 0,
         *                         "name": "不限",
         *                         "pinyin": "/"
         *                     },
         *                     {
         *                         "id": 24000005340585,
         *                         "name": "双拥街",
         *                         "pinyin": "li24000005340542s24000005340585/",
         *                         "latitude": 22.704901,
         *                         "longitude": 114.139355,
         *                         "is_transfer": 0,
         *                         "border_color": "FFFFFF",
         *                         "sort": 1
         *                     },
         *                     {
         *                         "id": 24000005340570,
         *                         "name": "平湖",
         *                         "pinyin": "li24000005340542s24000005340570/",
         *                         "latitude": 22.699925,
         *                         "longitude": 114.132448,
         *                         "is_transfer": 0,
         *                         "border_color": "FFFFFF",
         *                         "sort": 2
         *                     },
         *                 ]
         *             },
         *             {
         *                 "name": "6号线",
         *                 "id": 24000005340543,
         *                 "pinyin": "li24000005340543/",
         *                 "baidu_code": "c0fee59aa30e38fb441a32fa",
         *                 "line_color": "FFFFFF",
         *                 "children": [
         *                     {
         *                         "id": 0,
         *                         "name": "不限",
         *                         "pinyin": "/"
         *                     },
         *                     {
         *                         "id": 2420054450728241,
         *                         "name": "公明广场",
         *                         "pinyin": "li24000005340543s2420054450728241/",
         *                         "latitude": 22.783783,
         *                         "longitude": 113.897782,
         *                         "is_transfer": 0,
         *                         "border_color": "FFFFFF",
         *                         "sort": 0
         *                     },
         *                     {
         *                         "id": 2413200637833913,
         *                         "name": "松岗",
         *                         "pinyin": "li24000005340543s2413200637833913/",
         *                         "latitude": 22.777998,
         *                         "longitude": 113.836299,
         *                         "is_transfer": 1,
         *                         "border_color": "FFFFFF",
         *                         "sort": 1
         *                     },
         *                 ]
         *             },
         *         ]
         *     },
         *     "d": {
         *         "name": "全深圳",
         *         "type": "radio",
         *         "options": [
         *             {
         *                 "name": "不限",
         *                 "id": 0,
         *                 "pinyin": "/",
         *                 "children": []
         *             },
         *             {
         *                 "name": "罗湖区",
         *                 "id": 23008678,
         *                 "pinyin": "luohuqu/",
         *                 "children": [
         *                     {
         *                         "id": 0,
         *                         "name": "不限",
         *                         "pinyin": "/"
         *                     },
         *                     {
         *                         "id": 612400033,
         *                         "name": "布心",
         *                         "pinyin": "buxin/"
         *                     },
         *                     {
         *                         "id": 1100000730,
         *                         "name": "百仕达",
         *                         "pinyin": "baishida/"
         *                     },
         *                 ]
         *             },
         *             {
         *                 "name": "福田区",
         *                 "id": 23008674,
         *                 "pinyin": "futianqu/",
         *                 "children": [
         *                     {
         *                         "id": 0,
         *                         "name": "不限",
         *                         "pinyin": "/"
         *                     },
         *                     {
         *                         "id": 612400009,
         *                         "name": "八卦岭",
         *                         "pinyin": "bagualing/"
         *                     },
         *                     {
         *                         "id": 612400018,
         *                         "name": "百花",
         *                         "pinyin": "baihua/"
         *                     },
         *                 ]
         *             },
         *         ]
         *     },
         *     "poi": {
         *         "name": "定位附近",
         *         "key": "poi",
         *         "type": "radio",
         *         "is_basic": 1,
         *         "options": [
         *             {
         *                 "name": "不限",
         *                 "pinyin": ""
         *             },
         *             {
         *                 "name": "1km",
         *                 "pinyin": "poi1000"
         *             },
         *         ]
         *     },
         *     "sign": "151028af6c7c3f65cf984ff11d145109"
         * }
         * ```
         */
        let data=response.data.data;
        fs.writeFile(`https://m.lianjia.com/chuzu/aj/config/filter?city_id=440300`.replaceAll(/[:\/\?]/g,`_`)+`.json`,JSON.stringify(data,undefined,4));
        let districtNames=filterDistrictNames(data);
        let dbFile=`${new Date().getTime()}.csv`;
        let keys=["house_title","resblock_name","bizcircle_name","district_name","layout","rent_area","rent_price_listing","frame_orientation","m_url"];
        let detailKeys=["longitude","latitude","floor","elevator","maintain","checkin","carport","water","electricity","gas","tenancy_period","see_house"];
        fs.writeFileSync(dbFile,keys.concat(detailKeys).join(`,`)+`\n`);
        let n=0;
        for(let c=0;c<districtNames.length;c=c+1){
            let districtName=districtNames[c];
            {
                /**
                 * 从API里获取下一级的详情页面
                 * @see https://app.api.lianjia.com/Rentplat/v1/house/list?city_id=440300&condition=luohuqu/rt200600000001&limit=30&offset=0&request_ts=1634648306&scene=list
                 */
                let limit=30;
                let response=await axios.get(`https://app.api.lianjia.com/Rentplat/v1/house/list?city_id=440300&condition=${districtName}/rt200600000001&limit=${limit}&offset=0&scene=list`);
                {
                    /**
                     * 返回的JSON里的数据
                     * @type {object}
                     * ```json
                     * {
                     *     "monthly_icon": "",
                     *     "monthly_desc": "",
                     *     "advertise_list": [],
                     *     "list": [
                     *         {
                     *             "ad_code": 0,
                     *             "ad_type": 0,
                     *             "position": -1,
                     *             "rent_type": "200600000001",
                     *             "city_id": 440300,
                     *             "rent_area": "94.00",
                     *             "house_attention_type": "",
                     *             "house_code": "SZ2881132036557643776",
                     *             "lianjia_house_code": "105108817443",
                     *             "house_title": "整租·碧岭华庭 3室2厅 北",
                     *             "resblock_id": "2411048753635",
                     *             "resblock_name": "碧岭华庭",
                     *             "bizcircle_id": "612400033",
                     *             "bizcircle_name": "布心",
                     *             "district_name": "罗湖区",
                     *             "match_desc": "",
                     *             "color": "",
                     *             "layout": "3室2厅2卫",
                     *             "desc": "链家 94.00㎡ 布心",
                     *             "list_picture": "https://image1.ljcdn.com/110000-inspection/pc1_UUSIZX4g8.jpg.280x210.jpg",
                     *             "rent_price_listing": "7500",
                     *             "rent_price_unit": "元/月",
                     *             "house_tags": [
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "F1F4F9",
                     *                     "key": "gov_certification",
                     *                     "name": "官方核验"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "decoration",
                     *                     "name": "精装修"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "has_elevator",
                     *                     "name": "有电梯"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "two_bathroom",
                     *                     "name": "双卫生间"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "water_elec_type",
                     *                     "name": "民水民电"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "is_key",
                     *                     "name": "随时看房"
                     *                 }
                     *             ],
                     *             "operation_tags": [],
                     *             "house_status": "202300000001",
                     *             "app_source": "200100000004",
                     *             "app_source_type": "200201000000",
                     *             "app_source_brand": "200301001000",
                     *             "app_source_pkid": "105108817443",
                     *             "frame_orientation": "北",
                     *             "detail_scheme": "lianjiabeike://rentplat/house/detail/distribute?house_code=SZ2881132036557643776&parentSceneId=5801806037532552704&ad_code=0",
                     *             "distribution_type": "203500000001",
                     *             "quality_icon": "",
                     *             "activity_phrase": {
                     *                 "color_txt": "F6804D",
                     *                 "txt": ""
                     *             },
                     *             "stress_content": null,
                     *             "vr_icon": "https://image1.ljcdn.com/rent-front-image/68c2bcb27bad2faa3b5968a305431ca2.1521791109090_ed60db63-2265-448f-af81-3357e1e96de5.90x90.png",
                     *             "shop_id": "0",
                     *             "c_type": 1,
                     *             "divider_desc": "",
                     *             "reason_id": null,
                     *             "reason_value": null,
                     *             "m_url": "https://m.lianjia.com/chuzu/sz/zufang/SZ2881132036557643776.html",
                     *             "pc_url": "https://sz.zu.ke.com/zufang/SZ2881132036557643776.html",
                     *             "exp_type": "default",
                     *             "coupon_template_id": [],
                     *             "rentable_num": "",
                     *             "bizcircle_url": "",
                     *             "frame_bedroom_num": "3",
                     *             "frame_hall_num": "2",
                     *             "frame_bathroom_num": "2",
                     *             "frame_kitchen_num": 1,
                     *             "app_source_brand_name": "链家",
                     *             "rent_price_trans": 0,
                     *             "house_quality_type": 1,
                     *             "attention": 2,
                     *             "fb_expo_id": "502953935066501120",
                     *             "bid_version": ""
                     *         },
                     *         {
                     *             "ad_code": 41616720240460710,
                     *             "ad_type": 40,
                     *             "position": -1,
                     *             "rent_type": "200600000001",
                     *             "city_id": 440300,
                     *             "rent_area": "88.61",
                     *             "house_attention_type": "",
                     *             "house_code": "SZ2898392543106973696",
                     *             "lianjia_house_code": "",
                     *             "house_title": "整租·宝湖名园 3室1厅 南",
                     *             "resblock_id": "2411048724525",
                     *             "resblock_name": "宝湖名园",
                     *             "bizcircle_id": "612400033",
                     *             "bizcircle_name": "布心",
                     *             "district_name": "罗湖区",
                     *             "match_desc": "",
                     *             "color": "",
                     *             "layout": "3室1厅1卫",
                     *             "desc": "驿点公寓 88.61㎡ 布心",
                     *             "list_picture": "https://image1.ljcdn.com/rent-user-avatar/5f0fdbbf-b5bd-46d0-ae23-d99cad1db758.280x210.jpg",
                     *             "rent_price_listing": "6800",
                     *             "rent_price_unit": "元/月",
                     *             "house_tags": [
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "decoration",
                     *                     "name": "精装修"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "has_elevator",
                     *                     "name": "有电梯"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "is_new",
                     *                     "name": "新上"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "has_parking_place",
                     *                     "name": "有车位"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "rent_period_month",
                     *                     "name": "月租"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "water_elec_type",
                     *                     "name": "民水民电"
                     *                 },
                     *                 {
                     *                     "color_bg": "F1F4F9",
                     *                     "color_txt": "5373B2",
                     *                     "key": "is_key",
                     *                     "name": "随时看房"
                     *                 }
                     *             ],
                     *             "operation_tags": [],
                     *             "house_status": "202300000001",
                     *             "app_source": "200100000003",
                     *             "app_source_type": "200202000000",
                     *             "app_source_brand": "200306007652",
                     *             "app_source_pkid": "2898392540321416198",
                     *             "frame_orientation": "南",
                     *             "detail_scheme": "lianjiabeike://rentplat/house/detail/distribute?house_code=SZ2898392543106973696&parentSceneId=5801806037532552705&ad_code=41616720240460712",
                     *             "distribution_type": "203500000001",
                     *             "quality_icon": "",
                     *             "activity_phrase": {
                     *                 "color_txt": "F6804D",
                     *                 "txt": ""
                     *             },
                     *             "stress_content": null,
                     *             "vr_icon": "https://image1.ljcdn.com/rent-front-image/68c2bcb27bad2faa3b5968a305431ca2.1521791109090_ed60db63-2265-448f-af81-3357e1e96de5.90x90.png",
                     *             "shop_id": "0",
                     *             "c_type": 1,
                     *             "divider_desc": "",
                     *             "reason_id": null,
                     *             "reason_value": null,
                     *             "m_url": "https://m.lianjia.com/chuzu/sz/zufang/SZ2898392543106973696.html",
                     *             "pc_url": "https://sz.zu.ke.com/zufang/SZ2898392543106973696.html",
                     *             "exp_type": "default",
                     *             "coupon_template_id": [],
                     *             "rentable_num": "",
                     *             "bizcircle_url": "",
                     *             "frame_bedroom_num": "3",
                     *             "frame_hall_num": "1",
                     *             "frame_bathroom_num": "1",
                     *             "frame_kitchen_num": 1,
                     *             "app_source_brand_name": "驿点公寓",
                     *             "rent_price_trans": 0,
                     *             "house_quality_type": null,
                     *             "attention": 2,
                     *             "fb_expo_id": "502953935066501121",
                     *             "bid_version": "v41616720274539432"
                     *         }
                     *     ],
                     *     "total": 237,
                     *     "ext_filter": [
                     *         {
                     *             "name": "月租",
                     *             "pinyin": "rmp1"
                     *         },
                     *         {
                     *             "name": "朝南",
                     *             "pinyin": "f100500000003"
                     *         },
                     *         {
                     *             "name": "近地铁",
                     *             "pinyin": "su1"
                     *         },
                     *         {
                     *             "name": "精装修",
                     *             "pinyin": "de1"
                     *         },
                     *         {
                     *             "name": "集中供暖",
                     *             "pinyin": "ct1"
                     *         }
                     *     ],
                     *     "subway_avg_price": null,
                     *     "recommend_list": null
                     * }
                     * ```
                     */
                    let data=response.data.data;
                    /**
                     * 数据保存到文件里
                     * @param {object} list 一组数据
                     */
                    async function appendFile(list){
                        let length=list.length;
                        for(let c=0;c<length;c=c+1){
                            let item=list[c];
                            let line=[];
                            keys.forEach(function(key){
                                line.push(item[key]);
                            });
                            let m_url=item[`m_url`];
                            try{
                                let response=await axios.get(m_url,{timeout:5000});
                                {
                                    let filteredDetail=filterDetailHtmlData(response.data);
                                    detailKeys.forEach(function(key){
                                        line.push(filteredDetail[key]);
                                    });
                                    console.log(n,line);
                                    n=n+1;
                                    fs.appendFile(dbFile,line.join(`,`)+`\n`);
                                }
                            }catch(error){
                                console.log(error);
                            }
                        }
                    }
                    await appendFile(data.list);
                    let total=data.total;
                    for(let c=0;c<Math.ceil(total/limit);c=c+1){
                        let offset=limit+c*limit;
                        try{
                            let response=await axios.get(`https://app.api.lianjia.com/Rentplat/v1/house/list?city_id=440300&condition=${districtName}/rt200600000001&limit=${limit}&offset=${offset}&scene=list`,{timeout:10000});
                            {
                                let data=response.data.data;
                                await appendFile(data.list);
                            }
                        }catch(error){
                            console.log(error);
                        }
                    }
                }
            }
        }
    }
}
/**
 * 过滤出商业圈
 * @param {object} data 访问API＂https://m.lianjia.com/chuzu/aj/config/filter?city_id=440300＂之后所得到的JSON数据
 * @returns {array} 一组商业圈的名字
 * @example
 * ```JavaScript
 * filterBusinessCircles({
 *     "li": {
 *     },
 *     "d": {
 *         "name": "全深圳",
 *         "options": [
 *             {
 *                 "name": "不限",
 *                 "id": 0,
 *                 "pinyin": "/",
 *                 "children": []
 *             },
 *             {
 *                 "name": "罗湖区",
 *                 "id": 23008678,
 *                 "pinyin": "luohuqu/",
 *                 "children": [
 *                     {
 *                         "id": 0,
 *                         "name": "不限",
 *                         "pinyin": "/"
 *                     },
 *                     {
 *                         "id": 612400033,
 *                         "name": "布心",
 *                         "pinyin": "buxin/"
 *                     },
 *                 ]
 *             },
 *             {
 *                 "name": "福田区",
 *                 "id": 23008674,
 *                 "pinyin": "futianqu/",
 *                 "children": [
 *                     {
 *                         "id": 0,
 *                         "name": "不限",
 *                         "pinyin": "/"
 *                     },
 *                     {
 *                         "id": 612400009,
 *                         "name": "八卦岭",
 *                         "pinyin": "bagualing/"
 *                     },
 *                 ]
 *             },
 *         ]
 *     },
 *     "poi": {
 *     },
 * });
 * ```
 * =>
 * ```json
 * [ 'buxin', 'bagualing' ]
 * ```
 */
function filterBusinessCircles(data){
    let regions=[];
    data.d.options.slice(1).forEach(function(district){
        return district.children.slice(1).forEach(function(region){
            regions.push(region.pinyin.replace(`\/`,``));
        });
    });
    return regions;
}
/**
 * 过滤出深圳的几个行政区
 * @param {object} data 访问API＂https://m.lianjia.com/chuzu/aj/config/filter?city_id=440300＂之后所得到的JSON数据
 * @returns {array} 一组行政区的名字
 * @example
 * ```JavaScript
 * filterDistrictNames({
 *     "d": {
 *         "name": "全深圳",
 *         "options": [
 *             {
 *                 "name": "不限",
 *                 "id": 0,
 *                 "pinyin": "/",
 *                 "children": []
 *             },
 *             {
 *                 "name": "罗湖区",
 *                 "id": 23008678,
 *                 "pinyin": "luohuqu/",
 *             },
 *             {
 *                 "name": "福田区",
 *                 "id": 23008674,
 *                 "pinyin": "futianqu/",
 *             },
 *         ]
 *     },
 * });
 * ```
 * =>
 * ```json
 * [ 'luohuqu', 'futianqu' ]
 * ```
 */
function filterDistrictNames(data){
    let regions=[];
    data.d.options.slice(1).forEach(function(district){
        return regions.push(district.pinyin.replace(`\/`,``));
    });
    return regions;
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
    return{
        longitude,latitude,
        floor,elevator,maintain,checkin,carport,water,electricity,gas,tenancy_period,see_house
    };
}
/**
 * 测试程序的功能
 */
function test(){
    console.log(`开始测试程序的功能`);
    /**
     * filterBusinessCircles
     */
    assert.equal(JSON.stringify([ 'buxin', 'bagualing' ]),JSON.stringify(filterBusinessCircles({
        "d": {
            "name": "全深圳",
            "options": [
                {
                    "pinyin": "/",
                    "children": []
                },
                {
                    "name": "罗湖区",
                    "pinyin": "luohuqu/",
                    "children": [
                        {
                            "name": "不限",
                            "pinyin": "/"
                        },
                        {
                            "name": "布心",
                            "pinyin": "buxin/"
                        },
                    ]
                },
                {
                    "name": "福田区",
                    "pinyin": "futianqu/",
                    "children": [
                        {
                            "name": "不限",
                            "pinyin": "/"
                        },
                        {
                            "name": "八卦岭",
                            "pinyin": "bagualing/"
                        },
                    ]
                },
            ]
        },
    })));
    /**
     * filterDistrictNames
     */
    assert.equal(JSON.stringify([ 'luohuqu', 'futianqu' ]),JSON.stringify(filterDistrictNames({
        "d": {
            "name": "全深圳",
            "options": [
                {
                    "name": "不限",
                    "id": 0,
                    "pinyin": "/",
                    "children": []
                },
                {
                    "name": "罗湖区",
                    "id": 23008678,
                    "pinyin": "luohuqu/",
                },
                {
                    "name": "福田区",
                    "id": 23008674,
                    "pinyin": "futianqu/",
                },
            ]
        },
    })));
    console.log(`通过测试`);
}
index();
