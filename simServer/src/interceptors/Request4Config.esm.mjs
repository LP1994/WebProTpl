/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import { serverPort9999 as config9999_obj } from '../configures/GlobalProp.esm.mjs';

const request4Config_objC = {
    post: {
        [ `/${ config9999_obj.serverName }/POST` ]: '../controllers/POST.esm.mjs',
    },
    delete: {
        [ `/${ config9999_obj.serverName }/DELETE` ]: '../controllers/DELETE.esm.mjs',
    },
    put: {
        [ `/${ config9999_obj.serverName }/PUT` ]: '../controllers/PUT.esm.mjs',
    },
    get: {
        [ `/${ config9999_obj.serverName }/GETFile` ]: '../controllers/GETFile.esm.mjs',
        [ `/${ config9999_obj.serverName }/GET` ]: '../controllers/GET.esm.mjs',
        [ `/${ config9999_obj.serverName }/GetGenymotionDevicesList` ]: '../controllers/GetGenymotionDevicesList.esm.mjs',
        [ `/${ config9999_obj.serverName }/VueSSR/Index.html` ]: '../controllers/vueSSR/VueSSR.esm.mjs',
    },
    options: {},
};

export {
    request4Config_objC,
};

export default request4Config_objC;
