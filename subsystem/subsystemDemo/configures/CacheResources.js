/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 配置缓存资源的路径，支持外部第三方的资源URL

/**
 * 路径都是编译完后输出到输出目录中，相对于“pages”文件夹(如：dist/test/pages)的相对路径
 * 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
 *
 * @type {string[]} 字符串数组
 */
let cacheResources = [
    // '../static/ico/compressed/ico_48_48.png',
    // '../static/ico/compressed/ico_72_72.png',
    // '../static/ico/compressed/ico_96_96.png',
    // '../static/ico/compressed/ico_120_120.png',
    // '../static/ico/compressed/ico_128_128.png',
    // '../static/ico/compressed/ico_144_144.png',
    // '../static/ico/compressed/ico_150_150.png',
    // '../static/ico/compressed/ico_152_152.png',
    // '../static/ico/compressed/ico_167_167.png',
    // '../static/ico/compressed/ico_180_180.png',
    '../static/ico/compressed/ico_192_192.png',
    // '../static/ico/compressed/ico_384_384.png',
    '../static/ico/compressed/ico_512_512.png',
    '../others/ProjectAssets.json',
    '../pages/HelloWorld.html',
    '../pages/XMQAQ.html',
];

module.exports = {
    cacheResources,
};
