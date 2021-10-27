let fs=require(`fs-extra`);
let p7zip=require(`7zip-min`);
/**
 * 使用7z来将下载的csv文件包含到一个压缩包里
 * @see https://www.npmjs.com/package/7zip-min
 */
let directory=`dbDirectory`;
let files=fs.readdirSync(directory);
console.log(`files:`,files);
if(files.length>0){
    p7zip.pack(directory,`${directory}.7z`,function(error){});
}
