// ** index.js


// [[file:~/literate-programming/blender-threejs.org::*index.js][index.js:1]]
async function createTHREEAPP(){
    let SELF={};
    SELF.container=document.getElementById("THREE");
    await import("https://unpkg.com/three/build/three.min.js");
    SELF.scene=new THREE.Scene();
    SELF.ambiemtLight=new THREE.AmbientLight();
    SELF.scene.add(SELF.ambiemtLight);
    SELF.gridHelper=new THREE.GridHelper(100,10);
    SELF.scene.add(SELF.gridHelper);
    SELF.axesHelper=new THREE.AxesHelper(10);
    SELF.scene.add(SELF.axesHelper);
    SELF.scene.background=new THREE.Color(0xa5a5a5);
    SELF.webGLRenderer=new THREE.WebGLRenderer();
    SELF.container.appendChild(SELF.webGLRenderer.domElement);
    SELF.perspectiveCamera=new THREE.PerspectiveCamera();
    SELF.perspectiveCamera.position.set(5,5,5);
    SELF.render=function(){
        SELF.webGLRenderer.render(SELF.scene,SELF.perspectiveCamera);
    };
    SELF.animationFrame=function(){
        SELF.render();
        SELF.animationFrameID=requestAnimationFrame(SELF.animationFrame);
    };
    SELF.animationFrame();
    await import("https://unpkg.com/three/examples/js/controls/OrbitControls.js");
    SELF.orbitControls=new THREE.OrbitControls(SELF.perspectiveCamera,SELF.webGLRenderer.domElement);
    SELF.resize=function(x,y){
        SELF.webGLRenderer.setSize(x,y);
        SELF.perspectiveCamera.aspect=x/y;
        SELF.perspectiveCamera.updateProjectionMatrix();
    };
    return SELF;
}
async function loadModel(){
    await import("https://unpkg.com/three/examples/js/loaders/GLTFLoader.js");
    window.gltfLoader=new THREE.GLTFLoader();
    await import("https://unpkg.com/three/examples/js/loaders/DRACOLoader.js");
    window.dracoLoader=new THREE.DRACOLoader();
    dracoLoader.setDecoderPath("https://unpkg.com/three/examples/js/libs/draco/gltf/");
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load("./hello.glb",function(data){
        APP.scene.add(data.scene);
        console.log(data);
    });
}
async function init(){
    window.APP=await createTHREEAPP();
    function onResize(event){
        APP.resize(window.innerWidth,window.innerHeight);
    }
    window.addEventListener("resize",onResize);
    onResize();
    await loadModel();
}
init();//top-level await
// index.js:1 ends here
