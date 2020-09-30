/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * 子线程（“Worker”线程）工具<br />
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
 * Object<br /><br />
 *
 * 使用：<br />
 * 在要用这个工具的“JS文件”里执行：<br />
 * self.importScripts( '子线程（“Worker”线程）工具的url路径' );<br /><br />
 *
 * 注：<br />
 * self === this<br /><br />
 *
 * 如果工人愿意，他们可以生产更多的工人。所谓的子工作人员必须与父页面位于同一源中。<br />
 * 此外，子工作程序的URI是相对于父工作程序的位置而不是所属页面的位置来解析的。这使得工人更容易跟踪他们的依赖关系。<br /><br />
 *
 * 工作线程可以访问全局函数importScripts()，该函数允许它们导入脚本。它接受零个或多个URI作为要导入的资源的参数；以下所有示例都有效：<br />
 * importScripts( 'foo.js', ... )，支持外部js的URL<br />
 * importScripts( '//example.com/hello.js' )<br /><br />
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
class WWorker4CT {
    _self;
    onMessageFun;
    onMessageErrorFun;

    /**
     * 子线程(“Worker”线程)工具的构造函数
     *
     * @param _self Worker线程的全局顶级变量self，必须。
     *
     * @param arg_obj JSON对象，可选。<br />
     * {<br />
     * onMessage：函数，会有一个event参数，可选。<br />
     * onMessageError：函数，会有一个event参数，可选。
     */
    constructor( _self, arg_obj ){
        let pra_obj = Object.assign( {
            onMessage: event => {
            },
            onMessageError: event => void ( console.error( event.message ) ),
        }, arg_obj );

        this._self = _self;
        this.onMessageFun = pra_obj.onMessage;
        this.onMessageErrorFun = pra_obj.onMessageError;

        this._self.onmessage = event => void ( this.onMessageFun( event ) );
        this._self.onmessageerror = event => void ( this.onMessageErrorFun( event ) );
    }

    /**
     * 接收到主线程消息的监听事件
     *
     * @param message_fun 函数，会有一个event参数，必须，这个参数有一个表示主线程消息的数据属性data：event.data<br />
     * event.data里头存放着主线程发来的数据。
     */
    onMessage( message_fun = event => {
    } ){
        this.onMessageFun = message_fun;
    }

    /**
     * 接收到无法反序列化的消息时，就会调用它。
     *
     * @param messageError_fun 函数，会有一个event参数，必须。
     */
    onMessageError( messageError_fun = event => {
    } ){
        this.onMessageErrorFun = messageError_fun;
    }

    /**
     * 向主线程发送数据
     *
     * @param message 发送给主线程的数据，数据可以是由结构化克隆算法处理的任何值或JavaScript对象，其包括循环引用，必须。
     *
     * @param transfer 数组， 一个可选的Transferable对象的数组，用于传递所有权。可选。<br />
     * 如果一个对象的所有权被转移，在发送它的上下文中将变为不可用（中止），并且只有在它被发送到的worker中可用。<br />
     * 可转移对象是如ArrayBuffer，MessagePort或ImageBitmap的实例对象。transferList数组中不可传入null。<br /><br />
     *
     * 注：<br />
     * postMessage()一次只能发送一个对象。如上所示，如果要传递多个值，可以发送一个数组。<br />
     * 例子中：arrBuf = new ArrayBuffer( 8 )，无论在主线程，还是子线程，postMessage之前都是可用的，之后就把使用权转给了接收方，然后发送方就无法使用了。
     */
    postMessage( message = {}, transfer ){
        ( transfer && transfer.length > 0 )
        ? ( this._self.postMessage( message, [ ...transfer ] ) )
        : ( this._self.postMessage( message ) );
    }

    /**
     * 立即关闭本子线程。
     */
    close(){
        this._self.close();
    }

    /**
     * 加载JS
     *
     * @param arg 每一个参数都是字符串，rest参数，表示JS的URL，支持外部js的URL，必须。
     */
    importScripts( ...arg ){
        this._self.importScripts( ...arg );
    }
}

globalThis.WWorker4CT = WWorker4CT;
