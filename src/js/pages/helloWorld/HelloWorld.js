/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

isPro
?
( console.log( '------------------This is production mode------------------' ) )
:
( console.log( '------------------This is development mode------------------' ) );

import {
    RefreshBtn,
} from 'CompESM';

import 'scssPDir/helloWorld/HelloWorld.scss';

let CT = new CTESM.CT();

( async () => {
    // await import('../test/VueDemo1.esm.js');
    // await import('../test/VueRouterDemo1.esm.js');
    await import('../test/Test.esm.js');

    RefreshBtn.call( CT, {
        id: '#RefreshBtnTest',
        click: {
            event: event => {
                window.location[ 'reload' ]();
            },
        },
    } );

    CT.on( 'html, body, #LocalRoll, #HelloWorld, main', 'touchmove', event => void ( CT.allEStop( event ) ) );

} )();
