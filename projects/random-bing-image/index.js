function randomItem(array){
    return array[Math.floor(Math.random()*array.length)];
}
/**
 * Bing每日图片的API
 */
let bingImagesAPIURL="https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10";
async function getBingImages(){
    let corsServers=[
        /* "https://jsonp.afeld.me/?url=",
         * "https://api.allorigins.win/raw?url=", */
        "https://salty-earth-46109.herokuapp.com/",
        "https://eerovil-cors-proxy.herokuapp.com/",
        "https://lazyguy-nhl-proxy.herokuapp.com/",
        "https://cors-anywhere.herokuapp.com/"
    ];
    let headers=new window.Headers();
    headers.set("Origin","origin");
    let response=await window.fetch(randomItem(corsServers)+bingImagesAPIURL,{headers:headers});
    return await response.json();
}
async function randomBingImage(){
    let localStorageKey="bingImages";
    let bingImages=JSON.parse(window.localStorage.getItem(localStorageKey));
    if(bingImages===null){bingImages={};}
    if((bingImages.data===undefined)||((new Date().getTime()-bingImages.update)>24*60*60*1000)){
        bingImages.data=await getBingImages();
        if(bingImages.data){
            bingImages.update=new Date().getTime();
            window.localStorage.setItem(localStorageKey,JSON.stringify(bingImages));
        }
    }
    function getImgCreate(options){
        let img=document.createElement("img");
        Object.assign(img,options);
        return img;
    }
    return getImgCreate({"src":new window.URL(randomItem(bingImages.data.images).url,bingImagesAPIURL).href,"data":bingImages.data});
}
/**
 * 在当前DOM的后面添加img网页元素
 */
async function randomBingImageAfterDOMElement(element){
    let img=await randomBingImage();
    element.after(img);
}
async function randomBingImageBeforeDOMElement(element){
    let img=await randomBingImage();
    element.before(img);
}
async function randomBingImageAppendToDOMElement(element){
    let img=await randomBingImage();
    element.appendChild(img);
}
