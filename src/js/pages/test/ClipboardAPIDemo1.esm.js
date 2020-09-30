/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let CT = new CTESM.CT();

if( false ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        CT.readText4Clip( text => {
            CT.iInsertB( '.helloWorld article', `<p class = 'css-reset' >${ text }</p><br />` );
        }, {
            error( error ){
                console.error( error.message );
            },
        } );
    }, false );
}

if( false ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        CT.writeText4Clip( '这是写入系统剪切板的字符串内容！！！', {
            success(){
                console.log( '写入系统剪切板成功！！！' );
            },
            fail(){
                console.error( '写入系统剪切板失败！！！' );
            },
        } );
    }, false );
}

if( false ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        CT.read4Clip( ( data4Blob, type ) => {
            console.log( type );
            console.dir( data4Blob );
        }, );
    }, false );
}

if( true ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        /*
         let data = new Blob( '这是写入系统剪切板的字符串内容！！！', {
         // native transparent
         // endings: 'transparent',
         type: 'text/plain',
         } );
         */

        let data = new DataTransfer();
        data.items.add( '1这是写入系统剪切板的字符串内容！！！', 'text/plain' );

        CT.write4Clip( data, {
            success(){
                console.log( '写入成功！！！' );
            },
            fail(){
                console.error( '写入失败！！！' );
            },
        } );
    }, false );
}
