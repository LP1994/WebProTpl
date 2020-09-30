/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import http from 'http';
import { exec } from 'child_process';

import { serverPort9999 as config_obj } from '../configures/GlobalProp.esm.mjs';
import InterceptorCommon from '../interceptors/InterceptorCommon.esm.mjs';

const server = http.createServer();

server.maxHeadersCount = config_obj.maxHeadersCount;
server.keepAliveTimeout = config_obj.keepAliveTimeout;
// server.timeout也可用于设置和读取超时时间
server.setTimeout( config_obj.timeout );
server.headersTimeout = config_obj.headersTimeout;

// 每次收到带有HTTP Expect：100-continue的请求时发出。如果未侦听此事件，则服务器将根据情况自动响应100 Continue。
// 处理此事件包括如果客户端应继续发送请求正文，则调用response.writeContinue（）；如果客户端不应继续发送请求正文，则生成适当的HTTP响应（例如400错误请求）。
// 发出并处理此事件时，不会发出'request'事件。
server.on( 'checkContinue', ( request, response ) => {
    console.log( '收到带有“HTTP Expect: 100-continue”的请求！！！触发checkContinue事件！！！' );
} );

// 每次收到带有HTTP Expect标头的请求时发出，该请求的值不为100-continue。如果未侦听此事件，则服务器将根据情况自动响应417 Expectation Failed。
// 发出并处理此事件时，不会发出'request'事件。
server.on( 'checkExpectation', ( request, response ) => {
    console.log( '收到带有“HTTP Expect”标头(该请求的值不为“100-continue”)的请求！！！触发checkExpectation事件！！！' );
} );

// 每次客户端请求HTTP升级时发出。侦听此事件是可选的，客户端无法坚持更改协议
// 发出此事件后，请求的套接字将没有“data”事件侦听器，这意味着将需要对其进行绑定以便处理在该套接字上发送给服务器的数据。
server.on( 'upgrade', ( request, socket, head ) => {
    console.log( '客户端请求HTTP升级！！！触发upgrade事件！！！' );
} );

/**
 * 当接受到客户端请求时触发
 * 每个连接可能有多个请求（在 HTTP keep-alive 连接的情况下）。
 *
 * 有时会出现只建立了一次连接却触发了两次请求，第二次请求往往是浏览器为页面在收藏夹中显示的图标(favicon.ico)而自动发出的请求
 *
 * request.method: 该属性值是一个字符串，客户端使用的请求方法，如："GET"、"POST"、"PUT"、"DELETE"
 *
 * request.url: 该属性值是一个字符串，客户端请求使用的URL参数字符串，如："/test/page/index.html?qw=1&asd=122"，不包括锚点
 *
 * request.headers: 客户端发送请求时的请求头对象，数据格式是JSON对象，包括cookie信息以及浏览器的各种信息
 *
 * request.httpVersion: 该属性值是一个字符串，客户端发送请求的HTTP的版本，如："1.1"、"1.0"
 *
 * request.trailers: 该属性值为客户端发送的trailer对象。存放了客户端附加的一些HTTP头信息，该对象被包含在客户端发送的请求数据之后，因此，
 * 只有当http.IncomingMessage对象的end事件触发之后才能读取到trailer对象的信息。
 * IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，并作为第一个参数分别递给 'request' 和 'response' 事件。
 * 它可以用来访问响应状态、消息头、以及数据。
 *
 * request.socket: 是服务端用于监听客户端请求的socket对象
 *
 */
server.on( 'request', ( request, response ) => {
    console.log( '服务器接受到客户端请求！！！' );

    InterceptorCommon( server, request, response );
} );

/**
 * listening事件触发时调用的函数，无任何函数参数
 *
 * server.listening 返回一个布尔值，表示服务器是否正在监听连接。
 */
server.on( 'listening', () => {
    console.log( `服务器${ server.listening
                        ? '正在'
                        : '不在' }侦听'http://${ config_obj.host }:${ config_obj.port }'的连接！！！` );

    // exec( `start http://${ config_obj.host }:${ config_obj.port }` );
} );

/**
 * 该事件将在服务器关闭后触发
 * 关闭服务器的操作: server.close();
 */
server.on( 'close', () => {
    console.log( '服务器关闭了！！！' );
} );

/**
 * 该事件将在服务器发生错误时触发
 */
server.on( 'error', event => {
    if( event.code === 'EADDRINUSE' ){
        console.error( `服务器发生错误！！！http://${ config_obj.host }:${ config_obj.port }已被占用！！！` );
    }
    else{
        console.error( `服务器发生错误！！！错误代码：${ event.code }！！！` );
    }

    server.close();
} );

/**
 * 当新的 TCP 流被建立时触发
 *
 * 参数socket是服务端用于监听客户端请求的socket对象
 *
 * 如果客户端的请求头信息中或服务器的响应头信息中加入"Connection:keep-alive"，
 * 则HTTP连接将继续保持，客户端将通过相同的连接向服务器发出请求
 *
 * 有时会出现只建立了一次请求连接却触发了该事件两次，第二次往往是浏览器为页面在收藏夹中显示的图标(favicon.ico)而自动发出的请求
 */
server.on( 'connection', socket => {
    console.log( '服务端与客户端建立连接了！！！' );
} );

/**
 * 每当客户端发送 HTTP CONNECT 请求时触发。
 * 当该事件被触发后，请求的 socket 上没有 'data' 事件监听器，这意味着需要绑定 'data' 事件监听器，用来处理 socket 上被发送到服务器的数据。
 *
 * head <Buffer> 流的第一个数据包，可能为空。
 */
server.on( 'connect', ( request, socket, head ) => {
    console.log( '客户端发送“HTTP CONNECT”请求！！！' );
} );

/**
 * 当超时事件发生时触发
 *
 * 参数socket是服务端用于监听客户端请求的socket对象
 *
 * 当超时时间超过之后，客户端不可继续利用本次与HTTP服务器建立的连接，下次向服务器发出请求时，必须重新建立连接
 */
server.on( 'timeout', socket => {
    console.log( '客户端与服务器的连接超时了！！！' );
} );

/**
 * 如果客户端触发了一个'error'，事件就会触发
 *
 * socket 是发生错误的 net.Socket 对象
 * exception 是一个 Error 实例，包含以下两部分：
 * bytesParsed: Node.js 正确解析的请求包的字节数。
 * rawPacket: 当前请求的原始数据包。
 */
server.on( 'clientError', ( exception, socket ) => {
    if( exception.code === 'ECONNRESET' ){
        console.error( '客户端中断了连接！！！比如：用迅雷一类的下载工具下载文件之类的！！！' );
    }
    else{
        console.error( '客户端触发了一个clientError事件！！！Start' );
        console.dir( exception );
        console.error( '客户端触发了一个clientError事件！！！End' );
    }

    socket.end( 'HTTP/1.1 400 Bad Request' );
} );

server.listen( config_obj.port, config_obj.host, config_obj.backlog );
