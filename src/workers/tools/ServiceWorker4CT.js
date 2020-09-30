/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

globalThis.importScripts( './tools/WWorker4CT.compiler.js' );

// extendableEvent.waitUntil(promise)
//
// 1、
// extendableEvent.waitUntil(promise)方法告诉事件调度程序工作正在进行。它还可以用来检测该工作是否成功。在ServiceWorkers中，waitUntil(promise)
// 告诉浏览器工作一直在进行，直到promise完成，如果它希望完成工作，就不应该终止服务工作者。
//
// 2、
// ServiceWorkers中的安装事件( install events )使用waitUntil(promise)将ServiceWorker保持在安装阶段，直到任务完成。如果传递给waitUntil(promise)
// 的promise被拒绝，则安装将被视为失败，安装服务工作者将被丢弃。这主要用于确保在成功填充所依赖的所有核心缓存之前，不会考虑安装服务工作者(installed)。
//
// 3、
// ServiceWorkers中的activate事件( activate events )使用waitUntil(promise)来缓冲函数事件，如fetch和push，直到传递给waitUntil(promise)的promise结束。
// 这为服务工作人员提供了更新数据库架构和删除过时缓存的时间，因此其他事件可以依赖于完全升级的状态。
//
// 4、
// waitUntil(promise)方法最初必须在事件回调中调用，但之后可以多次调用它，直到传递给它的所有承诺都解决为止。
//
// addEventListener('install', event => {
// const preCache = async () => {
// const cache = await caches.open('static-v1');
// return cache.addAll([
// '/',
// '/about/',
// '/static/styles.css'
// ]);
// };
// event.waitUntil(preCache());
// });

// Service​Worker​Global​Scope​.skip​Waiting()
// Returns:
// A Promise that immediately resolves with undefined.
// self.skipWaiting().then(function resolves() {
// // resolves函数没有参数
// // Do something
// });
//
// 1、
// ServiceWorkerGlobalScope.skipWaiting()方法强制等待的服务工作进程成为活动的服务工作进程。
//
// 2、
// 将此方法与Clients.claim()一起使用，以确保对基础服务工作线程的更新立即对当前客户端和所有其他活动客户端生效。
//
// 3、
// 虽然self.skipWaiting()可以在服务工作者执行过程中的任何时间点调用，但只有在新安装的服务工作者可能仍处于等待状态时，它才会起作用。
// 因此，通常从InstallEvent处理程序内部调用self.skipWaiting()。
// self.addEventListener('install', function(event) {
// // The promise that skipWaiting() returns can be safely ignored.
// self.skipWaiting();
// // Perform any other actions required for your
// // service worker to install, potentially inside
// // of event.waitUntil();
// });
//
// self.skipWaiting().then(function resolves() {
// // resolves函数没有参数
// // Do something
// });

// Clients​.claim()
// Parameters:
// None.
// Returns:
// A Promise for void
//
// The claim() method of the Clients允许活动服务工作人员(active)将自己设置为其作用域内所有客户机的控制器。
// 这将在受此服务工作者控制的任何客户机中的navigator.serviceWorker上触发“controllerchange”事件。
//
// 当服务工作者最初注册时，页面将在下次加载之前不使用它。claim()方法会立即控制这些页。
// 请注意，这会导致服务工作者控制定期通过网络加载的页面，或者可能通过其他服务工作者加载的页面。
//
// 下面的示例在服务工作者的“activate”事件侦听器中使用claim()，这样在相同作用域中加载的客户机通过此服务工作者之前就不需要重新加载它们。
//
// self.addEventListener('activate', event => {
// event.waitUntil(clients.claim());
// });

/**
 * ServiceWorker子线程工具<br />
 * 包含ServiceWorkerGlobalScope<br />
 * ServiceWorkerGlobalScope继承WorkerGlobalScope继承EventTarget继承Object<br /><br />
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
 * ServiceWorkerGlobalScope不支持localStorage和sessionStorage！<br />
 * ServiceWorkerGlobalScope不支持XMLHttpRequest！但是支持fetch！<br />
 * WorkerGlobalScope不支持localStorage和sessionStorage！<br />
 * WorkerGlobalScope不支持XMLHttpRequest！但是支持fetch！<br />
 * ServiceWorkerGlobalScope、WorkerGlobalScope不支持同步功能的API！<br />
 * 但是可以使用IndexedDB进行存储！<br /><br />
 *
 * Service Worker生命周期：<br />
 * installing--->installed--->activating--->activated<br />
 * 特殊：redundant(当前的worker正在被其他worker替换)<br /><br />
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
 * 脚本可以按任何顺序下载，但将按将文件名传递到importScripts()的顺序执行。这是同步完成的；在加载和执行所有脚本之前，importScripts()不会返回。<br />
 */
class ServiceWorker4CT
    extends WWorker4CT {

    _self;
    onMessageFun;

    /**
     * 构造函数
     *
     * @param _self
     *
     *
     * @param arg_obj
     */
    constructor( _self, arg_obj = {} ){
        super();

        let pea_obj = Object.assign( {
            onMessage: event => {
                console.log( 'onMessage Start' );
                console.dir( event );
                console.log( 'onMessage End' );
            },
        }, arg_obj );

        this._self = _self;
        this.onMessageFun = pea_obj.onMessage;

        _self.onmessage = event => void ( this.onMessageFun( event ) );
    }

    /**
     * onMessage函数
     *
     * @param fun
     *
     */
    onMessage( fun = event => {
    } ){
        this.onMessageFun = fun;
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

globalThis.ServiceWorker4CT = ServiceWorker4CT;
