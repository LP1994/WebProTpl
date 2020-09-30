/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let _self = globalThis;

// self.importScripts( './tools/ServiceWorker4CT.compiler.js' );

/*new ServiceWorker4CT( self, {
 onMessage: event => {
 let data1 = event.data,
 proCat_str = `/WebProTpl/dist/${ data1.proCat_str }/js/`,
 allAssets_arr = data1.allAssets_arr.map( ( c, i, a ) => proCat_str + c );

 event.waitUntil( caches.open( 'v1' )
 .then( cache => cache.addAll( allAssets_arr ) ) );

 }
 } );*/

// 注册完该事件后，点击通知的任何位置都会出发该事件，可以根据“event.action”来为每个action执行相应的操作。
// 关于“event.action”中的“action”具体看“ServiceWorkerRegistration.showNotification()”的参数actions属性说明
/*self.addEventListener( 'notificationclick', event => {
 console.dir( event );
 event.action === '' && event.notification.close();
 } );*/

/*console.log( 'SW子线程 _self------>Start' );
 console.dir( _self );
 console.log( 'SW子线程 _self------>End' );*/

function GetAllAssets(){
    return fetch( '../others/ProjectAssets.json', {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
    } )
        .then( response => {
            if( response && response.ok && response.status === 200 ){
                return response.clone()
                               .json()
                               .then( json => {
                                   let obj = json,
                                       CTAllAssets = [],
                                       item;

                                   Object.keys( obj )
                                         .filter( ( c, i, a ) => c !== '' && c !== 'metadata' )
                                         .forEach( ( c, i, a ) => {
                                             item = obj[ c ];

                                             if( Object.prototype.toString.call( item )
                                                       .includes( 'String' ) ){
                                                 CTAllAssets.push( item );
                                             }
                                             else if( Array.isArray( item ) ){
                                                 CTAllAssets.push( ...item );
                                             }
                                             else if( Object.prototype.toString.call( item )
                                                            .includes( 'Object' ) ){
                                                 CTAllAssets.push( ...( Object.values( item )
                                                                              .flat( Infinity ) ) );
                                             }
                                         } );

                                   CTAllAssets.push( ...( Object.values( obj[ '' ] )
                                                                .flat( Infinity ) ) );

                                   CTAllAssets.push( obj.metadata.assetsFileName );
                                   CTAllAssets.push( ...( obj.metadata.externalAssets ) );

                                   return Array.from( new Set( CTAllAssets ) );
                               } )
                               .catch( error => {
                                   console.error( error.message );
                               } );
            }
        } )
        .catch( error => {
            console.error( error.message );
        } );
}

globalThis.onmessage = event => {
    let GetAllAssets = eval( `(${ event.data.GetAllAssets })()` );

    GetAllAssets.then( CTAllAssets => {
        console.log( 'Service Worker onmessage Start' );
        console.dir( CTAllAssets );
        console.log( 'Service Worker onmessage End' );
    } );
};

globalThis.addEventListener( 'install', ( event ) => {
    // console.log( 'install------>Start' );

    event.waitUntil(
        caches.open( 'v1' )
              .then( async cache => {
                  let CTAllAssets = await GetAllAssets();
                  return cache.addAll( CTAllAssets );
              } )
    );

    // console.log( 'install------>End' );
} );

globalThis.addEventListener( 'activate', event => {
    // console.log( 'activate------>Start' );
    // console.log( 'activate------>End' );
} );

globalThis.addEventListener( 'fetch', event => {
    if( !event.request.url.includes( '/sockjs-node/' ) && !event.request.url.includes( 'chrome-extension://' ) ){
        event.respondWith( caches.match( event.request )
                                 .then( response => {
                                     // console.log( `Start event.request.url--->${ event.request.url }` );
                                     // console.dir( response );
                                     // console.log( `End event.request.url--->${ event.request.url }` );

                                     if( response !== undefined ){
                                         return response;
                                     }
                                     else{
                                         return fetch( event.request )
                                             .then( response => {
                                                 let responseClone = response.clone();

                                                 caches.open( 'v1' )
                                                       .then( cache => void ( cache.put( event.request, responseClone ) ) );

                                                 return response.clone();
                                             } )
                                             .catch( error => void ( console.error( error.message ) ) );
                                     }
                                 } ) );
    }
} );
