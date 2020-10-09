/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

// process.cwd()输出G:\\WebStormWS\\WebProTpl

'use strict';

let isPro = process.argv[ 3 ] === 'production',
    os = require( 'os' ),
    osLen = os.cpus().length,
    getTransformer = require( 'ts-transform-graphql-tag' ).getTransformer,
    // 将此装载机放在其他装载机的前面。以下加载程序在工作池中运行。
    // 在工作池中运行的装载程序受到限制。例子：
    // 1、加载程序无法发出文件。
    // 2、加载程序无法使用自定义加载程序API（即通过插件）。
    // 3、加载程序无法访问webpack选项。
    // PS：
    // 1、只能将此装载机用于昂贵的操作！
    // 2、每个工作程序都是一个单独的node.js进程，其开销约为600毫秒。进程间通信也有开销。
    threadLoader = require( 'thread-loader' ),
    // 将此装载机放在其他装载机的前面。以下加载程序在工作池中运行。
    // 在工作池中运行的装载程序受到限制。例子：
    // 1、加载程序无法发出文件。
    // 2、加载程序无法使用自定义加载程序API（即通过插件）。
    // 3、加载程序无法访问webpack选项。
    // PS：
    // 1、只能将此装载机用于昂贵的操作！
    // 2、每个工作程序都是一个单独的node.js进程，其开销约为600毫秒。进程间通信也有开销。
    jsWorkerPool = {
        // 生成的工作进程数，默认为（ os.cpus().length-1 ），fallback to 1 when require('os').cpus() is undefined
        workers: osLen,
        // 一个工人并行处理的作业数默认为20
        workerParallelJobs: 20,
        // 其他的node.js参数
        workerNodeArgs: [ '--max-old-space-size=1024' ],
        // 允许重新生成一个已死亡的工人池，重新生成会减慢整个编译速度，并且应设置为false以进行开发
        poolRespawn: false,
        // 空闲默认值为500（ms）时终止工作进程的超时，可以设置为无穷大，以便监视生成以保持工作进程的活动性
        // Infinity：可用于开发模式
        // 600000ms也就是10分钟
        poolTimeout: isPro
                     ? 1000
                     : Infinity,
        // 投票分配给工人的工作岗位数量默认为200个，分配效率较低但更公平
        poolParallelJobs: 50,
        // 池的名称可用于创建其他具有相同选项的不同池
        name: 'jsWorkerPool',
    };

// 将此装载机放在其他装载机的前面。以下加载程序在工作池中运行。
// 在工作池中运行的装载程序受到限制。例子：
// 1、加载程序无法发出文件。
// 2、加载程序无法使用自定义加载程序API（即通过插件）。
// 3、加载程序无法访问webpack选项。
// PS：
// 1、只能将此装载机用于昂贵的操作！
// 2、每个工作程序都是一个单独的node.js进程，其开销约为600毫秒。进程间通信也有开销。
threadLoader.warmup( jsWorkerPool, [
    'babel-loader',
] );

let fs = require( 'fs' ),
    path = require( 'path' ),
    imageminWebp = require( 'imagemin-webp' ),
    imageminMozjpeg = require( 'imagemin-mozjpeg' ),
    // 直到20200908，只支持的列表如下！！！
    compilerOptions4lib_arrC = [
        'dom',
        'dom.iterable',
        'es2015',
        'es2015.collection',
        'es2015.core',
        'es2015.generator',
        'es2015.iterable',
        'es2015.promise',
        'es2015.proxy',
        'es2015.reflect',
        'es2015.symbol',
        'es2015.symbol.wellknown',
        'es2016',
        'es2016.array.include',
        'es2017',
        'es2017.intl',
        'es2017.object',
        'es2017.sharedmemory',
        'es2017.string',
        'es2017.typedarrays',
        'es2018',
        'es2018.asyncgenerator',
        'es2018.asynciterable',
        'es2018.intl',
        'es2018.promise',
        'es2018.regexp',
        'es2019',
        'es2019.array',
        'es2019.object',
        'es2019.string',
        'es2019.symbol',
        'es2020',
        'es2020.bigint',
        'es2020.intl',
        'es2020.promise',
        'es2020.string',
        'es2020.symbol.wellknown',
        'es5',
        'es6',
        'es7',
        'esnext',
        'esnext.array',
        'esnext.asynciterable',
        'esnext.bigint',
        'esnext.intl',
        'esnext.promise',
        'esnext.string',
        'esnext.symbol',
        'scripthost',
        'webworker',
        'webworker.importscripts'
    ],
    compilerOptions_obj = {
        // Project Options Start

        // 告诉TypeScript将上次编译的项目图信息保存到存储在磁盘上的文件中。这将在编译输出所在的文件夹中创建一系列.tsbuildinfo文件。
        // 它们在运行时不被JavaScript使用，可以安全地删除。
        'incremental': true,
        'tsBuildInfoFile': './test/TSBuildInfo.tsbuildinfo',
        // ES3、ES5、ES6、ES2015、ES7、ES2016、ES2017(Node 8)、ES2018(Node 10)、ES2019(Node 12)、ES2020、ESNext
        // Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'
        'target': 'ES2020',
        // CommonJS(default if target is ES3 or ES5)、ES6、ES2015、ES2020、None、UMD、AMD、System、ESNext
        // Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'.
        'module': 'es2020',
        // 如(全是小写字母！！！)：[ 'es6', 'es2015' ]
        // 直到20200908，只支持的列表如下！！！
        'lib': compilerOptions4lib_arrC,
        // true时，可以在.ts中导入.js；但是，false时，这么干，会报错！
        'allowJs': false,
        // true时，当把.js文件导入到.ts文件中时，如果.js文件中有错，将报告错误，这相当于在项目中包含的所有JavaScript文件的顶部包含"// @ts-check"。
        'checkJs': false,
        // 控制如何在JavaScript文件中发出JSX构造。这仅影响以.tsx文件开头的JS文件的输出。
        // preserve: 在不更改JSX的情况下发出.jsx文件
        // react: 使用JSX发出.js文件已更改为等效的React.createElement调用
        // react-native: 在JSX不变的情况下发出.js文件
        'jsx': 'react',
        // 为项目中的每个TypeScript或JavaScript文件生成.d.ts文件。这些.d.ts文件是描述模块外部API的类型定义文件。
        // 对于.d.ts文件，TypeScript之类的工具可以为未键入的代码提供智能感知和准确的类型。
        // PS: 在为JavaScript文件使用“.d.ts”文件时，可能需要使用“emitDeclarationOnly”或“outDir”来确保JavaScript文件不会被覆盖。
        'declaration': true,
        // 为映射回原始“.ts”源文件的“.d.ts”文件生成源映射。这将允许像VS代码这样的编辑器在使用像go to Definition这样的功能时转到原始的“.ts”文件。
        // 如果您使用的是项目参考，则应强烈考虑启用此功能。
        'declarationMap': true,
        'sourceMap': false,
        'composite': true,
        // 转换为JavaScript时，剥离TypeScript文件中的所有注释。默认为false。
        'removeComments': true,
        'noEmit': false,
        // 属于“有助于调试的标志”！！！
        'importHelpers': true,
        'downlevelIteration': true,
        // 如果设置了isolatedModules，则所有实现文件都必须是模块（这意味着它具有某种形式的导入/导出）。如果任何文件不是模块，则会发生错误(此限制不适用于.d.ts文件)
        // 这些限制可能会导致某些类型脚本功能（如常量枚举和命名空间）出现运行时问题。
        // 设置isolatedModules标志会告诉TypeScript，如果您编写的某些代码无法由单个文件转换过程正确解释，则会发出警告。
        // 它不会更改代码的行为，也不会更改TypeScript检查和发出进程的行为。
        'isolatedModules': false,

        // Project Options End

        // Strict Checks Start

        'strict': true,
        // 在隐式任何类型的表达式和声明上引发错误。
        'noImplicitAny': true,
        // 在严格的null检查模式下，null和undefined值不在每种类型的域中，并且只能分配给它们自己和任何值（一个例外是undefined也可以分配给void）。
        // 当strictNullChecks为true时，null和undefined有各自不同的类型，如果在需要具体值的地方尝试使用它们，则会出现类型错误。
        'strictNullChecks': true,
        // 在开发此功能期间，我们发现了大量固有的不安全类层次结构，包括DOM中的某些层次结构。因此，该设置仅适用于以函数语法编写的函数，而不适用于以方法语法编写的函数
        'strictFunctionTypes': true,
        // 设置后，TypeScript将检查是否为基础函数使用正确的参数调用了函数的内置方法call，bind和apply：
        'strictBindCallApply': true,
        // 设置为true时，当声明了类属性但未在构造函数中设置ClassType时，TypeScript将引发错误。
        'strictPropertyInitialization': true,
        // 使用隐式任何类型引发此表达式上的错误。
        'noImplicitThis': true,
        // 确保以ECMAScript严格模式解析文件，并为每个源文件发出"use strict"信息。
        'alwaysStrict': true,

        // Strict Checks End

        // Module Resolution Start

        'baseUrl': './',
        // 就跟Webpack里的resolve.alias一样
        'paths': {
            'echarts': [
                'node_modules/echarts/dist/echarts.min.js'
            ],
            'ELEMENTCSS': [
                'node_modules/element-ui/lib/theme-chalk/index.css'
            ],
            'ELEMENT': [
                'node_modules/element-ui/lib/index.js'
            ],
            'jQuery': [
                'node_modules/jquery/dist/jquery.min.js'
            ],
            '$': [
                'node_modules/jquery/dist/jquery.min.js'
            ],
            'SwiperCSS': [
                'node_modules/swiper/swiper-bundle.min.css'
            ],
            'Swiper': [
                'node_modules/swiper/swiper-bundle.min.js'
            ],
            'Vue': [
                'node_modules/vue/dist/vue.min.js'
            ],
            'VueRouter': [
                'node_modules/vue-router/dist/vue-router.min.js'
            ],
            'Vuex': [
                'node_modules/vuex/dist/vuex.min.js'
            ],
            'tslib': [
                'node_modules/tslib/tslib.es6.js'
            ],
            'CompESM': [
                'src/components/Components.esm.js'
            ],
            'CTESM': [
                'src/js/tools/CurrencyTools.esm.js'
            ],
            'DecESM': [
                'src/js/tools/Decorator4ES6.esm.js'
            ],
            'HTML2C4ESM': [
                'src/js/tools/HTML2Canvas.esm.js'
            ],
            'WebCESM': [
                'src/js/tools/WebComponents.esm.js'
            ],
            'WorkersESM': [
                'src/js/tools/Workers4MT.esm.js'
            ],
            'configDir/*': [
                'configures/*'
            ],
            'jsonDir/*': [
                'src/assets/doc/json/*'
            ],
            'json5Dir/*': [
                'src/assets/doc/json5/*'
            ],
            'txtDir/*': [
                'src/assets/doc/txt/*'
            ],
            'xmlDir/*': [
                'src/assets/doc/xml/*'
            ],
            'fontsDir/*': [
                'src/assets/fonts/*'
            ],
            'imgDir/*': [
                'src/assets/img/*'
            ],
            'musicDir/*': [
                'src/assets/music/*'
            ],
            'videosDir/*': [
                'src/assets/videos/*'
            ],
            'compDir/*': [
                'src/components/*'
            ],
            'gQLAPIDir/*': [
                'src/graphQL/api/*'
            ],
            'jsDir/*': [
                'src/js/*'
            ],
            'jsMDir/*': [
                'src/js/modules/*'
            ],
            'jsPDir/*': [
                'src/js/pages/*'
            ],
            'jsPubDir/*': [
                'src/js/public/*'
            ],
            'jsTDir/*': [
                'src/js/tools/*'
            ],
            'manifestDir/*': [
                'src/pwa4Manifest/*'
            ],
            'cssDir/*': [
                'src/styles/css/*'
            ],
            'cssBDir/*': [
                'src/styles/css/basic/*'
            ],
            'cssMDir/*': [
                'src/styles/css/modules/*'
            ],
            'cssPDir/*': [
                'src/styles/css/pages/*'
            ],
            'cssPubDir/*': [
                'src/styles/css/public/*'
            ],
            'lessDir/*': [
                'src/styles/less/*'
            ],
            'lessBDir/*': [
                'src/styles/less/basic/*'
            ],
            'lessMDir/*': [
                'src/styles/less/modules/*'
            ],
            'lessPDir/*': [
                'src/styles/less/pages/*'
            ],
            'lessPubDir/*': [
                'src/styles/less/public/*'
            ],
            'pcssDir/*': [
                'src/styles/postcss/*'
            ],
            'pcssBDir/*': [
                'src/styles/postcss/basic/*'
            ],
            'pcssMDir/*': [
                'src/styles/postcss/modules/*'
            ],
            'pcssPDir/*': [
                'src/styles/postcss/pages/*'
            ],
            'pcssPubDir/*': [
                'src/styles/postcss/public/*'
            ],
            'sassDir/*': [
                'src/styles/sass/*'
            ],
            'sassBDir/*': [
                'src/styles/sass/basic/*'
            ],
            'sassMDir/*': [
                'src/styles/sass/modules/*'
            ],
            'sassPDir/*': [
                'src/styles/sass/pages/*'
            ],
            'sassPubDir/*': [
                'src/styles/sass/public/*'
            ],
            'scssDir/*': [
                'src/styles/scss/*'
            ],
            'scssBDir/*': [
                'src/styles/scss/basic/*'
            ],
            'scssMDir/*': [
                'src/styles/scss/modules/*'
            ],
            'scssPDir/*': [
                'src/styles/scss/pages/*'
            ],
            'scssPubDir/*': [
                'src/styles/scss/public/*'
            ],
            'stylDir/*': [
                'src/styles/stylus/*'
            ],
            'stylBDir/*': [
                'src/styles/stylus/basic/*'
            ],
            'stylMDir/*': [
                'src/styles/stylus/modules/*'
            ],
            'stylPDir/*': [
                'src/styles/stylus/pages/*'
            ],
            'stylPubDir/*': [
                'src/styles/stylus/public/*'
            ],
            'tplEJSDir/*': [
                'src/tplEJS/*'
            ],
            'tplEJSBDir/*': [
                'src/tplEJS/basic/*'
            ],
            'tplEJSMLDir/*': [
                'src/tplEJS/basic/metaLink/*'
            ],
            'tplEJSMDir/*': [
                'src/tplEJS/modules/*'
            ],
            'tplEJSPDir/*': [
                'src/tplEJS/pages/*'
            ],
            'tplEJSPubDir/*': [
                'src/tplEJS/public/*'
            ],
            'tplHTMLDir/*': [
                'src/tplHTML/*'
            ],
            'tplHTMLBDir/*': [
                'src/tplHTML/basic/*'
            ],
            'tplHTMLMDir/*': [
                'src/tplHTML/modules/*'
            ],
            'tplHTMLPDir/*': [
                'src/tplHTML/pages/*'
            ],
            'tplHTMLPubDir/*': [
                'src/tplHTML/public/*'
            ],
            'vueDir/*': [
                'src/vue/*'
            ],
            'vueCompDir/*': [
                'src/vue/components/*'
            ],
            'vueMDir/*': [
                'src/vue/models/*'
            ],
            'vueRDir/*': [
                'src/vue/routers/*'
            ],
            'vueSDir/*': [
                'src/vue/stores/*'
            ],
            'vueStyDir/*': [
                'src/vue/styles/*'
            ],
            'vueVDir/*': [
                'src/vue/views/*'
            ],
            'wasmDir/*': [
                'src/wasm/*'
            ],
            'wasmBDir/*': [
                'src/wasm/basic/*'
            ],
            'wasmMDir/*': [
                'src/wasm/modules/*'
            ],
            'wasmPDir/*': [
                'src/wasm/pages/*'
            ],
            'wasmPubDir/*': [
                'src/wasm/public/*'
            ],
            'webCDir/*': [
                'src/webComponents/*'
            ],
            'serviceWorkersDir/*': [
                'src/workers/serviceWorkers/*'
            ],
            'sWorkersDir/*': [
                'src/workers/sharedWorkers/*'
            ],
            'tWorkersDir/*': [
                'src/workers/tools/*'
            ],
            'wWorkersDir/*': [
                'src/workers/webWorkers/*'
            ]
        },
        'typeRoots': [
            'node_modules/@types'
        ],
        // 空数组将禁用自动引入 @types 包
        'types': [],
        'allowSyntheticDefaultImports': true,
        // 通过为所有导入创建名称空间对象，启用CommonJS和ES模块之间的发射互操作性。
        'esModuleInterop': true,
        // 这是为了在Node.js中反映相同的标志；它不解析符号链接的实际路径。
        // 此标志还显示与Webpack的resolve.symlinks选项相反的行为（即将TypeScript的preserveSymlinks设置为true与将Webpack的resolve.symlinks设置为false并行，反之亦然）。
        // 启用此选项后，对模块和包的引用（例如imports和/// <reference type="..." />指令）都是相对于符号链接文件的位置解析的，而不是相对于符号链接解析到的路径解析的。
        'preserveSymlinks': false,
        // 当设置为true时，allowumddglobalaccess允许您从模块文件内部以全局方式访问UMD导出。模块文件是具有导入和/或导出的文件。
        // 如果没有这个标志，使用UMD模块的导出需要一个导入声明。
        // 此标志的一个示例用例是一个web项目，在该项目中，您知道特定库（如jQuery或Lodash）在运行时始终可用，但不能通过导入访问它。
        'allowUmdGlobalAccess': true,

        // Module Resolution End

        // Source Maps Start

        'mapRoot': './test/',
        // 设置后，TypeScript将在.js文件中嵌入源映射内容，而不是写出.js.map文件来提供源映射。尽管这会产生更大的JS文件，但在某些情况下，这是很方便的。
        // 例如，您可能希望在不允许提供.map文件的Web服务器上调试JS文件。
        'inlineSourceMap': false,
        // 设置后，TypeScript将把.ts文件的原始内容作为嵌入字符串包含在源映射中。在与inlineSourceMap相同的情况下，这通常很有用。
        // 需要设置sourceMap或inlineSourceMap。
        'inlineSources': false,

        // Source Maps End

        // Linter Checks Start

        // 报告未使用的局部变量的错误。
        'noUnusedLocals': true,
        // 报告有关函数中未使用参数的错误。
        'noUnusedParameters': true,
        // 启用后，TypeScript将检查函数中的所有代码路径，以确保它们返回值。
        'noImplicitReturns': true,
        // 在switch语句中报告失败情况的错误。确保switch语句中的任何非空情况都包括break或return。这意味着您不会意外附带案例失败漏洞。
        'noFallthroughCasesInSwitch': true,

        // Linter Checks End

        // Experimental Start

        // 在TC39标准化流程的第二阶段，为装饰器启用实验支持。
        // 装饰器是一种语言功能，尚未完全批准到JavaScript规范中。这意味着TypeScript中的实现版本可能与TC39决定的JavaScript中的实现版本有所不同。
        'experimentalDecorators': true,
        // 为与装饰器反射元数据模块一起使用的装饰器的发射类型元数据启用实验性支持。
        'emitDecoratorMetadata': true,

        // Experimental End

        // Advanced Start

        // 属于“有助于调试的标志”！！！
        // 打印文件名称的一部分。当您不确定TypeScript是否包含所需的文件时，此功能很有用。
        'listFiles': false,
        // 属于“有助于调试的标志”！！！
        // 将编译的一部分生成文件的名称打印到终端。
        // 该标志在两种情况下很有用：
        // 1、您想将TypeScript转换为终端中构建链的一部分，该终端在下一条命令中处理文件名。
        // 2、您不确定TypeScript是否包含了所需的文件，这是调试文件包含设置的一部分。
        'listEmittedFiles': false,
        // 属于“有助于调试的标志”！！！
        // 当您尝试调试未包含模块的原因时。您可以将traceResolutions设置为true，以使TypeScript打印有关每个已处理文件的解析过程的信息。
        'traceResolution': false,
        // 属于“有助于调试的标志”！！！
        // 不推荐使用
        // 'diagnostics': true,
        // 属于“有助于调试的标志”！！！
        // 您可以使用此标志来发现TypeScript在编译时花费的时间。这是一个用于了解代码库整体性能特征的工具。
        'extendedDiagnostics': true,
        // 属于“有助于调试的标志”！！！
        // 启用此选项后，TypeScript将避免重新检查/重新生成所有真正可能受影响的文件，并且只重新检查/重新生成已更改的文件以及直接导入它们的文件。
        // 这可以被认为是监视算法的“快速和松散”实现，它可以大大减少增量重建时间，但代价是必须偶尔运行完整的构建以获取所有编译器错误消息。
        'assumeChangesOnlyAffectDirectDependencies': true,
        // 属于“有助于调试的标志”！！！
        // 只发出.d.ts文件；不发出.js文件。 此设置在两种情况下很有用：
        // 1、您正在使用TypeScript以外的其他编译器来生成JavaScript。
        // 2、您正在使用TypeScript仅为使用者生成d.ts文件。
        'emitDeclarationOnly': false,
        // 属于“有助于调试的标志”！！！
        // 此标志控制导入的工作方式，共有3种不同的选项：
        // 该标志起作用是因为您可以使用导入类型来显式创建一个导入语句，该语句永远不会发送到JavaScript中。
        // remove 删除仅引用类型的导入语句的默认行为。
        // preserve 保留所有从不使用值或类型的导入语句。这可能导致保留导入/副作用。
        // error 这将保留所有导入（与preserve选项相同），但当值导入仅用作类型时将出错。如果希望确保没有意外导入值，但仍使副作用导入显式化，则这可能很有用。
        // 优先设置成“remove”，但是fork-ts-checker-webpack-plugin插件建议设置成“preserve”，如果TypeScript >= 3.8.0的话！！！
        'importsNotUsedAsValues': 'preserve',
        // 属于“有助于调试的标志”！！！
        // 编译JSX Elements时，更改.js文件中调用的函数。最常见的更改是使用“ h”或“ preact.h”，而不是默认的“ React.createElement”（如果使用preact）。
        // 该属性不能和“reactNamespace”一起使用！
        'jsxFactory': 'h',
        // 说是识别不到这个编译选项，因为TS 4.0才开始启动的
        'jsxFragmentFactory': 'Fragment',
        // 属于“有助于调试的标志”！！！
        // 允许导入扩展名为“ .json”的模块，这是节点项目中的常见做法。这包括基于静态JSON形状为导入生成类型。
        'resolveJsonModule': true,
        // 不推荐使用
        // 'charset': 'utf8',
        'emitBOM': false,
        'newLine': 'crlf',
        // 不推荐使用
        // 'noErrorTruncation': true,
        // 禁用自动包含任何库文件。如果设置此选项，则忽略lib。
        'noLib': false,
        // 默认情况下，TypeScript将检查导入和引用指令的初始文件集，并将这些解析文件添加到程序中。
        // 如果设置了noResolve，则不会发生此过程。但是，仍然会检查import语句以查看它们是否解析为有效模块，因此您需要确保通过其他方法满足这一要求。
        'noResolve': false,
        // 不要为JSDoc注释中包含@internal注释的代码发出声明。这是一个内部编译器选项；请自行承担使用风险，因为编译器不会检查结果是否有效。
        // 如果您正在搜索一个工具来处理d.ts文件中的其他可见性级别，请查看api提取器。
        // @internal
        'stripInternal': true,
        // 为避免在处理非常大的JavaScript项目时可能出现的内存膨胀问题，TypeScript将分配的内存量有上限。开启此标志将删除限制。
        'disableSizeLimit': true,
        // 禁用项目引用重定向的源
        // 在处理复合TypeScript项目时，此选项提供了一种方法，可返回到3.7之前的行为，其中d.ts文件用作模块之间的边界。在3.7中，真理的源头就是您的TypeScript文件。
        'disableSourceOfProjectReferenceRedirect': true,
        // 禁用解决方案搜索
        // 使用复合类型脚本项目时，此选项提供了一种方法，用于声明在编辑器中使用“查找所有引用”或“跳转到定义”等功能时不希望包含项目。
        // 这个标志可以用来提高大型复合项目的响应性。
        'disableSolutionSearching': true,
        'noImplicitUseStrict': false,
        'noEmitHelpers': false,
        // 如果报告了任何错误，请不要发出编译器输出文件，如JavaScript源代码、源映射或声明。
        // 这默认为false，使在类似于监视的环境中使用TypeScript更容易，在这种环境中，在确保解决所有错误之前，您可能希望在另一个环境中查看代码更改的结果。
        'noEmitOnError': true,
        // 不要在生成的代码中擦除const枚举声明。 const枚举提供一种方法，该方法通过发出枚举值（而不是引用）来减少应用程序在运行时的总体内存占用。
        // const枚举的默认行为是将任何Album.Something转换为相应的数字文字，并从JavaScript中完全删除对该枚举的引用。
        // 将preserveConstEnums设置为true时，枚举在运行时存在并且仍会发出数字。
        // 这实质上使此类const枚举仅具有源代码功能，而没有运行时跟踪。
        'preserveConstEnums': true,
        'declarationDir': './test/',
        // 跳过默认库声明文件的类型检查。
        'skipLibCheck': true,
        // 改用如上选项，本选项算是弃用了。
        // 'skipDefaultLibCheck': true,
        // 设置为false可禁用有关未使用标签的警告。 标签在JavaScript中很少见，通常表示尝试编写对象文字：
        // false，会启用无法访问到的代码的错误检查；true，表示关闭这种检查。
        'allowUnusedLabels': false,
        // 设置为false可禁用有关无法访问代码的警告。这些警告仅与由于使用JavaScript语法而无法访问的代码有关
        // 这不会影响基于类型分析似乎无法到达的基于代码的错误。false，会启用无法访问到的代码的错误检查；true，表示关闭这种检查。
        'allowUnreachableCode': true,
        // true将禁用报告多余的属性错误
        // 添加此标志是为了帮助人们迁移到TypeScript 1.6中对新对象文字进行更严格的检查。
        // 我们不建议在现代代码库中使用此标志，您可以使用'// @ts-ignore'抑制一次性需要的情况。
        'suppressExcessPropertyErrors': false,
        // 启用“suppressImplicitAnyIndexErrors”将禁止在索引到对象时报告有关隐式Any的错误
        // 使用suppressImplicitAnyIndexErrors是一种非常严格的方法。建议使用'// @ts-ignore'注释代替
        'suppressImplicitAnyIndexErrors': false,
        // 设置此选项后，如果程序试图通过与磁盘上的大小写不同的大小写来包含文件，则TypeScript将发出错误。
        'forceConsistentCasingInFileNames': true,
        // 在节点模块下搜索和加载JavaScript文件的最大依赖深度。
        // 此标志只能在启用allowJs时使用，如果要在节点模块中为所有JavaScript设置TypeScript推断类型，则使用此标志。
        // 理想情况下，该值应保持在0（默认值），并且应使用d.ts文件显式定义模块的形状。但是，在某些情况下，您可能希望以牺牲速度和潜在准确性为代价来启用此功能。
        'maxNodeModuleJsDepth': 0,
        // 比较两个通用函数时，TypeScript将统一类型参数。
        'noStrictGenericChecks': false,
        // 此标志用作迁移到即将到来的类字段标准版本的一部分。TypeScript在TC39中被认可之前引入了类字段很多年。
        // 即将发布的规范的最新版本与TypeScript的实现具有不同的运行时行为，但语法相同。
        // 此标志将切换到即将到来的ECMA运行时行为。
        'useDefineForClassFields': true,
        // 不推荐使用
        // 'keyofStringsOnly': true,

        // Advanced End

        // Command Line Start

        // 是否将过时的控制台输出保持在监视模式下，而不是每次发生更改时都清除屏幕。true，保留
        'preserveWatchOutput': false,
        // 使用颜色和上下文对错误和消息进行样式化，默认情况下处于启用状态-使您有机会从编译器中获得较少的简洁单色消息。
        'pretty': true,

        // Command Line End

        // 这些只存在于命令行的启动命令参数中(命令参数的使用，如：tsc --project ./tsconfig.json src/*.ts) Start

        // --watch、-w
        'watch': true,

        // 这些只存在于命令行的启动命令参数中 End

        'listFilesOnly': false,
        'moduleResolution': 'node',
        'outDir': './test/',
        'rootDir': './',
        // 该属性不能和“jsxFactory”一起使用！
        // 'reactNamespace': 'React',
        'disableReferencedProjectLoad': false,
    },
    // TerserPlugin = require( 'terser-webpack-plugin' ),
    browsers_arr = [
        /*
         '> 1%',
         'last 3 major versions',
         'last 3 versions',
         'not ie < 9',
         'not ie_mob < 9',
         'not dead',
         */

        /*
         'since 2015-01-01',

         // Safari 10是首先完全支持ES6的浏览器(2016年7月)
         'iOS >= 10',
         'Safari >= 10',

         // Edge 14是首先完全支持ES6的浏览器(2016年8月)
         'Edge >= 14',

         // 开始支持ES6的时间点(2018年8月)
         'Opera >= 55',
         'OperaMobile >= 55',

         // 开始支持ES6的时间点(2017年1月)
         'Chrome >= 58',
         'Android >= 58',
         'ChromeAndroid >= 58',

         // 开始支持ES6的时间点(2017年3月)
         'Firefox >= 54',
         'FirefoxAndroid >= 54',
         // 'Firefox ESR',
         //
         // 'Node >= 10',
         //
         // 'last 2 BlackBerry major versions',
         // 'last 2 Electron major versions',
         // 'last 2 OperaMini major versions',
         // 'last 2 QQAndroid major versions',
         // 'last 2 Samsung major versions',
         // 'last 2 UCAndroid major versions',
         // 'last 2 kaios major versions',
         //
         // 'not ie <= 11',
         // 'not ie_mob <= 11',
         */

        // 以下只是用于自己设备上的浏览器
        /*
         'iOS >= 14',
         'Safari >= 14',

         'Edge >= 86',

         'Opera >= 71',
         'OperaMobile >= 71',

         'Chrome >= 86',
         'Android >= 86',
         'ChromeAndroid >= 86',

         'Firefox >= 81',
         'FirefoxAndroid >= 81',
         */

        // 专门在最新稳定版本的谷歌浏览器上测试用
        'Chrome >= 86',
    ],
    postCSSLoader_fun = isPro => ( {
        loader: 'postcss-loader',
        options: {
            execute: false,
            sourceMap: false,
            postcssOptions: {
                // 加了值为“sugarss”的会导致语法错误，因为“sugarss”是一种缩进语法！！！sugarss是基于缩进的语法，例如Sass或Stylus。
                // parser: require( 'sugarss' ),
                // stringifier: require( 'sugarss' ),
                syntax: require( 'postcss-syntax' )( {
                    /*
                     rules: [
                     {
                     test: /\.(?:[sx]?html?|[sx]ht|vue|ux|php)$/i,
                     extract: 'html',
                     },
                     {
                     test: /\.(?:markdown|md)$/i,
                     extract: 'markdown',
                     },
                     {
                     test: /\.(?:[cm]?[jt]sx?|es\d*|pac)$/i,
                     extract: 'jsx',
                     },
                     ],
                     */

                    css: require( 'postcss-safe-parser' ),
                    sass: require( 'postcss-sass' ),
                    scss: require( 'postcss-scss' ),
                    less: require( 'postcss-less' ),
                } ),

                // 当使用{Function} / require（复杂选项）时，webpack在选项中需要标识符（ident）。
                // ident可以自由命名，只要它是唯一的即可。建议命名（标识：“ postcss”）
                ident: 'postcss',
                plugins: ( () => {
                    let arr = [
                        'postcss-import',
                        [
                            'postcss-preset-env',
                            {
                                // 没有任何配置选项，PostCSS Preset Env启用第2阶段功能并支持所有浏览器。
                                // 阶段可以是0（实验）到4（稳定），也可以是false。将stage设置为false将禁用每个polyfill。仅当您打算专门使用功能选项时，这样做才有用。
                                stage: 0,
                                // features选项通过ID启用或禁用特定的polyfill。将true传递给特定功能部件ID将启用其polyfill，而将false传递将禁用它。
                                // 将对象关联到特定功能部件ID将同时启用和配置它。
                                // 没有通过功能明确启用或禁用的任何polyfill由stage选项确定。
                                features: {
                                    'custom-properties': {
                                        preserve: true,
                                    },
                                    // CSS嵌套规则
                                    'nesting-rules': true,
                                    'any-link-pseudo-class': {
                                        preserve: true,
                                    },
                                    // 设置没有值的输入的样式:
                                    // input:blank、input[blank]
                                    // <input value="" blank>、<input value="This element has a value">
                                    'blank-pseudo-class': {
                                        preserve: true,
                                    },
                                    'break-properties': true,
                                    // 不区分大小写的属性，true会启用转换: [data-attr-key = "a" i]--->[data-attr-key = "a" i],[data-attr-key = "A" i]
                                    'case-insensitive-attributes': true,
                                    'color-functional-notation': {
                                        preserve: true,
                                    },
                                    'color-mod-function': {
                                        // 有效值：throw、warn、ignore
                                        unresolved: 'throw',
                                    },
                                    'custom-media-queries': {
                                        preserve: true,
                                    },
                                    'custom-selectors': {
                                        preserve: true,
                                    },
                                    'dir-pseudo-class': {
                                        preserve: true,
                                    },
                                    'double-position-gradients': {
                                        preserve: true,
                                    },
                                    // 'environment-variables': {},
                                    'focus-visible-pseudo-class': {
                                        preserve: true,
                                    },
                                    'focus-within-pseudo-class': {
                                        preserve: true,
                                    },
                                    // PostCSS插件，可将W3C CSS(font variant properties)转换为更兼容的CSS（font-feature-settings）
                                    'font-variant-property': true,
                                    'gap-properties': {
                                        preserve: true,
                                    },
                                    'gray-function': {
                                        preserve: true,
                                    },
                                    'has-pseudo-class': {
                                        preserve: true,
                                    },
                                    'hexadecimal-alpha-notation': {
                                        preserve: true,
                                    },
                                    'image-set-function': {
                                        preserve: true,
                                        // 有效值：warn、throw、ignore
                                        onvalid: 'throw',
                                    },
                                    'lab-function': {
                                        preserve: true,
                                    },
                                    'logical-properties-and-values': {
                                        preserve: true,
                                    },
                                    // PostCSS插件将 :matches() W3C CSS伪类转换为更兼容的CSS（更简单的选择器）
                                    'matches-pseudo-class': {
                                        // 允许您在生成的选择器之间引入换行符。
                                        lineBreak: false,
                                    },
                                    // 编写简单而优美的媒体查询！
                                    'media-query-ranges': true,
                                    'not-pseudo-class': true,
                                    'overflow-property': {
                                        preserve: true,
                                    },
                                    // PostCSS插件，可将自动换行替换为自动换行。可以选择保留两个声明
                                    'overflow-wrap-property': {
                                        // 有效值：copy、replace
                                        method: 'copy',
                                    },
                                    'place-properties': {
                                        preserve: true,
                                    },
                                    'prefers-color-scheme-query': {
                                        preserve: true,
                                    },
                                    // PostCSS插件可将 rebeccapurple color 转换为rgb()
                                    'rebeccapurple-color': {
                                        preserve: true,
                                    },
                                    // 'system-ui-font-family': true,
                                },
                                browsers: browsers_arr,
                                autoprefixer: {
                                    // 如果CSS未压缩，Autoprefixer是否要使用视觉级联，true使用。
                                    cascade: true,
                                    // Autoprefixer是否要添加前缀，true添加。
                                    add: true,
                                    // Autoprefixer是否要删除过时的前缀，false不删除。
                                    remove: false,
                                    // Autoprefixer是否要为"@supports"参数添加前缀，true添加。
                                    supports: true,
                                    // Autoprefixer是否要为flexbox属性添加前缀，true添加。
                                    // 字符串值"no-2009"，则Autoprefixer只会为最终版本和IE 10版本的规范添加前缀。
                                    flexbox: true,
                                    // 有效值：false、"autoplace"、"no-autoplace"，Autoprefixer是否应为Grid Layout属性添加IE 10-11前缀？
                                    // false: 防止Autoprefixer输出CSS网格转换。
                                    // "autoplace": 启用Autoprefixer网格转换并包括自动放置支持。您还可以在CSS中使用/* autoprefixer grid: autoplace */。
                                    // "no-autoplace": 启用Autoprefixer网格转换，但不包括自动放置支持。您还可以在CSS中使用/* autoprefixer grid: no-autoplace */。
                                    // 不推荐使用true这个布尔值。
                                    grid: 'autoplace',
                                    overrideBrowserslist: browsers_arr,
                                    // 不要在Browserslist配置中的未知浏览器版本上引发错误。
                                    ignoreUnknownVersions: false,
                                },
                            }
                        ],
                        [
                            'postcss-calc',
                            {
                                precision: 6,
                                preserve: true,
                                // 当calc()不减少为单个值时添加警告。
                                warnWhenCannotResolve: false,
                                mediaQueries: true,
                                selectors: true,
                            },
                        ],
                        // 必须在postcss-simple-vars和postcss-nested之前设置此插件。
                        [
                            'postcss-mixins',
                            {
                                // 无声，删除未知的mixin，不要抛出错误。默认为false。
                                silent: false,
                            },
                        ],
                        'postcss-easings',
                        'postcss-color-hwb',
                        [
                            'postcss-color-function',
                            {
                                preserveCustomProps: true,
                            },
                        ],
                        'postcss-size',
                        'postcss-brand-colors',
                    ];

                    !isPro && ( arr.push( [
                        'postcss-browser-reporter',
                        {
                            selector: 'html::before',
                            styles: {
                                display: 'block !important',
                                position: 'fixed !important',
                                top: '0 !important',
                                right: '0 !important',
                                bottom: '0 !important',
                                left: '0 !important',
                                'z-index': '202020202020 !important',
                                content: '',
                                width: '100% !important',
                                height: '100% !important',
                                'background-color': 'red !important',
                                color: 'white !important',
                                'font-size': '14px !important',
                                overflow: 'hidden !important',
                                'white-space': 'pre-wrap !important',
                            },
                        },
                    ] ) );
                    isPro && ( arr.push( 'cssnano' ) );

                    return arr;
                } )(),
            },
        },
    } ),
    entry_obj = require( './src/js/App.js' ).pageRoutingManagement_obj,
    output_fun = ( { path, __dirname, proName_str, hashName_str } ) => ( {
        /*
         如：编译的资源都输出在dist/production下的各种一级文件夹(里面没有其他文件夹了)下，所以'../'就是向上一级，也就是定位到了根目录(dist/production)下了
         也可以指定绝对路径：'http://localhost:8081/WebProTpl/dist/production/'，一般用于正式生产环境
         */
        publicPath: '../',
        // hex base64
        hashDigest: 'hex',
        hashDigestLength: 6,
        // sha512 md5
        hashFunction: 'sha512',
        crossOriginLoading: 'anonymous',
        filename: `js/[name]_[${ hashName_str }:6].js`,
        chunkFilename: `js/[name]_chunk_[${ hashName_str }:6].js`,
        path: path.resolve( __dirname, `./dist/${ proName_str }/` ),
        pathinfo: false,
        /*
         webpack 5.X有效
         告诉webpack生成代码的最大EcmaScript版本。
         应该是以下之一：
         should be >= 5, should be <= 11
         should be >= 2009, should be <= 2020
         */
        // ecmaVersion: 2018,
    } ),
    resolve_fun = ( path, __dirname, isPro_boo ) => ( {
        alias: {
            echartsESM: isPro_boo
                        ? 'echarts/dist/echarts.min.js'
                        : 'echarts/dist/echarts.js',
            elementUIESMCSS: 'element-ui/lib/theme-chalk/index.css',
            elementUIESM: 'element-ui/lib/index.js',
            jQueryESM: isPro_boo
                       ? 'jquery/dist/jquery.min.js'
                       : 'jquery/dist/jquery.js',
            swiperESMCSS: isPro_boo
                          ? 'swiper/swiper-bundle.min.css'
                          : 'swiper/swiper-bundle.css',
            swiperESM: isPro_boo
                       ? 'swiper/swiper-bundle.min.js'
                       : 'swiper/swiper-bundle.js',
            vueESM: isPro_boo
                    ? 'vue/dist/vue.min.js'
                    : 'vue/dist/vue.js',
            vueRouterESM: isPro_boo
                          ? 'vue-router/dist/vue-router.min.js'
                          : 'vue-router/dist/vue-router.js',
            vuexESM: isPro_boo
                     ? 'vuex/dist/vuex.min.js'
                     : 'vuex/dist/vuex.js',

            CompESM: path.resolve( __dirname, './src/components/Components.esm.js' ),

            CTESM: path.resolve( __dirname, './src/js/tools/CurrencyTools.esm.js' ),
            DecESM: path.resolve( __dirname, './src/js/tools/Decorator4ES6.esm.js' ),
            HTML2C4ESM: path.resolve( __dirname, './src/js/tools/HTML2Canvas.esm.js' ),
            WebCESM: path.resolve( __dirname, './src/js/tools/WebComponents.esm.js' ),
            WorkersESM: path.resolve( __dirname, './src/js/tools/Workers4MT.esm.js' ),

            configDir: path.resolve( __dirname, './configures/' ),

            jsonDir: path.resolve( __dirname, './src/assets/doc/json/' ),
            json5Dir: path.resolve( __dirname, './src/assets/doc/json5/' ),
            txtDir: path.resolve( __dirname, './src/assets/doc/txt/' ),
            xmlDir: path.resolve( __dirname, './src/assets/doc/xml/' ),
            fontsDir: path.resolve( __dirname, './src/assets/fonts/' ),
            imgDir: path.resolve( __dirname, './src/assets/img/' ),
            musicDir: path.resolve( __dirname, './src/assets/music/' ),
            videosDir: path.resolve( __dirname, './src/assets/videos/' ),

            compDir: path.resolve( __dirname, './src/components/' ),

            // 注意事项去看：notes/关于在JS和TS文件中导入和使用graphql文件时出现的BUG以及注意事项说明.txt
            gQLAPIDir: path.resolve( __dirname, './src/graphQL/api/' ),

            jsDir: path.resolve( __dirname, './src/js/' ),
            jsMDir: path.resolve( __dirname, './src/js/modules/' ),
            jsPDir: path.resolve( __dirname, './src/js/pages/' ),
            jsPubDir: path.resolve( __dirname, './src/js/public/' ),
            jsTDir: path.resolve( __dirname, './src/js/tools/' ),

            manifestDir: path.resolve( __dirname, './src/pwa4Manifest/' ),

            cssDir: path.resolve( __dirname, './src/styles/css/' ),
            cssBDir: path.resolve( __dirname, './src/styles/css/basic/' ),
            cssMDir: path.resolve( __dirname, './src/styles/css/modules/' ),
            cssPDir: path.resolve( __dirname, './src/styles/css/pages/' ),
            cssPubDir: path.resolve( __dirname, './src/styles/css/public/' ),

            lessDir: path.resolve( __dirname, './src/styles/less/' ),
            lessBDir: path.resolve( __dirname, './src/styles/less/basic/' ),
            lessMDir: path.resolve( __dirname, './src/styles/less/modules/' ),
            lessPDir: path.resolve( __dirname, './src/styles/less/pages/' ),
            lessPubDir: path.resolve( __dirname, './src/styles/less/public/' ),

            sassDir: path.resolve( __dirname, './src/styles/sass/' ),
            sassBDir: path.resolve( __dirname, './src/styles/sass/basic/' ),
            sassMDir: path.resolve( __dirname, './src/styles/sass/modules/' ),
            sassPDir: path.resolve( __dirname, './src/styles/sass/pages/' ),
            sassPubDir: path.resolve( __dirname, './src/styles/sass/public/' ),

            scssDir: path.resolve( __dirname, './src/styles/scss/' ),
            scssBDir: path.resolve( __dirname, './src/styles/scss/basic/' ),
            scssMDir: path.resolve( __dirname, './src/styles/scss/modules/' ),
            scssPDir: path.resolve( __dirname, './src/styles/scss/pages/' ),
            scssPubDir: path.resolve( __dirname, './src/styles/scss/public/' ),

            pcssDir: path.resolve( __dirname, './src/styles/postcss/' ),
            pcssBDir: path.resolve( __dirname, './src/styles/postcss/basic/' ),
            pcssMDir: path.resolve( __dirname, './src/styles/postcss/modules/' ),
            pcssPDir: path.resolve( __dirname, './src/styles/postcss/pages/' ),
            pcssPubDir: path.resolve( __dirname, './src/styles/postcss/public/' ),

            stylDir: path.resolve( __dirname, './src/styles/stylus/' ),
            stylBDir: path.resolve( __dirname, './src/styles/stylus/basic/' ),
            stylMDir: path.resolve( __dirname, './src/styles/stylus/modules/' ),
            stylPDir: path.resolve( __dirname, './src/styles/stylus/pages/' ),
            stylPubDir: path.resolve( __dirname, './src/styles/stylus/public/' ),

            tplEJSDir: path.resolve( __dirname, './src/tplEJS/' ),
            tplEJSBDir: path.resolve( __dirname, './src/tplEJS/basic/' ),
            tplEJSMLDir: path.resolve( __dirname, './src/tplEJS/basic/metaLink/' ),
            tplEJSMDir: path.resolve( __dirname, './src/tplEJS/modules/' ),
            tplEJSPDir: path.resolve( __dirname, './src/tplEJS/pages/' ),
            tplEJSPubDir: path.resolve( __dirname, './src/tplEJS/public/' ),

            tplHTMLDir: path.resolve( __dirname, './src/tplHTML/' ),
            tplHTMLBDir: path.resolve( __dirname, './src/tplHTML/basic/' ),
            tplHTMLMDir: path.resolve( __dirname, './src/tplHTML/modules/' ),
            tplHTMLPDir: path.resolve( __dirname, './src/tplHTML/pages/' ),
            tplHTMLPubDir: path.resolve( __dirname, './src/tplHTML/public/' ),

            vueDir: path.resolve( __dirname, './src/vue/' ),
            vueCompDir: path.resolve( __dirname, './src/vue/components/' ),
            vueMDir: path.resolve( __dirname, './src/vue/models/' ),
            vueRDir: path.resolve( __dirname, './src/vue/routers/' ),
            vueSDir: path.resolve( __dirname, './src/vue/stores/' ),
            vueStyDir: path.resolve( __dirname, './src/vue/styles/' ),
            vueVDir: path.resolve( __dirname, './src/vue/views/' ),

            wasmDir: path.resolve( __dirname, './src/wasm/' ),
            wasmBDir: path.resolve( __dirname, './src/wasm/basic/' ),
            wasmMDir: path.resolve( __dirname, './src/wasm/modules/' ),
            wasmPDir: path.resolve( __dirname, './src/wasm/pages/' ),
            wasmPubDir: path.resolve( __dirname, './src/wasm/public/' ),

            webCDir: path.resolve( __dirname, './src/webComponents/' ),

            serviceWorkersDir: path.resolve( __dirname, './src/workers/serviceWorkers/' ),
            sWorkersDir: path.resolve( __dirname, './src/workers/sharedWorkers/' ),
            tWorkersDir: path.resolve( __dirname, './src/workers/tools/' ),
            wWorkersDir: path.resolve( __dirname, './src/workers/webWorkers/' ),
        },
        modules: [
            'node_modules',
        ],
        symlinks: false,
    } ),
    externals_obj = {
        win_echarts: 'window.echarts',
        win_ELEMENT: 'window.ELEMENT',
        win_$: 'window.$',
        win_jQuery: 'window.jQuery',
        win_Swiper: 'window.Swiper',
        win_Vue: 'window.Vue',
        win_VueRouter: 'window.VueRouter',
        win_Vuex: 'window.Vuex',
    },
    node_obj = {
        fs: 'empty',
        // path: 'empty',
        // crypto: 'empty',
    },
    performance_obj = {
        hints: 'warning',
        // 50MB
        maxAssetSize: 52428800,
        // 50MB
        maxEntrypointSize: 52428800,
    },
    optimization_fun = ( isPro, isTest = true ) => {
        /*
         // 有效的配置选项！！！
         {
         checkWasmTypes
         // chunkIds: "deterministic"这个值已经无效了！！！可能在“Webpack 5”中有效！！！
         chunkIds
         concatenateModules
         flagIncludedChunks
         hashedModuleIds
         mangleWasmImports
         mergeDuplicateChunks
         minimize
         minimizer
         // moduleIds: "deterministic"这个值已经无效了！！！可能在“Webpack 5”中有效！！！
         moduleIds
         namedChunks
         namedModules
         noEmitOnErrors
         nodeEnv
         occurrenceOrder
         portableRecords
         providedExports
         removeAvailableModules
         removeEmptyChunks
         runtimeChunk
         sideEffects
         splitChunks
         usedExports
         }
         */
        return isPro
               ? {
                runtimeChunk: {
                    name: entryPoint => `Runtime_${ entryPoint.name }`,
                },
                minimize: true,
                /*
                 minimizer: [
                 new TerserPlugin( {
                 test: /\.m?js(\?.*)?$/i,
                 include: [
                 path.resolve( __dirname, './src/components/' ),
                 path.resolve( __dirname, './src/js/' ),
                 path.resolve( __dirname, './src/vue/' ),
                 path.resolve( __dirname, './src/webComponents/' ),
                 ],
                 exclude: [
                 path.resolve( __dirname, './assistTools/' ),
                 path.resolve( __dirname, './backups/' ),
                 path.resolve( __dirname, './bats/' ),
                 path.resolve( __dirname, './configures/' ),
                 path.resolve( __dirname, './dist/' ),
                 path.resolve( __dirname, './node_modules/' ),
                 path.resolve( __dirname, './notes/' ),
                 path.resolve( __dirname, './simServer/' ),
                 path.resolve( __dirname, './simServer4Deno/' ),
                 path.resolve( __dirname, './test/' ),
                 path.resolve( __dirname, './webpackRecords/' ),

                 path.resolve( __dirname, './src/assets/' ),
                 path.resolve( __dirname, './src/graphQL/' ),
                 path.resolve( __dirname, './src/pwa4Manifest/' ),
                 path.resolve( __dirname, './src/static/' ),
                 path.resolve( __dirname, './src/styles/' ),
                 path.resolve( __dirname, './src/tplEJS/' ),
                 path.resolve( __dirname, './src/tplHTML/' ),
                 path.resolve( __dirname, './src/wasm/' ),
                 path.resolve( __dirname, './src/workers/' ),
                 ],
                 chunkFilter: chunk => true,
                 cache: true,
                 parallel: osLen,
                 sourceMap: false,
                 terserOptions: {
                 // 传递5、6、7、8，会覆盖parse、compress和output这三个选项的ecma选项
                 // ecma: 5,
                 // 值也可以是字符串：'verbose'
                 warnings: true,
                 parse: {
                 // 支持顶层返回语句
                 bare_returns: true,
                 // 指定5、6、7或8中的一个。注意：除了函数参数列表中的ES8可选尾随逗号和使用ecma 8的调用之外，此设置目前不强制执行。
                 // 默认为 8
                 ecma: 8,
                 html5_comments: false,
                 // 支持 #!command 作为第一行
                 shebang: true,
                 },
                 // 压缩选项
                 compress: {
                 // 测试一下！！！
                 arrows: true,
                 // 尽可能用函数参数名替换 arguments[index]。
                 arguments: false,
                 // !!a ? b : c → a ? b : c
                 booleans: true,
                 booleans_as_integers: false,
                 collapse_vars: true,
                 comparisons: true,
                 computed_props: true,
                 conditionals: true,
                 dead_code: true,
                 // 传递false可禁用大多数默认启用的压缩转换。当您只想启用几个压缩选项而禁用其余压缩选项时很有用。
                 defaults: true,
                 // 删除冗余或非标准指令
                 directives: true,
                 drop_console: !isTest,
                 drop_debugger: !isTest,
                 // 通过6或更高级别以启用压缩选项，这些选项会将ES5代码转换为较小的ES6 +等效形式。
                 // 默认 5
                 ecma: 5,
                 // 尝试评估常量表达式
                 evaluate: true,
                 expression: false,
                 // 定义全局常量
                 global_defs: {},
                 // 提升function声明
                 hoist_funs: false,
                 // 将属性从常量对象和数组文字提升为受一组约束的正则变量。例如：var o={p:1，q:2}；f（o.p，o.q）；被转换为f（1，2）；。
                 // 注意：在启用mangle、compress选项设置为2或更高、compress选项toplever启用的情况下，提升支柱的工作效果最佳。
                 hoist_props: true,
                 hoist_vars: false,
                 // if/return 和 if/continue 的优化
                 if_return: true,
                 inline: true,
                 join_vars: true,
                 keep_classnames: true,
                 keep_fargs: true,
                 keep_fnames: true,
                 keep_infinity: true,
                 // 当我们可以静态确定条件时，对do，while和for循环进行优化。
                 loops: true,
                 // 压缩ES6模块时传递true。默认严格模式，也隐含顶层选项。
                 module: true,
                 negate_iife: true,
                 passes: 1,
                 // foo["bar"] → foo.bar
                 properties: true,
                 pure_funcs: null,
                 pure_getters: 'strict',
                 // 传统选项，为向后兼容而被安全忽略
                 // reduce_funcs: '这个属性的值文档没说是什么类型的数据类型',
                 // 改善分配给变量并用作常量值的变量的优化。
                 reduce_vars: true,
                 // 如果此选项设置为true，则默认序列限制为200。
                 sequences: 20,
                 side_effects: true,
                 switches: true,
                 // 在顶级范围内删除未引用的函数（“ funcs”）和/或变量（“ vars”）（默认为false，为true时将同时删除未引用的函数和变量）
                 toplevel: true,
                 // 防止未使用的特定顶级函数和变量被删除（可以是数组，逗号分隔，RegExp或函数。表示顶级）
                 top_retain: null,
                 // 将typeof foo ==“ undefined”转换为foo === void0。注意：由于已知问题，建议将IE10和更早版本的此值设置为false。
                 typeofs: false,
                 // 应用“不安全的”转换
                 unsafe: false,
                 // 此转换要求将ecma compress选项设置为6或更高。
                 unsafe_arrows: false,
                 // 只有 comparisons 和 unsafe_comps 都设置为true时，压缩才起作用。
                 unsafe_comps: false,
                 unsafe_Function: false,
                 // 将 2 * num1 * 3 之类的数值表达式优化为 6 * num1，可能会产生不精确的浮点结果。
                 unsafe_math: false,
                 unsafe_methods: false,
                 unsafe_proto: false,
                 unsafe_regexp: false,
                 unsafe_undefined: false,
                 // 删除未引用的函数和变量。除非设置为字符串"keep_assign"，否则简单的直接变量分配不会算作引用
                 unused: true,
                 // 删除无法访问的代码或未使用的声明等时显示警告。true会启用警告！！！
                 warnings: true,
                 },
                 mangle: {
                 eval: true,
                 keep_classnames: true,
                 keep_fnames: true,
                 // ES6模块，其中顶级作用域不是全局作用域。表示顶级。
                 module: true,
                 reserved: [],
                 toplevel: true,
                 safari10: true,
                 properties: {
                 builtins: false,
                 debug: false,
                 keep_quoted: true,
                 regex: null,
                 reserved: [],
                 undeclared: false,
                 },
                 },
                 module: true,
                 output: {
                 ascii_only: false,
                 beautify: false,
                 braces: true,
                 comments: false,
                 // 默认 5
                 ecma: 5,
                 // 默认 4
                 indent_level: 0,
                 indent_start: 0,
                 inline_script: false,
                 keep_quoted_props: true,
                 max_line_len: false,
                 preamble: null,
                 quote_keys: true,
                 quote_style: 0,
                 safari10: true,
                 semicolons: true,
                 shebang: true,
                 webkit: false,
                 wrap_iife: true,
                 wrap_func_args: true,
                 },
                 toplevel: true,
                 nameCache: null,
                 // true表示支持 IE8
                 ie8: false,
                 keep_classnames: true,
                 keep_fnames: true,
                 safari10: true,
                 },
                 extractComments: false,
                 warningsFilter: ( warning, source, file ) => true,
                 } ),
                 ],
                 */
                noEmitOnErrors: true,
                namedModules: false,
                namedChunks: false,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                moduleIds: 'hashed',
                checkWasmTypes: true,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                chunkIds: 'total-size',
                nodeEnv: 'production',
                mangleWasmImports: false,
                removeAvailableModules: true,
                removeEmptyChunks: true,
                mergeDuplicateChunks: true,
                flagIncludedChunks: true,
                occurrenceOrder: true,
                providedExports: true,
                usedExports: true,
                concatenateModules: true,
                sideEffects: true,
                portableRecords: true,
                // 这个选项无效了！！！
                // mangleExports: true,
            }
               : {
                runtimeChunk: {
                    name: entryPoint => `Runtime_${ entryPoint.name }`,
                },
                minimize: false,
                noEmitOnErrors: true,
                namedModules: true,
                namedChunks: true,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                moduleIds: 'named',
                checkWasmTypes: true,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                chunkIds: 'named',
                nodeEnv: 'development',
                mangleWasmImports: false,
                removeAvailableModules: true,
                removeEmptyChunks: true,
                mergeDuplicateChunks: true,
                flagIncludedChunks: true,
                occurrenceOrder: true,
                providedExports: true,
                usedExports: true,
                concatenateModules: true,
                sideEffects: true,
                portableRecords: true,
                // 这个选项无效了！！！
                // mangleExports: true,
            };
    },
    // 如果定义的值是字符串值，得单引号内部嵌套双引号，如：'"例子"'，否则没法真正输出这个字符串
    defineObj_fun = isPro => ( {
        isPro,
        localURL: '"/localURL/"',
        proURL: '"/proURL/"',

        // 开发服(端口：8081) http://192.168.1.144:8081/graphql
        devURL: '"/devURL/"',
        // 开发服(端口：8099) http://192.168.1.144:8099/graphql
        devURL8099: '"/devURL8099/"',
        // 开发服(连刘家敏的台式机无线，端口：8099) http://192.168.137.135:8099/graphql
        devURL8099A: '"/devURL8099A/"',
        // 测试服 http://192.168.1.101:8080/graphql
        testURL: '"/testURL/"',
        // 内网穿透 http://sn2020a.nat300.top/graphql
        devURL2Natapp: '"/devURL2Natapp/"',
        // 邓龙光(连接开发机无线网络时的IP) http://192.168.137.77:8090/graphql
        devURL4DLG1: '"/devURL4DLG1/"',
        // 梁鑫(连接开发机无线网络时的IP) http://192.168.137.217:8090/graphql
        devURL4LX1: '"/devURL4LX1/"',
        // 戴海涛 http://192.168.1.147:8081/graphql
        devURL4DHT: '"/devURL4DHT/"',
    } ),
    splitChunks_obj = {
        chunks: 'all',
        // 单位：字节
        minSize: 1 * 1024 * 1024,
        // 单位：字节
        // maxSize: 10 * 1024 * 1024,
        hidePathInfo: true,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '_',
        automaticNameMaxLength: 109,
        name: true,
        cacheGroups: require( './src/js/App.js' ).isSPA_booC
                     ? ( ( ( start_num = 100000000 ) => {
                let styleType_arr = [
                        'css',
                        'less',
                        'sass',
                        'scss',
                        'postcss',
                        'stylus',
                    ],
                    obj = {
                        VendorsDir_CSS: {
                            test: /node_modules[\\/].*\.css$/,
                            name: 'VendorsDir_CSS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `Basic_Colors_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]basic[\\\\/](Basic.${ c }|Colors.${ c })$` ),
                                    name: `Basic_Colors_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `BasicDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]basic[\\\\/](?!Basic.${ c }|Colors.${ c }).*\\.${ c }$` ),
                                    name: `BasicDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `ComponentsDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]components[\\\\/][^(/)]+[\\\\/].*\\.${ c }$` ),
                                    name: `ComponentsDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),
                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `Components_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]components[\\\\/][^(/)]+\\.${ c }$` ),
                                    name: `Components_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `WebComponentsDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]webComponents[\\\\/].*\\.${ c }$` ),
                                    name: `WebComponentsDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `PublicDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]public[\\\\/].*\\.${ c }$` ),
                                    name: `PublicDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `ModulesDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]modules[\\\\/].*\\.${ c }$` ),
                                    name: `ModulesDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `VueComponentsDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/][^(/)]+[\\\\/].*\\.${ c }$` ),
                                    name: `VueComponentsDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),
                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `VueComponents_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/][^(/)]+\\.${ c }$` ),
                                    name: `VueComponents_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `VueStylesDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]vue[\\\\/]styles[\\\\/].*\\.${ c }$` ),
                                    name: `VueStylesDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `PagesDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]pages[\\\\/].*\\.${ c }$` ),
                                    name: `PagesDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        VendorsDir_JS: ( arr => {
                            return {
                                test: new RegExp( `node_modules[\\\\/](?!${ arr.map( ( c, i, a ) => c + '[\\\\/]' )
                                                                               .join( '|' ) }).*\\.js$` ),
                                name: 'VendorsDir_JS',
                                // 数值越高越先添加加载
                                // priority: 1000,
                                enforce: true,
                                reuseExistingChunk: true
                            };
                        } )( [
                            'echarts',
                            'jquery',
                            'swiper',
                            'vue',
                            'vue-router',
                            'vuex',
                        ] ),
                        VendorsToolsDir_JS: ( arr => {
                            return {
                                test: new RegExp( `node_modules[\\\\/](${ arr.map( ( c, i, a ) => c + '[\\\\/]' )
                                                                             .join( '|' ) }).*\\.js$` ),
                                name: 'VendorsToolsDir_JS',
                                // 数值越高越先添加加载
                                // priority: 1000,
                                enforce: true,
                                reuseExistingChunk: true
                            };
                        } )( [
                            'echarts',
                            'jquery',
                            'swiper',
                            'vue',
                            'vue-router',
                            'vuex',
                        ] ),
                        ToolsDir_JS: {
                            test: /src[\\/]js[\\/]tools[\\/].*\.js$/,
                            name: 'ToolsDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        WASMBasicDir: {
                            test: /src[\\/]wasm[\\/]basic[\\/]/,
                            name: 'WASMBasicDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WASMPublicDir: {
                            test: /src[\\/]wasm[\\/]public[\\/]/,
                            name: 'WASMPublicDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WASMModulesDir: {
                            test: /src[\\/]wasm[\\/]modules[\\/]/,
                            name: 'WASMModulesDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WASMPagesDir: {
                            test: /src[\\/]wasm[\\/]pages[\\/]/,
                            name: 'WASMPagesDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        GQLAPIDir_JS: {
                            test: /src[\\/]graphQL[\\/]api[\\/].*\.(graphql|gql)$/,
                            name: 'GQLAPIDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        ComponentsDir_JS: {
                            test: new RegExp( `src[\\\\/]components[\\\\/][^(/)]+[\\\\/].*\\.js$` ),
                            name: 'ComponentsDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        Components_JS: {
                            test: new RegExp( `src[\\\\/]components[\\\\/][^(/)]+\\.js$` ),
                            name: 'Components_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WebComponentsDir_JS: {
                            test: /src[\\/]webComponents[\\/].*\.js$/,
                            name: 'WebComponentsDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        PublicDir_JS: {
                            test: /src[\\/]js[\\/]public[\\/].*\.js$/,
                            name: 'PublicDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        ModulesDir_JS: {
                            test: /src[\\/]js[\\/]modules[\\/].*\.js$/,
                            name: 'ModulesDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        VueRoutersDir_JS: {
                            test: /src[\\/]vue[\\/]routers[\\/].*\.js$/,
                            name: 'VueRoutersDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        VueStoresDir_JS: {
                            test: /src[\\/]vue[\\/]stores[\\/].*\.js$/,
                            name: 'VueStoresDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        VueComponentsDir_JS: {
                            test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/][^(/)]+[\\\\/].*\\.js$` ),
                            name: 'VueComponentsDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        VueComponents_JS: {
                            test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/][^(/)]+\\.js$` ),
                            name: 'VueComponents_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        VueModelsDir_JS: {
                            test: /src[\\/]vue[\\/]models[\\/].*\.js$/,
                            name: 'VueModelsDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        PagesDir_JS: {
                            test: /src[\\/]js[\\/]pages[\\/].*\.js$/,
                            name: 'PagesDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        /*
                         default: {
                         minChunks: 2,
                         // 数值越高越先添加加载
                         // priority: -10,
                         reuseExistingChunk: true,
                         },
                         */
                    };

                Object.entries( obj )
                      .forEach( ( c, i, ) => {
                          c[ 1 ].priority = start_num - i;
                      } );

                return obj;
            } )( 100000000 ) )
                     : ( ( ( start_num = 100000000 ) => {
                let fun = c => {
                        let arr1 = [ ...c ];

                        return `${ arr1.shift()
                                       .toLocaleUpperCase() }${ arr1.join( '' ) }`.replace( new RegExp( '[^a-zA-Z0-9_@]', 'g' ), '' );
                    },
                    styleType_arr = [
                        'css',
                        'less',
                        'sass',
                        'scss',
                        'postcss',
                        'stylus',
                    ],
                    obj = {
                        VendorsDir_CSS: {
                            test: /node_modules[\\/].*\.css$/,
                            name: 'VendorsDir_CSS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `Basic_Colors_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]basic[\\\\/](Basic.${ c }|Colors.${ c })$` ),
                                    name: `Basic_Colors_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `BasicDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]basic[\\\\/](?!Basic.${ c }|Colors.${ c }).*\\.${ c }$` ),
                                    name: `BasicDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        // ./src/components/xxx/
                        ...( arr => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/components' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/components/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  arr.forEach( ( c1, i1, a1 ) => {
                                      str1 = fun( c );

                                      result_obj[ `Components_${ str1 }_${ c1.toLocaleUpperCase() }` ] = {
                                          test: new RegExp( `src[\\\\/]components[\\\\/]${ c }[\\\\/].*\\.${ c1 }$` ),
                                          name: `Components_${ str1 }_${ c1.toLocaleUpperCase() }`,
                                          // 数值越高越先添加加载
                                          // priority: 1000,
                                          enforce: true,
                                          reuseExistingChunk: true
                                      };
                                  } );
                              } );

                            return result_obj;
                        } )( styleType_arr ),
                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `Components_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]components[\\\\/][^(/)]+\\.${ c }$` ),
                                    name: `Components_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        // ./src/webComponents/xxx/
                        ...( arr => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/webComponents' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/webComponents/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  arr.forEach( ( c1, i1, a1 ) => {
                                      str1 = fun( c );

                                      result_obj[ `WebComponents_${ str1 }_${ c1.toLocaleUpperCase() }` ] = {
                                          test: new RegExp( `src[\\\\/]webComponents[\\\\/]${ c }[\\\\/].*\\.${ c1 }$` ),
                                          name: `WebComponents_${ str1 }_${ c1.toLocaleUpperCase() }`,
                                          // 数值越高越先添加加载
                                          // priority: 1000,
                                          enforce: true,
                                          reuseExistingChunk: true
                                      };
                                  } );
                              } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `PublicDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]public[\\\\/].*\\.${ c }$` ),
                                    name: `PublicDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `ModulesDir_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]modules[\\\\/].*\\.${ c }$` ),
                                    name: `ModulesDir_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        // ./src/vue/components/xxx/
                        ...( arr => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/vue/components' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/vue/components/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  arr.forEach( ( c1, i1, a1 ) => {
                                      str1 = fun( c );

                                      result_obj[ `VueComponents_${ str1 }_${ c1.toLocaleUpperCase() }` ] = {
                                          test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/]${ c }[\\\\/].*\\.${ c1 }$` ),
                                          name: `VueComponents_${ str1 }_${ c1.toLocaleUpperCase() }`,
                                          // 数值越高越先添加加载
                                          // priority: 1000,
                                          enforce: true,
                                          reuseExistingChunk: true
                                      };
                                  } );
                              } );

                            return result_obj;
                        } )( styleType_arr ),
                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `VueComponents_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/][^(/)]+\\.${ c }$` ),
                                    name: `VueComponents_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        // ./src/vue/styles/xxx/
                        ...( arr => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/vue/styles' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/vue/styles/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  arr.forEach( ( c1, i1, a1 ) => {
                                      str1 = fun( c );

                                      result_obj[ `VueStyles_${ str1 }_${ c1.toLocaleUpperCase() }` ] = {
                                          test: new RegExp( `src[\\\\/]vue[\\\\/]styles[\\\\/]${ c }[\\\\/].*\\.${ c1 }$` ),
                                          name: `VueStyles_${ str1 }_${ c1.toLocaleUpperCase() }`,
                                          // 数值越高越先添加加载
                                          // priority: 1000,
                                          enforce: true,
                                          reuseExistingChunk: true
                                      };
                                  } );
                              } );

                            return result_obj;
                        } )( styleType_arr ),
                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `VueStyles_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]vue[\\\\/]styles[\\\\/][^(/)]+\\.${ c }$` ),
                                    name: `VueStyles_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        // ./src/styles
                        ...( arr => {
                            let result_obj = {},
                                str1;

                            arr.forEach( ( c1, i1, a1 ) => {
                                fs.readdirSync( path.join( __dirname, `./src/styles/${ c1 }/pages` ) )
                                  .filter( ( c, i, a ) => {
                                      return fs.statSync( path.join( __dirname, `./src/styles/${ c1 }/pages/${ c }` ) )
                                               .isDirectory();
                                  } )
                                  .filter( ( c, i, a ) => true )
                                  .forEach( ( c, i, a ) => {
                                      str1 = fun( c );

                                      result_obj[ `Pages_${ str1 }_${ c1.toLocaleUpperCase() }` ] = {
                                          test: new RegExp( `src[\\\\/]styles[\\\\/]${ c1 }[\\\\/]pages[\\\\/]${ c }[\\\\/].*\\.${ c1 }$` ),
                                          name: `Pages_${ str1 }_${ c1.toLocaleUpperCase() }`,
                                          // 数值越高越先添加加载
                                          // priority: 1000,
                                          enforce: true,
                                          reuseExistingChunk: true
                                      };
                                  } );
                            } );

                            return result_obj;
                        } )( styleType_arr ),
                        ...( arr => {
                            let result_obj = {};

                            arr.forEach( ( c, i, a ) => {
                                result_obj[ `Pages_${ c.toLocaleUpperCase() }` ] = {
                                    test: new RegExp( `src[\\\\/]styles[\\\\/]${ c }[\\\\/]pages[\\\\/][^(/)]+\\.${ c }$` ),
                                    name: `Pages_${ c.toLocaleUpperCase() }`,
                                    // 数值越高越先添加加载
                                    // priority: 1000,
                                    enforce: true,
                                    reuseExistingChunk: true
                                };
                            } );

                            return result_obj;
                        } )( styleType_arr ),

                        VendorsDir_JS: ( arr => {
                            return {
                                test: new RegExp( `node_modules[\\\\/](?!${ arr.map( ( c, i, a ) => c + '[\\\\/]' )
                                                                               .join( '|' ) }).*\\.js$` ),
                                name: 'VendorsDir_JS',
                                // 数值越高越先添加加载
                                // priority: 1000,
                                enforce: true,
                                reuseExistingChunk: true
                            };
                        } )( [
                            'echarts',
                            'jquery',
                            'swiper',
                            'vue',
                            'vue-router',
                            'vuex',
                        ] ),
                        VueFamily_JS: {
                            test: /node_modules[\\/](vue[\\/]|vue-router[\\/]|vuex[\\/]).*\.js$/,
                            name: 'VueFamily_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        Echarts_JS: {
                            test: /node_modules[\\/]echarts[\\/].*\.js$/,
                            name: 'Echarts_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        jQuery_JS: {
                            test: /node_modules[\\/]jquery[\\/].*\.js$/,
                            name: 'jQuery_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        Swiper_JS: {
                            test: /node_modules[\\/]swiper[\\/].*\.js$/,
                            name: 'Swiper_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        CT_JS: {
                            test: /src[\\/]js[\\/]tools[\\/]CurrencyTools.esm.js$/,
                            name: 'CT_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        Decorator_JS: {
                            test: /src[\\/]js[\\/]tools[\\/]Decorator4ES6.esm.js$/,
                            name: 'Decorator_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        HTML2Canvas_JS: {
                            test: /src[\\/]js[\\/]tools[\\/]HTML2Canvas.esm.js$/,
                            name: 'HTML2Canvas_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WebC_JS: {
                            test: /src[\\/]js[\\/]tools[\\/]WebComponents.esm.js$/,
                            name: 'WebC_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        Workers4MT_JS: {
                            test: /src[\\/]js[\\/]tools[\\/]Workers4MT.esm.js$/,
                            name: 'Workers4MT_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        ToolsDir_JS: ( arr => {
                            return {
                                test: new RegExp( `src[\\\\/]js[\\\\/]tools[\\\\/](?!${ arr.join( '|' ) }).*\\.js$` ),
                                name: 'ToolsDir_JS',
                                // 数值越高越先添加加载
                                // priority: 1000,
                                enforce: true,
                                reuseExistingChunk: true
                            };
                        } )( [
                            'CurrencyTools.esm.js',
                            'Decorator4ES6.esm.js',
                            'HTML2Canvas.esm.js',
                            'WebComponents.esm.js',
                            'Workers4MT.esm.js',
                        ] ),

                        WASMBasicDir: {
                            test: /src[\\/]wasm[\\/]basic[\\/]/,
                            name: 'WASMBasicDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WASMPublicDir: {
                            test: /src[\\/]wasm[\\/]public[\\/]/,
                            name: 'WASMPublicDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WASMModulesDir: {
                            test: /src[\\/]wasm[\\/]modules[\\/]/,
                            name: 'WASMModulesDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        WASMPagesDir: {
                            test: /src[\\/]wasm[\\/]pages[\\/]/,
                            name: 'WASMPagesDir',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        ...( () => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/graphQL/api' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/graphQL/api/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  str1 = fun( c );

                                  result_obj[ `GQLAPI_${ str1 }_JS` ] = {
                                      test: new RegExp( `src[\\\\/]graphQL[\\\\/]api[\\\\/]${ c }[\\\\/].*\\.(graphql|gql)$` ),
                                      name: `GQLAPI_${ str1 }_JS`,
                                      // 数值越高越先添加加载
                                      // priority: 1000,
                                      enforce: true,
                                      reuseExistingChunk: true
                                  };
                              } );

                            return result_obj;
                        } )(),
                        GQLAPI_JS: {
                            test: new RegExp( `src[\\\\/]graphQL[\\\\/]api[\\\\/][^(/)]+\\.(graphql|gql)$` ),
                            name: 'GQLAPI_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        // ./src/components/xxx/
                        ...( () => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/components' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/components/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  str1 = fun( c );

                                  result_obj[ `Components_${ str1 }_JS` ] = {
                                      test: new RegExp( `src[\\\\/]components[\\\\/]${ c }[\\\\/].*\\.js$` ),
                                      name: `Components_${ str1 }_JS`,
                                      // 数值越高越先添加加载
                                      // priority: 1000,
                                      enforce: true,
                                      reuseExistingChunk: true
                                  };
                              } );

                            return result_obj;
                        } )(),
                        Components_JS: {
                            test: new RegExp( `src[\\\\/]components[\\\\/][^(/)]+\\.js$` ),
                            name: 'Components_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        // ./src/webComponents/xxx/
                        ...( () => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/webComponents' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/webComponents/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  str1 = fun( c );

                                  result_obj[ `WebComponents_${ str1 }_JS` ] = {
                                      test: new RegExp( `src[\\\\/]webComponents[\\\\/]${ c }[\\\\/].*\\.js$` ),
                                      name: `WebComponents_${ str1 }_JS`,
                                      // 数值越高越先添加加载
                                      // priority: 1000,
                                      enforce: true,
                                      reuseExistingChunk: true
                                  };
                              } );

                            return result_obj;
                        } )(),
                        PublicDir_JS: {
                            test: /src[\\/]js[\\/]public[\\/].*\.js$/,
                            name: 'PublicDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        ModulesDir_JS: {
                            test: /src[\\/]js[\\/]modules[\\/].*\.js$/,
                            name: 'ModulesDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        VueRoutersDir_JS: {
                            test: /src[\\/]vue[\\/]routers[\\/].*\.js$/,
                            name: 'VueRoutersDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        VueStoresDir_JS: {
                            test: /src[\\/]vue[\\/]stores[\\/].*\.js$/,
                            name: 'VueStoresDir_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        ...( () => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/vue/components' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/vue/components/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  str1 = fun( c );

                                  result_obj[ `VueComponents_${ str1 }_JS` ] = {
                                      test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/]${ c }[\\\\/].*\\.js$` ),
                                      name: `VueComponents_${ str1 }_JS`,
                                      // 数值越高越先添加加载
                                      // priority: 1000,
                                      enforce: true,
                                      reuseExistingChunk: true
                                  };
                              } );

                            return result_obj;
                        } )(),
                        VueComponents_JS: {
                            test: new RegExp( `src[\\\\/]vue[\\\\/]components[\\\\/][^(/)]+\\.js$` ),
                            name: 'VueComponents_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        ...( () => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/vue/models' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/vue/models/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  str1 = fun( c );

                                  result_obj[ `VueModels_${ str1 }_JS` ] = {
                                      test: new RegExp( `src[\\\\/]vue[\\\\/]models[\\\\/]${ c }[\\\\/].*\\.js$` ),
                                      name: `VueModels_${ str1 }_JS`,
                                      // 数值越高越先添加加载
                                      // priority: 1000,
                                      enforce: true,
                                      reuseExistingChunk: true
                                  };
                              } );

                            return result_obj;
                        } )(),
                        VueModels_JS: {
                            test: new RegExp( `src[\\\\/]vue[\\\\/]models[\\\\/][^(/)]+\\.js$` ),
                            name: 'VueModels_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        ...( () => {
                            let result_obj = {},
                                str1;

                            fs.readdirSync( path.join( __dirname, './src/js/pages' ) )
                              .filter( ( c, i, a ) => {
                                  return fs.statSync( path.join( __dirname, `./src/js/pages/${ c }` ) )
                                           .isDirectory();
                              } )
                              .filter( ( c, i, a ) => true )
                              .forEach( ( c, i, a ) => {
                                  str1 = fun( c );

                                  result_obj[ `Pages_${ str1 }_JS` ] = {
                                      test: new RegExp( `src[\\\\/]js[\\\\/]pages[\\\\/]${ c }[\\\\/].*\\.js$` ),
                                      name: `Pages_${ str1 }_JS`,
                                      // 数值越高越先添加加载
                                      // priority: 1000,
                                      enforce: true,
                                      reuseExistingChunk: true
                                  };
                              } );

                            return result_obj;
                        } )(),
                        Pages_JS: {
                            test: new RegExp( `src[\\\\/]js[\\\\/]pages[\\\\/][^(/)]+\\.js$` ),
                            name: 'Pages_JS',
                            // 数值越高越先添加加载
                            // priority: 1000,
                            enforce: true,
                            reuseExistingChunk: true
                        },

                        /*
                         default: {
                         minChunks: 2,
                         // 数值越高越先添加加载
                         // priority: -10,
                         reuseExistingChunk: true,
                         },
                         */
                    };

                Object.entries( obj )
                      .forEach( ( c, i, ) => {
                          c[ 1 ].priority = start_num - i;
                      } );

                return obj;
            } )( 100000000 ) )
    },
    provide_obj = {
        echarts: 'echartsESM',

        ELEMENTCSS: 'elementUIESMCSS',
        ELEMENT: 'elementUIESM',

        $: 'jQueryESM',
        jQuery: 'jQueryESM',
        'window.$': 'jQueryESM',
        'window.jQuery': 'jQueryESM',

        SwiperCSS: 'swiperESMCSS',
        Swiper: 'swiperESM',

        Vue: 'vueESM',
        VueRouter: 'vueRouterESM',
        Vuex: 'vuexESM',

        CompESM: 'CompESM',

        CTESM: 'CTESM',
        DecESM: 'DecESM',
        HTML2C4ESM: 'HTML2C4ESM',
        WebCESM: 'WebCESM',
        WorkersESM: 'WorkersESM',
    },
    hashedModuleIds_obj = {
        // hex base64
        hashDigest: 'hex',
        hashDigestLength: 6,
        // sha512 md5
        hashFunction: 'sha512',
    },
    babelPresets_fun = ( isPro_boo, noTest_boo ) => [
        [
            '@babel/preset-env',
            {
                // 是否松散，建议不要
                loose: true,
                // 是否规范，启用后编译会耗时
                spec: false,
                // 7.4版本的插件写法发生巨变！！！
                corejs: {
                    version: 3,
                    proposals: true,
                },
                /*
                 modules这个选项说明！！！要细看！！！

                 把 modules 设置为 false，就是告诉 babel 不要编译模块代码。这会让 Babel 保留我们现有的 es2015 import/export 语句。
                 划重点：
                 所有可需要 tree-shaking 的代码必须以这种方式编译。
                 因此，如果你有要导入的库，则必须将这些库编译为 es2015 模块以便进行 tree-shaking 。
                 如果它们被编译为 commonjs，那么它们就不能做 tree-shaking ，并且将会被打包进你的应用程序中。
                 许多库支持部分导入，lodash 就是一个很好的例子，它本身是 commonjs 模块，但是它有一个 lodash-es 版本，用的是 es2015模块。
                 此外，如果你在应用程序中使用内部库，也必须使用 es2015 模块编译。为了减少应用程序包的大小，必须将所有这些内部库修改为以这种方式编译。
                 */
                // auto
                modules: false,
                useBuiltIns: 'usage',
                shippedProposals: true,
                targets: {
                    safari: 'tp',
                    // 启用会忽略browsers属性
                    esmodules: false,
                    browsers: browsers_arr,
                },
            },
        ],
        [
            '@babel/preset-typescript',
            {
                isTSX: false,
                allExtensions: false,
                // jsxPragma: 'React',
                // 默认值就是：false
                allowNamespaces: true,
                // 默认值就是：false
                allowDeclareFields: true,
                // 默认值就是：false
                onlyRemoveTypeImports: true,
            },
        ],
        [
            'const-enum',
            {
                allExtensions: false,
                // removeConst constObject
                transform: 'constObject',
            },
        ],
    ],
    babelPlugins_fun = ( isPro_boo, noTest_boo, isESM_boo ) => {
        let miniJS_arr = [
                // JS压缩插件 Start
                // 暂时不用
                // [ 'minify-simplify' ],

                // 当函数的默认参数设置为常量或私有变量时，该插件会报错。
                // Cannot read property 'add' of undefined
                [
                    'minify-mangle-names',
                    {
                        // exclude: { TestClassA: true },
                        keepFnName: true,
                        eval: true,
                        topLevel: true,
                        keepClassName: true,
                    }
                ],

                [ 'transform-inline-consecutive-adds' ],
                [ '@babel/plugin-transform-member-expression-literals' ],
                [ 'transform-merge-sibling-variables' ],
                // [ 'transform-minify-booleans' ],
                /*
                 [
                 'minify-builtins',
                 {
                 tdz: true,
                 }
                 ],
                 */
                [
                    'minify-constant-folding',
                    {
                        tdz: true,
                    }
                ],
                [
                    'minify-dead-code-elimination',
                    {
                        optimizeRawSize: true,
                        keepFnName: true,
                        keepFnArgs: true,
                        keepClassName: true,
                        tdz: true,
                    }
                ],
                [ 'minify-numeric-literals' ],
                // Boolean(x) -> !!x
                [
                    'minify-type-constructors',
                    {
                        // true不转换
                        array: true,
                        boolean: true,
                        number: true,
                        object: true,
                        string: true,
                    }
                ],
                // const foo='ab+';var a=new RegExp(foo+'c','i');->const foo='ab+';var a=/ab+c/i;
                [ 'transform-regexp-constructors' ],
                /*
                 [
                 'transform-remove-undefined',
                 {
                 tdz: true,
                 }
                 ],
                 */
                // [ 'transform-undefined-to-void' ]
                // JS压缩插件 End
            ],
            cjs_arr = [
                '@babel/plugin-transform-modules-commonjs',
                {
                    allowTopLevelThis: true,
                    loose: true,
                    strict: false,
                    noInterop: false,
                    lazy: false,
                }
            ],
            runtime_arr = [
                '@babel/plugin-transform-runtime',
                {
                    // 7.4版本的插件写法发生巨变！！！
                    /*
                     corejs: {
                     version: 3,
                     proposals: true,
                     },
                     */
                    helpers: true,
                    regenerator: true,
                    useESModules: isESM_boo,
                }
            ],
            plug_arr = [
                [ '@babel/plugin-external-helpers' ],

                // 注意事项去看：notes/关于在JS和TS文件中导入和使用graphql文件时出现的BUG以及注意事项说明.txt
                /*
                 [
                 'import-graphql-string',
                 {
                 extensions: [
                 '.graphql',
                 '.gql',
                 ],
                 // 设置为true时，从已编译的graphQL字符串中删除所有不必要的字符。
                 stripIgnoredCharacters: isPro_boo,
                 // 设置为true将导致__typename字段包含在所有操作和片段的所有非标量字段中。
                 includeTypeNames: false,
                 // 用于解析路径别名的插件，例如webpack别名。每个键都应包含一个别名，该别名的相对路径为相应的值，例如：{ '@': './src/', }。
                 aliases: {
                 // 注意事项去看：notes/关于在JS和TS文件中导入和使用graphql文件时出现的BUG以及注意事项说明.txt
                 gQLAPIDir: path.resolve( __dirname, './src/graphQL/api/' ),
                 },
                 },
                 ],
                 */

                [
                    'const-enum',
                    {
                        // removeConst constObject
                        transform: 'constObject',
                    }
                ],

                /*ES6+提案语法转换插件 Start*/
                [ 'babel-plugin-transform-typescript-metadata' ],
                [
                    '@babel/plugin-proposal-decorators',
                    {
                        legacy: true,
                        /*
                         // 当decoratorsBeforeExport === undefined时，而且legacy = false(默认的值也是false)时，会报错！！！
                         // The decorators plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you want to use the legacy decorators semantics, you can set the 'legacy: true' option.

                         // 当decoratorsBeforeExport !== undefined时，而且legacy = true时，会报错！！！
                         // 'decoratorsBeforeExport' can't be used with legacy decorators.

                         decoratorsBeforeExport: true
                         //@decorator
                         //export class Foo {}

                         //decoratorsBeforeExport: false
                         //export @decorator class Bar {}
                         */
                    }
                ],
                [
                    '@babel/plugin-proposal-class-properties',
                    {
                        loose: true,
                    }
                ],
                // ES2018
                // [ '@babel/plugin-proposal-async-generator-functions' ],
                [ '@babel/plugin-proposal-do-expressions' ],
                [ '@babel/plugin-proposal-export-default-from' ],
                [ '@babel/plugin-proposal-export-namespace-from' ],
                [ '@babel/plugin-proposal-function-bind' ],
                [ '@babel/plugin-proposal-function-sent' ],
                [ '@babel/plugin-proposal-json-strings' ],
                [ '@babel/plugin-proposal-logical-assignment-operators' ],
                [
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                    {
                        loose: false,
                    }
                ],
                [ '@babel/plugin-proposal-numeric-separator' ],
                [ '@babel/plugin-transform-literals' ],
                // ES2018
                /*
                 [
                 '@babel/plugin-proposal-object-rest-spread',
                 {
                 loose: true,
                 useBuiltIns: true,
                 }
                 ],
                 */
                // ES2018
                // [ '@babel/plugin-proposal-optional-catch-binding' ],
                [
                    '@babel/plugin-proposal-optional-chaining',
                    {
                        loose: false,
                    }
                ],
                [
                    '@babel/plugin-proposal-pipeline-operator',
                    {
                        proposal: 'minimal',
                    }
                ],
                [ '@babel/plugin-proposal-throw-expressions' ],
                // ES2018
                /*
                 [
                 '@babel/plugin-proposal-unicode-property-regex',
                 {
                 useUnicodeFlag: true,
                 }
                 ],
                 */
                [
                    '@babel/plugin-proposal-private-methods',
                    {
                        loose: true,
                    }
                ],
                [ '@babel/plugin-proposal-partial-application' ],
                [
                    '@babel/plugin-proposal-private-property-in-object',
                    {
                        loose: true,
                    }
                ],
                /*ES6+提案语法转换插件 End*/

                /*句法转换插件 Start*/
                [
                    '@babel/plugin-syntax-decorators',
                    {
                        legacy: true,
                        /*
                         // 当decoratorsBeforeExport === undefined时，而且legacy = false(默认的值也是false)时，会报错！！！
                         // The decorators plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you want to use the legacy decorators semantics, you can set the 'legacy: true' option.

                         // 当decoratorsBeforeExport !== undefined时，而且legacy = true时，会报错！！！
                         // 'decoratorsBeforeExport' can't be used with legacy decorators.

                         decoratorsBeforeExport: true
                         //@decorator
                         //export class Foo {}

                         //decoratorsBeforeExport: false
                         //export @decorator class Bar {}
                         */
                    }
                ],
                [
                    '@babel/plugin-syntax-class-properties',
                    {
                        loose: true,
                    }
                ],
                // ES2018
                // [ '@babel/plugin-syntax-async-generators' ],
                [ '@babel/plugin-syntax-bigint' ],
                [ '@babel/plugin-syntax-do-expressions' ],
                [ '@babel/plugin-syntax-dynamic-import' ],
                [ '@babel/plugin-syntax-export-default-from' ],
                [ '@babel/plugin-syntax-export-extensions' ],
                [ '@babel/plugin-syntax-export-namespace-from' ],
                [ '@babel/plugin-syntax-flow' ],
                [ '@babel/plugin-syntax-function-bind' ],
                [ '@babel/plugin-syntax-function-sent' ],
                [ '@babel/plugin-syntax-import-meta' ],
                [ '@babel/plugin-syntax-json-strings' ],
                [ '@babel/plugin-syntax-jsx' ],
                [ '@babel/plugin-syntax-logical-assignment-operators' ],
                [
                    '@babel/plugin-syntax-nullish-coalescing-operator',
                    {
                        loose: false,
                    }
                ],
                [ '@babel/plugin-syntax-numeric-separator' ],
                // ES2018
                /*
                 [
                 '@babel/plugin-syntax-object-rest-spread',
                 {
                 loose: true,
                 useBuiltIns: true,
                 }
                 ],
                 */
                // ES2018
                // [ '@babel/plugin-syntax-optional-catch-binding' ],
                [
                    '@babel/plugin-syntax-optional-chaining',
                    {
                        loose: false,
                    }
                ],
                [
                    '@babel/plugin-syntax-pipeline-operator',
                    {
                        proposal: 'minimal',
                    }
                ],
                [ '@babel/plugin-syntax-throw-expressions' ],
                [
                    '@babel/plugin-syntax-typescript',
                    {
                        isTSX: false,
                    }
                ],
                [ '@babel/plugin-syntax-partial-application' ],
                [ '@babel/plugin-syntax-top-level-await' ],
                /*句法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2015(ES6)
                /*ES2015(ES6)语法转换插件 Start*/
                /* 暂时不用 [ '@babel/plugin-transform-instanceof' ],*/
                /* 暂时不用 [ '@babel/plugin-transform-sticky-regex' ],*/
                /*tdz: true会报错 TypeError: this.addHelper is not a function*/
                /*
                 [
                 '@babel/plugin-transform-block-scoping',
                 {
                 throwIfClosureRequired: false,
                 tdz: false,
                 }
                 ],
                 [
                 '@babel/plugin-transform-arrow-functions',
                 {
                 spec: true,
                 }
                 ],
                 [ '@babel/plugin-transform-block-scoped-functions' ],
                 [
                 '@babel/plugin-transform-computed-properties',
                 {
                 loose: false,
                 }
                 ],
                 [
                 '@babel/plugin-transform-destructuring',
                 {
                 loose: false,
                 useBuiltIns: true,
                 }
                 ],
                 [ '@babel/plugin-transform-duplicate-keys' ],
                 [
                 '@babel/plugin-transform-for-of',
                 {
                 loose: false,
                 assumeArray: false,
                 }
                 ],
                 [ '@babel/plugin-transform-function-name' ],
                 [ '@babel/plugin-transform-new-target' ],
                 [ '@babel/plugin-transform-object-super' ],
                 [
                 '@babel/plugin-transform-parameters',
                 {
                 loose: false,
                 }
                 ],
                 [ '@babel/plugin-transform-shorthand-properties' ],
                 [
                 '@babel/plugin-transform-spread',
                 {
                 loose: false,
                 }
                 ],
                 [
                 '@babel/plugin-transform-template-literals',
                 {
                 loose: false,
                 }
                 ],
                 [ '@babel/plugin-transform-typeof-symbol' ],
                 [ '@babel/plugin-transform-unicode-regex' ],
                 [
                 '@babel/plugin-transform-classes',
                 {
                 loose: false,
                 }
                 ],
                 [ '@babel/plugin-transform-unicode-escapes' ],
                 */
                /*ES2015(ES6)语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2016
                /*ES2016语法转换插件 Strat*/
                /*[ '@babel/plugin-transform-exponentiation-operator' ],*/
                /*ES2016语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2017
                /*ES2017语法转换插件 Strat*/
                /*[
                 '@babel/plugin-transform-async-to-generator',
                 {
                 module: 'bluebird',
                 method: 'coroutine',
                 }
                 ],*/
                /*ES2017语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2018
                /*ES2018语法转换插件 Strat*/
                /*[ '@babel/plugin-transform-dotall-regex' ],
                 [
                 '@babel/plugin-transform-named-capturing-groups-regex',
                 {
                 runtime: true,
                 }
                 ],*/
                /*ES2018语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就不需要启用这些插件
                /*语法转换插件 Start*/
                /*[ '@babel/plugin-transform-jscript' ],
                 [ '@babel/plugin-check-constants' ],
                 [ '@babel/plugin-codemod-optional-catch-binding' ],
                 [ '@babel/plugin-transform-eval' ],
                 [ '@babel/plugin-transform-property-literals' ],
                 [ '@babel/plugin-transform-property-mutators' ],
                 [
                 '@babel/plugin-transform-regenerator',
                 {
                 asyncGenerators: true,
                 generators: true,
                 async: true,
                 }
                 ],

                 [ '@babel/plugin-transform-reserved-words' ],
                 [ '@babel/plugin-transform-object-assign' ],*/

                // 要注意这个插件的使用方法！！！该插件配合下面那个插件使用！！！没用这两个插件，IE9中就无法使用Object.setPrototypeOf()
                // [ '@babel/plugin-transform-proto-to-assign' ],
                // Object.setPrototypeOf(bar, foo);要注意这个插件的使用方法！！！需要上头那个插件的配合使用！！！没用这两个插件，IE9中就无法使用Object.setPrototypeOf()
                // [ '@babel/plugin-transform-object-set-prototype-of-to-assign' ],
                /*
                 PS:
                 var foo = { a: 1 };
                 var bar = { b: 2 };
                 bar.__proto__ = foo;
                 bar.a; // 1
                 foo.a = 2;
                 bar.a; // 1 没用这个两个插件，会输出2(本来也应该输出2的)！！！用了会输出1！！！
                 */

                /*语法转换插件 End*/

                // 没啥效果
                // [ '@babel/plugin-transform-strict-mode' ],
            ];
        noTest_boo && miniJS_arr.unshift( [ 'transform-remove-console' ], [ 'transform-remove-debugger' ] );
        isESM_boo
        ? plug_arr.push( runtime_arr )
        : ( plug_arr.push( cjs_arr ), plug_arr.push( runtime_arr ) );
        isPro_boo && plug_arr.push( ...miniJS_arr );
        return plug_arr;
    },
    moduleRules_fun = ( { path, __dirname, isPro, MiniCSSExtractPlugin, noTest_boo, isESM_boo, } ) => {
        // 注意这些个“loader”是否都有"esModule: false"这个配置项！！！有的默认值是false，有的是true！！！

        let obj = {
            hmr: !isPro,
            // reloadAll isPro为true时去掉这个选项，如果hmr不起作用，这是一种有效的方法。
            // reloadAll: false,
            // publicPath: '../',
            esModule: false,
        };

        !isPro && ( obj.reloadAll = true );

        return [
            {
                test: /\.(html|htm)$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: true,
                            minimize: {
                                collapseBooleanAttributes: false,
                                collapseInlineTagWhitespace: true,
                                collapseWhitespace: true,
                                html5: true,
                                // 在单例元素上保留斜线
                                keepClosingSlash: true,
                                minifyCSS: isPro,
                                minifyJS: isPro,
                                removeAttributeQuotes: false,
                                removeComments: true,
                                removeEmptyAttributes: false,
                                removeEmptyElements: false,
                                removeOptionalTags: false,
                                removeRedundantAttributes: false,
                                removeScriptTypeAttributes: true,
                                removeStyleLinkTypeAttributes: true,
                                removeTagWhitespace: false,
                            },
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.ejs$/i,
                use: [
                    {
                        loader: 'ejs-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/tplEJS/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: obj,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 1,
                            esModule: false,
                        },
                    },
                    postCSSLoader_fun( isPro ),
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    // /node_modules[\\/](element-ui[\\/]).*\.css/,
                    // /node_modules[\\/](swiper[\\/]).*\.css/,
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    // /node_modules[\\/](?!element-ui[\\/]).*\.css/,
                    // /node_modules[\\/](?!swiper[\\/]).*\.css/,
                    // path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/postcss/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/styles/stylus/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: obj,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 2,
                            esModule: false,
                        }
                    },
                    postCSSLoader_fun( isPro ),
                    {
                        loader: 'sass-loader',
                        options: {
                            // 使用dart-sass实现
                            // 不支持以下选项：precision、sourceComments
                            implementation: require( 'sass' ),
                            sassOptions: {
                                fiber: require( 'fibers' ),
                                indentedSyntax: false,
                                indentType: 'space',
                                indentWidth: 2,
                                // cr、crlf、lf、lfcr
                                linefeed: 'lf',
                                // nested(嵌套)、expanded(扩大)、compact(紧凑)、compressed(压缩)
                                // 使用“dart-sass”实现的只支持：expanded(扩大)、compressed(压缩)
                                outputStyle: isPro
                                             ? 'compressed'
                                             : 'expanded',
                                // Dart Sass默认为所有现有浏览器提供足够高的精度，并且使其可自定义将使代码的效率大大降低。
                                // precision: 6,
                            },
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/postcss/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/styles/stylus/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:contenthash:hex:6].css',
                            // publicPath: '../',
                            outputPath: './styles/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        }
                    },
                    {
                        loader: 'extract-loader',
                        options: {
                            // publicPath: '../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 1,
                            esModule: false,
                        },
                    },
                    /*
                     启用后就会报错误：
                     TypeError: node.getIterator is not a function
                     */
                    // postCSSLoader_fun( isPro ),
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                // （不建议使用） 它已由math选项代替。
                                // strictMath: true,
                                // always(当前默认值)、parens-division(未来会成为默认值)、parens | strict(等效于：strictMath: true)、strict-legacy(不推荐)
                                math: 'strict-legacy',
                                // 启用严格的单位，我们假设这是计算中的错误并引发错误。
                                strictUnits: true,
                                // 兼容性IE8，不推荐使用，从v3.0.0开始默认为False。当前仅用于data-uri函数，以确保不会创建太大的图像，以至于浏览器无法处理。
                                // ieCompat: true,
                                // 最新的文档没有找到这个选项信息
                                noIeCompat: true,
                            },
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/postcss/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/styles/stylus/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.sass$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'styleTag',
                            insert: 'head',
                            esModule: false,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 2,
                            esModule: false,
                        }
                    },
                    postCSSLoader_fun( isPro ),
                    {
                        loader: 'sass-loader',
                        options: {
                            // 使用dart-sass实现
                            // 不支持以下选项：precision、sourceComments
                            implementation: require( 'sass' ),
                            sassOptions: {
                                fiber: require( 'fibers' ),
                                indentedSyntax: true,
                                indentType: 'space',
                                indentWidth: 4,
                                // cr、crlf、lf、lfcr
                                linefeed: 'lf',
                                // nested(嵌套)、expanded(扩大)、compact(紧凑)、compressed(压缩)
                                // 使用“dart-sass”实现的只支持：expanded(扩大)、compressed(压缩)
                                outputStyle: isPro
                                             ? 'compressed'
                                             : 'expanded',
                                // Dart Sass默认为所有现有浏览器提供足够高的精度，并且使其可自定义将使代码的效率大大降低。
                                // precision: 6,
                            },
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/postcss/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/styles/stylus/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.(styl|stylus)$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: obj,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 2,
                            esModule: false,
                        }
                    },
                    postCSSLoader_fun( isPro ),
                    {
                        loader: 'stylus-loader',
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/stylus/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/postcss/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.(pcss|postcss)$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'styleTag',
                            insert: 'head',
                            esModule: false,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 1,
                            esModule: false,
                        }
                    },
                    postCSSLoader_fun( isPro ),
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/postcss/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/styles/stylus/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                sideEffects: true,
            },

            {
                test: /\.vue$/i,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                video: [
                                    'src',
                                    'poster',
                                ],
                                source: 'src',
                                img: 'src',
                                audio: 'src',
                                image: [
                                    'xlink:href',
                                    'href',
                                ],
                                use: [
                                    'xlink:href',
                                    'href',
                                ],
                            },
                            compilerOptions: {
                                // preserve保留、condense压缩
                                whitespace: 'condense',
                                // 从2.6开始不推荐使用，用来丢弃模板标签之间的空格，默认值：true
                                // 默认情况下，编译的渲染函数保留HTML标记之间的所有空白字符。如果设置为false，标签之间的空白将被忽略。
                                // 这可能会导致性能稍好，但可能会影响嵌入式元素的布局。
                                // preserveWhitespace: true,
                            },
                            // transpileOptions选项建议不启用、不设置，交给babel-loader来处理
                            /*
                             transpileOptions: {
                             target: {
                             // 专门在最新稳定版本的谷歌浏览器上测试用
                             chrome: 83,

                             // 以下只是用于自己设备上的浏览器
                             // ios: 13,
                             // safari: 13,
                             // edge: 81,
                             // opera: 68,
                             // operaMobile: 68,
                             // chrome: 81,
                             // android: 81,
                             // chromeAndroid: 81,
                             // firefox: 76,
                             // firefoxAndroid: 76,
                             },
                             // 以下的配置可以用来覆盖上面的target选项：true触发转换，false不转换(被注释掉的大多都是启用了转换，以便兼容低版本的浏览器)
                             transforms: {
                             //设置为false可以用来配合webpack的代码切割
                             modules: false,
                             // 防止从类方法生成的函数表达式被赋予名称(需要防止IE8中的作用域泄漏)
                             namedFunctionExpressions: false,

                             // arrow: true,
                             // classes: true,
                             // collections: true,
                             // computedProperty: true,
                             // conciseMethodProperty: true,
                             // constLoop: true,
                             // dangerousForOf: false,
                             // dangerousTaggedTemplateString: false,
                             // defaultParameter: true,
                             // forOf: true,
                             // generator: true,
                             // letConst: true,
                             // numericLiteral: true,
                             // destructuring: true,
                             // parameterDestructuring: true,
                             // reservedProperties: true,
                             // spreadRest: true,
                             // stickyRegExp: false,
                             // 注意：不支持标记的模板字符串，除非您使用危险的TaggedTemplateString转换。请参阅危险变换。
                             // templateString: true,
                             // Unicode正则表达式
                             // unicodeRegExp: true,
                             },
                             },
                             */
                            prettify: !isPro,
                            exposeFilename: !isPro,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.ts(x?)$/i,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 默认值是：false
                            cacheDirectory: !isPro,
                            // 默认值是：true
                            cacheCompression: true,
                            presets: babelPresets_fun( isPro, noTest_boo ),
                            plugins: babelPlugins_fun( isPro, noTest_boo, isESM_boo ),
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            // true禁用类型检查器-我们将在"fork-ts-checker-webpack-plugin"插件中使用它
                            transpileOnly: true,
                            // 重要！使用happyPackMode模式加快编译速度并减少报告给Webpack的错误
                            happyPackMode: true,
                            // 默认值：false
                            logInfoToStdOut: false,
                            // 默认值：warn，可选值：info、warn、error
                            logLevel: 'error',
                            // 默认值：false，如果为true，则不会发出console.log消息。请注意，大多数错误消息都是通过webpack发出的，不受此标志的影响。
                            silent: true,
                            // 默认值：number[]，您可以通过指定要忽略的诊断代码数组来抑制某些TypeScript错误。
                            // ignoreDiagnostics: [],
                            // 仅报告与这些全局模式匹配的文件中的错误。当某些类型定义具有对您的应用程序不致命的错误时，这很有用。
                            reportFiles: [
                                'src/components/**/*.{ts,tsx}',
                                'src/js/**/*.{ts,tsx}',
                                'src/vue/**/*.{ts,tsx}',
                                'src/vue/**/*.ts.vue',
                                'src/webComponents/**/*.{ts,tsx}',
                            ],
                            // 默认值：typescript，允许使用非官方的TypeScript编译器。应该设置为编译器的NPM名称，例如：ntypescript。
                            compiler: 'typescript',
                            // 允许您指定在哪里可以找到TypeScript配置文件。
                            configFile: path.resolve( __dirname, './tsconfig.json' ),
                            colors: true,
                            // 默认值：undefined
                            // errorFormatter: undefined,
                            // 允许覆盖TypeScript options(编译选项compiler options，TypeScript选项应使用tsconfig.json文件设置)。应该以与“tsconfig.json”中的“compilerOptions”属性相同的格式指定。
                            compilerOptions: compilerOptions_obj,
                            // 默认值：'TODO'，高级选项，强制文件通过TypeScript编译器的不同实例。可用于强制分离代码的不同部分。
                            // instance: 'TODO',
                            // 默认值：RegExp[]，要与文件名匹配的正则表达式列表。如果文件名与正则表达式之一匹配，则将.ts或.tsx后缀附加到该文件名。
                            appendTsSuffixTo: [
                                /\.ts\.vue$/i,
                            ],
                            // 默认值：RegExp[]，要与文件名匹配的正则表达式列表。如果文件名与正则表达式之一匹配，则将.ts或.tsx后缀附加到该文件名。
                            // appendTsxSuffixTo: [],
                            // 默认值：false
                            onlyCompileBundledFiles: true,
                            // 默认值：false
                            allowTsInNodeModules: false,
                            // 默认值：undefined
                            // context: undefined,
                            // 默认值：true
                            experimentalFileCaching: true,
                            // 默认值：false，
                            // “ts loader”支持“project references”。启用此配置选项后，“ts loader”将像“tsc--build”那样增量地重建上游项目。
                            // 否则，引用项目中的源文件将被视为根项目的一部分。
                            projectReferences: true,
                            // 暂时不用！
                            /*
                             getCustomTransformers: () => ( {
                             before: [
                             // 注意事项去看：notes/关于在JS和TS文件中导入和使用graphql文件时出现的BUG以及注意事项说明.txt
                             getTransformer(),
                             ],
                             } ),
                             */
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
            },

            {
                test: /\.(js|mjs|cjs)$/i,
                // 'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json'
                // 'webassembly/sync' | 'webassembly/async'(webpack 5) | 'webassembly/experimental'(webpack 4)
                // 'asset' | 'asset/source' | 'asset/resource' | 'asset/inline'
                type: 'javascript/auto',
                parser: {
                    // true启用 false禁用
                    // 启用 CommonJS
                    commonjs: true,
                    // 启用 ES2015 Harmony import/export
                    harmony: true,
                    // 禁用 AMD
                    // amd: false,
                    // 禁用 SystemJS
                    // system: false,
                    // 禁用 require.include
                    // requireInclude: false,
                    // 禁用 require.ensure
                    // requireEnsure: false,
                    // 禁用 require.context
                    // requireContext: false,
                    // 禁用特殊处理的 browserify bundle
                    // browserify: false,
                    // 禁用 requirejs.*
                    // requireJs: false,
                    // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
                    // node: false
                    // 或 node: {} 在模块级别(module level)上重新配置 node 层(layer)
                },
                use: [
                    // 将此装载机放在其他装载机的前面。以下加载程序在工作池中运行。
                    // 在工作池中运行的装载程序受到限制。例子：
                    // 1、加载程序无法发出文件。
                    // 2、加载程序无法使用自定义加载程序API（即通过插件）。
                    // 3、加载程序无法访问webpack选项。
                    // PS：
                    // 1、只能将此装载机用于昂贵的操作！
                    // 2、每个工作程序都是一个单独的node.js进程，其开销约为600毫秒。进程间通信也有开销。
                    {
                        loader: 'thread-loader',
                        options: jsWorkerPool,
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // 默认值是：false
                            cacheDirectory: !isPro,
                            // 默认值是：true
                            cacheCompression: true,
                            presets: babelPresets_fun( isPro, noTest_boo ),
                            plugins: babelPlugins_fun( isPro, noTest_boo, isESM_boo ),
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            // src/workers下的.js文件的特殊处理
            {
                test: /\.(js)$/i,
                // 'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json'
                // 'webassembly/sync' | 'webassembly/async'(webpack 5) | 'webassembly/experimental'(webpack 4)
                // 'asset' | 'asset/source' | 'asset/resource' | 'asset/inline'
                type: 'javascript/auto',
                parser: {
                    // true启用 false禁用
                    // 启用 CommonJS
                    commonjs: true,
                    // 启用 ES2015 Harmony import/export
                    harmony: true,
                    // 禁用 AMD
                    // amd: false,
                    // 禁用 SystemJS
                    // system: false,
                    // 禁用 require.include
                    // requireInclude: false,
                    // 禁用 require.ensure
                    // requireEnsure: false,
                    // 禁用 require.context
                    // requireContext: false,
                    // 禁用特殊处理的 browserify bundle
                    // browserify: false,
                    // 禁用 requirejs.*
                    // requireJs: false,
                    // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
                    // node: false
                    // 或 node: {} 在模块级别(module level)上重新配置 node 层(layer)
                },
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:contenthash:hex:6].worker.js',
                            // publicPath: '../',
                            outputPath: './workers/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/workers/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.manifest\.json$/i,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:contenthash:hex:6].[ext]',
                            // publicPath: '../',
                            outputPath: './others/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.json5$/i,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'json5-loader',
                        options: {
                            esModule: true,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/assets/doc/json5/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/txt/' ),
                    path.resolve( __dirname, './src/assets/doc/xml/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.xml$/i,
                use: [
                    {
                        loader: 'xml-loader',
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/assets/doc/xml/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/json/' ),
                    path.resolve( __dirname, './src/assets/doc/json5/' ),
                    path.resolve( __dirname, './src/assets/doc/txt/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.txt$/i,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/assets/doc/txt/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/json/' ),
                    path.resolve( __dirname, './src/assets/doc/json5/' ),
                    path.resolve( __dirname, './src/assets/doc/xml/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.wasm$/i,
                // webpack 4: webassembly/experimental   webpack 5: webassembly/async
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:hash:hex:6].[ext]',
                            // publicPath: '../',
                            outputPath: './wasm/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },

            // 注意事项去看：notes/关于在JS和TS文件中导入和使用graphql文件时出现的BUG以及注意事项说明.txt
            {
                test: /\.(graphql|gql)$/i,
                use: [
                    // graphql-tag/loader.js有被自己改过的！暂时不用！
                    // {
                    //     loader: 'graphql-tag/loader',
                    // },
                    {
                        loader: 'webpack-graphql-loader',
                        options: {
                            // graphql自省查询架构JSON文件的位置。如果与validate选项一起使用，它将用于验证导入的查询和片段。
                            schema: './src/graphQL/GraphQL.Schema.json',
                            // 如果为true，则加载程序将根据您指定的模式文件验证导入的文档。
                            validate: false,
                            // 'string'、'document'
                            output: 'string',
                            // 如果为true且输出选项为字符串，则加载程序将从graphql文档字符串中删除注释和空格。这有助于减小捆绑的代码大小。
                            minify: isPro,
                            // 如果为true，则加载程序将从导入的文档中删除未使用的碎片。
                            // 如果查询要从文件导入片段，但未使用该文件中的所有片段，则这可能很有用。
                            // 另请参阅此问题。
                            removeUnusedFragments: false,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/graphQL/api/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/graphQL/doc/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
            },

            {
                test: /\.(jng|bmp|dcx|gif|icns|ico|jbig2|jpe|jpeg|jpg|pam|pbm|pcx|pgm|png|pnm|ppm|psd|rgbe|tga|tif|tiff|wbmp|xbm|xpm|svg|svgz|webp|heif|heic)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 以字节为单位，以下是限定为10kb
                            limit: 10240,
                            encoding: 'base64',
                            fallback: 'file-loader',
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:hash:hex:6].[ext]',
                            // publicPath: '../',
                            outputPath: './img/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.(eot|otf|fon|font|ttf|ttc|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:hash:hex:6].[ext]',
                            // publicPath: '../',
                            outputPath: './fonts/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    // /node_modules[\\/](element-ui[\\/]).*\.ttf/,
                    // /node_modules[\\/](element-ui[\\/]).*\.woff/,
                    // /node_modules[\\/](swiper[\\/]).*\.ttf/,
                    // /node_modules[\\/](swiper[\\/]).*\.woff/,
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    // /node_modules[\\/](?!element-ui[\\/]).*\.ttf/,
                    // /node_modules[\\/](?!element-ui[\\/]).*\.woff/,
                    // /node_modules[\\/](?!swiper[\\/]).*\.ttf/,
                    // /node_modules[\\/](?!swiper[\\/]).*\.woff/,
                    // path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.(m4a|kar|ape|wav|wave|flac|wma|cda|aiff|au|mpeg|mpeg-1|mpeg-2|mpeg-layer3|mpeg-4|mp3|mp2|mp1|mid|midi|ra|rm|rmx|vqf|amr|aac|vorbis)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:hash:hex:6].[ext]',
                            // publicPath: '../',
                            outputPath: './music/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.(wmv|asf|asx|rmvb|mp4|3gp|mov|m4v|avi|dat|mkv|flv|vob|mod|mng|mpg|3gpp|ogg|webm)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: '[name]_[sha512:hash:hex:6].[ext]',
                            // publicPath: '../',
                            outputPath: './videos/',
                            // 如果为true，则发出一个文件（将文件写入文件系统）。如果为false，则加载程序将返回公共URI，但不会发出文件。
                            // 禁用服务器端软件包的此选项通常很有用。
                            emitFile: true,
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/webComponents/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './simServer4Deno/' ),
                    path.resolve( __dirname, './test/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/graphQL/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
        ];
    },
    watchIgnored_arr = [
        path.resolve( __dirname, './.git/' ),
        path.resolve( __dirname, './.idea/' ),
        path.resolve( __dirname, './assistTools/' ),
        path.resolve( __dirname, './backups/' ),
        path.resolve( __dirname, './bats/' ),
        path.resolve( __dirname, './dist/' ),
        path.resolve( __dirname, './node_modules/' ),
        path.resolve( __dirname, './notes/' ),
        path.resolve( __dirname, './simServer/' ),
        path.resolve( __dirname, './simServer4Deno/' ),
        // path.resolve( __dirname, './src/static/' ),
        path.resolve( __dirname, './test/' ),
        path.resolve( __dirname, './webpackRecords/' ),
    ],
    watchOptions_obj = {
        aggregateTimeout: 100,
        ignored: watchIgnored_arr,
        poll: 100,
    },
    copyWebpackPluginConfig_obj = {
        patterns: [
            {
                context: './src/',
                from: 'static',
                to: './static',
                toType: 'dir',
                force: true,
                globOptions: {
                    concurrency: osLen,
                    deep: Infinity,
                    ignore: [
                        '**/*.gitignore',
                        '**/该文件夹说明.txt',
                    ],
                },
                cacheTransform: true,
            },
            {
                context: './src/workers/',
                from: 'tools',
                to: './workers/tools',
                toType: 'dir',
                force: true,
                globOptions: {
                    concurrency: osLen,
                    deep: Infinity,
                    ignore: [
                        '**/*.gitignore',
                        '**/该文件夹说明.txt',
                    ],
                },
                cacheTransform: true,
            },
        ],
        options: {
            // 并发量，默认100
            concurrency: 100,
        },
    },
    cleanWebpackPluginConfig_fun = arg => ( {
        // 模拟删除文件的操作，true开启，开启后，不会真的删除硬盘上的文件
        dry: false,
        // 将日志写入控制台，true开启，当dry开启时，这个选项总是开启的
        verbose: false,
        // 在重建时自动删除所有未使用的webpack资产，true开启
        cleanStaleWebpackAssets: true,
        // 不允许删除当前的webpack资产，true开启
        protectWebpackAssets: false,
        // 在Webpack编译之前删除一次文件，但是不包括重建过程中的文件（也就是监视模式）
        // 值为空数组时，表示禁用“cleanOnceBeforeBuildPatterns”的功能
        // !test，表示排除test文件
        // 相对于Webpack的output.path目录。
        // 如果在webpack的output.path目录之外，请使用完整路径。path.join
        // 如：'**/*', '!static-files*'
        cleanOnceBeforeBuildPatterns: [
            path.join( __dirname, `./dist/${ arg }/fonts/*` ),
            path.join( __dirname, `./dist/${ arg }/img/*` ),
            path.join( __dirname, `./dist/${ arg }/js/*` ),
            path.join( __dirname, `./dist/${ arg }/music/*` ),
            path.join( __dirname, `./dist/${ arg }/others/*` ),
            path.join( __dirname, `./dist/${ arg }/pages/*` ),
            path.join( __dirname, `./dist/${ arg }/styles/*` ),
            path.join( __dirname, `./dist/${ arg }/videos/*` ),
            path.join( __dirname, `./dist/${ arg }/wasm/*` ),
            path.join( __dirname, `./dist/${ arg }/workers/*` ),
        ],
        // 在每次构建（包括监视模式）后删除与此模式匹配的文件。
        // 如：'static*.*', '!static1.js'
        cleanAfterEveryBuildPatterns: [],
        // true开启，会删除匹配之外的文件
        dangerouslyAllowCleanPatternsOutsideProject: false,
    } ),
    recordsPath_fun = str => {
        const nowDate = new Date( Date.now() ),
            year = nowDate.getFullYear(),
            month = String( nowDate.getMonth() + 1 )
                .padStart( 2, '0' ),
            date = String( nowDate.getDate() )
                .padStart( 2, '0' ),
            hours = String( nowDate.getHours() )
                .padStart( 2, '0' ),
            minutes = String( nowDate.getMinutes() )
                .padStart( 2, '0' ),
            seconds = String( nowDate.getSeconds() )
                .padStart( 2, '0' ),
            day0 = Number( nowDate.getDay() ),
            day = day0 === 0
                  ? '日'
                  : day0,
            result_str = `./webpackRecords/${ str }/${ year }年${ month }月${ date }日${ hours }时${ minutes }分${ seconds }秒_周${ day }.json5`;

        return path.join( __dirname, result_str );
    },
    AssetsWebpackPluginOption_obj = {
        filename: 'ProjectAssets.json',
        fullPath: true,
        // 将清单javascript作为文本属性插入到资源中。接受清单块的名称。
        // manifest是最后一个只包含webpack引导代码的CommonChunk。
        // 当您希望将清单内联到HTML框架中以进行长期缓存时，这对于生产使用非常有用。
        // 如：includeManifest: 'manifest'
        // assets.json:
        // {entries: {manifest: {js: `hashed_manifest.js`, text: 'function(modules)...'}}}
        //
        // Your html template:
        // <script>
        // {assets.entries.manifest.text}
        // </script>
        includeManifest: false,
        manifestFirst: true,
        useCompilerPath: false,
        prettyPrint: false,
        // 格式化资产输出。
        // processOutput: assets => `window.ProjectAssets = ${ JSON.stringify( assets ) }`,
        update: false,
        includeAllFileTypes: true,
        integrity: isPro,
        entrypoints: false,
        metadata: {
            version: '2020.01.01',
            assetsFileName: '../others/ProjectAssets.json',
            externalAssets: require( './configures/CacheResources.js' ).cacheResources,
        },
    },
    // 对于webpack-dev-server，此属性必须位于devServer对象中。
    stats_obj = ( () => {
        const arr1 = [
            // /export .* was not found in/,
            /.*Current directory: .* CaseSensitiveFileNames: false.*/,
            /.*FileWatcher:: Added:: WatchInfo: .*\.json .* Config file.*/,
            /.*Synchronizing program.*/,
            /.*CreatingProgramWith::.*/,
            // /.* roots: .*"].*/,
            /.* options: .*"}.*/,
            /.*FileWatcher:: Added:: WatchInfo: .*node_modules.* Missing file.*/,
            /.*DirectoryWatcher:: Added:: WatchInfo: .* Wild card directory.*/,
            /.*Elapsed:: .* DirectoryWatcher:: Added:: WatchInfo: .* Wild card directory.*/,
        ];

        return {
            // 未定义选项时，统计信息选项的后备值。它优先于本地webpack默认值。
            all: false,
            // 告诉“stats”是否显示资产信息。将“stats.assets”设置为“false”以隐藏它。
            assets: true,
            // 默认值是字符串值：'id'，指示统计信息按给定字段对资产进行排序。
            assetsSort: 'id',
            // 告诉“stats”是否添加生成日期和生成时间信息。将“stats.builtAt”设置为“false”以隐藏它。
            builtAt: true,
            // 告诉“stats”是否添加有关缓存模块的信息（而不是生成的模块）。
            // true会导致那些已被缓存起来的，在每次发生更改导致重新编译时，把那些没发生更改的模块也被输出显示
            cached: false,
            // 告诉“stats”是否添加有关缓存资产的信息。将“stats.cachedAssets”设置为“false”将告诉“stats”只显示发出的文件（而不是生成的文件）。
            // true会导致那些已被缓存起来的，在每次发生更改导致重新编译时，把那些没发生更改的模块也被输出显示
            cachedAssets: false,
            // 告知“stats”是否添加有关子代的信息。true会在首次编译时显示有关子代的信息。
            children: false,
            // 告诉“stats”是否添加有关块的信息。将“stats.chunks”设置为“false”会减少冗长的输出。
            chunks: false,
            // 告诉“stats”是否添加有关namedChunkGroups的信息。true会显示多页入口的各个路口所包含的所有资源
            chunkGroups: false,
            // 告诉“stats”是否将有关已构建模块的信息添加到有关块的信息中。
            chunkModules: false,
            // 告诉“stats”是否添加有关块的起源和块合并的信息。
            chunkOrigins: false,
            // 默认值是字符串值：'id'，指示统计信息按给定字段对块进行排序。
            chunksSort: 'id',
            // 设置上下文目录以缩短请求信息。必须是绝对路径
            context: path.join( __dirname, './src/' ),
            colors: true,
            // 告诉“stats”是否显示每个模块到入口点的距离。
            depth: false,
            // 告诉“stats”是否显示带有相应捆绑商品的入口点。true会显示多页入口的各个路口所包含的所有资源
            entrypoints: false,
            // 告诉“stats”是否显示--env信息。
            env: false,
            // 告诉“stats”是否显示错误。
            errors: true,
            // 告知“stats”是否将详细信息添加到错误中。
            errorDetails: true,
            // 告诉“stats”排除匹配的资产信息。
            // arr1
            // excludeAssets: false,
            // 告诉“stats”排除匹配的模块信息。
            // 将stats.excludeModules设置为false将禁用排除行为。
            // excludeModules: arr1,
            // 同"excludeModules"
            // exclude: arr1,
            // “stats”是否添加有关编译的哈希值的信息。
            hash: true,
            // 告诉“stats”是否添加日志记录输出。
            // string = 'none'(false) | 'error' | 'warn' | 'info'(errors、warnings、info) | 'log'(true，错误，警告，信息消息，日志消息，组，清除。折叠的组以折叠状态显示。) | 'verbose' | boolean
            // 'none'(false) - disable logging
            // 'warn' - errors and warnings only
            logging: 'warn',
            // 告诉“stats”包括指定记录程序（例如插件或加载程序）的调试信息。当stats.logging设置为false时，stats.loggingDebug选项将被忽略。
            // arr1
            // loggingDebug: false,
            // 在日志输出中启用堆栈跟踪以获取错误，警告和跟踪。设置stats.loggingTrace以隐藏跟踪。
            // true 启用日志跟踪
            loggingTrace: true,
            // 设置要显示的最大模块数。
            maxModules: 0,
            // 告诉“stats”是否添加有关已构建模块的信息。
            modules: true,
            // 默认值是字符串值：'id'，指示统计信息按给定字段对模块进行排序。
            modulesSort: 'id',
            // 告诉“stats”显示依赖性和警告/错误的来源。自webpack 2.5.0起，stats.moduleTrace可用。
            moduleTrace: true,
            // 告诉“stats”显示outputPath。
            outputPath: true,
            // 当文件大小超过Performance.maxAssetSize时，告诉“stats”显示性能提示。
            performance: true,
            // 告诉“stats”以显示模块的导出。
            providedExports: false,
            // 告诉“stats”显示publicPath。
            publicPath: true,
            // 告诉“stats”添加有关为什么包含模块的原因的信息。
            reasons: false,
            // 告诉“stats”添加模块的源代码。
            source: false,
            // 告诉“stats”添加计时信息。
            timings: true,
            // 告诉“stats”是否显示使用了模块的哪些导出。
            usedExports: false,
            // 告诉“stats”添加有关所用Webpack版本的信息。
            version: true,
            // 告诉“stats”添加警告。
            warnings: true,
            // 告诉“stats”排除与给定过滤器匹配的警告。
            // arr1
            // warningsFilter: false,
        };
    } )(),
    ForkTsCheckerWebpackPlugin_obj = {
        // 如果为true，则在完成webpack的编译后报告问题。因此，它不会阻止编译。仅在"watch"模式下使用。
        async: true,
        typescript: {
            enabled: true,
            // 单位：MB
            memoryLimit: 4096,
            configFile: path.resolve( __dirname, './tsconfig.json' ),
            // 此配置将覆盖tsconfig.json文件中的配置。支持的字段包括: extends, compilerOptions, include, exclude, files, and references.
            // configOverwrite: {},
            // context: '',
            build: false,
            // 如果使用“babel-loader”，建议使用"write-references"模式来提高初始编译时间。如果使用“ts-loader”，建议使用"write-tsbuildinfo"模式，以不覆盖“ts-loader”发出的文件。
            // readonly write-tsbuildinfo write-references
            mode: 'write-tsbuildinfo',
            // 用于选择我们要执行的诊断的设置。
            diagnosticsOptions: {
                // 句法，默认：false
                syntactic: true,
                // 语义，默认：true
                semantic: true,
                // 声明，默认：false
                declaration: true,
                // 全局，默认：false
                global: true,
            },
            // TypeScript扩展选项
            extensions: {
                vue: {
                    enabled: true,
                    // 将用于分析“.vue”文件的编译器的包名称。如果使用"nativescript-vue"，则可以使用“nativescript-vue-template-compiler”
                    compiler: 'vue-template-compiler',
                },
            },
            // 测量并打印与TypeScript性能相关的计时
            profile: false,
            // 如果提供，这是可以在其中找到TypeScript的自定义路径。
            typescriptPath: require.resolve( 'typescript' ),
        },
        // 可选值：true | undefined
        eslint: undefined,
        issue: {
            include: undefined,
            exclude: undefined,
            // 'all' or 'webpack'，定义要报告的问题范围。如果为“ webpack”，则仅报告与webpack编译相关的错误。否则报告所有错误（例如tsc和eslint命令）。
            scope: 'all',
        },
        // formatter: {},
        // 可用的记录器为: silent, console, and webpack-infrastructure
        logger: {
            // 基础设施
            infrastructure: 'silent',
            // 问题
            issues: 'console',
            devServer: true,
        },
    },
    ForkTsCheckerNotifierWebpackPlugin_obj = {
        // 通知中显示的标题前缀。
        title: 'WebpackNotice2020',
        // 如果设置为true，警告将不会引起通知。
        excludeWarnings: true,
        // 每次触发通知。称其为“噪音模式”。
        alwaysNotify: false,
        // 不要在第一个版本上通知。这使您可以在后续增量构建上收到通知，而无需在初始构建上得到通知。
        skipFirstNotification: true,
        // 跳过有关成功构建的通知。
        skipSuccessful: true,
    },
    ImageminPlugin_obj = {
        // !isPro 设置为true时，它将完全禁用该插件。这对于在开发期间禁用插件以及仅在生产期间启用插件很有用
        disable: true,
        test: /\.(gif|jpe|jpeg|jpg|png|svg|webp)$/i,
        // 设置可以一次运行的 Imagemin 实例的最大数量。设置为 Infinity 可以对每个图像同时运行单独的进程。
        maxConcurrency: osLen,
        // 仅适用于大于此值（以字节为单位）的图像。100KB
        minFileSize: 100 * 1024,
        // 仅适用于小于或等于此值（以字节为单位）的图像。
        // maxFileSize和minFileSize一起可用于通过不同文件大小的多个配置多次包含WebpackImageminPlugin。
        maxFileSize: Infinity,

        // 将给定的对象传递给 imagemin-optipng。设置为null以禁用optipng。
        optipng: {
            // 默认值：3，优化的版本(0到7)，值越大，图片压缩越小
            // 优化级别0启用一组只需最少努力的优化操作。不会更改图像属性，如位深度或颜色类型，也不会重新压缩现有的IDAT数据流。
            // 优化级别1支持单个IDAT压缩试验。选择的审判是什么。OptiPNG认为这可能是最有效的。优化级别2和更高级别支持多个IDAT压缩试验；级别越高，试验越多。
            // 等级和试验：
            // 1：1个试验
            // 2：8个试验
            // 3：16个试验
            // 4：24个试验
            // 5：48个试验
            // 6：120个试验
            // 7：240个试验
            optimizationLevel: 3,
            // 默认值：true，应用位深度减少。
            bitDepthReduction: true,
            // 默认值：true，应用颜色类型减少。
            colorTypeReduction: true,
            // 默认值：true，应用调色板减少。
            paletteReduction: true,
            // 默认值：true，将花费合理的努力来尝试恢复尽可能多的损坏图像数据，但是通常不能保证成功。
            errorRecovery: true,
        },
        // 将给定的对象传递给 imagemin-gifsicle。设置为null以禁用gifsicle。
        gifsicle: {
            // 默认值：false，交错gif以进行渐进式渲染。
            interlaced: false,
            // 默认值：1，在1到3之间选择一个优化级别。
            // 优化级别确定完成多少优化；较高的水平需要更长的时间，但可能会有更好的效果。
            // 仅存储每个图像的更改部分。 还使用透明度进一步缩小文件。 尝试几种优化方法（通常速度较慢，有时效果更好）
            optimizationLevel: 1,
            // 将每个输出GIF中的不同颜色数量减少到num或更少。数值必须在2到256之间。
            // colors: 2,
        },
        // 将给定的对象传递给 imagemin-jpegtran。设置为null可禁用jpegtran。
        jpegtran: {
            // 渐进，默认值：false，无损转换为渐进式。
            progressive: false,
            // 默认值：false，使用算术编码。
            arithmetic: false,
        },
        // 将给定的对象传递给 imagemin-svgo。设置为null可禁用svgo。
        svgo: {},
        // 将给定的对象传递给 imagemin-pngquant。设置为null可禁用pngquant。
        pngquant: {
            // 速度，默认值：4，1（强力）至11（最快）
            // 速度10的质量降低了5％，但比默认速度快8倍。速度11禁用抖动并降低压缩级别。
            speed: 4,
            // 默认值：false，删除可选的元数据。
            strip: false,
            // 质量，数据类型：Array<min: number, max: number>，值范围：Array<0...1, 0...1>
            // 指示pngquant使用满足或超过最大质量所需的最少颜色量。如果转换结果质量低于最小质量，则不会保存图像。
            // Min和max是介于0（最差）到1（完美）之间的数字，类似于JPEG。
            quality: [
                0.3,
                0.5,
            ],
            // 抖动，默认值：1(完整)，值范围0-1，
            // 使用介于0（无）和1（满）之间的小数设置抖动级别。输入false以禁用抖动。
            dithering: 1,
            // 后置，数据类型是number，截断颜色的最低有效位数（每个通道）。当图像将在低深度显示器（例如16位RGB）上输出时使用此功能。
            // pngquant将使几乎不透明的像素完全不透明，并减少半透明颜色的数量。
            // posterize: 1,
            // 打印详细的状态消息。默认值是false
            verbose: false,
        },

        // 将已经缩小的图像缓存到cacheFolder中。在下次运行时，插件将首先检查缓存的图像。如果存在缓存的图像，它将仅使用该图像。
        // 否则，图像将被优化并写入到cacheFolder中以用于以后的构建。
        cacheFolder: path.resolve( __dirname, './node_modules/.cache/imageminPlugin' ),

        // 在这里包括您想要使用imagemin的任何其他插件。
        // 默认情况下，上面的内容包括在内，但是如果您想（或需要）禁用它们（通过将它们设置为空），您可以在这里自己包含它们。
        plugins: [
            imageminWebp( {
                // 预设设置: default, photo, picture, drawing, icon and text.
                preset: 'default',
                // 默认值75，将品质因数设置在0到100之间。
                quality: 75,
                // 将透明压缩质量设置为0到100。
                alphaQuality: 100,
                // 在0（最快）和6（最慢）之间指定要使用的压缩方法。此参数控制编码速度与压缩文件大小和质量之间的权衡。
                method: 4,
                // 设置目标大小（以字节为单位）。
                // size: 1,
                // 将空间噪声整形的幅度设置在0到100之间。
                sns: 80,
                // 将解块滤波器强度设置为0（关闭）到100。
                // filter: 100,
                // 自动调整过滤器强度。
                autoFilter: false,
                // 将滤镜的清晰度设置在0（最清晰）和7（最不清晰）之间。
                sharpness: 0,
                // 无损编码图像。
                lossless: false,
                // 使用附加的有损预处理步骤进行无损编码，其质量因子在0（最大预处理）和100（与无损相同）之间。
                nearLossless: 100,
                // 裁剪图像: Object { x: number, y: number, width: number, height: number }
                // crop: {},
                // 调整图像大小。crop后发生。Object { width: number, height: number }
                // resize: {},
                // 要从输入复制到输出的元数据列表（如果存在）。all none exif icc xmp
                metadata: [ 'all', ],
            } ),
            imageminMozjpeg( {
                // 压缩质量，范围从0（最差）到100（最完美）。
                quality: 50,
                // 默认值true，false创建基线JPEG文件。
                progressive: false,
                // 默认值false，输入文件为Targa格式（通常不需要）。
                targa: false,
                // 默认值false，恢复为标准默认设置，而不是mozjpeg默认设置。
                revert: false,
                // 默认值false，禁用渐进式扫描优化。
                fastCrush: false,
                // 设置直流扫描优化模式。
                // 0 一键扫描所有组件
                // 1 每个组件一次扫描
                // 2 在所有组件的一次扫描和第一组件的一次扫描加其余组件的一次扫描之间进行优化
                dcScanOpt: 1,
                // 网格优化。
                trellis: true,
                // 直流系数的网格优化。
                trellisDC: true,
                // 设置网格优化方法。可用方法：psnr, hvs-psnr, ssim, ms-ssim
                tune: 'hvs-psnr',
                // 通过过冲进行黑白去鸣。
                overshoot: true,
                // 使用算术编码。
                arithmetic: false,
                // 设置DCT方法：
                // int 使用整数DCT
                // fast 使用快速整数DCT（精度较低）
                // float 使用浮点DCT
                dct: 'int',
                // 使用8位量化表条目可实现基线JPEG兼容性。
                quantBaseline: false,
                // 使用预定义的量化表。
                // 0 JPEG Annex K
                // 1 Flat(平面)
                // 2 Custom, tuned for MS-SSIM(自定义，针对MS-SSIM进行了调整)
                // 3 ImageMagick table by N. Robidoux
                // 4 Custom, tuned for PSNR-HVS(定制，针对PSNR-HVS进行了调整)
                // 5 Table from paper by Klein, Silverstein and Carney
                // quantTable: 1,
                // 设置平滑抖动输入的强度。 （1 ... 100）
                // smooth: 50,
                // 设置要使用的最大内存（以千字节为单位，KB）。2MB
                // maxMemory: 2 * 1024,
                // 设置组件采样因子。每个项目都应采用HxV格式，例如2x1。
                // sample: string[],
            } ),
        ],

        /*
         // 外部资源图片，不包含在webpack的资源中
         externalImages: {
         // 'src'
         context: './',

         // 资料来源
         // [ 'src/images/qwe.png', ]
         sources: [],

         // 目的地
         // 'src/public/images'
         destination: null,

         // '[path][name].[ext]'
         fileName: null,
         },
         */
    };

module.exports = {
    entry_obj,
    output_fun,
    resolve_fun,
    externals_obj,
    node_obj,
    performance_obj,
    optimization_fun,
    defineObj_fun,
    splitChunks_obj,
    provide_obj,
    hashedModuleIds_obj,
    browsers_arr,
    moduleRules_fun,
    watchIgnored_arr,
    watchOptions_obj,
    copyWebpackPluginConfig_obj,
    cleanWebpackPluginConfig_fun,
    recordsPath_fun,
    AssetsWebpackPluginOption_obj,
    stats_obj,
    ForkTsCheckerWebpackPlugin_obj,
    ForkTsCheckerNotifierWebpackPlugin_obj,
    ImageminPlugin_obj,
};
