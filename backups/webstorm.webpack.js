/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

// 该文件是用来让“WebStorm”编译器识别“Webpack”配置中的“resolve”这个字段里头的各个别名变量

'use strict';

let fs = require( 'fs' ),
    path = require( 'path' ),
    webpack = require( 'webpack' );

module.exports = {
    resolve: {
        alias: {
            echartsESM: 'echarts/dist/echarts.js',
            elementUIESMCSS: 'element-ui/lib/theme-chalk/index.css',
            elementUIESM: 'element-ui/lib/index.js',
            jQueryESM: 'jquery/dist/jquery.js',
            swiperESMCSS: 'swiper/swiper-bundle.css',
            swiperESM: 'swiper/swiper-bundle.js',
            vueESM: 'vue/dist/vue.js',
            vueRouterESM: 'vue-router/dist/vue-router.js',
            vuexESM: 'vuex/dist/vuex.js',

            CompESM: path.resolve( __dirname, './src/components/Components.esm.js' ),

            CTESM: path.resolve( __dirname, './src/js/tools/CurrencyTools.esm.js' ),
            DecESM: path.resolve( __dirname, './src/js/tools/Decorator4ES6.esm.js' ),
            HTML2C4ESM: path.resolve( __dirname, './src/js/tools/HTML2Canvas.esm.js' ),
            WebCESM: path.resolve( __dirname, './src/js/tools/WebComponents.esm.js' ),
            WorkersESM: path.resolve( __dirname, './src/js/tools/Workers4MT.esm.js' ),

            configDir: path.resolve( __dirname, './configures/' ),

            jsonDir: path.resolve( __dirname, './src/assets/doc/json/' ),
            json5Dir: path.resolve( __dirname, './src/assets/doc/json5/' ),
            txtDir: path.resolve( __dirname, './src/assets/doc/txt/' ),
            xmlDir: path.resolve( __dirname, './src/assets/doc/xml/' ),
            fontsDir: path.resolve( __dirname, './src/assets/fonts/' ),
            imgDir: path.resolve( __dirname, './src/assets/img/' ),
            musicDir: path.resolve( __dirname, './src/assets/music/' ),
            videosDir: path.resolve( __dirname, './src/assets/videos/' ),

            compDir: path.resolve( __dirname, './src/components/' ),

            // 注意事项去看：notes/关于在JS和TS文件中导入和使用graphql文件时出现的BUG以及注意事项说明.txt
            gQLAPIDir: path.resolve( __dirname, './src/graphQL/api/' ),

            jsDir: path.resolve( __dirname, './src/js/' ),
            jsMDir: path.resolve( __dirname, './src/js/modules/' ),
            jsPDir: path.resolve( __dirname, './src/js/pages/' ),
            jsPubDir: path.resolve( __dirname, './src/js/public/' ),
            jsTDir: path.resolve( __dirname, './src/js/tools/' ),

            manifestDir: path.resolve( __dirname, './src/pwa4Manifest/' ),

            cssDir: path.resolve( __dirname, './src/styles/css/' ),
            cssBDir: path.resolve( __dirname, './src/styles/css/basic/' ),
            cssMDir: path.resolve( __dirname, './src/styles/css/modules/' ),
            cssPDir: path.resolve( __dirname, './src/styles/css/pages/' ),
            cssPubDir: path.resolve( __dirname, './src/styles/css/public/' ),

            lessDir: path.resolve( __dirname, './src/styles/less/' ),
            lessBDir: path.resolve( __dirname, './src/styles/less/basic/' ),
            lessMDir: path.resolve( __dirname, './src/styles/less/modules/' ),
            lessPDir: path.resolve( __dirname, './src/styles/less/pages/' ),
            lessPubDir: path.resolve( __dirname, './src/styles/less/public/' ),

            sassDir: path.resolve( __dirname, './src/styles/sass/' ),
            sassBDir: path.resolve( __dirname, './src/styles/sass/basic/' ),
            sassMDir: path.resolve( __dirname, './src/styles/sass/modules/' ),
            sassPDir: path.resolve( __dirname, './src/styles/sass/pages/' ),
            sassPubDir: path.resolve( __dirname, './src/styles/sass/public/' ),

            scssDir: path.resolve( __dirname, './src/styles/scss/' ),
            scssBDir: path.resolve( __dirname, './src/styles/scss/basic/' ),
            scssMDir: path.resolve( __dirname, './src/styles/scss/modules/' ),
            scssPDir: path.resolve( __dirname, './src/styles/scss/pages/' ),
            scssPubDir: path.resolve( __dirname, './src/styles/scss/public/' ),

            pcssDir: path.resolve( __dirname, './src/styles/postcss/' ),
            pcssBDir: path.resolve( __dirname, './src/styles/postcss/basic/' ),
            pcssMDir: path.resolve( __dirname, './src/styles/postcss/modules/' ),
            pcssPDir: path.resolve( __dirname, './src/styles/postcss/pages/' ),
            pcssPubDir: path.resolve( __dirname, './src/styles/postcss/public/' ),

            stylDir: path.resolve( __dirname, './src/styles/stylus/' ),
            stylBDir: path.resolve( __dirname, './src/styles/stylus/basic/' ),
            stylMDir: path.resolve( __dirname, './src/styles/stylus/modules/' ),
            stylPDir: path.resolve( __dirname, './src/styles/stylus/pages/' ),
            stylPubDir: path.resolve( __dirname, './src/styles/stylus/public/' ),

            tplEJSDir: path.resolve( __dirname, './src/tplEJS/' ),
            tplEJSBDir: path.resolve( __dirname, './src/tplEJS/basic/' ),
            tplEJSMLDir: path.resolve( __dirname, './src/tplEJS/basic/metaLink/' ),
            tplEJSMDir: path.resolve( __dirname, './src/tplEJS/modules/' ),
            tplEJSPDir: path.resolve( __dirname, './src/tplEJS/pages/' ),
            tplEJSPubDir: path.resolve( __dirname, './src/tplEJS/public/' ),

            tplHTMLDir: path.resolve( __dirname, './src/tplHTML/' ),
            tplHTMLBDir: path.resolve( __dirname, './src/tplHTML/basic/' ),
            tplHTMLMDir: path.resolve( __dirname, './src/tplHTML/modules/' ),
            tplHTMLPDir: path.resolve( __dirname, './src/tplHTML/pages/' ),
            tplHTMLPubDir: path.resolve( __dirname, './src/tplHTML/public/' ),

            vueDir: path.resolve( __dirname, './src/vue/' ),
            vueCompDir: path.resolve( __dirname, './src/vue/components/' ),
            vueMDir: path.resolve( __dirname, './src/vue/models/' ),
            vueRDir: path.resolve( __dirname, './src/vue/routers/' ),
            vueSDir: path.resolve( __dirname, './src/vue/stores/' ),
            vueStyDir: path.resolve( __dirname, './src/vue/styles/' ),
            vueVDir: path.resolve( __dirname, './src/vue/views/' ),

            wasmDir: path.resolve( __dirname, './src/wasm/' ),
            wasmBDir: path.resolve( __dirname, './src/wasm/basic/' ),
            wasmMDir: path.resolve( __dirname, './src/wasm/modules/' ),
            wasmPDir: path.resolve( __dirname, './src/wasm/pages/' ),
            wasmPubDir: path.resolve( __dirname, './src/wasm/public/' ),

            webCDir: path.resolve( __dirname, './src/webComponents/' ),

            serviceWorkersDir: path.resolve( __dirname, './src/workers/serviceWorkers/' ),
            sWorkersDir: path.resolve( __dirname, './src/workers/sharedWorkers/' ),
            tWorkersDir: path.resolve( __dirname, './src/workers/tools/' ),
            wWorkersDir: path.resolve( __dirname, './src/workers/webWorkers/' ),
        },
        modules: [
            'node_modules',
        ],
        symlinks: false,
    },
    plugins: [
        new webpack.DefinePlugin( {
            devURL: '"/devURL/"',
            localURL: '"/localURL/"',
            testURL: '"/"',
            proURL: '"/"',
        } ),
        new webpack.ProvidePlugin( {
            echarts: 'echartsESM',

            ELEMENTCSS: 'elementUIESMCSS',
            ELEMENT: 'elementUIESM',

            $: 'jQueryESM',
            jQuery: 'jQueryESM',
            'window.$': 'jQueryESM',
            'window.jQuery': 'jQueryESM',

            SwiperCSS: 'swiperESMCSS',
            Swiper: 'swiperESM',

            Vue: 'vueESM',
            VueRouter: 'vueRouterESM',
            Vuex: 'vuexESM',

            CompESM: 'CompESM',

            CTESM: 'CTESM',
            DecESM: 'DecESM',
            HTML2C4ESM: 'HTML2C4ESM',
            WebCESM: 'WebCESM',
            WorkersESM: 'WorkersESM',
        } ),
    ],
};
