window.RandomBingImage=function(){
    let SELF={};
    SELF.randomItem=function(array){
        return array[Math.floor(Math.random()*array.length)];
    };
    /**
     * Bing每日图片的API
     */
    SELF.bingImagesAPIURL="https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10";
    /**
     * 跨域代理服务器
     */
    SELF.corsServers=[
        /* "https://jsonp.afeld.me/?url=",
         * "https://api.allorigins.win/raw?url=", */
        "https://salty-earth-46109.herokuapp.com/",
        "https://eerovil-cors-proxy.herokuapp.com/",
        "https://lazyguy-nhl-proxy.herokuapp.com/",
        "https://cors-anywhere.herokuapp.com/"
    ];
    SELF.getBingImages=async function(){
        let headers=new window.Headers();
        headers.set("Origin","origin");
        let response=await window.fetch(SELF.randomItem(SELF.corsServers)+SELF.bingImagesAPIURL,{headers:headers});
        return await response.json();
    };
    /**
     * 使用localStorage保存当日的数据
     */
    SELF.localStorageKey="bingImages";
    SELF.randomBingImage=async function(){
        let bingImages=JSON.parse(window.localStorage.getItem(SELF.localStorageKey));
        if(bingImages===null){bingImages={};}
        if((bingImages.data===undefined)||((new Date().getTime()-bingImages.update)>24*60*60*1000)){
            bingImages.data=await SELF.getBingImages();
            if(bingImages.data){
                bingImages.update=new Date().getTime();
                window.localStorage.setItem(SELF.localStorageKey,JSON.stringify(bingImages));
            }
        }
        function getImgCreate(options){
            let img=document.createElement("img");
            Object.assign(img,options);
            return img;
        }
        return getImgCreate({"src":new window.URL(SELF.randomItem(bingImages.data.images).url,SELF.bingImagesAPIURL).href,"data":bingImages.data});
    };
    /**
     * 在当前DOM的后面添加img网页元素
     */
    SELF.randomBingImageAfterDOMElement=async function(element){
        let img=await SELF.randomBingImage();
        element.after(img);
    };
    SELF.randomBingImageBeforeDOMElement=async function(element){
        let img=await SELF.randomBingImage();
        element.before(img);
    };
    SELF.randomBingImageAppendToDOMElement=async function(element){
        let img=await SELF.randomBingImage();
        element.appendChild(img);
    };
    return SELF;
}
