/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 自定义的SRI值计算工具
// assets_obj的各个子属性对象中得有“_value”属性，不然没法计算！！！

const crypto = require( 'crypto' );

/**
 * 自定义的SRI值计算工具
 *
 * @param assets_obj 对象，就是compilation[ 'assets' ]，必须
 * @param hashName_arr 数组，成员可以是'sha256'、'sha384'、'sha512'，默认值[ 'sha512' ]，可选
 * @param fileName_str 字符串，文件名，不用加后缀名，必须
 * @param inputEncoding4Update_str 字符串，update函数的第二个参数，默认值'utf8'，可选
 * @param encoding4Digest_str 字符串，digest函数的第一个参数，默认值'base64'('base64'、'hex'、'latin1')，可选
 *
 * @returns {string} string，SRI值
 */
function OutSRIValue( { assets_obj, hashName_arr = [ 'sha512' ], fileName_str, inputEncoding4Update_str = 'utf8', encoding4Digest_str = 'base64' } ){
    let sriValue_str = '',
        item = null,
        itemFileName_str = '',
        isFileType_boo = false,
        _value = null,
        isValue_boo = false;
    for( const keyName_str in
        assets_obj ){
        if( keyName_str.includes( fileName_str ) ){
            item = assets_obj[ keyName_str ];
            itemFileName_str = keyName_str.toLowerCase()
                                          .trim();
            isFileType_boo = itemFileName_str.endsWith( '.js' ) || itemFileName_str.endsWith( '.css' ) || itemFileName_str.endsWith( '.json' );
            _value = item[ '_value' ];
            isValue_boo = _value !== null && _value !== undefined && _value !== '';
            if( isFileType_boo && isValue_boo ){
                hashName_arr.forEach( c => void ( sriValue_str += c + '-' + crypto.createHash( c )
                                                                                  .update( _value, inputEncoding4Update_str )
                                                                                  .digest( encoding4Digest_str ) + ' ' ) );
                break;
            }
        }
    }
    return sriValue_str.trim();
}

module.exports = OutSRIValue;
