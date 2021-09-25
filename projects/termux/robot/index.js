function hello(){
    console.log("欢迎");
}
/**
 * 是否安装了模块
 */
function is_module_installed(module){
    let isInstalled=require("is-module-installed");
    let is=isInstalled(module);
    return is;
}
/**
 * 安装模块
 */
function install_module(module){
    if(is_module_installed(module)===true){return;}
    console.log(`安装模块：${module}`);
    let child_process=require("child_process");
    child_process.spawnSync("pnpm",["add",module,"--save-dev"]);
}
/**
 * 安装与导入模块
 */
function install_require(module){
    install_module(module);
    try{
        let required=require(module);
        return required;
    }catch(error){
        return install_require(module);
    }
}
/**
 * 获取系统正在运行的程序
 */
async function getProcessList(){
    let psList=install_require("ps-list");
    let list=await psList();
    return list;
}
/**
 * 安装全局npm包
 */
async function npmInstall(){
}
/**
 * 后台运行系统程序
 */
function start_process(cmd){
    let child_process=require("child_process");
    child_process.spawn(cmd.program,cmd.args);
}
function start_process_sync(cmd){
    let child_process=require("child_process");
    child_process.spawnSync(cmd.program,cmd.args);
}
/**
 * 后台启动一些程序
 */
async function start_processes(){
    let processes={
        "crond":{cmd:{program:"crond",args:[]},install:{program:"pkg",args:["install","cronie","-y"]}},
        "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
    };
    let processList=await getProcessList();
    Object.keys(processes).forEach(function(name){
        let matched=processList.filter(function(item){
            return item.name===name;
        });
        if(matched.length===0){
            let which=require("which");
            which(name,function(error,resolvePath){
                if(error){
                    console.log(`未安装程序：${name}`);
                    console.log(`将安装程序：${name}`);
                    start_process_sync(processes[name].install);
                }
                console.log(`启动程序：${name}`);
                start_process(processes[name].cmd);
            });
        }else{
            console.log(`已启动程序：${name}`);
        }
    });
}
/**
 * 运行本程序
 */
async function index(){
    hello();
    await start_processes();
}
index();
