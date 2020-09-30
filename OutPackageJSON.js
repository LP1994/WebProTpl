/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

/**
 * 动态扫描该项目的node_modules文件夹下的npm包的版本号，并更新它们
 */

'use strict';

let fs = require( 'fs' ),
    path = require( 'path' ),
    nodeModulesPath_str = path.join( __dirname, './node_modules' ),// G:\WebStormWS\WebProTpl\node_modules
    /*outPath_str 更具具体情况修改，绝对路径*/
    outPath_str = path.join( __dirname, './' ),// G:\WebStormWS\WebProTpl\
    getDir_fun = ( path_str = '' ) => fs.readdirSync( path_str ),
    fDirName_arr = getDir_fun( nodeModulesPath_str ),
    fPath_str = '',
    sDirName_arr = [],
    jsonFile_obj = {},
    version_str = '',
    isDir_fun = ( path_str = '' ) => fs.statSync( path_str )
                                       .isDirectory(),
    read_fun = ( filePath_str = '' ) => fs.readFileSync( filePath_str ),
    handle1_fun = ( dirName_arr = [], fun = item => {
    } ) => void ( dirName_arr.forEach( fun ) ),
    /*outContent_obj 更具具体情况修改，绝对路径*/
    outContent_obj = JSON.parse( read_fun( path.join( __dirname, './package.json' )/* 项目的package.json G:\WebStormWS\WebProTpl\package.json */ ) ),
    handle2_fun = ( filePath_str = '' ) => {
        jsonFile_obj = JSON.parse( read_fun( filePath_str ) );
        version_str = '^' + jsonFile_obj.version;
        outContent_obj[ 'devDependencies' ][ jsonFile_obj.name ] = version_str;
    };
outContent_obj[ 'devDependencies' ] = {};

handle1_fun( fDirName_arr, item => {
    fPath_str = nodeModulesPath_str + '/' + item;
    if( isDir_fun( fPath_str ) && item != '.bin' && item != '.staging' && item != '.cache' ){
        let is_boo = false;
        sDirName_arr = getDir_fun( fPath_str );
        handle1_fun( sDirName_arr, item => void ( item == 'package.json' && ( is_boo = true ) ) );
        if( is_boo ){
            handle2_fun( fPath_str + '/package.json' );
        }
        else{
            handle1_fun( sDirName_arr, item => {
                if( isDir_fun( fPath_str + '/' + item ) ){
                    handle2_fun( fPath_str + '/' + item + '/package.json' );
                }
                else{
                    console.warn( '二级目录，不是文件夹' );
                }
            } );
        }
    }
    else{
        console.warn( '一级目录，不是文件夹' );
    }
} );

fs.writeFileSync( outPath_str + 'package.json', JSON.stringify( outContent_obj ) );
