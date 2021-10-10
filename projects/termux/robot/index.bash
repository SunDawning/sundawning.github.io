#!/bin/bash
function index(){
    if test -z "$(pgrep node)";then
	echo "Not start tasks.";
	echo "Starting tasks.";
	cd ~/termux-robot;
	pwd;
	pm2 start index.min.js;
    fi
}
index;
