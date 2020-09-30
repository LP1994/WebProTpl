/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let CT = new CTESM.CT();

// ?.
{
    if( false ){
        function Fun1(){
            console.dir( this );
        }

        function Fun2(){
            console.dir( this );
        }

        Fun1?.();
        Fun2?.();
        // 报错！！！
        // console.dir( Fun3?.() );
    }
}

// CT.completeAssign 1
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
            };

        console.dir( CT.completeAssign( obj1, obj2, obj3, ) );
    }
}

// CT.deepCopy 1
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
            };

        // obj2.__proto__ = obj3;
        // obj1.__proto__ = obj2;
        Object.setPrototypeOf( obj2, obj3 );
        Object.setPrototypeOf( obj1, obj2 );

        // console.dir( obj1 );
        console.dir( CT.deepCopy( obj1 ) );
    }
}

// CT.completeAssign 2
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
                obj3,
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
                obj2,
            };

        // console.dir( obj1 );
        console.dir( CT.completeAssign( obj1, obj3, ) );
    }
}

// CT.deepCopy 2
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
                obj3,
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
                obj2,
            };

        // obj2.__proto__ = obj3;
        // obj1.__proto__ = obj2;
        Object.setPrototypeOf( obj2, obj3 );
        Object.setPrototypeOf( obj1, obj2 );

        // console.dir( obj1 );
        console.dir( CT.deepCopy( obj1 ) );
    }
}

// WebService4Proxy测试
{
    if( false ){
        let { WebService4Proxy, } = CT.getClass();

        let ws4Proxy_ins = new WebService4Proxy( CT, 'http://localhost:9999/SimServer/' );

        /*
         ws4Proxy_ins.create( { type: 'json', } )
         .GET( {
         options: {
         method: 'GET',
         // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
         // responseType: 'json',
         mode: 'cors',
         credentials: 'omit',
         body: {
         type: 'json5',
         },
         },
         } )
         .then( json => {
         console.dir( json );
         } );

         ws4Proxy_ins.json()
         .GET( {
         options: {
         method: 'GET',
         // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
         // responseType: 'json',
         mode: 'cors',
         credentials: 'omit',
         body: {
         type: 'json5',
         },
         },
         } )
         .then( json => {
         console.dir( json );
         } );

         ws4Proxy_ins.get( { type: 'json', } )
         .GETFile( {
         options: {
         // method: 'GET',
         // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
         // responseType: 'json',
         mode: 'cors',
         credentials: 'omit',
         body: {
         type: 'json',
         },
         },
         } )
         .then( json => {
         console.dir( json );
         } );
         */

        ws4Proxy_ins.post( { type: 'json', } )
                    .POST( {
                        options: {
                            // method: 'GET',
                            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
                            // responseType: 'json',
                            headers: new Headers( { 'Content-Type': 'application/json', } ),
                            mode: 'cors',
                            credentials: 'omit',
                            body: JSON.stringify( {
                                type: 'json',
                            } ),
                        },
                    } )
                    .then( json => {
                        console.dir( json );
                    } );

        ws4Proxy_ins.delete( { type: 'json', } )
                    .DELETE( {
                        options: {
                            // method: 'GET',
                            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
                            // responseType: 'json',
                            headers: new Headers( { 'Content-Type': 'application/json', } ),
                            mode: 'cors',
                            credentials: 'omit',
                            body: JSON.stringify( {
                                type: 'json',
                            } ),
                        },
                    } )
                    .then( json => {
                        console.dir( json );
                    } );

        ws4Proxy_ins.put( { type: 'json', } )
                    .PUT( {
                        options: {
                            // method: 'GET',
                            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
                            // responseType: 'json',
                            headers: new Headers( { 'Content-Type': 'application/json', } ),
                            mode: 'cors',
                            credentials: 'omit',
                            body: JSON.stringify( {
                                type: 'json',
                            } ),
                        },
                    } )
                    .then( json => {
                        console.dir( json );
                    } );

        ws4Proxy_ins.get( { type: 'json', } )
                    .GET( {
                        options: {
                            // method: 'GET',
                            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
                            // responseType: 'json',
                            // headers: new Headers( { 'Content-Type': 'application/json', } ),
                            mode: 'cors',
                            credentials: 'omit',
                            body: {
                                type: 'json',
                            },
                        },
                    } )
                    .then( json => {
                        console.dir( json );
                    } );
    }

    if( false ){
        const { WebService4Proxy, } = CT.getClass(),
            ws4Proxy_ins = new WebService4Proxy( CT, 'http://localhost:9999/SimServer/' ),
            ws4Proxy_GET = ws4Proxy_ins.get( { type: 'json', } );

        ws4Proxy_GET.GET( {
                        options: {
                            mode: 'cors',
                            credentials: 'omit',
                            body: {
                                type: 'json5',
                            },
                        },
                    } )
                    .then( json => {
                        console.dir( json );
                    } );
    }
}

// Promise.any测试
{
    if( false ){
        let resolve1 = Promise.resolve( 'resolve1' ),
            resolve2 = Promise.resolve( 'resolve2' ),
            reject1 = Promise.reject( 'reject1' ),
            reject2 = Promise.reject( 'reject2' );

        /*
         Promise.any( [
         resolve1,
         resolve2,
         reject1,
         reject2,
         ] )
         .then( result => {
         // resolve1
         console.log( result );
         } );
         */

        Promise.any( [
                   reject1,
                   reject2,
               ] )
               .then( result => {
                   console.dir( result );
               } )
               .catch( ( result/*{ errors, stack, message }*/ ) => {
                   console.dir( result );

                   // [ 'reject1', 'reject2' ]
                   // console.dir( errors );

                   // AggregateError: No one promise resolved
                   //     at new AggregateError (webpack:///./node_modules/core-js/modules/esnext.aggregate-error.js?:20:27)
                   //     at eval (webpack:///./node_modules/core-js/modules/esnext.promise.any.js?:38:33)
                   // console.log( `stack--->${ stack }<---stack` );

                   // No one promise resolved
                   // console.log( `message--->${ message }` );
               } );
    }
}

// Promise.try测试
{
    if( false ){
        console.log( '1' );

        Promise.try( () => new Promise( ( resolve = () => {
               }, reject = () => {
               } ) => {
                   resolve( '5' );
               } ) )
               .then( arg => {
                   console.log( arg );
                   console.log( '4' );
               } )
               .catch( error => {
                   console.error( error.message );
               } );

        console.log( '2' );
    }
}

// Generator的function.sent测试
{
    if( false ){
        function* dataConsumer(){
            // console.log( `0. `, function.sent );

            console.log( `1. ${ yield 11 }` );

            console.log( `2. ${ yield 22 }` );

            console.log( `3. ${ yield 33 }` );

            return 'result';
        }

        let genObj = dataConsumer();

        console.dir( genObj.next( 0 ) );
        console.dir( genObj.next( 1 ) );
        console.dir( genObj.next( 2 ) );
        console.dir( genObj.next( 3 ) );
    }
}

// 异步遍历器测试
{
    if( false ){
        function PromiseA(){
            return new Promise( ( resolve = () => {
            }, reject = () => {
            } ) => void ( setTimeout( resolve, 5000, 222 ) ) );
        }

        async function* Fun1(){
            yield 1;
            yield 2;
            yield await PromiseA();
            yield 3;
            yield 4;
        }

        ( async () => {
            for await( let value of
                Fun1() ){
                console.log( value );
            }
        } )();
    }
}

// Symbol.asyncIterator测试
{
    if( false ){
        function PromiseA(){
            return new Promise( ( resolve = () => {
            }, reject = () => {
            } ) => void ( setTimeout( resolve, 5000, 222 ) ) );
        }

        let obj1 = {
            async * [ Symbol.asyncIterator ](){
                yield 1;
                yield 2;
                yield await PromiseA();
                yield 3;
            },
        };

        ( async () => {
            for await( let value of
                obj1 ){
                console.log( value );
            }
        } )();
    }
}

// Decorator测试1
{
    if( false ){

        let {
            ArrayType,
            ArrayBufferType,
            AsyncFunType,
            AutoBind,
            BigIntType,
            BigInt64ArrayType,
            BigUint64ArrayType,
            BlobType,
            BooleanType,
            DataViewType,
            DateType,
            EmptyDataType,
            EmptyObjectType,
            ErrorType,
            FileType,
            FileReaderType,
            Float32ArrayType,
            Float64ArrayType,
            FormDataType,
            FunctionType,
            GeneratorType,
            GeneratorFunType,
            Int8ArrayType,
            Int16ArrayType,
            Int32ArrayType,
            MapType,
            NaNType,
            NoConfigurable,
            NoEnumerable,
            NullType,
            NumberType,
            NumberFiniteType,
            NumberIntegerType,
            NumberSafeIntegerType,
            ObjectType,
            PromiseType,
            Override,
            ReadOnly,
            RegExpType,
            SetType,
            SharedArrayBufferType,
            SharedWorkerType,
            StringType,
            SymbolType,
            Uint8ArrayType,
            Uint8ClampedArrayType,
            Uint16ArrayType,
            Uint32ArrayType,
            UndefinedType,
            WeakMapType,
            WeakSetType,
            WorkerType,
        } = DecESM;

        class ClassC {

            constructor(){
            }

            method3( arg1, arg2 ){
                console.log( 'ClassC method3' );
            }

            static method4( arg1, arg2, arg3 ){
                console.log( 'ClassC static method4' );
            }

        }

        class ClassB
            extends ClassC {

            #Getter1 = 'ClassB #Getter1';
            static #Getter2 = 'ClassB static #Getter2';

            constructor(){
                super();
            }

            get Getter1(){
                return this.#Getter1;
            }

            set Getter1( newValue ){
                this.#Getter1 = newValue;
            }

            static get Getter2(){
                return this.#Getter2;
            }

            static set Getter2( newValue ){
                this.#Getter2 = newValue;
            }

            method3( arg1 ){
                console.log( 'ClassB method3' );
            }

            static method4( arg1, arg2 ){
                console.log( 'ClassB static method4' );
            }

        }

        class ClassA
            extends ClassB {

            @NoConfigurable
            @ReadOnly
            @NoEnumerable
            property1 = 'ClassA 实例属性1';

            @NoConfigurable
            @ReadOnly
            @NoEnumerable
            static property2 = 'ClassA 静态属性1';

            @ArrayType
            property3 = [ 1, ];

            @BigIntType
            static property4 = 1n;

            @BooleanType
            static property5 = true;

            @DateType
            static property6 = new Date();

            @FormDataType
            static property7 = new FormData();

            @FunctionType
            static property8 = () => {
            };

            @NaNType
            static property9 = NaN;

            @NullType
            static property10 = null;

            @NumberType
            static property11 = 2020;

            @ObjectType
            static property12 = {};

            @RegExpType
            static property13 = new RegExp();

            @StringType
            static property14 = 'String';

            @SymbolType
            static property15 = Symbol( 'SymbolA' );

            @UndefinedType
            static property16 = undefined;

            @NumberFiniteType
            static property17 = 1;

            @NumberIntegerType
            static property18 = 1.0;

            @NumberSafeIntegerType
            static property19 = -( 2 ** 53 - 1 );

            @ArrayBufferType
            property20 = new ArrayBuffer( 1024 );

            @AsyncFunType
            property21 = async () => {
            };

            @BigInt64ArrayType
            property22 = new BigInt64Array( new ArrayBuffer( 1024 ) );

            @BigUint64ArrayType
            property23 = new BigUint64Array( new ArrayBuffer( 1024 ) );

            @DataViewType
            property24 = new DataView( new ArrayBuffer( 1024 ) );

            @EmptyDataType
            property25_1 = '';

            @EmptyDataType
            property25_2 = [];

            @EmptyDataType
            property25_3 = {};

            @EmptyDataType
            property25_4 = new FormData();

            @EmptyObjectType
            property26 = Object.create( null );

            @Float32ArrayType
            property27 = new Float32Array( new ArrayBuffer( 1024 ) );

            @Float64ArrayType
            property28 = new Float64Array( new ArrayBuffer( 1024 ) );

            @GeneratorType
            property29 = ( function* (){
            } )();

            @GeneratorFunType
            property30 = function* (){
            };

            @Int8ArrayType
            property31 = new Int8Array( new ArrayBuffer( 1024 ) );

            @Int16ArrayType
            property32 = new Int16Array( new ArrayBuffer( 1024 ) );

            @Int32ArrayType
            property33 = new Int32Array( new ArrayBuffer( 1024 ) );

            @MapType
            property34 = new Map( [
                [
                    1,
                    2
                ],
                [
                    3,
                    4
                ],
            ] );

            @PromiseType
            property35 = new Promise( () => {
            } );

            @SetType
            property36 = new Set( [
                1,
                2,
            ] );

            @SharedArrayBufferType
            property37 = new SharedArrayBuffer( 1024 );

            @Uint8ArrayType
            property38 = new Uint8Array( new ArrayBuffer( 1024 ) );

            @Uint8ClampedArrayType
            property39 = new Uint8ClampedArray( new ArrayBuffer( 1024 ) );

            @Uint16ArrayType
            property40 = new Uint16Array( new ArrayBuffer( 1024 ) );

            @Uint32ArrayType
            property41 = new Uint32Array( new ArrayBuffer( 1024 ) );

            @WeakMapType
            property42 = new WeakMap( [
                [
                    [ 1 ],
                    2
                ],
                [
                    [ 3 ],
                    4
                ],
            ] );

            @WeakSetType
            property43 = new WeakSet( [
                [
                    1,
                    2
                ],
                [
                    3,
                    4
                ],
            ] );

            @ErrorType
            property44 = new Error( 'Error' );

            @BlobType
            property45 = new Blob();

            @FileType
            property46 = new File( [ 'foo' ], 'foo.txt', { type: 'text/plain', } );

            @FileReaderType
            property47 = new FileReader();

            // @SharedWorkerType
            // property45 = new SharedWorker( '' );

            // @WorkerType
            // property46 = new Worker( '' );

            #Getter1 = 'ClassA #Getter1';
            static #Getter2 = 'ClassA static #Getter2';

            constructor(){
                super();
            }

            @NoConfigurable
            @ReadOnly
            method1(){
            }

            @NoConfigurable
            @ReadOnly
            static method2(){
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            get Getter1(){
                return this.#Getter1;
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            set Getter1( newValue ){
                this.#Getter1 = newValue;
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            static get Getter2(){
                return this.#Getter2;
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            static set Getter2( newValue ){
                this.#Getter2 = newValue;
            }

            @Override
            method3( arg1 ){
                super.method3();
                // console.log( 'ClassA method3' );
            }

            @Override
            static method4( arg1, arg2 ){
                super.method4();
                // console.log( 'ClassA static method4' );
            }

        }

    }
}

// Decorator测试2
{
    if( false ){

        let {
            AutoBind,
            Mixin2Class4Proto,
            Mixin2Class4Static,
        } = DecESM;

        @Mixin2Class4Proto( {
            mixinA4Property1: '混入的第一个实例属性',
            mixinA4Method1(){
                console.log( '混入的第一个实例方法' );
            },
        }, {
            mixinB4Property1: '混入的第二个实例属性',
            mixinB4Method1(){
                console.log( '混入的第二个实例方法' );
            },
        }, )
        @Mixin2Class4Static( {
            mixinA4StaticProperty1: '混入的第一个静态属性',
            mixinA4StaticMethod1(){
                console.log( '混入的第一个静态方法' );
            },
        }, {
            mixinB4StaticProperty1: '混入的第二个静态属性',
            mixinB4StaticMethod1(){
                console.log( '混入的第二个静态方法' );
            },
        }, )
        class TestClassA {

            property1 = '实例属性1';

            static property2 = '静态属性1';

            constructor(){
            }

            method1(){
                console.log( '实例方法1' );
            }

            static method2(){
                console.log( '静态方法1' );
            }

        }

        let testClassA_ins = new TestClassA();

        console.log( testClassA_ins.property1 );
        console.log( testClassA_ins.mixinA4Property1 );
        console.log( testClassA_ins.mixinB4Property1 );
        testClassA_ins.method1();
        testClassA_ins.mixinA4Method1();
        testClassA_ins.mixinB4Method1();

        console.log( TestClassA.property2 );
        console.log( TestClassA.mixinA4StaticProperty1 );
        console.log( TestClassA.mixinB4StaticProperty1 );
        TestClassA.method2();
        TestClassA.mixinA4StaticMethod1();
        TestClassA.mixinB4StaticMethod1();

    }
}

// |>管道运行算符测试
{
    if( false ){
        function Fun1( arg ){
            console.log( arg );

            return arg + '---1>>>';
        }

        function Fun2( arg ){
            console.log( arg );

            return arg + '---2>>>';
        }

        function Fun3( arg ){
            console.log( arg );

            return arg + '---3>>>';
        }

        console.log( '管道运算符(|>)测试' |> Fun1|> Fun2|> Fun3 );
    }
}

// 函数参数占位符测试
{
    if( false ){
        function Fun0( arg1 = 1, arg2 = 1, arg3 = 1 ){
            return Math.sqrt( arg1 ** 2 + arg2 ** 2 + arg3 ** 2 );
        }

        let x = 2,
            y = 2,
            z = 2;

        /*let fun1 = Fun0( x,
         ?,
         ? ),
         result1 = z |> fun1( y,
         ? );

         console.log( result1 );*/
    }
}

// 在.js文件中加载.ts文件测试
{
    if( false ){
        import('jsPDir/test/JSModulesA.esm.js').then( ( { JSModulesA } ) => {
            console.log( new JSModulesA().getName() );
        } );

        import('jsPDir/test/TSModulesA.esm.ts').then( ( { TSModulesA } ) => {
            console.log( new TSModulesA().getName() );
        } );
    }
}

// Reflect、Proxy的观察者模式的Demo测试
{
    if( false ){
        let observeTarget1 = {
                a: {
                    b: {
                        c: {
                            d: 2020,
                            e: [
                                1,
                                2,
                                3,
                                4,
                                5,
                            ],
                        },
                    },
                },
                a1: [
                    'q',
                    'w',
                    'e',
                ],
            },
            observeTarget2 = [
                1,
                [
                    2,
                    [
                        3,
                        [ 4, ],
                    ],
                ],
            ];

        let observeTarget4Proxy1 = CT.observe2Obj( observeTarget1, {
                isDeep: true,
                handle4Get: ( { target, key, value, receiver } ) => {
                    console.log( `observeTarget4Proxy1 get 属性：${ key }` );

                    if( key === 'd' ){
                        // return '你在读取我ddd';
                    }
                },
                handle4Set: ( { target, key, newValue, oldValue, receiver } ) => {
                    console.log( `observeTarget4Proxy1 set 属性：${ key }` );
                },
            } ),
            observeTarget4Proxy2 = CT.observe2Obj( observeTarget2, {
                isDeep: true,
                handle4Get: ( { target, key, value, receiver } ) => {
                    console.log( `observeTarget4Proxy2 get 属性：${ key }` );
                },
                handle4Set: ( { target, key, newValue, oldValue, receiver } ) => {
                    console.log( `observeTarget4Proxy2 set 属性：${ key }` );
                },
            } );

        window.observeTarget4Proxy1 = observeTarget4Proxy1;
        window.observeTarget4Proxy2 = observeTarget4Proxy2;
    }
}
