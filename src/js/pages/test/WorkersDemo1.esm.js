/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import WebWorkerTestA from 'wWorkersDir/WebWorkerTestA.compiler.js';
import SharedWorkerTestA from 'sWorkersDir/SharedWorkerTestA.compiler.js';

import {
    WWorker4MT,
    SWorker4MT,
} from 'WorkersESM';

let CT = new CTESM.CT();

// Web Worker
{
    if( false ){
        try{
            let webWorkerTestA_ins = new WWorker4MT( {
                workerInsName: 'webWorkerTestA_ins',
                url: WebWorkerTestA,
            }, {
                name: 'webWorkerTestA_ins2ChildThread',
            } );

            webWorkerTestA_ins.onMessage( event => {
                console.log( 'HelloWorld--->Start' );
                console.dir( event );
                console.log( 'HelloWorld--->End' );

                CT.iInsertB( 'html.helloWorld #HelloWorld article', `<p class='css-reset'>${ event.data.dataA }</p><br />`, );
            } );

            function PostMessage(){
                webWorkerTestA_ins.postMessage( {
                    dataA: `HelloWorld：${ new Date() }`,
                } );
            }

            CT.aCE( '.workerTestBtn1', event => {
                PostMessage();
            } );
        }
        catch( e ){
            CT.iInsertB( 'html.helloWorld #HelloWorld article', `<p class='css-reset'>${ e.message }</p><br />`, );
        }
        finally{
            CT.iInsertB( 'html.helloWorld #HelloWorld article', `<p class='css-reset'>Web Worker执行了！！！</p><br />`, );
        }
    }
}

// Shared Worker
{
    if( false ){
        try{
            let sharedWorkerTestA_ins = new SWorker4MT( {
                workerInsName: 'sharedWorkerTestA_ins',
                url: SharedWorkerTestA,
            }, {
                name: 'sharedWorkerTestA_ins2ChildThread',
            } );

            sharedWorkerTestA_ins.portOnMessage( event => {
                console.log( 'HelloWorld---portOnMessage--->Start' );
                console.dir( event );
                console.log( 'HelloWorld---portOnMessage--->End' );

                CT.iInsertB( 'html.helloWorld #HelloWorld article', `<p class='css-reset'>${ event.data.dataA }</p><br />`, );
            } );

            function PortPostMessage(){
                sharedWorkerTestA_ins.portPostMessage( {
                    dataA: `HelloWorld：${ new Date() }`,
                    numA: 1,
                } );
            }

            CT.aCE( '.workerTestBtn1', event => {
                PortPostMessage();
            } );
        }
        catch( e ){
            CT.iInsertB( 'html.helloWorld #HelloWorld article', `<p class='css-reset'>${ e.message }</p><br />`, );
        }
        finally{
            CT.iInsertB( 'html.helloWorld #HelloWorld article', `<p class='css-reset'>Shared Worker执行了！！！</p><br />`, );
        }
    }
}
