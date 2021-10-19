let axios=require(`axios`);
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
     *     li: {
     *         name: '全深圳',
     *         type: 'radio',
     *         options: [
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object], [Object]
     *         ]
     *     },
     *     d: {
     *         name: '全深圳',
     *         type: 'radio',
     *         options: [
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object], [Object],
     *             [Object]
     *         ]
     *     },
     *     poi: {
     *         name: '定位附近',
     *         key: 'poi',
     *         type: 'radio',
     *         is_basic: 1,
     *         options: [ [Object], [Object], [Object], [Object] ]
     *     },
     *     sign: '151028af6c7c3f65cf984ff11d145109'
     * }
     * ```
     */
    let data=response.data.data;
});
