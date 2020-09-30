/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import JSBI from 'jsbi';

import MathTool4WASM from 'jsPubDir/MathTool4WASM.esm.js';

let CT = new CTESM.CT();

const {
    BeerCountX = 10,
    FibX = 10,

    AddX = 1.1,
    AddY = 2,
    SubX = 5.1,
    SubY = 1,
    MulX = 1.1,
    MulY = 2,
    DivX = 5.1,
    DivY = 3,
    ModX = -5.1,
    ModY = 3,

    PowX = 2,
    PowY = 3,
    FmodX = 5,
    FmodY = 3,
    RemainderX = 5.1,
    RemainderY = 3,
    FmaxX = 2.1,
    FmaxY = 1,
    FminX = -2.1,
    FminY = 1,
    FdimX = 2.1,
    FdimY = -1,
    ExpX = 1,
    Exp2X = 10,
    Expm1X = 1,
    LogX = 1,
    Log10X = 100000,
    Log2X = 64,
    Log1pX = 0,
    LogXYX = -2,
    LogXYY = -( 1 / 4 ),
    CbrtX = -27,
    Hypot2X = 3,
    Hypot2Y = 4,
    Hypot3X = 3,
    Hypot3Y = 4,
    Hypot3Z = 5,
    SinX = Math.PI / 6,
    CosX = Math.PI / 3,
    TanX = Math.PI / 4,
    AsinX = 1,
    AcosX = -1,
    AtanX = 1,
    Atan2X = 0,
    Atan2Y = 10,
    SinhX = -1,
    CoshX = 1,
    TanhX = 1,
    AsinhX = 1,
    AcoshX = 1,
    AtanhX = 0,
    CeilX = 2.4,
    FloorX = -2.7,
    TruncX = -2.9,
    RoundX1 = 20.49,
    RoundX2 = 20.5,
    RoundX3 = -20.5,
    RoundX4 = -20.51,
    NearbyintX1 = 2.3,
    NearbyintX2 = 2.5,
    NearbyintX3 = 3.5,
    NearbyintX4 = -2.3,
    NearbyintX5 = -2.5,
    NearbyintX6 = -3.5,
    RintX1 = 2.3,
    RintX2 = 2.5,
    RintX3 = 3.5,
    RintX4 = -2.3,
    RintX5 = -2.5,
    RintX6 = -3.5,
    LdexpX = 1,
    LdexpY = 12,

} = CT.urlSea2Obj();

MathTool4WASM()
    .then( ( {
                 module,
                 instance,
                 funs,
             } ) => {
        const {
            Fib,

            Add,
            Sub,
            Mul,
            Div,
            Mod,

            Pow,
            Fmod,
            Remainder,
            Fmax,
            Fmin,
            Fdim,

            NaN,

            Exp,
            Exp2,
            Expm1,
            Log,
            Log10,
            Log2,
            Log1p,
            LogXY,
            Cbrt,
            Hypot2,
            Hypot3,
            Sin,
            Cos,
            Tan,
            Asin,
            Acos,
            Atan,
            Atan2,
            Sinh,
            Cosh,
            Tanh,
            Asinh,
            Acosh,
            Atanh,
            Ceil,
            Floor,
            Trunc,
            Round,
            Nearbyint,
            Rint,
            Ldexp,

        } = funs;

        // 小于4时，值都是1；大于等于4时，可用这个公式快速求值：3 + Math.trunc( ( num - 4 ) / 2 ) * 4
        function BeerCount4Fast( num = 10 ){
            if( num < 2 ){
                return '不够钱(每瓶两块钱，四个瓶盖换一瓶、两个空瓶换一瓶，不能借瓶盖、空瓶)。';
            }
            else{
                if( num < 4 ){
                    return 1;
                }
                else{
                    return 3 + Math.trunc( ( num - 4 ) / 2 ) * 4;
                }
            }
        }

        function BeerCount( num = BeerCountX ){
            let result_num = Trunc( num / 2 ),
                // 瓶盖数
                bottleCap_num = result_num,
                // 空瓶数
                emptyBottle_num = result_num,
                // 是否满足计算“瓶盖数”
                handleA4Judge = num => num >= 4,
                // 是否满足计算“空瓶数”
                handleB4Judge = num => num >= 2,
                boo0 = result_num > 0,
                boo1 = !handleA4Judge( result_num ) && !handleB4Judge( result_num ),
                integer_num = null,
                remainder_num = null,
                // 计算“瓶盖数”
                handle4BottleCap = () => {
                    while( handleA4Judge( bottleCap_num ) ){
                        integer_num = Trunc( bottleCap_num / 4 );
                        remainder_num = bottleCap_num % 4;

                        bottleCap_num = integer_num + remainder_num;
                        emptyBottle_num += integer_num;
                        result_num += integer_num;
                    }
                },
                // 计算“空瓶数”
                handle4EmptyBottle = () => {
                    while( handleB4Judge( emptyBottle_num ) ){
                        integer_num = Trunc( emptyBottle_num / 2 );
                        remainder_num = emptyBottle_num % 2;

                        emptyBottle_num = integer_num + remainder_num;
                        bottleCap_num += integer_num;
                        result_num += integer_num;
                    }
                };

            if( boo0 && boo1 ){
                return result_num;
            }
            else{
                if( boo0 && !boo1 ){
                    while( handleA4Judge( bottleCap_num ) || handleB4Judge( emptyBottle_num ) ){
                        handle4EmptyBottle();
                        handle4BottleCap();
                    }

                    return result_num;
                }
                else{
                    return '不够钱(每瓶两块钱，四个瓶盖换一瓶、两个空瓶换一瓶，不能借瓶盖、空瓶)。';
                }
            }
        }

        CT.iInsertA( '.helloWorld article', `<p class = 'css-reset' >------fetch WASM Start------</p><br />` );

        const startTime = performance.now();
        const result_num = do{
            let num = Fib( FibX, 1, 1 );

            if( 'BigInt' in window ){
                if( CT.isNaN( num ) ){
                    console.log( '项数别超过1476！！！' );
                    Infinity;
                }
                else{
                    BigInt( num );
                }
            }
            else{
                if( CT.isNaN( num ) ){
                    console.log( '项数别超过1476！！！' );
                    Infinity;
                }
                else{
                    JSBI.BigInt( num );
                }
            }
        };
        const endTime = performance.now();

        CT.iInsertA( '.helloWorld article', `
<p class = 'css-reset' >WASM_BeerCount( ${ BeerCountX } )：${ BeerCount( BeerCountX ) }</p><br />

<p class = 'css-reset' >WASM_Fib( ${ FibX } )：${ result_num }</p><br />
<p class = 'css-reset' >计算“WASM_Fib( ${ FibX } )”耗时：${ ( ( endTime - startTime ) / 1000 ).ctoToFixed( 20 ) }秒、${ ( ( endTime - startTime ) / 60000 ).ctoToFixed( 20 ) }分钟</p><br />

<p class = 'css-reset' >WASM_Add( ${ AddX }, ${ AddY } )：${ Add( AddX, AddY ) }</p><br />
<p class = 'css-reset' >WASM_Sub( ${ SubX }, ${ SubY } )：${ Sub( SubX, SubY ) }</p><br />
<p class = 'css-reset' >WASM_Mul( ${ MulX }, ${ MulY } )：${ Mul( MulX, MulY ) }</p><br />
<p class = 'css-reset' >WASM_Div( ${ DivX }, ${ DivY } )：${ Div( DivX, DivY ) }</p><br />
<p class = 'css-reset' >WASM_Mod( ${ ModX }, ${ ModY } )：${ Mod( ModX, ModY ) }</p><br />

<p class = 'css-reset' >WASM_Pow( ${ PowX }, ${ PowY } )：${ Pow( PowX, PowY ) }</p><br />
<p class = 'css-reset' >WASM_Fmod( ${ FmodX }, ${ FmodY } )：${ Fmod( FmodX, FmodY ) }</p><br />
<p class = 'css-reset' >WASM_Remainder( ${ RemainderX }, ${ RemainderY } )：${ Remainder( RemainderX, RemainderY ) }</p><br />
<p class = 'css-reset' >WASM_Fmax( ${ FmaxX }, ${ FmaxY } )：${ Fmax( FmaxX, FmaxY ) }</p><br />
<p class = 'css-reset' >WASM_Fmin( ${ FminX }, ${ FminY } )：${ Fmin( FminX, FminY ) }</p><br />
<p class = 'css-reset' >WASM_Fdim( ${ FdimX }, ${ FdimY } )：${ Fdim( FdimX, FdimY ) }</p><br />

<p class = 'css-reset' >WASM_NaN：${ NaN() }</p><br />

<p class = 'css-reset' >WASM_Exp( ${ ExpX } )：${ Exp( ExpX ) }</p><br />
<p class = 'css-reset' >WASM_Exp2( ${ Exp2X } )：${ Exp2( Exp2X ) }</p><br />
<p class = 'css-reset' >WASM_Expm1( ${ Expm1X } )：${ Expm1( Expm1X ) }</p><br />
<p class = 'css-reset' >WASM_Log( ${ LogX } )：${ Log( LogX ) }</p><br />
<p class = 'css-reset' >WASM_Log10( ${ Log10X } )：${ Log10( Log10X ) }</p><br />
<p class = 'css-reset' >WASM_Log2( ${ Log2X } )：${ Log2( Log2X ) }</p><br />
<p class = 'css-reset' >WASM_Log1p( ${ Log1pX } )：${ Log1p( Log1pX ) }</p><br />
<p class = 'css-reset' >WASM_LogXY( ${ LogXYX }, ${ LogXYY } )：${ LogXY( LogXYX, LogXYY ) }</p><br />
<p class = 'css-reset' >WASM_Cbrt( ${ CbrtX } )：${ Cbrt( CbrtX ) }</p><br />
<p class = 'css-reset' >WASM_Hypot2( ${ Hypot2X }, ${ Hypot2Y } )：${ Hypot2( Hypot2X, Hypot2Y ) }</p><br />
<p class = 'css-reset' >WASM_Hypot3( ${ Hypot3X }, ${ Hypot3Y }, ${ Hypot3Z } )：${ Hypot3( Hypot3X, Hypot3Y, Hypot3Z ) }</p><br />
<p class = 'css-reset' >WASM_Sin( ${ SinX } )：${ Sin( SinX ) }</p><br />
<p class = 'css-reset' >WASM_Cos( ${ CosX } )：${ Cos( CosX ) }</p><br />
<p class = 'css-reset' >WASM_Tan( ${ TanX } )：${ Tan( TanX ) }</p><br />
<p class = 'css-reset' >WASM_Asin( ${ AsinX } )：${ Asin( AsinX ) }</p><br />
<p class = 'css-reset' >WASM_Acos( ${ AcosX } )：${ Acos( AcosX ) }</p><br />
<p class = 'css-reset' >WASM_Atan( ${ AtanX } )：${ Atan( AtanX ) }</p><br />
<p class = 'css-reset' >WASM_Atan2( ${ Atan2X }, ${ Atan2Y } )：${ Atan2( Atan2X, Atan2Y ) }</p><br />
<p class = 'css-reset' >WASM_Sinh( ${ SinhX } )：${ Sinh( SinhX ) }</p><br />
<p class = 'css-reset' >WASM_Cosh( ${ CoshX } )：${ Cosh( CoshX ) }</p><br />
<p class = 'css-reset' >WASM_Tanh( ${ TanhX } )：${ Tanh( TanhX ) }</p><br />
<p class = 'css-reset' >WASM_Asinh( ${ AsinhX } )：${ Asinh( AsinhX ) }</p><br />
<p class = 'css-reset' >WASM_Acosh( ${ AcoshX } )：${ Acosh( AcoshX ) }</p><br />
<p class = 'css-reset' >WASM_Atanh( ${ AtanhX } )：${ Atanh( AtanhX ) }</p><br />
<p class = 'css-reset' >WASM_Ceil( ${ CeilX } )：${ Ceil( CeilX ) }</p><br />
<p class = 'css-reset' >WASM_Floor( ${ FloorX } )：${ Floor( FloorX ) }</p><br />
<p class = 'css-reset' >WASM_Trunc( ${ TruncX } )：${ Trunc( TruncX ) }</p><br />
<p class = 'css-reset' >WASM_Round( ${ RoundX1 } )：${ Round( RoundX1 ) }</p><br />
<p class = 'css-reset' >WASM_Round( ${ RoundX2 } )：${ Round( RoundX2 ) }</p><br />
<p class = 'css-reset' >WASM_Round( ${ RoundX3 } )：${ Round( RoundX3 ) }</p><br />
<p class = 'css-reset' >WASM_Round( ${ RoundX4 } )：${ Round( RoundX4 ) }</p><br />
<p class = 'css-reset' >WASM_Nearbyint( ${ NearbyintX1 } )：${ Nearbyint( NearbyintX1 ) }</p><br />
<p class = 'css-reset' >WASM_Nearbyint( ${ NearbyintX2 } )：${ Nearbyint( NearbyintX2 ) }</p><br />
<p class = 'css-reset' >WASM_Nearbyint( ${ NearbyintX3 } )：${ Nearbyint( NearbyintX3 ) }</p><br />
<p class = 'css-reset' >WASM_Nearbyint( ${ NearbyintX4 } )：${ Nearbyint( NearbyintX4 ) }</p><br />
<p class = 'css-reset' >WASM_Nearbyint( ${ NearbyintX5 } )：${ Nearbyint( NearbyintX5 ) }</p><br />
<p class = 'css-reset' >WASM_Nearbyint( ${ NearbyintX6 } )：${ Nearbyint( NearbyintX6 ) }</p><br />
<p class = 'css-reset' >WASM_Rint( ${ RintX1 } )：${ Rint( RintX1 ) }</p><br />
<p class = 'css-reset' >WASM_Rint( ${ RintX2 } )：${ Rint( RintX2 ) }</p><br />
<p class = 'css-reset' >WASM_Rint( ${ RintX3 } )：${ Rint( RintX3 ) }</p><br />
<p class = 'css-reset' >WASM_Rint( ${ RintX4 } )：${ Rint( RintX4 ) }</p><br />
<p class = 'css-reset' >WASM_Rint( ${ RintX5 } )：${ Rint( RintX5 ) }</p><br />
<p class = 'css-reset' >WASM_Rint( ${ RintX6 } )：${ Rint( RintX6 ) }</p><br />
<p class = 'css-reset' >WASM_Ldexp( ${ LdexpX }, ${ LdexpY } )：${ Ldexp( LdexpX, LdexpY ) }</p><br />

<p class = 'css-reset' >------fetch WASM End------</p><br />
` );

    } )
    .catch( error => void ( CT.iInsertA( '.helloWorld article', `<p class = 'css-reset' >error：${ error }</p><br />` ) ) );
