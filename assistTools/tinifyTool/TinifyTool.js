/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 图片压缩工具！图片大小只能是小于5M的。只支持后缀名为“.png”、“.jpe”、“.jpeg”、“.jpg”的图片。

const Tinify = require( 'tinify' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    inDirFileName_arrC = fs.readdirSync( path.join( __dirname, './inDir' ) ),
    maxSize_num = 5 * 1024 * 1024;

let suffix_str = '',
    inDirFileSrc_str = '';

Tinify.key = '0s9wNbBqccdXS2z9x45Z92MLy0t2J6ln';

inDirFileName_arrC.forEach( c => {
    suffix_str = path.extname( c )
                     .slice( 1 )
                     .toLocaleLowerCase();
    inDirFileSrc_str = path.join( __dirname, `./inDir/${ c }` );

    if( fs.statSync( inDirFileSrc_str ).size < maxSize_num ){
        if( suffix_str === 'png' || suffix_str === 'jpe' || suffix_str === 'jpeg' || suffix_str === 'jpg' ){
            Tinify.fromFile( inDirFileSrc_str )
                  .toFile( path.join( __dirname, `./outDir/${ c }` ) );
        }
        else{
            console.error( '只支持后缀名为“.png”、“.jpe”、“.jpeg”、“.jpg”的图片。' );
        }
    }
    else{
        console.error( '图片大小只能是小于5M的。' );
    }
} );

/*
 fs.readFile( 'unoptimized.jpg', ( err, sourceData ) => {
 if( err ){
 throw err;
 }

 Tinify.fromBuffer( sourceData )
 .toBuffer( ( err, resultData ) => {
 if( err ){
 throw err;
 }
 } );
 } );
 */

/*
 const source_C = Tinify.fromUrl( '' );
 source_C.toFile( '' );
 */
