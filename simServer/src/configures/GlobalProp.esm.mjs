/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import path from 'path';

import {
    Get__dirname,
} from '../tools/Tools.esm.mjs';

const __dirname = Get__dirname( import.meta.url );

const serverPort9999 = Object.freeze( {
        // localhost   192.168.1.105   192.168.1.2
        host: 'localhost',
        port: 9999,
        // 整数，等待队列中客户端的最大连接数，超过后将拒绝新客户端的连接
        // 默认：2020
        backlog: 2020,
        // 单位：毫秒，整数
        // 值设为 0 可禁用请求连接的超时行为。
        // 注意，socket 的超时逻辑是在连接上设定的，所以改变这个值只影响服务器新建的连接，而不会影响任何已存在的连接。
        // 默认：0
        timeout: 0,
        // 单位：毫秒，整数 值为 0 时禁用传入连接 keep-alive 的超时行为
        // 默认:5000
        keepAliveTimeout: 5000,
        // 单位：整数 限制请求头的最大数量，默认为 2000。 如果设为 0，则没有限制。
        maxHeadersCount: 2020,
        // 限制解析器等待接收完整的HTTP标头的时间
        // 默认: 40000 单位：毫秒
        headersTimeout: 40000,
        // 解析器支持的HTTP方法的列表
        // http.METHODS
        // string[]
        httpMethods: [
            'POST',
            'DELETE',
            'PUT',
            'GET',
            'OPTIONS',
        ],
        // 所有标准HTTP响应状态代码的集合，以及每个代码的简短描述。例如，http.STATUS_CODES [404] ==='未找到'
        // http.STATUS_CODES
        // Object
        statusCodes: {
            404: 'Not Found',
        },
        // 服务器名称，如：http://localhost:9999/SimServer/StaticResources中的SimServer
        serverName: 'SimServer',
        // 响应“http://localhost:9999/”的页面地址！！！
        rootPath: path.join( __dirname, '../../staticResources/html/index.html' ),
        // 响应http://localhost:9999/favicon.ico的图片地址！！！
        faviconPath: path.join( __dirname, '../../staticResources/img/favicon.ico' ),
        // http 404的时候指向的页面
        http404PagePath: path.join( __dirname, '../../staticResources/html/Error404.html' ),
        // 请求方法不在支持之内的时候指向的页面
        error4ReqMethod2PagePath: path.join( __dirname, '../../staticResources/html/Error4ReqMethod.html' ),
        // staticResources静态资源文件夹的路径
        srPath: path.join( __dirname, '../../staticResources/' ),
        // 存放WEB项目的文件夹(webPro)路径
        webProPath: path.join( __dirname, '../../webPro/' ),
    } ),
    /*
     当 Access-Control-Allow-Origin:* 时
     不允许使用凭证(即 withCredentials:true)

     当 Access-Control-Allow-Origin:* 时，
     只需确保客户端在发出CORS请求时凭据标志的值为false就可以了。
     1、如果请求使用XMLHttpRequest发出，请确保withCredentials为false。
     2、如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。
     3、如果使用Fetch API，请确保Request.credentials是"omit"。
     */
    crossResHeader = {
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
    },
    extName2MIMEType = {
        '.jpe': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.svgz': 'image/svg+xml',
        '.webp': 'image/webp',
        '.bmp': 'image/x-ms-bmp',
        '.jng': 'image/x-jng',
        // '.ico': 'image/x-icon',
        '.ico': 'image/vnd.microsoft.ico',
        '.wbmp': 'image/vnd.wap.wbmp',
        '.tif': 'image/tiff',
        '.tiff': 'image/tiff',

        '.txt': 'text/plain;charset=utf-8', // 'Content-Type': 'text/plain;charset=utf-8'
        '.html': 'text/html;charset=utf-8', // 'Content-Type': 'text/html;charset=utf-8'
        '.htm': 'text/html;charset=utf-8', // 'Content-Type': 'text/html;charset=utf-8'
        '.shtml': 'text/html;charset=utf-8', // 'Content-Type': 'text/html;charset=utf-8'
        '.appcache': 'text/cache-manifest',
        '.mml': 'text/mathml',
        '.css': 'text/css;charset=utf-8', // 'Content-Type': 'text/css;charset=utf-8'
        '.xml': 'application/xml;charset=utf-8', // 'Content-Type': 'application/xml;charset=utf-8'
        /*'.xml': 'text/xml;charset=utf-8', // 'Content-Type': 'text/xml;charset=utf-8'*/
        '.htc': 'text/x-component',
        '.wml': 'text/vnd.wap.wml',
        '.jad': 'text/vnd.sun.j2me.app-descriptor',

        '.mp3': 'audio/mpeg',
        // '.ogg': 'audio/ogg',
        // '.webm': 'audio/webm',
        '.mid': 'audio/midi',
        '.midi': 'audio/midi',
        '.kar': 'audio/midi',
        '.ra': 'audio/x-realaudio',
        '.m4a': 'audio/x-m4a',
        '.flac': 'audio/flac',
        // '.flac': 'audio/x-flac',
        '.wav': 'audio/wave',
        // '.wav': 'audio/wav',
        // '.wav': 'audio/x-wav',
        // '.wav': 'audio/x-pn-wav',

        '.avi': 'video/x-msvideo',
        '.wmv': 'video/x-ms-wmv',
        '.asx': 'video/x-ms-asf',
        '.asf': 'video/x-ms-asf',
        '.mng': 'video/x-mng',
        '.m4v': 'video/x-m4v',
        '.flv': 'video/x-flv',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mov': 'video/quicktime',
        '.mpeg': 'video/mpeg',
        '.mpg': 'video/mpeg',
        '.ts': 'video/mp2t',
        '.3gpp': 'video/3gpp',
        '.3gp': 'video/3gpp',
        '.ogg': 'video/ogg',

        '.otf': 'font/opentype',
        '.ttf': 'font/ttf',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',

        '.json': 'application/json',
        '.json5': 'application/json',
        // '.json': 'application/manifest+json',
        '.js': 'text/javascript',
        // '.js': 'application/javascript',
        // '.js': 'application/ecmascript',
        '.zip': 'application/zip',
        '.xspf': 'application/xspf+xml',
        '.atom': 'application/atom+xml',
        '.rss': 'application/rss+xml',
        '.xhtml': 'application/xhtml+xml',
        '.xpi': 'application/x-xpinstall',
        '.der': 'application/x-x509-ca-cert',
        '.pem': 'application/x-x509-ca-cert',
        '.crt': 'application/x-x509-ca-cert',
        '.tcl': 'application/x-tcl',
        '.tk': 'application/x-tcl',
        '.sit': 'application/x-stuffit',
        '.swf': 'application/x-shockwave-flash',
        '.sea': 'application/x-sea',
        '.rpm': 'application/x-redhat-package-manager',
        '.rar': 'application/x-rar-compressed',
        '.prc': 'application/x-pilot',
        '.pdb': 'application/x-pilot',
        '.pl': 'application/x-perl',
        '.pm': 'application/x-perl',
        '.run': 'application/x-makeself',
        '.jnlp': 'application/x-java-jnlp-file',
        '.jardiff': 'application/x-java-archive-diff',
        '.cco': 'application/x-cocoa',
        '.7z': 'application/x-7z-compressed',
        '.wmlc': 'application/vnd.wap.wmlc',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.odt': 'application/vnd.oasis.opendocument.text',
        '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
        '.odp': 'application/vnd.oasis.opendocument.presentation',
        '.odg': 'application/vnd.oasis.opendocument.graphics',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.eot': 'application/vnd.ms-fontobject',
        '.xls': 'application/vnd.ms-excel',
        '.kmz': 'application/vnd.google-earth.kmz',
        '.kml': 'application/vnd.google-earth.kml+xml',
        '.m3u8': 'application/vnd.apple.mpegurl',
        '.rtf': 'application/rtf',
        '.ps': 'application/postscript',
        '.eps': 'application/postscript',
        '.ai': 'application/postscript',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.hqx': 'application/mac-binhex40',
        '.jar': 'application/java-archive',
        '.war': 'application/java-archive',
        '.ear': 'application/java-archive',
        '.bin': 'application/octet-stream',
        '.exe': 'application/octet-stream',
        '.dll': 'application/octet-stream',
        '.deb': 'application/octet-stream',
        '.dmg': 'application/octet-stream',
        '.iso': 'application/octet-stream',
        '.img': 'application/octet-stream',
        '.msi': 'application/octet-stream',
        '.msp': 'application/octet-stream',
        '.msm': 'application/octet-stream',
    },
    gzip2MIMEType = {
        '.svg': 'image/svg+xml',
        '.svgz': 'image/svg+xml',
        '.txt': 'text/plain;charset=utf-8', // 'Content-Type': 'text/plain;charset=utf-8'
        '.html': 'text/html;charset=utf-8', // 'Content-Type': 'text/html;charset=utf-8'
        '.htm': 'text/html;charset=utf-8', // 'Content-Type': 'text/html;charset=utf-8'
        '.shtml': 'text/html;charset=utf-8', // 'Content-Type': 'text/html;charset=utf-8'
        '.appcache': 'text/cache-manifest',
        '.mml': 'text/mathml',
        '.css': 'text/css;charset=utf-8', // 'Content-Type': 'text/css;charset=utf-8'
        '.xml': 'application/xml;charset=utf-8', // 'Content-Type': 'application/xml;charset=utf-8'
        '.htc': 'text/x-component',
        '.wml': 'text/vnd.wap.wml',
        '.jad': 'text/vnd.sun.j2me.app-descriptor',
        '.otf': 'font/opentype',
        '.ttf': 'font/ttf',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
        '.json': 'application/json',
        '.json5': 'application/json',
        '.js': 'text/javascript',
        '.xspf': 'application/xspf+xml',
        '.atom': 'application/atom+xml',
        '.rss': 'application/rss+xml',
        '.xhtml': 'application/xhtml+xml;charset=utf-8',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.eot': 'application/vnd.ms-fontobject',
        '.xls': 'application/vnd.ms-excel',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
    };

export {
    serverPort9999,
    crossResHeader,
    extName2MIMEType,
    gzip2MIMEType,
};

export default {
    serverPort9999,
    crossResHeader,
    extName2MIMEType,
    gzip2MIMEType,
};
