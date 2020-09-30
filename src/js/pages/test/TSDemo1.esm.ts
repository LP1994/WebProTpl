/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 类
{
    if( false ){
        class PersonInfo {

            get firstName(): string {
                return this._firstName;
            }

            set firstName( value: string ) {
                this._firstName = value;
            }

            get middleInitial(): string {
                return this._middleInitial;
            }

            set middleInitial( value: string ) {
                this._middleInitial = value;
            }

            get lastName(): string {
                return this._lastName;
            }

            set lastName( value: string ) {
                this._lastName = value;
            }

            get age(): number | undefined {
                return this._age;
            }

            set age( value: number | undefined ) {
                this._age = value;
            }

            get sex(): string {
                return this._sex;
            }

            set sex( value: string ) {
                this._sex = value;
            }

            fullName: string = '';

            private _firstName: string = '';
            private _middleInitial: string = '';
            private _lastName: string = '';
            private _age: number | undefined = 0;
            private _sex: string = '';

            constructor( firstName: string, middleInitial: string, lastName: string, age: number, sex: string ) {
                this._firstName = firstName;
                this._middleInitial = middleInitial;
                this._lastName = lastName;
                this._age = age;
                this._sex = sex;

                this.fullName = `${ firstName }${ middleInitial }${ lastName }`;
            }

        }

        interface Person {
            fullName: string;
        }

        function GetUserInfo( person: Person ) {
            console.dir( person );

            return `${ person.fullName }，你好！欢迎使用TypeScript！！！`;
        }

        let userInfo = new PersonInfo( '林', '沐', '风', 26, '男' );

        console.log( GetUserInfo( userInfo ) );
    }
}

// 数组
{
    if( false ){
        let list1: number[] = [
                1,
                2,
                3,
            ],
            list2: Array<string> = [
                '人生自古谁无死',
                '留取丹青照汗青',
                '前不见古人',
            ];
        console.dir( list1 );
        console.dir( list2 );
    }
}

// 元组 Tuple
{
    if( false ){
        let x1: [ string, number, ] = [
            'hello',
            10,
        ];

        console.dir( x1 );

        let x2: [ string, number, symbol, symbol, symbol, symbol, ] = [
            'hello',
            10,
            Symbol( 'Symbol1' ),
            Symbol( 'Symbol2' ),
            Symbol( 'Symbol3' ),
            Symbol( 'Symbol4' ),
        ];

        console.dir( x2 );
    }
}

// 枚举
{
    if( false ){
        const enum Color {
            Green = '#00ff00',
            Blue = '#0000ff',
            Red = '#ff0000',
        }

        let green: Color = Color.Green;
        console.log( green );

        enum Color1 {
            num1 = 5,
            num2 = 10,
            num3 = 15,
            num4 = 20,
            num5 = 25,
            num6 = 30,
            num7 = 35,
        }

        let color1Name: string = Color1[ 35 ];
        console.dir( Color1 );
        console.log( `${ color1Name }: ${ Color1.num7 }` );
    }
}

// 任意值 any
// 但是 Object 类型的变量，只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：
// 应避免使用 Object ，而是使用非原始 object 类型
{
    if( false ){
        let data4Any: any = 2020;
        console.log( data4Any );

        data4Any = '万里悲秋常作客';
        console.log( data4Any );

        data4Any = false;
        console.log( data4Any );

        let number4Any: any = 2021.567899876789876543456778888;
        console.log( number4Any.toFixed( 5 ) );

        // 但是 Object 类型的变量，只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：
        // 应避免使用 Object ，而是使用非原始 object 类型
        let obj4Any: object = {
            name: '林沐风',
            gName() {
                // @ts-expect-error
                return this.name;
            },
        };
        // @ts-expect-error
        console.log( obj4Any.gName() );

        let list: any[] = [
            1,
            false,
            'free',
        ];
        console.log( ...list );
        list[ 1 ] = 100;
        console.log( ...list );
    }
}

// void空值类型
{
    if( false ){
        let unusable1: void = undefined,
            unusable2: null = null,
            unusable3: undefined = undefined,
            unusable4: undefined = void 0;

        console.log( unusable1 );
        console.log( unusable2 );
        console.log( unusable3 );
        console.log( unusable4 );
    }
}

// 联合类型
{
    if( false ){
        let str1: string | null | undefined = '身无彩凤双飞翼';
        console.log( str1 );

        str1 = null;
        console.log( str1 );

        str1 = undefined;
        console.log( str1 );
    }
}

// never类型表示的是那些永不存在的值的类型。never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
// 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。never 类型是任何类型的子类型，也可以赋值给任何类型；
// 然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never 。
// 返回never的函数必须存在无法达到的终点
{
    if( false ){

        function Fun1( str: string ): never {
            throw new Error( str );
        }

        try{
            Fun1( 'Error!!!Error!!!Error!!!' );
        }
        catch( e ){
            console.error( e.message );
        }

        function Fail1() {
            return new Error( 'Something failed' );
        }

        try{
            Fail1();
        }
        catch( e ){
            console.error( e.message );
        }

        // 返回never的函数必须存在无法达到的终点
        /*
         function Fun2(): never{
         while( true ){
         }
         }
         */

    }
}

// object表示非原始类型，也就是除number，string，boolean，bigint，symbol，null或undefined之外的类型。
// 使用 object 类型，就可以更好的表示像 Object.create 这样的API。
{
    if( false ){
        // declare function create( o: object | null ): void;

        // console.dir( create( { prop: 0 } ) );
        // console.dir( create( null ) );

        // Error
        // create( 42 );
    }
}

// 类型断言
// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
// 类型断言有两种形式。 其一是“尖括号”语法：
// 另一个为 as 语法：
{
    if( false ){
        let someValue: any = 'this is a string';
        let strLength1: number = ( <string> someValue ).length;
        let strLength2: number = ( someValue as string ).length;

        console.log( `strLength1--->${ strLength1 }` );
        console.log( `strLength2--->${ strLength2 }` );
    }
}

// 解构元组，元组可以像数组一样解构；解构后的变量获得对应元组元素的值：
{
    if( false ){
        let tuple: [ number, string, boolean, ] = [
            2020,
            'Hello World111222',
            false,
        ];

        let [ a, b, c, ] = tuple;

        // 2020 "Hello World" false ...
        console.log( a, b, c, );
    }
}

// 函数参数的解构的默认值
{
    if( false ){
        function Fun1( obj1: { name: string, age: number } = {
            name: '',
            age: 0
        } ): object {
            return obj1;
        }

        console.dir( Fun1( {
            name: '阿丁',
            age: 18,
        } ) );
        console.dir( Fun1() );
        console.dir( Fun1( {
            name: '汤圆',
            age: 12,
        } ) );

        type type4Fun2 = { name: string, age?: number };

        function Fun2( { name = 'qwe', age = 12 }: type4Fun2 = {
            name: '',
            age: 0
        } ): object {
            return {
                name,
                age
            };
        }

        console.dir( Fun2( { name: 'sdf', } ) );

        function Fun3( [ a = 0, b = 1, ]: [ number, number ] = [
            2,
            3,
        ] ): Array<number> {
            return [
                a,
                b,
            ];
        }

        console.dir( Fun3( [
            111,
            222,
        ] ) );
        console.dir( Fun3() );
        console.dir( Fun3( [
            999,
            888,
        ] ) );
    }
}
{
    if( false ){
        function Fun1( { a: a1 = 0, b: b1 = 1, }: { a: number, b?: number, } = {
            a: -1,
            b: -2,
        } ): object {
            return {
                a1,
                b1,
            };
        }

        console.dir( Fun1( {
            a: 11,
            b: 22,
        } ) );

        console.dir( Fun1() );

        console.dir( Fun1( { a: 77, } ) );

        console.dir( Fun1( { a: 88, } ) );
    }

}

{
    if( false ){
        function Fun1( n: number ) {
            if( n > 5 ){
                return n;
            }
            else{
                return 0;
            }

            return -1;
        }

        Fun1( 1 );
    }
}

// 在.ts文件中加载.js文件测试
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

// 接口测试
{
    if( false ){
        interface LabeledValue {
            label: string;
        }

        function printLabel( labeledObj: LabeledValue ) {
            console.log( labeledObj.label );
        }

        let myObj = {
            label: 'Size 1 Object',
            size: 1,
        };
        printLabel( myObj );
    }
}

{
    if( false ){
        /*
         interface Point{
         readonly x: number;
         readonly y: number;
         }

         let p1: Point = {
         x: 10,
         y: 20
         };
         */

        // p1.x = 5;
    }
}

// 定义泛型数组
{
    if( false ){
        let arr1: Array<[ string, number ]> = [
            [
                'keyName1',
                2020,
            ],
            [
                'keyName2',
                2021,
            ],
        ];

        console.dir( arr1 );
    }
}

// 查找字符串中出现最多次的那个字符
{
    if( false ){
        ( ( str4Target: string ): void => {
            const target4Arr: Array<string> = [ ...str4Target ],
                str4Obj: any = {};

            // @ts-expect-error
            target4Arr.forEach( ( c: string, i: number, a: Array<string> ): void => void ( c in str4Obj
                                                                                           ? ( ++( str4Obj[ c ] ) )
                                                                                           : ( str4Obj[ c ] = 1 ) ) );

            const result4Sort: any = Object.entries( str4Obj )
                                           .sort( (
                                               [
                                                   // @ts-expect-error
                                                   keyNameA,
                                                   keyValueA
                                               ]: any,
                                               [
                                                   // @ts-expect-error
                                                   keyNameB,
                                                   keyValueB
                                               ]: any
                                           ): number => keyValueB - keyValueA );

            console.log( str4Target );
            console.dir( result4Sort );
            console.log( `字符“${ result4Sort[ 0 ][ 0 ] }”出现的次数最多，一共出现“${ result4Sort[ 0 ][ 1 ] }”次！！！` );
        } )( '林沐风_林子空_𠮷𠮷𠮷𠮷𠮷𠮷' );
    }
}

// 二维数组的类型检查
{
    if( false ){
        let arr1: Array<[ string, number ]> = [
            [
                'keyName1',
                2021,
            ],
            [
                'keyName2',
                2022,
            ],
            [
                'keyName3',
                2023,
            ],
        ];

        let result: Array<[ string, number ]> = arr1.sort( (
            [
                // @ts-expect-error
                keyNameA,
                keyValueA
            ]: [ string, number ],
            [
                // @ts-expect-error
                keyNameB,
                keyValueB
            ]: [ string, number ]
        ): number => keyValueB - keyValueA );

        console.dir( result );
    }
}

{
    if( false ){
        // @ts-expect-error
        import('gQLAPIDir/SN_Alert.graphql').then( ( {
                                                         default: SN_Alert,
                                                         definitions,
                                                         // @ts-expect-error
                                                         // 字符串：Document
                                                         kind,
                                                         loc: {
                                                             source: {
                                                                 // gql的字符串
                                                                 body,
                                                             },
                                                         },
                                                     } ): void => {
            console.dir( SN_Alert );
            console.dir( definitions );
            console.log( body );
        } );
    }
}
