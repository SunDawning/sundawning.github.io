let puppeteer=require("puppeteer");
let config=require("./config.js");
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
async function slider(page) {
    // 等待canvas完成 并完成0.5s的移动动画 (验证出错也可为等待时间)
    await page.waitForSelector('.geetest_ready', {
        timeout: 0,
    });
    await page.waitForTimeout(500);
    // 获取canvas的左上角X坐标作为滑动的基坐标
    await page.waitForSelector('.geetest_canvas_bg');
    let canvasCoordinate = await page.$('.geetest_canvas_bg');
    let canvasBox = await canvasCoordinate.boundingBox();
    let canvasX = canvasBox.x;
    // 等待滑动按钮出现获取Y坐标
    await page.waitForSelector('.geetest_slider_button');
    let button = await page.$('.geetest_slider_button');
    let box = await button.boundingBox();
    let mouseY = Math.floor(box.y + box.height / 2);
    // 计算位移
    let moveDistance = await compare(page);
    // 滑动验证
    await page.hover('.geetest_slider_button');
    await page.mouse.down();
    await page.mouse.move(canvasX + moveDistance / 3, mouseY, { steps: 15 });
    await page.waitForTimeout(1 * 30);
    await page.mouse.move(canvasX + moveDistance / 2, mouseY, { steps: 20 });
    await page.waitForTimeout(2 * 50);
    await page.mouse.move(canvasX + moveDistance + 10, mouseY, { steps: 18 });
    await page.waitForTimeout(3 * 80);
    await page.mouse.move(canvasX + moveDistance / 1, mouseY, { steps: 60 });
    await page.waitForTimeout(4 * 30);
    await page.mouse.up();
    await page.waitForTimeout(50000);
    await page.click(".geetest_panel_error_content");
    await page.waitForSelector('.geetest_success_radar_tip_content');
    // 是否验证成功
    let state = await page.evaluate(() => {
        return document.querySelector('.geetest_success_radar_tip_content').innerText;
    });
    if (state !== '验证成功') {
        return slider();
    }
}
// 计算位移
async function compare(page) {
    //  获取canvas
    let moveDistance = await page.evaluate(() => {
        let fullbgs = document.querySelector('.geetest_canvas_fullbg');
        let bgs = document.querySelector('.geetest_canvas_bg');
        let bgsCtx = bgs.getContext('2d');
        let fullbgsCtx = fullbgs.getContext('2d');
        let canvasWidth = bgsCtx.canvas.width;
        let canvasHeight = bgsCtx.canvas.height;
        // 最大像素差(阀值)
        // let pixelsDifference = 100;
        let pixelsDifference = 70;
        // 第一个超过阀值的x坐标 最后一个超过阀值的x坐标
        let firstX, lastX;
        // 对比像素
        for (let i = 1, k = 1; i < canvasWidth; i++) {
            if (!firstX) {
                // 找到第一个超过阀值的X坐标后 Y轴停止循环
                for (let j = 1; j < canvasHeight; j++) {
                    // 获取像素数据
                    let bgsPx = bgsCtx.getImageData(i, j, 1, 1).data;
                    let fullbgsPx = fullbgsCtx.getImageData(i, j, 1, 1).data;
                    // 计算像素差 并判断是否超过阀值
                    let res1 = Math.abs(bgsPx[0] - fullbgsPx[0]);
                    let res2 = Math.abs(bgsPx[1] - fullbgsPx[1]);
                    let res3 = Math.abs(bgsPx[2] - fullbgsPx[2]);
                    if (res1 > pixelsDifference || res2 > pixelsDifference || res3 > pixelsDifference) {
                        firstX = i;
                        // 记录Y坐标
                        k = j;
                    }
                }
            } else {
                // 顺着X轴查找最后一个超过阀值的X坐标
                // K是第一个超过阀值的Y坐标
                // (会多一点循环时间 但是不用手动测量阴影块宽度)
                let bgsPx = bgsCtx.getImageData(i, k, 1, 1).data;
                let fullbgsPx = fullbgsCtx.getImageData(i, k, 1, 1).data;
                let res1 = Math.abs(bgsPx[0] - fullbgsPx[0]);
                let res2 = Math.abs(bgsPx[1] - fullbgsPx[1]);
                let res3 = Math.abs(bgsPx[2] - fullbgsPx[2]);
                if (res1 > pixelsDifference || res2 > pixelsDifference || res3 > pixelsDifference) {
                    lastX = i;
                }
            }
        }
        // 滑动到阴影块中心的距离
        return firstX + (lastX - firstX) / 2;
    });
    return moveDistance;
}
async function index(){
    let browser=await puppeteer.launch({
        ignoreDefaultArgs:["--enable-automation"],
        headless:false
    });
    let page=await browser.newPage();
    let url="https://www.51job.com/";
    await page.goto(url);
    console.log("打开网址：",url);
    await page.waitForSelector("body > div.content > div > div.ubox > div.sml.e_icon.radius_5 > div.abut_box > span.abut.showLogin");
    await page.click("body > div.content > div > div.ubox > div.sml.e_icon.radius_5 > div.abut_box > span.abut.showLogin");
    console.log("点击了：","登录");
    await page.waitForSelector("#NormalLoginBtn > span:nth-child(3) > a");
    await page.click("#NormalLoginBtn > span:nth-child(3) > a");
    console.log("切换为：","密码登录");
    await page.waitForSelector("#loginname");
    await page.type("#loginname",config.loginname,{delay:100});
    console.log("输入了：","账号");
    await page.type("#password",config.password,{delay:100});
    console.log("输入了：","密码");
    await page.click("#isread_em");
    console.log("勾选了：","用户协议");
    await page.click("#login_btn_withPwd");
    console.log("点击了：","登录");
    await page.waitForSelector(".geetest_holder");
    console.log("手动滑动验证码");
    await slider(page);
    // await browser.close();
}
index();
