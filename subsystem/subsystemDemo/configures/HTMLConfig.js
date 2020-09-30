/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * htmlWebpackPlugin配置
 *
 * 这个.js基本只要配置new htmlWebpackPlugin({})的参数选项，复制模板后，修改各个选项就行！
 */

let SubresourceIntegrityPlugin = require( 'webpack-subresource-integrity' ),
    htmlWebpackPlugin = require( 'html-webpack-plugin' ),
    htmlConfig_obj = require( './GlobalProp.js' ).htmlConfig_objC,
    app = require( '../src/js/App.js' ),
    pageRoutingManagement_obj = app.pageRoutingManagement_obj,
    isSPA_booC = app.isSPA_booC,
    /**
     * process.argv[ 3 ]--->production
     * 如：package.json中scripts字段里production字段的"webpack --mode production --config webpack.Production.js"
     *
     * @type {boolean} boolean
     */
    isPro_boo = process.argv[ 3 ] === 'production',
    /**
     * proN_str--->Production
     * 如：package.json中scripts字段里production字段的"webpack --mode production --config webpack.Production.js"
     *
     * @type {string} string
     */
    proN_str = process.argv[ 5 ].split( '.' )[ 1 ],
    minify_obj = {
        collapseBooleanAttributes: false,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        html5: true,
        // 在单例元素上保留斜线
        keepClosingSlash: true,
        minifyCSS: isPro_boo,
        minifyJS: isPro_boo,
        removeAttributeQuotes: false,
        removeComments: true,
        removeEmptyAttributes: false,
        removeEmptyElements: false,
        removeOptionalTags: false,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: false,
    },
    weinreDevTool_str = isPro_boo
                        ? ''
                        : htmlConfig_obj.weinreDevTool_str,
    dynamicREM_str = htmlConfig_obj.dynamicREM_str,
    /**
     * 多页面应用时，用于该页面对应的.js文件的路由处理，表示这个页面只导入"src/js/App.js"中所配置的这个页面对应的.js
     *
     * @param fileName_str 字符串，编译完成后，这个页面的文件名，不加后缀名，必须
     * 如：'HelloWorld'
     *
     * @returns {Array} Array，数组里面就是不需要加入该页面的“js块名”
     */
    excludeChunks_fun = fileName_str => {
        let arr = [];
        Object.keys( pageRoutingManagement_obj )
              .forEach( c => {
                  if( c.trim() !== fileName_str.trim() ){
                      arr.push( c );
                  }
              } );
        return arr;
    };

const str1 = proN_str.slice( 0, 1 )
                     .toLocaleLowerCase(),
    str2 = proN_str.slice( 1 );
// 如：proN_str--->production，对应dist文件夹下的production文件夹
proN_str = str1 + str2;

/**
 * 路径都是编译完后输出到输出目录中，相对于“pages”文件夹(如：dist/test/pages)的相对路径
 * 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
 *
 * @type {string[]} 字符串数组
 */
let cacheResources_arr = require( './CacheResources.js' ).cacheResources,
    /**
     * 预加载的苹果启动图片的资源数组，成员是一个个JSON对象，必须
     * 成员JSON对象的格式是
     * {
     *   href: 资源的url 字符串，必须
     *   as： 'font' 字符串，可选
     *   type: 'font/ttf' 字符串，可选
     *   crossorigin: 'anonymous' 字符串，可选
     *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
     *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
     * }
     *
     * as的值:
     * 支持不填写“as”属性，那么链接地址就是资源任何地址
     * audio(音频文件)、
     * document(用于嵌入<frame>或中的HTML文档<iframe>)、
     * embed(要嵌入<embed>元素内的资源)、
     * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
     * font(字体文件)、
     * image(图像文件、SVG)、
     * object(要嵌入<embed>元素内的资源)、
     * script(JavaScript文件)、
     * style(样式表)、
     * track(WebVTT文件)、
     * worker(Web Worker或Shared Worker)、
     * video(视频文件)、
     * report(不需要链接地址)、
     * audioworklet、
     * paintworklet、
     * serviceworker、
     * manifest、
     * xslt、
     *
     * type值:(链接查找)
     * http://www.w3school.com.cn/media/media_mimeref.asp
     */
    preload_StartAppleTSI_arr = ( () => {
        let arr1 = [];
        for( let item of
            require( './StartAppleTSI_Arr.js' ).startAppleTSI_arr ){
            arr1.push( {
                href: item.href,
                type: item.type,
                as: item.as,
                crossorigin: item.crossorigin,
                attrs: {
                    sizes: item.attrs.sizes,
                    media: item.attrs.media,
                },
            } );
        }
        return arr1;
    } )();

// htmlWebpackPlugin配置写在这个数组里头就行！
let htmlWebpackPluginA_arr = [
    // 每个htmlWebpackPlugin配置都要参照这个来写！
    new htmlWebpackPlugin( {
        // [sha512:contenthash:hex:8]
        filename: 'pages/HelloWorld.html',
        template: './src/tplEJS/pages/HelloWorld.ejs',
        title: 'HelloWorld',
        /**
         * 多页面应用时，用于该页面对应的.js文件的路由处理，表示这个页面只导入"src/js/App.js"中所配置的这个页面对应的.js
         */
        excludeChunks: isSPA_booC
                       ? []
                       : excludeChunks_fun( 'HelloWorld' ),
        inject: 'body',
        scriptLoading: 'defer',
        cache: false,
        minify: minify_obj,
        chunksSortMode: 'auto',
        // chunks没值，就不要写这个属性，写[]空数组，会导致任何.js都不添加到页面
        // chunks: [],
        // 以下data的属性尽量都要有，自定义功能
        data: {
            /*
             必须，字符串，默认“HelloWorld”，每个模板允许有自己配置的如“HelloWorld.ejs”一类的文件，也可以是同一个文件(HelloWorld)
             都在src/tplEJS/basic/metaLink下
             */
            metaLinkName_str: 'HelloWorld',
            // 配置meta、link的信息
            metaLinkData: {
                keywords: 'HTML, CSS, JavaScript, WebAssembly, ECMAScript6, TypeScript, ESM, 函数式编程, Web Components, Webpack4, VueJS, NodeJS, Deno, EJS, SSE, Web Socket, FlexLayout, GridLayout, PWA, Web Worker, Shared Worker, Service Worker, IndexedDB, GraphQL, RESTful API, 微前端',
                description: 'This is a WEB project template(2020).',
                subject: 'This is a WEB project template(2020).',
                appTitle: 'HelloWorld',
                appName: 'HelloWorld',
                color: '#f3a1a2',
                // 预解析DNS，提高访问速度
                dnsPrefetch: [
                    '/',
                ],
                icons: [
                    /*
                     {
                     type: 'image/png',
                     sizes: '48x48',
                     href: '../static/ico/compressed/ico_48_48.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '72x72',
                     href: '../static/ico/compressed/ico_72_72.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '96x96',
                     href: '../static/ico/compressed/ico_96_96.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '120x120',
                     href: '../static/ico/compressed/ico_120_120.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '128x128',
                     href: '../static/ico/compressed/ico_128_128.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '144x144',
                     href: '../static/ico/compressed/ico_144_144.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '150x150',
                     href: '../static/ico/compressed/ico_150_150.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '152x152',
                     href: '../static/ico/compressed/ico_152_152.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '167x167',
                     href: '../static/ico/compressed/ico_167_167.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '180x180',
                     href: '../static/ico/compressed/ico_180_180.png',
                     },
                     */
                    {
                        type: 'image/png',
                        sizes: '192x192',
                        href: '../static/ico/compressed/ico_192_192.png',
                    },
                    /*
                     {
                     type: 'image/png',
                     sizes: '384x384',
                     href: '../static/ico/compressed/ico_384_384.png',
                     },
                     */
                    {
                        type: 'image/png',
                        sizes: '512x512',
                        href: '../static/ico/compressed/ico_512_512.png',
                    },
                ],
                url: '/',
                homeUrl: '/',
                searchUrl: '/',
                // 预连接
                preConnect: [
                    {
                        href: '/',
                        pr: '0.75',
                    },
                ],
                // 规范的
                canonical: '/',
                // 候补
                alternate: {
                    hreflang: 'zh-CN',
                    href: '/',
                    title: 'HelloWorld',
                },
                // 这个值目前用的是FaceBook上“YouTube Music”的，以后换成具体项目的应用id就行
                fbAppId: '87741124305',
                // 这个值目前用的是App Store上“YouTube Music”的，以后换成具体项目的应用id就行
                appStoreId: '1017492454',
                // 这个值目前用的是“YouTube Music”切换到ios原生应用的url，以后换成具体项目的应用url就行
                alIosUrl: 'vnd.youtube:/?feature=applinks',
                // 对应的安卓原生应用的包名
                alAndroidPackageName: 'com.google.android.apps.youtube.music',
                // 这个值目前用的是“YouTube Music”切换到Android原生应用的url，以后换成具体项目的应用url就行
                alAndroidUrl: 'vnd.youtube:/?feature=applinks',
                // 关于twitter的配置信息
                twitter: {
                    creator: '2726893248@qq.com',
                    site: '/',
                    url: '/',
                    // 值还可以是如：player一类的，表示这是个什么样类型的应用，比如：player表示播放器应用
                    card: 'summary',
                },
            },
            /*
             必须，字符串，默认“HelloWorld”，manifest文件名，每个模板允许有自己配置的manifest文件，也可以是同一个文件(如：HelloWorld)
             都在pwa4Manifest文件夹下
             */
            manifestName_str: 'HelloWorld',
            // 必须，保持这个就行
            proN_str,
            // 必须，保持这个就行
            dynamicREM_str,
            // 可选，保持这个就行
            weinreDevTool_str,
            // 可选，是否添加"apple-touch-startup-image"，布尔值，默认true(添加)，false不添加
            startAppleTSI_boo: true,
            /*
             可选，JSON对象
             ApplicationCache过时了，建议不要用了，建议用Service Worker
             在“configures/AppCacheTool.js”、“src/tplEJS/pages/HelloWorld.ejs”中使用
             */
            appCache_obj: {
                // 必须，布尔值，是否要启用“AppCache(.appcache)”，true启用，false不启用
                open_boo: false,
                // 字符串，缓存配置文件名 + 文件后缀名，如：“HelloWorld.appcache”，open_boo的值为false时，可以不用有这个属性
                name_str: 'HelloWorld.appcache',
                // open_boo的值为false时，可以不用有这个属性，需要缓存的资源URL，这个选项是用于补充因为手动导入的静态资源的URL，支持外部网络的URL
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                cache_arr: cacheResources_arr,
                // open_boo的值为false时，可以不用有这个属性，不需要缓存的资源，必须请求网络，支持外部网络的URL
                network_arr: [],
                /*
                 open_boo的值为false时，可以不用有这个属性，出错后代替的资源，键名是原资源URL，键值是替补资源URL，支持外部网络的URL
                 如：'../static/ico/compressed/ico_192_192.png': '../static/ico/compressed/ico_200_200.png'
                 */
                fallback_obj: {}
            },
            /*
             可选，JSON配置对象，将webpack打包输出的所有类型的资源文件的路径和自己添加的资源路径一起输出到页面中的一个<script>标签里，
             该标签里有一个名为“CTAllAssets”的全局常量数组
             */
            outAssets_obj: {
                // 布尔值，必须，true开启该功能，false关闭
                open_boo: false,
                // 其他资源路径，支持外部URL，没有资源路径，就写空数组
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                other_arr: cacheResources_arr,
            },
            // 可选，资源预加载工具，true开启该功能，false关闭
            preloadTool_obj: {
                open_boo: false,
                /**
                 * 数组，成员是一个个JSON对象，必须
                 * 成员JSON对象的格式是
                 * {
                 *   href: 资源的url 字符串，必须
                 *   as： 'font' 字符串，可选
                 *   type: 'font/ttf' 字符串，可选
                 *   crossorigin: 'anonymous' 字符串，可选
                 *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
                 *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
                 * }
                 *
                 * as的值:
                 * 支持不填写“as”属性，那么链接地址就是资源任何地址
                 * audio(音频文件)、
                 * document(用于嵌入<frame>或中的HTML文档<iframe>)、
                 * embed(要嵌入<embed>元素内的资源)、
                 * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
                 * font(字体文件)、
                 * image(图像文件、SVG)、
                 * object(要嵌入<embed>元素内的资源)、
                 * script(JavaScript文件)、
                 * style(样式表)、
                 * track(WebVTT文件)、
                 * worker(Web Worker或Shared Worker)、
                 * video(视频文件)、
                 * report(不需要链接地址)、
                 * audioworklet、
                 * paintworklet、
                 * serviceworker、
                 * manifest、
                 * xslt、
                 *
                 * type值:(链接查找)
                 * http://www.w3school.com.cn/media/media_mimeref.asp
                 */
                preload_arr: preload_StartAppleTSI_arr,
            }
        }
    } ),
    // XMQAQ
    new htmlWebpackPlugin( {
        // [sha512:contenthash:hex:8]
        filename: 'pages/XMQAQ.html',
        template: './src/tplEJS/pages/XMQAQ.ejs',
        title: '轩墨宝宝QAQ',
        /**
         * 多页面应用时，用于该页面对应的.js文件的路由处理，表示这个页面只导入"src/js/App.js"中所配置的这个页面对应的.js
         */
        excludeChunks: isSPA_booC
                       ? []
                       : excludeChunks_fun( 'XMQAQ' ),
        inject: 'body',
        scriptLoading: 'defer',
        cache: false,
        minify: minify_obj,
        chunksSortMode: 'auto',
        // chunks没值，就不要写这个属性，写[]空数组，会导致任何.js都不添加到页面
        // chunks: [],
        // 以下data的属性尽量都要有，自定义功能
        data: {
            /*
             必须，字符串，默认“HelloWorld”，每个模板允许有自己配置的如“HelloWorld.ejs”一类的文件，也可以是同一个文件(HelloWorld)
             都在src/tplEJS/basic/metaLink下
             */
            metaLinkName_str: 'XMQAQ',
            // 配置meta、link的信息
            metaLinkData: {
                keywords: '可爱的男孩子,轩墨宝宝,国服第一扳手,虎牙,二次元,男主播',
                description: '可爱的男孩子，轩墨宝宝！！！',
                subject: '可爱的男孩子，轩墨宝宝！！！',
                appTitle: '轩墨宝宝QAQ',
                appName: '轩墨宝宝QAQ',
                color: '#f3a1a2',
                // 预解析DNS，提高访问速度
                dnsPrefetch: [
                    '/',
                ],
                icons: [
                    /*
                     {
                     type: 'image/png',
                     sizes: '48x48',
                     href: '../static/ico/compressed/ico_48_48.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '72x72',
                     href: '../static/ico/compressed/ico_72_72.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '96x96',
                     href: '../static/ico/compressed/ico_96_96.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '120x120',
                     href: '../static/ico/compressed/ico_120_120.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '128x128',
                     href: '../static/ico/compressed/ico_128_128.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '144x144',
                     href: '../static/ico/compressed/ico_144_144.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '150x150',
                     href: '../static/ico/compressed/ico_150_150.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '152x152',
                     href: '../static/ico/compressed/ico_152_152.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '167x167',
                     href: '../static/ico/compressed/ico_167_167.png',
                     },
                     {
                     type: 'image/png',
                     sizes: '180x180',
                     href: '../static/ico/compressed/ico_180_180.png',
                     },
                     */
                    {
                        type: 'image/png',
                        sizes: '192x192',
                        href: '../static/ico/compressed/ico_192_192.png',
                    },
                    /*
                     {
                     type: 'image/png',
                     sizes: '384x384',
                     href: '../static/ico/compressed/ico_384_384.png',
                     },
                     */
                    {
                        type: 'image/png',
                        sizes: '512x512',
                        href: '../static/ico/compressed/ico_512_512.png',
                    },
                ],
                url: '/',
                homeUrl: '/',
                searchUrl: '/',
                // 预连接
                preConnect: [
                    {
                        href: '/',
                        pr: '0.75',
                    },
                ],
                // 规范的
                canonical: '/',
                // 候补
                alternate: {
                    hreflang: 'zh-CN',
                    href: '/',
                    title: 'HelloWorld',
                },
                // 这个值目前用的是FaceBook上“YouTube Music”的，以后换成具体项目的应用id就行
                fbAppId: '87741124305',
                // 这个值目前用的是App Store上“YouTube Music”的，以后换成具体项目的应用id就行
                appStoreId: '1017492454',
                // 这个值目前用的是“YouTube Music”切换到ios原生应用的url，以后换成具体项目的应用url就行
                alIosUrl: 'vnd.youtube:/?feature=applinks',
                // 对应的安卓原生应用的包名
                alAndroidPackageName: 'com.google.android.apps.youtube.music',
                // 这个值目前用的是“YouTube Music”切换到Android原生应用的url，以后换成具体项目的应用url就行
                alAndroidUrl: 'vnd.youtube:/?feature=applinks',
                // 关于twitter的配置信息
                twitter: {
                    creator: '2726893248@qq.com',
                    site: '/',
                    url: '/',
                    // 值还可以是如：player一类的，表示这是个什么样类型的应用，比如：player表示播放器应用
                    card: 'summary',
                },
            },
            /*
             必须，字符串，默认“HelloWorld”，manifest文件名，每个模板允许有自己配置的manifest文件，也可以是同一个文件(如：HelloWorld)
             都在pwa4Manifest文件夹下
             */
            manifestName_str: 'XMQAQ',
            // 必须，保持这个就行
            proN_str,
            // 必须，保持这个就行
            dynamicREM_str,
            // 可选，保持这个就行
            weinreDevTool_str,
            // 可选，是否添加"apple-touch-startup-image"，布尔值，默认true(添加)，false不添加
            startAppleTSI_boo: true,
            /*
             可选，JSON对象
             ApplicationCache过时了，建议不要用了，建议用Service Worker
             在“configures/AppCacheTool.js”、“src/tplEJS/pages/HelloWorld.ejs”中使用
             */
            appCache_obj: {
                // 必须，布尔值，是否要启用“AppCache(.appcache)”，true启用，false不启用
                open_boo: false,
                // 字符串，缓存配置文件名 + 文件后缀名，如：“HelloWorld.appcache”，open_boo的值为false时，可以不用有这个属性
                name_str: 'XMQAQ.appcache',
                // open_boo的值为false时，可以不用有这个属性，需要缓存的资源URL，这个选项是用于补充因为手动导入的静态资源的URL，支持外部网络的URL
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                cache_arr: cacheResources_arr,
                // open_boo的值为false时，可以不用有这个属性，不需要缓存的资源，必须请求网络，支持外部网络的URL
                network_arr: [],
                /*
                 open_boo的值为false时，可以不用有这个属性，出错后代替的资源，键名是原资源URL，键值是替补资源URL，支持外部网络的URL
                 如：'../static/ico/compressed/ico_192_192.png': '../static/ico/compressed/ico_200_200.png'
                 */
                fallback_obj: {}
            },
            /*
             可选，JSON配置对象，将webpack打包输出的所有类型的资源文件的路径和自己添加的资源路径一起输出到页面中的一个<script>标签里，
             该标签里有一个名为“CTAllAssets”的全局常量数组
             */
            outAssets_obj: {
                // 布尔值，必须，true开启该功能，false关闭
                open_boo: false,
                // 其他资源路径，支持外部URL，没有资源路径，就写空数组
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                other_arr: cacheResources_arr,
            },
            // 可选，资源预加载工具，true开启该功能，false关闭
            preloadTool_obj: {
                open_boo: false,
                /**
                 * 数组，成员是一个个JSON对象，必须
                 * 成员JSON对象的格式是
                 * {
                 *   href: 资源的url 字符串，必须
                 *   as： 'font' 字符串，可选
                 *   type: 'font/ttf' 字符串，可选
                 *   crossorigin: 'anonymous' 字符串，可选
                 *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
                 *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
                 * }
                 *
                 * as的值:
                 * 支持不填写“as”属性，那么链接地址就是资源任何地址
                 * audio(音频文件)、
                 * document(用于嵌入<frame>或中的HTML文档<iframe>)、
                 * embed(要嵌入<embed>元素内的资源)、
                 * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
                 * font(字体文件)、
                 * image(图像文件、SVG)、
                 * object(要嵌入<embed>元素内的资源)、
                 * script(JavaScript文件)、
                 * style(样式表)、
                 * track(WebVTT文件)、
                 * worker(Web Worker或Shared Worker)、
                 * video(视频文件)、
                 * report(不需要链接地址)、
                 * audioworklet、
                 * paintworklet、
                 * serviceworker、
                 * manifest、
                 * xslt、
                 *
                 * type值:(链接查找)
                 * http://www.w3school.com.cn/media/media_mimeref.asp
                 */
                preload_arr: preload_StartAppleTSI_arr,
            }
        }
    } ),
];

module.exports = [
    new SubresourceIntegrityPlugin( {
        hashFuncNames: [
            // 'sha256',
            // 'sha384',
            'sha512',
        ],
        enabled: isPro_boo,
    } ),
    ...( isSPA_booC
         ? [ htmlWebpackPluginA_arr[ 0 ], ]
         : htmlWebpackPluginA_arr )
];
