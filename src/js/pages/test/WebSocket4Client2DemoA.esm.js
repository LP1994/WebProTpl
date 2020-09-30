/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let CT = new CTESM.CT();

let { WebSocket4Client, } = CT.getClass();

const ws = new WebSocket4Client( 'ws://localhost:9900', {
    onClose: ( ws, event ) => {
        console.log( 'onClose!!!' );
    },
    onError: ( ws, event ) => {
    },
    onMessage: ( ws, event ) => {
        console.log( 'onMessage Start' );
        console.dir( ws );
        console.dir( event );
        console.log( 'onMessage End' );

        console.log( `这是服务器发送过来的数据：${ event.data }。` );
    },
    onOpen: ( ws, event ) => {
        console.log( 'onOpen Start' );
        console.dir( ws );
        console.dir( event );
        console.log( 'onOpen End' );

        ws.send( `客户端：${ Date.now() }_这是客户端发送的数据！！！` );
    },
} );

ws.setOnOpen( ( ws, event ) => {
    ws.send( `setOnOpen客户端：${ Date.now() }_这是客户端发送的数据！！！` );
} );

ws.setOnMessage( ( ws, event ) => {
    console.log( `setOnMessage这是服务器发送过来的数据：${ event.data }。` );
} );

ws.setOnClose( ( ws, event ) => {
    console.log( 'setOnClose_onClose!!!' );
} );

window.ws = ws;
