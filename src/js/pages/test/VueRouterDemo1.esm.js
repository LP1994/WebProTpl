/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let CT = new CTESM.CT();

Vue.use( VueRouter );

const Router1 = {
        template: `<div class = 'css-reset'>Router1</div>`,
        beforeRouteUpdate( to, from, next ){
            console.log( 'Router1 Start' );
            console.dir( to );
            console.dir( from );
            console.dir( next );
            console.log( 'Router1 End' );

            next();
        },
    },
    Router2 = {
        template: `<div class = 'css-reset'>Router2</div>`,
        beforeRouteUpdate( to, from, next ){
            console.log( 'Router2 Start' );
            console.dir( to );
            console.dir( from );
            console.dir( next );
            console.log( 'Router2 End' );

            next();
        },
    },
    User = {
        template: `<div class = 'css-reset'>userID: 
{{ this.$route.params.id }}<br />
{{ this.$route.params }}<br />
{{ this.$route.query }}<br />
</div>`,
        beforeRouteUpdate( to, from, next ){
            console.log( 'User Start' );
            console.dir( to );
            console.dir( from );
            console.dir( next );
            console.log( 'User End' );

            next();
        },
    };
const router = new VueRouter( {
    base: '/',
    mode: 'hash',
    routes: [
        {
            path: '/router1',
            component: Router1,
        },
        {
            path: '/router2',
            component: Router2,
        },
        {
            name: 'User',
            path: '/user/:id',
            component: User,
        },
    ],
} );

const data1_obj = {
    userID: 'Q1',
};

let vueR4Win = new Vue( {
    el: '#VueRouterDemo1',
    router,
    data: {
        ...data1_obj,
    },
    computed: {},
    methods: {
        btnClick1( event ){
            console.dir( this.$route );
            console.dir( this.$router );
        },
    },
    watch: {
        /*
         '$route.params'( to, from ){
         console.dir( to );
         console.dir( from );
         },
         */
    },
    filters: {},
    components: {},
    directives: {
        focus: {
            // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
            bind( el, binding, vnode, oldVnode ){
                el.value = binding.value;
            },
            // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
            inserted( el, binding, vnode, oldVnode ){
                el.focus();
            },
            // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
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
} );
window.vueR4Win = vueR4Win;
