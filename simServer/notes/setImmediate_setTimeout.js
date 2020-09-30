/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// NodeJS版本是13.1.0   npm 6.13.1
// 都不设置间隔时间时(或为0、1、2)，setTimeout优先于setImmediate(在为2、3时出现不一样的顺序了)
// setTimeout为1，setImmediate为0！！！setTimeout优先于setImmediate
// setTimeout、setImmediate的执行顺序因机器性能而异！！！同一台机子！！！会出现不同的结果！！！

// 如果两者都在主模块中调用，那么执行先后取决于进程性能，也就是你的电脑好撇，当然也就是随机。
// 如果两者都不在主模块调用（被一个异步操作包裹），那么“setImmediate的回调永远先执行”。

//不论顺序如何！setImmediate总是先执行！
/*
 setTimeout(() => {
 setImmediate(() => {
 console.log('setImmediate');
 });
 setTimeout(() => {
 console.log('setTimeout');
 }, 0);
 }, 0);
 */

function testEventLoop(){
    console.log( '=============' );

    // h2
    setImmediate( () => {
        console.log( 'setImmediate phase' );

        // w5
        process.nextTick( () => {
            console.log( 'setImmediate phase - nextTick' );
        } );

        // w6
        Promise.resolve()
               .then( () => {
                   console.log( 'setImmediate phase - promise' );
               } );

    }, 3 );

    // h1
    setTimeout( () => {
        console.log( 'setTimeout phase' );

        // w3
        process.nextTick( () => {
            console.log( 'setTimeout phase - nextTick' );
        } );

        // w4
        Promise.resolve()
               .then( () => {
                   console.log( 'setTimeout phase - promise' );
               } );

    }, 3 );

    console.log( 'Poll phase' );

    // w1
    process.nextTick( () => {
        console.log( 'Poll phase - nextTick' );
    } );

    // w2
    Promise.resolve()
           .then( () => {
               console.log( 'Poll phase - promise' );
           } );
}

testEventLoop();
