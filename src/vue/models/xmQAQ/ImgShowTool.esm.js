/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

const baseURL_strC = 'http://192.168.1.150:8084/iPhoneX/',
    img_numC = 241;

let CT = new CTESM.CT(),
    imgInteger_num = Number.parseInt( String( img_numC / 10 ), 10 ),
    imgRemainder_num = img_numC % 10;

function DisTouchmove( event ){
    CT.allEStop( event );
}

async function PreloadImg( {
                               num,
                               isStart,
                               _this,
                           } ){
    let getPromise_fun = img_arr => new Promise( ( resolve = () => {
        }, reject = () => {
        } ) => {
            CT.preloadImg( img_arr, progress => {
                // console.log( `progress--->${ Number.parseFloat( progress ) }` );
            }, () => {
                // console.log( `图片(${ img_arr[ 0 ] })预加载完成了！！！` );

                resolve( true );
            } );
        } ),
        index_num = isStart
                    ? 2
                    : _this.preloadImgCount + 1;

    while( index_num <= num ){
        await getPromise_fun( [ `${ baseURL_strC }iPhoneX_1125_2436_${ index_num }.png` ] ) && ( _this.preloadImgCount = index_num++ );
    }
}

let ImgShowTool = {
    data(){
        return {
            src: `${ baseURL_strC }iPhoneX_1125_2436_1.png`,
            alt: '“可爱的轩墨宝宝”壁纸合集！！！',
            index: 1,
            preloadImgCount: 0,
            prevBtnTitle: '上一张',
            nextBtnTitle: '下一张',
            isTouchAN: true,
            isFirst: true,
            state: 'next',
        };
    },
    props: {},
    provide(){
        let _this = this;

        return {};
    },
    inject: {},
    computed: {},
    methods: {
        returnTo( event ){
            this.$emit( 'return-to', event, this );
        },
        refresh( event ){
            window.location[ 'reload' ]();
        },
        imgLoad( event ){
            this.isTouchAN = false;

            if( this.isFirst ){
                this.isFirst = false;

                if( img_numC > 0 && imgInteger_num === 0 ){
                    PreloadImg( {
                        num: imgRemainder_num,
                        isStart: true,
                        _this: this,
                    } );
                }
                else if( img_numC > 0 && imgInteger_num !== 0 && imgRemainder_num !== 0 ){
                    --imgInteger_num;

                    PreloadImg( {
                        num: imgRemainder_num + 10,
                        isStart: true,
                        _this: this,
                    } );
                }
                else if( img_numC > 0 && imgInteger_num !== 0 && imgRemainder_num === 0 ){
                    --imgInteger_num;

                    PreloadImg( {
                        num: 10,
                        isStart: true,
                        _this: this,
                    } );
                }
            }
            else if( this.state === 'next' && imgInteger_num !== 0 && this.index % 5 === 0 ){
                --imgInteger_num;

                PreloadImg( {
                    num: this.preloadImgCount + 10,
                    isStart: false,
                    _this: this,
                } );
            }
        },
        prevImg( event ){
            this.index > 1 && ( this.isTouchAN = true, this.state = 'prev', this.src = `${ baseURL_strC }iPhoneX_1125_2436_${ --this.index }.png` );
        },
        nextImg( event ){
            this.index < img_numC && ( this.isTouchAN = true, this.state = 'next', this.src = `${ baseURL_strC }iPhoneX_1125_2436_${ ++this.index }.png` );
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

            CT.on( 'body, #LocalRoll, .refreshBtnBoxA, .returnToBtnBoxA', 'touchmove', DisTouchmove );

            _this.$once( 'hook:beforeDestroy', function (){
                CT.off( 'body, #LocalRoll, .refreshBtnBoxA, .returnToBtnBoxA', 'touchmove', DisTouchmove );
            } );
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
    ImgShowTool,
};

export default ImgShowTool;
