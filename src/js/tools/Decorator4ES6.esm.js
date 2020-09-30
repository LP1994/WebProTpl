/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

/**
 * Decorator装饰器工具(编译时执行！！！不是运行时执行！！！)<br /><br />
 *
 * PS：<br />
 * 1、作用于类的装饰器会有一个参数，就是类本身。<br />
 * 2、作用于类的实例属性、类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 3、作用于类的静态属性、类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 4、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 5、如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。<br />
 */

'use strict';

// '[object HTMLDocument]'.slice( 8, -1 ); // HTMLDocument
// '[object HTMLDocument XXX]'.slice( 8, -1 ); // HTMLDocument XXX
function DataT( arg ){
    'use strict';

    return Object.prototype.toString.call( arg );
}

function GetError( info_str ){
    throw new Error( info_str );
}

function Handle1( name, descriptor, type ){
    if( type in descriptor ){
        descriptor[ type ] = false;
        return descriptor;
    }
    else if( 'get' in descriptor || 'set' in descriptor ){
        GetError( '不能作用于get、set上！' );
    }
    else{
        GetError( `该属性(${ name })的描述对象不存在${ type }属性！` );
    }
}

function Handle2( name, descriptor, type, fn ){
    if( 'initializer' in descriptor && !fn( descriptor.initializer() ) ){
        GetError( `${ name }的数据类型只能是${ type }类型！` );
    }

    return descriptor;
}

function IsArray( arg ){
    'use strict';

    return Array.isArray( arg );
}

function IsArrayBuffer( arg ){
    'use strict';

    return IsDataT( arg, 'ArrayBuffer' );
}

function IsArrayIterator( arg ){
    'use strict';

    return IsDataT( arg, 'Array Iterator' );
}

function IsAsyncFun( arg ){
    return IsDataT( arg, 'AsyncFunction' ) || IsDataT( arg, 'AsyncGeneratorFunction' );
}

function IsAsyncGenerator( arg ){
    'use strict';

    return IsDataT( arg, 'AsyncGenerator' );
}

function IsAsyncGeneratorFun( arg ){
    'use strict';

    return IsDataT( arg, 'AsyncGeneratorFunction' );
}

function IsBigInt( arg ){
    'use strict';

    return IsDataT( arg, 'BigInt' );
}

function IsBigInt64Array( arg ){
    'use strict';

    return IsDataT( arg, 'BigInt64Array' );
}

function IsBigUint64Array( arg ){
    'use strict';

    return IsDataT( arg, 'BigUint64Array' );
}

function IsBlob( arg ){
    'use strict';

    return IsDataT( arg, 'Blob' );
}

function IsBoolean( arg ){
    return IsDataT( arg, 'Boolean' ) && ( typeof arg === 'boolean' );
}

function IsDataT( data, type ){
    if( 'Element' === type ){
        return DataT( data )
            .includes( type );
    }

    return DataT( data )
        .slice( 8, -1 ) === type;
}

function IsDataView( arg ){
    'use strict';

    return IsDataT( arg, 'DataView' );
}

function IsDate( arg ){
    'use strict';

    return IsDataT( arg, 'Date' );
}

function IsEmpty( arg ){
    if( IsString( arg ) || IsArray( arg ) ){
        return arg.length === 0;
    }
    else if( IsObject( arg ) ){
        return Object.keys( arg ).length === 0;
    }
    else if( IsFormData( arg ) ){
        return Array.from( arg.keys() ).length === 0;
    }
    else{
        return false;
    }
}

function IsEmptyObject( arg ){
    if( IsObject( arg ) && IsNull( Object.getPrototypeOf( arg ) ) ){
        return true;
    }
    else{
        return false;
    }
}

function IsError( arg ){
    'use strict';

    return IsDataT( arg, 'Error' );
}

function IsFile( arg ){
    'use strict';

    return IsDataT( arg, 'File' );
}

function IsFileReader( arg ){
    'use strict';

    return IsDataT( arg, 'FileReader' );
}

function IsFinite( arg ){
    'use strict';

    return Number.isFinite( arg );
}

function IsFloat32Array( arg ){
    'use strict';

    return IsDataT( arg, 'Float32Array' );
}

function IsFloat64Array( arg ){
    'use strict';

    return IsDataT( arg, 'Float64Array' );
}

function IsFormData( arg ){
    'use strict';

    return IsDataT( arg, 'FormData' );
}

function IsFunction( arg ){
    'use strict';

    return IsDataT( arg, 'Function' );
}

function IsGenerator( arg ){
    'use strict';

    return IsDataT( arg, 'Generator' );
}

function IsGeneratorFun( arg ){
    'use strict';

    return IsDataT( arg, 'GeneratorFunction' );
}

function IsInt8Array( arg ){
    'use strict';

    return IsDataT( arg, 'Int8Array' );
}

function IsInt16Array( arg ){
    'use strict';

    return IsDataT( arg, 'Int16Array' );
}

function IsInt32Array( arg ){
    'use strict';

    return IsDataT( arg, 'Int32Array' );
}

function IsInteger( arg ){
    'use strict';

    return Number.isInteger( arg );
}

function IsMap( arg ){
    'use strict';

    return IsDataT( arg, 'Map' );
}

function IsNaN( arg ){
    'use strict';

    return Number.isNaN( arg );
}

function IsNull( arg ){
    'use strict';

    return IsDataT( arg, 'Null' );
}

function IsNumber( arg ){
    return IsDataT( arg, 'Number' ) && ( typeof arg === 'number' );
}

function IsObject( arg ){
    return IsDataT( arg, 'Object' ) || IsDataT( arg, 'Module' );
}

function IsPromise( arg ){
    'use strict';

    return IsDataT( arg, 'Promise' );
}

function IsRegExp( arg ){
    'use strict';

    return IsDataT( arg, 'RegExp' );
}

function IsSafeInteger( arg ){
    'use strict';

    return Number.isSafeInteger( arg );
}

function IsSet( arg ){
    'use strict';

    return IsDataT( arg, 'Set' );
}

function IsSharedArrayBuffer( arg ){
    'use strict';

    return IsDataT( arg, 'SharedArrayBuffer' );
}

function IsSharedWorker( arg ){
    'use strict';

    return IsDataT( arg, 'SharedWorker' );
}

function IsString( arg ){
    return IsDataT( arg, 'String' ) && ( typeof arg === 'string' );
}

function IsSymbol( arg ){
    'use strict';

    return IsDataT( arg, 'Symbol' );
}

function IsUint8Array( arg ){
    'use strict';

    return IsDataT( arg, 'Uint8Array' );
}

function IsUint8ClampedArray( arg ){
    'use strict';

    return IsDataT( arg, 'Uint8ClampedArray' );
}

function IsUint16Array( arg ){
    'use strict';

    return IsDataT( arg, 'Uint16Array' );
}

function IsUint32Array( arg ){
    'use strict';

    return IsDataT( arg, 'Uint32Array' );
}

function IsUndefined( arg ){
    'use strict';

    return IsDataT( arg, 'Undefined' );
}

function IsWeakMap( arg ){
    'use strict';

    return IsDataT( arg, 'WeakMap' );
}

function IsWeakSet( arg ){
    'use strict';

    return IsDataT( arg, 'WeakSet' );
}

function IsWorker( arg ){
    'use strict';

    return IsDataT( arg, 'Worker' );
}

/**
 * 该装饰器(Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Array', IsArray );
}

/**
 * 该装饰器(ArrayBuffer类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function ArrayBufferType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'ArrayBuffer', IsArrayBuffer );
}

/**
 * 该装饰器(Array Iterator类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：如下都是这个数据类型<br />
 * 1、[ "a", "b", "c", ].keys()<br />
 * 2、[ "a", "b", "c", ].values()<br />
 * 3、[ "a", "b", "c", ].entries()<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function ArrayIteratorType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Array Iterator', IsArrayIterator );
}

/**
 * 该装饰器(Async Function类型的数据，包括异步的Generator函数)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function AsyncFunType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Async Function|Async Generator Function', IsAsyncFun );
}

/**
 * 该装饰器(Async Generator类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function AsyncGeneratorType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Async Generator', IsAsyncGenerator );
}

/**
 * 该装饰器(Async Generator Function类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function AsyncGeneratorFunType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Async Generator Function', IsAsyncGeneratorFun );
}

/**
 * 该装饰器用于修饰类本身、类的实例方法、静态方法
 */
function AutoBind( target, name, descriptor ){
    GetError( 'Decorator装饰器“AutoBind”还未实现！' );
}

/**
 * 该装饰器(BigInt类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function BigIntType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'BigInt', IsBigInt );
}

/**
 * 该装饰器(BigInt64Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function BigInt64ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'BigInt64Array', IsBigInt64Array );
}

/**
 * 该装饰器(BigUint64Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function BigUint64ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'BigUint64Array', IsBigUint64Array );
}

/**
 * 该装饰器(Blob类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function BlobType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Blob', IsBlob );
}

/**
 * 该装饰器(Boolean类型的数据(不包括布尔对象、实例))用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function BooleanType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Boolean(不包括布尔对象、实例)', IsBoolean );
}

/**
 * 该装饰器(DataView类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function DataViewType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'DataView', IsDataView );
}

/**
 * 该装饰器(Date类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function DateType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Date', IsDate );
}

/**
 * 该装饰器(Empty Data类型的数据，空的字符串('')、空的数组([])、空的对象({})、空的FormData)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function EmptyDataType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, `Empty Data(空的字符串('')、空的数组([])、空的对象({})、空的FormData)`, IsEmpty );
}

/**
 * 该装饰器(全空的真空对象(Object.create( null )、{ __proto__: null, }、Object.setPrototypeOf( {}, null ))类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function EmptyObjectType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Empty Object(Object.create( null )、{ __proto__: null, }、Object.setPrototypeOf( {}, null ))', IsEmptyObject );
}

/**
 * 该装饰器(Error类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function ErrorType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Error', IsError );
}

/**
 * 该装饰器(File类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function FileType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'File', IsFile );
}

/**
 * 该装饰器(FileReader类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function FileReaderType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'FileReader', IsFileReader );
}

/**
 * 该装饰器(Float32Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Float32ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Float32Array', IsFloat32Array );
}

/**
 * 该装饰器(Float64Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Float64ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Float64Array', IsFloat64Array );
}

/**
 * 该装饰器(FormData类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function FormDataType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'FormData', IsFormData );
}

/**
 * 该装饰器(Function类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function FunctionType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Function', IsFunction );
}

/**
 * 该装饰器(Generator函数执行后生成的Generator遍历器类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function GeneratorType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Generator函数执行后生成的Generator遍历器', IsGenerator );
}

/**
 * 该装饰器(Generator函数类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function GeneratorFunType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Generator函数', IsGeneratorFun );
}

/**
 * 该装饰器(Int8Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Int8ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Int8Array', IsInt8Array );
}

/**
 * 该装饰器(Int16Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Int16ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Int16Array', IsInt16Array );
}

/**
 * 该装饰器(Int32Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Int32ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Int32Array', IsInt32Array );
}

/**
 * 该装饰器(Map类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function MapType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Map', IsMap );
}

/**
 * 该Mixin装饰器用于修饰类本身，用于增加类的实例属性、实例方法
 *
 * @param list_obj rest参数，成员都是一个个Object，必须<br />
 * PS：<br />
 * 1、成员格式：<br />
 * { mixinA4Property1: '混入的第一个实例属性', mixinA4Method1(){ console.log( '混入的第一个实例方法' ); , <br />
 *
 * @returns {function} 装饰器函数
 */
function Mixin2Class4Proto( ...list_obj ){
    return function ( target ){
        Object.assign( target.prototype, ...list_obj );
    };
}

/**
 * 该Mixin装饰器用于修饰类本身，用于增加类的静态属性、静态方法
 *
 * @param list_obj rest参数，成员都是一个个Object，必须<br />
 * PS：<br />
 * 1、成员格式：<br />
 * { mixinA4StaticProperty1: '混入的第一个静态属性', mixinA4StaticMethod1(){ console.log( '混入的第一个静态方法' ); , <br />
 *
 * @returns {function} 装饰器函数
 */
function Mixin2Class4Static( ...list_obj ){
    return function ( target ){
        Object.assign( target, ...list_obj );
    };
}

/**
 * 该装饰器(NaN类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NaNType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'NaN', IsNaN );
}

/**
 * 该装饰器(不可配置)用于修饰类的实例属性、实例方法、静态属性、静态方法<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性、类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性、类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NoConfigurable( target, name, descriptor ){
    'use strict';

    return Handle1( name, descriptor, 'configurable' );
}

/**
 * 该装饰器(不可枚举)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NoEnumerable( target, name, descriptor ){
    'use strict';

    return Handle1( name, descriptor, 'enumerable' );
}

/**
 * 该装饰器(Null类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NullType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Null', IsNull );
}

/**
 * 该装饰器(Number类型的数据(包括NaN值，但是不包括Number对象、实例))用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NumberType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number(包括NaN值，但是不包括Number对象、实例)', IsNumber );
}

/**
 * 该装饰器(Number Finite类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NumberFiniteType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number Finite', IsFinite );
}

/**
 * 该装饰器(Number Integer类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NumberIntegerType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number Integer', IsInteger );
}

/**
 * 该装饰器(Number SafeInteger类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NumberSafeIntegerType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number SafeInteger', IsSafeInteger );
}

/**
 * 该装饰器(Object、Module类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function ObjectType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Object、Module', IsObject );
}

/**
 * 该装饰器(是否正确覆盖父类的方法：参数个数是否一致，方法名是否一致)用于修饰类的实例方法、静态方法<br />
 * PS：<br />
 * 1、修饰类的实例方法时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态方法时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例方法时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态方法时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Override( target, name, descriptor ){
    const getStr1_funC = arg => `该类没有继承其他类，无法使用该修饰器修饰${ arg }方法！`,
        getStr2_funC = arg => `直接父类不存在同名(${ name })的${ arg }方法！`,
        getTarget_funC = target => Object.getPrototypeOf( target ),
        get1_funC = target => Object.getOwnPropertyDescriptor( getTarget_funC( target ), name ),
        is1_booC = IsObject( target ),
        is2_booC = IsFunction( target ),
        isHandle1_funC = target => IsUndefined( get1_funC( target ) ),
        isHandle2_funC = target => getTarget_funC( target ) === getTarget_funC( {} ) && isHandle1_funC( target ),
        isHandle3_funC = target => !( 'get' in descriptor || 'set' in descriptor ) && ( get1_funC( target ).value.length !== descriptor.value.length ),
        getStr3_funC = arg => `${ arg }方法的参数个数不相等！直接父类的${ arg }方法${ name }的参数个数是${ get1_funC( target ).value.length }个，而子类的是${ descriptor.value.length }个！`;

    if( is1_booC && isHandle2_funC( target ) ){
        GetError( getStr1_funC( '实例' ) );
    }
    else if( is2_booC && isHandle2_funC( target.prototype ) ){
        GetError( getStr1_funC( '静态' ) );
    }
    else if( is1_booC && isHandle1_funC( target ) ){
        GetError( getStr2_funC( '实例' ) );
    }
    else if( is2_booC && isHandle1_funC( target ) ){
        GetError( getStr2_funC( '静态' ) );
    }
    else if( is1_booC && isHandle3_funC( target ) ){
        GetError( getStr3_funC( '实例' ) );
    }
    else if( is2_booC && isHandle3_funC( target ) ){
        GetError( getStr3_funC( '静态' ) );
    }

    return descriptor;
}

/**
 * 该装饰器(Promise类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function PromiseType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Promise', IsPromise );
}

/**
 * 该装饰器(只读)用于修饰类的实例属性、实例方法、静态属性、静态方法<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性、类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性、类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function ReadOnly( target, name, descriptor ){
    'use strict';

    return Handle1( name, descriptor, 'writable' );
}

/**
 * 该装饰器(RegExp类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function RegExpType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'RegExp', IsRegExp );
}

/**
 * 该装饰器(Set类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function SetType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Set', IsSet );
}

/**
 * 该装饰器(SharedArrayBuffer类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function SharedArrayBufferType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'SharedArrayBuffer', IsSharedArrayBuffer );
}

/**
 * 该装饰器(SharedWorker类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function SharedWorkerType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'SharedWorker', IsSharedWorker );
}

/**
 * 该装饰器(String类型的数据(不包括String对象、实例))用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function StringType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'String(不包括String对象、实例)', IsString );
}

/**
 * 该装饰器(Symbol类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function SymbolType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Symbol', IsSymbol );
}

/**
 * 该装饰器(Uint8Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Uint8ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Uint8Array', IsUint8Array );
}

/**
 * 该装饰器(Uint8ClampedArray类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Uint8ClampedArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Uint8ClampedArray', IsUint8ClampedArray );
}

/**
 * 该装饰器(Uint16Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Uint16ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Uint16Array', IsUint16Array );
}

/**
 * 该装饰器(Uint32Array类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Uint32ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Uint32Array', IsUint32Array );
}

/**
 * 该装饰器(Undefined类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function UndefinedType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Undefined', IsUndefined );
}

/**
 * 该装饰器(WeakMap类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function WeakMapType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'WeakMap', IsWeakMap );
}

/**
 * 该装饰器(WeakSet类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function WeakSetType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'WeakSet', IsWeakSet );
}

/**
 * 该装饰器(Worker类型的数据)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function WorkerType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Worker', IsWorker );
}

const decorators_objC = {
    ArrayType,
    ArrayBufferType,
    ArrayIteratorType,
    AsyncFunType,
    AsyncGeneratorType,
    AsyncGeneratorFunType,
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
    Mixin2Class4Proto,
    Mixin2Class4Static,
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
};

export {
    ArrayType,
    ArrayBufferType,
    ArrayIteratorType,
    AsyncFunType,
    AsyncGeneratorType,
    AsyncGeneratorFunType,
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
    Mixin2Class4Proto,
    Mixin2Class4Static,
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
};

export default decorators_objC;
