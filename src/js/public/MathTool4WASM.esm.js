/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import MathTool4Url from 'wasmBDir/MathTool.wasm';

let CT = new CTESM.CT(),
    importObject_objC = {
        global: {},
        env: {
            // 初始大小为100页（64 * 100 = 6400‬KiB、6.25MiB），最大大小为1024页（64 * 1024 = 65536‬‬‬KiB、64MiB）。
            memory: new WebAssembly.Memory( {
                // WebAssembly Memory的初始大小，以WebAssembly pages为单位。
                initial: 100,
                // WebAssembly Memory的最大尺寸允许以WebAssembly pages为单位生长。
                // 当存在时，最大参数充当引擎预留存储器的提示。
                // 但是，引擎可能会忽略或限制此预订请求。
                // 一般来说，大多数WebAssembly modules不需要设置最大值。
                // 一个WebAssembly page的大小恒定为65536字节，即64KiB。
                maximum: 1024,
            } ),
            table: new WebAssembly.Table( {
                // WebAssembly表的初始元素数。
                initial: 0,
                // 表示要存储在表中的值类型的字符串。目前，它只能有一个值“anyfunc”（函数）。
                element: 'anyfunc',
                // 允许WebAssembly Table增长的元素的最大数目。
                // maximum: 102400,
            } ),

            fmod( x, y ){
                return x % y;
            },
            remainder( x, y ){
                return x - Math.round( x / y ) * y;
            },
            fmax( x, y ){
                return Math.max( x, y );
            },
            fmin( x, y ){
                return Math.min( x, y );
            },
            fdim( x, y ){
                return Math.max( x - y, 0 );
            },
            exp( x ){
                return Math.exp( x );
            },
            exp2( x ){
                return 2 ** x;
            },
            expm1( x ){
                return Math.expm1( x );
            },
            log( x ){
                return Math.log( x );
            },
            log10( x ){
                return Math.log10( x );
            },
            log2( x ){
                return Math.log2( x );
            },
            log1p( x ){
                return Math.log1p( x );
            },
            pow( x, y ){
                return x ** y;
            },
            cbrt( x ){
                return Math.cbrt( x );
            },
            hypot( x, y ){
                return Math.hypot( x, y );
            },
            sin( x ){
                return Math.sin( x );
            },
            cos( x ){
                return Math.cos( x );
            },
            tan( x ){
                return Math.tan( x );
            },
            asin( x ){
                return Math.asin( x );
            },
            acos( x ){
                return Math.acos( x );
            },
            atan( x ){
                return Math.atan( x );
            },
            atan2( x, y ){
                return Math.atan2( y, x );
            },
            sinh( x ){
                return Math.sinh( x );
            },
            cosh( x ){
                return Math.cosh( x );
            },
            tanh( x ){
                return Math.tanh( x );
            },
            asinh( x ){
                return Math.asinh( x );
            },
            acosh( x ){
                return Math.acosh( x );
            },
            atanh( x ){
                return Math.atanh( x );
            },
            round( x ){
                return Math.round( x );
            },
            ldexp( x, y ){
                return x * ( 2 ** y );
            },

        },
    };

/**
 * 注意三角函数（sin（），cos（），tan（），asin（），acos（），atan（），atan2（））期望（和返回）以弧度表示的角度。<br />
 * 要将弧度转换为度数，请除以（Math.PI/180）。<br />
 * 乘以相同的值将度转换为弧度。<br />
 *
 * @param url 字符串，“.wasm”的网络URL地址，必须
 *
 * @param importObject JSON配置对象，是用在“WebAssembly.instantiate( bufferSource, importObject )”里的第二个参数，可选
 *
 * @returns {Promise<{instance: *, module: *, funs: {}}>} Promise<{instance: *, module: *, funs: {}}>
 *
 * @constructor
 */
function MathTool4WASM( url = MathTool4Url, importObject = {} ){
    return CT.getWASM( {
                 url,
                 importObject: Object.assign( importObject_objC, importObject ),
             } )
             .then( ( {
                          module,
                          instance,
                      } ) => ( {
                 module,
                 instance,
                 funs: instance.exports,
             } ) );
}

export {
    MathTool4WASM,
};

export default MathTool4WASM;
