/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * 自定义抛出错误、异常信息
 *
 * @param info_str 字符串，错误、异常信息，必须！
 */
function GetError( info_str ){
    console.error( 'GetError函数--->Start' );
    throw new Error( info_str );
}

/**
 * 主要用于调试提示的“alert”提示框！
 *
 * @param info 字符串，调试信息，必须
 */
function Prompt( info ){
    // alert( info );
}

/**
 * 一个封装了Service Worker主线程基本操作的类<br />
 * src/workers/tools/ServiceWorker4CT.esm.worker.js中有关于如下三个的使用说明<br />
 * extendableEvent.waitUntil(promise)<br />
 * Service​Worker​Global​Scope​.skip​Waiting()<br />
 * Clients​.claim()<br /><br />
 *
 * ServiceWorker(ServiceWorker主线程)https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker<br />
 * 继承<br />
 * EventTarget(https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)<br />
 * ------<br />
 * ServiceWorkerGlobalScope(ServiceWorker子线程)https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope<br />
 * 继承<br />
 * WorkerGlobalScope(https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope)<br />
 * 继承<br />
 * EventTarget(https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)<br />
 * 继承<br />
 * Object<br /><br />
 *
 * Service Worker生命周期：<br />
 * installing--->installed--->activating--->activated<br />
 * 特殊：redundant(当前的worker正在被其他worker替换)
 */
class ServiceWorker4MT {

    /**
     * 字符串，返回作为ServiceWorkerRegistration的一部分定义的ServiceWorker序列化脚本URL。必须与注册ServiceWorker的文档位于同一原点。
     */
    scriptURL;
    /**
     * 字符串，ServiceWorker接口的状态只读属性返回表示服务工作者当前状态的字符串。它可以是以下值之一：<br />
     * installing<br />
     * installed<br />
     * activating<br />
     * activated<br />
     * redundant(冗余，这名服务人员正在被另一名服务人员替换。)
     */
    state;
    /**
     * 自己封装的SWContainer类的实例对象
     */
    swContainer_ins;
    /**
     * Promise< { sw: sw对象, swRegIns: SWRegistration_ins(自己封装的SWRegistration类的实例对象) } >
     */
    swRegPromise;

    /**
     * 错误时触发，函数，会有一个event参数
     */
    #onError;
    /**
     * 接收到SW子线程消息的监听事件，函数，会有一个event参数，必须，这个参数有一个表示子线程消息的数据属性data：event.data<br />
     * event.data里头存放着子线程发来的数据
     */
    #onMessage;
    /**
     * 每当触发statechange类型的事件时调用的EventListener属性;它几乎在ServiceWorker.state发生更改时被触发。<br />
     * 函数，会有一个stateChangeEvent参数
     */
    #onStateChange;

    /**
     * 构造函数<br />
     * 注：<br />
     * 1、ServiceWorker接口从其父级Worker继承方法，但Worker.terminate除外 - 这不应该从服务工作者访问。
     *
     * @param url_str 字符串，ServiceWorker脚本所在的url，必须
     *
     * @param opt_obj JSON配置对象，可选<br />
     * {<br />
     * scope: '/', // 字符串，注册SW的控制范围必须，默认"/"。<br /><br />
     *
     * resolved: swReg => {}, // 函数，注册SW成功时执行，有一个swReg参数，可选。<br /><br />
     *
     * rejected: error => {}, // 函数，注册SW失败时执行，有一个error参数，可选。<br /><br />
     *
     * onError: event => {}, // 函数，SW出错时执行，有一个event参数，可选。<br /><br />
     *
     * onStateChange: stateChangeEvent => {}, // 函数，每当触发statechange类型的事件时调用的EventListener属性;它几乎在ServiceWorker.state发生更改时被触发，有一个stateChangeEvent参数，可选。<br /><br />
     *
     * onMessage: event => {}, // 函数，接收到SW子线程消息的监听事件，有一个event参数，可选。
     */
    constructor( url_str, opt_obj = {} ){
        if( !( 'serviceWorker' in navigator ) ){
            const error_strC = 'Service Worker只在HTTPS或localhost下运行！或该浏览器不支持“Service Worker”！';
            Prompt( error_strC );
            GetError( error_strC );
            return null;
        }

        let pra_obj = Object.assign( {
            onError: event => void ( GetError( event.message ) ),
            onMessage: event => {
            },
            onStateChange: stateChangeEvent => {
            },
            rejected: error => void ( GetError( error.message ) ),
            resolved: swReg => {
            },
            scope: '/',
        }, opt_obj );

        this.swContainer_ins = new SWContainer();

        this.#onError = pra_obj.onError;
        this.#onMessage = pra_obj.onMessage;
        this.#onStateChange = pra_obj.onStateChange;

        this.swRegPromise = this.swContainer_ins.register( url_str, {
                                    resolved_fun: pra_obj.resolved,
                                    rejected_fun: pra_obj.rejected,
                                    scope_str: pra_obj.scope,
                                } )
                                .then( swReg => {
                                    let sw = null;

                                    if( swReg.installing ){
                                        sw = swReg.installing;
                                    }
                                    if( swReg.waiting ){
                                        sw = swReg.waiting;
                                    }
                                    if( swReg.active ){
                                        sw = swReg.active;
                                    }

                                    sw.onerror = this.#onError;
                                    sw.onmessage = this.#onMessage;
                                    sw.onstatechange = this.#onStateChange;

                                    this.scriptURL = sw[ 'scriptURL' ];
                                    this.state = sw[ 'state' ];

                                    return {
                                        sw,
                                        swRegIns: new SWRegistration( swReg ),
                                    };
                                } );
    }

    /**
     * 错误时触发
     *
     * @param fun 函数，会有一个event参数，可选
     */
    onError( fun = event => {
    } ){
        this.#onError = fun;
    }

    /**
     * 接收到SW子线程消息的监听事件
     *
     * @param message_fun 函数，会有一个event参数，必须，这个参数有一个表示子线程消息的数据属性data：event.data<br />
     * event.data里头存放着子线程发来的数据
     */
    onMessage( message_fun = event => {
    } ){
        this.#onMessage = message_fun;
    }

    /**
     * 每当触发statechange类型的事件时调用的EventListener属性;它几乎在ServiceWorker.state发生更改时被触发。
     *
     * @param fun 函数，会有一个stateChangeEvent参数，可选
     */
    onStateChange( fun = stateChangeEvent => {
    } ){
        this.#onStateChange = fun;
    }

    /**
     * 向SW子线程发送数据<br />
     * 注：<br />
     * postMessage()一次只能发送一个对象。如上所示，如果要传递多个值，可以发送一个数组。<br />
     * 例子中：arrBuf = new ArrayBuffer( 8 )，无论在主线程，还是子线程，postMessage之前都是可用的，之后就把使用权转给了接收方，然后发送方就无法使用了
     *
     * @param message 发送给子线程的数据，数据可以是由结构化克隆算法处理的任何值或JavaScript对象，其包括循环引用，必须
     *
     * @param transfer 数组， 一个可选的Transferable对象的数组，用于传递所有权。可选<br />
     * 如果一个对象的所有权被转移，在发送它的上下文中将变为不可用（中止），并且只有在它被发送到的worker中可用<br />
     * 可转移对象是如ArrayBuffer，MessagePort或ImageBitmap的实例对象。transferList数组中不可传入null。
     */
    postMessage( message = null, transfer ){
        this.swRegPromise.then( ( { sw, swRegIns } ) => {
            ( transfer && transfer.length > 0 )
            ? ( sw.postMessage( message, [ ...transfer ] ) )
            : ( sw.postMessage( message ) );
        } );
    }

}

/**
 * 自己实现的封装ServiceWorkerContainer工具的一个类<br /><br />
 *
 * ServiceWorkerContainer<br />
 * (https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer)<br /><br />
 *
 * 说明：<br />
 * 1、<br />
 * ServiceWorker API的ServiceWorkerContainer接口提供了一个对象，它将服务工作者表示为网络生态系统中的一个整体单元，<br />
 * 包括注册、注销和更新服务工作者以及访问服务工作者状态及其注册的功能。<br />
 * 2、<br />
 * 最重要的是，它公开了用于注册服务工作者的ServiceWorkerContainer.Register()方法，<br />
 * 以及用于确定当前页是否受活动控制的ServiceWorkerContainer.Controller属性。
 */
class SWContainer {

    // 获取ServiceWorkerContainer的只读属性controller
    // 说明：
    // ServiceWorkerContainer接口的控制器只读属性在其状态为“激活”时返回ServiceWorker对象（ServiceWorkerRegistration.active返回的对象相同）。
    // 如果请求是强制刷新（shift+refresh）或没有活动的工作线程，则此属性返回空值null。
    controller;
    // navigator.serviceworker只读属性返回关联文档的serviceWorkerContainer对象，该对象提供注册、删除、升级和与serviceworker通信的访问。
    // navigator.serviceWorker返回ServiceWorkerContainer实例对象
    swContainer_ins = navigator.serviceWorker;

    #onControllerChange;
    #onError;
    #onMessage;

    /**
     * 构造函数
     *
     * @param onEvent JSON配置对象<br />
     * {<br />
     *  ServiceWorkerContainer接口的OnControllerChange属性是每当发生ControllerChange事件时激发的事件处理程序<br />
     *  当文档关联的ServiceWorkerRegistration获取新ServiceWorkerRegistration.active(ServiceWorker对象)时。<br />
     *  onControllerChange: event => {} // 函数，会有一个event参数，可选<br /><br />
     *
     *  ServiceWorkerContainer接口的OnMessage属性是每当发生消息事件时激发的事件处理程序<br />
     *  当接收到传入消息到ServiceWorkerContainer对象（例如，通过messageport.postmessage（）调用）时。<br />
     *  onMessage: event => {} // 函数，会有一个event参数，可选<br /><br />
     *
     *  ServiceWorkerContainer接口的OnError属性是在关联的服务工作者中发生错误事件时激发的事件处理程序。<br />
     *  onError: event => {} // 函数，会有一个event参数，可选
     */
    constructor( onEvent = {} ){
        let pra_obj = Object.assign( {
            onControllerChange: event => {
            },
            onError: event => void ( GetError( event.message ) ),
            onMessage: event => {
            },
        }, onEvent );

        this.controller = this.swContainer_ins.controller;

        this.#onControllerChange = pra_obj.onControllerChange;
        this.#onError = pra_obj.onError;
        this.#onMessage = pra_obj.onMessage;

        this.swContainer_ins.oncontrollerchange = event => void ( this.#onControllerChange( event ) );
        this.swContainer_ins.onerror = event => void ( this.#onError( event ) );
        this.swContainer_ins.onmessage = event => void ( this.#onMessage( event ) );
    }

    /**
     * 获取ServiceWorkerContainer的只读属性ready<br />
     * ServiceWorkerContainer接口的ready只读属性提供了一种方法，可以延迟代码执行，直到服务工作者处于活动状态。<br />
     * 它返回一个永不拒绝(没有reject)的Promise，该承诺将无限期地等待，直到与当前页面关联的ServiceWorker(ServiceWorkerRegistration.active)。<br />
     * 一旦满足该条件，它将通过Promise的resolved(解决)执行所要进行的操作(resolved会有一个ServiceWorkerRegistration参数)。<br /><br />
     *
     * 如：<br />
     * navigator.serviceWorker.ready.then( resolved( ServiceWorkerRegistration ){<br />
     * // ServiceWorkerRegistration.active === ServiceWorker<br />
     * console.log('A service worker is active:', ServiceWorkerRegistration.active);<br />
     * } );
     *
     * @param resolved_fun 函数，resolved状态下执行的函数，当服务工作者处于活动状态时会有一个ServiceWorkerRegistration参数，可选
     *
     * @returns {Promise} Promise<ServiceWorkerRegistration | void>
     */
    gReady( resolved_fun = swReg => {
    } ){
        return this.swContainer_ins.ready.then( swReg => {
                       resolved_fun( swReg );
                       return swReg;
                   } )
                   .catch( error => void ( GetError( error.message ) ) );
    }

    /**
     * ServiceWorkerContainer接口的getRegistration()方法获取其作用域URL与提供的文档URL匹配的ServiceWorkerRegistration对象。<br />
     * 方法返回解析为ServiceWorkerRegistration或Undefined的承诺。
     *
     * @param scope_str 字符串，作用域路径，默认值'/'，必须<br />
     * 服务工作者注册的唯一标识符-要返回的注册对象的作用域URL。这通常是一个相对的URL。
     *
     * @param arg_obj JSON对象，配置对象，必须<br />
     * {<br />
     * resolved_fun: swReg => {}, // 函数，resolved状态下执行的函数，会有一个ServiceWorkerRegistration参数，可选<br /><br />
     *
     * rejected_fun: error => {} // 函数，rejected状态下执行的函数，会有一个error参数，可选
     *
     * @returns {Promise} Promise<ServiceWorkerRegistration | undefined>
     */
    gRegister( scope_str = '/', arg_obj = {} ){
        let pra_obj = Object.assign( {
            resolved_fun: swReg => {
            },
            rejected_fun: error => void ( GetError( error.message ) ),
        }, arg_obj );
        return this.swContainer_ins.getRegistration( scope_str )
                   .then( swReg => {
                       pra_obj.resolved_fun( swReg );
                       return swReg;
                   } )
                   .catch( pra_obj.rejected_fun );
    }

    /**
     * ServiceWorkerContainer接口的getRegistrations()方法返回与数组中的ServiceWorkerContainer关联的所有ServiceWorkerRegistrations。<br />
     * 如果方法无法返回ServiceWorkerRegistrations，则返回一个Promise。
     *
     * @param arg_obj JSON对象，配置对象，必须<br />
     * {<br />
     * resolved_fun: swReg => {}, // 函数，resolved状态下执行的函数，会有一个ServiceWorkerRegistration参数，可选<br /><br />
     *
     * rejected_fun: error => {} // 函数，rejected状态下执行的函数，会有一个error参数，可选
     *
     * @returns {Promise} Promise<ReadonlyArray<ServiceWorkerRegistration>>
     */
    gRegistrations( arg_obj = {} ){
        let pra_obj = Object.assign( {
            resolved_fun: swReg => {
            },
            rejected_fun: error => void ( GetError( error.message ) ),
        }, arg_obj );
        return this.swContainer_ins.getRegistrations()
                   .then( swReg => {
                       pra_obj.resolved_fun( swReg );
                       return swReg;
                   } )
                   .catch( pra_obj.rejected_fun );
    }

    /**
     * ServiceWorkerContainer接口的OnControllerChange属性是每当发生ControllerChange事件时激发的事件处理程序<br />
     * 当文档关联的ServiceWorkerRegistration获取新ServiceWorkerRegistration.active(ServiceWorker对象)时。
     *
     * @param fun 函数，会有一个event参数，必须
     */
    onControllerChange( fun = event => {
    } ){
        this.#onControllerChange = fun;
    }

    /**
     * ServiceWorkerContainer接口的OnError属性是在关联的服务工作者中发生错误事件时激发的事件处理程序。
     *
     * @param fun 函数，会有一个event参数，必须
     */
    onError( fun = event => {
    } ){
        this.#onError = fun;
    }

    /**
     * ServiceWorkerContainer接口的OnMessage属性是每当发生消息事件时激发的事件处理程序<br />
     * 当接收到传入消息到ServiceWorkerContainer对象（例如，通过messageport.postmessage（）调用）时。<br />
     * 注：<br />
     * 为与其他Web消息传递功能保持一致，在现代浏览器中，发送到服务工作环境的消息（例如作为onMessage的事件对象）由MessageEvent对象表示。<br />
     * （它们以前由ServiceWorkerMessageEvent对象表示，现在已被弃用。）
     *
     * @param fun 函数，会有一个event参数，必须
     */
    onMessage( fun = event => {
    } ){
        this.#onMessage = fun;
    }

    /**
     * ServiceWorkerContainer接口的register()方法为给定的scriptURL创建或更新ServiceWorkerRegistration。<br /><br />
     *
     * 说明：<br />
     * 如果成功，服务工作者注册会将提供的脚本URL绑定到一个作用域，该作用域随后用于导航匹配。您可以从控制页无条件地调用此方法。<br />
     * 也就是说，您不需要首先检查是否有活动的注册。<br />
     * 围绕范围的含义和使用，经常会出现混淆。由于服务工作人员的范围不能超过其自己的位置，因此只有在需要比默认范围窄的范围时才使用范围选项。
     *
     * @param url_str 字符串，必须
     *
     * @param arg_obj JSON对象，配置对象，必须<br />
     * {<br />
     * scope_str: '/', // 字符串，作用域路径，默认值'/'，必须<br />
     * 一个usvstring，表示定义服务工作者注册范围的URL；即服务工作者可以控制的URL范围。这通常是一个相对的URL。它是相对于应用程序的基URL的。<br />
     * 默认情况下，服务工作者注册的作用域值设置为服务工作者脚本所在的目录。<br /><br />
     *
     * resolved_fun: swReg => {}, // 函数，resolved状态下执行的函数，会有一个ServiceWorkerRegistration参数，可选<br /><br />
     *
     * rejected_fun: error => {} // 函数，rejected状态下执行的函数，会有一个error参数，可选
     *
     * @returns {Promise} Promise<ServiceWorkerRegistration>
     */
    register( url_str, arg_obj = {} ){
        let pra_obj = Object.assign( {
            scope_str: '/',
            resolved_fun: swReg => {
            },
            rejected_fun: error => void ( GetError( error.message ) ),
        }, arg_obj );
        return this.swContainer_ins.register( url_str, {
                       scope: pra_obj.scope_str
                   } )
                   .then( swReg => {
                       pra_obj.resolved_fun( swReg );
                       return swReg;
                   } )
                   .catch( pra_obj.rejected_fun );
    }

    /**
     * navigator.serviceWorker.addEventListener('message', (e) => {});<br />
     * 之后需要调用startMessages()以便启动上面注册的message事件！<br /><br />
     *
     * 注：<br />
     * 当直接使用ServiceWorkerContainer.onMessage设置处理程序时，将自动发送消息。在这里，您不需要调用startMessages()。
     */
    startMessages(){
        this.swContainer_ins.startMessages();
    }

}

/**
 * 一个封装了Shared Worker主线程基本操作的类(它在移动设备上的兼容性不是很好！)<br /><br />
 *
 * SharedWorker(SharedWorker主线程)https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker<br />
 * 继承<br />
 * EventTarget(https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)<br />
 * ------<br />
 * SharedWorkerGlobalScope(SharedWorker子线程)https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope<br />
 * 继承<br />
 * WorkerGlobalScope(https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope)<br />
 * 继承<br />
 * EventTarget(https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)<br />
 * 继承<br />
 * Object<br /><br />
 *
 * _self.name<br />
 * 火狐浏览器支持这样写，用过_self.name可以取到“testA2SWChild”<br />
 * new SharedWorker( '1.js',<br />
 * {<br />
 * type: 'classic',<br />
 * credentials: 'omit',<br />
 * name: 'testA2SWChild'<br />
 * } )<br />
 * 但是！<br />
 * 谷歌浏览器不支持这种，只支持：<br />
 * new SharedWorker( '1.js', 'testA2SWChild' )<br />
 * 用过_self.name可以取到“testA2SWChild”<br /><br />
 *
 * 注：<br />
 * 直到2020年03月04号！<br />
 * “iOS(13.3.1)”的iPhone手机上“所有的浏览器”都不支持“Shared Worker”！<br />
 * Android设备除了“火狐浏览器”，其他基于“chrome浏览器内核”开发的“第三方浏览器”以及“最新的chrome浏览器”自身也都不支持“Shared Worker”！<br />
 * 哪怕是在Android SDK自带的最新的Android R系统的模拟器上的“最新的chrome浏览器”也不支持！<br />
 * 但是！PC设备上的浏览器却兼容的挺好的！
 */
class SWorker4MT {
    #port;
    #onError_fun;
    #portOnMessage_fun;
    #portOnMessageError_fun;

    /**
     * 生成Shared Worker主线程的构造函数<br />
     *
     * @param arg_obj JSON对象，配置选项，必须<br />
     * {<br />
     *   workerInsName: '', // 字符串，实例名，必须<br />
     *   如：<br />
     *   let SWorker4MT_class = CTO.gSWorker();<br />
     *   let testA = new SWorker4MT_class( {<br />
     *   workerInsName: 'testA',<br />
     *   url: 'http://localhost:8082/WebProTpl/dist/devServer/js/TestJS.js',<br />
     *   }, 'testA2ChildThread' );<br />
     *   workerInsName指的就是“testA”！<br />
     *   url: '', // 字符串，同源URL，所要加载的JS文件的URL，必须<br />
     *   portOnMessage: event => {}, // 可选<br />
     *   onError: event => {}, // 可选<br />
     *   portOnMessageError: event => {} // 可选
     *
     * @param opt_obj 字符串或JSON对象，配置选项，可选<br />
     * {<br />
     *   type: 'classic', // 字符串，指定要创建的Worker的类型，该值可以是“classic”或“module”，默认“classic”<br /><br />
     *
     *   credentials: 'omit', // 字符串，指定要用于Worker进程的凭据类型，该值可以是“omit(不需要凭据)”、“same-origin”、“include”，<br />
     *   如果未指定或“type”选项的值为“classic”，则使用默认值“omit(不需要凭据)”<br /><br />
     *
     *   name: 'SharedWorker_' + Date.now() // 字符串，指定要创建的Worker的名字，其后在Shared Worker线程内“self.name”就能得到，默认值'SharedWorker_' + Date.now()，主要用于调试。
     */
    constructor( arg_obj = {}, opt_obj = {} ){
        if( !( 'SharedWorker' in globalThis ) ){
            const error_strC = '该浏览器不支持“Shared Worker”！';
            Prompt( error_strC );
            GetError( error_strC );
            return null;
        }

        let pra_obj = Object.assign( {
            url: '',
            workerInsName: '',
            onError: event => void ( GetError( event.message ) ),
            portOnMessage: event => {
            },
            portOnMessageError: event => void ( GetError( event.message ) ),
        }, arg_obj );

        this.workerInsName_str = pra_obj.workerInsName;
        this.#onError_fun = pra_obj.onError;
        this.#portOnMessage_fun = pra_obj.portOnMessage;
        this.#portOnMessageError_fun = pra_obj.portOnMessageError;

        this[ this.workerInsName_str ] = new SharedWorker( pra_obj.url, Object.assign( {
            type: 'classic',
            credentials: 'omit',
            name: 'SharedWorker_' + Date.now(),
        }, opt_obj ).name );
        this.#port = this[ this.workerInsName_str ].port;
        this.#port.start();

        this[ this.workerInsName_str ].onerror = event => void ( this.#onError_fun( event ) );
        this.#port.onmessage = event => void ( this.#portOnMessage_fun( event ) );
        this.#port.onmessageerror = event => void ( this.#portOnMessageError_fun( event ) );
    }

    /**
     * 关闭主线程的端口
     */
    portClose(){
        this.#port.close();
    }

    /**
     * 返回port
     *
     * @returns {port} port
     */
    gPort(){
        return this.#port;
    }

    /**
     * 当Shared Worker发生运行时错误时，将调用。会有一个event参数
     *
     * @param fun 函数，会有一个event参数，必须
     */
    onError( fun = event => {
    } ){
        this.#onError_fun = fun;
    }

    /**
     * 接收到子线程消息的监听事件
     *
     * @param fun 函数，会有一个event参数，必须，这个参数有一个表示子线程消息的数据属性data：event.data<br />
     * event.data里头存放着子线程发来的数据
     */
    portOnMessage( fun = event => {
    } ){
        this.#portOnMessage_fun = fun;
    }

    /**
     * 接收到无法反序列化的消息时，就会调用它
     *
     * @param fun 函数，会有一个event参数，必须
     */
    portOnMessageError( fun = event => {
    } ){
        this.#portOnMessageError_fun = fun;
    }

    /**
     * 通过主线程的端口向子线程发送数据<br />
     * 注：<br />
     * postMessage()一次只能发送一个对象。如上所示，如果要传递多个值，可以发送一个数组。<br />
     * 例子中：arrBuf = new ArrayBuffer( 8 )，无论在主线程，还是子线程，postMessage之前都是可用的，之后就把使用权转给了接收方，然后发送方就无法使用了
     *
     * @param message 发送给子线程的数据，数据可以是由结构化克隆算法处理的任何值或JavaScript对象，其包括循环引用，必须
     *
     * @param transfer 数组， 一个可选的Transferable对象的数组，用于传递所有权。可选<br />
     * 如果一个对象的所有权被转移，在发送它的上下文中将变为不可用（中止），并且只有在它被发送到的worker中可用<br />
     * 可转移对象是如ArrayBuffer，MessagePort或ImageBitmap的实例对象。transferList数组中不可传入null。
     */
    portPostMessage( message = {}, transfer ){
        ( transfer && transfer.length > 0 )
        ? ( this.#port.postMessage( message, [ ...transfer ] ) )
        : ( this.#port.postMessage( message ) );
    }

    /**
     * 启动主线程的端口
     */
    portStart(){
        this.#port.start();
    }
}

/**
 * 自己实现的封装ServiceWorkerRegistration工具的一个类<br /><br />
 *
 * ServiceWorkerRegistration(https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration)<br />
 * src/workers/tools/ServiceWorker4CT.esm.worker.js中有关于如下三个的使用说明<br />
 * extendableEvent.waitUntil(promise)<br />
 * Service​Worker​Global​Scope​.skip​Waiting()<br />
 * Clients​.claim()<br /><br />
 *
 * Service Worker生命周期：<br />
 * installing--->installed--->activating--->activated<br />
 * 特殊：redundant(当前的worker正在被其他worker替换)<br /><br />
 *
 * 说明：<br />
 * 1、<br />
 * ServiceWorker API的ServiceWorkerRegistration接口表示服务工作者注册。您注册一个服务工作者来控制一个或多个共享同一来源的页面。<br />
 * 2、<br />
 * ServiceWorker注册的生存期超过了ServiceWorkerRegistration对象的生存期，这些对象在其相应的ServiceWorker客户端的生存期内表示它们。<br />
 * 浏览器维护活动的ServiceWorkerRegistration对象的持久列表。
 */
class SWRegistration {

    /**
     * 返回ServiceWorker对象，该对象的state属性的属性值是字符串"activating"或"activated"。此属性最初设置为null。<br />
     * 没有其他Worker控制的clients。此阶段旨在允许工作人员完成设置或清除其他与工作人员相关的资源，如删除旧缓存。<br /><br />
     *
     * 注：<br />
     * 如果客户端的URL属于注册范围（首次调用ServiceWorkerContainer.register时设置的范围选项），则活动工作者将控制ServiceWorkerClient。<br />
     * activating<br />
     * 处于此状态的服务工人被视为活动工人(active)。在此状态下，可以在onactivate事件处理程序内调用ExtendableEvent.waitUntil()，<br />
     * 以延长活动工作进程的寿命，直到传递的承诺成功解决。在激活状态(activated)之前，不会调度任何功能事件。<br /><br />
     *
     * activated<br />
     * 处于此状态的服务工作者被视为准备处理功能事件的活动工作者。
     */
    active;
    /**
     * 返回ServiceWorker对象，该对象的state属性的属性值是字符串"installing"。此属性最初设置为null。<br /><br />
     *
     * 注：<br />
     * 处于这个状态下的ServiceWorker对象，是一个“正在安装(installing)”的ServiceWorker对象。在此状态下，子线程可以在安装事件处理程序<br />
     * ( install event，self.addEventListener('install', event => event.waitUntil(promise)) )内调用<br />
     * ExtendableEvent.waitUntil(promise)，以延长安装工作者的寿命，直到传递的承诺成功解决。<br />
     * 这主要用于填充所有核心缓存，并且确保在填充所有核心缓存之前，服务工作者不会处于活动状态。<br /><br />
     *
     * 子线程的安装事件( install event )始终是发送给服务工作人员的第一个事件（这可用于启动填充indexeddb和缓存站点资产的过程，ExtendableEvent.waitUntil(promise)）。<br />
     * event.waitUntil( caches.open( 'v1' ).then(cache => cache.addAll(allAssets_arr)) )<br /><br />
     *
     * 如：self.addEventListener('install',function(event){self.skipWaiting();});<br />
     * ServiceWorkerGlobalScope的ServiceWorkerGlobalScope.skipWaiting()方法强制等待的服务工作者(waiting service worker)成为活动的服务工作者(active service worker)。<br />
     * 将此方法与Clients.claim()一起使用可确保对基础服务工作程序的更新立即对当前客户端和所有其他活动客户端生效。<br /><br />
     *
     * addEventListener('install', event => {<br />
     * const preCache = async () => {<br />
     * const cache = await caches.open('static-v1');<br />
     * return cache.addAll([<br />
     * '/',<br />
     * '/about/',<br />
     * '/static/styles.css'<br />
     * ]);<br />
     * };<br />
     * event.waitUntil(preCache());<br />
     * });
     */
    installing;
    /**
     * ServiceWorkerRegistration接口的navigationPreload只读属性返回与当前服务工作者注册关联的NavigationPreloadManager。<br /><br />
     *
     * Value:<br />
     * An instance of NavigationPreloadManager.
     */
    navigationPreload;
    paymentManager;
    /**
     * ServiceWorkerRegistration接口的periodicSync只读属性返回对PeriodicSyncManager接口的引用，该接口管理定期后台同步过程。<br /><br />
     *
     * 目前不属于任何规范！！！<br /><br />
     *
     * Value:<br />
     * A PeriodicSyncManager object.
     */
    periodicSync;
    /**
     * ServiceWorkerRegistration接口的PushManager属性返回对管理推送订阅的PushManager接口的引用；这包括对订阅、获取活动订阅和访问推送权限状态的支持。<br /><br />
     *
     * Value:<br />
     * A PushManager object.
     */
    pushManager;
    /**
     * ServiceWorkerRegistration接口的只读属性scope返回服务工作者注册的唯一标识符。服务工作者必须与注册ServiceWorker的文档位于同一源。
     */
    scope;
    /**
     * Service​Worker​Registration​
     */
    swReg;
    /**
     * ServiceWorkerRegistration接口的sync属性返回对SyncManager接口的引用，该接口管理后台同步进程。<br /><br />
     *
     * Value:<br />
     * A SyncManager object.
     */
    sync;
    updateViaCache;
    /**
     * 返回ServiceWorker对象，该对象的state属性的属性值是字符串"installed"。此属性最初设置为null。<br />
     * 服务工作人员已完成其设置，正在等待使用其他服务工作人员的客户端关闭。<br /><br />
     *
     * 注：<br />
     * 处于此状态的服务工作者被视为等待工作者(waiting)。
     */
    waiting;

    /**
     * ServiceWorkerRegistration接口的OnUpdateFound属性是每当激发StateChange类型的事件时调用的EventListener属性；<br />
     * 每当ServiceWorkerRegistration.Installing属性获取新的服务工作者时都会激发该属性。
     */
    #updateFound;

    /**
     * 构造函数
     *
     * @param swReg Service​Worker​Registration​，必须
     *
     * @param updateFound 函数，有一个event参数，可选<br />
     * ServiceWorkerRegistration接口的OnUpdateFound属性是每当激发StateChange类型的事件时调用的EventListener属性；<br />
     * 每当ServiceWorkerRegistration.Installing属性获取新的服务工作者时都会激发该属性。
     */
    constructor( swReg, updateFound = event => {
    } ){
        this.active = swReg.active;
        this.installing = swReg.installing;
        this.navigationPreload = swReg.navigationPreload;
        this.paymentManager = swReg.paymentManager;
        this.periodicSync = swReg.periodicSync;
        this.pushManager = swReg.pushManager;
        this.scope = swReg.scope;
        this.swReg = swReg;
        this.sync = swReg.sync;
        this.updateViaCache = swReg.updateViaCache;
        this.waiting = swReg.waiting;

        this.#updateFound = updateFound;

        this.swReg.onupdatefound = event => void ( this.#updateFound( event ) );
    }

    /**
     * ServiceWorkerRegistration接口的getNotifications()方法返回通知列表，通知的顺序是通过当前服务工作者注册从当前来源创建的。<br />
     * 起源可以有许多活动的但范围不同的服务工作者注册。由同一源上的一个服务工作人员创建的通知将不可用于同一源上的其他活动服务工作人员。
     *
     * @param tag 字符串，表示通知标记。如果指定，则仅返回具有此标记的通知。可选
     *
     * @param opt JSON对象，可选<br />
     * {<br />
     * resolved: 函数，成功时执行，有一个“list of Notification objects”参数<br /><br />
     *
     * rejected: 函数，失败时执行，有一个error参数
     *
     * @returns {Promise} A Promise that resolves to a list of Notification objects.
     */
    getNotifications( tag, opt = {} ){
        let pra_obj = Object.assign( {
            resolved: notificationsList => {
            },
            rejected: error => void ( GetError( error.message ) ),
        }, opt );
        if( tag ){
            return this.swReg.getNotifications( { tag: tag } )
                       .then( notificationsList => {
                           pra_obj.resolved( notificationsList );
                           return notificationsList;
                       } )
                       .catch( pra_obj.rejected );
        }
        else{
            return this.swReg.getNotifications()
                       .then( notificationsList => {
                           pra_obj.resolved( notificationsList );
                           return notificationsList;
                       } )
                       .catch( pra_obj.rejected );
        }
    }

    /**
     * ServiceWorkerRegistration接口的showNotification()方法在活动的服务工作者上创建通知。<br />
     * 该方法“火狐浏览器”支持的不是很好！！！
     *
     * @param title 字符串，必须在通知中显示的标题，必须
     *
     * @param options JSON对象，Notification的配置选项，可选<br />
     * (https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#Parameters)<br />
     * {<br />
     * actions: 数组，要在通知中显示的操作数组。数组的成员为对象，每个对象都有3个属性<br />
     * 如：<br />
     * [<br />
     * {<br />
     *  action: 'action1', // 字符串，标识要在通知上显示的用户操作的DOMString。使用notificationclick事件中的event.action构建适当的响应。<br />
     *  _self.addEventListener( 'notificationclick', event => {<br />
     *      event.action; // action1，当点击title为'title1'的操作栏时，就会输出'action1'。<br />
     *  } );<br />
     *  注册完该事件后，点击通知的任何位置都会出发该事件，可以根据“event.action”来为每个action执行相应的操作。<br /><br />
     *
     *  title: 'title1', // 字符串，包含要向用户显示的操作文本的DOMString。<br /><br />
     *
     *  icon: 'https://e6093c81.ap.ngrok.io/WebProTpl/dist/test/img/1.png', // 字符串，一个USVString，包含要与操作一起显示的图标的URL。<br /><br />
     *
     *  placeholder: null, // 字符串，谷歌浏览器上显示的属性，默认值是null。注：“Button”类型的通知无法指定占位符。<br /><br />
     *
     *  type: 'button', // 字符串，谷歌浏览器上显示的属性，默认值是'button'。注：“Button”类型的通知无法指定占位符。目前没法得知"NotificationActionType"有哪些可用的值。<br />
     *  submit、input都会提示这两个不是“NotificationActionType”中的有效值！<br />
     * ]<br /><br />
     *
     *  badge: 'URL', // 字符串，当没有足够的空间显示通知本身（例如，Android通知栏）时，表示通知的图像的URL。<br />
     *  // 在Android设备上，徽章应能容纳分辨率高达4倍的设备，大约96 x 96像素，图像将被自动屏蔽。<br />
     *  // 谷歌浏览器中会出现在右下角的小小图标<br /><br />
     *
     *  body: '', // 字符串，表示要在通知中显示的额外内容的字符串。<br /><br />
     *
     *  dir: 'auto', // 字符串，通知的方向，它可以是auto、ltr、rtl。<br /><br />
     *
     *  icon: 'URL', // 字符串，通知用作图标的图像的URL。<br /><br />
     *
     *  image: 'URL', // 字符串，包含要在通知中显示的图像的URL的USVString。谷歌浏览器中会出现在“body”底下的一张大图，图标多大就显示多大。<br /><br />
     *
     *  lang: '', // 字符串，指定通知中使用的lang。此字符串必须是有效的BCP 47语言标记。如：'zh-CN'<br /><br />
     *
     *  renotify: 'false', // 布尔值，指示在重用"tag"值时是否抑制振动和声音警报。默认值为false。<br /><br />
     *
     *  requireInteraction: 'true', // 布尔值，指示在屏幕足够大的设备上，通知应保持活动状态，直到用户单击或取消通知。<br />
     *  如果该值不存在或为假，桌面版的chrome将在大约20秒后自动最小化通知。默认值为假。<br /><br />
     *
     *  tag: '', // 字符串，给定通知的ID，允许您在必要时使用脚本查找，替换或删除通知。<br /><br />
     *
     *  vibrate: [ 300, 100, 400 ], // 与通知显示一起运行的振动模式。振动模式可以是一个只有一个构件的阵列。<br />
     *  这些值是以毫秒为单位的时间，其中偶数指数（0、2、4等）表示振动的时间，奇数指数表示暂停的时间。<br />
     *  例如，[300，100，400]会振动300毫秒，暂停100毫秒，然后振动400毫秒。<br /><br />
     *
     *  data: '任何数据类型', // 您希望与通知关联的任意数据。这可以是任何数据类型。
     *
     * @param arg JSON对象，可选<br />
     * {<br />
     * resolved: 函数，成功时执行，有一个“NotificationEvent”参数<br /><br />
     *
     * rejected: 函数，失败时执行，有一个error参数
     *
     * @returns {Promise} A Promise that resolves to a NotificationEvent.
     */
    showNotification( title = '', options = {}, arg = {} ){
        let permission_str = Notification.permission,
            pra_obj = Object.assign( {
                resolved: notificationEvent => {
                },
                rejected: error => void ( GetError( error.message ) ),
            }, arg ),
            fun1 = () => this.swReg.showNotification( title, Object.assign( {
                                 vibrate: [
                                     200,
                                     100,
                                     200,
                                     100,
                                     200,
                                     100,
                                     200,
                                 ],
                                 lang: 'zh-CN',
                                 dir: 'ltr',
                                 renotify: 'false',
                                 requireInteraction: 'true',
                             }, options ) )
                             .then( notificationEvent => {
                                 pra_obj.resolved( notificationEvent );
                                 return notificationEvent;
                             } )
                             .catch( pra_obj.rejected );
        if( permission_str === 'granted' ){
            return fun1();
        }
        else if( permission_str === 'denied' ){
            return Notification.requestPermission()
                               .then( result => {
                                   if( result === 'granted' ){
                                       return fun1();
                                   }
                                   else{
                                       return 'denied';
                                   }
                               } );
        }
        else if( permission_str === 'default' ){
            return Notification.requestPermission()
                               .then( result => {
                                   if( result === 'granted' ){
                                       return fun1();
                                   }
                                   else{
                                       return 'denied';
                                   }
                               } );
        }
    }

    /**
     * ServiceWorkerRegistration接口的Unregister方法将注销ServiceWorker注册并返回Promise。如果找不到注册，则Promise将解析为false，<br />
     * 否则无论是否发生注销，它都将解析为true（如果其他人刚刚调用ServiceWorkerContainer.Register并使用相同的作用域，则无法注销）。<br />
     * 服务工作人员将在注销之前完成任何正在进行的操作。
     *
     * @param opt JSON对象，可选<br />
     * {<br />
     * resolved: 函数，成功时执行，有一个boolean类型的参数<br /><br />
     *
     * rejected: 函数，失败时执行，有一个error参数
     *
     * @returns {Promise} Promise使用一个布尔值解析，该布尔值指示服务工作者是否已注销。if boolean = true, unregister is successful
     */
    unregister( opt = {} ){
        let pra_obj = Object.assign( {
            resolved: boolean => {
            },
            rejected: error => void ( GetError( error.message ) ),
        }, opt );
        return this.swReg.unregister()
                   .then( boolean => {
                       pra_obj.resolved( boolean );
                       return boolean;
                   } )
                   .catch( pra_obj.rejected );
    }

    /**
     * ServiceWorkerRegistration接口的更新方法尝试更新服务工作者。它获取工作进程的脚本URL，如果新工作进程与当前工作进程不完全相同，则安装新工作进程。<br />
     * 如果前一次提取发生在24小时之前，则工作进程的提取将绕过任何浏览器缓存。
     *
     * @param opt JSON对象，可选<br />
     * {<br />
     * resolved: 函数，成功时执行，有一个ServiceWorkerRegistration参数<br /><br />
     *
     * rejected: 函数，失败时执行，有一个error参数
     *
     * @returns {Promise} A Promise that resolves with a ServiceWorkerRegistration object.
     */
    update( opt = {} ){
        let pra_obj = Object.assign( {
            resolved: swReg => {
            },
            rejected: error => void ( GetError( error.message ) ),
        }, opt );
        return this.swReg.update()
                   .then( swReg => {
                       pra_obj.resolved( swReg );
                       return swReg;
                   } )
                   .catch( pra_obj.rejected );
    }

    /**
     * ServiceWorkerRegistration接口的OnUpdateFound属性是每当激发StateChange类型的事件时调用的EventListener属性；<br />
     * 每当ServiceWorkerRegistration.Installing属性获取新的服务工作者时都会激发该属性。
     *
     * @param fun 事件触发时执行的函数，有一个event参数，可选
     */
    updateFound( fun = event => {
    } ){
        this.#updateFound = fun;
    }

}

/**
 * 一个封装了Web Worker主线程基本操作的类<br /><br />
 *
 * Worker(WebWorker主线程)https://developer.mozilla.org/en-US/docs/Web/API/Worker<br />
 * 继承<br />
 * EventTarget(https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)<br />
 * ------<br />
 * DedicatedWorkerGlobalScope(WebWorker子线程)https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope<br />
 * 继承<br />
 * WorkerGlobalScope(https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope)<br />
 * 继承<br />
 * EventTarget(https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)<br />
 * 继承<br />
 * Object
 */
class WWorker4MT {
    #onError_fun;
    #onMessage_fun;
    #onMessageError_fun;

    /**
     * 生成Web Worker主线程的构造函数
     *
     * @param arg_obj JSON对象，配置选项，必须<br />
     * {<br />
     *   workerInsName: '', // 字符串，实例名，必须<br />
     *   如：<br />
     *   let WWorker4MT_class = CTO.gWWorker();<br />
     *   let testA = new WWorker4MT_class( {<br />
     *   workerInsName: 'testA',<br />
     *   url: 'http://localhost:8082/WebProTpl/dist/devServer/js/TestJS.js',<br />
     *   }, {<br />
     *     name: 'testA2ChildThread'<br />
     *    } );<br />
     *   workerInsName指的就是“testA”！<br />
     *
     *   url: '', // 字符串，同源URL，所要加载的JS文件的URL，必须<br />
     *   onError: event => {}, // 可选<br />
     *   onMessage: event => {}, // 可选<br />
     *   onMessageError: event => {} // 可选
     *
     * @param opt_obj JSON对象，配置选项，可选<br />
     * {<br />
     *   type: 'classic', // 字符串，指定要创建的Worker的类型，该值可以是“classic”或“module”，默认“classic”<br /><br />
     *
     *   credentials: 'omit', // 字符串，指定要用于Worker进程的凭据类型，该值可以是“omit(不需要凭据)”、“same-origin”、“include”，<br />
     *   如果未指定或“type”选项的值为“classic”，则使用默认值“omit(不需要凭据)”<br /><br />
     *
     *   name: 'WebWorker_' + Date.now() // 字符串，指定要创建的Worker的名字，其后在Web Workers线程内“self.name”就能得到，默认值'WebWorker_' + Date.now()，主要用于调试。
     */
    constructor( arg_obj = {}, opt_obj = {} ){
        if( !( 'Worker' in globalThis ) ){
            const error_strC = '该浏览器不支持“Web Worker”！';
            Prompt( error_strC );
            GetError( error_strC );
            return null;
        }

        let pra_obj = Object.assign( {
            url: '',
            workerInsName: '',
            onError: event => void ( GetError( event.message ) ),
            onMessage: event => {
            },
            onMessageError: event => void ( GetError( event.message ) ),
        }, arg_obj );

        this.workerInsName_str = pra_obj.workerInsName;
        this.#onError_fun = pra_obj.onError;
        this.#onMessage_fun = pra_obj.onMessage;
        this.#onMessageError_fun = pra_obj.onMessageError;

        this[ this.workerInsName_str ] = new Worker( pra_obj.url, Object.assign( {
            type: 'classic',
            credentials: 'omit',
            name: 'WebWorker_' + Date.now(),
        }, opt_obj ) );

        this[ this.workerInsName_str ].onerror = event => void ( this.#onError_fun( event ) );
        this[ this.workerInsName_str ].onmessage = event => void ( this.#onMessage_fun( event ) );
        this[ this.workerInsName_str ].onmessageerror = event => void ( this.#onMessageError_fun( event ) );
    }

    /**
     * 当worker发生运行时错误时，将调用。会有一个event参数<br />
     * 注：<br />
     * 该事件不会冒泡并且可以取消; 为了防止发生默认操作，worker可以调用error事件的方法。 preventDefault()
     *
     * @param error_fun 函数，会有一个event参数，必须，这个参数有三个属性：event.message、event.filename、event.lineno<br />
     * {<br />
     *   message // 可读的错误消息<br />
     *   filename // 发生错误的脚本文件的名称<br />
     *   lineno // 发生错误的脚本文件的行号
     */
    onError( error_fun = event => {
    } ){
        this.#onError_fun = error_fun;
    }

    /**
     * 接收到子线程消息的监听事件
     *
     * @param message_fun 函数，会有一个event参数，必须，这个参数有一个表示子线程消息的数据属性data：event.data<br />
     * event.data里头存放着子线程发来的数据
     */
    onMessage( message_fun = event => {
    } ){
        this.#onMessage_fun = message_fun;
    }

    /**
     * 接收到无法反序列化的消息时，就会调用它
     *
     * @param messageError_fun 函数，会有一个event参数，必须
     */
    onMessageError( messageError_fun = event => {
    } ){
        this.#onMessageError_fun = messageError_fun;
    }

    /**
     * 向子线程发送数据<br />
     * 注：<br />
     * postMessage()一次只能发送一个对象。如上所示，如果要传递多个值，可以发送一个数组。<br />
     * 例子中：arrBuf = new ArrayBuffer( 8 )，无论在主线程，还是子线程，postMessage之前都是可用的，之后就把使用权转给了接收方，然后发送方就无法使用了
     *
     * @param message 发送给子线程的数据，数据可以是由结构化克隆算法处理的任何值或JavaScript对象，其包括循环引用，必须
     *
     * @param transfer 数组， 一个可选的Transferable对象的数组，用于传递所有权。可选<br />
     * 如果一个对象的所有权被转移，在发送它的上下文中将变为不可用（中止），并且只有在它被发送到的worker中可用<br />
     * 可转移对象是如ArrayBuffer，MessagePort或ImageBitmap的实例对象。transferList数组中不可传入null。
     */
    postMessage( message = {}, transfer ){
        ( transfer && transfer.length > 0 )
        ? ( this[ this.workerInsName_str ].postMessage( message, [ ...transfer ] ) )
        : ( this[ this.workerInsName_str ].postMessage( message ) );
    }

    /**
     * 立即停止Worker对象
     */
    terminate(){
        this[ this.workerInsName_str ].terminate();
    }
}

const obj = {
    ServiceWorker4MT,
    SWContainer,
    SWorker4MT,
    SWRegistration,
    WWorker4MT,
};

export {
    ServiceWorker4MT,
    SWContainer,
    SWorker4MT,
    SWRegistration,
    WWorker4MT,
};

export default obj;
