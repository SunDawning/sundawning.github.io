function ensure_bashrc(){
    if test -z "$(find ~ -name '.bashrc')";then
	echo "Not exist ~/.bashrc";
	echo "Creating ~/.bashrc";
	echo "" > ~/.bashrc;
    fi
    echo "Existed ~/.bashrc";
}
function ensure_reference_index_bash(){
    if test -z "$(grep 'bash ~/index.bash' ~/.bashrc)";then
	echo "Not Install reference in ~/.bashrc";
	echo "Installing reference in ~/.bashrc";
	echo "bash ~/index.bash" >> ~/.bashrc;
    fi
    echo "Installed reference in ~/.bashrc";
}
function download_latest_index_bash(){
    echo "Downloading ~/index.bash";
    curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o ~/index.bash
    echo "Downloading ~/index.js";
    curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.js -o ~/index.js
}
function index(){
    ensure_bashrc;
    ensure_reference_index_bash;
    download_latest_index_bash;
    bash ~/index.bash;
}
index;
