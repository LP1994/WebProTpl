/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

function Validator2String4NoEmpty( value ){
    return CT.isString( value ) && !CT.isEmpty( value );
}

function Validator2Function( value ){
    return CT.isFunction( value );
}

let CT = new CTESM.CT(),
    AppBtn = {
        data(){
            return {};
        },
        props: {
            src: {
                type: String,
                required: true,
                default: '',
                validator: Validator2String4NoEmpty,
            },
            alt: {
                type: String,
                required: true,
                default: 'AppBtnIco.png',
                validator: Validator2String4NoEmpty,
            },
            appName: {
                type: String,
                required: true,
                default: '轩墨宝宝QAQ',
                validator: Validator2String4NoEmpty,
            },
            goTo: {
                type: Function,
                required: true,
                default: ( event, _this ) => {
                },
                validator: Validator2Function,
            },
        },
        provide(){
            let _this = this;

            return {};
        },
        inject: {},
        computed: {},
        methods: {
            activity( event ){
                this.goTo( event, this );
            },
        },
        watch: {},
        filters: {},
        components: {},
        directives: {},

        /**
         * 在实例初始化之后，数据观测(data observer)和event/watcher事件配置之前被调用。
         * PS：
         * 1、store里的数据源是可以访问的到的
         */
        beforeCreate(){
            let _this = this;
        },
        /**
         * 在实例创建完成后被立即调用。
         * 在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event事件回调。
         * 然而，挂载阶段还没开始，$el属性目前不可见。
         */
        created(){
            let _this = this;
        },

        /**
         * 在挂载开始之前被调用：相关的render函数首次被调用。
         */
        beforeMount(){
            let _this = this;
        },
        /**
         * el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。
         * 如果root实例挂载了一个文档内元素，当mounted被调用时vm.$el也在文档内。
         *
         * 注意：
         * mounted不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用vm.$nextTick替换掉mounted。
         */
        mounted(){
            this.$nextTick( function (){
                let _this = this;

            } );
        },

        /**
         * 数据更新时调用，发生在虚拟DOM打补丁之前。
         * 这里适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器。
         */
        beforeUpdate(){
            let _this = this;
        },
        /**
         * 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子。
         * 当这个钩子被调用时，组件DOM已经更新，所以你现在可以执行依赖于DOM的操作。
         * 然而在大多数情况下，你应该避免在此期间更改状态。
         * 如果要相应状态改变，通常最好使用计算属性或watcher取而代之。
         *
         * 注意：
         * updated不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用vm.$nextTick替换掉updated。
         */
        updated(){
            this.$nextTick( function (){
                let _this = this;

            } );
        },

        /**
         * keep-alive组件激活时调用。
         */
        activated(){
            let _this = this;
        },
        /**
         * keep-alive组件停用时调用。
         */
        deactivated(){
            let _this = this;
        },

        /**
         * 实例销毁之前调用。在这一步，实例仍然完全可用。
         */
        beforeDestroy(){
            let _this = this;
        },
        /**
         * Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
         */
        destroyed(){
            let _this = this;
        },
    };

export {
    AppBtn,
};

export default AppBtn;
