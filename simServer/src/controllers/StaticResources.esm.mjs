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
    ToFilePath,
    ExistsFile,
} from '../tools/Tools.esm.mjs';
import ResSRFile from '../public/ResSRFile.esm.mjs';
import InterceptorError from '../interceptors/InterceptorError.esm.mjs';

function StaticResources( server, request, response ){
    const {
        pathNameStr,
    } = URLTool( request.url );

    const filePath_str = ToFilePath( config9999_obj.srPath + decodeURI( pathNameStr )
        .slice( 3 + config9999_obj.serverName.trim().length + 'StaticResources'.length ) );

    if( ExistsFile( filePath_str ) ){
        new ResSRFile( server, request, response ).file4Path( filePath_str );
    }
    else{
        new InterceptorError( server, request, response ).http404();
    }

}

export {
    StaticResources,
};

export default StaticResources;
