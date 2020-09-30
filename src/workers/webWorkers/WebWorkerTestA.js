/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

globalThis.importScripts( './tools/WWorker4CT.compiler.js' );

let wWorker4CT_ins = new WWorker4CT( globalThis ),
    wWorker4CT2Name_str = globalThis.name;

wWorker4CT_ins.onMessage( event => {
    console.log( `${ wWorker4CT2Name_str }--->Start` );
    console.dir( event );
    console.log( `${ wWorker4CT2Name_str }--->End` );

    wWorker4CT_ins.postMessage( {
        dataA: `${ wWorker4CT2Name_str }：${ new Date() }`,
    } );
} );
