/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * 项目全局的属性、变量等的配置地方
 *
 * 因为这是个项目模板，在具体的项目中会有不同的属性、变量
 * 尽量在这里做全局的属性、变量等的配置，方便更改
 *
 * http://localhost:8082/WebProTpl/dist/devServer/pages/HelloWorld.html
 * http://localhost:8083/WebProTpl/dist/localServer/pages/HelloWorld.html
 * http://localhost:8081/WebProTpl/dist/test/pages/HelloWorld.html
 * http://localhost:8081/WebProTpl/dist/production/pages/HelloWorld.html
 */

    // process.cwd()输出G:\\WebStormWS\\WebProTpl

    // 项目名，也是项目文件夹名
const proName_str = 'WebProTpl',
    // dist/devServer/pages文件夹里头的启动页面的路径以及文件名，是被DevServer服务器启动的页面
    // 如：dist/devServer/pages/HelloWorld.html就填“HelloWorld.html”
    // 如果是：dist/devServer/pages/testPages/HelloWorld.html就填“testPages/HelloWorld.html”，建议不要再有二级目录了，没必要
    openPage_str = 'HelloWorld.html',
    // 本地开发使用的IP地址   localhost
    localHost_str = 'localhost',
    // WebStorm服务器的端口
    webStormPort_num = 8081,
    // devServer(webpack.DevServer.js)的端口 8082
    devServerPort_num = 8082,
    // localServer(webpack.LocalServer.js)的端口
    localServerPort_num = 8083,
    // 映射到公网的IP地址，一般是配合远端调试工具(weinre)的远端调试需要
    publicNetworkHost_str = '',
    // 映射到公网的端口，一般是配合远端调试工具(weinre)的远端调试需要
    publicNetworkPort_str = '',
    // 远端调试工具(weinre)的端口值
    weinrePort_str = '8888',
    /*
     跨域请求头

     当 Access-Control-Allow-Origin:* 时
     不允许使用凭证(即 withCredentials:true)

     当 Access-Control-Allow-Origin:* 时，
     只需确保客户端在发出CORS请求时凭据标志的值为false就可以了。
     1、如果请求使用XMLHttpRequest发出，请确保withCredentials为false。
     2、如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。
     3、如果使用Fetch API，请确保Request.credentials是"omit"。
     */
    crossResHeader_obj = {
        'Service-Worker-Allowed': '/',
        // 'Content-Security-Policy': 'require-sri-for script style',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': 600,
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Expose-Headers': 'Transfer-Encoding, Content-Encoding, Content-Length, Accept-Language, Accept-Encoding, Accept-Charset, Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma',
        'Access-Control-Allow-Headers': 'application/x-www-form-urlencoded, multipart/form-data, text/plain, Content-Type, Content-Length, Accept, Accept-Language, X-Requested-With, Cache-Control',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS, CONNECT, HEAD, PATCH, TRACE',
        'Access-Control-Request-Method': 'PUT, POST, GET, DELETE, OPTIONS, CONNECT, HEAD, PATCH, TRACE',
        'Cache-Control': 'no-siteApp, no-cache, must-revalidate, no-transform',
        'Pragma': 'no-cache',
        'Expires': 0,
    };

// configures/AppCacheTool.js
const appCacheTool_objC = {
    // 在被使用的时候其实就是这个目录值：“G:\WebStormWS\WebProTpl\dist”，这个目录用于存放自动生成的缓存配置文件
    distSrc_str: `./WebStormWS/${ proName_str }/dist/`
};

// configures/HTMLConfig.js
const htmlConfig_objC = {
    // 动态插入到页面的远端调式工具(weinre)的JS代码
    weinreDevTool_str: `<script>var weinreDevTool_elem=document.createElement('script'),hostName_str=location.hostname;if(hostName_str==='${ localHost_str }'){weinreDevTool_elem.src='http://'+hostName_str+':${ weinrePort_str }/target/target-script-min.js#LMFiOS';}else if(hostName_str==='${ publicNetworkHost_str }'){weinreDevTool_elem.src='http://'+hostName_str+':${ publicNetworkPort_str }/target/target-script-min.js#LMFiOS';}document.body.appendChild(weinreDevTool_elem);</script>`,
    // 动态计算“rem”的JS代码
    dynamicREM_str: `<script>
!function(i,e){'undefined'!==typeof module&&'object'===typeof module&&'object'===typeof exports?module.exports=e:'function'===typeof define&&(define.amd||define.cmd)?define([],e):i.deviceInfo=e}('undefined'!==typeof window?window:this,function(){'use strict';String.prototype.includes||(String.prototype.includes=function(i,e){return'number'!==typeof e&&(e=0),!(e+i.length>this.length)&&-1!==this.indexOf(i,e)});var i=navigator.platform,e=navigator.userAgent,s=window.devicePixelRatio,n=i.includes('MacIntel')||e.includes('Macintosh')||e.includes('Intel Mac OS'),d=i.includes('Win32')||i.includes('Win64')||e.includes('Windows NT')||e.includes('WOW64'),l=i.includes('iPad')||e.includes('iPad'),u=i.includes('iPhone')||e.includes('iPhone'),c=e.includes('Windows Phone'),o=e.includes('(BB')||e.includes('BB10')||e.includes('RIM'),r=e.includes('MeeGo'),t=i.includes('Linux')||e.includes('Linux')||e.includes('Android'),a=n||d,_=e.includes('Mobile')||l||u||c||o||r||t,B=e.includes('MicroMessenger')||e.includes('WindowsWechat'),w=(e.includes(' UBrowser')||e.includes('UCBrowser'))&&!e.includes('tmall'),M=e.includes('BIDUBrowser')||e.includes('baidubrowser')||e.includes('FlyFlow'),f=e.includes('2345Explorer')||e.includes('Mb2345Browser'),P=e.includes('LBBROWSER')||e.includes('LieBaoFast'),p=e.includes('SogouMSE')||e.includes('SogouMobileBrowser')||e.includes('MetaSr')||e.includes(' SE '),S=e.includes('Maxthon')||e.includes('MXiOS')||e.includes('MxBrowser'),h=(e.includes('QQBrowser')||e.includes('MQQBrowser')||e.includes('QQBrowserLite'))&&!B,Q=e.includes('QHBrowser')||e.includes('QihooBrowser'),b=e.includes('YaBrowser')||e.includes('Yowser'),g=e.includes('OPR')||e.includes('OPT'),m=e.includes('Edge/')||e.includes('EdgA/')||e.includes('EdgiOS/'),W=e.includes('Firefox/')||e.includes('FxiOS'),C=e.includes('baiduboxapp'),x=e.includes('MiuiBrowser'),A=e.includes('SogouSearch'),O=e.includes('QQ/'),y=e.includes('Weibo')||e.includes('weibo'),E=e.includes('tmall')||e.includes('TM/'),I=e.includes('AlipayClient'),F=e.includes('Trident')||e.includes('MSIE')||e.includes('compatible'),T=e.includes('TaoBrowser'),L=e.includes('CriOS'),v=B||w||M||f||P||p||S||h||Q||b||g||m||W||C||x||A||O||y||E||I||F||T,R={pf:i,ua:e,dpr:s,is_PC:a,is_Mobile:_,is_PCMac:n,is_iPad:l,is_iPhone:u,is_PCWin:d,is_WP:c,is_BB:o,is_MeeGo:r,is_Android:t,is_WX:B,is_UC:w,is_BDB:M,is_2345:f,is_LB:P,is_SGB:p,is_AY:S,is_QQB:h,is_360:Q,is_YB:b,is_OperaB:g,is_Edge:m,is_FF:W,is_QQAPP:C,is_MIB:x,is_SGAPP:A,is_QQ:O,is_WBAPP:y,is_TMAPP:E,is_AlipayC:I,is_IE:F,is_TaoB:T,is_iOSChrome:L,is_Safari:(n||l||u)&&e.includes('Safari/')&&!e.includes('Chrome')&&!(v||L),is_Chrome:L||e.includes('Chrome/')&&e.includes('Safari/')&&!v};return n||d||l||u||c||o||r||t?R.other=!1:(R.other=!0,R.is_Android=!0,a||_||(R.is_PC=!0,R.is_Mobile=!1)),R});
!function(e,n){'undefined'!==typeof module&&'object'===typeof module&&'object'===typeof exports?module.exports=n():'function'===typeof define&&(define.amd||define.cmd)?define([],n()):e.dynamicREM=n()}('undefined'!==typeof window?window:this,function(){'use strict';return function(e){e||(e=375);var n=document.documentElement,t=function(t){n.style.fontSize=n.clientWidth/e*16+'px'};document.addEventListener('DOMContentLoaded',t,!1),window.addEventListener('resize',t,!1)}});
deviceInfo().is_Mobile&&dynamicREM();
</script>`
};

// configures/ProxyConfig.js
const proxyConfig_obj = {
    crossResHeader_obj,
    localHost_str,
    webStormPort_num,
    devServerPort_num,
    localServerPort_num,
};

// webpack.DevServer.js
const webpackDevServer_obj = {
    proName_str,
    localHost_str,
    devServerPort_num,
    crossResHeader_obj,
    openPage_str
};

// webpack.localServer.js
const webpackLocalServer_obj = {
    proName_str,
    localHost_str,
    localServerPort_num,
    crossResHeader_obj,
    openPage_str
};

// webpack.Test.js
const webpackTest_obj = {};

// webpack.Production.js
const webpackPro_obj = {};

module.exports = {
    appCacheTool_objC,
    htmlConfig_objC,
    proxyConfig_obj,
    webpackPro_obj,
    webpackTest_obj,
    webpackLocalServer_obj,
    webpackDevServer_obj
};
