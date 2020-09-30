'use strict';

const os = require( 'os' );
const gql = require( './src' );

// Takes `source` (the source GraphQL query string)
// and `doc` (the parsed GraphQL document) and tacks on
// the imported definitions.
function expandImports( source, doc ){
    const lines = source.split( /\r\n|\r|\n/ );
    let outputCode = `
    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  `;

    lines.some( ( line ) => {
        if( line[ 0 ] === '#' && line.slice( 1 )
                                     .split( ' ' )[ 0 ] === 'import' ){
            const importFile = line.slice( 1 )
                                   .split( ' ' )[ 1 ];
            const parseDocument = `require(${ importFile })`;
            const appendDef = `doc.definitions = doc.definitions.concat(unique(${ parseDocument }.definitions));`;
            outputCode += appendDef + os.EOL;
        }
        return ( line.length !== 0 && line[ 0 ] !== '#' );
    } );

    return outputCode;
}

// ------My Code Start------

const {
    validate: graphqlValidate,
} = require( 'graphql/validation/validate' );
const {
    resolve,
    join,
    dirname,
} = require( 'path' );
const {
    Stats,
    writeFile,
    readFileSync,
    readFile,
} = require( 'fs' );
const pify = require( 'pify' );
const {
    DocumentNode,
    DefinitionNode,
    print: graphqlPrint,
    parse: graphqlParse,
    Source,
    visit,
} = require( 'graphql' );

// 传的字符串是文件路径，输出的是字符串
function MyLoadGql( filePath ){
    if( !filePath ){
        return null;
    }

    try{
        const source = readFileSync( filePath, 'utf8' );

        if( !source ){
            return null;
        }

        const document = MyLoadSource( source, filePath ),
            content = graphqlPrint( document );

        return content;
    }
    catch( e ){
        console.error( e );

        return null;
    }
}

function MyLoadSource( source, filePath ){
    let document = graphqlParse( new Source( source, 'GraphQL/file' ) );

    document = MyExtractImports( source, document, filePath );

    return document;
}

async function stat( loader, filePath ){
    const fsStat = pify( loader.fs.stat.bind( loader.fs ) );

    return fsStat( filePath );
}

function MyExtractImports( source, document, filePath ){
    const lines = source.split( /(\r\n|\r|\n)/ ),
        imports = [];

    lines.forEach( line => {
        // Find lines that match syntax with `#import "<file>"`
        if( line[ 0 ] !== '#' ){
            return;
        }

        const comment = line.slice( 1 )
                            .split( ' ' );

        if( comment[ 0 ] !== 'import' ){
            return;
        }

        const filePathMatch = comment[ 1 ] && comment[ 1 ].match( /^[\"\'](.+)[\"\']/ );

        if( !filePathMatch || !filePathMatch.length ){
            throw new Error( '#import statement must specify a quoted file path' );
        }

        const itemPath = resolve( dirname( filePath ), filePathMatch[ 1 ] );

        imports.push( itemPath );
    } );

    const files = imports,
        contents = files.map( path => [
            readFileSync( path, 'utf8' ),
            path,
        ] ),
        nodes = contents.map( ( [ content, fileContext, ] ) => MyLoadSource( content, fileContext ) ),
        fragmentDefinitions = nodes.reduce( ( defs, node ) => {
            defs.push( ...node.definitions );

            return defs;
        }, [] ),
        newAst = visit( document, {
            enter( node, key, parent, path, ancestors ){
                if( node.kind === 'Document' ){
                    const documentNode = {
                        definitions: [
                            ...fragmentDefinitions,
                            ...node.definitions,
                        ],
                        kind: 'Document',
                    };

                    return documentNode;
                }

                return node;
            },
        } );

    return newAst;
}

// ------My Code End------

module.exports = function ( source ){
    /*
     this，有如下属性:
     _module: {
     userRequest: 'G:\\WebStormWS\\WebProTpl\\src\\graphQL\\GraphQLDemo.graphql',
     resource: 'G:\\WebStormWS\\WebProTpl\\src\\graphQL\\GraphQLDemo.graphql',
     }
     resourcePath: 'G:\\WebStormWS\\WebProTpl\\src\\graphQL\\GraphQLDemo.graphql',

     控制台日志输出:
     this._module.userRequest--->G:\WebStormWS\WebProTpl\src\graphQL\GraphQLDemo.graphql
     this._module.resource--->G:\WebStormWS\WebProTpl\src\graphQL\GraphQLDemo.graphql
     this.resourcePath--->G:\WebStormWS\WebProTpl\src\graphQL\GraphQLDemo.graphql
     */

    this.cacheable();
    const doc = gql`${source}`;

    // 原版的
    /*
     let headerCode = `
     var doc = ${ JSON.stringify( doc ) };
     doc.loc.source = ${ JSON.stringify( doc.loc.source ) };
     `;
     */

    // 自己的
    const MyResource_strC = `\`${ MyLoadGql( this.resourcePath ) }\``;
    let headerCode = `
     var doc = ${ JSON.stringify( doc ) };
     doc.loc.source = ${ JSON.stringify( doc.loc.source ) };
     doc.loc.source.body = ${ MyResource_strC };
     `;

    let outputCode = '';

    // Allow multiple query/mutation definitions in a file. This parses out dependencies
    // at compile time, and then uses those at load time to create minimal query documents
    // We cannot do the latter at compile time due to how the #import code works.
    let operationCount = doc.definitions.reduce( function ( accum, op ){
        if( op.kind === 'OperationDefinition' ){
            return accum + 1;
        }

        return accum;
    }, 0 );

    if( operationCount < 1 ){
        outputCode += `
      module.exports = doc;
    `;
    }
    else{
        outputCode += `
    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      for (var i = 0; i < doc.definitions.length; i++) {
        var element = doc.definitions[i];
        if (element.name && element.name.value == name) {
          return element;
        }
      }
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = {
        kind: doc.kind,
        definitions: [findOperation(doc, operationName)]
      };
      if (doc.hasOwnProperty("loc")) {
        newDoc.loc = doc.loc;
      }

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set();

      // IE 11 doesn't support "new Set(iterable)", so we add the members of opRefs to newRefs one by one
      opRefs.forEach(function(refName) {
        newRefs.add(refName);
      });

      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }

    module.exports = doc;
    `;

        for( const op of
            doc.definitions ){
            if( op.kind === 'OperationDefinition' ){
                if( !op.name ){
                    if( operationCount > 1 ){
                        throw 'Query/mutation names are required for a document with multiple definitions';
                    }
                    else{
                        continue;
                    }
                }

                const opName = op.name.value;
                outputCode += `
        module.exports["${ opName }"] = oneQuery(doc, "${ opName }");
        `;
            }
        }
    }

    const importOutputCode = expandImports( source, doc );
    const allCode = headerCode + os.EOL + importOutputCode + os.EOL + outputCode + os.EOL;

    return allCode;
};
