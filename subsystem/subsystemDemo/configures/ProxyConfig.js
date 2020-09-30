/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * devServer启动时的代理配置
 * 哪里使用：
 * webpack.DevServer.js、webpack.LocalServer.js
 */

// 使用例子：
/*
 JS代码中请求的写法，如：
 目标请求：
 http://sjjx.qqplayerjx.com/m3u8/index.php?url=https://cdn.letv-cdn.com/20181010/OKIYLmGF/index.m3u8
 JS运行的域名：
 http://localhost:8082

 CTO.getJSONAjax( '/m3u8/index.php?url=https://cdn.letv-cdn.com/20181010/OKIYLmGF/index.m3u8', {
 success: ( event, xhr, response ) => {
 console.dir( xhr );
 console.dir( response );
 }
 } );

 配置中对应的写法：
 '/m3u8/*': {
 target: 'http://sjjx.qqplayerjx.com',
 changeOrigin: true,
 router: {
 'http://localhost:8082': 'http://sjjx.qqplayerjx.com'
 },
 }
 */

let proxyConfig_obj = require( './GlobalProp.js' ).proxyConfig_obj,

    webStormPort_num = proxyConfig_obj.webStormPort_num,
    devServerPort_num = proxyConfig_obj.devServerPort_num,
    localServerPort_num = proxyConfig_obj.localServerPort_num,

    localHost_str = proxyConfig_obj.localHost_str,
    headers_obj = proxyConfig_obj.crossResHeader_obj,
    changeOrigin = true,

    webStormTarget_str = `http://${ localHost_str }:${ webStormPort_num }`,
    devServerTarget_str = `http://${ localHost_str }:${ devServerPort_num }`,
    localServerTarget_str = `http://${ localHost_str }:${ localServerPort_num }`,
    simServerTarget_str = `http://localhost:9999`,

    simServerRouter_obj = {
        [ webStormTarget_str ]: simServerTarget_str,
        [ devServerTarget_str ]: simServerTarget_str,
        [ localServerTarget_str ]: simServerTarget_str,
    };

module.exports = {
    // 开发服
    '/devURL/*': {
        pathRewrite: {
            // rewrite path
            // '^/old/api': '/new/api',
            '^/devURL/': '/',

            // remove path
            // '^/remove/api': '',

            // add base path
            // '^/': '/basepath/',
        },
        /*
         pathRewrite: ( path, req ) => {
         return path.replace( '/api', '/base/api' );
         },
         */
        /*
         pathRewrite: async ( path, req ) => {
         // const should_add_something = await httpRequestToDecideSomething( path );
         // if( should_add_something ){
         //     path += 'something';
         // }
         // return path;
         },
         */

        target: 'http://127.0.0.1:8080',
        changeOrigin,
        router: {
            [ devServerTarget_str ]: 'http://127.0.0.1:8080',
        },

        onProxyReq: ( proxyReq, req, res ) => {
            console.log( 'Proxy------onProxyReq Start------' );
            console.log( `客户端的请求URL--->${ req.url }` );
            console.log( `客户端的请求方法--->${ req.method }` );
            console.dir( req.headers );
            console.log( 'Proxy------onProxyReq End------' );
        },
        onProxyRes: ( proxyRes, req, res ) => {
            // console.log( 'Proxy------onProxyRes Start------' );
            // console.log( 'Proxy------onProxyRes End------' );
        },
        onError: ( err, req, res ) => {
            // console.error( 'Proxy------onError Start------' );
            // console.error( 'Proxy------onError End------' );
        },
        onProxyReqWs: ( proxyReq, req, socket, options, head ) => {
            // console.log( 'Proxy------onProxyReqWs Start------' );
            // console.log( 'Proxy------onProxyReqWs End------' );
        },
        onOpen: proxySocket => {
            // console.log( 'Proxy------onOpen Start------' );
            // console.log( 'Proxy------onOpen End------' );
        },
        onClose: ( res, socket, head ) => {
            // console.log( 'Proxy------onClose Start------' );
            // console.log( 'Proxy------onClose End------' );
        },
    },
    // 本地开发服
    '/localURL/*': {
        pathRewrite: {
            // rewrite path
            // '^/old/api': '/new/api',
            '^/localURL/': '/',

            // remove path
            // '^/remove/api': '',

            // add base path
            // '^/': '/basepath/',
        },
        /*
         pathRewrite: ( path, req ) => {
         return path.replace( '/api', '/base/api' );
         },
         */
        /*
         pathRewrite: async ( path, req ) => {
         // const should_add_something = await httpRequestToDecideSomething( path );
         // if( should_add_something ){
         //     path += 'something';
         // }
         // return path;
         },
         */

        target: 'http://127.0.0.1:8080',
        changeOrigin,
        router: {
            [ devServerTarget_str ]: 'http://127.0.0.1:8080',
        },

        onProxyReq: ( proxyReq, req, res ) => {
            console.log( 'Proxy------onProxyReq Start------' );
            console.log( `客户端的请求URL--->${ req.url }` );
            console.log( `客户端的请求方法--->${ req.method }` );
            console.dir( req.headers );
            console.log( 'Proxy------onProxyReq End------' );
        },
        onProxyRes: ( proxyRes, req, res ) => {
            // console.log( 'Proxy------onProxyRes Start------' );
            // console.log( 'Proxy------onProxyRes End------' );
        },
        onError: ( err, req, res ) => {
            // console.error( 'Proxy------onError Start------' );
            // console.error( 'Proxy------onError End------' );
        },
        onProxyReqWs: ( proxyReq, req, socket, options, head ) => {
            // console.log( 'Proxy------onProxyReqWs Start------' );
            // console.log( 'Proxy------onProxyReqWs End------' );
        },
        onOpen: proxySocket => {
            // console.log( 'Proxy------onOpen Start------' );
            // console.log( 'Proxy------onOpen End------' );
        },
        onClose: ( res, socket, head ) => {
            // console.log( 'Proxy------onClose Start------' );
            // console.log( 'Proxy------onClose End------' );
        },
    },

    '/favicon.ico': {
        pathRewrite: {
            // rewrite path
            // '^/old/api': '/new/api',

            // remove path
            // '^/remove/api': '',

            // add base path
            // '^/': '/basepath/',
        },
        /*
         pathRewrite: ( path, req ) => {
         return path.replace( '/api', '/base/api' );
         },
         */
        /*
         pathRewrite: async ( path, req ) => {
         // const should_add_something = await httpRequestToDecideSomething( path );
         // if( should_add_something ){
         //     path += 'something';
         // }
         // return path;
         },
         */

        target: simServerTarget_str,
        changeOrigin,
        router: simServerRouter_obj,

        onProxyReq: ( proxyReq, req, res ) => {
            console.log( 'Proxy------onProxyReq Start------' );
            console.log( `客户端的请求URL--->${ req.url }` );
            console.log( `客户端的请求方法--->${ req.method }` );
            console.dir( req.headers );
            console.log( 'Proxy------onProxyReq End------' );
        },
        onProxyRes: ( proxyRes, req, res ) => {
            // console.log( 'Proxy------onProxyRes Start------' );
            // console.log( 'Proxy------onProxyRes End------' );
        },
        onError: ( err, req, res ) => {
            // console.error( 'Proxy------onError Start------' );
            // console.error( 'Proxy------onError End------' );
        },
        onProxyReqWs: ( proxyReq, req, socket, options, head ) => {
            // console.log( 'Proxy------onProxyReqWs Start------' );
            // console.log( 'Proxy------onProxyReqWs End------' );
        },
        onOpen: proxySocket => {
            // console.log( 'Proxy------onOpen Start------' );
            // console.log( 'Proxy------onOpen End------' );
        },
        onClose: ( res, socket, head ) => {
            // console.log( 'Proxy------onClose Start------' );
            // console.log( 'Proxy------onClose End------' );
        },
    },
    '/apple-touch-icon.png': {
        pathRewrite: {
            // rewrite path
            // '^/old/api': '/new/api',

            // remove path
            // '^/remove/api': '',

            // add base path
            // '^/': '/basepath/',
        },
        /*
         pathRewrite: ( path, req ) => {
         return path.replace( '/api', '/base/api' );
         },
         */
        /*
         pathRewrite: async ( path, req ) => {
         // const should_add_something = await httpRequestToDecideSomething( path );
         // if( should_add_something ){
         //     path += 'something';
         // }
         // return path;
         },
         */

        target: simServerTarget_str,
        changeOrigin,
        router: simServerRouter_obj,

        onProxyReq: ( proxyReq, req, res ) => {
            console.log( 'Proxy------onProxyReq Start------' );
            console.log( `客户端的请求URL--->${ req.url }` );
            console.log( `客户端的请求方法--->${ req.method }` );
            console.dir( req.headers );
            console.log( 'Proxy------onProxyReq End------' );
        },
        onProxyRes: ( proxyRes, req, res ) => {
            // console.log( 'Proxy------onProxyRes Start------' );
            // console.log( 'Proxy------onProxyRes End------' );
        },
        onError: ( err, req, res ) => {
            // console.error( 'Proxy------onError Start------' );
            // console.error( 'Proxy------onError End------' );
        },
        onProxyReqWs: ( proxyReq, req, socket, options, head ) => {
            // console.log( 'Proxy------onProxyReqWs Start------' );
            // console.log( 'Proxy------onProxyReqWs End------' );
        },
        onOpen: proxySocket => {
            // console.log( 'Proxy------onOpen Start------' );
            // console.log( 'Proxy------onOpen End------' );
        },
        onClose: ( res, socket, head ) => {
            // console.log( 'Proxy------onClose Start------' );
            // console.log( 'Proxy------onClose End------' );
        },
    },
    '/apple-touch-icon-precomposed.png': {
        pathRewrite: {
            // rewrite path
            // '^/old/api': '/new/api',

            // remove path
            // '^/remove/api': '',

            // add base path
            // '^/': '/basepath/',
        },
        /*
         pathRewrite: ( path, req ) => {
         return path.replace( '/api', '/base/api' );
         },
         */
        /*
         pathRewrite: async ( path, req ) => {
         // const should_add_something = await httpRequestToDecideSomething( path );
         // if( should_add_something ){
         //     path += 'something';
         // }
         // return path;
         },
         */

        target: simServerTarget_str,
        changeOrigin,
        router: simServerRouter_obj,

        onProxyReq: ( proxyReq, req, res ) => {
            console.log( 'Proxy------onProxyReq Start------' );
            console.log( `客户端的请求URL--->${ req.url }` );
            console.log( `客户端的请求方法--->${ req.method }` );
            console.dir( req.headers );
            console.log( 'Proxy------onProxyReq End------' );
        },
        onProxyRes: ( proxyRes, req, res ) => {
            // console.log( 'Proxy------onProxyRes Start------' );
            // console.log( 'Proxy------onProxyRes End------' );
        },
        onError: ( err, req, res ) => {
            // console.error( 'Proxy------onError Start------' );
            // console.error( 'Proxy------onError End------' );
        },
        onProxyReqWs: ( proxyReq, req, socket, options, head ) => {
            // console.log( 'Proxy------onProxyReqWs Start------' );
            // console.log( 'Proxy------onProxyReqWs End------' );
        },
        onOpen: proxySocket => {
            // console.log( 'Proxy------onOpen Start------' );
            // console.log( 'Proxy------onOpen End------' );
        },
        onClose: ( res, socket, head ) => {
            // console.log( 'Proxy------onClose Start------' );
            // console.log( 'Proxy------onClose End------' );
        },
    },
    '/SimServer/*': {
        pathRewrite: {
            // rewrite path
            // '^/old/api': '/new/api',

            // remove path
            // '^/remove/api': '',

            // add base path
            // '^/': '/basepath/',
        },
        /*
         pathRewrite: ( path, req ) => {
         return path.replace( '/api', '/base/api' );
         },
         */
        /*
         pathRewrite: async ( path, req ) => {
         // const should_add_something = await httpRequestToDecideSomething( path );
         // if( should_add_something ){
         //     path += 'something';
         // }
         // return path;
         },
         */

        target: simServerTarget_str,
        changeOrigin,
        router: simServerRouter_obj,

        onProxyReq: ( proxyReq, req, res ) => {
            console.log( 'Proxy------onProxyReq Start------' );
            console.log( `客户端的请求URL--->${ req.url }` );
            console.log( `客户端的请求方法--->${ req.method }` );
            console.dir( req.headers );
            console.log( 'Proxy------onProxyReq End------' );
        },
        onProxyRes: ( proxyRes, req, res ) => {
            // console.log( 'Proxy------onProxyRes Start------' );
            // console.log( 'Proxy------onProxyRes End------' );
        },
        onError: ( err, req, res ) => {
            // console.error( 'Proxy------onError Start------' );
            // console.error( 'Proxy------onError End------' );
        },
        onProxyReqWs: ( proxyReq, req, socket, options, head ) => {
            // console.log( 'Proxy------onProxyReqWs Start------' );
            // console.log( 'Proxy------onProxyReqWs End------' );
        },
        onOpen: proxySocket => {
            // console.log( 'Proxy------onOpen Start------' );
            // console.log( 'Proxy------onOpen End------' );
        },
        onClose: ( res, socket, head ) => {
            // console.log( 'Proxy------onClose Start------' );
            // console.log( 'Proxy------onClose End------' );
        },
    },
};
