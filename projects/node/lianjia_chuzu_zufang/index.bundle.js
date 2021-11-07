(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lianjia_chuzu_zufang = factory());
}(this, (function () { 'use strict';

    /**
     * 自动化：rollup -c index.js --watch
     */
    /**
     * @file 本项目辅助工具，集打包、发布为一体，尽量自动化完成各种重复的或频繁的步骤，包括但不限于：
     * - 下载
     * - 测试
     * - 打包：将所涉及到的必需的文件全部放到一个文件夹里
     * - 生成文档
     * - 发布
     * - 版本管理
     * - 日志
     * - 统计报告：进度、错误、需求
     * 而只管编辑某个功能和只测试该功能
     * @author SunDawning <dpmeichen@gmail.com>
     * @version 0.0.1
     */
    /**
     * # 命名规范
     * - 全局变量：SCREAMING_SNAKE_CASE
     * - 局部变量、函数、文件名：snake_case
     * - 类、类型：UpperCamelCase
     */

    /**
     * 打包配置
     */
    let CONFIG={
        input:`index.js`,
        output:{file:`index.bundle.js`,format:`umd`,name:`lianjia_chuzu_zufang`}
    };

    return CONFIG;

})));
