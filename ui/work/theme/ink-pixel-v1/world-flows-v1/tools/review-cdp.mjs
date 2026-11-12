import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url));const page=await(await fetch('http://127.0.0.1:9338/json/new?about:blank',{method:'PUT'})).json();const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0,p=new Map();ws.onmessage=e=>{let m=JSON.parse(e.data);if(m.id){p.get(m.id)?.(m);p.delete(m.id)}};const call=(method,params={})=>new Promise(r=>{let i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});const ev=async expression=>{let r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.result.exceptionDetails)throw Error(JSON.stringify(r.result.exceptionDetails));return r.result.result.value};const wait=ms=>new Promise(r=>setTimeout(r,ms));
await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
export {fs,root,call,ev,wait,ws};
