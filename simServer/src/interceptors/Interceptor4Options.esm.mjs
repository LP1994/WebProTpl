/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import {
    SetHeaders,
    RemGZip,
} from '../tools/Tools.esm.mjs';

function Interceptor4Options( server, request, response ){
    SetHeaders( response );
    response.removeHeader( 'Content-Type' );
    RemGZip( response );
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.end();
}

export {
    Interceptor4Options,
};

export default Interceptor4Options;
