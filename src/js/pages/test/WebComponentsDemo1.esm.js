/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let CT = new CTESM.CT(),
    WebComponents = WebCESM.WebC;

{
    if( true ){
        new WebComponents( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                name: 'popup-info',
                extends: null,
            },
            enableExtends: true,
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                    // console.dir( shadowRoot );

                    const wrapper = document.createElement( 'span' );
                    wrapper.setAttribute( 'class', 'wrapper' );

                    const icon = document.createElement( 'span' );
                    icon.setAttribute( 'class', 'icon' );
                    icon.setAttribute( 'tabindex', 0 );

                    const info = document.createElement( 'span' );
                    info.setAttribute( 'class', 'info' );

                    const text = cusHTMLClassIns.getAttribute( 'data-text' );
                    info.textContent = text;

                    let imgUrl;
                    if( cusHTMLClassIns.hasAttribute( 'data-img' ) ){
                        imgUrl = cusHTMLClassIns.getAttribute( 'data-img' );
                    }
                    else{
                        imgUrl = 'img/default.png';
                    }

                    const img = document.createElement( 'img' );
                    img.src = imgUrl;
                    icon.appendChild( img );

                    const style = document.createElement( 'style' );

                    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: red;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

                    shadowRoot.appendChild( style );
                    shadowRoot.appendChild( wrapper );

                    wrapper.appendChild( icon );
                    wrapper.appendChild( info );
                },
                connectedCallback: () => {
                },
                disconnectedCallback: () => {
                },
                adoptedCallback: () => {
                },
                attributeChangedCallback: () => {
                },
            },
            extends: HTMLElement,
            isExtendsCusHTML: false,
            isInit: true,
            obsAttrs: [],
        } );
    }
}

{
    if( true ){
        let expandingList = new WebComponents( {
                attach: {
                    delegatesFocus: null,
                    mode: 'open',
                },
                define: {
                    name: 'expanding-list',
                    extends: 'ul',
                },
                enableExtends: true,
                events: {
                    init: ( cusHTMLClassIns, shadowRoot ) => {
                        // console.dir( shadowRoot );

                        function ShowUL( event ){
                            const nextul = event.target.nextElementSibling;

                            if( nextul.style.display == 'block' ){
                                nextul.style.display = 'none';
                                nextul.parentNode.setAttribute( 'class', 'closed' );
                            }
                            else{
                                nextul.style.display = 'block';
                                nextul.parentNode.setAttribute( 'class', 'open' );
                            }
                        }

                        const uls = Array.from( cusHTMLClassIns.querySelectorAll( 'ul' ) ),
                            lis = Array.from( cusHTMLClassIns.querySelectorAll( 'li' ) );

                        uls.forEach( ul => void ( ul.style.display = 'none' ) );

                        lis.forEach( li => {
                            if( li.querySelectorAll( 'ul' ).length > 0 ){
                                li.setAttribute( 'class', 'closed' );

                                const childText = li.childNodes[ 0 ];
                                const newSpan = document.createElement( 'span' );

                                newSpan.textContent = childText.textContent;
                                newSpan.style.cursor = 'pointer';

                                newSpan.onclick = ShowUL;

                                childText.parentNode.insertBefore( newSpan, childText );
                                childText.parentNode.removeChild( childText );
                            }
                        } );
                    },
                    connectedCallback: () => {
                    },
                    disconnectedCallback: () => {
                    },
                    adoptedCallback: () => {
                    },
                    attributeChangedCallback: () => {
                    },
                },
                extends: 'auto',
                isExtendsCusHTML: false,
                isInit: true,
                obsAttrs: [],
            } ),
            expandingListClass = expandingList.getHTMLClass(),
            expandingListClassIns = expandingList.getHTMLClassIns();

        console.dir( CT.getClass4Tag( 'ul', 'expanding-list' ) === expandingListClass );
        console.dir( CT.getClass4Elem( expandingListClassIns ) === expandingListClass );
    }
}

{
    if( true ){
        new WebComponents( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                name: 'custom-square',
                extends: null,
            },
            enableExtends: true,
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                    // console.dir( shadowRoot );

                    const div = document.createElement( 'div' ),
                        style = document.createElement( 'style' );

                    shadowRoot.appendChild( style );
                    shadowRoot.appendChild( div );
                },
                connectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                    console.log( '自定义元素已经添加到文档中了！' );

                    shadowRoot.querySelector( 'style' ).textContent = `
    div {
      width: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      height: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      background-color: ${ cusHTMLClassIns.getAttribute( 'c' ) };
    }
  `;
                },
                disconnectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                    console.log( '自定义元素从文档中移除了！' );
                },
                adoptedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                    console.log( '自定义元素移动到新的文档中了！' );
                },
                attributeChangedCallback: ( cusHTMLClassIns, shadowRoot, arr ) => {
                    console.log( '自定义元素的属性发生了变化！' );
                    console.dir( arr );

                    shadowRoot.querySelector( 'style' ).textContent = `
    div {
      width: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      height: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      background-color: ${ cusHTMLClassIns.getAttribute( 'c' ) };
    }
  `;
                },
            },
            extends: HTMLElement,
            isExtendsCusHTML: false,
            isInit: true,
            obsAttrs: [
                'c',
                'l',
            ],
        } );

        const add = document.querySelector( '.add' ),
            update = document.querySelector( '.update' ),
            remove = document.querySelector( '.remove' );

        let square;

        update.disabled = true;
        remove.disabled = true;

        function random( min, max ){
            return Math.floor( Math.random() * ( max - min + 1 ) + min );
        }

        add.onclick = () => {
            square = document.createElement( 'custom-square' );
            document.querySelector( 'article' )
                    .appendChild( square );
            square.setAttribute( 'l', '100' );
            square.setAttribute( 'c', 'red' );

            update.disabled = false;
            remove.disabled = false;
            add.disabled = true;
        };

        update.onclick = () => {
            square.setAttribute( 'l', random( 50, 200 ) );
            square.setAttribute( 'c', `rgb(${ random( 0, 255 ) }, ${ random( 0, 255 ) }, ${ random( 0, 255 ) })` );
        };

        remove.onclick = () => {
            document.querySelector( 'article' )
                    .removeChild( square );

            update.disabled = true;
            remove.disabled = true;
            add.disabled = false;
        };
    }
}

{
    if( true ){
        let cusDiv = new WebComponents( {
                attach: {
                    delegatesFocus: null,
                    mode: 'open',
                },
                define: {
                    name: 'cus-div',
                    extends: null,
                },
                enableExtends: true,
                events: {
                    init: ( cusHTMLClassIns, shadowRoot ) => {
                        // console.log( '父类初始化开始！1' );
                        // console.dir( cusHTMLClassIns.shadowRoot );
                        // console.dir( shadowRoot );
                        // console.log( '父类初始化开始！2' );

                        const pElem = document.createElement( 'p' ),
                            spanElem = document.createElement( 'span' );

                        pElem.textContent = '这是一个p元素！！！';
                        spanElem.textContent = '这是一个span元素！！！';

                        pElem.onclick = event => {
                            console.log( '父类p' );
                        };
                        spanElem.onclick = event => {
                            console.log( '父类span' );
                        };

                        shadowRoot.appendChild( pElem );
                        shadowRoot.appendChild( spanElem );

                        cusHTMLClassIns.style = 'background-color: blue;display: block;';
                    },
                    connectedCallback: () => {
                    },
                    disconnectedCallback: () => {
                    },
                    adoptedCallback: () => {
                    },
                    attributeChangedCallback: () => {
                    },
                },
                extends: HTMLElement,
                isInit: true,
                obsAttrs: [],
            } ),
            cusDivClass = cusDiv.getHTMLClass();

        let cusDivRed = new WebComponents( {
                attach: {
                    delegatesFocus: null,
                    mode: 'open',
                },
                define: {
                    name: 'cus-div-red',
                    extends: null,
                },
                enableExtends: true,
                events: {
                    init: ( cusHTMLClassIns, shadowRoot ) => {
                        // console.log( '子类初始化开始！1' );
                        // console.dir( cusHTMLClassIns.shadowRoot );
                        // console.dir( shadowRoot );
                        // console.log( '子类初始化开始！2' );

                        const h1Elem = document.createElement( 'h1' );

                        h1Elem.textContent = '这是一个h1元素！';

                        cusHTMLClassIns.shadowRoot.appendChild( h1Elem );

                        cusHTMLClassIns.shadowRoot.querySelector( 'p' ).textContent = '111这是一个p元素！！！';

                        cusHTMLClassIns.shadowRoot.querySelector( 'span' ).onclick = event => {
                            console.dir( '子类span' );
                        };

                        cusHTMLClassIns.style = 'background-color: red;display: block;';
                    },
                    connectedCallback: () => {
                    },
                    disconnectedCallback: () => {
                    },
                    adoptedCallback: () => {
                    },
                    attributeChangedCallback: () => {
                    },
                },
                extends: cusDivClass,
                isExtendsCusHTML: true,
                isInit: true,
                obsAttrs: [],
            } ),
            cusDivRedClass = cusDivRed.getHTMLClass();
    }
}

{
    if( true ){
        new WebComponents( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                name: 'my-template',
                extends: null,
            },
            enableExtends: true,
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                    shadowRoot.appendChild( document.getElementById( 'MyTemplate1' )
                                                    .content
                                                    .cloneNode( true ) );

                    console.dir( WebComponents.GRootN( shadowRoot ) );
                    console.dir( CT.gRootN( shadowRoot ) );
                },
                connectedCallback: () => {
                },
                disconnectedCallback: () => {
                },
                adoptedCallback: () => {
                },
                attributeChangedCallback: () => {
                },
            },
            extends: HTMLElement,
            isInit: true,
            obsAttrs: [],
        } );
    }
}
