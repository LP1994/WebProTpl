/**
 * Project: sn-micro-front-web-project-template
 * Author：12278
 * Email：1227839175@qq.com
 * CreateDate：2020-06-01 00:00:00
 * IDE: WebStorm
 */

/**
 * 动态更新“GraphQL.Schema.json”。
 *
 * 开发服(端口：8081)：
 * http://192.168.1.144:8081/graphql/schema.json
 * 开发服(端口：8099)：
 * http://192.168.1.144:8099/graphql/schema.json
 * 测试服：
 * http://192.168.1.101:8080/graphql/schema.json
 */

'use strict';

const fs = require( 'fs' ),
    path = require( 'path' ),
    http = require( 'http' );

const jsonPath_strC = path.join( __dirname, '../../src/graphQL/GraphQL.Schema.json' ),
    mySchemaJSONGraphQL = JSON.stringify( {
        query: fs.readFileSync( path.join( __dirname, '../../src/graphQL/api/SchemaJSON.graphql' ), {
            encoding: 'utf8',
        } ),
    } );

// 获取"系统默认"的"GraphQL的Schema文档"
if( true ){
    // 开发服(端口：8081) http://192.168.1.144:8081/graphql/schema.json
    const devURL = {
            host: '192.168.1.144',
            port: '8081',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 开发服(端口：8099) http://192.168.1.144:8099/graphql/schema.json
        devURL8099 = {
            host: '192.168.1.144',
            port: '8099',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 开发服(连刘家敏的台式机无线，端口：8099) http://192.168.137.135:8099/graphql/schema.json
        devURL8099A = {
            host: '192.168.137.135',
            port: '8099',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 测试服 http://192.168.1.101:8080/graphql/schema.json
        testURL = {
            host: '192.168.1.101',
            port: '8080',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 内网穿透 http://sn2020a.nat300.top/graphql/schema.json
        devURL2Natapp = {
            host: 'sn2020a.nat300.top',
            port: '80',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 邓龙光(连接开发机无线网络时的IP) http://192.168.137.77:8090/graphql/schema.json
        devURL4DLG1 = {
            host: '192.168.137.77',
            port: '8090',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 梁鑫(连接开发机无线网络时的IP) http://192.168.137.217:8090/graphql/schema.json
        devURL4LX1 = {
            host: '192.168.137.217',
            port: '8090',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 戴海涛 http://192.168.1.147:8081/graphql/schema.json
        devURL4DHT = {
            host: '192.168.1.147',
            port: '8081',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        };

    function Update4GraphQLSchemaJSON( opt = {} ){
        return new Promise( ( resolve = () => {
        }, reject = () => {
        } ) => void ( http.get( opt, res => {
                              const {
                                  statusCode,
                              } = res;
                              const contentType = res.headers[ 'content-type' ];

                              let error = null;

                              if( statusCode !== 200 ){
                                  error = new Error( 'Request Failed.\n' + `Status Code: ${ statusCode }` );
                              }
                              else if( !/^application\/json/.test( contentType ) ){
                                  error = new Error( 'Invalid content-type.\n' + `Expected application/json but received ${ contentType }` );
                              }

                              if( error ){
                                  // 使用响应数据释放内存
                                  res.resume();

                                  return error;
                              }

                              res.setEncoding( 'utf8' );

                              let rawData = '';

                              res.on( 'data', chunk => void ( rawData += chunk ) );

                              res.on( 'end', () => {
                                  try{
                                      resolve( JSON.parse( rawData ) );
                                  }
                                  catch( e ){
                                      reject( e );
                                  }
                              } );
                          } )
                          .on( 'error', e => void ( reject( e ) ) ) ) );
    }

    // 根据需要自己选取用哪个：
    // option4Dev_objC
    // option4Dev2Natapp_objC
    // option4Test_objC
    // option4WWC_objC
    Update4GraphQLSchemaJSON( devURL8099A )
        .then( result => void ( fs.writeFileSync( jsonPath_strC, JSON.stringify( Object.assign( {
            __schema: {},
        }, result.data ) ) ) ) )
        .catch( e => void ( console.error( e ) ) );
}

// 获取"自己定义"的更加全面详细的"GraphQL的Schema文档"
if( false ){
    // 开发服(端口：8081) http://192.168.1.144:8081/graphql/
    const devURL = {
            host: '192.168.1.144',
            port: '8081',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 开发服(端口：8099) http://192.168.1.144:8099/graphql/
        devURL8099 = {
            host: '192.168.1.144',
            port: '8099',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 开发服(连刘家敏的台式机无线，端口：8099) http://192.168.137.135:8099/graphql/
        devURL8099A = {
            host: '192.168.137.135',
            port: '8099',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 测试服 http://192.168.1.101:8080/graphql/
        testURL = {
            host: '192.168.1.101',
            port: '8080',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 内网穿透 http://sn2020a.nat300.top/graphql/
        devURL2Natapp = {
            host: 'sn2020a.nat300.top',
            port: '80',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 邓龙光(连接开发机无线网络时的IP) http://192.168.137.77:8090/graphql/
        devURL4DLG1 = {
            host: '192.168.137.77',
            port: '8090',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 梁鑫(连接开发机无线网络时的IP) http://192.168.137.217:8090/graphql/
        devURL4LX1 = {
            host: '192.168.137.217',
            port: '8090',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        // 戴海涛 http://192.168.1.147:8081/graphql/
        devURL4DHT = {
            host: '192.168.1.147',
            port: '8081',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        };

    function Update4GraphQLSchemaJSON( opt = {} ){
        return new Promise( ( resolve = () => {
        }, reject = () => {
        } ) => {
            const req = http.request( opt, res => {
                const {
                    statusCode,
                } = res;
                const contentType = res.headers[ 'content-type' ];

                let error = null;

                if( statusCode !== 200 ){
                    error = new Error( 'Request Failed.\n' + `Status Code: ${ statusCode }` );
                }
                else if( !/^application\/json/.test( contentType ) ){
                    error = new Error( 'Invalid content-type.\n' + `Expected application/json but received ${ contentType }` );
                }

                if( error ){
                    // 使用响应数据释放内存
                    res.resume();

                    return error;
                }

                res.setEncoding( 'utf8' );

                let rawData = '';

                res.on( 'data', chunk => void ( rawData += chunk ) );

                res.on( 'end', () => {
                    try{
                        resolve( JSON.parse( rawData ) );
                    }
                    catch( e ){
                        reject( e );
                    }
                } );
            } );

            req.on( 'error', e => void ( reject( e ) ) );

            req.write( mySchemaJSONGraphQL );

            req.end();
        } );
    }

    // 根据需要自己选取用哪个：
    // option4Dev_objC
    // option4Dev2Natapp_objC
    // option4Test_objC
    // option4WWC_objC
    Update4GraphQLSchemaJSON( devURL2Natapp )
        .then( result => void ( fs.writeFileSync( jsonPath_strC, JSON.stringify( Object.assign( {
            __schema: {},
        }, result.data ) ) ) ) )
        .catch( e => void ( console.error( e ) ) );
}
