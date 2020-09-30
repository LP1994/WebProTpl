/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import { readFileSync, } from 'fs';
import { resolve, } from 'path';
import Vue from 'vue';
import VueServerRenderer from 'vue-server-renderer';

import {
    RemGZip,
    SetHeaders,
    Get__dirname,
} from '../../tools/Tools.esm.mjs';

const __dirname = Get__dirname( import.meta.url );

function VueSSR( server, request, response ){
    let context = {
            title: 'Vue SSR',
        },
        template = readFileSync( resolve( __dirname, './tplHTML/pages/Index.html' ), 'utf8' ),
        vueRenderer = VueServerRenderer.createRenderer( {
            template,
        } ),
        app = new Vue( {
            data: {
                url: request.url,
            },
            template: `
              <div>
              <h1>Vue SSR</h1>
              <p>访问的URL是：{{ url }}</p>
              </div>
            `,
        } );

    vueRenderer.renderToString( app, context )
               .then( html => {
                   SetHeaders( response, {
                       'Content-Type': 'text/html;charset=utf-8',
                   } );
                   RemGZip( response );

                   response.statusCode = 200;
                   response.statusMessage = 'OK';
                   response.end( html, 'utf8' );
               } )
               .catch( err => {
                   console.error( err );
               } );
}

export {
    VueSSR,
};

export default VueSSR;
