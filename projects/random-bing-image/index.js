async function randomBingImage(){
    let apiURL="https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10";
    let localStorageKey="bingImages";
    let data=JSON.parse(window.localStorage.getItem(localStorageKey));
    function randomItem(array){
        return array[Math.floor(Math.random()*array.length)];
    }
    if(data===null){
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
        data=await response.json();
        if(data){
            window.localStorage.setItem(localStorageKey,JSON.stringify(data));
        }        
    }
    function getImgCreate(options){
        let img=document.createElement("img");
        Object.assign(img,options);
        return img;
    }
    return getImgCreate({"src":new window.URL(randomItem(data.images).url,apiURL).href,"data":data});
}
/**
 * 在当前DOM的后面添加img网页元素
 */
async function randomBingImageAfterDOMElement(element){
    let img=await randomBingImage();
    element.after(img);
}
