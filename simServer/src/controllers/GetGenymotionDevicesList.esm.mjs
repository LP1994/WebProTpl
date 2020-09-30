/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import {
    RemGZip,
    SetHeaders,
} from '../tools/Tools.esm.mjs';

async function GetResult( url ){
    let resultList = await import(url).then( ( { default: { genymotionDevicesList } } ) => {
        let result_obj = {},
            arr1 = [],
            obj1 = {
                'url': [],
                'text': ``
            },
            j;

        genymotionDevicesList.forEach( ( { vmtemplate_uuid, system_version: { system_version_uuid, ova_name, }, }, i, a ) => {
            if( vmtemplate_uuid in result_obj ){
                result_obj[ vmtemplate_uuid ].push( genymotionDevicesList[ i ], );
            }
            else{
                result_obj[ vmtemplate_uuid ] = [ genymotionDevicesList[ i ], ];
            }
        } );

        Object.entries( result_obj )
              .forEach( ( [ keyName, keyValue ], i, a ) => {
                  arr1 = keyValue;

                  keyValue.forEach( ( { vmtemplate_uuid, system_version: { system_version_uuid, ova_name, }, }, index, array ) => {
                      for(
                          j = index + 1;
                          j < keyValue.length;
                          ++j
                      ){
                          if( system_version_uuid === keyValue[ j ][ 'system_version' ][ 'system_version_uuid' ] ){
                              delete arr1[ j ];
                          }
                      }
                  } );

                  obj1[ 'url' ].push( ...arr1.filter( c => c )
                                             .map( ( { vmtemplate_uuid, system_version: { system_version_uuid, ova_name, aosp_version, }, }, i, a ) => {
                                                 return `https://dl.genymotion.com/dists/${ aosp_version }/ova/${ ova_name }`;
                                             } ) );
              } );

        obj1[ 'url' ] = Array.from( new Set( obj1[ 'url' ] ) );
        obj1[ 'text' ] = obj1[ 'url' ].join( '\n' );

        return obj1;
    } );

    return resultList;
}

async function GetGenymotionDevicesList( server, request, response ){
    let result = {};
    let obj1 = await GetResult( '../../staticResources/json/GenymotionDevicesList1.json' );
    let obj2 = await GetResult( '../../staticResources/json/GenymotionDevicesList2.json' );

    result[ 'url' ] = Array.from( new Set( [].concat( obj1[ 'url' ], obj2[ 'url' ] ) ) )
                           .sort();
    result[ 'text' ] = result[ 'url' ].join( '\n' );

    SetHeaders( response, {
        'Content-Type': 'application/json',
    } );
    RemGZip( response );
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.end( JSON.stringify( result ), 'utf8' );
}

export {
    GetGenymotionDevicesList,
};

export default GetGenymotionDevicesList;
