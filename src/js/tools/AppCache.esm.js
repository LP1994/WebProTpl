/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

/**
 * 一个封装了ApplicationCache基本操作的类，过时了，建议不要用了，建议用Service Worker！
 */
class AppCache {

    appCache_obj;

    #onChecking_fun;
    #onNoUpdate_fun;
    #onDownLoading_fun;
    #onProgress_fun;
    #onCached_fun;
    #onUpdateReady_fun;
    #onObsolete_fun;
    #onError_fun;

    /**
     * 初始化构造函数。
     *
     * @param arg_obj JSON对象，配置参数，可选。<br />
     * {<br />
     * isUpdate: false, // 布尔值，默认false，初始化构造函数时，是否启动更新缓存并且切换到新缓存，而后刷新页面。<br />
     * 注：<br />
     * window.navigator.onLine ===true 而且  window.applicationCache === 1<br />
     * 才会启动更新缓存并且切换到新缓存，而后刷新页面！<br /><br />
     *
     * onChecking: event => {}, // 当用户代理检查更新或尝试首次下载缓存清单时，将触发checking事件。浏览器正在获取初始清单或检查清单更新。<br /><br />
     *
     * onNoUpdate: event => {}, // 如果清单未更改，则在检查应用程序缓存更新后会触发noupdate事件。没有更新可用，当前的清单是最新版。<br /><br />
     *
     * onDownLoading: event => {}, // 检查应用程序缓存更新后，如果用户代理已找到更新并正在获取更新，或者是第一次下载缓存清单列出的资源，则会触发downloading事件。<br /><br />
     *
     * onProgress: event => {}, // 当用户代理下载清单列出的资源时，将触发progress事件。<br /><br />
     *
     * onCached: event => {}, // 下载应用程序缓存清单中列出的资源后，将触发缓存事件，现在缓存应用程序。清单里指定的所有内容都已被下载和缓存了。<br /><br />
     *
     * onUpdateReady: event => {}, // 当新应用程序缓存清单中列出的资源已重新加载时，将触发updateready事件，并且脚本可以使用swapCache()切换到新缓存。<br /><br />
     *
     * onObsolete: event => {}, // 当发现清单已成为404或410页时，会触发过时事件，因此正在删除应用程序缓存。缓存已被废弃。<br /><br />
     *
     * onError: event => {} // 下载缓存清单或更新应用程序内容时发生错误时会触发错误事件。<br /><br />
     *
     * 注：<br />
     * 一、非安全协议（不是https或本地协议）下“window.applicationCache”为“undefined”！只会返回null！<br />
     * 二、window.applicationCache.status为“0”和“5”时，只会返回null！<br />
     * 0：应用程序缓存对象未完全初始化！或此文档没有缓存，或者缓存数据尚未被下载！<br />
     * 5：应用程序缓存组现已过时。缓存数据已被废弃，不应该再使用了！这是请求清单文件时返回HTTP状态码是4XX所造成的（通常表明清单文件已被移走/删除）！
     */
    constructor( arg_obj = {} ){
        if( !window.applicationCache ){
            throw new Error( '不是https或本地协议下“window.applicationCache”为“undefined”！' );
            return null;
        }
        let status_num = window.applicationCache.status;
        if( status_num === 0 ){
            return null;
        }
        else if( status_num === 5 ){
            return null;
        }

        let pra_obj = Object.assign( {
            isUpdate: false,
            onChecking: event => {
            },
            onNoUpdate: event => {
            },
            onDownLoading: event => {
            },
            onProgress: event => {
            },
            onCached: event => {
            },
            onUpdateReady: event => {
            },
            onObsolete: event => {
            },
            onError: event => {
            }
        }, arg_obj );
        this.appCache_obj = window.applicationCache;
        this.#onChecking_fun = pra_obj.onChecking;
        this.#onNoUpdate_fun = pra_obj.onNoUpdate;
        this.#onDownLoading_fun = pra_obj.onDownLoading;
        this.#onProgress_fun = pra_obj.onProgress;
        this.#onCached_fun = pra_obj.onCached;
        this.#onUpdateReady_fun = pra_obj.onUpdateReady;
        this.#onObsolete_fun = pra_obj.onObsolete;
        this.#onError_fun = pra_obj.onError;
        this.appCache_obj.onchecking = event => void ( this.#onChecking_fun( event ) );
        this.appCache_obj.onnoupdate = event => void ( this.#onNoUpdate_fun( event ) );
        this.appCache_obj.ondownloading = event => void ( this.#onDownLoading_fun( event ) );
        this.appCache_obj.onprogress = event => void ( this.#onProgress_fun( event ) );
        this.appCache_obj.oncached = event => void ( this.#onCached_fun( event ) );
        this.appCache_obj.onupdateready = event => void ( this.#onUpdateReady_fun( event ) );
        this.appCache_obj.onobsolete = event => void ( this.#onObsolete_fun( event ) );
        this.appCache_obj.onerror = event => void ( this.#onError_fun( event ) );
        if( pra_obj.isUpdate && window.navigator.onLine && this.appCache_obj.status === 1 ){
            this.#onUpdateReady_fun = event => {
                this.appCache_obj.swapCache();
                window.location.reload();
            };
            this.appCache_obj.update();
        }
    }

    /**
     * 当用户代理检查更新或尝试首次下载缓存清单时，将触发checking事件。浏览器正在获取初始清单或检查清单更新。
     *
     * @param checking_fun 函数，会有一个event参数，必须。
     */
    onChecking( checking_fun ){
        this.#onChecking_fun = checking_fun;
    }

    /**
     * 如果清单未更改，则在检查应用程序缓存更新后会触发noupdate事件。没有更新可用，当前的清单是最新版。
     *
     * @param noUpdate_fun 函数，会有一个event参数，必须。
     */
    onNoUpdate( noUpdate_fun ){
        this.#onNoUpdate_fun = noUpdate_fun;
    }

    /**
     * 检查应用程序缓存更新后，如果用户代理已找到更新并正在获取更新，或者是第一次下载缓存清单列出的资源，则会触发downloading事件。
     *
     * @param downLoading_fun 函数，会有一个event参数，必须。
     */
    onDownLoading( downLoading_fun ){
        this.#onDownLoading_fun = downLoading_fun;
    }

    /**
     * 当用户代理下载清单列出的资源时，将触发progress事件。
     *
     * @param progress_fun 函数，会有一个event参数，必须。
     */
    onProgress( progress_fun ){
        this.#onProgress_fun = progress_fun;
    }

    /**
     * 下载应用程序缓存清单中列出的资源后，将触发缓存事件，现在缓存应用程序。清单里指定的所有内容都已被下载和缓存了。
     *
     * @param cached_fun 函数，会有一个event参数，必须。
     */
    onCached( cached_fun ){
        this.#onCached_fun = cached_fun;
    }

    /**
     * 当新应用程序缓存清单中列出的资源已重新加载时，将触发updateready事件，并且脚本可以使用swapCache()切换到新缓存。
     *
     * @param updateReady_fun 函数，会有一个event参数，必须。
     */
    onUpdateReady( updateReady_fun ){
        this.#onUpdateReady_fun = updateReady_fun;
    }

    /**
     * 当发现清单已成为404或410页时，会触发过时事件，因此正在删除应用程序缓存。缓存已被废弃。
     *
     * @param obsolete_fun 函数，会有一个event参数，必须。
     */
    onObsolete( obsolete_fun ){
        this.#onObsolete_fun = obsolete_fun;
    }

    /**
     * 下载缓存清单或更新应用程序内容时发生错误时会触发错误事件。
     *
     * @param error_fun 函数，会有一个event参数，必须。
     */
    onError( error_fun ){
        this.#onError_fun = error_fun;
    }

    /**
     * 更新缓存以确保清单里的项目都已下载了最新的版本。
     */
    update(){
        this.appCache_obj.update();
    }

    /**
     * 更新缓存并且在有新缓存时，切换到新缓存。
     *
     * @param arg_fun 回调函数，会有一个event参数，可选，建议，执行页面刷新一类的操作。<br />
     * 注：<br />
     * goNewCache函数不可用！未联网或应用程序缓状态不是“IDLE(应用程序缓存当前未处于更新过程中。缓存没有执行任何操作)”
     */
    goNewCache( arg_fun = () => {
    } ){
        if( window.navigator.onLine && this.gStatus() === 1 ){
            this.#onUpdateReady_fun = event => {
                this.appCache_obj.swapCache();
                arg_fun( event );
            };
            this.appCache_obj.update();
        }
    }

    /**
     * 交换当前缓存与较新的缓存。
     */
    swapCache(){
        this.appCache_obj.swapCache();
    }

    /**
     * 缓存状态值。<br /><br />
     *
     * UNCACHED: 0<br />
     * // 一个特殊值，指示应用程序缓存对象未完全初始化。此文档没有缓存，或者缓存数据尚未被下载<br />
     * IDLE: 1<br />
     * // 应用程序缓存当前未处于更新过程中。缓存没有执行任何操作<br />
     * CHECKING: 2<br />
     * // 正在获取清单并检查更新。浏览器正在检查清单或清单所指定项目的更新<br />
     * DOWNLOADING: 3<br />
     * // 由于资源清单已更改，正在下载资源以添加到缓存中。浏览器正在下载清单或内容的更新<br />
     * UPDATEREADY: 4<br />
     * // 有一个新版本的应用程序缓存可用。有一个相应的updateready事件，cached当下载了一个新的更新但尚未使用该swapCache()方法激活时，会触发该事件而不是事件。<br />
     * // 有更新后的缓存数据可用<br />
     * OBSOLETE: 5<br />
     * // 应用程序缓存组现已过时。缓存数据已被废弃，不应该再使用了，这是请求清单文件时返回HTTP状态码是4XX所造成的（通常表明清单文件已被移走/删除）<br />
     *
     * @returns {number} 数值
     */
    gStatus(){
        return this.appCache_obj.status;
    }

}

export { AppCache };
export default AppCache;
