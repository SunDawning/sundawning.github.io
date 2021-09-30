function ensure_bashrc(){
    if test -z "$(find ~ -name '.bashrc')";then
	echo "Not exist ~/.bashrc";
	echo "Creating ~/.bashrc";
	echo "" > ~/.bashrc;
    fi
    echo "Existed ~/.bashrc";
}
function ensure_reference_index_bash(){
    if test -z "$(grep 'bash ~/.termux-robot/index.bash' ~/.bashrc)";then
	echo "Not Install reference in ~/.bashrc";
	echo "Installing reference in ~/.bashrc";
	echo "bash ~/.termux-robot/index.bash" >> ~/.bashrc;
    fi
    echo "Installed reference in ~/.bashrc";
}
function ensure_directory(){
    if test -z "$(find ~/.termux-robot)";then
	echo "Not exist ~/.termux-robot";
	echo "Creating ~/.termux-robot";
	mkdir ~/.termux-robot;
    fi    
}
function download_latest_index_bash(){
    echo "Downloading ~/.termux-robot/index.bash";
    curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o index.bash
    echo "Downloading ~/.termux-robot/index.min.js";
    curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.min.js -o index.min.js
    echo "Downloading ~/.termux-robot/koa.min.js";
    curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/koa.min.js -o koa.min.js
}
function index(){
    pwd;
    ensure_bashrc;
    ensure_reference_index_bash;
    ensure_directory;
    cd ~/.termux-robot;    
    pwd;
    download_latest_index_bash;
    pwd;
    bash ./index.bash;
}
index;
