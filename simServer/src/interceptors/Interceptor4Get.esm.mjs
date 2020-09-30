/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import {
    serverPort9999 as config9999_obj,
} from '../configures/GlobalProp.esm.mjs';
import {
    URLTool,
    URL4RegExp1,
} from '../tools/Tools.esm.mjs';
import { request4Config_objC } from './Request4Config.esm.mjs';
import InterceptorError from './InterceptorError.esm.mjs';

// 在这里配置GET请求的路由控制，key是URL请求路径，value是对应的JS路径，是相对于本JS的路径。
const routers4Get_objC = ( ( obj => {
    let resultObj = {};

    Object.keys( obj )
          .forEach( ( c, i, a ) => void ( resultObj[ c + '/' ] = obj[ c ] ) );

    return Object.assign( obj, resultObj );
} )( Object.assign( request4Config_objC.get, {
    [ `/${ config9999_obj.serverName }/GETFile` ]: '../controllers/GETFile.esm.mjs',
    [ `/${ config9999_obj.serverName }/GET` ]: '../controllers/GET.esm.mjs',
    [ `/${ config9999_obj.serverName }/GetGenymotionDevicesList` ]: '../controllers/GetGenymotionDevicesList.esm.mjs',
    [ `/${ config9999_obj.serverName }/VueSSR/Index.html` ]: '../controllers/vueSSR/VueSSR.esm.mjs',
} ) ) );

async function Interceptor4Get( server, request, response ){
    const {
        pathNameStr,
    } = URLTool( request.url );

    if( URL4RegExp1( 'StaticResources', decodeURI( pathNameStr ) ) ){
        const { StaticResources } = await import('../controllers/StaticResources.esm.mjs');

        StaticResources( server, request, response );
    }
    else if( URL4RegExp1( 'WebPro', decodeURI( pathNameStr ) ) ){
        const { WebPro } = await import('../controllers/WebPro.esm.mjs');

        WebPro( server, request, response );
    }
    else if( pathNameStr in routers4Get_objC ){
        import(routers4Get_objC[ pathNameStr ]).then( ( { default: defaultObj, } ) => void ( defaultObj( server, request, response ) ) );
    }
    else{
        new InterceptorError( server, request, response ).http404();
    }
}

export {
    Interceptor4Get,
};

export default Interceptor4Get;
