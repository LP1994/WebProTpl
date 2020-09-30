/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 将webpack打包输出的所有类型的资源文件的路径和自己添加的资源路径一起输出到页面中的一个<script>标签里，该标签里有一个名为“CTAllAssets”的全局数组常量

const allAssets_arrC = [];

/**
 * 将webpack打包输出的所有类型的资源文件的路径和自己添加的资源路径一起输出到页面中的一个<script>标签里，该标签里有一个名为“CTAllAssets”的全局数组常量
 *
 * @param publicPath_str 字符串，htmlWebpackPlugin.files.publicPath，必须
 *
 * @param assets_arr 数组，Object.keys( compilation[ 'assets' ] )，必须
 *
 * @param other_arr 数组，其他资源路径，支持外部URL，没有资源路径，就写空数组，可选
 * 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
 *
 * @returns {string} 字符串，`<script>window.CTAllAssets=['7788.json'];</script>`
 */
function OutAssets( { publicPath_str, assets_arr, other_arr } ){
    for( const item_strC of
        assets_arr ){
        allAssets_arrC.push( publicPath_str + item_strC );
    }

    allAssets_arrC.push( ...other_arr );

    return `<script>window[ 'CTAllAssets' ]=${ JSON.stringify( allAssets_arrC ) };</script>`;
}

module.exports = OutAssets;
