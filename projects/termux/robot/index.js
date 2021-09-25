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
 * 安装模块：cross_spawn
 */
function install_cross_spawn(){
    let module="cross-spawn";
    if(is_module_installed(module)===true){return;}
    let child_process=require("child_process");
    child_process.spawnSync("pnpm",["add",module,"--save-dev"]);
}
/**
 * 安装模块
 */
function install_module(module){
    if(is_module_installed(module)===true){return;}
    console.log(`安装模块：${module}`);
    let cross_spawn=require("cross-spawn");
    cross_spawn.sync("pnpm",["add",module,"--save-dev"]);
}
/**
 * 安装与导入模块
 */
function install_require(module){
    install_module(module);
    let required=require(module);
    return required;
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
function startProcess(cmd){
    let parsedCmd=cmd.split(" ");
    let cross_spawn=require("cross-spawn");
    cross_spawn(parsedCmd[0],parsedCmd.slice[1]);
}
function startProcessSync(cmd){
    let parsedCmd=cmd.split(" ");
    let cross_spawn=require("cross-spawn");
    cross_spawn.sync(parsedCmd[0],parsedCmd.slice[1]);
}
/**
 * 后台启动一些程序
 */
async function startProcesses(){
    let processes={
        "crond":{cmd:"crond",install:"pkg install cronie -y"},
        "sshd":{cmd:"sshd -p 8022",install:"pkg install openssh -y"}
    };
    let processList=await getProcessList();
    Object.keys(processes).forEach(async function(name){
        let matched=processList.filter(function(item){
            return item.name===name;
        });
        if(matched.length===0){
            let which=install_require("which");
            which(name,function(error,resolvePath){
                if(error){
                    console.log(`未安装程序：${name}`);
                    console.log(`将安装程序：${name}`);
                    startProcessSync(processes[name].install);
                }
                console.log(`启动程序：${name}`);
                startProcessSync(processes[name].cmd);
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
    install_cross_spawn();
    await startProcesses();
}
index();
