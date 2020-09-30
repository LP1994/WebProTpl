/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 这个工具是用于转换webp格式的图片，提供了三种！！！
// 具体看如下的“GoImg2WebP”、“GoWebP2PNG”、“GoGIF2WebP”。
// “_In”结尾的文件夹是输入图片的存放位置，“_Out”是输出的图片位置。

/*
 PS：
 亲测已解决iOS的旋转BUG！！！
 “iPhoneX(兼容模式)顺时针180度”、“iPhoneX(兼容模式)逆时针180度”会出现顺时针旋转90度
 (处理方法：使用fast-exif.js读出Orientation属性为8，然后我们逆时针旋转90度就会使它变为原图的方向)

 “iPhoneX(兼容模式)顺时针90度”、“iPhoneX(兼容模式)逆时针270度”会出现旋转180度
 (处理方法：使用fast-exif.js读出Orientation属性为3，然后我们旋转180度就会使它变为原图的方向)

 “iPhoneX(兼容模式)顺时针270度”、“iPhoneX(兼容模式)逆时针90度”不会旋转
 (使用fast-exif.js读出Orientation属性为1，不需要转)

 “iPhoneX(兼容模式)正竖”会出现逆时针旋转90度
 (处理方法：使用fast-exif.js读出Orientation属性为6，然后我们顺时针旋转90度就会使它变为原图的方向)
 */

const fs = require( 'fs' ),
    path = require( 'path' ),
    FastEXIF = require( 'fast-exif' ),
    { execSync } = require( 'child_process' ),
    path1_fun = str => path.join( __dirname, str );

/**
 * cwebp(将图像文件压缩为WebP文件)
 * 默认是有损命令的默认(2.56MiB能被压到700KiB)。
 * 输入格式可以是PNG，JPEG(.jpe、.jpeg、.jpg)，TIFF，WebP或raw Y'CbCr样本。
 * 注：
 * 在将大分辨率的jpg转换成webp时，转换后的webp会出现逆时针90度的旋转！！！
 * 解决方案是命令参数添加"-metadata all"
 * 以上方案在iPhone X拍出的大分辨率的jpg无用！！！它包含ICC！！！哪怕是添加"-metadata icc"、"-alpha_filter best"也无用！！！
 * 安卓机上拍出的大分辨率的jpg，它不包含ICC！！！也没出现逆时针90度的旋转！！！
 * Windows 10 X64只能使用"-metadata icc"，使用"-metadata all"会报无效警告！
 *
 * @param fileName4In 字符串，转换前的文件路径(包括文件的后缀名)，必须
 *
 * @param fileName4Out 字符串，转换后的文件路径(包括文件的后缀名)，必须
 *
 * @returns {string} 转换命令的字符串形式
 *
 * 注：
 * 1、命令中涉及到项目路径时，路径的格式如下：
 * G:/WebStormWS、"G:/WebStormWS"、G:\\WebStormWS、"G:\\WebStormWS"
 * 2、"&"要两个连在一起，如：&&
 */
function Img2WebP4Command( fileName4In, fileName4Out ){
    // 无损高质量的，但是文件大：`cwebp -lossless -near_lossless 100 -q 100 -z 9 -alpha_q 100 -m 6 -mt -alpha_filter best -exact -metadata icc -o ${ fileName4Out } -- ${ fileName4In }`
    // 无损命令的默认：`cwebp -lossless -mt -metadata icc -o ${ fileName4Out } -- ${ fileName4In }`
    // 有损命令的默认(2.56MiB能被压到700KiB)：`cwebp -mt -metadata icc -o ${ fileName4Out } -- ${ fileName4In }`
    return `cwebp -mt -metadata icc -o ${ fileName4Out } -- ${ fileName4In }`;
}

/**
 * dwebp(将WebP文件解压缩为PNG文件)
 * 默认输出的图片是无损高质量的。
 * 通过其他参数可以转换成为其他支持的图片格式，默认输出的文件格式是PNG文件。
 * 将WebP文件解压缩为PNG，PAM，PPM或PGM图像。
 *
 * @param fileName4In 字符串，转换前的文件路径(包括文件的后缀名)，必须
 *
 * @param fileName4Out 字符串，转换后的文件路径(包括文件的后缀名)，必须
 *
 * @returns {string} 转换命令的字符串形式
 *
 * 注：
 * 1、命令中涉及到项目路径时，路径的格式如下：
 * G:/WebStormWS、"G:/WebStormWS"、G:\\WebStormWS、"G:\\WebStormWS"
 * 2、"&"要两个连在一起，如：&&
 */
function WebP2PNG4Command( fileName4In, fileName4Out ){
    return `dwebp -mt -o ${ fileName4Out } -- ${ fileName4In }`;
}

/**
 * gif2webp(将GIF图像转换为WebP)
 * 原来WebP格式也是能保持GIF的动态效果！！！
 * -q、-m这两个的值，越小、压缩速度越快、质量越差、文件越大！
 * 这两个值的最大值，压缩速度慢、质量高、文件小！
 * 除掉这两个参数，就会使用命令中他们的默认值！
 * 默认使用默认命令！
 *
 *
 * @param fileName4In 字符串，转换前的文件路径(包括文件的后缀名)，必须
 *
 * @param fileName4Out 字符串，转换后的文件路径(包括文件的后缀名)，必须
 *
 * @returns {string} 转换命令的字符串形式
 *
 * 注：
 * 1、命令中涉及到项目路径时，路径的格式如下：
 * G:/WebStormWS、"G:/WebStormWS"、G:\\WebStormWS、"G:\\WebStormWS"
 * 2、"&"要两个连在一起，如：&&
 */
function GIF2WebP4Command( fileName4In, fileName4Out ){
    // 压缩速度慢、质量高、文件小：`gif2webp -q 100 -m 6 -mt -o ${ fileName4Out } -- ${ fileName4In }`
    // 默认命令：`gif2webp -mt -o ${ fileName4Out } -- ${ fileName4In }`
    return `gif2webp -mt -o ${ fileName4Out } -- ${ fileName4In }`;
}

/**
 * 输入格式可以是PNG，JPEG(.jpe、.jpeg、.jpg)，TIFF，WebP或raw Y'CbCr样本。
 * 注：
 * 在将大分辨率的jpg转换成webp时，转换后的webp会出现逆时针90度的旋转！！！
 * 解决方案是命令参数添加"-metadata all"
 * 以上方案在iPhone X拍出的大分辨率的jpg无用！！！它包含ICC！！！哪怕是添加"-metadata icc"、"-alpha_filter best"也无用！！！
 * 安卓机上拍出的大分辨率的jpg，它不包含ICC！！！也没出现逆时针90度的旋转！！！
 * Windows 10 X64只能使用"-metadata icc"，使用"-metadata all"会报无效警告！
 */
function GoImg2WebP(){
    console.log( '------>GoImg2WebP Start<------' );

    let in_str = 'img2WebP_In/',
        out_str = 'img2WebP_Out/',
        suffix_str = '',
        orientation_str = null,
        degree_num = null,
        inFileSrc_str = '',
        delFileSrc_str = '',
        outFileSrc_str = '',
        fileName_arr = fs.readdirSync( path1_fun( 'img2WebP_In' ) )
                         .filter( c => fs.statSync( path1_fun( in_str + c ) )
                                         .isFile() )
                         .filter( c => {
                             suffix_str = path.extname( c )
                                              .slice( 1 )
                                              .toLocaleLowerCase();

                             return suffix_str === 'png' || suffix_str === 'jpe' || suffix_str === 'jpeg' || suffix_str === 'jpg' || suffix_str === 'tiff' || suffix_str === 'webp';
                         } ),
        promise_ins = inFileSrc_str => FastEXIF.read( inFileSrc_str ),
        index_num = 0;

    if( fileName_arr.length !== 0 ){
        ( ( async function (){
            do{
                inFileSrc_str = path1_fun( in_str + fileName_arr[ index_num ] );
                delFileSrc_str = path1_fun( out_str + '_' + fileName_arr[ index_num ] + '.webp' );
                outFileSrc_str = path1_fun( out_str + fileName_arr[ index_num ] + '.webp' );

                let { image: { Orientation, }, } = await promise_ins( inFileSrc_str );

                orientation_str = String( Orientation )
                    .valueOf();

                switch( orientation_str ){
                case '1':
                    degree_num = 0;
                    break;
                case '3':
                    degree_num = 180;
                    break;
                case '6':
                    degree_num = 90;
                    break;
                case '8':
                    degree_num = -90;
                    break;
                default:
                    degree_num = 0;
                    console.error( `Orientation属性值“${ orientation_str }”不在处理的范畴！！！` );
                    break;
                }

                if( degree_num !== 0 ){
                    execSync( Img2WebP4Command( inFileSrc_str, delFileSrc_str ), {
                        cwd: null
                    } );

                    execSync( `convert -rotate ${ degree_num } ${ delFileSrc_str } ${ outFileSrc_str }`, {
                        cwd: null
                    } );

                    fs.unlinkSync( delFileSrc_str );
                }
                else{
                    execSync( Img2WebP4Command( inFileSrc_str, outFileSrc_str ), {
                        cwd: null
                    } );
                }

                ++index_num;
            }
            while( index_num < fileName_arr.length );
        } )() );
    }

    console.log( '------>GoImg2WebP End<------' );
}

function GoWebP2PNG(){
    console.log( '------>GoWebP2PNG Start<------' );

    let in_str = 'webP2PNG_In/',
        out_str = 'webP2PNG_Out/';

    fs.readdirSync( path1_fun( 'webP2PNG_In' ) )
      .filter( c => fs.statSync( path1_fun( in_str + c ) )
                      .isFile() )
      .filter( c => path.extname( c )
                        .slice( 1 )
                        .toLocaleLowerCase() === 'webp' )
      .forEach( c => void ( execSync( WebP2PNG4Command( path1_fun( in_str + c ), path1_fun( out_str + c + '.png' ) ), {
          cwd: null
      } ) ) );

    console.log( '------>GoWebP2PNG End<------' );
}

function GoGIF2WebP(){
    console.log( '------>GoGIF2WebP Start<------' );

    let in_str = 'gif2WebP_In/',
        out_str = 'gif2WebP_Out/';

    fs.readdirSync( path1_fun( 'gif2WebP_In' ) )
      .filter( c => fs.statSync( path1_fun( in_str + c ) )
                      .isFile() )
      .filter( c => path.extname( c )
                        .slice( 1 )
                        .toLocaleLowerCase() === 'gif' )
      .forEach( c => void ( execSync( GIF2WebP4Command( path1_fun( in_str + c ), path1_fun( out_str + c + '.webp' ) ), {
          cwd: null
      } ) ) );

    console.log( '------>GoGIF2WebP End<------' );
}

GoImg2WebP();
GoWebP2PNG();
GoGIF2WebP();
