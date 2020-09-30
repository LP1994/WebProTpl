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
import ResSRFile from '../public/ResSRFile.esm.mjs';

class InterceptorError {

    #server = null;
    #request = null;
    #response = null;

    constructor( server = null, request = null, response = null, ){
        let _this = this;

        _this.#server = server;
        _this.#request = request;
        _this.#response = response;
    }

    httpMethods(){
        let _this = this;

        new ResSRFile( _this.#server, _this.#request, _this.#response ).html4Path( config9999_obj.error4ReqMethod2PagePath );
    }

    http404(){
        let _this = this;

        new ResSRFile( _this.#server, _this.#request, _this.#response ).html4Path( config9999_obj.http404PagePath );
    }

}

export {
    InterceptorError,
};

export default InterceptorError;
