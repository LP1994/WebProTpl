/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

class JSModulesA {

    title = '我是.js文件！！！我是.js文件！！！';

    constructor(){
    }

    getName(){
        return this.title;
    }

}

export {
    JSModulesA,
};

export default JSModulesA;
