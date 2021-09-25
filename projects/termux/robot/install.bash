echo "Downloading ~/index.bash";
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o ~/index.bash
echo "Downloading ~/index.js";
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.js -o ~/index.js
if test -z "$(find ~ -name '.bashrc')";then
    echo "Not exist ~/.bashrc";
    echo "Creating ~/.bashrc";
    echo "" > ~/.bashrc;
fi
echo "Existed ~/.bashrc";
if test -z "$(grep 'bash ~/index.bash' ~/.bashrc)";then
    echo "Not Install reference in ~/.bashrc";
    echo "Installing reference in ~/.bashrc";
    echo "bash ~/index.bash" >> ~/.bashrc;
fi
echo "Installed reference in ~/.bashrc";
