/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * SRI值生成工具
 *
 * 哪里使用：
 * src/tplEJS/pages/HelloWorld.ejs
 *
 * @param isPro_boo 布尔，isPro表示是否是正式环境
 * @param assets_obj 对象，compilation[ 'assets' ]
 * @param fileName_str 字符串，文件名，如：Basic
 *
 * @returns {string} 模板字符串，没有对应的SRI值就会返回“空字符串”
 */
const sriTool_funC = ( { isPro_boo, assets_obj, fileName_str } ) => {
    if( isPro_boo ){
        let item = null,
            itemFileName_str = '',
            isFileType_boo = false,
            integrity_str = '',
            isIntegrity_boo = false,
            result_str = '';
        for( const keyName_strC in
            assets_obj ){
            if( keyName_strC.includes( fileName_str ) ){
                item = assets_obj[ keyName_strC ];
                itemFileName_str = keyName_strC.toLowerCase()
                                               .trim();
                isFileType_boo = itemFileName_str.endsWith( '.js' ) || itemFileName_str.endsWith( '.css' ) || itemFileName_str.endsWith( '.json' );
                integrity_str = item.integrity;
                isIntegrity_boo = isFileType_boo && integrity_str !== null && integrity_str !== undefined && integrity_str !== '';
                if( isIntegrity_boo ){
                    result_str = `integrity = '${ integrity_str }' crossorigin = 'anonymous'`;
                    break;
                }
            }
        }
        return result_str;
    }
    return '';
};

module.exports = sriTool_funC;
