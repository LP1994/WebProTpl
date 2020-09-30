/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import {
    FileBtn,
} from 'CompESM';

let CT = new CTESM.CT();
let {
    WebService4Proxy,
} = CT.getClass();

// devURL4WWC devURL4Test devURL4Dev
const webService_ins = new WebService4Proxy( CT, `${ devURL4Dev }` ),
    post4JSON = webService_ins.post( {
        type: 'json',
    } ),
    requestOpt = {
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
        },
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-cache',
    };

{
    if( false ){
        let formData = new FormData();
        formData.append( 'id', '2020010101' );
        formData.append( 'date', '2020年01月01日 18时00分00秒 周六' );
        formData.append( 'title', '这是一张“.HEIC”格式的图片' );

        FileBtn.call( CT, {
            id: '#HEICImg',
            accept: 'image/heic, image/heif',
            multiple: true,
            onChange: {
                event( event, filesArr ){
                    if( filesArr.length > 0 ){
                        Array.from( filesArr )
                             .forEach( ( c, i, a ) => void ( formData.append( 'img', c, c.name ) ) );

                        CT.fetch( 'http://localhost:9999/SimServer/POST', {
                            success( data4ResponseType, response ){
                                console.dir( data4ResponseType );
                            },
                        }, {
                            method: 'POST',
                            responseType: 'json',
                            mode: 'cors',
                            credentials: 'omit',
                            body: formData,
                        } );
                    }
                },
            },
        } );
    }
}

// GETFile?type=img
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=img', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.fileOrBlobToDataURL( new Blob( [ data4ResponseType ], {
                    type: 'image/vnd.microsoft.icon',
                } ), ( dataURL, event, fileReader ) => {
                    let img = CT.dataURLToImg( dataURL );
                    img.style = 'width: 100%; height: auto;';

                    CT.iInsertB( 'html.helloWorld #HelloWorld article', img );
                } );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=zip
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=zip', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/x-7z-compressed',
                } ), '1.7z' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=apps
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=apps', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/octet-stream',
                } ), '1.exe' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=xlsx
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=xlsx', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                } ), '1.xlsx' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=docx
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=docx', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/msword',
                } ), '1.doc' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// ajax
{
    if( false ){
        CT.postAjax( 'http://localhost:9999/SimServer/POST', {
            sendData: JSON.stringify( {
                type: 'json',
            } ),
            responseType: 'json',
            requestHeader: { 'Content-Type': 'application/json', },
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }

    if( false ){
        CT.deleteAjax( 'http://localhost:9999/SimServer/DELETE', {
            sendData: JSON.stringify( {
                type: 'json',
            } ),
            responseType: 'json',
            requestHeader: { 'Content-Type': 'application/json', },
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }

    if( false ){
        CT.putAjax( 'http://localhost:9999/SimServer/PUT', {
            sendData: JSON.stringify( {
                type: 'json',
            } ),
            responseType: 'json',
            requestHeader: { 'Content-Type': 'application/json', },
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }

    if( false ){
        CT.getAjax( 'http://localhost:9999/SimServer/GET', {
            sendData: {
                type: 'json',
            },
            responseType: 'json',
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }
}
