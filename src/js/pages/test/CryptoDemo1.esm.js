/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import {
    FileBtn,
} from 'CompESM';

let CT = new CTESM.CT();

FileBtn.call( CT, {
    id: '#CryptoDemo1',
    accept: '*',
    multiple: true,
    onChange: {
        event( event, filesArr ){
            if( filesArr.length > 0 ){
                Array.from( filesArr )
                     .forEach( async ( c, i, a ) => {

                         let result = await CT.getDigest2Hex4File( c );

                         console.log( result );

                     } );
            }
        },
    },
} );
