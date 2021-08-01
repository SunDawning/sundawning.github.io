async function randomBingImage(){
    let apiURL="https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10";
    let localStorageKey="bingImages";
    let bingImages=JSON.parse(window.localStorage.getItem(localStorageKey));
    if(bingImages===null){bingImages={};}
    function randomItem(array){
        return array[Math.floor(Math.random()*array.length)];
    }
    if((bingImages.data===undefined)||((new Date().getTime()-bingImages.update)>24*60*60*1000)){
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
        let response=await window.fetch(randomItem(corsServers)+apiURL,{headers:headers});
        bingImages.data=await response.json();
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
    return getImgCreate({"src":new window.URL(randomItem(bingImages.data.images).url,apiURL).href,"data":bingImages.data});
}
/**
 * 在当前DOM的后面添加img网页元素
 */
async function randomBingImageAfterDOMElement(element){
    let img=await randomBingImage();
    element.after(img);
}
