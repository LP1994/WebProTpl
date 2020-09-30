/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

// 该JS文件是一个用于GraphQL的各种资源上传请求的工具类

'use strict';

let CT = new CTESM.CT();

function GetErrorStrA( arg1, arg2 ){
    return `FormData中的第${ arg1 }个的数据类型(${ arg2 })不在这三者之中：File、Blob、ArrayBuffer！请自行转换为这三者之一的数据类型！`;
}

function HandleA( {
                      operationName = null,
                      query = throw new Error( 'query参数必须！' ),
                      variables = throw new Error( 'variables参数必须！' ),
                      file4KeyName = throw new Error( 'file4KeyName参数必须！' ),
                      isSingleFile = true,
                  } = throw new Error( '参数必须！' ) ){
    let formData = new FormData(),
        operations_obj = {},
        map_obj = {},
        file4KeyName2Value = null,
        arr1 = null;

    ( CT.isString( operationName ) && !CT.isEmpty( operationName ) ) && ( operations_obj[ 'operationName' ] = operationName );

    operations_obj[ 'query' ] = query;

    !( file4KeyName in variables ) && ( throw new Error( '“file4KeyName”参数的值不在“variables”参数的各个属性名之中！' ) );

    file4KeyName2Value = variables[ file4KeyName ];

    !CT.isFormData( file4KeyName2Value ) && ( throw new Error( `variables中的“${ file4KeyName }”的属性值的数据类型必须是“FormData”类型！` ) );

    if( isSingleFile ){
        variables[ file4KeyName ] = null;
    }
    else{
        variables[ file4KeyName ] = [];
    }

    arr1 = Array.from( file4KeyName2Value.keys() );

    ( arr1.length === 0 ) && ( throw new Error( `variables中的“${ file4KeyName }”的属性值中至少要有一个文件，也就是说FormData中至少有一个文件！` ) );

    let source = null;

    if( isSingleFile ){
        source = file4KeyName2Value.get( arr1[ 0 ] );

        if( !( CT.isFile( source ) || CT.isBlob( source ) || CT.isArrayBuffer( source ) ) ){
            throw new Error( GetErrorStrA( 1, CT.dataT( source ) ) );
        }

        formData.append( arr1[ 0 ], source );
        map_obj[ arr1[ 0 ] ] = [ `variables.${ file4KeyName }`, ];
    }
    else{
        arr1.forEach( ( c, i, a ) => {
            source = file4KeyName2Value.get( c );

            if( !( CT.isFile( source ) || CT.isBlob( source ) || CT.isArrayBuffer( source ) ) ){
                throw new Error( GetErrorStrA( i + 1, CT.dataT( source ) ) );
            }

            variables[ file4KeyName ].push( null );
            formData.append( c, source );
            map_obj[ c ] = [ `variables.${ file4KeyName }.${ i }`, ];
        } );
    }

    operations_obj[ 'variables' ] = variables;

    formData.append( 'operations', JSON.stringify( operations_obj ) );
    formData.append( 'map', JSON.stringify( map_obj ) );

    return {
        formData,
        operations: operations_obj,
        map: map_obj,
    };
}

/**
 * 单文件上传<br />
 * PS:<br />
 * 1、GraphQL上传请求(单文件)的规范<br />
 * https://github.com/jaydenseric/graphql-multipart-request-spec#single-file
 *
 * @param operationName 字符串，默认值null(表示不传)，可选，这个字段的使用遵循GraphQL中的“operationName”的使用方法
 *
 * @param query 字符串，字符串形式的GraphQL语句，必传
 *
 * @param variables 对象，里头的数据格式是key-value形式的，其中涉及用于存放文件的那个key所对应的值必须是FormData的数据类型，<br />
 * 该FormData里头只允许接受三种数据类型的值：File、Blob、ArrayBuffer，必传。<br />
 * 如：<br />
 * variables: {<br />
 * filesA: formData,<br />
 * }<br />
 * PS：该工具在处理“formData”过程中的规范说明！请使用者注意看说明再使用！<br />
 * 1、在“单文件上传”的操作中，只取“formData”中第一个文件，其他都不取。<br />
 * 2、在“formData”中的各个“key”都必须是唯一的！<br />
 * 3、在“formData”中，如果同一个“key”存放了多个文件，那也只取其第一个文件。<br />
 *
 * @param file4KeyName 字符串，用于说明在上面“variables”字段中用于存放文件的那个key的名字，必传
 *
 * @returns {FormData} FormData，该FormData已经封装好了请求所需要的所有数据，可以直接使用在具体请求中了。<br />
 * 主要有两个规范必须要传的字段：operations、map，以及要上传的文件。
 */
function SingleFile( {
                         operationName = null,
                         query = throw new Error( 'query参数必须！' ),
                         variables = throw new Error( 'variables参数必须！' ),
                         file4KeyName = throw new Error( 'file4KeyName参数必须！' ),
                     } = throw new Error( '参数必须！' ) ){
    return HandleA( {
        operationName,
        query,
        variables,
        file4KeyName,
        isSingleFile: true,
    } ).formData;
}

/**
 * 多文件上传<br />
 * PS:<br />
 * 1、GraphQL上传请求(多文件)的规范<br />
 * https://github.com/jaydenseric/graphql-multipart-request-spec#file-list
 *
 * @param operationName 字符串，默认值null(表示不传)，可选，这个字段的使用遵循GraphQL中的“operationName”的使用方法
 *
 * @param query 字符串，字符串形式的GraphQL语句，必传
 *
 * @param variables 对象，里头的数据格式是key-value形式的，其中涉及用于存放文件的那个key所对应的值必须是FormData的数据类型，<br />
 * 该FormData里头只允许接受三种数据类型的值：File、Blob、ArrayBuffer，必传。<br />
 * 如：<br />
 * variables: {<br />
 * filesA: formData,<br />
 * }<br />
 * PS：该工具在处理“formData”过程中的规范说明！请使用者注意看说明再使用！<br />
 * 1、在“formData”中的各个“key”都必须是唯一的！<br />
 * 3、在“formData”中，如果同一个“key”存放了多个文件，那也只取其第一个文件。<br />
 *
 * @param file4KeyName 字符串，用于说明在上面“variables”字段中用于存放文件的那个key的名字，必传
 *
 * @returns {FormData} FormData，该FormData已经封装好了请求所需要的所有数据，可以直接使用在具体请求中了。<br />
 * 主要有两个规范必须要传的字段：operations、map，以及要上传的各个文件。
 */
function MultipleFiles( {
                            operationName = null,
                            query = throw new Error( 'query参数必须！' ),
                            variables = throw new Error( 'variables参数必须！' ),
                            file4KeyName = throw new Error( 'file4KeyName参数必须！' ),
                        } = throw new Error( '参数必须！' ) ){
    return HandleA( {
        operationName,
        query,
        variables,
        file4KeyName,
        isSingleFile: false,
    } ).formData;
}

/**
 * 文件上传的“批操作”，不同于“多文件上传”，具体请看下面的规范说明地址<br />
 * PS:<br />
 * 1、GraphQL上传请求(批操作)的规范<br />
 * https://github.com/jaydenseric/graphql-multipart-request-spec#batching
 *
 * @param opeArr 数组，必须，里头的成员都是一个个对象，对象里头的具体字段如下：<br />
 * {<br />
 * operationName,<br />
 * query,<br />
 * variables,<br />
 * file4KeyName,<br />
 * // 默认值是true，必须，布尔值，用于说明该操作是单文件操作还是多文件操作，默认是单文件操作。<br />
 * isSingleFile,<br />
 * }<br />
 * PS：<br />
 * 1、“isSingleFile”为true时，表示该操作是单文件操作，那么其他字段的说明请查阅“SingleFile”函数的说明。<br />
 * 2、“isSingleFile”为false时，表示该操作是多文件操作，那么其他字段的说明请查阅“MultipleFiles”函数的说明。<br />
 *
 * @returns {FormData} FormData，该FormData已经封装好了请求所需要的所有数据，可以直接使用在具体请求中了。<br />
 * 主要有两个规范必须要传的字段：operations、map，以及要上传的各个文件。
 */
function Batching( opeArr = throw new Error( '参数必须！' ) ){
    let operationsAll_arr = [],
        mapAll_arr = [],
        formDataAll = new FormData(),
        arr1 = [],
        index_num = 0;

    opeArr.forEach( ( {
                          operationName = null,
                          query = throw new Error( 'query参数必须！' ),
                          variables = throw new Error( 'variables参数必须！' ),
                          file4KeyName = throw new Error( 'file4KeyName参数必须！' ),
                          isSingleFile = true,
                      }, i, a ) => {
        let {
            formData,
            operations,
            map,
        } = HandleA( {
            operationName,
            query,
            variables,
            file4KeyName,
            isSingleFile,
        } );

        operationsAll_arr.push( operations );

        if( isSingleFile ){
            mapAll_arr.push( [
                index_num,
                [
                    `${ i }.${ Array.from( Object.values( map ) )
                                    .flat( Infinity )[ 0 ] }`,
                ],
            ] );

            ++index_num;
        }
        else{
            Array.from( Object.values( map ) )
                 .flat( Infinity )
                 .forEach( ( c1, i1, a1 ) => {
                     mapAll_arr.push( [
                         index_num,
                         [
                             `${ i }.${ c1 }`,
                         ],
                     ] );

                     ++index_num;
                 } );
        }

        let formData4KeyNames = Array.from( formData.keys() );

        formData4KeyNames.splice( formData4KeyNames.indexOf( 'operations' ), 1, );
        formData4KeyNames.splice( formData4KeyNames.indexOf( 'map' ), 1, );

        formData4KeyNames.forEach( ( c, i, a ) => void ( arr1.push( formData.get( c ) ) ) );
    } );

    formDataAll.append( 'operations', JSON.stringify( operationsAll_arr ) );
    formDataAll.append( 'map', JSON.stringify( Object.fromEntries( mapAll_arr ) ) );

    arr1.forEach( ( c, i, a ) => void ( formDataAll.append( i, c ) ) );

    return formDataAll;
}

export {
    SingleFile,
    MultipleFiles,
    Batching,
};
