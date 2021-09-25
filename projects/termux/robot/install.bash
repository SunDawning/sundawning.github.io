curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o ~/index.bash
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.js -o ~/index.js
if test -z "$(find ~ -name '.bashrc')";then
    echo "Not exist ~/.bashrc";
    echo "Creating file ~/.bashrc";
    echo "" > ~/.bashrc;
fi
echo "Exist file ~/.bashrc";
if test -z "$(grep 'bash ~/index.bash' ~/.bashrc)";then
    echo "Not Install ~/index.bash";
    echo "Installing";
    echo "bash ~/index.bash" >> ~/.bashrc;
fi
echo "Installed ~/index.bash";
