/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * onappinstalled和onbeforeinstallprompt的事件封装。<br />
 * 有的浏览器(基于谷歌浏览器内核开发的第三方浏览器)虽然显示支持这两个事件，但不触发！<br /><br />
 *
 * 注：<br />
 * 1、onappinstalled<br />
 * 当在浏览器上完成添加到主屏幕的时候会触发这个事件！否则不触发该事件！<br />
 * 有的浏览器在完成添加到主屏幕的时候，会直接退出浏览器，导致没法进行触发后的其他处理！<br />
 * PC和移动端兼容性都有所不同！用的时候注意些！<br />
 * iOS上的浏览器目前都不行！但可以使用“window.navigator.standalone”来判断是不是从主屏幕打开的！<br />
 * Android设备上的谷歌浏览器支持的很好！其他基于谷歌浏览器内核开发的第三方浏览器兼容的不同，有的可以有的不行！Edge浏览器可以！<br />
 * PC的Windows上，谷歌浏览器和QQ浏览器支持！<br />
 * 有的浏览器(基于谷歌浏览器内核开发的第三方浏览器)虽然显示支持该事件，但不触发！<br /><br />
 *
 * 2、onbeforeinstallprompt<br />
 * PC和移动端兼容性都有所不同！用的时候注意些！<br />
 * 目前只有Windows 、Android上的谷歌浏览器支持！<br />
 * Windows 、Android上的基于谷歌浏览器内核开发的第三方浏览器支持不一！<br />
 * Android上的Edge浏览器支持！Android上的Opera浏览器却不支持(虽然显示支持该事件，但不触发)！<br />
 * PC上的QQ浏览器支持！<br />
 * 有的浏览器(基于谷歌浏览器内核开发的第三方浏览器)虽然显示支持该事件，但不触发！<br />
 * 它需要满足以下条件才能触发：<br />
 * 1、Web App尚未安装到主屏幕(也就是还没进行添加到主屏幕的操作，或者已经安装过了，但又刷新了该页面)；<br />
 * 2、manifest.json(Web App的配置清单)中的prefer_related_applications属性的属性值不能是true；<br />
 * 3、添加主屏幕的操作由用户触发，而且用户与当前页面进行了超过30秒的交互(貌似没有也行)；<br />
 * 4、manifest.json(Web App的配置清单)中必须包括如下属性：<br />
 *    short_name属性、name属性、start_url属性；<br />
 *    icons属性，必须包含192x192(px)和512x512(px)大小的图标<br />
 *    display属性的属性值必须是其中一个：fullscreen、standalone、minimal-ui<br />
 * 5、当前页面是在HTTPS协议下(serviceWorker需要的)<br />
 * 6、已向serviceWorker注册了fetch事件
 */
class AppInstallEvent {

    #onAppInstalled;
    #accepted;
    #dismissed;

    beforeInstallPrompt_eve = undefined;
    userChoiceResult_obj = undefined;

    /**
     * 构造函数，初始化事件。
     *
     * @param arg_obj JSON对象，配置对象，可选。<br />
     * {<br />
     *  onAppInstalled, // 当onappinstalled触发时，所要执行的函数，会有一个event参数(onappinstalled的event参数)，可选。<br /><br />
     *
     *  onBeforeInstallPrompt, // 当onbeforeinstallprompt触发时，所要执行的函数，会有一个event参数(onbeforeinstallprompt的event参数)，可选。<br /><br />
     *
     *  isPreventDefault, // 布尔值，true禁用默认事件，false反之，默认值true，可选。<br /><br />
     *
     *  accepted, // 当用户确定添加到主屏幕时，会被执行的函数，有一个userChoiceResult_obj参数({ outcome: 'accepted', platform: 'web' })，可选。<br /><br />
     *
     *  dismissed, // 当用户取消添加到主屏幕时，会被执行的函数，有一个userChoiceResult_obj参数({ outcome: 'dismissed', platform: '' })，可选。<br /><br />
     *
     *  rejected // onbeforeinstallprompt的event.userChoice的拒绝事件，有一个error参数，可选。
     */
    constructor( arg_obj = {} ){
        let pra_obj = Object.assign( {
            onAppInstalled: event => {
                console.log( 'window.onappinstalled触发了！' );
            },
            onBeforeInstallPrompt: event => {
                console.log( 'window.onbeforeinstallprompt触发了！' );
            },
            isPreventDefault: true,
            accepted: userChoiceResult => {
                console.log( '已经添加到主屏幕了！' );
            },
            dismissed: userChoiceResult => {
                console.log( '还没添加到主屏幕！' );
            },
            rejected: error => {
                console.error( error.message );
            },
        }, arg_obj );
        this.#onAppInstalled = pra_obj.onAppInstalled;
        this.#accepted = pra_obj.accepted;
        this.#dismissed = pra_obj.dismissed;
        window.onappinstalled = event => void ( this.#onAppInstalled( event ) );
        window.onbeforeinstallprompt = event => {
            pra_obj.isPreventDefault && ( event.preventDefault(), event.stopPropagation(), event.stopImmediatePropagation() );
            this.beforeInstallPrompt_eve = event;
            pra_obj.onBeforeInstallPrompt( event );
            event[ 'userChoice' ].then( userChoiceResult => {
                                     this.userChoiceResult_obj = userChoiceResult;
                                     if( userChoiceResult === undefined || userChoiceResult[ 'outcome' ] === 'dismissed' ){
                                         this.#dismissed( userChoiceResult );
                                         this.beforeInstallPrompt_eve = event;
                                         this.userChoiceResult_obj = userChoiceResult;
                                     }
                                     else if( userChoiceResult[ 'outcome' ] === 'accepted' ){
                                         this.#accepted( userChoiceResult );
                                         this.beforeInstallPrompt_eve = undefined;
                                         this.userChoiceResult_obj = undefined;
                                     }
                                 } )
                                 .catch( pra_obj.rejected );
        };
    }

    /**
     * 当onappinstalled触发时，所要执行的函数。
     *
     * @param event 函数，会有一个event参数(onappinstalled的event参数)，必须。
     */
    onAppInstalled( event ){
        this.#onAppInstalled = event;
    }

    /**
     * 当onbeforeinstallprompt第一次被触发后，或outcome === 'dismissed'时，这两种情况下，调用该方法会触发添加到主屏幕的提示。
     */
    prompt(){
        let event1 = this.beforeInstallPrompt_eve,
            obj1 = this.userChoiceResult_obj;
        ( ( event1 && obj1 === undefined ) || ( event1 && obj1 !== undefined && obj1[ 'outcome' ] === 'dismissed' ) ) && ( event1.prompt() );
    }

    /**
     * 当用户确定添加到主屏幕时，会被执行的函数。
     *
     * @param fun 函数，有一个userChoiceResult_obj参数，必须。<br />
     * {<br />
     *  outcome: 'accepted',<br />
     *  platform: 'web'
     */
    accepted( fun ){
        this.#accepted = fun;
    }

    /**
     * 当用户取消添加到主屏幕时，会被执行的函数。
     *
     * @param fun 函数，有一个userChoiceResult_obj参数，必须。<br />
     * {<br />
     *  outcome: 'dismissed',<br />
     *  platform: ''
     */
    dismissed( fun ){
        this.#dismissed = fun;
    }
}

/**
 * 返回一个对象，有onappinstalled属性和onbeforeinstallprompt属性，都是布尔值。用于判断浏览器是否支持这两个事件！<br />
 * 有的浏览器(基于谷歌浏览器内核开发的第三方浏览器)虽然显示支持这两个事件，但不触发！！！<br /><br />
 *
 * 注：<br />
 * 1、onappinstalled<br />
 * 当在浏览器上完成添加到主屏幕的时候会触发这个事件！否则不触发该事件！<br />
 * 有的浏览器在完成添加到主屏幕的时候，会直接退出浏览器，导致没法进行触发后的其他处理！<br />
 * PC和移动端兼容性都有所不同！用的时候注意些！<br />
 * iOS上的浏览器目前都不行！但可以使用“window.navigator.standalone”来判断是不是从主屏幕打开的！<br />
 * Android设备上的谷歌浏览器支持的很好！其他基于谷歌浏览器内核开发的第三方浏览器兼容的不同，有的可以有的不行！Edge浏览器可以！<br />
 * PC的Windows上，谷歌浏览器和QQ浏览器支持！<br />
 * 有的浏览器(基于谷歌浏览器内核开发的第三方浏览器)虽然显示支持该事件，但不触发！！！<br /><br />
 *
 * 2、onbeforeinstallprompt<br />
 * PC和移动端兼容性都有所不同！用的时候注意些！<br />
 * 目前只有Windows 、Android上的谷歌浏览器支持！<br />
 * Windows 、Android上的基于谷歌浏览器内核开发的第三方浏览器支持不一！<br />
 * Android上的Edge浏览器支持！Android上的Opera浏览器却不支持(虽然显示支持该事件，但不触发)！<br />
 * PC上的QQ浏览器支持！<br />
 * 有的浏览器(基于谷歌浏览器内核开发的第三方浏览器)虽然显示支持该事件，但不触发！<br />
 * 它需要满足以下条件才能触发：<br />
 * 1、Web App尚未安装到主屏幕(也就是还没进行添加到主屏幕的操作，或者已经安装过了，但又刷新了该页面)；<br />
 * 2、manifest.json(Web App的配置清单)中的prefer_related_applications属性的属性值不能是true；<br />
 * 3、添加主屏幕的操作由用户触发，而且用户与当前页面进行了超过30秒的交互(貌似没有也行)；<br />
 * 4、manifest.json(Web App的配置清单)中必须包括如下属性：<br />
 *    short_name属性、name属性、start_url属性；<br />
 *    icons属性，必须包含192x192(px)和512x512(px)大小的图标<br />
 *    display属性的属性值必须是其中一个：fullscreen、standalone、minimal-ui<br />
 * 5、当前页面是在HTTPS协议下(serviceWorker需要的)<br />
 * 6、已向serviceWorker注册了fetch事件
 *
 * @returns {{onbeforeinstallprompt: boolean, onappinstalled: boolean}} {onbeforeinstallprompt: boolean, onappinstalled: boolean}
 */
function IsSupport(){
    return {
        onappinstalled: 'onappinstalled' in window,
        onbeforeinstallprompt: 'onbeforeinstallprompt' in window
    };
}

/**
 * 判断当前的display-mode是否跟指定的mode_str一样，用于辅助提示用户将Web App添加到主屏幕！
 *
 * @param mode_str 字符串，display-mode的值：fullscreen、standalone、minimal-ui、browser，默认值是'fullscreen'，可选。
 *
 * @param yes_fun 函数，如果当前的display-mode是指定的mode_str值，就会触发这个函数，可选。
 *
 * @param no_fun 函数，如果当前的display-mode不是指定的mode_str值，就会触发这个函数，可选。
 */
function DisplayMode( mode_str = 'fullscreen', yes_fun = () => {
}, no_fun = () => {
} ){
    window.matchMedia( `(display-mode: ${ mode_str })` ).matches
    ? ( yes_fun() )
    : ( no_fun() );
}

export {
    AppInstallEvent,
    IsSupport,
    DisplayMode
};
export default AppInstallEvent;
