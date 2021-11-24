/**
 * 离线下载资源
 * 将所涉及到的在线资源都离线到本地
 * node server.js
 */
let child_process=require("child_process");
child_process.exec("http-server -p 9080");
