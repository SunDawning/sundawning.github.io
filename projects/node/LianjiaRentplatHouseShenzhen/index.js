let axios=require(`axios`);
let fs=require(`fs-extra`);
let assert=require(`assert`);
/**
 * condition
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
    
});
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
 * 测试程序的功能
 */
function test(){
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
}
