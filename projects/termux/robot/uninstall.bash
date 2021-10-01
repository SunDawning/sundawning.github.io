function remove_index_bash(){
    echo "removing ~/termux-robot";
    rm -r ~/termux-robot;
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
