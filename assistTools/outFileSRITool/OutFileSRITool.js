/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 根据文件输出这个文件的SRI值！！！把文件放到dir文件夹里！结果会存在OutFileSRITool.json里！运行“OutFileSRITool.bat”就行！

const startTime_num = Date.now();

const fs = require( 'fs' ),
    path = require( 'path' ),
    crypto = require( 'crypto' ),
    buffer = require( 'buffer' ),
    // 1 * 1024 * 1024 * 1024 = 1GB
    // buffer.constants.MAX_LENGTH = 2GB
    // 要是设置了buffer.constants.MAX_LENGTH，不报错、也不执行，直接结束了，奇怪！！！
    bufferSize_numC = 1 * 1024 * 1024 * 1024,
    dirPath_str = path.join( __dirname, 'dir' ),
    fileName_arr = fs.readdirSync( dirPath_str )
                     .filter( c => fs.statSync( `${ dirPath_str }/${ c }` )
                         .size !== 0 );

console.log( `buffer.constants.MAX_LENGTH--->${ buffer.constants.MAX_LENGTH }` );

function GetPromiseIns( fileSrc_str = '', hash2Digest1_obj = { sha512: { hex: '', }, } ){
    let readStream_obj = null,
        readStreamByte_num = null,
        chunk_buf = null,
        chunkBuf_num = null,
        hash_objArr = null,
        hash2Digest_obj = null,
        hash2Digest4Keys_arr = null;

    return new Promise( ( resolve = ( result_obj = {}, isSuccess_boo = false ) => {
    }, reject = error => {
    } ) => {
        readStream_obj = fs.createReadStream( fileSrc_str, {
            // highWaterMark: bufferSize_numC,
        } );
        hash2Digest_obj = JSON.parse( JSON.stringify( hash2Digest1_obj ) );
        hash2Digest4Keys_arr = Object.keys( hash2Digest_obj );
        hash_objArr = hash2Digest4Keys_arr.map( c => Object.keys( hash2Digest_obj[ c ] )
                                                           .map( () => crypto.createHash( c ) ) );

        readStream_obj.on( 'open', fd => {
            console.log( `文件已打开：${ fd }！！！` );
        } );

        readStream_obj.on( 'ready', () => {
            console.log( '文件已准备好！！！' );
        } );

        readStream_obj.on( 'readable', () => {
            while( null !== ( chunk_buf = readStream_obj.read( bufferSize_numC ) ) ){
                hash_objArr.flat( Infinity )
                           .forEach( c => void ( c[ 'update' ]( chunk_buf ) ) );

                chunkBuf_num = chunk_buf.length / 1024 / 1024;
                readStreamByte_num = readStream_obj.bytesRead / 1024 / 1024;

                console.log( `数据块大小(单位：字节)：${ chunk_buf.length }(${ chunkBuf_num }MB、${ chunkBuf_num / 1024 }GB)！！！` );
                console.log( `数据流大小(单位：字节)：${ readStream_obj.bytesRead }(${ readStreamByte_num }MB、${ readStreamByte_num / 1024 }GB)！！！` );
            }
        } );

        readStream_obj.on( 'end', () => {
            console.log( '文件读取已完成！！！' );
        } );

        readStream_obj.on( 'close', () => {
            Object.values( hash2Digest_obj )
                  .forEach( ( c, i, ) => void ( Object.keys( c )
                                                      .forEach( ( c1, i1, ) => void ( hash2Digest_obj[ hash2Digest4Keys_arr[ i ] ][ c1 ] = `${ hash2Digest4Keys_arr[ i ] }-${ hash_objArr[ i ][ i1 ].digest( c1 ) }` ) ) ) );

            resolve( [
                hash2Digest_obj,
                true,
            ] );

            console.log( '文件已关闭！！！' );
        } );

        readStream_obj.on( 'error', error => {
            resolve( [
                {},
                false,
            ] );

            console.error( error );
        } );
    } );
}

/**
 * @return {string}
 */
async function Go( fileName_arr = [], hash2Digest_obj = { sha512: { hex: '', }, } ){
    if( fileName_arr.length !== 0 ){
        let outSRI_obj = {},
            index4Suc_num = 0,
            indexUnSuc_num = 0,
            index_num = 0;

        do{
            let [ result_obj, isSuccess_boo ] = await GetPromiseIns( `${ dirPath_str }/${ fileName_arr[ index_num ] }`, hash2Digest_obj );

            isSuccess_boo && ( outSRI_obj[ fileName_arr[ index_num ] ] = result_obj, ++index4Suc_num );
            !isSuccess_boo && ( ++indexUnSuc_num );

            console.log( `<------第${ index_num + 1 }个文件(${ fileName_arr[ index_num ] })处理${ isSuccess_boo
                                                                                            ? '成功'
                                                                                            : '失败' }！！！------>` );

            ++index_num;
        }
        while( index_num < fileName_arr.length );

        if( index_num === indexUnSuc_num ){
            return [
                '都没成功！！！',
                {},
                false,
            ];
        }
        else{
            return [
                `本次一共处理了${ index_num }个文件，成功的有${ index4Suc_num }个，失败的有${ indexUnSuc_num }个！！！`,
                outSRI_obj,
                true,
            ];
        }
    }
    else{
        return [
            '没有非空文件要处理！！！',
            {},
            false,
        ];
    }
}

Go( fileName_arr, {
    sha256: {
        hex: '',
        base64: '',
    },
    sha384: {
        hex: '',
        base64: '',
    },
    sha512: {
        hex: '',
        base64: '',
    },
} )
    .then( ( [ message_str, outSRI_obj, boo, ] ) => {
        const endTime_num = ( Date.now() - startTime_num ) / 1000;

        boo && fs.writeFileSync( path.join( __dirname, './OutFileSRITool.json' ), JSON.stringify( outSRI_obj ) );

        console.log( `总共耗时${ endTime_num }秒、${ endTime_num / 60 }分钟！！！` );

        console.log( message_str );
    }, error => {
        console.error( error );
    } );
