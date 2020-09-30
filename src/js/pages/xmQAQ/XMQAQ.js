/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

isPro
?
( console.log( '------------------This is production mode------------------' ) )
:
( console.log( '------------------This is development mode------------------' ) );

import AppBtnIcoSrc from 'imgDir/XM_512_512.png';

import 'scssPDir/xmQAQ/XMQAQ.scss';

import AppBtn from 'vueVDir/xmQAQ/AppBtn.vue';
import ImgShowTool from 'vueVDir/xmQAQ/ImgShowTool.vue';

let CT = new CTESM.CT();

const appBtnConfig_arrC = [
    {
        src: AppBtnIcoSrc,
        alt: '轩墨宝宝图集.png',
        appName: '轩墨宝宝图集',
        goTo( event, _this ){
            _this.$root.isShow2ImgShowTool = true;
        },
    },
];

new Vue( {
    el: '#XMQAQ',
    data: {
        appBtnConfig: appBtnConfig_arrC,
        isShow2ImgShowTool: false,
    },
    provide(){
        let _this = this;

        return {};
    },
    computed: {},
    methods: {
        returnTo4ImgShowTool( event, _this ){
            _this.$root.isShow2ImgShowTool = false;
        },
    },
    watch: {},
    filters: {},
    components: {
        AppBtn,
        ImgShowTool,
    },
    directives: {
        focus: {
            // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
            bind( el, binding, vnode, oldVnode ){
            },
            // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
            inserted( el, binding, vnode, oldVnode ){
                el.focus();
            },
            // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
            // 但是你可以通过比较更新前后的值来忽略不必要的模板更新
            update( el, binding, vnode, oldVnode ){
            },
            // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
            componentUpdated( el, binding, vnode, oldVnode ){
            },
            // 只调用一次，指令与元素解绑时调用。
            unbind( el, binding, vnode, oldVnode ){
            },
        },
    },
} );

CT.on( 'html, body, #LocalRoll, #XMQAQ, main', 'touchmove', event => void ( CT.allEStop( event ) ) );
