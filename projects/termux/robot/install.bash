curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o ~/index.bash
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.js -o ~/index.js
if test -z "$(find ~ -name '.bashrc')";then
    echo "Not exist ~/.bashrc";
    echo "" > ~/.bashrc;
else
    echo "Exist ~/.bashrc";
fi
if test -z "$(grep 'bash ~/index.bash' ~/.bashrc)";then
    echo "Not Install";
    echo "Installing";
    echo "bash ~/index.bash" >> ~/.bashrc;
else
    echo "Installed ~/index.bash";
fi
