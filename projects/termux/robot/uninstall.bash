echo "removing ~/index.bash";
rm ~/index.bash;
echo "removing ~/index.js";
rm ~/index.js;
echo "delete reference in ~/.bashrc";
sed -ie '/bash ~\/index.bash/d' ~/.bashrc
