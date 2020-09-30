/**
 * Project: WebProTpl
 * Author: 12278
 * Email: 2726893248@qq.com
 * CreateDate: 2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import MutationsEventName from './MutationsEventName.esm.js';

Vue.use( Vuex );

const {
    addCountAMutation,
    subCountAMutation,
} = MutationsEventName;

const Store = new Vuex.Store( {
    strict: !isPro,
    state: {
        countA: 0,
        rootState1: 'rootState1',
    },
    getters: {
        countAPlus100: ( state, getters ) => state.countA + 100,
        countAPlus1000Fun: ( state, getters ) => ( num => state.countA + 1000 + num ),

        rootGetters1: ( state, getters, rootState, rootGetters ) => state.rootState1,
    },
    mutations: {
        [ addCountAMutation ]( state, payload = 0 ){
            state.countA = ++state.countA + payload;
        },
        [ subCountAMutation ]( state, payload = 0 ){
            state.countA = --state.countA - payload;
        },

        rootMutations1: ( state, payload ) => {
            state.rootState1 += '>';
        },
    },
    actions: {
        addCountAction( { state, dispatch, commit }, payload = 0 ){
            commit( addCountAMutation, payload );
        },
        subCountAction( { state, dispatch, commit }, payload = 0 ){
            // setTimeout( commit, 3000, subCountAMutation, payload, );
            commit( subCountAMutation, payload );
        },

        rootActions1: ( { state, rootState, getters, rootGetters, dispatch, commit }, payload ) => {
            commit( 'rootMutations1', payload );
        },

        /*在另外一个 action 中也可以分发其他的action，一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。*/
        /*
         // 使用：store.dispatch('actionA').then( () => {} );
         actionA( { dispatch, commit } ){
         return new Promise( ( resolve = () => {
         }, reject = () => {
         } ) => {
         setTimeout( () => {
         commit( 'someMutation' );
         resolve( '完成对“someMutation”的异步分发！！！' );
         }, 1000 );
         } );
         },
         */
    },
    modules: {
        moduleA: {
            state: {
                moduleA: 'moduleA',
            },
            getters: {
                moduleAGetters1: ( state, getters, rootState, rootGetters ) => state.moduleA,
            },
            mutations: {
                moduleAMutations1: ( state, payload ) => {
                    state.moduleA += '>';
                },
            },
            actions: {
                moduleAActions1: ( { state, rootState, getters, rootGetters, dispatch, commit }, payload ) => {
                    commit( 'moduleAMutations1', payload );
                },
            },
        },
        moduleB: {
            namespaced: true,

            state: {
                moduleB: 'moduleB',
            },
            getters: {
                moduleBGetters1: ( state, getters, rootState, rootGetters ) => state.moduleB,
            },
            mutations: {
                moduleBMutations1: ( state, payload ) => {
                    state.moduleB += '>';
                },
            },
            actions: {
                moduleBActions1: ( { state, rootState, getters, rootGetters, dispatch, commit }, payload ) => {
                    commit( 'moduleBMutations1', payload );
                },
            },
            modules: {
                moduleB_1: {
                    namespaced: true,

                    state: {
                        moduleB_1: 'moduleB_1',
                    },
                    getters: {
                        moduleB_1Getters1: ( state, getters, rootState, rootGetters ) => state.moduleB_1,
                    },
                    mutations: {
                        moduleB_1Mutations1: ( state, payload ) => {
                            state.moduleB_1 += '>';
                        },
                    },
                    actions: {
                        moduleB_1Actions1: ( { state, rootState, getters, rootGetters, dispatch, commit }, payload ) => {
                            commit( 'moduleB_1Mutations1', payload );
                        },
                    },
                    modules: {
                        moduleB_1_1: {
                            namespaced: false,

                            state: {
                                moduleB_1_1: 'moduleB_1_1',
                            },
                            getters: {
                                moduleB_1_1Getters1: ( state, getters, rootState, rootGetters ) => state.moduleB_1_1,
                            },
                            mutations: {
                                moduleB_1_1Mutations1: ( state, payload ) => {
                                    state.moduleB_1_1 += '>';
                                },
                            },
                            actions: {
                                moduleB_1_1Actions1: ( { state, rootState, getters, rootGetters, dispatch, commit }, payload ) => {
                                    commit( 'moduleB_1_1Mutations1', payload );
                                },
                            },
                        },
                    },
                },
            },
        },
    },
} );

export {
    Store,
};

export default Store;
