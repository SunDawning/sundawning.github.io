#!/bin/bash
function install_node_js(){
    command -v node >/dev/null 2>&1 || {
	pkg install nodejs -y;
	npm config set registry https://registry.npm.taobao.org;
    }
}
function index(){
    cd ~/termux-robot;
    pwd;
    install_node_js;
    pwd;
    node ./index.min.js;
}
index;
