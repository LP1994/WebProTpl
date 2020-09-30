/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/*
 import http from 'http';
 import { exec } from 'child_process';

 import { serverPort9999 as config_obj } from '../configures/GlobalProp.esm.mjs';
 import InterceptorCommon from '../interceptors/InterceptorCommon.esm.mjs';
 */

import WebSocket from 'ws';

let i = 0;

const wsServer = new WebSocket.Server( {
    port: 9900,
} );

wsServer.on( 'connection', ws => {

    ws.on( 'message', data => {
        ws.send( `服务器：${ ++i }这是WebSocket服务器发送来的数据！！！` );

        console.log( `${ i }message---Start` );
        console.dir( data );
        console.log( `${ i }message---End` );
    } );

} );
