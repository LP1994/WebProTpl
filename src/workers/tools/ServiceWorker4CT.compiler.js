'use strict';globalThis.importScripts("./tools/WWorker4CT.compiler.js");class ServiceWorker4CT extends WWorker4CT{constructor(a,b={}){super();this._self=void 0;this.onMessageFun=void 0;let c=Object.assign({onMessage:a=>{console.log("onMessage Start");console.dir(a);console.log("onMessage End")}},b);this._self=a;this.onMessageFun=c.onMessage;a.onmessage=a=>void this.onMessageFun(a)}onMessage(a=a=>{}){this.onMessageFun=a}importScripts(...a){this._self.importScripts(...a)}}globalThis.ServiceWorker4CT=ServiceWorker4CT;