/*
 * 1. deno bundle https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/formatTime.js formatTime.js
 * 2. npm install rollup --save-dev
 * 3. ./node_modules/.bin/rollup.cmd -c rollup.config.js
 */
export async function formatTime(){
    let module="./formatTime.js"; // [!] Error: UMD and IIFE output formats are not supported for code-splitting builds.
    let{formatTime}=await import(module);
    return formatTime.apply(null,arguments);
}
