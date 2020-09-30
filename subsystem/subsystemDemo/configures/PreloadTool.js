/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

// 资源预加载工具

const mime = require( 'mime' );

const as_obj = {
    style: [
        '.css',
    ],
    script: [
        '.js',
        '.mjs',
    ],
    image: [
        '.bmp',
        '.dcx',
        '.gif',
        '.icns',
        '.ico',
        '.jbig2',
        '.jpe',
        '.jpeg',
        '.jpg',
        '.pam',
        '.pbm',
        '.pcx',
        '.pgm',
        '.png',
        '.pnm',
        '.ppm',
        '.psd',
        '.rgbe',
        '.tga',
        '.tif',
        '.tiff',
        '.wbmp',
        '.xbm',
        '.xpm',
        '.svg',
        '.webp',
        '.heif',
        '.heic',
    ],
    font: [
        '.eot',
        '.otf',
        '.fon',
        '.font',
        '.ttf',
        '.ttc',
        '.woff',
        '.woff2',
    ],
    audio: [
        '.ape',
        '.wav',
        '.wave',
        '.flac',
        '.wma',
        '.cda',
        '.aiff',
        '.au',
        '.mpeg',
        '.mpeg-1',
        '.mpeg-2',
        '.mpeg-layer3',
        '.mpeg-4',
        '.mp3',
        '.mp2',
        '.mp1',
        '.midi',
        '.ra',
        '.rm',
        '.rmx',
        '.vqf',
        '.ogg',
        '.amr',
        '.aac',
        '.vorbis',
    ],
    video: [
        '.wmv',
        '.asf',
        '.asx',
        '.rmvb',
        '.mp4',
        '.3gp',
        '.mov',
        '.m4v',
        '.avi',
        '.dat',
        '.mkv',
        '.flv',
        '.vob',
        '.mod',
        '.webm',
    ],
    manifest: [
        '.json',
    ],
    noAS: [
        '.xml',
        '.txt',
        '.json5',
    ],
};

/**
 * 资源预加载工具，true开启该功能，false关闭，默认关闭
 *
 * @param isPro_boo 布尔，isPro表示是否是正式环境
 *
 * @param preload_arr 数组，成员是一个个JSON对象，必须
 * 成员JSON对象的格式是
 * {
 *   href: 资源的url 字符串，必须
 *   as： 'font' 字符串，可选
 *   type: 'font/ttf' 字符串，可选
 *   crossorigin: 'anonymous' 字符串，可选
 *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
 *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
 * }
 *
 * @param assets_obj 对象，就是compilation[ 'assets' ]，把打包的资源预加载下来，默认值{}，可选
 *
 * @param publicPath_str 字符串，公共路径头，有“assets_obj”参数时这个参数是必须要有的！，默认值'../'。
 *
 * as的值:
 * 支持不填写“as”属性，那么链接地址就是资源任何地址
 * audio(音频文件)、
 * document(用于嵌入<frame>或中的HTML文档<iframe>)、
 * embed(要嵌入<embed>元素内的资源)、
 * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
 * font(字体文件)、
 * image(图像文件、SVG)、
 * object(要嵌入<embed>元素内的资源)、
 * script(JavaScript文件)、
 * style(样式表)、
 * track(WebVTT文件)、
 * worker(Web Worker或Shared Worker)、
 * video(视频文件)、
 * report(不需要链接地址)、
 * audioworklet、
 * paintworklet、
 * serviceworker、
 * sharedworker、
 * manifest、
 * xslt、
 *
 * type值:(链接查找)
 * http://www.w3school.com.cn/media/media_mimeref.asp
 *
 * @return {string}
 */
function PreloadTool( { isPro_boo, preload_arr, assets_obj = {}, publicPath_str = '../' } ){
    let result_str = ``,
        as_str = '';

    Object.keys( assets_obj )
          .forEach( c => {
              Object.keys( as_obj )
                    .forEach( c1 => void ( as_obj[ c1 ].forEach( c2 => void ( c.toLowerCase()
                                                                               .trim()
                                                                               .endsWith( c2 ) && ( as_str = c1 ) ) ) ) );
              result_str += `<link rel = 'preload' href = '${ publicPath_str + c }' ${ as_str === 'noAS'
                                                                                       ? ''
                                                                                       : `as = '${ as_str }'` } type = '${ mime.getType( publicPath_str + c ) || 'application/octet-stream' }' ${ isPro_boo && ( c.toLowerCase()
                                                                                                                                                                                                                  .trim()
                                                                                                                                                                                                                  .endsWith( '.js' ) || c.toLowerCase()
                                                                                                                                                                                                                                         .trim()
                                                                                                                                                                                                                                         .endsWith( '.css' ) )
                                                                                                                                                                                                  ? `integrity = '${ assets_obj[ c ][ 'integrity' ] }'`
                                                                                                                                                                                                  : '' } crossorigin = 'anonymous' />`;
          } );

    preload_arr.forEach( c => {
        let str1 = `<link rel = 'preload' href = '${ c.href }' ${ 'as' in c
                                                                  ? `as = '${ c.as }'`
                                                                  : '' } ${ 'type' in c
                                                                            ? `type = '${ c.type }'`
                                                                            : '' } ${ 'crossorigin' in c
                                                                                      ? `crossorigin = '${ c.crossorigin }'`
                                                                                      : '' } `,
            str2 = `/>`;

        'attrs' in c && ( Object.keys( c.attrs )
                                .forEach( c1 => void ( str1 += `${ c1 } = '${ c.attrs[ c1 ] }' ` ) ) );

        result_str += str1 + str2;
    } );

    preload_arr.forEach( c => {
        if( ( c.href.includes( '.js' ) || c.href.includes( '.mjs' ) ) && 'isExecute' in c && c.isExecute ){
            let str1 = `<script src = '${ c.href }' crossorigin = '${ c.crossorigin }'`,
                str2 = `></script>`;

            'attrs' in c && ( Object.keys( c.attrs )
                                    .forEach( c1 => void ( str1 += ` ${ c1 } = '${ c.attrs[ c1 ] }' ` ) ) );

            result_str += str1 + str2;
        }
    } );

    return result_str;
}

module.exports = PreloadTool;
