/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import Store from 'vueSDir/Store.esm.js';

// import VueComponDemo from 'vueCompDir/VueComponDemo.vue';
// import ExampleA from 'vueVDir/ExampleA.vue';
// import VueDemo from 'vueVDir/test/VueDemo.vue';

let CT = new CTESM.CT();

let { mapState, mapGetters, mapMutations, mapActions, createNamespacedHelpers, } = Vuex;

if( true ){
    // 全局异步加载一个组件(包含处理加载状态)，标准写法！可以更改组件的相关配置属性！
    // 记得先深度拷贝再修改组件的属性，不然多次如下使用后会出现最后一个组件的修改会覆盖之前组件的修改
    // 不要复制完整对象的描述符(也就是不要执行CT.completeAssign)，不然会出现覆盖的情况！
    let Global4VueComponDemo = Vue.component( 'VueComponDemo', function ( resolve = () => {
        }, reject = () => {
        } ){
            setTimeout( () => {
                resolve( 'VueComponDemo的第二个参数(函数)' );
            }, 1000 );

            return {
                // 需要加载的组件 (应该是一个 `Promise` 对象)
                component: import( 'vueCompDir/VueComponDemo.vue' ).then( function resolve( arg ){
                    let arg1 = CT.deepCopy( arg );

                    Object.assign( arg1.VueComponDemo, {
                        data(){
                            return {
                                textA: '2：期待2020年Vue 3的正式发布！！！',
                            };
                        },
                    } );
                    Object.assign( arg1.default, {
                        data(){
                            return {
                                textA: '2：期待2020年Vue 3的正式发布！！！',
                            };
                        },
                    } );

                    return arg1;
                }, function reject( error ){
                    console.error( error );
                } ),

                // 异步组件加载时使用的组件
                // loading: LoadingComponent,

                // 加载失败时使用的组件
                // error: ErrorComponent,

                // 展示加载时组件的延时时间。默认值是 200 (毫秒)
                delay: 10000,

                // 如果提供了超时时间且组件加载也超时了，
                // 则使用加载失败时使用的组件。默认值是：`Infinity`
                timeout: 10000,
            };
        } ),
        Global4VueComponDemoA = Vue.component( 'VueComponDemoA', function ( resolve = () => {
        }, reject = () => {
        } ){
            setTimeout( () => {
                resolve( 'VueComponDemoA的第二个参数(函数)' );
            }, 1000 );

            return {
                // 需要加载的组件 (应该是一个 `Promise` 对象)
                component: import( 'vueCompDir/VueComponDemo.vue' ).then( function resolve( arg ){
                    let arg1 = CT.deepCopy( arg );

                    Object.assign( arg1.VueComponDemo, {
                        data(){
                            return {
                                textA: '333：期待2020年Vue 3的正式发布！！！',
                            };
                        },
                    } );
                    Object.assign( arg1.default, {
                        data(){
                            return {
                                textA: '333：期待2020年Vue 3的正式发布！！！',
                            };
                        },
                    } );

                    return arg1;
                }, function reject( error ){
                    console.error( error );
                } ),

                // 异步组件加载时使用的组件
                // loading: LoadingComponent,

                // 加载失败时使用的组件
                // error: ErrorComponent,

                // 展示加载时组件的延时时间。默认值是 200 (毫秒)
                delay: 10000,

                // 如果提供了超时时间且组件加载也超时了，
                // 则使用加载失败时使用的组件。默认值是：`Infinity`
                timeout: 10000,
            };
        } ),

        // 全局异步加载一个组件，例子1，标准写法！可以更改组件的相关配置属性！
        // 记得先深度拷贝再修改组件的属性，不然多次如下使用后会出现最后一个组件的修改会覆盖之前组件的修改
        // 不要复制完整对象的描述符(也就是不要执行CT.completeAssign)，不然会出现覆盖的情况！
        Global4ExampleA = Vue.component( 'ExampleA', function ( resolve = () => {
        }, reject = () => {
        } ){
            setTimeout( () => {
                resolve( 'ExampleA的第二个参数(函数)' );
            }, 2000 );

            return import( 'vueVDir/ExampleA.vue' ).then( function resolve( arg ){
                let arg1 = CT.deepCopy( arg );

                Object.assign( arg1.ExampleA, {
                    data(){
                        return {
                            textA: '2：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                    destroyed(){
                        console.log( 'destroyed1' );
                        console.log( 'destroyed1' + this.textA );

                    },
                } );
                Object.assign( arg1.default, {
                    data(){
                        return {
                            textA: '2：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                    destroyed(){
                        console.log( 'destroyed2' );
                        console.log( 'destroyed1' + this.textA );
                    },
                } );

                return arg1;
            }, function reject( error ){
                console.error( error );
            } );
        } ),
        Global4ExampleA1 = Vue.component( 'ExampleA1', function ( resolve = () => {
        }, reject = () => {
        } ){
            setTimeout( () => {
                resolve( 'ExampleA1的第二个参数(函数)' );
            }, 2000 );

            return import( 'vueVDir/ExampleA.vue' ).then( function resolve( arg ){
                let arg1 = CT.deepCopy( arg );

                Object.assign( arg1.ExampleA, {
                    data(){
                        return {
                            textA: '2_1：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                } );
                Object.assign( arg1.default, {
                    data(){
                        return {
                            textA: '2_1：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                } );

                return arg1;
            }, function reject( error ){
                console.error( error );
            } );
        } ),
        // 全局异步加载一个组件，例子2，标准写法！可以更改组件的相关配置属性！
        // 记得先深度拷贝再修改组件的属性，不然多次如下使用后会出现最后一个组件的修改会覆盖之前组件的修改
        // 不要复制完整对象的描述符(也就是不要执行CT.completeAssign)，不然会出现覆盖的情况！
        Global4ExampleA2 = Vue.component( 'ExampleA2', async function ( resolve = () => {
        }, reject = () => {
        } ){
            let { ExampleA, default: ExampleADef } = await import( 'vueVDir/ExampleA.vue' ).then( function resolve( arg ){
                let arg1 = CT.deepCopy( arg );

                Object.assign( arg1.ExampleA, {
                    data(){
                        return {
                            textA: '3：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                } );
                Object.assign( arg1.default, {
                    data(){
                        return {
                            textA: '3：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                } );

                return arg1;
            }, function reject( error ){
                console.error( error );
            } );

            resolve( ExampleADef );
        } ),
        Global4ExampleA21 = Vue.component( 'ExampleA21', async function ( resolve = () => {
        }, reject = () => {
        } ){
            let { ExampleA, default: ExampleADef } = await import( 'vueVDir/ExampleA.vue' ).then( function resolve( arg ){
                let arg1 = CT.deepCopy( arg );

                Object.assign( arg1.ExampleA, {
                    data(){
                        return {
                            textA: '3_111：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                } );
                Object.assign( arg1.default, {
                    data(){
                        return {
                            textA: '3_111：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                        };
                    },
                } );

                return arg1;
            }, function reject( error ){
                console.error( error );
            } );

            resolve( ExampleADef );
        } ),
        // 全局异步加载一个组件，例子3，标准写法！可以更改组件的相关配置属性！
        // 记得先深度拷贝再修改组件的属性，不然多次如下使用后会出现最后一个组件的修改会覆盖之前组件的修改！
        // 不要复制完整对象的描述符(也就是不要执行CT.completeAssign)，不然会出现覆盖的情况！
        Global4ExampleA3 = Vue.component( 'ExampleA3', function ( resolve = () => {
        }, reject = () => {
        } ){
            setTimeout( async () => {
                let { ExampleA, default: ExampleADef } = await import( 'vueVDir/ExampleA.vue' ).then( function resolve( arg ){
                    let arg1 = CT.deepCopy( arg );

                    Object.assign( arg1.ExampleA, {
                        data(){
                            return {
                                textA: '444：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                            };
                        },
                    } );
                    Object.assign( arg1.default, {
                        data(){
                            return {
                                textA: '444：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                            };
                        },
                    } );

                    return arg1;
                }, function reject( error ){
                    console.error( error );
                } );

                resolve( ExampleA );
            }, 3000 );
        } ),
        Global4ExampleA31 = Vue.component( 'ExampleA31', function ( resolve = () => {
        }, reject = () => {
        } ){
            setTimeout( async () => {
                let { ExampleA, default: ExampleADef } = await import( 'vueVDir/ExampleA.vue' ).then( function resolve( arg ){
                    let arg1 = CT.deepCopy( arg );

                    Object.assign( arg1.ExampleA, {
                        data(){
                            return {
                                textA: '4_111：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                            };
                        },
                    } );
                    Object.assign( arg1.default, {
                        data(){
                            return {
                                textA: '4_111：“三权”分离的vue文件写法，以免单个vue文件很长很长！！！',
                            };
                        },
                    } );

                    return arg1;
                }, function reject( error ){
                    console.error( error );
                } );

                resolve( ExampleA );
            }, 3000 );
        } ),

        // 全局注册一个组件，标准写法！
        Global4VueComponentA = Vue.component( 'Global4VueComponentA', {
            data(){
                return {
                    text1: 'This is a VueComponentA for Global!!!',
                };
            },
            props: {},
            provide(){
                let _this = this;

                return {};
            },
            inject: {
                inject0: {
                    default: 'inject0_Default',
                },
                inject1: {
                    // from: 'inject0',
                    default: 'inject1_Default',
                },
                inject2: {
                    // from: 'inject0',
                    default: 'inject2_Default',
                },
                titleAttrKeyValue: {
                    default: 'titleAttrKeyValue_Default',
                },
            },
            computed: {},
            methods: {},
            watch: {},
            filters: {},
            components: {},
            directives: {},
            template: `
              <p class = 'css-reset'>
              {{ text1 }}
              <br />
              inject0: {{ inject0 }}
              <br />
              inject1: {{ inject1 }}
              <br />
              inject2: {{ inject2 }}
              <br />
              titleAttrKeyValue: {{ titleAttrKeyValue }}
              </p>`,
            beforeCreate(){
            },
            created(){
            }
        } ),
        Global4VueComponentA1 = Vue.component( 'Global4VueComponentA1', {
            data(){
                let _this = this;

                return {
                    text1: 'This is a VueComponentA1 for Global!!!',
                    storeCountA4Data: _this.$store.state.countA,
                    data1: 2020,
                };
            },
            props: {},
            provide(){
                let _this = this;

                return {};
            },
            inject: {},
            computed: {
                storeCountA4Computed(){
                    return this.$store.state.countA;
                },
                countAPlus100A(){
                    return this.$store.getters.countAPlus100;
                },
                countAPlus1000FunA(){
                    return this.$store.getters.countAPlus1000Fun( 250 );
                },

                ...mapGetters(
                    /*
                     同名的写法
                     [
                     'countAPlus100',
                     'countAPlus1000Fun',
                     ]
                     */
                    /*别名的写法*/
                    {
                        countAPlus1004My: 'countAPlus100',
                        countAPlus100: 'countAPlus100',
                        countAPlus1000Fun: 'countAPlus1000Fun',
                    }
                ),

                ...mapState(
                    /*
                     写法A：当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
                     [
                     'countA',
                     ]
                     */
                    /*写法B：*/
                    {
                        // 写法一：箭头函数可使代码更简练
                        storeCountA4Computed2: state => state.countA,

                        // 写法二：传字符串参数 'countA' 等同于 `state => state.countA`
                        storeCountA4Computed3: 'countA',

                        // 写法三：为了能够使用 `this` 获取局部状态，必须使用常规函数
                        storeCountA4Computed4( state ){
                            return state.countA + this.data1;
                        },
                    }
                ),
            },
            methods: {
                addStoreCountA(){
                    this.$store.dispatch( 'addCountAction', 1 );
                },
                subStoreCountA(){
                    this.$store.dispatch( 'subCountAction', 1 );
                },

                /*
                 ...mapActions( [
                 // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
                 'increment',
                 // `mapActions` 也支持载荷：
                 // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
                 'incrementBy',
                 ] ),
                 ...mapActions( {
                 // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
                 add: 'increment',
                 } ),
                 */

                /*
                 // 不建议直接去操作提交"mutation"，而因该通过调用actions( this.$store.dispatch( 'subCountAction' ) ),且actions可以处理异步操作
                 ...mapMutations( [
                 // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
                 'increment',
                 // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
                 'incrementBy',
                 ] ),
                 ...mapMutations( {
                 // 将 `this.add()` 映射为 `this.$store.commit('increment')`
                 add: 'increment',
                 } ),
                 */
            },
            watch: {},
            filters: {},
            components: {},
            directives: {},
            template: `
              <div class = 'css-reset'>
              <p class = 'css-reset'>storeCountA4Computed--->{{ storeCountA4Computed }}</p>
              <br />
              <p class = 'css-reset'>storeCountA4Computed2--->{{ storeCountA4Computed2 }}</p>
              <br />
              <p class = 'css-reset'>storeCountA4Computed3--->{{ storeCountA4Computed3 }}</p>
              <br />
              <p class = 'css-reset'>storeCountA4Computed4--->{{ storeCountA4Computed4 }}</p>
              <br />
              <p class = 'css-reset'>countAPlus100A--->{{ countAPlus100A }}</p>
              <br />
              <p class = 'css-reset'>countAPlus1000FunA--->{{ countAPlus1000FunA }}</p>
              <br />
              <p class = 'css-reset'>countAPlus100--->{{ countAPlus100 }}</p>
              <br />
              <p class = 'css-reset'>countAPlus1000Fun--->{{ countAPlus1000Fun( 10000 ) }}</p>
              <br />
              <p class = 'css-reset'>countAPlus1004My--->{{ countAPlus1004My }}</p>
              <br />
              <!--<p class = 'css-reset'>countA-&ndash;&gt;{{ countA }}</p>
              <br />-->
              <p class = 'css-reset'>storeCountA4Data--->{{ storeCountA4Data }}</p>
              <br />
              <button type = 'button'
                      class = 'css-reset addStoreCountA flexBox flexC'
                      @click = 'addStoreCountA'>+StoreCountA
              </button>
              <br />
              <button type = 'button'
                      class = 'css-reset subStoreCountA flexBox flexC'
                      @click = 'subStoreCountA'>-StoreCountA
              </button>
              </div>`,
            beforeCreate(){
            }
        } ),

        // 全局异步加载一个来自服务器的组件，标准写法！
        Global4VueComponentB = Vue.component( 'Global4VueComponentB', function ( resolve = () => {
        }, reject = () => {
        } ){
            setTimeout( () => {
                resolve( {
                    data(){
                        return {
                            text1: 'This is a VueComponentB for Global!!!',
                        };
                    },
                    props: {},
                    provide(){
                        let _this = this;

                        return {};
                    },
                    inject: {},
                    computed: {},
                    methods: {},
                    watch: {},
                    filters: {},
                    components: {},
                    directives: {},
                    template: `
                      <p class = 'css-reset'>{{ text1 }}</p>`,
                } );
            }, 4000 );
        } );
}

if( false ){
    /*new Global4VueComponDemo( function resolve( arg ){
     // VueComponDemo的第二个参数(函数)
     console.log( arg );
     }, function reject( error ){
     console.error( error );
     }, )
     .component
     .then( function resolve( { VueComponDemo, default: VueComponDemoDef } ){
     // "期待2020年Vue 3的正式发布！！！"
     console.log( VueComponDemoDef.data().textA );
     }, function reject( error ){
     console.error( error );
     } );*/

    /*new Global4ExampleA( function resolve( arg ){
     // ExampleA的第二个参数(函数)
     console.log( arg );
     }, function reject( error ){
     console.error( error );
     } )
     .then( function resolve( { ExampleA, default: ExampleADef } ){
     // "“三权”分离的vue文件写法，以免单个vue文件很长很长！！！"
     console.log( ExampleADef.data().textA );
     }, function reject( error ){
     console.error( error );
     } );*/

    /*new Global4ExampleA2( function resolve( arg ){
     // “三权”分离的vue文件写法，以免单个vue文件很长很长！！！
     console.log( arg.data().textA );
     }, function reject( error ){
     console.error( error );
     } );*/

    /*new Global4ExampleA3( function resolve( arg ){
     // “三权”分离的vue文件写法，以免单个vue文件很长很长！！！
     console.log( arg.data().textA );
     }, function reject( error ){
     console.error( error );
     } );*/

    /*
     // This is a VueComponentA for Global!!!
     // 必须得用new调用
     console.log( new Global4VueComponentA().text1 );
     */

    /*
     new Global4VueComponentB( function resolve( option ){
     // This is a VueComponentB for Global!!!
     console.log( option.data().text1 );
     }, function reject( error ){
     console.error( error );
     } );
     */
}

let o1 = {

    el: '#HelloWorld',
    store: Store,
    data: {
        asd: {
            z: 111111111111111111,
            a: 2222222222222222,
        },
        qwe: true,
        title_attr_key_name: 'title',
        titleAttrKeyValue: 'Hello World',
        obj1: {
            attr1: 'attr1',
            attr2: 2020,
        },
        attr3: 'attr3',
        slotAttr1: 'slotAttr1',
        isTransitionTest1: true,
        cells: Array.apply( null, { length: 81, } )
                    .map( ( c, i, a ) => ( {
                        id: i,
                        number: i % 9 + 1,
                    } ) ),

        rootState1: Store.state.rootState1,
        moduleA: Store.state.moduleA.moduleA,
        moduleB: Store.state.moduleB.moduleB,
        moduleB_1: Store.state.moduleB.moduleB_1.moduleB_1,
        moduleB_1_1: Store.state.moduleB.moduleB_1.moduleB_1_1.moduleB_1_1,
    },
    provide(){
        let _this = this;

        return {
            inject0: 'inject000',
            inject1: 'inject111',
            inject2: 'inject222',
            titleAttrKeyValue: _this.titleAttrKeyValue,
        };
    },
    computed: {
        rootGetters1Computed(){
            return this.$store.getters.rootGetters1;
        },
        moduleAGetters1Computed(){
            return this.$store.getters[ 'moduleAGetters1' ];
        },
        moduleBGetters1Computed(){
            return this.$store.getters[ 'moduleB/moduleBGetters1' ];
        },
        moduleB_1Getters1Computed(){
            return this.$store.getters[ 'moduleB/moduleB_1/moduleB_1Getters1' ];
        },
        moduleB_1_1Getters1Computed(){
            return this.$store.getters[ 'moduleB/moduleB_1/moduleB_1_1Getters1' ];
        },
    },
    methods: {
        transitionTest1( event ){
            this.isTransitionTest1 = !this.isTransitionTest1;
        },
        transitionTestBtn1( event ){
            let _this = this;

            CT.shuffleArr( _this.cells );
        },

        beforeEnter( el ){
        },
        // 当与 CSS 结合使用时，回调函数 done 是可选的
        enter( el, done = () => {
        } ){
            // done();
        },
        afterEnter( el ){
            CT.sCSSPro( '.transitionTest1BoxPar', {
                '--show-hide-toggle-width': {
                    value: CT.width( el )[ 0 ] + 'px',
                },
                '--show-hide-toggle-height': {
                    value: CT.height( el )[ 0 ] + 'px',
                },
                '--show-hide-toggle-padding': {
                    value: CT.gStyle( el, 'padding' ),
                },
                '--show-hide-toggle-border-width': {
                    value: CT.gStyle( el, 'borderWidth' ),
                },
                '--show-hide-toggle-margin': {
                    value: CT.gStyle( el, 'margin' ),
                },
                '--show-hide-toggle-outline-width': {
                    value: CT.gStyle( el, 'outlineWidth' ),
                },

                '--show-hide-toggle-time': {
                    value: 3000,
                },
            } );
        },
        enterCancelled( el ){
        },

        beforeLeave( el ){
            CT.sCSSPro( '.transitionTest1BoxPar', {
                '--show-hide-toggle-width': {
                    value: CT.width( el )[ 0 ] + 'px',
                },
                '--show-hide-toggle-height': {
                    value: CT.height( el )[ 0 ] + 'px',
                },
                '--show-hide-toggle-padding': {
                    value: CT.gStyle( el, 'padding' ),
                },
                '--show-hide-toggle-border-width': {
                    value: CT.gStyle( el, 'borderWidth' ),
                },
                '--show-hide-toggle-margin': {
                    value: CT.gStyle( el, 'margin' ),
                },
                '--show-hide-toggle-outline-width': {
                    value: CT.gStyle( el, 'outlineWidth' ),
                },

                '--show-hide-toggle-time': {
                    value: 3000,
                },
            } );
        },
        // 当与 CSS 结合使用时，回调函数 done 是可选的
        leave( el, done = () => {
        } ){
            // done();
        },
        afterLeave( el ){
        },
        // leaveCancelled 只用于 v-show 中
        leaveCancelled( el ){
        },

        beforeAppear( el ){
        },
        appear( el, done = () => {
        } ){
            // done();
        },
        afterAppear( el ){
        },
        appearCancelled( el ){
        },
    },
    watch: {
        obj1: {
            deep: false,
            handler( newVal, oldVal ){
                console.log( '<----obj1----->' );

                console.log( '---newVal---Start' );
                console.dir( newVal );
                console.log( '---newVal---End' );

                console.log( '---oldVal---Start' );
                console.dir( oldVal );
                console.log( '---oldVal---End' );

                console.log( '<----obj1----->' );
            },
        },
        attr3: {
            deep: false,
            handler( newVal, oldVal ){
                console.log( '<----attr3----->' );

                console.log( '---newVal---Start' );
                console.log( newVal );
                console.log( '---newVal---End' );

                console.log( '---oldVal---Start' );
                console.log( oldVal );
                console.log( '---oldVal---End' );

                console.log( '<----attr3----->' );
            },
        },
    },
    filters: {},
    components: {
        // VueComponDemo,
        // ExampleA,

        // 局部组件的标准写法！可以更改组件的相关配置属性！
        // 记得先深度拷贝再修改组件的属性，不然多次如下使用后会出现最后一个组件的修改会覆盖之前组件的修改
        // 不要复制完整对象的描述符(也就是不要执行CT.completeAssign)，不然会出现覆盖的情况！
        VueDemo( resolve = () => {
        }, reject = () => {
        } ){
            return import( 'vueVDir/test/VueDemo.vue' ).then( function resolve( arg ){
                let arg1 = CT.deepCopy( arg );

                Object.assign( arg1.VueDemo, {
                    computed: {
                        fullName: {
                            get(){
                                return '2：' + this.firstName + this.lastName;
                            },
                            set( newValue ){
                                let names = newValue.split( ' ' );
                                this.firstName = names[ 0 ];
                                this.lastName = names[ names.length - 1 ];
                            },
                        },
                    },
                } );
                Object.assign( arg1.default, {
                    computed: {
                        fullName: {
                            get(){
                                return '2：' + this.firstName + this.lastName;
                            },
                            set( newValue ){
                                let names = newValue.split( ' ' );
                                this.firstName = names[ 0 ];
                                this.lastName = names[ names.length - 1 ];
                            },
                        },
                    },
                } );

                return arg1;
            }, function reject( error ){
                console.error( error );
            } );
        },
        VueDemo2( resolve = () => {
        }, reject = () => {
        } ){
            return import( 'vueVDir/test/VueDemo.vue' ).then( function resolve( arg ){
                let arg1 = CT.deepCopy( arg );

                Object.assign( arg1.VueDemo, {
                    computed: {
                        fullName: {
                            get(){
                                return '3：' + this.firstName + this.lastName;
                            },
                            set( newValue ){
                                let names = newValue.split( ' ' );
                                this.firstName = names[ 0 ];
                                this.lastName = names[ names.length - 1 ];
                            },
                        },
                    },
                } );
                Object.assign( arg1.default, {
                    computed: {
                        fullName: {
                            get(){
                                return '3：' + this.firstName + this.lastName;
                            },
                            set( newValue ){
                                let names = newValue.split( ' ' );
                                this.firstName = names[ 0 ];
                                this.lastName = names[ names.length - 1 ];
                            },
                        },
                    },
                } );

                return arg1;
            }, function reject( error ){
                console.error( error );
            } );
        },
    },
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
};
let vue4Win = new Vue( {
    /*el: '#HelloWorld',
     data: {
     obj1: {
     name: 'obj1',
     value: {
     age: 12,
     },
     },
     arr1: [
     [[[{
     name: 'name0',
     value: {
     age: 20,
     },
     }]]],
     [[[{
     name: 'name1',
     value: {
     age: 21,
     },
     }]]],
     [[[{
     name: 'name2',
     value: {
     age: 22,
     },
     }]]],
     ],
     arr2: [
     1,
     [
     2,
     [
     3,
     [ 4, ],
     ],
     ],
     ],
     },*/
    ...o1,
} );

window.vue4Win = vue4Win;
