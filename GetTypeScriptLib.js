/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let fs = require( 'fs' ),
    path = require( 'path' );

( () => {
    let outPath_str = path.join( __dirname, './' ),
        read_fun = ( filePath_str = '' ) => fs.readFileSync( filePath_str ),
        tsConfig_obj = JSON.parse( read_fun( path.join( __dirname, './tsconfig.json' ) ) ),
        arr1 = fs.readdirSync( path.join( __dirname, './node_modules/typescript/lib' ) )
                 .filter( ( c, i, a ) => !fs.statSync( path.join( __dirname, `./node_modules/typescript/lib/${ c }` ) )
                                            .isDirectory() )
                 .filter( ( c, i, a ) => c.startsWith( 'lib.' ) && c.endsWith( '.d.ts' ) && c !== 'lib.d.ts' )
                 .map( ( c, i, a ) => c.slice( 4, -5 )
                                       .toLowerCase() );

    tsConfig_obj[ 'compilerOptions' ][ 'lib' ] = Array.from( new Set( [
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
                                                      ] ) )
                                                      .sort();

    fs.writeFileSync( outPath_str + 'tsconfig.json', JSON.stringify( tsConfig_obj ) );
} )();
