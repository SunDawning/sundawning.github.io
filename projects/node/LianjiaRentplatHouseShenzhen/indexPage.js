/**
 * 全量下载索引页面的数据：`${new Date().getTime()}.csv`
 */
let axios=require(`axios`);
let fs=require(`fs-extra`);
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
{
    /**
     * 从API获取行政区
     */
    axios.get(`https://m.lianjia.com/chuzu/aj/config/filter?city_id=440300`).then(function(response){
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
        let dbFile=`indexPage.txt`;
        let n=0;
        districtNames.forEach(function(districtName){
            /**
             * 从API里获取下一级的详情页面
             * @see https://app.api.lianjia.com/Rentplat/v1/house/list?city_id=440300&condition=luohuqu/rt200600000001&limit=30&offset=0&request_ts=1634648306&scene=list
             */
            let limit=30;
            axios.get(`https://app.api.lianjia.com/Rentplat/v1/house/list?city_id=440300&condition=${districtName}/rt200600000001&limit=${limit}&offset=0&scene=list`).then(function(response){
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
                function appendFile(list){
                    list.forEach(function(item){
                        item["timestamp"]=new Date().getTime();
                        let line=JSON.stringify(item);
                        console.log(n);
                        n=n+1;
                        fs.appendFile(dbFile,line+`\n`);
                    });
                }
                appendFile(data.list);
                let total=data.total;
                let offsets=[];
                for(let c=0;c<Math.ceil(total/limit);c=c+1){
                    let offset=limit+c*limit;
                    offsets.push(offset);
                }
                offsets.forEach(function(offset){
                    axios.get(`https://app.api.lianjia.com/Rentplat/v1/house/list?city_id=440300&condition=${districtName}/rt200600000001&limit=${limit}&offset=${offset}&scene=list`,{timeout:60000}).then(function(response){
                        let data=response.data.data;
                        appendFile(data.list);
                    });
                });
            });
        });
    });
}
