/**
 * ```sh
 * pnpm init -y
 * pnpm add puppeteer --save-dev
 * node index.js
 * ```
 */
/**
 * 登录
 * https://www.51job.com/
 */
let puppeteer=require("puppeteer");
async function index(){
    let browser=await puppeteer.launch({
        headless:false
    });
    let page=await browser.newPage();
    let url="https://www.51job.com/";
    await page.goto(url);
    console.log("打开网址：",url);
    // await browser.close();
}
index();
