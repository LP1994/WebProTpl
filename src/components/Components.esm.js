/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import './Components.css';

/**
 * 上传文件按钮（默认选择单个任何类型的文件）<br />
 * 注：<br />
 * 1、accept的值：<br />
 * 'audio/*'：代表音频文件；<br />
 * 'video/*'：代表视频文件；<br />
 * 'image/*'、'image/png, image/jpeg'、'.png, .jpg, .jpeg'：代表图片文件；<br />
 * PS：<br />
 * “小米手机2”测试中发现“multiple属性”的一个特殊BUG，当选择从“文件管理器”选择时，无法选择多个，但是“相册”中却可以！<br />
 * 2、调用方法：<br />
 * FileBtn.call( CTO, {} );<br />
 * PS：<br />
 * 由于会用到“CT”（实在不用就在这个组件JS里再写点需要的代码）。<br />
 * 所以建议用“call”方法调用，并把已经初始化过的“CTO”作为this传入，那么call的第二个参数就是这个组件的配置参数了。<br />
 *
 * @param arg_obj JSON对象，有如下属性，必须。<br />
 * {<br />
 * class：字符串，单个类名（'t1'）或类名组（'t1,t2,t3'），不能是''、' '，这些样式是挂载在“fileBtn”（div class = 'fileBtn'）上，可选。<br />
 * 如果新增的样式中有以“-bgColor”为后缀的样式（这类样式是用来修饰背景的），那么会先把已有的样式组中带有“-bgColor”后缀的样式类名去掉，<br />
 * 再把新的以“-bgColor”为后缀的样式添加上去，增加的修饰背景的新样式类名要以“-bgColor”为后缀来命名，不是修饰背景的则不需要这种命名！<br />
 * “-fColor”、“-bsColor”规则同“-bgColor”一样，其他规则的样式则会直接添加进去。<br />
 * 注：建议遵循“CSS模块BEM规范”，可以编写如：<br />
 * “fileBtn-middleBlue”（其实就是包含“middleBlue-fColor”、“middleBlue-bsColor”、“middleBlue-bgColor”）这样的样式来修饰按钮。<br /><br />
 *
 * id：字符串，用于放（div class = 'fileBtn'）节点的容器节点的“ID值”，如：“#fileBtnTest1”，必须。<br />
 * “#fileBtnTest1”会被处理拼接成“fileBtn_fileBtnTest1”这样的，并被设置到（input type = 'file'）的“id”和（label）的“for”。<br /><br />
 *
 * name：字符串，（input type = 'file'）的“names属性值”，默认是“id”去掉最左边的“＃”，然后加上“Name”，如“fileBtnTest1Name”，可选。<br /><br />
 *
 * labelText：JSON对象，有如下属性，可选。<br />
 * {<br />
 * type：字符串，文件类型提示名，如：'选择图片'，默认是'选择文件'，可选。<br />
 * quantity：字符串，已经选中的文件个数，如：'100个'，默认是'(无)'，可选。<br />
 * }<br /><br />
 *
 * accept：字符串，允许选择的文件类型，默认任何类型的文件（'*'），可选。<br /><br />
 *
 * multiple：布尔值，true表示允许选择多个文件，false反之，默认false，可选。<br />
 * PS：只要有这个属性就会触发，如果不要这个属性，就不要包含这个属性，就算设置了false值也会触发。<br /><br />
 *
 * capture：用于捕获图像或视频数据的摄像机，布尔值或字符串，true表示调用媒体设备，如摄像头、扬声器等，false反之，默认false，可选。<br />
 * 注：<br />
 * 字符串值为'user'表示应使用面向用户的摄像头或麦克风。<br />
 * 字符串值为'environment'指定应使用向外的摄像头或麦克风。<br />
 * 如果缺少此属性，则用户代理可以自行决定要执行的操作。如果请求的面向模式不可用，则用户代理可以回退到其首选的默认模式。<br />
 * capture以前是一个布尔属性，如果存在，则要求使用设备的媒体捕获设备（如摄像头或麦克风）而不是请求文件输入。<br />
 * 只要有这个属性就会触发，如果不要这个属性，就不要包含这个属性，就算设置了false值也会触发。<br /><br />
 *
 * webkitdirectory：布尔值，true表示上传文件夹（PC端有效），false反之，默认false，可选。<br />
 * 只要有这个属性就会触发，如果不要这个属性，就不要包含这个属性，就算设置了false值也会触发。<br /><br />
 *
 * onChange：配置change事件，JSON对象，有如下属性，可选。<br />
 * {<br />
 * event：事件函数，有一个event参数和一个filesArr类数组，必须。<br />
 * options：事件配置参数，可选。<br />
 * }
 *
 * @returns {Element} Element，就是（div class = 'fileBtn'）这个节点对象。
 */
function FileBtn( arg_obj = {} ){
    let CTO = this,
        id_str = arg_obj.id.slice( 1 ),
        para_obj = Object.assign( {
            class: '',
            name: id_str + 'Name',
            labelText: {
                type: '选择文件',
                quantity: '(无)',
            },
            accept: '*',
            multiple: false,
            capture: false,
            webkitdirectory: false,
            onChange: {
                event: ( event, files_arr ) => {
                    console.log( '上传文件发生变化 Start' );
                    console.dir( files_arr );
                    console.log( '上传文件发生变化 End' );
                },
                options: false,
            }
        }, arg_obj ),
        postfix_arr = [
            '-bgColor',
            '-fColor',
            '-bsColor',
        ],
        defClass_arr = [
            'fileBtn',
            'middleBlue-bgColor',
            'white-fColor',
            'middleBlue-bsColor',
        ];
    let [ divElem, labelElem, spanElem_TypeText, spanElem_QuantityText, inputElem, ] = CTO.cElem( {
        tagName: [
            'div',
            'label',
            'span',
            'span',
            'input',
        ],
        fun: element => {
            if( element.localName === 'div' ){
                let is_boo,
                    index_num;
                CTO.sAttr( element, {
                    'class': 'css-reset',
                } );
                CTO.aClassN( element, para_obj.class.split( ',' )
                                              .filter( c => {
                                                  is_boo = CTO.trim( c ).length !== 0;
                                                  index_num = 0;
                                                  if( is_boo && c.includes( postfix_arr[ 0 ] ) ){
                                                      defClass_arr.forEach( ( c, i, ) => void ( c.includes( postfix_arr[ 0 ] ) && ( index_num = i ) ) );
                                                      defClass_arr.splice( index_num, 1 );
                                                  }
                                                  else if( is_boo && c.includes( postfix_arr[ 1 ] ) ){
                                                      defClass_arr.forEach( ( c, i, ) => void ( c.includes( postfix_arr[ 1 ] ) && ( index_num = i ) ) );
                                                      defClass_arr.splice( index_num, 1 );
                                                  }
                                                  else if( is_boo && c.includes( postfix_arr[ 2 ] ) ){
                                                      defClass_arr.forEach( ( c, i, ) => void ( c.includes( postfix_arr[ 2 ] ) && ( index_num = i ) ) );
                                                      defClass_arr.splice( index_num, 1 );
                                                  }
                                                  return is_boo;
                                              } )
                                              .concat( defClass_arr )
                                              .join( ',' ) );
            }
            else if( element.localName === 'label' ){
                CTO.sAttr( element, {
                    'class': 'css-reset',
                    for: 'fileBtn_' + id_str,
                } );
                CTO.aClassN( element, 'ofh,flexBox,flexC,flexDC,fileBtn-label' );
            }
            else if( element.localName === 'input' ){
                let obj1 = {
                    'class': 'css-reset css-reset-file',
                    type: 'file',
                    name: para_obj.name,
                    id: 'fileBtn_' + id_str,
                    hidden: 'hidden',
                    accept: para_obj.accept,
                };
                para_obj.multiple && ( obj1[ 'multiple' ] = 'multiple' );
                para_obj.capture && ( obj1[ 'capture' ] = para_obj.capture );
                para_obj.webkitdirectory && ( obj1[ 'webkitdirectory' ] = 'webkitdirectory' );
                CTO.sAttr( element, obj1 );
            }
        }
    } );
    CTO.sAttr( spanElem_TypeText, {
        'class': 'css-reset',
    } );
    CTO.aClassN( spanElem_TypeText, 'fileBtn-typeText' );
    CTO.text( spanElem_TypeText, para_obj.labelText.type );
    CTO.sAttr( spanElem_QuantityText, {
        'class': 'css-reset',
    } );
    CTO.aClassN( spanElem_QuantityText, 'fileBtn-quantityText' );
    CTO.text( spanElem_QuantityText, para_obj.labelText.quantity );
    CTO.iInsertA( labelElem, [
        spanElem_TypeText,
        spanElem_QuantityText,
    ] );
    CTO.iInsertA( divElem, [
        labelElem,
        inputElem,
    ] );
    CTO.iInsertA( CTO.gBySe( arg_obj.id ), divElem );
    let event_fun = event => {
        let len_num = event.currentTarget.files.length;
        CTO.text( arg_obj.id + ' .fileBtn-quantityText', `(${ len_num === 0
                                                              ? '无'
                                                              : len_num + '个' })` );
        para_obj.onChange.event( event, event.currentTarget.files );
    };
    CTO.off( '#fileBtn_' + id_str, 'change', event_fun );
    CTO.change( '#fileBtn_' + id_str, event_fun, para_obj.onChange.options );
    return CTO.gBySe( arg_obj.id + ' > .fileBtn' );
}

/**
 * 刷新按钮
 *
 * @param arg_obj JSON对象，有如下属性，必须。<br />
 * {<br />
 * id：字符串，需要被修饰成刷新按钮的“id”，如：'#refreshBtn1'，必须。<br /><br />
 *
 * click：配置click事件，JSON对象，可选。<br />
 * {<br />
 * event：事件函数，有一个event参数，可选。<br />
 * options：事件配置参数，默认false，可选。<br />
 * }
 *
 * @returns {Element} Element，刷新按钮的节点（button type = 'button' id = 'refreshBtn1'）。
 */
function RefreshBtn( arg_obj = {} ){
    let CTO = this,
        para_obj = Object.assign( {
            click: {
                event: event => void ( window.location[ 'reload' ]() ),
                options: false,
            },
        }, arg_obj ),
        refreshBtn_elem = CTO.gById( arg_obj[ 'id' ] ),
        event_fun = event => void ( para_obj.click.event( event ) );
    CTO.aClassN( refreshBtn_elem, 'refreshBtn' );
    CTO.rCE( refreshBtn_elem, event_fun );
    CTO.aCE( refreshBtn_elem, event_fun, para_obj.click.options );
    return refreshBtn_elem;
}

/**
 * 返回顶部按钮
 *
 * @param arg_obj JSON对象，有如下属性，必须。<br />
 * {<br />
 * id：字符串，需要被修饰成返回顶部按钮的“id”，如：'#returnTopBtn1'，必须。<br /><br />
 *
 * scrollElem：滚动的容器，单个节点选择器（字符串）、单个节点选择器组（字符串）、单个节点对象、单个节点List、单个jQuery节点对象，<br />
 * 支持一个数组（以上提到的任何数据类型），以便批量处理，但只会取第一个元素，必须。<br /><br />
 *
 * startFun：点击按钮之后，滚动开始之前要执行的函数，会有一个click事件的event参数和一个Element参数，可选。<br /><br />
 *
 * endFun：滚动到顶部后要执行的函数，会有一个Element参数，可选。<br /><br />
 *
 * clickOptions：click点击事件的配置参数，默认false，可选。
 *
 * @returns {Element} Element，返回顶部按钮的节点（button type = 'button' id = 'returnTopBtn1'）。
 */
function ReturnTopBtn( arg_obj = {} ){
    let CTO = this,
        para_obj = Object.assign( {
            startFun: ( event, element ) => void ( console.log( '点击之后，滚动之前！！！' ) ),
            endFun: element => void ( console.log( '滚动到顶部了！！！' ) ),
            clickOptions: false,
        }, arg_obj ),
        returnTopBtn_elem = CTO.gById( arg_obj[ 'id' ] ),
        event_fun = event => {
            para_obj.startFun( event, event.currentTarget );
            CTO.scrollTop( para_obj[ 'scrollElem' ], para_obj.endFun );
        };
    CTO.aClassN( returnTopBtn_elem, 'returnTopBtn' );
    CTO.rCE( returnTopBtn_elem, event_fun );
    CTO.aCE( returnTopBtn_elem, event_fun, para_obj.clickOptions );
    return returnTopBtn_elem;
}

export {
    FileBtn,
    RefreshBtn,
    ReturnTopBtn,
};
export default {
    FileBtn,
    RefreshBtn,
    ReturnTopBtn,
};
