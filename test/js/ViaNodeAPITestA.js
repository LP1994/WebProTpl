/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

const babelCore = require( '@babel/core' );

// transform-simplify-comparison-operators
if( false ){
    let result1 = babelCore.transform( `
function TestFunA( str1 = '' ){
return str1 === "object";
}
`, {
        plugins: [
            'transform-simplify-comparison-operators',
        ],
    } );

    console.log( result1.code );
}
