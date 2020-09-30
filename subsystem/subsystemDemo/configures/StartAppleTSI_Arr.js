/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/*
 orientation	视口的方向
 PS：
 注意：
 此功能与设备方向不对应。在许多设备上以纵向打开软键盘将导致视区变得比高度更宽，从而导致浏览器使用横向样式而不是纵向样式。
 portrait
 视口为纵向方向，即高度大于或等于宽度。
 landscape
 视口处于横向方向，即宽度大于高度。
 笔记本电脑上的谷歌浏览器的模拟器由于设备没有方向传感器！！！
 “orientation”这个属性，更多的是通过宽高比来模拟所谓的方向！！！
 然而，真机有方向传感器！！！以下写法在真机上能保证竖屏和横屏的输出样式！！！
 // iPhone X、iPhone XS、iPhone 11 Pro(5.8英寸 2436x1125 458ppi)宽高 Start
 @media only screen and (device-width: 375px) and (device-height: 812px) and (orientation: portrait) and (-moz-device-pixel-ratio: 3),
 only screen and (device-width: 375px) and (device-height: 812px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3),
 only screen and (device-width: 375px) and (device-height: 812px) and (orientation: portrait) and (device-pixel-ratio: 3) {
 #HelloWorld {
 background-color: #ff23b0;
 }
 }
 @media only screen and (device-width: 375px) and (device-height: 812px) and (orientation: landscape) and (-moz-device-pixel-ratio: 3),
 only screen and (device-width: 375px) and (device-height: 812px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3),
 only screen and (device-width: 375px) and (device-height: 812px) and (orientation: landscape) and (device-pixel-ratio: 3) {
 #HelloWorld {
 background-color: #ff2d16;
 }
 }
 // iPhone X、iPhone XS、iPhone 11 Pro(5.8英寸 2436x1125 458ppi)宽高 End
 */

// 这次更新的写法，会奇怪的导致横竖屏的图片都被下载！！！但是不影响PWA的启动画面展示，竖屏时自动展示竖屏的图片，横屏时自动展示横屏的图片。

/*
 苹果启动图片的资源数组，成员是一个个JSON对象，必须
 成员JSON对象的格式是
 {
 href: 资源的url字符串，路径都是编译完后输出到输出目录中，相对于“pages”文件夹(如：dist/test/pages)的相对路径，必须
 as： 'font' 字符串，可选
 type: 'font/ttf' 字符串，可选
 crossorigin: 'anonymous' 字符串，可选
 isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
 attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
 }

 as的值:
 支持不填写“as”属性，那么链接地址就是资源任何地址
 audio(音频文件)、
 document(用于嵌入<frame>或中的HTML文档<iframe>)、
 embed(要嵌入<embed>元素内的资源)、
 fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
 font(字体文件)、
 image(图像文件、SVG)、
 object(要嵌入<embed>元素内的资源)、
 script(JavaScript文件)、
 style(样式表)、
 track(WebVTT文件)、
 worker(Web Worker或Shared Worker)、
 video(视频文件)、
 report(不需要链接地址)、
 audioworklet、
 paintworklet、
 serviceworker、
 manifest、
 xslt、

 type值:(链接查找)
 http://www.w3school.com.cn/media/media_mimeref.asp
 */
let startAppleTSI_arr = [
    // 640 x 1136: iPhone 5S、iPhone SE(第一代)
    {
        href: '../static/ico/startup/iPhone_640_1136.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '640x1136',
            media: 'only screen and (device-width: 320px) and (device-height: 568px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 320px) and (device-height: 568px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 320px) and (device-height: 568px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 1136 x 640: iPhone 5S、iPhone SE(第一代)
    {
        href: '../static/ico/startup/iPhone_1136_640.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1136x640',
            media: 'only screen and (device-width: 320px) and (device-height: 568px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 320px) and (device-height: 568px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 320px) and (device-height: 568px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },

    // 750 x 1334: iPhone 6、iPhone 6S、iPhone 7、iPhone 8、iPhone SE(第二代)
    {
        href: '../static/ico/startup/iPhone_750_1334.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '750x1334',
            media: 'only screen and (device-width: 375px) and (device-height: 667px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 375px) and (device-height: 667px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 375px) and (device-height: 667px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 1334 x 750: iPhone 6、iPhone 6S、iPhone 7、iPhone 8、iPhone SE(第二代)
    {
        href: '../static/ico/startup/iPhone_1334_750.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1334x750',
            media: 'only screen and (device-width: 375px) and (device-height: 667px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 375px) and (device-height: 667px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 375px) and (device-height: 667px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },

    // 1242 x 2208(1080 x 1920): iPhone 6 Plus、iPhone 6S Plus、iPhone 7 Plus、iPhone 8 Plus
    // PS：特别说明一下，以上设备的实际物理分辨率是(1080 x 1920)，它们的实际dpr是2.608695652173913。
    // 但是，渲染、计算却是按分辨率(1242 x 2208)、dpr是3。所以，APP的启动图片也是按这些个来的(1242 x 2208、dpr是3)。
    {
        href: '../static/ico/startup/iPhone_1242_2208.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1242x2208',
            media: 'only screen and (device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-moz-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (device-pixel-ratio: 3)'
        }
    },
    // 2208 x 1242(1920 x 1080): iPhone 6 Plus、iPhone 6S Plus、iPhone 7 Plus、iPhone 8 Plus
    // PS：特别说明一下，以上设备的实际物理分辨率是(1080 x 1920)，它们的实际dpr是2.608695652173913。
    // 但是，渲染、计算却是按分辨率(1242 x 2208)、dpr是3。所以，APP的启动图片也是按这些个来的(1242 x 2208、dpr是3)。
    {
        href: '../static/ico/startup/iPhone_2208_1242.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2208x1242',
            media: 'only screen and (device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-moz-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (device-pixel-ratio: 3)'
        }
    },

    // 828 x 1792: iPhone XR、iPhone 11
    {
        href: '../static/ico/startup/iPhone_828_1792.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '828x1792',
            media: 'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 1792 x 828: iPhone XR、iPhone 11
    {
        href: '../static/ico/startup/iPhone_1792_828.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1792x828',
            media: 'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },

    // 1125 x 2436: iPhone X、iPhone XS、iPhone 11 Pro
    {
        href: '../static/ico/startup/iPhone_1125_2436.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1125x2436',
            media: 'only screen and (device-width: 375px) and (device-height: 812px) and (orientation: portrait) and (-moz-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 375px) and (device-height: 812px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 375px) and (device-height: 812px) and (orientation: portrait) and (device-pixel-ratio: 3)'
        }
    },
    // 2436 x 1125: iPhone X、iPhone XS、iPhone 11 Pro
    {
        href: '../static/ico/startup/iPhone_2436_1125.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2436x1125',
            media: 'only screen and (device-width: 375px) and (device-height: 812px) and (orientation: landscape) and (-moz-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 375px) and (device-height: 812px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 375px) and (device-height: 812px) and (orientation: landscape) and (device-pixel-ratio: 3)'
        }
    },

    // 1242 x 2688: iPhone XS Max、iPhone 11 Pro Max
    {
        href: '../static/ico/startup/iPhone_1242_2688.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1242x2688',
            media: 'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: portrait) and (-moz-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: portrait) and (device-pixel-ratio: 3)'
        }
    },
    // 2688 x 1242: iPhone XS Max、iPhone 11 Pro Max
    {
        href: '../static/ico/startup/iPhone_2688_1242.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2688x1242',
            media: 'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: landscape) and (-moz-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3), ' +
                'only screen and (device-width: 414px) and (device-height: 896px) and (orientation: landscape) and (device-pixel-ratio: 3)'
        }
    },

    // 1536 x 2048: iPad mini 2、iPad mini 3、iPad mini 4、iPad(第五代)、iPad(第六代)、iPad Air(第一代)、iPad Air 2、9.7英寸iPad Pro、iPad mini(第五代)
    {
        href: '../static/ico/startup/iPad_1536_2048.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1536x2048',
            media: 'only screen and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 2048 x 1536: iPad mini 2、iPad mini 3、iPad mini 4、iPad(第五代)、iPad(第六代)、iPad Air(第一代)、iPad Air 2、9.7英寸iPad Pro、iPad mini(第五代)
    {
        href: '../static/ico/startup/iPad_2048_1536.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2048x1536',
            media: 'only screen and (device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },

    // 2048 x 2732: 12.9英寸iPad Pro(第一代)、12.9英寸iPad Pro(第二代)、12.9英寸iPad Pro(第三代)、12.9英寸iPad Pro(第四代)
    {
        href: '../static/ico/startup/iPad_2048_2732.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2048x2732',
            media: 'only screen and (device-width: 1024px) and (device-height: 1366px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 1024px) and (device-height: 1366px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 1024px) and (device-height: 1366px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 2732 x 2048: 12.9英寸iPad Pro(第一代)、12.9英寸iPad Pro(第二代)、12.9英寸iPad Pro(第三代)、12.9英寸iPad Pro(第四代)
    {
        href: '../static/ico/startup/iPad_2732_2048.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2732x2048',
            media: 'only screen and (device-width: 1024px) and (device-height: 1366px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 1024px) and (device-height: 1366px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 1024px) and (device-height: 1366px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },

    // 1620 x 2160: iPad(第七代)
    {
        href: '../static/ico/startup/iPad_1620_2160.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1620x2160',
            media: 'only screen and (device-width: 810px) and (device-height: 1080px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 810px) and (device-height: 1080px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 810px) and (device-height: 1080px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 2160 x 1620: iPad(第七代)
    {
        href: '../static/ico/startup/iPad_2160_1620.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2160x1620',
            media: 'only screen and (device-width: 810px) and (device-height: 1080px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 810px) and (device-height: 1080px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 810px) and (device-height: 1080px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },

    // 1668 x 2224: 10.5英寸iPad Pro、iPad Air(第三代)
    {
        href: '../static/ico/startup/iPad_1668_2224.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1668x2224',
            media: 'only screen and (device-width: 834px) and (device-height: 1112px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1112px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1112px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 2224 x 1668: 10.5英寸iPad Pro、iPad Air(第三代)
    {
        href: '../static/ico/startup/iPad_2224_1668.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2224x1668',
            media: 'only screen and (device-width: 834px) and (device-height: 1112px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1112px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1112px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },

    // 1668 x 2388: 11英寸iPad Pro(第一代)、11英寸iPad Pro(第二代)
    {
        href: '../static/ico/startup/iPad_1668_2388.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '1668x2388',
            media: 'only screen and (device-width: 834px) and (device-height: 1194px) and (orientation: portrait) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1194px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1194px) and (orientation: portrait) and (device-pixel-ratio: 2)'
        }
    },
    // 2388 x 1668: 11英寸iPad Pro(第一代)、11英寸iPad Pro(第二代)
    {
        href: '../static/ico/startup/iPad_2388_1668.png',
        type: 'image/png',
        as: 'image',
        crossorigin: 'anonymous',
        /*isExecute: false,*/
        attrs: {
            sizes: '2388x1668',
            media: 'only screen and (device-width: 834px) and (device-height: 1194px) and (orientation: landscape) and (-moz-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1194px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2), ' +
                'only screen and (device-width: 834px) and (device-height: 1194px) and (orientation: landscape) and (device-pixel-ratio: 2)'
        }
    },
];

module.exports = {
    startAppleTSI_arr,
};
