/**
 * @see https://nodemailer.com/about/
 */
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        /**
         * yahoo email的登录设置（<2021-10-31 Sun 20:23:52 UTC+08:00>）
         * host和port：{@link https://serversmtp.com/smtp-yahoo/}
         * user和pass：在{@link https://login.yahoo.com/myaccount/security}账户安全页面，生成一个登录密码＂App Password＂。
         */
        host: "smtp.mail.yahoo.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "master@yahoo.com", // generated ethereal user
            pass: "nhlrmhxfwfbvbocx", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"master" <master@yahoo.com>', // sender address
        to: "xxxx@qq.com", // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
