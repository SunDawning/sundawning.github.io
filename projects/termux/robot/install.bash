command -v node >/dev/null 2>&1 || {
    echo "Installing command: nodejs";
    pwd;
    pkg install nodejs -y;
    npm config set registry https://registry.npm.taobao.org;
}
if test -z "$(find ~/termux-robot)";then
    echo "Making directory: ~/termux-robot";
    mkdir ~/termux-robot;
fi
