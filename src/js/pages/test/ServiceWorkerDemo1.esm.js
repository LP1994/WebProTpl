/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import GetAllAssets from 'jsPubDir/GetAllAssets.esm.js';
import ServiceWorkerTestA from 'serviceWorkersDir/ServiceWorkerTestA.compiler.js';

let CT = new CTESM.CT();

if( 'serviceWorker' in navigator ){
    navigator.serviceWorker.register( ServiceWorkerTestA, { scope: '/' } )
             .then( async ServiceWorkerRegistration => {
                 if( ServiceWorkerRegistration.active ){
                     ServiceWorkerRegistration.active.postMessage( {
                         GetAllAssets: GetAllAssets.toString(),
                     } );
                 }

                 return ServiceWorkerRegistration;
             } )
             .catch( error => {
                 console.error( 'failed：' + error.message );
             } );
}
