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

// 在这里配置POST请求的路由控制，key是URL请求路径，value是对应的JS路径，是相对于本JS的路径。
const routers4Post_objC = ( ( obj => {
    let resultObj = {};

    Object.keys( obj )
          .forEach( ( c, i, a ) => void ( resultObj[ c + '/' ] = obj[ c ] ) );

    return Object.assign( obj, resultObj );
} )( Object.assign( request4Config_objC.post, {
    [ `/${ config9999_obj.serverName }/POST` ]: '../controllers/POST.esm.mjs',
} ) ) );

function Interceptor4Post( server, request, response ){
    const {
        pathNameStr,
    } = URLTool( request.url );

    if( pathNameStr in routers4Post_objC ){
        import(routers4Post_objC[ pathNameStr ]).then( ( { default: defaultObj, } ) => void ( defaultObj( server, request, response ) ) );
    }
    else{
        new InterceptorError( server, request, response ).http404();
    }
}

export {
    Interceptor4Post,
};

export default Interceptor4Post;
