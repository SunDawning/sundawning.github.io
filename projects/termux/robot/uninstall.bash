function remove_index_bash(){
    echo "removing ~/index.bash";
    rm ~/index.bash;
    echo "removing ~/index.js";
    rm ~/index.js;
    echo "removing ~/config.default.js";
    rm ~/config.default.js;
}
function remove_reference_index_bash(){
    echo "deleting reference in ~/.bashrc";
    sed -ie '/bash ~\/index.bash/d' ~/.bashrc
}
function index(){
    remove_reference_index_bash;
    remove_index_bash;
}
index;
