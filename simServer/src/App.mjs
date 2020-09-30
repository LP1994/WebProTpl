/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

Promise.allSettled( [
           import('./servers/ServerPort9999.esm.mjs'),
           import('./servers/WebSocketPort9900.esm.mjs'),
       ] )
       .then( result => {
           // console.dir( result );
       } )
       .catch( error => void ( console.error( error.message ) ) );
