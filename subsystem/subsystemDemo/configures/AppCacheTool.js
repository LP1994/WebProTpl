/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * 每个页面的.appcache文件自动生成工具，过时了，建议不要用了，建议用Service Worker
 *
 * 哪里使用：
 * src/tplEJS/pages/HelloWorld.ejs
 * 配置来源：
 * configures/HTMLConfig.js
 *
 * 注：AppCache(.appcache)虽然过时了，但用于轻量级的离线缓存还是可以的，建议不要用了，建议用Service Worker
 */

const appCacheTool_objC = require( './GlobalProp.js' ).appCacheTool_objC,
    fs_C = require( 'fs' ),
    path_C = require( 'path' ),
    /**
     * 每个页面的.appcache文件自动生成工具
     * 哪里使用：
     * src/tplEJS/pages/HelloWorld.ejs
     * 配置来源：
     * configures/HTMLConfig.js
     *
     * @param assets_arr 数组，Object.keys( compilation[ 'assets' ] )
     * @param publicPath_str 字符串，htmlWebpackPlugin.files.publicPath
     * @param data_obj JSON对象，htmlWebpackPlugin.options.data
     * @param path1_str 字符串，`others/${ data_obj.appCache_obj.name_str }`
     *
     * 注：AppCache(.appcache)虽然过时了，但用于轻量级的离线缓存还是可以的
     */
    appCacheTool_funC = ( { assets_arr, publicPath_str, data_obj, path1_str } ) => {
        const fallback_objC = data_obj.appCache_obj.fallback_obj,
            dateNow_insC = new Date( Date.now() ),
            time_strC = `${ dateNow_insC.getFullYear() }-${ ( dateNow_insC.getMonth() + 1 + '' ).padStart( 2, '0' ) }-${ ( dateNow_insC.getDate() + '' ).padStart( 2, '0' ) } ${ ( dateNow_insC.getHours() + '' ).padStart( 2, '0' ) }:${ ( dateNow_insC.getMinutes() + '' ).padStart( 2, '0' ) }:${ ( dateNow_insC.getSeconds() + '' ).padStart( 2, '0' ) }`;

        let cache_str = '',
            network_str = '',
            fallback_str = '';

        for( const item_strC of
            data_obj.appCache_obj.cache_arr ){
            cache_str += item_strC + '\n';
        }
        for( const item_strC of
            assets_arr ){
            cache_str += publicPath_str + item_strC + '\n';
        }
        for( const item_strC of
            data_obj.appCache_obj.network_arr ){
            network_str += item_strC + '\n';
        }
        for( const item_strC in
            fallback_objC ){
            fallback_str += item_strC + ' ' + fallback_objC[ item_strC ] + '\n';
        }

        fs_C.writeFileSync( path_C.resolve( __dirname, `${ appCacheTool_objC.distSrc_str }${ data_obj.proN_str }/${ path1_str }` ), `CACHE MANIFEST\n# ${ time_strC } v${ Date.now() }.0.0\n${ cache_str }\nNETWORK:\n${ network_str }\nFALLBACK:\n${ fallback_str }`, { encoding: 'utf8' } );
    };

module.exports = appCacheTool_funC;
