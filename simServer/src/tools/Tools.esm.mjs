/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import fs from 'fs';
import url from 'url';
import zlib from 'zlib';
import mime from 'mime';
import path from 'path';
import queryString from 'querystring';
import formidable from 'formidable';

import {
    serverPort9999 as config9999_obj,
    crossResHeader,
} from '../configures/GlobalProp.esm.mjs';

/**
 * 如：输入“file:///G:/WebStormWS/WebProTpl/dist/1.mjs”，输出“G:\WebStormWS\WebProTpl\dist\1.mjs”
 *
 * @param urlStr
 *
 * @returns {string}
 */
function Get__filename( urlStr ){
    return url.fileURLToPath( urlStr );
}

/**
 * 如：输入“file:///G:/WebStormWS/WebProTpl/dist/1.mjs”，输出“G:\WebStormWS\WebProTpl\dist”
 *
 * @param urlStr
 *
 * @returns {string}
 */
function Get__dirname( urlStr ){
    return path.dirname( Get__filename( urlStr ) );
}

const __filename = Get__filename( import.meta.url ),
    __dirname = Get__dirname( import.meta.url );

function URLTool( url_str = '' ){
    const url_objC = url.parse( url_str ),
        pathName_strC = url_objC.pathname,
        query_objC = queryString.parse( url_objC.query );

    return {
        urlObj: url_objC,
        pathNameStr: pathName_strC,
        queryObj: query_objC,
    };
}

/**
 * @return {boolean}
 */
function IsGZip( request = null ){
    return request.headers && request.headers[ 'accept-encoding' ] && request.headers[ 'accept-encoding' ].includes( 'gzip' );
}

function SetHeaders( response = null, crossResHeader_obj = {} ){
    Object.entries( Object.assign( crossResHeader, crossResHeader_obj ) )
          .forEach( c => void ( response.setHeader( ...c ) ) );
}

function RemGZip( response = null ){
    const encoding_strC = response.getHeader( 'Content-Encoding' ) || '';

    if( encoding_strC.includes( 'gzip' ) ){
        const encoding_arrC = encoding_strC.split( ',' )
                                           .map( c => c.trim() );

        encoding_arrC.splice( encoding_arrC.indexOf( 'gzip' ), 1, );
        response.removeHeader( 'Content-Encoding' );
        SetHeaders( response, {
            'Content-Encoding': encoding_arrC.join( ',' ),
        } );
    }

    ( response.getHeader( 'Content-Encoding' ) || '' ).trim() === '' && response.removeHeader( 'Content-Encoding' );
}

function CreGZip( opt = {} ){
    return zlib.createGzip( Object.assign( {
        level: 5,
        memLevel: 5,
    }, opt ) );
}

/**
 * @return {boolean}
 */
function URL4RegExp1( dirName_str = 'StaticResources', pathName_str = '' ){
    return new RegExp( `[\\\\/]${ config9999_obj.serverName }[\\\\/]${ dirName_str }[\\\\/].*\\.([a-z|A-Z|0-9])`, 'g' ).test( pathName_str );
}

function ToFilePath( path_str = '' ){
    return path.resolve( path_str, '' );
}

function ExistsFile( filePath_str = '' ){
    return fs.existsSync( filePath_str );
}

/**
 * @return {string}
 */
function GetMIMEType( filePath_str = '' ){
    return mime.getType( filePath_str ) || 'application/octet-stream';
}

/**
 * @return {string}
 */
function GetExt4MIMEType( mimeType_str = '' ){
    return mime.getExtension( mimeType_str );
}

/**
 * @return {boolean}
 */
function IsImg( filePath_str = '' ){
    return /\.(jng|bmp|dcx|gif|icns|ico|jbig2|jpe|jpeg|jpg|pam|pbm|pcx|pgm|png|pnm|ppm|psd|rgbe|tga|tif|tiff|wbmp|xbm|xpm|svg|svgz|webp|heif|heic)$/.test( filePath_str );
}

function CreateFormidable( { uploadDir = path.join( __dirname, '../../uploadResources/others/' ), multiples = true, hash = false, maxFields = 0, maxFileSize = 100 * 1024 * 1024 * 1024, maxFieldsSize = 100 * 1024 * 1024 * 1024, keepExtensions = true } = {} ){
    let form_obj = new formidable.IncomingForm();
    form_obj.keepExtensions = keepExtensions;
    form_obj.maxFieldsSize = maxFieldsSize;
    form_obj.maxFileSize = maxFileSize;
    form_obj.maxFields = maxFields;
    form_obj.hash = hash;
    form_obj.multiples = multiples;
    form_obj.uploadDir = uploadDir;

    return form_obj;
}

export {
    URLTool,
    IsGZip,
    SetHeaders,
    RemGZip,
    CreGZip,
    URL4RegExp1,
    ToFilePath,
    ExistsFile,
    GetMIMEType,
    GetExt4MIMEType,
    IsImg,
    CreateFormidable,
    Get__filename,
    Get__dirname,
};
