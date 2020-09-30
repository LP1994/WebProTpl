/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

globalThis.importScripts( './tools/WWorker4CT.compiler.js' );

/**
 * 子线程(“Shared Worker”线程)<br />
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
 * 使用：<br />
 * 在要用这个工具的JS文件里self.importScripts('这个子线程(“Worker”线程)工具就行');<br /><br />
 *
 * 注：<br />
 * self === this<br />
 * 火狐浏览器却可以，但是没法将console.dir生效！<br /><br />
 *
 * 工作线程可以访问全局函数importScripts()，该函数允许它们导入脚本。它接受零个或多个URI作为要导入的资源的参数；以下所有示例都有效：<br />
 * importScripts( 'foo.js', ... )，支持外部js的URL<br />
 * importScripts('//example.com/hello.js')<br /><br />
 *
 * 例如：<br />
 * TestClassA.js的内容：<br />
 * class TestClassA{<br />
 * constructor(){<br />
 * console.log( 'TestClassA' );<br />
 * }<br />
 * }<br />
 * let q1 = 11;<br /><br />
 *
 * 子线程写如下代码：<br />
 * importScripts('TestClassA.js')<br />
 * 随后子线程直接运行如下代码：<br />
 * new TestClassA();<br />
 * console.dir( q1 );<br />
 * 就能运行了！<br />
 * 也就是说所加载的JS的所有的全局变量都能在加载后使用！<br /><br />
 *
 * 浏览器加载每个列出的脚本并执行它。然后，每个脚本中的任何全局对象都可以由工作人员使用。<br />
 * 如果无法加载脚本，将引发网络错误，并且不会执行后续代码。但是，以前执行的代码（包括使用window.setTimeout（）延迟的代码）仍然可以正常工作。<br />
 * importScripts()方法之后的函数声明也会保留，因为这些声明总是在其余代码之前进行计算。<br /><br />
 *
 * 脚本可以按任何顺序下载，但将按将文件名传递到importScripts()的顺序执行。这是同步完成的；在加载和执行所有脚本之前，importScripts()不会返回。
 */
class SWorker4CT
    extends WWorker4CT {
    _self;
    port;
    onConnectFun;
    portOnMessageFun;
    portOnMessageErrorFun;

    /**
     * 构造函数(这个类继承了“WWorker4CT”类)<br />
     * PS：使用推荐<br />
     * 1、无特殊需求！！！<br />
     * 传以下两个参数就行：<br />
     * portOnMessage<br />
     * portOnMessageError<br />
     * 如果需要在连接成功时做些额外的事情，可以传“onConnect”这个参数！！！
     *
     * 2、如果传了“onConnect”<br />
     * 可以通过第二个(onConnectEvent)参数重置port上面的事件<br />
     * port = onConnectEvent.ports[ 0 ]<br />
     * port上有onmessage、onmessageerror、close()、postMessage()、start()
     *
     * @param _self Worker线程的全局顶级变量self，必须。
     *
     * @param arg_obj JSON配置对象，可选。<br />
     * {<br />
     * onConnect: 函数，会有两个( port, onConnectEvent )参数<br />
     * PS：<br />
     * 当主线程开始连接子线程时，并且子线程响应了该连接，就会触发这个事件。<br />
     * 注：<br />
     * port = onConnectEvent.ports[ 0 ]<br />
     * port上有onmessage、onmessageerror、close()、postMessage()、start()<br /><br />
     *
     * portOnMessage: 函数，会有三个(portEvent, port, onConnectEvent)参数<br />
     * PS：<br />
     * 当MessagePort端口收到主线程的消息时，会触发。<br />
     * portEvent这个参数有一个表示主线程消息的数据属性data：portEvent.data<br />
     * portEvent.data里头存放着主线程发来的数据<br /><br />
     *
     * portOnMessageError: 函数，会有三个(portEvent, port, onConnectEvent)参数<br />
     * PS：<br />
     * 当MessagePort端口接收到无法反序列化的消息时，会触发。
     */
    constructor( _self, arg_obj = {} ){
        let pra_obj = Object.assign( {
            onConnect: ( port, onConnectEvent ) => {
            },
            portOnMessage: ( portEvent, port, onConnectEvent ) => {
            },
            portOnMessageError: ( portEvent, port, onConnectEvent ) => void ( console.error( portEvent.message ) ),
        }, arg_obj );

        super( _self, pra_obj );

        this._self = _self;
        this.onConnectFun = pra_obj.onConnect;
        this.portOnMessageFun = pra_obj.portOnMessage;
        this.portOnMessageErrorFun = pra_obj.portOnMessageError;

        this._self.onconnect = onConnectEvent => {
            this.port = onConnectEvent.ports[ 0 ];

            this.port.onmessage = event => void ( this.portOnMessageFun( event, this.port, onConnectEvent ) );
            this.port.onmessageerror = event => void ( this.portOnMessageErrorFun( event, this.port, onConnectEvent ) );

            this.portStart( this.port );

            this.onConnectFun( this.port, onConnectEvent );
        };
    }

    /**
     * 当主线程开始连接子线程时，并且子线程响应了该连接，就会触发这个事件。
     *
     * @param fun 函数，会有两个( port, onConnectEvent )参数，必须。<br />
     * 注：<br />
     * port = onConnectEvent.ports[ 0 ]<br />
     * port上有onmessage、onmessageerror、close()、postMessage()、start()
     */
    onConnect( fun = ( port, onConnectEvent ) => {
    } ){
        this.onConnectFun = fun;
    }

    /**
     * 当MessagePort端口收到主线程的消息时，会触发。
     *
     * @param fun 函数，会有三个(portEvent, port, onConnectEvent)参数，必须。<br />
     * portEvent这个参数有一个表示主线程消息的数据属性data：portEvent.data<br />
     * portEvent.data里头存放着主线程发来的数据
     */
    portOnMessage( fun = ( portEvent, port, onConnectEvent ) => {
    } ){
        this.portOnMessageFun = fun;
    }

    /**
     * 当MessagePort端口接收到无法反序列化的消息时，会触发。
     *
     * @param fun 函数，会有三个(portEvent, port, onConnectEvent)参数，必须。
     */
    portOnMessageError( fun = ( portEvent, port, onConnectEvent ) => {
    } ){
        this.portOnMessageErrorFun = fun;
    }

    /**
     * 通过port向主线程发送数据。
     *
     * @param port MessagePort，必须。
     *
     * @param message 发送给主线程的数据，数据可以是由结构化克隆算法处理的任何值或JavaScript对象，其包括循环引用，必须。
     *
     * @param transferList 数组， 一个可选的Transferable对象的数组，用于传递所有权。可选。<br />
     * 如果一个对象的所有权被转移，在发送它的上下文中将变为不可用（中止），并且只有在它被发送到的worker中可用<br />
     * 可转移对象是如ArrayBuffer，MessagePort或ImageBitmap的实例对象。transferList数组中不可传入null。<br /><br />
     *
     * 注：<br />
     * postMessage()一次只能发送一个对象。如上所示，如果要传递多个值，可以发送一个数组。<br />
     * 例子中：arrBuf = new ArrayBuffer( 8 )，无论在主线程，还是子线程，postMessage之前都是可用的，之后就把使用权转给了接收方，然后发送方就无法使用了。
     */
    portPostMessage( port, message = {}, transferList ){
        ( transferList && transferList.length > 0 )
        ? ( port.postMessage( message, [ ...transferList ] ) )
        : ( port.postMessage( message ) );
    }

    /**
     * 关闭对应端口的通信。
     *
     * @param port MessagePort，必须。
     */
    portClose( port ){
        port.close();
    }

    /**
     * 启动对应端口的通信。
     *
     * @param port MessagePort，必须。<br />
     * 注：<br />
     * port.addEventListener( 'message', event => {}, false );<br />
     * 使用以上后需要调用：<br />
     * port.start();<br />
     * 以下不用：<br />
     * port.onmessage = event => {};<br />
     */
    portStart( port ){
        port.start();
    }

    /**
     * 返回port，在onconnect事件触发时，会初始化这个port参数。而且只是第一个port，可能存在多个port
     *
     * @returns {port} port。
     */
    gPort(){
        return this.port;
    }
}

globalThis.SWorker4CT = SWorker4CT;
