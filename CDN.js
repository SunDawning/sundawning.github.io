/**
 * 配置CDN地址，便于动态import CDN上的JavaScript文件
 * 一个CDN地址即是一个仓库的地址，在这个地址中可以找到JavaScript文件
 * @param input.uri CDN的地址，是一个字符串：
 * - 不填的话，默认使用import引用CDN.js的地址作为CDN的地址。
 * - 可以与import引用的CDN.js的地址不同
 * @return output.import 动态import CDN上的JavaScript文件
 * @return output.set 替换CDN的地址
 */
export function CDN(input){
    if(input===undefined){
        input={};
    }
    let output={};
    /**
     * 动态import CDN上的JavaScript文件
     */
    output.import=async function(url){
        return await import(new URL(url,output.uri));
    }
    /**
     * 替换CDN的地址
     */
    output.set=function(uri){
        if(uri===undefined){
            output.uri=import.meta.url;//使用引用CDN.js的地址作为CDN的地址
        }else{
            output.uri=uri;
        }
    }
    output.set(input.uri);
    return output;
}
