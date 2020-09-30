/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import { serverPort9999 as config9999_obj } from '../configures/GlobalProp.esm.mjs';
import {
    URLTool,
} from '../tools/Tools.esm.mjs';
import { request4Config_objC } from './Request4Config.esm.mjs';
import InterceptorError from './InterceptorError.esm.mjs';

// 在这里配置DELETE请求的路由控制，key是URL请求路径，value是对应的JS路径，是相对于本JS的路径。
const routers4Delete_objC = ( ( obj => {
    let resultObj = {};

    Object.keys( obj )
          .forEach( ( c, i, a ) => void ( resultObj[ c + '/' ] = obj[ c ] ) );

    return Object.assign( obj, resultObj );
} )( Object.assign( request4Config_objC.delete, {
    [ `/${ config9999_obj.serverName }/DELETE` ]: '../controllers/DELETE.esm.mjs',
} ) ) );

function Interceptor4Delete( server, request, response ){
    const {
        pathNameStr,
    } = URLTool( request.url );

    if( pathNameStr in routers4Delete_objC ){
        import(routers4Delete_objC[ pathNameStr ]).then( ( { default: defaultObj, } ) => void ( defaultObj( server, request, response ) ) );
    }
    else{
        new InterceptorError( server, request, response ).http404();
    }
}

export {
    Interceptor4Delete,
};

export default Interceptor4Delete;
