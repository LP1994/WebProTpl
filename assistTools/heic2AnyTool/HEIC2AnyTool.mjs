/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import TopLevelVar4NodeJS2CommonJS from './TopLevelVar4NodeJS2CommonJS.CommonJS.js';

const {
    __filename,
    __dirname,
} = TopLevelVar4NodeJS2CommonJS;

import fs from 'fs';
import path from 'path';
import './HEIFLib.js';

import CanvasTool from 'canvas';

const {
    createCanvas,
} = CanvasTool;

const fsPromises = fs.promises,
    path1_fun = str => path.join( __dirname, str ),
    inDir_str = 'inDir/',
    outDir_str = 'outDir/',
    // 'image/png'、'image/jpeg'
    toType = 'image/png',
    suffix = '.png',
    config = {
        // pngConfig
        // 指定ZLIB压缩级别。默认为6。0-9，值越大，压缩所用的时间越长，但是图片大小越小，且质量都会有所保障。
        compressionLevel: 9,

        // jpegConfig
        // 指定质量，介于0和1之间。默认为0.75。
        // quality: 1,
        // jpegConfig
        // 启用渐进式编码。默认为“false”。
        // progressive: false,
        // jpegConfig
        // 启用2x2色度子采样。默认为“true”。
        // chromaSubsampling: true,
    };

let suffix_str = '',
    fileName_arr = fs.readdirSync( path1_fun( 'inDir' ) )
                     .filter( c => fs.statSync( path1_fun( inDir_str + c ) )
                                     .isFile() )
                     .filter( c => {
                         suffix_str = path.extname( c )
                                          .slice( 1 )
                                          .toLocaleLowerCase();

                         return suffix_str === 'heic' || suffix_str === 'heif';
                     } ),
    index_num = 0,
    imgFileData = null,
    resultBuffer = null,
    promise_ins = arrayBuffer => new Promise( ( resolve = () => {
    }, reject = () => {
    } ) => {
        const decoder = new libheif.HeifDecoder(),
            imagesArr = decoder.decode( arrayBuffer );

        if( !imagesArr || !imagesArr.length ){
            reject( 'format not supported!!!' );
        }

        const primaryImage = imagesArr.find( x => x.is_primary() ) || imagesArr[ 0 ],
            w = primaryImage.get_width(),
            h = primaryImage.get_height(),
            imgCanvas = createCanvas( w, h ),
            ctx = imgCanvas.getContext( '2d', {
                alpha: true,
                pixelFormat: 'RGBA32',
            } );

        if( !ctx ){
            reject( 'Error in canvas context!!!' );
        }

        const whiteImage = ctx.createImageData( w, h );
        for(
            let i = 0;
            i < w * h;
            ++i
        ){
            whiteImage.data[ i * 4 + 3 ] = 255;
        }

        primaryImage.display( whiteImage, display_image_data => {
            ctx.putImageData( display_image_data, 0, 0 );
            imgCanvas.toBuffer( ( err, resultBuffer ) => {
                err && reject( err );
                resultBuffer && resolve( resultBuffer );
            }, toType, config );
        } );

    } );

if( fileName_arr.length !== 0 ){
    ( ( async () => {
        do{
            // imgFileData--->Uint8Array   imgFileData.buffer--->ArrayBuffer
            imgFileData = await fsPromises.readFile( path1_fun( inDir_str + fileName_arr[ index_num ] ) );

            try{
                // resultBuffer--->Uint8Array
                resultBuffer = await promise_ins( imgFileData.buffer );
                await fsPromises.writeFile( `${ path1_fun( outDir_str + fileName_arr[ index_num ] + suffix ) }`, resultBuffer );

                console.log( `${ fileName_arr[ index_num ] }被成功的转换了！！！` );
            }
            catch( e ){
                console.error( e );
            }
            finally{
                ++index_num;
            }
        }
        while( index_num < fileName_arr.length );
    } )() );
}
