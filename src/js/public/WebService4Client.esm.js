/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

// 一个基于CT二次封装的JS工具，用于该项目发起GraphQL请求的WebService客户端

'use strict';

let CT = new CTESM.CT();
let {
    WebService4Proxy,
} = CT.getClass();

const webService_insC = new WebService4Proxy( CT, `/` ),
    post4JSON = webService_insC.post( {
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

/**
 * 该函数只接受一个参数，且该参数是一个JSON配置对象，有如下三个字段：<br />
 * {<br />
 * url 字符串，默认值：'/'，一般不用传，保持默认值就行，可选<br /><br />
 *
 * options JSON配置对象，该参数的具体信息看CT的fetch()的第三个参数描述，必传<br /><br />
 *
 * events JSON配置对象，该参数的具体信息看CT的fetch()的第二个参数描述，必传<br /><br />
 *
 * @returns {Promise} Promise实例
 */
function post4JSON2GraphQL( {
                                url = '/',
                                options = {
                                    body: null,
                                },
                                events = {
                                    success: ( data4ResponseType, response ) => {
                                    },
                                    error: ( status_num, response ) => {
                                        console.warn( `请求未成功！请求状态码：${ status_num }！Start` );
                                        console.error( response );
                                        console.warn( `请求未成功！请求状态码：${ status_num }！End` );
                                    },
                                },
                            } = throw new Error( '参数必传！' ) ){
    let {
        body = null,
    } = options;

    ( CT.isArray( body ) || CT.isObject( body ) ) && ( body = JSON.stringify( body ) );

    return post4JSON.graphql( {
        url,
        options: Object.assign( {}, requestOpt, options, { body, }, ),
        events,
    } );
}

export {
    post4JSON,
    requestOpt,
    post4JSON2GraphQL,
};

export default post4JSON2GraphQL;
