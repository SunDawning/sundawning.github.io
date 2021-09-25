#!/bin/bash
function install_node_js(){
    command -v node >/dev/null 2>&1 || {
        pkg install nodejs -y;
    }
}
function install_pnpm(){
    command -v pnpm >/dev/null 2>&1 || {
        npm install pnpm -g;
    }
}
function install_is_module_installed(){
    if test -z "$(pnpm ls is-module-installed)";then
        echo "Not Install is-module-installed";
        echo "Installing is-module-installed";
        pnpm add is-module-installed --save-dev;
    fi
}
function main(){
    install_node_js;
    install_pnpm;
    install_is_module_installed;
    node ./index.js;
}
main;
