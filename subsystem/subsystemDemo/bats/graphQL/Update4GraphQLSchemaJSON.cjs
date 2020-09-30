/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

/**
 * 动态更新“GraphQL.Schema.json”。
 *
 * 开发：
 * http://192.168.1.144:8081/graphql/schema.json
 * 内网穿透的，指向开发的：
 * http://sn2020a.nat300.top/graphql/schema.json
 * 测试：
 * http://192.168.1.125:8080/graphql/schema.json
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
    const option4Dev_objC = {
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
        option4Dev2Natapp_objC = {
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
        option4Test_objC = {
            host: '192.168.1.125',
            port: '8080',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4HZJ_objC = {
            host: '192.168.1.76',
            port: '8080',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4LDM_objC = {
            host: '192.168.1.100',
            port: '8081',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4DLG_objC = {
            host: '192.168.1.47',
            port: '8099',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4HD1_objC = {
            host: '192.168.1.147',
            port: '8081',
            path: '/graphql/schema.json',
            method: 'GET',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4HD2_objC = {
            host: '192.168.1.49',
            port: '8099',
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
    Update4GraphQLSchemaJSON( option4Dev2Natapp_objC )
        .then( result => void ( fs.writeFileSync( jsonPath_strC, JSON.stringify( Object.assign( {
            __schema: {},
        }, result.data ) ) ) ) )
        .catch( e => void ( console.error( e ) ) );
}

// 获取"自己定义"的更加全面详细的"GraphQL的Schema文档"
if( false ){
    const option4Dev_objC = {
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
        option4Dev2Natapp_objC = {
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
        option4Test_objC = {
            host: '192.168.1.125',
            port: '8080',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4HZJ_objC = {
            host: '192.168.1.76',
            port: '8080',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4LDM_objC = {
            host: '192.168.1.100',
            port: '8081',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4DLG_objC = {
            host: '192.168.1.47',
            port: '8099',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4HD1_objC = {
            host: '192.168.1.147',
            port: '8081',
            path: '/graphql/',
            method: 'POST',
            headers: {
                'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
        },
        option4HD2_objC = {
            host: '192.168.1.49',
            port: '8099',
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
    Update4GraphQLSchemaJSON( option4Dev2Natapp_objC )
        .then( result => void ( fs.writeFileSync( jsonPath_strC, JSON.stringify( Object.assign( {
            __schema: {},
        }, result.data ) ) ) ) )
        .catch( e => void ( console.error( e ) ) );
}
