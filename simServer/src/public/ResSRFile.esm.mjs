/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import fs from 'fs';
import buffer from 'buffer';

import {
    IsGZip,
    SetHeaders,
    RemGZip,
    CreGZip,
    GetMIMEType,
    IsImg,
    URLTool,
} from '../tools/Tools.esm.mjs';

class ResSRFile {

    #server = null;
    #request = null;
    #response = null;
    /*
     fs.createReadStream( htmlPath_str, {
     // highWaterMark: _this.#bufferSize_num,
     } );

     PS：
     highWaterMark设置为：buffer.constants.MAX_LENGTH - 7
     会导致内存、CPU狂增！！！10G左右！！！

     1 * 1024 * 1024 * 1024 = 1GB
     buffer.constants.MAX_LENGTH = 2GB
     要是设置了buffer.constants.MAX_LENGTH，不报错、也不执行，直接结束了，奇怪！！！
     */
    #bufferSize_num = 1 * 1024 * 1024 * 1024;

    url = null;

    constructor( server = null, request = null, response = null, ){
        let _this = this;

        _this.#server = server;
        _this.#request = request;
        _this.#response = response;

        _this.url = decodeURI( URLTool( request.url ).pathNameStr );
    }

    readStreamEvent( readStream ){
        let _this = this,
            readStream_obj = readStream,
            chunk_buf = null;

        readStream_obj.on( 'open', fd => {
            console.log( `文件已打开(${ _this.url })：${ fd }！！！` );
        } );

        readStream_obj.on( 'ready', () => {
            console.log( `文件已准备好--->${ _this.url }` );
        } );

        readStream_obj.on( 'readable', () => {
            while( null !== ( chunk_buf = readStream_obj.read( _this.#bufferSize_num ) ) ){
                console.log( `readable--->${ _this.url }<---Start` );

                console.log( `数据块大小(单位：字节)：${ chunk_buf.length }(${ chunk_buf.length / 1024 / 1024 }MB、${ chunk_buf.length / 1024 / 1024 / 1024 }GB)！！！` );
                console.log( `数据流大小(单位：字节)：${ readStream_obj.bytesRead }(${ readStream_obj.bytesRead / 1024 / 1024 }MB、${ readStream_obj.bytesRead / 1024 / 1024 / 1024 }GB)！！！` );

                console.log( `readable--->${ _this.url }<---End` );
            }
        } );

        readStream_obj.on( 'data', chunk => {
            console.log( `data--->${ _this.url }<---Start` );

            console.log( `数据块大小(单位：字节)：${ chunk.length }(${ chunk.length / 1024 / 1024 }MB、${ chunk.length / 1024 / 1024 / 1024 }GB)！！！` );
            console.log( `数据流大小(单位：字节)：${ readStream_obj.bytesRead }(${ readStream_obj.bytesRead / 1024 / 1024 }MB、${ readStream_obj.bytesRead / 1024 / 1024 / 1024 }GB)！！！` );

            console.log( `data--->${ _this.url }<---End` );
        } );

        readStream_obj.on( 'end', () => {
            console.log( `文件读取已完成--->${ _this.url }` );
        } );

        readStream_obj.on( 'close', () => {
            console.log( `文件已关闭--->${ _this.url }` );
        } );

        readStream_obj.on( 'error', error => {
            console.log( `error--->${ _this.url }<---Start!!!` );
            console.error( error );
            console.log( `error--->${ _this.url }<---End!!!` );
        } );
    }

    html4Path( htmlPath_str = '', contentType_str = GetMIMEType( htmlPath_str ) ){
        let _this = this,
            /*
             highWaterMark设置为：buffer.constants.MAX_LENGTH - 7
             会导致内存、CPU狂增！！！10G左右！！！

             1 * 1024 * 1024 * 1024 = 1GB
             buffer.constants.MAX_LENGTH = 2GB
             要是设置了buffer.constants.MAX_LENGTH，不报错、也不执行，直接结束了，奇怪！！！
             */
            stream = fs.createReadStream( htmlPath_str, {
                // highWaterMark: _this.#bufferSize_num,
            } );

        /*_this.readStreamEvent( stream );*/

        SetHeaders( _this.#response, {
            'Content-Type': contentType_str,
        } );

        if( IsGZip( _this.#request ) ){
            SetHeaders( _this.#response, {
                'Content-Encoding': 'gzip',
            } );
            stream.pipe( CreGZip() )
                  .pipe( _this.#response );
        }
        else{
            RemGZip( _this.#response );
            stream.pipe( _this.#response );
        }

        _this.#response.statusCode = 200;
        _this.#response.statusMessage = 'OK';
    }

    img4Path( img4Path_str = '', contentType_str = GetMIMEType( img4Path_str ) ){
        let _this = this;

        SetHeaders( _this.#response, {
            'Content-Type': contentType_str,
        } );
        RemGZip( _this.#response );
        /*
         highWaterMark设置为：buffer.constants.MAX_LENGTH - 7
         会导致内存、CPU狂增！！！10G左右！！！

         1 * 1024 * 1024 * 1024 = 1GB
         buffer.constants.MAX_LENGTH = 2GB
         要是设置了buffer.constants.MAX_LENGTH，不报错、也不执行，直接结束了，奇怪！！！
         */
        fs.createReadStream( img4Path_str, {
              // highWaterMark: _this.#bufferSize_num,
          } )
          .pipe( _this.#response );

        _this.#response.statusCode = 200;
        _this.#response.statusMessage = 'OK';
    }

    file4Path( filePath_str = '', contentType_str = GetMIMEType( filePath_str ) ){
        let _this = this;

        console.log( `response的Content-Type--->${ contentType_str }` );

        if( IsImg( filePath_str ) ){
            _this.img4Path( filePath_str, contentType_str );
        }
        else{
            _this.html4Path( filePath_str, contentType_str );
        }
    }

}

export {
    ResSRFile,
};

export default ResSRFile;
