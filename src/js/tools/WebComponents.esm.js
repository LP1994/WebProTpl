/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

/**
 * 这是一个使用“工厂模式”编写的Web Components生成工具
 * PS:
 * 1、自主定制元素(Autonomous Custom Element): 独立元素；它们不继承自内置HTML元素。
 *
 * 2、定制的内置元素(Customized Built-in Element): 这些元素从内置HTML元素继承并扩展。
 *
 * 3、Firefox、Chrome和Edge(76)默认支持定制的内置元素(Customized Built-in Element)。到目前为止，Opera和Safari仅支持自主定制元素(Autonomous Custom Element)。
 *
 * 4、Element.attachShadow()
 * “Element.attachShadow()”方法将阴影DOM树附加到指定元素，并返回对其“ShadowRoot”的引用。可以附加阴影的元素：
 * 任何具有有效名称的自主定制元素(Autonomous Custom Element)、
 * article、aside、blockquote、body、div、footer、h1、h2、h3、h4、h5、h6、header、main、nav、p、section、span。
 *
 * 5、有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成。
 *
 * 6、在自定义元素的类中，'shadowRoot'这个名字不能使用，是系统保留字段！要是用了会报错！
 *
 * 7、在自定义元素的类中，Element对象及其所继承的层层父级对象所拥有的所有属性(比如：'shadowRoot'这个名字)、方法都不应该被重写！也不建议重写！
 *
 * 8、WebC类的私有实例属性、私有实例方法、私有静态属性、私有静态方法不能在自定义元素类内部使用！要是用了会报错！
 *
 * 9、customElements.define()
 * 通常会抛出“NotSupportedErrors”，看起来“define()”失败了，但它很可能是“Element.attachShadow()”的问题。
 * NotSupportedError:
 * “CustomElementRegistry”已包含具有相同名称或相同构造函数（或已定义）的条目，或者指定了“extends”且它是有效的自定义元素名称，或者指定了“extends”，但它试图扩展的元素是未知元素。
 * SyntaxError:
 * 提供的名称不是有效的自定义元素名称。
 * TypeError:
 * 引用的构造函数不是构造函数。
 */

'use strict';

function DataT( arg ){
    'use strict';

    return Object.prototype.toString.call( arg );
}

/**
 * 验证是否可以有效的使用Element.attachShadow()。<br />
 * PS:<br />
 * 1、有效使用Element.attachShadow()的三个条件:<br />
 * 一、任何具有有效名称的自主定制元素(Autonomous Custom Element)的自定义元素名。<br />
 * 二、内置元素名是这些中的一个：<br />
 * article、aside、blockquote、body、div、footer、h1、h2、h3、h4、h5、h6、header、main、nav、p、section、span。<br />
 * 三、试图附加到的元素还没有卷影宿主。<br /><br />
 *
 * 2、报错情况：<br />
 * InvalidStateError：试图附加到的元素已经是卷影宿主。<br />
 * NotSupportedError：您正在尝试将阴影根附加到HTML命名空间之外的元素，或者该元素不能附加阴影。<br />
 *
 * @param elementObj Element，节点元素对象，必须。
 *
 * @returns {boolean} true可以有效的使用Element.attachShadow()，反之，不可以。
 */
function Effectiv4AddShadow( elementObj ){
    let tag = elementObj.tagName.toLocaleLowerCase();

    return elementObj.shadowRoot === null && ( [
        'article',
        'aside',
        'blockquote',
        'body',
        'div',
        'footer',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'main',
        'nav',
        'p',
        'section',
        'span',
    ].includes( tag ) || tag.includes( '-' ) );
}

function GetError( info_str ){
    throw new Error( info_str );
}

function GetStr1( str1 = '' ){
    return `${ str1 }有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成。`;
}

function IsDataT( data, type ){
    if( 'Element' === type ){
        return DataT( data )
            .includes( type );
    }

    let str1 = DataT( data )
        .split( ' ' )[ 1 ];

    return str1.slice( 0, str1.length - 1 ) === type;
}

function IsString( arg ){
    return IsDataT( arg, 'String' ) && ( typeof arg === 'string' );
}

class WebC {

    /**
     * 自定义的元素类
     *
     * @type {Class}
     */
    cusHTMLClass = null;
    /**
     * 自定义的元素类的实例，在初始化自定义元素前(即调用customElements.define()前)，其值是null。
     *
     * @type {Function}
     */
    cusHTMLClassIns = null;

    /**
     * 配置选项
     *
     * @type {Object}
     */
    optionObj = null;

    /**
     * shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。
     *
     * @type {Object}
     */
    shadowRootObj = null;

    /**
     * Web Components工厂类的构造函数<br />
     * PS：<br />
     * 1、自主定制元素(Autonomous Custom Element): 独立元素；它们不继承自内置HTML元素。<br /><br />
     *
     * 2、定制的内置元素(Customized Built-in Element): 这些元素从内置HTML元素继承并扩展。<br /><br />
     *
     * 3、Firefox、Chrome和Edge(76)默认支持定制的内置元素(Customized Built-in Element)。到目前为止，Opera和Safari仅支持自主定制元素(Autonomous Custom Element)。<br /><br />
     *
     * 4、Element.attachShadow()<br />
     * “Element.attachShadow()”方法将阴影DOM树附加到指定元素，并返回对其“ShadowRoot”的引用。可以附加阴影的元素：<br />
     * 任何具有有效名称的自主定制元素(Autonomous Custom Element)、<br />
     * article、aside、blockquote、body、div、footer、h1、h2、h3、h4、h5、h6、header、main、nav、p、section、span。<br /><br />
     *
     * 5、有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成。<br /><br />
     *
     * 6、在自定义元素的类中，'shadowRoot'这个名字不能使用，是系统保留字段！要是用了会报错！<br /><br />
     *
     * 7、在自定义元素的类中，Element对象及其所继承的层层父级对象所拥有的所有属性(比如：'shadowRoot'这个名字)、方法都不应该被重写！也不建议重写！<br /><br />
     *
     * 8、WebC类的私有实例属性、私有实例方法、私有静态属性、私有静态方法不能在自定义元素类内部使用！要是用了会报错！<br /><br />
     *
     * 9、customElements.define()<br />
     * 通常会抛出“NotSupportedErrors”，看起来“define()”失败了，但它很可能是“Element.attachShadow()”的问题。<br />
     * NotSupportedError:<br />
     * “CustomElementRegistry”已包含具有相同名称或相同构造函数（或已定义）的条目，或者指定了“extends”且它是有效的自定义元素名称，或者指定了“extends”，但它试图扩展的元素是未知元素。<br />
     * SyntaxError:<br />
     * 提供的名称不是有效的自定义元素名称。<br />
     * TypeError:<br />
     * 引用的构造函数不是构造函数。<br /><br />
     *
     * 10、<br />
     * 如果要创建的是定制的内置元素(Customized Built-in Element)(就是需要继承自内置HTML元素，但是不包括已经为文档注册了的自定义元素)，<br />
     * 那么最快、最方便的配置方法就是直接设置define.extends值以及把extends的值设置成'auto'就好了，免得去查询HTMLParagraphElement之类的内置HTML类。<br /><br />
     *
     * 11、<br />
     * customElements.define( name, class, { extends )的name的值必须是满足：有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成。<br />
     * extends的值必须是也只能是一个内置元素名<br /><br />
     *
     * 12、<br />
     * shadowRoot对象无法被克隆！<br /><br />
     *
     * 13、<br />
     * let _this = Element.attachShadow( { mode, )中的mode值如果是字符串'closed'，那么Element.shadowRoot一定会返回null，但是_this却还是会保留shadowRoot对象。<br /><br />
     *
     * @param initOption Object(配置对象)，必须。<br />
     * {<br />
     * attach: Object(配置对象)，给Element.attachShadow()做参数用的，可选。<br />
     * {<br />
     * delegatesFocus: 可选，默认值是：null，值只能是：null、true、false这三种。当值是null时，表示不传这个参数。<br />
     * 当设置为true时，它指定减轻围绕焦点可用性的自定义元素问题的行为，<br />
     * 当单击shadow DOM的一个不可聚焦部分时，第一个可聚焦部分被赋予焦点，而shadow主机被赋予任何可用的“:focus”样式。<br />
     * mode: 可选，默认值是'open'，值只能是字符串: 'open'、'closed'这两个，<br />
     * 当值是'open'时，影子根的元素可以从根之外的JavaScript访问，例如使用“Element.shadowRoot”。<br />
     * 当值是'closed'时，拒绝从其外部JavaScript访问封闭的影子根节点。<br /><br />
     *
     * define: Object(配置对象)，给customElements.define()做参数用的，必须。<br />
     * {<br />
     * extends: 字符串(只能是内置元素的名称)，默认值是null，如果要创建的是自主定制元素(Autonomous Custom Element)，那么不用设置；<br />
     * 但如果创建的是定制的内置元素(Customized Built-in Element)，那么就必须传HTML标签名(如：'div'等HTML标签名)。<br />
     * 还有就是，如果下面的配置参数选项'extends'的值是字符串'auto'，那么表示创建的是定制的内置元素(Customized Built-in Element)，<br />
     * 那么就必须传HTML标签名(如：'div'等HTML标签名)。<br />
     * name: 字符串，默认值是null，自定义元素名(格式如: 'cus-html'，命名格式只能是以小写字母跟数字、'-'、“_”组成的，并且只能是以小写字母开头，必须包含连字符)，必须。<br />
     * ps：<br />
     * 1、define.extends这个选项跟下面的extends选项息息相关的，需要注意。<br /><br />
     *
     * enableExtends: Boolean，生成的自定义元素类是否可以被再次继承使用，默认值是true，表示可以，反之，不可以(要是还是被强制继承，那么会报错)，可选。<br />
     * PS:<br />
     * 1、当值为true时，上面的参数attach.mode的值会被强制设置为字符串'open'。<br />
     * 2、当值为false时，上面的参数attach.mode的值会被强制设置为字符串'closed'。<br />
     * 3、当值为true时，下面的events参数中的各个生命周期函数中的第二个参数总是为null。<br />
     * 4、当值为true时，通过使用下面events参数中各个生命周期函数中的第一个参数的shadowRoot只读属性进行的种种操作不会影响到已经成功注册到文档中的父类自定义元素。<br />
     * 5、当值为true时，通过使用下面events参数中各个生命周期函数中的第一个参数的shadowRoot只读属性进行的各种事件绑定，最好用'Element.onclick'这种形式进行绑定，这样可以在"子的自定义元素"中覆盖"父的自定义元素"中已经绑定的事件。<br /><br />
     *
     * events: Object(配置对象)，自定义元素的生命周期事件函数，可选。<br />
     * {<br />
     * 一、init: 函数，会在自定义元素的构造函数中调用，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。<br /><br />
     *
     * 二、connectedCallback: 函数，每次将自定义元素附加到文档连接的元素中时调用。这将在每次移动节点时发生，并且可能发生在元素的内容完全解析之前，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。<br />
     * 2、一旦元素不再连接，就可以调用“connectedCallback”，请使用“Node.isConnected”确保。<br /><br />
     *
     * 三、disconnectedCallback: 函数，每次自定义元素与文档DOM断开连接时调用，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。<br /><br />
     *
     * 四、adoptedCallback: 函数，每次将自定义元素移至新文档时调用，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。<br /><br />
     *
     * 五、attributeChangedCallback: 函数，每次添加、删除或更改自定义元素的属性之一时调用，可选。<br />
     * PS：<br />
     * 1、有三个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。<br />
     * 第三个参数：数组<br />
     * [<br />
     * name(字符串，发生变化的属性的属性名),<br />
     * oldValue(字符串，旧的属性值，没有的话会是null),<br />
     * newValue(字符串，新的属性值，没有的话会是null),<br />
     * arg4(这个参数所表示的未知，一直都是null的值)<br />
     * ]。<br /><br />
     *
     * extends: String|Class，默认值是HTMLElement，值只能是：'auto'、HTMLElement、HTMLElement的内置子类(如：HTMLParagraphElement等等内置HTML类)、自定义元素类，必须。<br />
     * 当值是'auto'时，上面的配置参数选项define.extends的值必须传(HTML标签名(如：'div'等HTML标签名))，代码会自动根据define.extends的值生成define.extends的值所代表的元素类。<br />
     * 当值是HTMLElement时，表示要创建的是自主定制元素(Autonomous Custom Element)，上面的配置参数选项define.extends的值可以不用设置。<br />
     * 当值是HTMLElement的内置子类(如：HTMLParagraphElement等等内置HTML类)时，表示要创建的是定制的内置元素(Customized Built-in Element)，上面的配置参数选项define.extends的值必须传(HTML标签名(如：'div'等HTML标签名))。<br />
     * 当值是自定义元素类时，表示要再一次扩展一个已经为文档注册成功了的自定义元素类(前提是，如果它允许被再次继承使用)。<br />
     * PS:<br />
     * 1、extends这个选项跟上面的define.extends选项息息相关的，需要注意。<br /><br />
     *
     * isExtendsCusHTML: Boolean，默认值是false，true表示本次自定义元素是再次扩展于一个已经成功为文档定义了的自定义元素(自主定制元素(Autonomous Custom Element))，false表示不是，可选。<br />
     * PS:<br />
     * 1、如果上面的extends参数是自定义元素类时，这个值必须设置为true。<br /><br />
     *
     * isInit: Boolean，默认值是true，true表示自动初始化自定义元素，false表示稍后手动初始化自定义元素(调用startInit()就行)，可选。<br /><br />
     *
     * obsAttrs: Array<String>，默认值是空数组[]，监听哪些属性的更改，里面的成员都是属性名，可选。<br />
     */
    constructor( initOption = {} ){
        let _this = this;

        _this.optionObj = Object.assign( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                extends: null,
                name: null,
            },
            enableExtends: true,
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                },
                connectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                },
                disconnectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                },
                adoptedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                },
                attributeChangedCallback: ( cusHTMLClassIns, shadowRoot, [
                    name,
                    oldValue,
                    newValue,
                    arg4
                ] ) => {
                },
            },
            extends: HTMLElement,
            isExtendsCusHTML: false,
            isInit: true,
            obsAttrs: [],
        }, initOption );

        _this.optionObj.enableExtends
        ? ( _this.optionObj.attach.mode = 'open' )
        : ( _this.optionObj.attach.mode = 'closed' );

        _this.optionObj.extends === 'auto' && _this.optionObj.isExtendsCusHTML && ( GetError( 'extends为“auto”时，isExtendsCusHTML不能为true。' ) );

        if( !_this.optionObj.define.name.includes( '-' ) ){
            GetError( GetStr1( 'define.name的命名格式只能是: ' ) );

            return null;
        }

        if( _this.optionObj.extends !== HTMLElement && !_this.optionObj.isExtendsCusHTML && ( !( /^([a-z])[a-z0-9]{0,}$/g.test( _this.optionObj.define.extends ) ) || ( document.createElement( _this.optionObj.define.extends ).constructor === HTMLUnknownElement ) ) ){
            GetError( 'define.extends的值只能是内置元素名！' );

            return null;
        }

        _this.optionObj.attach.delegatesFocus === null && ( delete _this.optionObj.attach.delegatesFocus );

        _this.optionObj.extends === 'auto' && !_this.optionObj.isExtendsCusHTML && /^([a-z])[a-z0-9]{0,}$/g.test( _this.optionObj.define.extends ) && ( _this.optionObj.extends = document.createElement( _this.optionObj.define.extends ).constructor );

        _this.cusHTMLClass = class
            extends _this.optionObj.extends {

            /**
             * 静态私有属性，监听哪些属性的更改，里面的成员都是属性名
             *
             * @type {Array<String>}
             */
            static #obsAttrs = _this.optionObj.obsAttrs;

            /**
             * shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。
             *
             * @type {Object}
             */
            #shadowRootObj = null;

            /**
             * 静态getter，监听哪些属性的更改，里面的成员都是属性名
             *
             * @returns {Array<String>}
             */
            static get observedAttributes(){
                return this.#obsAttrs;
            }

            constructor(){
                if( !_this.optionObj.enableExtends && new.target !== _this.cusHTMLClass ){
                    GetError( '该自定义元素类不能再次被扩展！' );

                    return null;
                }

                super();

                Effectiv4AddShadow( this ) && !_this.optionObj.isExtendsCusHTML && ( this.#shadowRootObj = this.attachShadow( _this.optionObj.attach ) );

                _this.optionObj.events.init( this, this.#shadowRootObj );

                _this.cusHTMLClassIns = this;
                _this.shadowRootObj = this.#shadowRootObj;
            }

            /**
             * 每次将自定义元素附加到文档连接的元素中时调用。这将在每次移动节点时发生，并且可能发生在元素的内容完全解析之前。<br />
             * PS：<br />
             * 1、一旦元素不再连接，就可以调用“connectedCallback”，请使用“Node.isConnected”确保。<br />
             */
            connectedCallback(){
                _this.optionObj.events.connectedCallback( this, this.#shadowRootObj );
            }

            /**
             * 每次自定义元素与文档DOM断开连接时调用。
             */
            disconnectedCallback(){
                _this.optionObj.events.disconnectedCallback( this, this.#shadowRootObj );
            }

            /**
             * 每次将自定义元素移至新文档时调用。
             */
            adoptedCallback(){
                _this.optionObj.events.adoptedCallback( this, this.#shadowRootObj );
            }

            /**
             * 每次添加、删除或更改自定义元素的属性之一时调用。<br />
             * PS：<br />
             * 1、“static get observedAttributes”方法中指定要注意哪些属性的更改。<br />
             *
             * @param name 字符串，发生变化的属性的属性名。
             *
             * @param oldValue 字符串，旧的属性值，没有的话会是null。
             *
             * @param newValue 字符串，新的属性值，没有的话会是null。
             *
             * @param arg4 null，这个参数所表示的未知，一直都是null的值。
             */
            attributeChangedCallback( name, oldValue, newValue, arg4 ){
                _this.optionObj.events.attributeChangedCallback( this, this.#shadowRootObj, [
                    name,
                    oldValue,
                    newValue,
                    arg4,
                ], );
            }

        };

        _this.optionObj.isInit && ( _this.optionObj.extends === HTMLElement || _this.optionObj.isExtendsCusHTML
                                    ? customElements.define( _this.optionObj.define.name, _this.cusHTMLClass, )
                                    : customElements.define( _this.optionObj.define.name, _this.cusHTMLClass, { extends: _this.optionObj.define.extends, } ) );
    }

    /**
     * 获取自定义的元素类，允许再把它当作父类，被其他自定义元素类继承再次扩展。
     *
     * @returns {Class} 自定义的元素类
     */
    getHTMLClass(){
        return this.cusHTMLClass;
    }

    /**
     * 获取自定义的元素类的实例，在初始化自定义元素前(即调用customElements.define()前)，其值是null。
     *
     * @returns {Function} 自定义的元素类的实例
     */
    getHTMLClassIns(){
        return this.cusHTMLClassIns;
    }

    /**
     * 获取shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)或没有调用Element.attachShadow()时或再一次扩展于自定义元素类时，其值是null。
     *
     * @returns {Object} shadowRoot对象
     */
    getShadowRoot(){
        return this.shadowRootObj;
    }

    /**
     * 手动初始化自定义元素<br />
     * PS：<br />
     * 1、只有当上面的构造函数的配置参数选项中的“isInit”选项的值为false时，调用它才会触发初始化自定义元素。<br />
     */
    startInit(){
        let _this = this;

        !_this.optionObj.isInit && ( _this.optionObj.extends === HTMLElement || _this.optionObj.isExtendsCusHTML
                                     ? customElements.define( _this.optionObj.define.name, _this.cusHTMLClass, )
                                     : customElements.define( _this.optionObj.define.name, _this.cusHTMLClass, { extends: _this.optionObj.define.extends, } ) );
    }

    /**
     * 获取先前定义的自定义元素的构造函数<br />
     * PS:<br />
     * 1、命名自定义元素的构造函数，如果没有使用该名称的自定义元素定义，则为undefined。<br />
     *
     * @param cusHTMLName String，自定义元素名(有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成)，必须。
     *
     * @returns {Function|Undefined}
     */
    static GetCusHTMLClass( cusHTMLName = '' ){
        if( cusHTMLName.includes( '-' ) ){
            return customElements.get( cusHTMLName );
        }
        else{
            GetError( GetStr1( '' ) );
        }
    }

    /**
     * 返回上下文对象的根，该根对象可选地包括"shadow root"(如果有的话)。<br />
     * PS:<br />
     * 1、在标准网页内的某个元素上调用它会返回一个HTMLDocument代表整个页面的对象。<br />
     * 2、在影子DOM内的元素上调用它会返回关联的ShadowRoot对象。<br />
     *
     * @param element Element，元素节点对象，必须。
     *
     * @param composed Boolean，默认值是false，可选。<br />
     * PS:<br />
     * 1、true：卷影根以外的根节点(HTMLDocument代表整个页面的对象)。<br />
     * 1、false：返回卷影根(关联的ShadowRoot对象)。<br />
     *
     * @returns {*|Node} 返回上下文对象的根，该根对象可选地包括"shadow root"(如果有的话)。
     */
    static GRootN( element, composed ){
        'use strict';

        return element.getRootNode( { composed: composed ?? false } );
    }

    /**
     * 升级“Node”子树中包含自定义元素的所有阴影，甚至在它们连接到主文档之前。
     *
     * @param elemObj Element，元素节点对象，必须<br />
     * PS:<br />
     * 1、包含要升级的子代元素的阴影的“Node”实例。如果没有可升级的子元素，则不会引发错误。<br /><br />
     *
     * 例子：<br />
     * const el = document.createElement( 'spider-man' );<br /><br />
     *
     * class SpiderMan extends HTMLElement {}<br />
     * customElements.define( 'spider-man', SpiderMan );<br /><br />
     *
     * // not yet upgraded<br />
     * console.assert( !( el instanceof SpiderMan ) );<br /><br />
     *
     * customElements.upgrade( el );<br />
     * // upgraded!<br />
     * console.assert( el instanceof SpiderMan );<br /><br />
     */
    static Upgrade( elemObj ){
        'use strict';

        customElements.upgrade( elemObj );
    }

    /**
     * customElements.whenDefined方法返回一个Promise，该Promise在定义命名元素时进行解析。<br />
     * PS:<br />
     * 1、在定义自定义元素时解析为undefined的Promise。如果已定义自定义元素，则立即解析承诺。<br />
     * 2、使用指南：<br />
     * 比如，<br />
     * 在调用customElements.define()初始化自定义元素前，可以展示正在加载的动画效果，完成初始化自定义元素后(就是调用customElements.define()后)，<br />
     * 可以删除正在加载的动画效果，可以把这个删除正在加载的动画效果的代码写在“await customElements.whenDefined( cusHTMLName )”之后。<br />
     *
     * @param cusHTMLName String，自定义元素名(有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成)，必须。
     *
     * @returns {Promise<void>}
     */
    static WhenDefined( cusHTMLName = '' ){
        if( cusHTMLName.includes( '-' ) ){
            return customElements.whenDefined( cusHTMLName );
        }
        else{
            GetError( GetStr1( '' ) );
        }
    }

}

export {
    WebC,
};

export default WebC;
