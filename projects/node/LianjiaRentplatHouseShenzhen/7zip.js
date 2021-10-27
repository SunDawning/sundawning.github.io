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
    let packedFile=`${directory}.7z`;
    p7zip.pack(directory,packedFile,function(error){
        if(error){
            console.log(error);
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
                let childProcess=execSync(cmd);
                childProcess.stdout.pipe(process.stdout);
                childProcess.stderr.pipe(process.stderr);
                return childProcess;
            }
            /**
             * 获取不同操作系统查找命令的程序
             */
            function get_platform_which_command(){
                switch(process.platform){
                    case "win32":
                        return "where";
                    case "android":
                        return "which";
                    default:
                        return "";
                }
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
                    return child_process_exec_sync(`${get_platform_which_command()} ${command}`);
                }catch(error){
                    return undefined;
                }
            }
            if(executable_find(`7za`)===undefined){
                child_process_exec_sync(`pkg install p7zip -y`);
            }
            child_process_exec_sync(`7za a ${packedFile} ${directory}`);
        }
    });
}
