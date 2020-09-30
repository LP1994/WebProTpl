/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

class TSModulesA {

    title: string = '我是.ts文件！！！我是.ts文件！！！';

    constructor() {

    }

    getName(): string {
        return this.title;
    }

}

export {
    TSModulesA,
};

export default TSModulesA;
