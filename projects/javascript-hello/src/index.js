import"regenerator-runtime/runtime";
async function init(){
    let{Scene}=await import("three");
    let scene=new Scene();
    document.write(JSON.stringify(scene));
}
init();

