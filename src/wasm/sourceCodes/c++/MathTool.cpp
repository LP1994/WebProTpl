#include <climits>
#include <cfloat>
#include <cmath>
#include <complex>
#include <cstdlib>
#include <cstdint>
#include <cinttypes>
#include <array>
#include <string>

using namespace std;

/*
1、注意三角函数（sin（），cos（），tan（），asin（），acos（），atan（），atan2（））期望（和返回）以弧度表示的角度。
2、要将弧度转换为度数，请除以（Math.PI/180）。
3、乘以相同的值将度转换为弧度。
*/

extern "C" {

/*加、减、乘、除、模运算 Start*/

double Add( double x, double y ){
    return x + y;
}

double Sub( double x, double y ){
    return x - y;
}

double Mul( double x, double y ){
    return x * y;
}

double Div( double x, double y ){
    return x / y;
}

long int Mod( long int x, long int y ){
    return x % y;
}

/*加、减、乘、除、模运算 End*/



/*函数尾递归调用优化版本的斐波拉契数列(Fibonacci)计算，index别超过1476 Start*/

double Fib( double index, double initial1, double initial2 ){
if( index <= 1 ){
return initial1;
}
else if( index == 2 ){
return initial2;
}
else if( index > 1476 ){
return NAN;
}
else{
return Fib( index - 1, initial2, initial1 + initial2 );
}
}

/*函数尾递归调用优化版本的斐波拉契数列(Fibonacci)计算，index别超过1476 End*/



/*计算整数值的绝对值 Start*/
/*
PS：
若返回类型无法表示结果，则行为未定义。

在补码中，最负的值的绝对值处于对应整数范围外，例如对于 32 位补码类型整数， INT_MIN 为 -2147483648 ，
但其绝对值应有的结果是 2147483648 ，大于 INT_MAX ，其值为 2147483647 。
*/
/*
返回值：
x 的绝对值（即 |x| ），若它能表示。
*/
/*
例子：
abs(+3) = 3
abs(-3) = 3
*/

/*
int Abs( int x ){
return abs( x );
}
*/

/*
long int Labs( long int x ){
return labs( x );
}
*/

/*
long long int Llabs( long long int x ){
return llabs( x );
}
*/

/*
intmax_t Imaxabs( intmax_t x ){
return imaxabs( x );
}
*/

/*计算整数值的绝对值 End*/



/*计算浮点值的绝对值 Start*/
/*
返回值：
若成功，则返回 arg 的绝对值（ |arg| ）。值是准确的，且不依赖任何舍入模式。
*/
/*
错误处理：
此函数不受制于任何指定于 math_errhandling 的错误条件。
若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 +0
若参数为 ±∞ ，则返回 +∞
若参数为 NaN ，则返回 NaN
*/
/*
例子：
fabs(+3) = 3.000000
fabs(-3) = 3.000000
fabs(-0) = 0.000000
fabs(-Inf) = inf
*/

/*
float Fabsf( float x ){
return fabsf( x );
}
*/

/*
double Fabs( double x ){
return fabs( x );
}
*/

/*
long double Fabsl( long double x ){
return fabsl( x );
}
*/

/*计算浮点值的绝对值 End*/



/*计算复数的绝对值(范数、模) Start*/
/*
返回值：
若不出现错误，则返回 z 的绝对值（范数、模）。
如同函数实现为 hypot(creal(z), cimag(z)) 一般处理错误和特殊情况。
*/

/*
float Cabsf( float complex x ){
return cabsf( x );
}
*/

/*
double Cabs( double complex x ){
return cabs( x );
}
*/

/*
long double Cabsl( long double complex x ){
return cabsl( x );
}
*/

/*计算复数的绝对值(范数、模) End*/



/*绝对值的计算(整数、浮点数，不包含“复数”) Start*/

double Abs( double x ){
return abs( x );
}

/*绝对值的计算(整数、浮点数，不包含“复数”) End*/



/*计算分子"x"除以分母"y"的"商"和"余数" Start*/
/*
PS：
C99前：
同时计算商和余数。商为舍弃小数部分（向零取整）的代数商。余数满足 quot * y + rem == x 的值。
若运算数之一为负，则内建的除法和取余运算符中的商取整方向和余数符号是实现定义的，但它在 div 和 ldiv 中良好定义。
C99起：
同时计算商（表达式 x/y 的结果）和余数（表达式 x%y 的结果）。

多数平台上，单条 CPU 指令获得商和余数，而此函数可以活用这点，尽管编译器通常能在适合处合并临近的 / 和 % 。
*/
/*
返回值：
若余数或商无法表示，则行为未定义。
*/

/*
div_t DIV( int x, int y ){
return div( x, y );
}
*/

/*
ldiv_t Ldiv( long int x, long int y ){
return ldiv( x, y );
}
*/

/*
lldiv_t Lldiv( long long int x, long long int y ){
return lldiv( x, y );
}
*/

/*
imaxdiv_t Imaxdiv( intmax_t x, intmax_t y ){
return imaxdiv( x, y );
}
*/

/*计算分子"x"除以分母"y"的"商"和"余数" End*/



/*计算浮点值除法运算"x / y"的浮点余数 Start*/
/*
PS：
此函数计算的除法 x/y 的浮点余数是 x - n*y 的准确值，其中 n 是截断小数部分的 x/y 。
返回值与 x 拥有相同符号，且绝对值小于 y 。

POSIX 要求若 x 为无穷大或 y 为零则出现定义域错误
fmod ，但不是 remainder ，适于安静地包装浮点类型到无符号整数类型： (0.0 <= (y = fmod( rint(x), 65536.0 )) ? y : 65536.0 + y) 在范围 [-0.0 .. 65535.0] 内，
它对应 unsigned short ，但 remainder(rint(x), 65536.0) 在范围 [-32767.0, +32768.0] 内，它在 signed short 的范围外。
*/
/*
返回值：
若成功，则返回定义于上的除法 x/y 的浮点余数。
若出现定义域错误，则返回实现定义值（受支持的平台上为 NaN ）。
若出现下溢所指定值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 y 为零则可能发生定义域错误。
若实现支持 IEEE 浮点算术（ IEC 60559 ），
若 x 为 ±0 且 y 非零，则返回 ±0
若 x 为 ±∞ 且 y 非 NaN ，则返回 NaN 并引发 FE_INVALID
若 y 为 ±0 且 x 非 NaN ，则返回 NaN 并引发 FE_INVALID
若 y 为 ±∞ 且 x 有限，则返回 x 。
若任一参数为 NaN ，则返回 NaN 。
*/
/*
例子：
fmod(+5.1, +3.0) = 2.1
fmod(-5.1, +3.0) = -2.1
fmod(+5.1, -3.0) = 2.1
fmod(-5.1, -3.0) = -2.1
fmod(+0.0, 1.0) = 0.0
fmod(-0.0, 1.0) = -0.0
fmod(+5.1, Inf) = 5.1
fmod(+5.1, 0) = nan
*/

/*
float Fmodf( float x, float y ){
return fmodf( x, y );
}
*/

double Fmod( double x, double y ){
return fmod( x, y );
}

/*
long double Fmodl( long double x, long double y ){
return fmodl( x, y );
}
*/

/*计算浮点值除法运算"x / y"的浮点余数 End*/



/*计算浮点值除法运算的带符号余数 Start*/
/*
PS：
此函数所计算的除法运算 x/y 的 IEEE 浮点余数，准确地为值 x - n*y ，其中值 n 是最接近 x/y 准确值的整数值。 |n-x/y| = ½ 时，选择作为偶数的 n 。
与 std::fmod() 相反，不保证返回值拥有与 x 相同的符号。

若返回值是 0 ，则它拥有与 x 相同的符号。

POSIX 要求若 x 为无穷大或 y 为零则出现定义域错误。

fmod ，但不是 remainder ，适于安静地包装浮点类型到无符号整数类型： (0.0 <= (y = fmod( rint(x), 65536.0 )) ? y : 65536.0 + y) 在范围 [-0.0 .. 65535.0] 内，
它对应 unsigned short ，但 remainder(rint(x), 65536.0) 在范围 [-32767.0, +32768.0] 内，它在 signed short 的范围外。
*/
/*
返回值：
若成功，则返回定义如上的除法 x/y 浮点余数。
若出现定义域错误，则返回实现定义值（受支持平台上为 NaN ）。
若出现下溢所致的值域错误，则返回正确结果。
若 y 为零但不出现定义域错误，则返回零。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 y 为零则可能出现定义域错误。
若实现支持 IEEE 浮点算术 （ IEC 60559 ），则
当前舍入模式无效。
决不引发 FE_INEXACT ，结果始终准确。
若 x 为 ±∞ 且 y 非 NaN ，则返回 NaN 并引发 FE_INVALID 。
若 y 为 ±0 且 x 非 NaN ，则返回 NaN 并引发 FE_INVALID 。
若任一参数为 NaN ，则返回 NaN 。
*/
/*
例子：
remainder(+5.1, +3.0) = -0.9
remainder(-5.1, +3.0) = 0.9
remainder(+5.1, -3.0) = -0.9
remainder(-5.1, -3.0) = 0.9
remainder(+0.0, 1.0) = 0.0
remainder(-0.0, 1.0) = -0.0
remainder(+5.1, Inf) = 5.1
remainder(+5.1, 0) = -nan
*/

/*
float Remainderf( float x, float y ){
return remainderf( x, y );
}
*/

double Remainder( double x, double y ){
return remainder( x, y );
}

/*
long double Remainderl( long double x, long double y ){
return remainderl( x, y );
}
*/

/*计算浮点值除法运算的带符号余数 End*/



/*计算浮点值除法运算的带符号余数，以及商的后三位 Start*/
/*
PS：
计算除法运算 x/y 的浮点余数，如 remainder() 函数所为。另外，将存储 x/y 的至少最低三位及符号于 quo ，这足以确定结果在周期中的八分位。

POSIX 要求若 x 为无穷大或 y 为零则出现定义域错误。

此函数在实现周期可准确表示为浮点值的周期函数时有用：对非常大的 x 计算 sin(πx) 时，直接调用 sin 可能导致巨大误差，但若首先以 remquo 减小参数，
则商的低位可用来确定结果在周期中的八分位，同时余数可用来计算拥有高精度的值。

某些平台上硬件支持此运算（而例如在 Intel CPU 上， FPREM1 在完成时于商中准确保留 3 位精度）。
*/
/*
返回值：
若成功，则返回定义于 remainder 的 x/y 的余数，
并存储 x/y 的符号和至少后三位有效数字于 *quo （正式而言，存储的值的符号是 x/y 的符号，而绝对值与 x/y 的整数商的绝对值对于 modulo 2n 同余，
其中 n 是实现定义的大于或等于 3 的整数）。
若 y 为零，则存储于 *quo 的值未指定。
若出现定义域错误，则返回实现定义值（受支持平台上为 NaN ）。
若出现下溢所致的值域错误，则若支持非正规值则返回正确结果。
若 y 为零，但不出现定义域错误，则返回零。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 y 为零则可能出现定义域错误。
若实现支持 IEEE 浮点算术（ IEC 60559 ），则
当前舍入模式无效。
决不引发 FE_INEXACT 。
若 x 为 ±∞ 且 y 非 NaN ，则返回 NaN 并引发 FE_INVALID 。
若 y 为 ±0 且 x 非 NaN ，则返回 NaN 并引发 FE_INVALID 。
若 x 或 y 为 NaN ，则返回 NaN 。
*/

// quo - 指向存储 x/y 的符号和某些位的整数的指针
/*
float Remquof( float x, float y, int *quo ){
return remquof( x, y, &quo );
}
*/

// quo - 指向存储 x/y 的符号和某些位的整数的指针
/*
double Remquo( double x, double y, int *quo ){
return remquo( x, y, &quo );
}
*/

/*
// quo - 指向存储 x/y 的符号和某些位的整数的指针
long double Remquol( long double x, long double y, int *quo ){
return remquol( x, y, &quo );
}
*/

/*计算浮点值除法运算的带符号余数，以及商的后三位 End*/



/*计算结合的乘加运算(x, y, z) Start*/
/*
PS：
计算 (x*y) + z ，如同用无限精度，而仅舍入一次到结果类型。

此运算经常在硬件中实现为融合乘加 CPU 指令。若硬件支持，则期待定义相应的 FP_FAST_FMA* 宏，但多数实现即使在不定义这些宏时也利用该 CPU 指令。

POSIX 另外指定被指定为返回 FE_INVALID 的情形是定义域错误。

由于其无限的中间精度， fma 是其他正确舍入数学运算，如 sqrt 或甚至除法（在 CPU 不支持的平台上，例如 Itanium ）的常用构建块。

同所有浮点表达式，表达式 (x*y) + z 可编译为融合乘加，除非 #pragma STDC FP_CONTRACT 为关闭。
*/
/*
返回值：
若成功，则返回 (x*y) + z 的值，如同计算为无限精度再舍入一次以适合目标类型（或者说是作为单次三元浮点运算计算）。
若出现上溢所致的值域错误，则返回 ±HUGE_VAL 、 ±HUGE_VALF 或 ±HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误
若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若 x 为零而 y 为无穷大或 x 为无穷大而 y 为零，且 z 非 NaN ，则返回 NaN 并引发 FE_INVALID
若 x 为零而 y 为无穷大或 x 为无穷大而 y 为零，且 z 为 NaN ，则返回 NaN 并可能引发 FE_INVALID
若 x*y 为准确的无穷大且 z 为带相反符号的无穷大，则返回 NaN 并引发 FE_INVALID
若 x 或 y 为 NaN ，则返回 NaN
若 z 为 NaN ，且 x*y 不是 0*Inf 或 Inf*0 ，则返回 NaN （而无 FE_INVALID ）
*/

/*
float Fmaf( float x, float y, float z ){
return fmaf( x, y, z );
}
*/

/*
double Fma( double x, double y, double z ){
return fma( x, y, z );
}
*/

/*
long double Fmal( long double x, long double y, long double z ){
return fmal( x, y, z );
}
*/

/*计算结合的乘加运算(x, y, z) End*/



/*计算两个浮点参数的较大者 Start*/
/*
PS：
返回二个浮点参数的较大者，把 NaNs 当做缺失数据（在 NaN 和数值间选择数值）。

不要求此函数对零的符号敏感，尽管某些实现额外强制若一个参数是 +0 而另一个是 -0 ，则返回 +0 。
*/
/*
返回值：
若成功，则返回二个浮点值的较大者。返回值准确且不依赖任何舍入模式。
*/
/*
错误处理：
此函数不受制于任何指定于 math_errhandling 的错误条件。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若二个参数之一为 NaN ，则返回另一参数的值
仅若二个参数均为 NaN ，才返回 NaN
*/
/*
例子：
fmax(2,1)    = 2.000000
fmax(-Inf,0) = 0.000000
fmax(NaN,-1) = -1.000000
*/

/*
float Fmaxf( float x, float y ){
return fmaxf( x, y );
}
*/

double Fmax( double x, double y ){
return fmax( x, y );
}

/*
long double Fmaxl( long double x, long double y ){
return fmaxl( x, y );
}
*/

/*计算两个浮点参数的较大者 End*/



/*计算两个浮点参数的较小者 Start*/
/*
PS：
返回二个浮点参数的较小者，把 NaNs 当做缺失数据（在 NaN 和数值间选择数值）。

不要求此函数对零的符号敏感，尽管某些实现额外强制若一个参数是 +0 而另一个是 -0 ，则返回 -0 。
*/
/*
返回值：
若成功，则返回二个浮点值的较小者。返回值准确且不依赖任何舍入模式。
*/
/*
错误处理：
此函数不受制于任何指定于 math_errhandling 的错误条件。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若二个参数之一为 NaN ，则返回另一参数的值
仅若二个参数均为 NaN ，才返回 NaN
*/
/*
例子：
fmin(2,1)    = 1.000000
fmin(-Inf,0) = -inf
fmin(NaN,-1) = -1.000000
*/

/*
float Fminf( float x, float y ){
return fminf( x, y );
}
*/

double Fmin( double x, double y ){
return fmin( x, y );
}

/*
long double Fminl( long double x, long double y ){
return fminl( x, y );
}
*/

/*计算两个浮点参数的较小者 End*/



/*计算两个浮点值的正数差( max( 0, x - y ) ) Start*/
/*
PS：
返回 x 与 y 间的正差，即若 x>y 则返回 x-y ，否则（若 x≤y ）返回 +0 。

等价于 fmax(x-y, 0) ，除了 NaN 处理要求。
*/
/*
返回值：
若成功，则返回 x 与 y 间的正差。
若出现上溢所致的值域错误，则返回 +HUGE_VAL 、 +HUGE_VALF 或 +HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若任一参数为 NaN ，则返回 NaN
*/
/*
例子：
fdim(4, 1) = 3.000000, fdim(1, 4)=0.000000
fdim(4,-1) = 5.000000, fdim(1,-4)=5.000000
fdim(1e308, -1e308) = inf
*/

/*
float Fdimf( float x, float y ){
return fdimf( x, y );
}
*/

double Fdim( double x, double y ){
return fdim( x, y );
}

/*
long double Fdiml( long double x, long double y ){
return fdiml( x, y );
}
*/

/*计算两个浮点值的正数差( max( 0, x - y ) ) End*/



/*返回一个NaN(非数) Start*/
/*
PS：
宏 NAN 展开成求值为安静非数（ QNaN ）的 float 类型常量表达式。若实现不支持 QNaN ，则不定义此宏。

用于打印 NaN 的风格是实现定义的。

有许多不同的 NaN 值，区别于其载荷与其符号位。宏 NAN 所生成的 NaN 的载荷与符号位的内容是实现定义的。
*/

double NaN(){
return NAN;
}

/*返回一个NaN(非数) End*/



/*计算e的给定幂(e^x) Start*/
/*
PS：
计算“e”(欧拉数，2.7182818)的“x”次幂。

对于 IEEE 兼容的 double 类型，若 709.8 < arg 则保证上溢，而若 arg < -708.4 则保证下溢。
*/
/*
返回值：
若不出现错误，则返回 arg 的底 e 指数（earg）。
若出现上溢所致的值域错误，则返回 +HUGE_VAL 、 +HUGE_VALF 或 +HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 1
若参数为 -∞ ，则返回 +0
若参数为 +∞ ，则返回 +∞
若参数为 NaN ，则返回 NaN
*/
/*
例子：
exp(1) = 2.718282
exp(-0) = 1.000000
exp(-Inf) = 0.000000
exp(710) = inf
*/

/*
float Expf( float x ){
return expf( x );
}
*/

double Exp( double x ){
return exp( x );
}

/*
long double Expl( long double x ){
return expl( x );
}
*/

/*计算e的给定幂(e^x) End*/



/*计算2的给定幂(2^x) Start*/
/*
返回值：
若不出现错误，则返回 n 的底 2 指数（ 2^n ）。
若出现上溢所致的值域错误，则返回 +HUGE_VAL 、 +HUGE_VALF 或 +HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 1
若参数为 -∞ ，则返回 +0
若参数为 +∞ ，则返回 +∞
若参数为 NaN ，则返回 NaN
*/
/*
例子：
exp2(5) = 32.000000
exp2(0.5) = 1.414214
exp2(-4) = 0.062500
exp2(-0.9) = 0.535887
exp2(-Inf) = 0.000000
exp2(1024) = Inf
*/

/*
float Exp2f( float x ){
return exp2f( x );
}
*/

double Exp2( double x ){
return exp2( x );
}

/*
long double Exp2l( long double x ){
return exp2l( x );
}
*/

/*计算2的给定幂(2^x) End*/



/*计算e的给定幂减1( (e^x) - 1 ) Start*/
/*
PS：
计算“e”(欧拉数，2.7182818)的给定 x 次幂减 1.0。若 arg 接近零，则此函数比表达式 exp(arg)-1.0 更精确。

函数 expm1 和 log1p 对于金融计算有用：例如在计算小的日利率时： (1+x)^n - 1 能表示为 expm1(n * log1p(x)) 。
这些函数亦简化书写精确的反双曲函数。

对于 IEEE 兼容的 double 类型，若 709.8 < arg 则保证上溢。
*/
/*
返回值：
若不出现错误则返回 e^arg - 1 。
若出现上溢所致的值域错误，则返回 +HUGE_VAL 、 +HUGE_VALF 或 +HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回不修改的参数
若参数为 -∞ ，则返回 -1
若参数为 +∞ ，则返回 +∞
若参数为 NaN ，则返回 NaN
*/
/*
例子：
expm1(1) = 1.718282
exp(1e-16)-1 = 0, but expm1(1e-16) = 1e-16
expm1(-0) = -0.000000
expm1(-Inf) = -1.000000
expm1(710) = inf
*/

/*
float Expm1f( float x ){
return expm1f( x );
}
*/

double Expm1( double x ){
return expm1( x );
}

/*
long double Expm1l( long double x ){
return expm1l( x );
}
*/

/*计算e的给定幂减1( (e^x) - 1 ) End*/



/*计算自然对数(底数为e，欧拉数，2.7182818)，ln(x) Start*/
/*
返回值：
若不出现错误，则返回 arg 的自然（底 e ）对数（ ln(arg) 或 log e^(arg) ）。
若出现定义域错误，则返回实现定义值（支持的平台上为 NaN ）。
若出现极点错误，则返回 -HUGE_VAL 、 -HUGE_VALF 或 -HUGE_VALL 。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 arg 小于零则出现定义域错误。
若 arg 为零则可能出现极点错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 -∞ 并引发 FE_DIVBYZERO 。
若参数为 1 ，则返回 +0 。
若参数为负数，则返回 NaN 并引发 FE_INVALID 。
若参数为 +∞ ，则返回 +∞ 。
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
log(1) = 0.000000
log(+Inf) = inf
log(0) = -inf
*/

/*
float Logf( float x ){
return logf( x );
}
*/

double Log( double x ){
return log( x );
}

/*
long double Logl( long double x ){
return logl( x );
}
*/

/*计算自然对数(底数为e，欧拉数，2.7182818)，ln(x) End*/



/*计算常用对数(底数为10)，log 10^(x) Start*/
/*
PS：
计算 arg 的常用（底 10 ）对数。
*/
/*
返回值：
若不出现错误，则返回 arg 的常用（底 10 ）对数（ log 10^(arg) 或 lg(arg) ）。
若出现定义域错误，则返回实现定义值（支持的平台上为 NaN ）。
若出现极点错误，则返回 -HUGE_VAL 、 -HUGE_VALF 或 -HUGE_VALL 。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 arg 小于零则出现定义域错误。
若 arg 为零则可能出现极点错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 -∞ 并引发 FE_DIVBYZERO 。
若参数为 1 ，则返回 +0 。
若参数为负数，则返回 NaN 并引发 FE_INVALID 。
若参数为 +∞ ，则返回 +∞ 。
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
log10(1000) = 3.000000
log10(0.001) = -3.000000
log10(1) = 0.000000
log10(+Inf) = inf
log10(0) = -inf
*/

/*
float Log10f( float x ){
return log10f( x );
}
*/

double Log10( double x ){
return log10( x );
}

/*
long double Log10l( long double x ){
return log10l( x );
}
*/

/*计算常用对数(底数为10)，log 10^(x) End*/



/*计算底数为2的对数( log 2^(x) ) Start*/
/*
PS：
计算 arg 的底 2 对数。

对于整数 arg ，二进制对数能转译成输入中最高位 1 的零底下标。
*/
/*
返回值：
若不出现错误，则返回 arg 的底 2 对数（ log 2^(arg) 或 lb(arg) ）。
若出现定义域错误，则返回实现定义值（支持的平台上为 NaN ）。
若出现极点错误，则返回 -HUGE_VAL 、 -HUGE_VALF 或 -HUGE_VALL 。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 arg 小于零则出现定义域错误。
若 arg 为零则可能出现极点错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 -∞ 并引发 FE_DIVBYZERO 。
若参数为 1 ，则返回 +0 。
若参数为负数，则返回 NaN 并引发 FE_INVALID 。
若参数为 +∞ ，则返回 +∞ 。
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
log2(65536) = 16.000000
log2(0.125) = -3.000000
log2(1) = 0.000000
log2(+Inf) = inf
log2(0) = -inf
*/

/*
float Log2f( float x ){
return log2f( x );
}
*/

double Log2( double x ){
return log2( x );
}

/*
long double Log2l( long double x ){
return log2l( x );
}
*/

/*计算底数为2的对数( log 2^(x) ) End*/



/*计算给定数加1的自然对数(底数为e)，( ln(1+x) ) Start*/
/*
PS：
计算 1+arg 的自然（底 e ）对数。若 arg 接近零，则此函数比表达式 log(1+arg) 更精确。

函数 expm1 和 log1p 对于金融计算有用：例如在计算小的日利率时： (1+x)^n - 1 能表示为 expm1(n * log1p(x)) 。
这些函数亦简化书写精确的反双曲函数。
*/
/*
返回值：
若不出现错误则返回 ln(1+arg) 。
若出现定义域错误，则返回实现定义值（受支持平台上为 NaN ）。
若出现极点错误，则返回 -HUGE_VAL 、 -HUGE_VALF 或 -HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 arg 小于 -1 则出现定义域错误。
若 arg 为 -1 则可能出现极点错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回不修改的参数。
若参数为 -1 ，则返回 -∞ 并引发 FE_DIVBYZERO 。
若参数小于 -1 ，则返回 NaN 并引发 FE_INVALID 。
若参数为 +∞ ，则返回 +∞ 。
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
log1p(0) = 0.000000
log(1+1e-16) = 0, but log1p(1e-16) = 1e-16
log1p(-0) = -0.000000
log1p(+Inf) = Inf
log1p(-1) = -Inf
*/

/*
float Log1pf( float x ){
return log1pf( x );
}
*/

double Log1p( double x ){
return log1p( x );
}

/*
long double Log1pl( long double x ){
return log1pl( x );
}
*/

/*计算给定数加1的自然对数(底数为e)，( ln(1+x) ) End*/



/*计算 log x^y 的值(支持如：log (-3)^(-27)) Start*/

/*
float LogXYf( float x, float y ){

// 判断 X 是否为负数，
auto isMinus4X = signbit( x );
// 判断 Y 是否为负数，Y是负数，通常是因为 X 为负数
auto isMinus4Y = signbit( y );

auto x1 = abs( x );
auto y1 = abs( y );

if( x1 == 0 || ( !isMinus4X && isMinus4Y ) ){
return NAN;
}

return log2f( y1 ) / log2f( x1 );
}
*/

double LogXY( double x, double y ){

// 判断 X 是否为负数，
auto isMinus4X = signbit( x );
// 判断 Y 是否为负数，Y是负数，通常是因为 X 为负数
auto isMinus4Y = signbit( y );

auto x1 = abs( x );
auto y1 = abs( y );

if( x1 == 0 || ( !isMinus4X && isMinus4Y ) ){
return NAN;
}

return log2( y1 ) / log2( x1 );
}

/*
long double LogXYl( long double x, long double y ){

// 判断 X 是否为负数，
auto isMinus4X = signbit( x );
// 判断 Y 是否为负数，Y是负数，通常是因为 X 为负数
auto isMinus4Y = signbit( y );

auto x1 = abs( x );
auto y1 = abs( y );

if( x1 == 0 || ( !isMinus4X && isMinus4Y ) ){
return NAN;
}

return log2l( y1 ) / log2l( x1 );
}
*/

/*计算 log x^y 的值(支持如：log (-3)^(-27)) End*/



/*计算一个数的给定次幂( x^y ) Start*/
/*
PS：
尽管 pow 不能获得负数的开方根，也为 exponent 为 1/3 的常用情况提供了 cbrt 。
*/
/*
返回值：
若不出现错误，则返回 base 的 exponent 次幂（ baseexponent ）。
若出现定义域错误，则返回实现定义值（支持的平台上为 NaN ）。
若出现极点错误或上溢所致的值域错误，则返回 ±HUGE_VAL 、 ±HUGE_VALF 或 ±HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 base 有限且为负，且 exponent 有限且为非整数，则出现定义域错误，并可能出现值域错误。
若 base 为零且 exponent 为零，则可能出现定义域错误。
若 base 为零且 exponent 为负，则可能出现定义域错误或极点错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
pow(+0, exponent) ，其中 exponent 为负奇数，返回 +∞ 并引发 FE_DIVBYZERO
pow(-0, exponent) ，其中 exponent 为负奇数，返回 -∞ 并引发 FE_DIVBYZERO
pow(±0, exponent) ，其中 exponent 为有限负数，且为偶数或非整数，则返回 +∞ 并引发 FE_DIVBYZERO
pow(±0, -∞) 返回 +∞ 并可能引发 FE_DIVBYZERO (C2x 前)
pow(+0, exponent) ，其中 exponent 为正奇数，返回 +0
pow(-0, exponent) ，其中 exponent 为正奇数，返回 -0
pow(±0, exponent) ，其中 exponent 为正非整数或正偶数，返回 +0
pow(-1, ±∞) returns 1
pow(+1, exponent) 对于任何 exponent 返回 1 ，即使 exponent 为 NaN
pow(base, ±0) 对于任何 base 返回 1 ，即使 base 为 NaN
pow(base, exponent) 返回 NaN 并引发 FE_INVALID ，若 base 为有限负数且 exponent 为有限非整数。
pow(base, -∞) 对任何 |base|<1 返回 +∞
pow(base, -∞) 对任何 |base|>1 返回 +0
pow(base, +∞) 对任何 |base|<1 返回 +0
pow(base, +∞) 对任何 |base|>1 返回 +∞
pow(-∞, exponent) 返回 -0 ，若 exponent 为负奇整数
pow(-∞, exponent) 返回 +0 ，若 exponent 为负非整数或负偶数
pow(-∞, exponent) 返回 -∞ ，若 exponent 为正奇整数
pow(-∞, exponent) 返回 +∞ ，若 exponent 为正非整数或正偶数
pow(+∞, exponent) 对任何 exponent 返回 +0
pow(+∞, exponent) 对任何 exponent 返回 +∞
除了指定于上处，若任何参数为 NaN ，则返回 NaN
*/
/*
例子：
pow(2, 10) = 1024.000000
pow(2, 0.5) = 1.414214
pow(-2, -3) = -0.125000
pow(-1, NAN) = nan
pow(+1, NAN) = 1.000000
pow(INFINITY, 2) = inf
pow(INFINITY, -1) = 0.000000
pow(-1, 1/3) = -nan
pow(-0, -3) = -inf
*/

/*
float Powf( float x, float y ){
return powf( x, y );
}
*/

double Pow( double x, double y ){
return pow( x, y );
}

/*
long double Powl( long double x, long double y ){
return powl( x, y );
}
*/

/*计算一个数的给定次幂( x^y ) End*/



/*计算给定数的平方根(√x) Start*/
/*
PS：
IEEE 标准要求 sqrt 为准确。其他要求为准确的运算只有算术运算符和函数 fma 。舍入到返回类型后（用默认舍入模式）， sqrt 的结果与无限精度结果不可辨别。
换言之，误差小于 0.5 ulp 。其他函数，包含 pow ，不受如此的制约。
*/
/*
返回值：
若不出现错误，则返回 arg 的平方根（ √arg ）。
若出现定义域错误，则返回实现定义值（支持的平台上为 NaN ）。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 arg 小于零则出现定义域错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数小于 -0 ，则引发 FE_INVALID 并返回 NaN 。
若参数为 +∞ 或 ±0 ，则返回不修改的参数。
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
sqrt(100) = 10.000000
sqrt(2) = 1.414214
sqrt(-0) = -0.000000
sqrt(-1.0) = -nan
*/

/*
float Sqrtf( float x ){
return sqrtf( x );
}
*/

double Sqrt( double x ){
return sqrt( x );
}

/*
long double Sqrtl( long double x ){
return sqrtl( x );
}
*/

/*计算给定数的平方根(√x) End*/



/*计算给定数的立方根(3√x) Start*/
/*
PS：
cbrt(arg) 不等价于 pow(arg, 1.0/3) ，因为 pow 不能求负底数的小数次幂。
*/
/*
返回值：
若不出现错误，则返回 arg 的立方根（ 3√arg ）。
若出现下溢所致的错误，则返回（舍入后的）正确结果。
*/
/*
错误处理:
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 或 ±∞ ，则返回不更改的参数
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
cbrt(729) = 9.000000
cbrt(-0.125) = -0.500000
cbrt(-0) = -0.000000
cbrt(+inf) = inf
*/

/*
float Cbrtf( float x ){
return cbrtf( x );
}
*/

double Cbrt( double x ){
return cbrt( x );
}

/*
long double Cbrtl( long double x ){
return cbrtl( x );
}
*/

/*计算给定数的立方根(3√x) End*/



/*计算两个给定数平方和的平方根( √(x^2+y^2) )、计算三个给定数平方和的平方根( √(x^2+y^2+z^2) ) Start*/
/*
PS：
计算 x 与 y 平方和的平方根，而不会在计算的中间阶段有过度的上溢或下溢。

计算 x 、 y 和 z 平方和的平方根，而不会在计算的中间阶段有过度的上溢或下溢。

此函数计算的值是直角边长度为 x 和 y 的直角三角形的斜边长，或点 (x,y) 距原点 (0,0) 的距离，或复数 x+iy 的绝对值。

此函数的三参数版本所计算的值是点 (x,y,z) 到原点 (0,0,0) 的距离。

实现通常保证小于 1 ulp （最后位置单位）的精度： GNU 、 BSD 、 Open64 。

hypot(x, y) 等价于 cabs(x + I*y) 。

POSIX 指定仅若二个参数均为非正规且正确结果亦为非正规才可以出现下溢（这禁止朴素实现）。

hypot(INFINITY, NAN) 返回 +∞ ，但 sqrt(INFINITY*INFINITY+NAN*NAN) 返回 NaN 。
*/
/*
返回值：
若不出现错误，则返回直角三角形的斜边， √(x^2+y^2)。
若不出现错误，则返回三维空间中到原点的距离， √(x^2+y^2+z^2)。
若出现上溢所致的值域错误，则返回 +HUGE_VAL 、 +HUGE_VALF 或 +HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
hypot(x, y) 、 hypot(y, x) 及 hypot(x, -y) 等价
若参数之一为 ±0 ，则 hypot 等价于以非零参数调用 fabs
若参数之一为 ±∞ ，则 hypot 返回 +∞ ，即使另一参数为 NaN
否则，若任何参数为 NaN ，则返回 NaN
*/

/*
float Hypotf2( float x, float y ){
return hypotf( x, y );
}
*/

double Hypot2( double x, double y ){
return hypot( x, y );
}

/*
long double Hypotl2( long double x, long double y ){
return hypotl( x, y );
}
*/

/*
float Hypotf3( float x, float y, float z ){
return hypotf( x, y, z );
}
*/

double Hypot3( double x, double y, double z ){
return hypot( sqrt( pow( x, 2 ) + pow( y, 2 ) ), z );
}

/*
long double Hypotl3( long double x, long double y, long double z ){
return hypotl( x, y, z );
}
*/

/*计算两个给定数平方和的平方根( √(x^2+y^2) )、计算三个给定数平方和的平方根( √(x^2+y^2+z^2) ) End*/



/*计算正弦(sin(x)) Start*/
/*
PS：
参数为无穷大的情况不被指定为（ C++ 所委派的） C 中的定义域错误，但被指定为 POSIX 中的定义域错误。

POSIX 亦指定在溢出的情况下，返回不修改的 arg ，而且若不支持如此，则返回实现定义的不大于 DBL_MIN 、 FLT_MIN 及 LDBL_MIN 的值。
*/
/*
返回值：
若不发生错误，则返回 arg 的正弦（ sin(arg) ），于范围 [-1 ; +1] 中。
若 arg 的绝对值很大，结果可能拥有少量或无有效数字。(C++11 前)
若发生定义域错误，则返回实现定义的值（受支持的平台上为 NaN ）。
若发生下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数是 ±0 ，则返回不修改的参数
若参数是 ±∞ ，则返回 NaN 并引发 FE_INVALID
若参数是 NaN ，则返回 NaN
*/
/*
例子：
sin(pi/6) = 0.5
sin(pi/2) = 1
sin(-3*pi/4) = -0.707107
sin(+0) = 0
sin(-0) = -0
sin(INFINITY) = -nan
*/

/*
float Sinf( float x ){
return sinf( x );
}
*/

double Sin( double x ){
return sin( x );
}

/*
long double Sinl( long double x ){
return sinl( x );
}
*/

/*计算正弦(sin(x)) End*/



/*计算余弦(cos(x)) Start*/
/*
PS：
参数为无穷大的情况不被指定为 C 中的定义域错误，但被定义为 POSIX 中的定义域错误。
*/
/*
返回值：
若不出现错误，则返回 arg 的余弦（ cos(arg) ），在范围 [-1 , +1] 中。
若 arg 的绝对值很大，则结果可能拥有少量或无有效数字。(C++11 前)
若出现定义域错误，则返回实现定义值（受支持平台上为 NaN ）。
若出现下溢所致的值域错误，则返回（舍入后的）正确的结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若实现支持 IEEE 浮点算术（ IEC 60559 ），
则若参数为 ±0 ，则结果为 1.0
若参数为 ±∞ ，则返回 NaN 并引发 FE_INVALID
若参数为 NaN ，则返回 NaN
*/
/*
例子：
cos(pi/3) = 0.5
cos(pi/2) = 6.12323e-17
cos(-3*pi/4) = -0.707107
cos(+0) = 1
cos(-0) = 1
cos(INFINITY) = -nan
*/

/*
float Cosf( float x ){
return cosf( x );
}
*/

double Cos( double x ){
return cos( x );
}

/*
long double Cosl( long double x ){
return cosl( x );
}
*/

/*计算余弦(cos(x)) End*/



/*计算正切(tan(x)) Start*/
/*
PS：
（C++ 委派到的） C 中参数为无限大的情况未被指定为定义域错误，但它被定义为 POSIX 中的定义域错误。

函数在 π(1/2 + n) 有数学上的极点；然而无常用浮点表示能准确表示 π/2 ，故而没有值使得极点错误出现。
*/
/*
返回值：
若不出现错误，则返回 arg 的正切（ tan(arg) ）。
若 arg 的绝对值很大，则结果可能有较少或无有效数字。(C++11 前)
若出现定义域错误，则返回实现定义值（受支持平台为 NaN ）。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算数（ IEC 60559 ），则
若参数为 ±0 ，则返回不修改的参数
若参数为 ±∞ ，则返回 NaN 并引发 FE_INVALID
若参数为 NaN ，则返回 NaN
*/
/*
例子：
tan  (pi/4) = 1
tan(3*pi/4) = -1
tan(5*pi/4) = 1
tan(7*pi/4) = -1
tan(+0) = 0
tan(-0) = -0
tan(INFINITY) = -nan
*/

/*
float Tanf( float x ){
return tanf( x );
}
*/

double Tan( double x ){
return tan( x );
}

/*
long double Tanl( long double x ){
return tanl( x );
}
*/

/*计算正切(tan(x)) End*/



/*计算反正弦 asin( x ) Start*/
/*
返回值：
若不出现错误，则返回 arg 在范围 [ -2π, +2π ] 中的弧（反）正弦（ arcsin(arg) ）。
若出现定义域错误，则返回实现定义值（受支持平台上为 NaN ）。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 arg 在范围 [-1.0; 1.0] 外则出现定义域错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回不修改的参数。
若 |arg| > 1 ，则出现定义域错误并返回 NaN 。
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
asin(1.0) = 1.5708
2*asin(1.0) = 3.14159
asin(-0.5) = -0.523599
6*asin(-0.5) = -3.14159
asin(0.0) = 0 asin(-0.0)=-0
asin(1.1) = nan
*/

/*
float Asinf( float x ){
return asinf( x );
}
*/

double Asin( double x ){
return asin( x );
}

/*
long double Asinl( long double x ){
return asinl( x );
}
*/

/*计算反正弦 asin( x ) End*/



/*计算反余弦 acos( x ) Start*/
/*
返回值：
若不出现错误，则返回 arg 于范围 [0 ; π] 中的弧（反）余弦（ arccos(arg) ）。
若出现定义域错误，则返回实现定义值（受支持平台上为 NaN ）。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 arg 在范围 [-1.0; 1.0] 外则出现定义域错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 +1 ，则返回值 +0 。
若 |arg| > 1 ，则返回定义域错误并返回 NaN 。
若参数为 NaN ，则返回 NaN 。rror occurs and NaN is returned.
if the argument is NaN, NaN is returned
*/
/*
例子：
acos(-1) = 3.14159
acos(0.0) = 1.5708 2*acos(0.0) = 3.14159
acos(0.5) = 1.0472 3*acos(0.5) = 3.14159
acos(1) = 0
acos(1.1) = nan
*/

/*
float Acosf( float x ){
return acosf( x );
}
*/

double Acos( double x ){
return acos( x );
}

/*
long double Acosl( long double x ){
return acosl( x );
}
*/

/*计算反余弦 acos( x ) End*/



/*计算反正切 atan( x ) Start*/
/*
PS：
POSIX 指定在下溢情况下，返回不修改的 arg ，而若不支持如此，则返回不大于 DBL_MIN 、 FLT_MIN 和 LDBL_MIN 的实现定义值。
*/
/*
返回值：
若不出现错误，则返回 arg 在 [ -2π, +2π ] 弧度范围中的弧（反）正切（ arctan(arg) ）。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回不修改的参数
若参数为 +∞ ，则返回 +π/2
若参数为 -∞ ，则返回 -π/2
若参数为 NaN ，则返回 NaN
*/
/*
例子：
atan(1) = 0.785398 4*atan(1) = 3.14159
atan(Inf) = 1.5708 2*atan(Inf) = 3.14159
atan(-0.0) = -0
atan(+0.0) = 0
*/

/*
float Atanf( float x ){
return atanf( x );
}
*/

double Atan( double x ){
return atan( x );
}

/*
long double Atanl( long double x ){
return atanl( x );
}
*/

/*计算反正切 atan( x ) End*/



/*反正切，用符号确定象限 atan2( x, y ) Start*/
/*
PS：
计算 y/x 的弧（反）正切，以参数符号确定正确的象限。

std::atan2(y, x) 等价于 std::arg(std::complex<double>(x,y)) 。

POSIX 指定在下溢情况下，返回不修改的 arg ，而若不支持如此，则返回不大于 DBL_MIN 、 FLT_MIN 和 LDBL_MIN 的实现定义值。
*/
/*
返回值：
若不出现错误，则返回 y/x 在 [-π ; +π] 弧度范围中的弧（反）正切
若出现定义域错误，则返回实现定义值。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 x 与 y 均为零则可能出现定义域错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若 x 与 y 均为零，则定义域错误不出现
若 x 与 y 均为零，则也不出现值域错误
若 y 为零，则不出现极点错误
若 y 为 ±0 且 x 为负或 -0 ，则返回 ±π
若 y 为 ±0 且 x 为正或 +0 ，则返回 ±0
若 y 为 ±∞ 且 x 有限，则返回 ±π/2
若 y 为 ±∞ 且 x 为 -∞ ，则返回 ±3π/4
若 y 为 ±∞ 且 x 为 +∞ ，则返回 ±π/4
若 x 为 ±0 且 y 为负，则返回 -π/2
若 x 为 ±0 且 y 为正，则返回 +π/2
若 x 为 -∞ 且 y 为正有限，则返回 +π
若 x 为 -∞ 且 y 为负有限，则返回 -π
若 x 为 +∞ 且 y 为正有限，则返回 +0
若 x 为 +∞ 且 y 为负有限，则返回 -0
若 x 为 NaN 或 y 为 NaN ，则返回 NaN
*/
/*
例子：
(+1,+1) cartesian is (1.41421,0.785398) polar
(+1,-1) cartesian is (1.41421,2.35619) polar
(-1,-1) cartesian is (1.41421,-2.35619) polar
(-1,+1) cartesian is (1.41421,-0.785398) polar
atan2(0, 0) = 0 atan2(0,-0) = 3.14159
atan2(7, 0) = 1.5708 atan2(7,-0) = 1.5708
*/

/*
float Atan2f( float x, float y ){
return atan2f( x, y );
}
*/

double Atan2( double x, double y ){
return atan2( x, y );
}

/*
long double Atan2l( long double x, long double y ){
return atan2l( x, y );
}
*/

/*反正切，用符号确定象限 atan2( x, y ) End*/



/*计算双曲正弦 sinh( x ) Start*/
/*
PS：
POSIX 指定在下溢情况下，返回不修改的 arg ，而若不支持如此，则返回不大于 DBL_MIN 、 FLT_MIN 和 LDBL_MIN 的实现定义值。
*/
/*
返回值：
1、若不出现错误，则返回 arg 的双曲正弦（ sinh( arg ) )。
2、若出现上溢所致的值域错误，则返回 ±HUGE_VAL 、 ±HUGE_VALF 或 ±HUGE_VALL 。
3、若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 或 ±∞ ，则返回不修改的参数
若参数为 NaN ，则返回 NaN
*/
/*
例子：
sinh(1) = 1.1752
sinh(-1) = -1.1752
log(sinh(1)+cosh(1)) = 1
sinh(+0) = 0
sinh(-0) = -0
*/

/*
float Sinhf( float x ){
return sinhf( x );
}
*/

double Sinh( double x ){
return sinh( x );
}

/*
long double Sinhl( long double x ){
return sinhl( x );
}
*/

/*计算双曲正弦 sinh( x ) End*/



/*计算双曲余弦 cosh( x ) Start*/
/*
PS：
对于 IEEE 兼容的 double 类型，若 |arg| > 710.5 ，则 cosh(arg) 上溢。
*/
/*
返回值：
若出现上溢所致的值域错误，则返回 +HUGE_VAL 、 +HUGE_VALF 或 +HUGE_VALL 。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 1
若参数为 ±∞ ，则返回 +∞
若参数为 NaN ，则返回 NaN
*/
/*
例子：
cosh(1) = 1.5430806348152437
*/

/*
float Coshf( float x ){
return coshf( x );
}
*/

double Cosh( double x ){
return cosh( x );
}

/*
long double Coshl( long double x ){
return coshl( x );
}
*/

/*计算双曲余弦 cosh( x ) End*/



/*计算双曲正切 tanh( x ) Start*/
/*
PS：
POSIX 指定在下溢的情况中，返回不修改的 arg ，而且若不支持这么做，则返回不大于 DBL_MIN 、 FLT_MIN 和 LDBL_MIN 的实现定义值。
*/
/*
返回值：
若发生下溢所致的错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回 ±0
若参数为 ±∞ ，则返回 ±1
若参数为 NaN ，则返回 NaN
*/
/*
例子：
tanh(1) = 0.761594
tanh(-1) = -0.761594
tanh(0.1)*sinh(0.2)-cosh(0.2) = -1
tanh(+0) = 0
tanh(-0) = -0
*/

/*
float Tanhf( float x ){
return tanhf( x );
}
*/

double Tanh( double x ){
return tanh( x );
}

/*
long double Tanhl( long double x ){
return tanhl( x );
}
*/

/*计算双曲正切 tanh( x ) End*/



/*计算反双曲正弦 asinh( x ) Start*/
/*
PS：
尽管（ C++ 对此函数引用的） C 标准命名此函数为“弧双曲正弦”，双曲函数的反函数仍是面积函数。其参数为双曲扇形的面积，而非弧长。
正确的名称是“反双曲正弦”（ POSIX 所用）或“面积双曲正弦”。
*/
/*
返回值：
若不发生错误，则返回 arg 的反双曲正弦（ sinh^-1 (arg) 或 arsinh(arg) ）。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 或 ±∞ ，则返回不修改的参数
若参数为 NaN ，则返回 NaN
*/
/*
例子：
asinh(1) = 0.881374
asinh(-1) = -0.881374
asinh(+0) = 0
asinh(-0) = -0
*/

/*
float Asinhf( float x ){
return asinhf( x );
}
*/

double Asinh( double x ){
return asinh( x );
}

/*
long double Asinhl( long double x ){
return asinhl( x );
}
*/

/*计算反双曲正弦 asinh( x ) End*/



/*计算反双曲余弦 acosh( x ) Start*/
/*
PS：
尽管（ C++ 对此函数引用的） C 标准命名此函数为“弧双曲余弦”，双曲函数的反函数仍是面积函数。其参数是双曲扇形的面积，而非弧长。
正确的名称是“反双曲余弦”（ POSIX 所用）或“面积双曲余弦”。
*/
/*
返回值：
若不出现错误，则返回 arg 在区间 [0, +∞] 上的反双曲余弦（ cosh^-1 (arg) 或 arcosh(arg) ）。
若出现定义域错误，则返回实现定义值（受支持平台上为 NaN ）。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若参数小于 1 ，则出现定义域错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数小于 1 ，则引发 FE_INVALID 并返回 NaN
若参数为 1 ，则返回 +0
若参数为 +∞ ，则返回 +∞
若参数为 NaN ，则返回 NaN
*/
/*
例子：
acosh(1) = 0
acosh(10) = 2.99322
acosh(DBL_MAX) = 710.476
acosh(Inf) = inf
acosh(0.5) = -nan
    errno == EDOM: Numerical argument out of domain
    FE_INVALID raised
*/

/*
float Acoshf( float x ){
return acoshf( x );
}
*/

double Acosh( double x ){
return acosh( x );
}

/*
long double Acoshl( long double x ){
return acoshl( x );
}
*/

/*计算反双曲余弦 acosh( x ) End*/



/*计算反双曲正切 atanh( x ) Start*/
/*
PS：
1、尽管（ C++ 对此函数引用的） C 标准命名此函数为“弧双曲正切”，双曲函数的反函数是面积函数。其参数为双曲扇形的面积，而非弧。
正确的名称为“反双曲正切”（ POSIX 所用）或“面积双曲正切”。
2、POSIX 指定在下溢的情况下，返回不修改的 arg ，而且若不支持，则返回不大于 DBL_MIN 、 FLT_MIN 和 LDBL_MIN 的值。
*/
/*
返回值：
若不出现错误，则返回 arg 的反双曲正切（ tanh-1
(arg) 或 artanh(arg) ）。

若出现定义域错误，则返回实现定义值（若支持则为 NaN ）。

若出现极点错误，则返回 ±HUGE_VAL 、 ±HUGE_VALF 或 ±HUGE_VALL （带正确符号）。

若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若参数不在区间 [-1, +1] 中，则出现值域错误。
若参数为 ±1 ，则出现极点错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
若参数为 ±0 ，则返回不修改的参数。
若参数为 ±1 ，则返回 ±∞ 并引发 FE_DIVBYZERO 。
若 |arg|>1 ，则返回 NaN 并引发 FE_INVALID 。
若参数为 NaN ，则返回 NaN 。
*/
/*
例子：
atanh(0) = 0
atanh(-0) = -0
atanh(0.9) = 1.47222
atanh(-1) = -inf
    errno == ERANGE: Numerical result out of range
    FE_DIVBYZERO raised
*/

/*
float Atanhf( float x ){
return atanhf( x );
}
*/

double Atanh( double x ){
return atanh( x );
}

/*
long double Atanhl( long double x ){
return atanhl( x );
}
*/

/*计算反双曲正切 atanh( x ) End*/



/*返回大于或等于一个给定数字的最小整数 ceil( x ) Start*/
/*
PS：
1、舍入非整数有限值时，可以（但不要求）引发 FE_INEXACT 。
2、所有标准浮点格式中的最大可表示浮点值都是准确的整数，故此函数自身决不上溢；然而存储于整数对象时，结果可以溢出任何整数类型（包括 std::intmax_t ）。
3、（ double 参数的）此函数表现如同（除了不引发 FE_INEXACT 的自由）以下列代码实现
*/
/*
返回值：
若不出现错误，则返回不小于 arg 的最小整数值。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
当前舍入模式无效。
若 arg 为 ±∞ ，则返回不修改的参数
若 arg 为 ±0 ，则返回不修改的参数
若 arg 为 NaN ，则返回 NaN
*/
/*
例子：
ceil(+2.4) = 3.000000
ceil(-2.4) = -2.000000
ceil(-0.0) = -0.000000
ceil(-Inf) = -INF
*/

/*
float Ceilf( float x ){
return ceilf( x );
}
*/

double Ceil( double x ){
return ceil( x );
}

/*
long double Ceill( long double x ){
return ceill( x );
}
*/

/*返回大于或等于一个给定数字的最小整数 ceil( x ) End*/



/*返回小于或等于一个给定数字的最大整数 floor( x ) Start*/
/*
PS：
1、在舍入非整数有限值时可以（但不要求）引发 FE_INEXACT 。
2、所有标准浮点格式中，最大可表示浮点值准确地为整数，故此函数自身决不上溢；然而存储于整数对象时，结果可能溢出任何整数类型（包含 std::intmax_t ）。
*/
/*
返回值：
若不出现错误，则返回不大于 arg 的最大整数值
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
当前舍入方式无效。
若 arg 为 ±∞ ，则返回不修改的参数
若 arg 为 ±0 ，则返回不修改的参数
若 arg 为 NaN ，则返回 NaN
*/
/*
例子：
floor(+2.7) = 2.000000
floor(-2.7) = -3.000000
floor(-0.0) = -0.000000
floor(-Inf) = -inf
*/

/*
float Floorf( float x ){
return floorf( x );
}
*/

double Floor( double x ){
return floor( x );
}

/*
long double Floorl( long double x ){
return floorl( x );
}
*/

/*返回小于或等于一个给定数字的最大整数 floor( x ) End*/



/*将数字的小数部分去掉，只保留整数部分 trunc( x ) Start*/
/*
PS：
1、截断非整数有限值时可以（但不要求）引发 FE_INEXACT 。
2、所有标准浮点格式中，最大可表示浮点值均为准确的整数，故此函数自身决不上溢；然而存储结果于整数对象时，结果可以溢出任何整数类型（包含 std::intmax_t ）。
3、从浮点到整数类型的隐式转换始终向零舍入，但它被限制于能表示成目标类型的值。
*/
/*
返回值：
若不发生错误，则返回绝对值不大于 arg 的最接近整数值（换言之，将 arg 向零舍入）。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
当前舍入模式无效。
若 arg 为 ±∞ ，则返回不修改的参数。
若 arg 为 ±0 ，则返回不修改的参数。
若 arg 为 NaN ，则返回 NaN
*/
/*
例子：
trunc(+2.7) = 2.000000
trunc(-2.9) = -2.000000
trunc(-0.0) = -0.000000
trunc(-Inf) = -inf
*/

/*
float Truncf( float x ){
return truncf( x );
}
*/

double Trunc( double x ){
return trunc( x );
}

/*
long double Truncl( long double x ){
return truncl( x );
}
*/

/*将数字的小数部分去掉，只保留整数部分 trunc( x ) End*/



/*返回一个数字四舍五入后最接近的整数 round( x ) Start*/
/*
PS：
MDN：
1、如果参数的小数部分大于0.5，则参数将四舍五入为具有下一个更高绝对值的整数。
2、如果小于0.5，则参数四舍五入为绝对值较低的整数。
3、如果小数部分正好是0.5，则参数将按＋∞方向舍入到下一个整数。
4、请注意，这与许多语言的round（）函数不同，后者通常将此情况舍入到远离零的下一个整数，而在小数部分正好为0.5的负数情况下则给出不同的结果。

C++：
1、计算 arg 的最接近整数值（以浮点格式），中点情况舍入为远离零，无关乎当前舍入模式。
2、计算 arg 的最接近整数值（以整数格式），中点情况舍入为远离零，无关乎当前舍入模式。
3、接受任何整数类型参数的重载集或函数模板。分别等价于 2) 、 6) 或 10) （将参数转型为 double ）。
4、舍入非整数有限值时 std::round 可以（但不要求）引发 FE_INEXACT 。
5、所有标准浮点格式中，最大可表示浮点值均为准确的整数，故 std::round 自身决不上溢；然而在存储于整数对象时，结果可能溢出任何整数类型（包含 std::intmax_t ）。
6、POSIX 指定 std::lround 或 std::llround 引发 FE_INEXACT 的所有情况都是定义域错误。
*/
/*
返回值：
若不出现错误，则返回 arg 的最接近整数值，中点情况为远离零者。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 std::lround 或 std::llround 的结果在返回类型的可表示范围外，则可能出现定义域错误或值域错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
对于 std::round 函数：
当前舍入模式无效。
若 arg 为 ±∞ ，则返回不修改的参数。
若 arg 为 ±0 ，则返回不修改的参数。
若 arg 为 NaN ，则返回 NaN 。
对于 std::lround 和 std::llround 函数：决不引发 FE_INEXACT 。
当前舍入模式无效。
若 arg 为 ±∞ ，则引发 FE_INVALID 并返回实现定义值。
若舍入结果在返回类型范围外，则引发 FE_INVALID 并返回实现定义值。
若 arg 为 NaN ，则引发 FE_INVALID 并返回实现定义值。
*/
/*
例子：
round( 20.49 ) = 20
round( 20.5 ) = 21
round( -20.5 ) = -20
round( -20.51 ) = -21
*/

/*
float Roundf( float x ){
return roundf( x );
}
*/

double Round( double x ){
return round( x );
}

/*
long double Roundl( long double x ){
return roundl( x );
}
*/

/*返回一个数字四舍五入后最接近的整数 round( x ) End*/



/*以当前舍入模式，舍入浮点参数到浮点格式的整数值。 Start*/
/*
PS:
std::nearbyint 和 rint 之间仅有的区别是 std::nearbyint 决不引发 FE_INEXACT 。
所有标准浮点格式中，最大可表示浮点值都是整数，故 std::nearbyint 自身决不溢出；然而存储结果于整数对象时，结果可能溢出任何整数类型（包含 std::intmax_t ）。
若当前舍入模式为 FE_TONEAREST ，则此函数在“中点情况”向“偶数”舍入（同 rint ，但不同于 round ）。
*/
/*
返回值：
返回 arg 按照当前舍入模式的最接近整数值。
*/
/*
错误处理：
此函数不受制于任何指定于 math_errhandling 的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
决不引发 FE_INEXACT
若 arg 为 ±∞ ，则返回不修改的参数
若 arg 为 ±0 ，则返回不修改的参数
若 arg 为 NaN ，则返回 NaN
*/
/*
例子：
rounding to nearest:
nearbyint(+2.3) = 2  nearbyint(+2.5) = 2  nearbyint(+3.5) = 4
nearbyint(-2.3) = -2  nearbyint(-2.5) = -2  nearbyint(-3.5) = -4

rounding down:
nearbyint(+2.3) = 2  nearbyint(+2.5) = 2  nearbyint(+3.5) = 3
nearbyint(-2.3) = -3  nearbyint(-2.5) = -3  nearbyint(-3.5) = -4
nearbyint(-0.0) = -0
nearbyint(-Inf) = -inf
*/

/*
float Nearbyintf( float x ){
return nearbyintf( x );
}
*/

double Nearbyint( double x ){
return nearbyint( x );
}

/*
long double Nearbyintl( long double x ){
return nearbyintl( x );
}
*/

/*以当前舍入模式，舍入浮点参数到浮点格式的整数值。 End*/



/*使用当前舍入模式的最接近整数(若结果有别则有异常) Start*/
/*
PS:
POSIX 指定 std::lrint 或 std::llrint 引发 FE_INEXACT 的所有情况都是定义域错误。
如 math_errhandling 中指定， std::rint 在舍入非整数有限值时可以（但不在非 IEEE 浮点平台上要求）引发 FE_INEXACT 。
std::rint 和 std::nearbyint 间仅有的区别是 std::nearbyint 决不引发 FE_INEXACT 。
所有标准浮点格式中，最大可表示浮点值都是准确的整数，故 std::rint 自身决不上溢；然而在存储结果于整数对象时，结果可能溢出任何整数类型（包含 std::intmax_t ）。
若当前舍入模式为……
FE_DOWNWARD ，则 std::rint 等价于 std::floor 。
FE_UPWARD ，则 std::rint 等价于 std::ceil 。
FE_TOWARDZERO ，则 std::rint 等价于 std::trunc 。
FE_TONEAREST ，则 std::rint 在中点情况和 std::round 的区别是前者始终舍入到偶数，而非远离零。
*/
/*
返回值：
若不出现错误，则返回 arg 按照当前舍入模式的最接近整数值。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。
若 std::lrint 或 std::llrint 的结果在返回类型的可表示范围外，则可能出现定义域错误或值域错误。
若实现支持 IEEE 浮点算术（ IEC 60559 ），则
对于 std::rint 函数：
若 arg 为 ±∞ ，则返回不修改的参数
若 arg 为 ±0 ，则返回不修改的参数
若 arg 为 NaN ，则返回 NaN
对于 std::lrint 和 std::llrint 函数：若 arg 为 ±∞ ，则引发 FE_INVALID 并返回实现定义值
若舍入结果在返回类型范围外，则引发 FE_INVALID 并返回实现定义值
若 arg 为 NaN ，则引发 FE_INVALID 并返回实现定义值
*/
/*
例子：
rounding to nearest (halfway cases to even):
rint(+2.3) = 2  rint(+2.5) = 2  rint(+3.5) = 4
rint(-2.3) = -2  rint(-2.5) = -2  rint(-3.5) = -4
rounding down:
rint(+2.3) = 2  rint(+2.5) = 2  rint(+3.5) = 3
rint(-2.3) = -3  rint(-2.5) = -3  rint(-3.5) = -4
rounding down with lrint
lrint(+2.3) = 2  lrint(+2.5) = 2  lrint(+3.5) = 3
lrint(-2.3) = -3  lrint(-2.5) = -3  lrint(-3.5) = -4
lrint(-0.0) = 0
lrint(-Inf) = -9223372036854775808
std::rint(0.1) = 0
    FE_INEXACT was raised
std::lrint(LONG_MIN-2048.0) = -9223372036854775808
    FE_INVALID was raised
*/

/*
float Rintf( float x ){
return rintf( x );
}
*/

double Rint( double x ){
return rint( x );
}

/*
long double Rintl( long double x ){
return rintl( x );
}
*/

/*使用当前舍入模式的最接近整数(若结果有别则有异常) End*/



/*x乘以2的y次幂( X x 2^Y ) Start*/
/*
PS:
二进制系统上（其中 FLT_RADIX 为 2 ）， std::ldexp 等价于 std::scalbn 。
函数 std::ldexp （“加载指数”）与其对偶 std::frexp 能一同用于操纵浮点数的表示，而无需直接的位操作。
多数实现上， std::ldexp 效率低于用通常算术运算符乘或除以二的幂。
*/
/*
返回值：
若不出现错误，则返回 arg 乘 2 的 exp 次幂（ arg × 2^exp ）。
若出现上溢所致的值域错误，则返回 ±HUGE_VAL 、 ±HUGE_VALF 或 ±HUGE_VALL 。
若出现下溢所致的值域错误，则返回（舍入后的）正确结果。
*/
/*
错误处理：
报告 math_errhandling 中指定的错误。

若实现支持 IEEE 浮点算术（ IEC 60559 ），则
决不引发 FE_INEXACT ，除非出现值域错误（结果准确）
忽略当前舍入模式，除非出现值域错误
若 arg 为 ±0 ，则返回不修改的参数
若 arg 为 ±∞ ，则返回不修改的参数
若 exp 为 0 ，则返回不修改的 arg
若 arg 为 NaN ，则返回 NaN
*/
/*
例子：
ldexp(7, -4) = 0.4375
ldexp(1, -1074) = 4.94066e-324 (minimum positive subnormal double)
ldexp(nextafter(1,0), 1024) = 1.79769e+308 (largest finite double)
ldexp(-0, 10) = -0
ldexp(-Inf, -1) = -inf
ldexp(1, 1024) = inf
*/

/*
float Ldexpf( float x, float y ){
return ldexpf( x, y );
}
*/

double Ldexp( double x, double y ){
return ldexp( x, y );
}

/*
long double Ldexpl( long double x, long double y ){
return ldexpl( x, y );
}
*/

/*x乘以2的y次幂( X x 2^Y ) End*/

}
