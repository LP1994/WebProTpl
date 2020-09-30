/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 在全局类型声明的文件中声明一个模块，模块什么都不做也可！！！
// declare module 'jsPDir/test/JSModulesA.esm.js';
// declare module 'JSModulesA.esm.js';

declare class JSModulesA {

    title: string;

    constructor();

    getName(): string;

}

// 全局类型声明写法
// 可用：import JSModulesA from 'jsPDir/test/JSModulesA.esm.js';
declare module 'jsPDir/test/JSModulesA.esm.js' {

    export {
        JSModulesA,
    };

    export default JSModulesA;

}

// 全局类型声明写法
// 可用：import JSModulesA from 'JSModulesA.esm.js';
// 不可用：import JSModulesA from './JSModulesA.esm.js';
declare module 'JSModulesA.esm.js' {

    export {
        JSModulesA,
    };

    export default JSModulesA;

}
