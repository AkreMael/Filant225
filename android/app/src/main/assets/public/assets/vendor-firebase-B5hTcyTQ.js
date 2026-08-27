import{o as Ul,d as _h}from"./vendor-CnNdDZAq.js";/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nS=()=>{};var Og={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FI={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V=function(n,e){if(!n)throw Os(e)},Os=function(n){return new Error("Firebase Database ("+FI.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},rS=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Bl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,u=l?n[i+2]:0,h=s>>2,f=(s&3)<<4|a>>4;let m=(a&15)<<2|u>>6,_=u&63;l||(_=64,o||(m=64)),r.push(t[h],t[f],t[m],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(UI(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):rS(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const u=i<n.length?t[n.charAt(i)]:64;++i;const f=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||u==null||f==null)throw new iS;const m=s<<2|a>>4;if(r.push(m),u!==64){const _=a<<4&240|u>>2;if(r.push(_),f!==64){const v=u<<6&192|f;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class iS extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const BI=function(n){const e=UI(n);return Bl.encodeByteArray(e,!0)},Yc=function(n){return BI(n).replace(/\./g,"")},Jc=function(n){try{return Bl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sS(n){return qI(void 0,n)}function qI(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!oS(t)||(n[t]=qI(n[t],e[t]));return n}function oS(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aS=()=>$I().__FIREBASE_DEFAULTS__,cS=()=>{if(typeof process>"u"||typeof Og>"u")return;const n=Og.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},lS=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Jc(n[1]);return e&&JSON.parse(e)},ql=()=>{try{return nS()||aS()||cS()||lS()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},WI=n=>{var e,t;return(t=(e=ql())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},nf=n=>{const e=WI(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},GI=()=>{var n;return(n=ql())==null?void 0:n.config},zI=n=>{var e;return(e=ql())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Da(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Yc(JSON.stringify(t)),Yc(JSON.stringify(o)),""].join(".")}const Uo={};function uS(){const n={prod:[],emulator:[]};for(const e of Object.keys(Uo))Uo[e]?n.emulator.push(e):n.prod.push(e);return n}function hS(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let xg=!1;function $l(n,e){if(typeof window>"u"||typeof document>"u"||!en(window.location.host)||Uo[n]===e||Uo[n]||xg)return;Uo[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=uS().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function a(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function l(m,_){m.setAttribute("width","24"),m.setAttribute("id",_),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function u(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{xg=!0,o()},m}function h(m,_){m.setAttribute("id",_),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function f(){const m=hS(r),_=t("text"),v=document.getElementById(_)||document.createElement("span"),P=t("learnmore"),k=document.getElementById(P)||document.createElement("a"),U=t("preprendIcon"),$=document.getElementById(U)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const q=m.element;a(q),h(k,P);const H=u();l($,U),q.append($,v,k,H),document.body.appendChild(q)}s?(v.innerText="Preview backend disconnected.",$.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):($.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,v.innerText="Preview backend running in this workspace."),v.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function sf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(We())}function jI(){var e;const n=(e=ql())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function HI(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function KI(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function fS(){const n=We();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function pS(){return FI.NODE_ADMIN===!0}function QI(){return!jI()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function YI(){return!jI()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Oa(){try{return typeof indexedDB=="object"}catch{return!1}}function of(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}function JI(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mS="FirebaseError";class qt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=mS,Object.setPrototypeOf(this,qt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mn.prototype.create)}}class Mn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?gS(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new qt(i,a,r)}}function gS(n,e){return n.replace(_S,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const _S=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(n){return JSON.parse(n)}function qe(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI=function(n){let e={},t={},r={},i="";try{const s=n.split(".");e=sa(Jc(s[0])||""),t=sa(Jc(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}},yS=function(n){const e=XI(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},IS=function(n){const e=XI(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tn(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function li(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Xc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Zc(n,e,t){const r={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function xt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Vg(s)&&Vg(o)){if(!xt(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Vg(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function No(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Do(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ES{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let f=0;f<16;f++)r[f]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let f=0;f<16;f++)r[f]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let f=16;f<80;f++){const m=r[f-3]^r[f-8]^r[f-14]^r[f-16];r[f]=(m<<1|m>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],u,h;for(let f=0;f<80;f++){f<40?f<20?(u=a^s&(o^a),h=1518500249):(u=s^o^a,h=1859775393):f<60?(u=s&o|a&(s|o),h=2400959708):(u=s^o^a,h=3395469782);const m=(i<<5|i>>>27)+u+l+h+r[f]&4294967295;l=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=m}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function TS(n,e){const t=new wS(n,e);return t.subscribe.bind(t)}class wS{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");vS(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=yh),i.error===void 0&&(i.error=yh),i.complete===void 0&&(i.complete=yh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function vS(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function yh(){}function ui(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AS=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,V(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Wl=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bS=1e3,RS=2,SS=14400*1e3,CS=.5;function Mg(n,e=bS,t=RS){const r=e*Math.pow(t,n),i=Math.round(CS*r*(Math.random()-.5)*2);return Math.min(SS,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n){return n&&n._delegate?n._delegate:n}class Ge{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new pt;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(kS(e))try{this.getOrInitializeService({instanceIdentifier:zr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=zr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=zr){return this.instances.has(e)}getOptions(e=zr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:PS(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=zr){return this.component?this.component.multipleInstances?e:zr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function PS(n){return n===zr?void 0:n}function kS(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Jh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(re||(re={}));const NS={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},DS=re.INFO,OS={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},xS=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=OS[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xs{constructor(e){this.name=e,this._logLevel=DS,this._logHandler=xS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?NS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(MS(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function MS(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Xh="@firebase/app",Lg="0.14.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=new xs("@firebase/app"),LS="@firebase/app-compat",FS="@firebase/analytics-compat",US="@firebase/analytics",BS="@firebase/app-check-compat",qS="@firebase/app-check",$S="@firebase/auth",WS="@firebase/auth-compat",GS="@firebase/database",zS="@firebase/data-connect",jS="@firebase/database-compat",HS="@firebase/functions",KS="@firebase/functions-compat",QS="@firebase/installations",YS="@firebase/installations-compat",JS="@firebase/messaging",XS="@firebase/messaging-compat",ZS="@firebase/performance",eC="@firebase/performance-compat",tC="@firebase/remote-config",nC="@firebase/remote-config-compat",rC="@firebase/storage",iC="@firebase/storage-compat",sC="@firebase/firestore",oC="@firebase/ai",aC="@firebase/firestore-compat",cC="firebase",lC="12.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="[DEFAULT]",uC={[Xh]:"fire-core",[LS]:"fire-core-compat",[US]:"fire-analytics",[FS]:"fire-analytics-compat",[qS]:"fire-app-check",[BS]:"fire-app-check-compat",[$S]:"fire-auth",[WS]:"fire-auth-compat",[GS]:"fire-rtdb",[zS]:"fire-data-connect",[jS]:"fire-rtdb-compat",[HS]:"fire-fn",[KS]:"fire-fn-compat",[QS]:"fire-iid",[YS]:"fire-iid-compat",[JS]:"fire-fcm",[XS]:"fire-fcm-compat",[ZS]:"fire-perf",[eC]:"fire-perf-compat",[tC]:"fire-rc",[nC]:"fire-rc-compat",[rC]:"fire-gcs",[iC]:"fire-gcs-compat",[sC]:"fire-fst",[aC]:"fire-fst-compat",[oC]:"fire-vertex","fire-js":"fire-js",[cC]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=new Map,hC=new Map,Zh=new Map;function Fg(n,e){try{n.container.addComponent(e)}catch(t){Pn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ut(n){const e=n.name;if(Zh.has(e))return Pn.debug(`There were multiple attempts to register component ${e}.`),!1;Zh.set(e,n);for(const t of tl.values())Fg(t,n);for(const t of hC.values())Fg(t,n);return!0}function $t(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function dC(n,e,t=el){$t(n,e).clearInstance(t)}function Ee(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},or=new Mn("app","Firebase",fC);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pC{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ge("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw or.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr=lC;function mC(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:el,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw or.create("bad-app-name",{appName:String(i)});if(t||(t=GI()),!t)throw or.create("no-options");const s=tl.get(i);if(s){if(xt(t,s.options)&&xt(r,s.config))return s;throw or.create("duplicate-app",{appName:i})}const o=new ZI(i);for(const l of Zh.values())o.addComponent(l);const a=new pC(t,r,o);return tl.set(i,a),a}function Vs(n=el){const e=tl.get(n);if(!e&&n===el&&GI())return mC();if(!e)throw or.create("no-app",{appName:n});return e}function $e(n,e,t){let r=uC[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pn.warn(o.join(" "));return}ut(new Ge(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gC="firebase-heartbeat-database",_C=1,oa="firebase-heartbeat-store";let Ih=null;function eE(){return Ih||(Ih=Ul(gC,_C,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(oa)}catch(t){console.warn(t)}}}}).catch(n=>{throw or.create("idb-open",{originalErrorMessage:n.message})})),Ih}async function yC(n){try{const t=(await eE()).transaction(oa),r=await t.objectStore(oa).get(tE(n));return await t.done,r}catch(e){if(e instanceof qt)Pn.warn(e.message);else{const t=or.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Pn.warn(t.message)}}}async function Ug(n,e){try{const r=(await eE()).transaction(oa,"readwrite");await r.objectStore(oa).put(e,tE(n)),await r.done}catch(t){if(t instanceof qt)Pn.warn(t.message);else{const r=or.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Pn.warn(r.message)}}}function tE(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IC=1024,EC=30;class TC{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new vC(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Bg();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>EC){const o=AC(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Pn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Bg(),{heartbeatsToSend:r,unsentEntries:i}=wC(this._heartbeatsCache.heartbeats),s=Yc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Pn.warn(t),""}}}function Bg(){return new Date().toISOString().substring(0,10)}function wC(n,e=IC){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),qg(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),qg(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class vC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Oa()?of().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await yC(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ug(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ug(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function qg(n){return Yc(JSON.stringify({version:2,heartbeats:n})).length}function AC(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bC(n){ut(new Ge("platform-logger",e=>new VS(e),"PRIVATE")),ut(new Ge("heartbeat",e=>new TC(e),"PRIVATE")),$e(Xh,Lg,n),$e(Xh,Lg,"esm2020"),$e("fire-js","")}bC("");var RC="firebase",SC="12.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$e(RC,SC,"app");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CC={PHONE:"phone",TOTP:"totp"},PC={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},kC={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},NC={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},DC={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OC(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}}function nE(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xC=OC,rE=nE,iE=new Mn("auth","Firebase",nE()),VC={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_PASSWORD:"auth/missing-password",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type",INVALID_HOSTING_LINK_DOMAIN:"auth/invalid-hosting-link-domain"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl=new xs("@firebase/auth");function MC(n,...e){nl.logLevel<=re.WARN&&nl.warn(`Auth (${Cr}): ${n}`,...e)}function Mc(n,...e){nl.logLevel<=re.ERROR&&nl.error(`Auth (${Cr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(n,...e){throw cf(n,...e)}function gt(n,...e){return cf(n,...e)}function af(n,e,t){const r={...rE(),[e]:t};return new Mn("auth","Firebase",r).create(e,{appName:n.name})}function et(n){return af(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ms(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Rt(n,"argument-error"),af(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function cf(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return iE.create(n,...e)}function x(n,e,...t){if(!n)throw cf(e,...t)}function an(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Mc(e),new Error(e)}function kn(n,e){n||an(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function lf(){return $g()==="http:"||$g()==="https:"}function $g(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(lf()||HI()||"connection"in navigator)?navigator.onLine:!0}function FC(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,t){this.shortDelay=e,this.longDelay=t,kn(t>e,"Short delay should be less than long delay!"),this.isMobile=sf()||KI()}get(){return LC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(n,e){kn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;an("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;an("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;an("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BC=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],qC=new xa(3e4,6e4);function we(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ve(n,e,t,r,i={}){return oE(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=Ri({key:n.config.apiKey,...o}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:l,...s};return dS()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&en(n.emulatorConfig.host)&&(u.credentials="include"),sE.fetch()(await aE(n,n.config.apiHost,t,a),u)})}async function oE(n,e,t){n._canInitEmulator=!1;const r={...UC,...e};try{const i=new WC(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Oo(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[l,u]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Oo(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Oo(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Oo(n,"user-disabled",o);const h=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw af(n,h,u);Rt(n,h)}}catch(i){if(i instanceof qt)throw i;Rt(n,"network-request-failed",{message:String(i)})}}async function Ln(n,e,t,r,i={}){const s=await ve(n,e,t,r,i);return"mfaPendingCredential"in s&&Rt(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function aE(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?uf(n.config,i):`${n.config.apiScheme}://${i}`;return BC.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function $C(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class WC{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(gt(this.auth,"network-request-failed")),qC.get())})}}function Oo(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=gt(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wg(n){return n!==void 0&&n.getResponse!==void 0}function Gg(n){return n!==void 0&&n.enterprise!==void 0}class cE{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return $C(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GC(n){return(await ve(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function lE(n,e){return ve(n,"GET","/v2/recaptchaConfig",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zC(n,e){return ve(n,"POST","/v1/accounts:delete",e)}async function jC(n,e){return ve(n,"POST","/v1/accounts:update",e)}async function rl(n,e){return ve(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HC(n,e=!1){return M(n).getIdToken(e)}async function uE(n,e=!1){const t=M(n),r=await t.getIdToken(e),i=Gl(r);x(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Bo(Eh(i.auth_time)),issuedAtTime:Bo(Eh(i.iat)),expirationTime:Bo(Eh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Eh(n){return Number(n)*1e3}function Gl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Mc("JWT malformed, contained fewer than 3 sections"),null;try{const i=Jc(t);return i?JSON.parse(i):(Mc("Failed to decode base64 JWT payload"),null)}catch(i){return Mc("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function zg(n){const e=Gl(n);return x(e,"internal-error"),x(typeof e.exp<"u","internal-error"),x(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof qt&&KC(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function KC({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Bo(this.lastLoginAt),this.creationTime=Bo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ca(n){var f;const e=n.auth,t=await n.getIdToken(),r=await Nn(n,rl(e,{idToken:t}));x(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(f=i.providerUserInfo)!=null&&f.length?dE(i.providerUserInfo):[],o=YC(n.providerData,s),a=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!(o!=null&&o.length),u=a?l:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new ed(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function hE(n){const e=M(n);await ca(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function YC(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function dE(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JC(n,e){const t=await oE(n,{},async()=>{const r=Ri({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await aE(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:a,body:r};return n.emulatorConfig&&en(n.emulatorConfig.host)&&(l.credentials="include"),sE.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function XC(n,e){return ve(n,"POST","/v2/accounts:revokeToken",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken<"u","internal-error"),x(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){x(e.length!==0,"internal-error");const t=zg(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(x(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await JC(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new Ji;return r&&(x(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(x(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(x(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ji,this.toJSON())}_performRefresh(){return an("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(n,e){x(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class jt{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new QC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ed(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Nn(this,this.stsTokenManager.getToken(this.auth,e));return x(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return uE(this,e)}reload(){return hE(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new jt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ca(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ee(this.auth.app))return Promise.reject(et(this.auth));const e=await this.getIdToken();return await Nn(this,zC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,l=t._redirectEventId??void 0,u=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:f,emailVerified:m,isAnonymous:_,providerData:v,stsTokenManager:P}=t;x(f&&P,e,"internal-error");const k=Ji.fromJSON(this.name,P);x(typeof f=="string",e,"internal-error"),Qn(r,e.name),Qn(i,e.name),x(typeof m=="boolean",e,"internal-error"),x(typeof _=="boolean",e,"internal-error"),Qn(s,e.name),Qn(o,e.name),Qn(a,e.name),Qn(l,e.name),Qn(u,e.name),Qn(h,e.name);const U=new jt({uid:f,auth:e,email:i,emailVerified:m,displayName:r,isAnonymous:_,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:k,createdAt:u,lastLoginAt:h});return v&&Array.isArray(v)&&(U.providerData=v.map($=>({...$}))),l&&(U._redirectEventId=l),U}static async _fromIdTokenResponse(e,t,r=!1){const i=new Ji;i.updateFromServerResponse(t);const s=new jt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ca(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];x(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?dE(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new Ji;a.updateFromIdToken(r);const l=new jt({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ed(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg=new Map;function vn(n){kn(n instanceof Function,"Expected a class definition");let e=jg.get(n);return e?(kn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,jg.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}fE.type="NONE";const td=fE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(n,e,t){return`firebase:${n}:${e}:${t}`}class Xi{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Lc(this.userKey,i.apiKey,s),this.fullPersistenceKey=Lc("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await rl(this.auth,{idToken:e}).catch(()=>{});return t?jt._fromGetAccountInfoResponse(this.auth,t,e):null}return jt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Xi(vn(td),e,r);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||vn(td);const o=Lc(r,e.config.apiKey,e.name);let a=null;for(const u of t)try{const h=await u._get(o);if(h){let f;if(typeof h=="string"){const m=await rl(e,{idToken:h}).catch(()=>{});if(!m)break;f=await jt._fromGetAccountInfoResponse(e,m,h)}else f=jt._fromJSON(e,h);u!==s&&(a=f),s=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Xi(s,e,r):(s=l[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Xi(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hg(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(_E(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(pE(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(IE(e))return"Blackberry";if(EE(e))return"Webos";if(mE(e))return"Safari";if((e.includes("chrome/")||gE(e))&&!e.includes("edge/"))return"Chrome";if(yE(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function pE(n=We()){return/firefox\//i.test(n)}function mE(n=We()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function gE(n=We()){return/crios\//i.test(n)}function _E(n=We()){return/iemobile/i.test(n)}function yE(n=We()){return/android/i.test(n)}function IE(n=We()){return/blackberry/i.test(n)}function EE(n=We()){return/webos/i.test(n)}function hf(n=We()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ZC(n=We()){var e;return hf(n)&&!!((e=window.navigator)!=null&&e.standalone)}function eP(){return fS()&&document.documentMode===10}function TE(n=We()){return hf(n)||yE(n)||EE(n)||IE(n)||/windows phone/i.test(n)||_E(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wE(n,e=[]){let t;switch(n){case"Browser":t=Hg(We());break;case"Worker":t=`${Hg(We())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Cr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tP{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const l=e(s);o(l)}catch(l){a(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nP(n,e={}){return ve(n,"GET","/v2/passwordPolicy",we(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rP=6;class iP{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??rP,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sP{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kg(this),this.idTokenSubscription=new Kg(this),this.beforeStateQueue=new tP(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=iE,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=vn(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Xi.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await rl(this,{idToken:e}),r=await jt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(Ee(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,a=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(r=l.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ca(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=FC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ee(this.app))return Promise.reject(et(this));const t=e?M(e):null;return t&&x(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ee(this.app)?Promise.reject(et(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ee(this.app)?Promise.reject(et(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(vn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await nP(this),t=new iP(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Mn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await XC(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&vn(e)||this._popupRedirectResolver;x(t,this,"argument-error"),this.redirectPersistenceManager=await Xi.create(this,[vn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wE(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Ee(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&MC(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Oe(n){return M(n)}class Kg{constructor(e){this.auth=e,this.observer=null,this.addObserver=TS(t=>this.observer=t)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Va={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function oP(n){Va=n}function df(n){return Va.loadJS(n)}function aP(){return Va.recaptchaV2Script}function cP(){return Va.recaptchaEnterpriseScript}function lP(){return Va.gapiScript}function vE(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uP=500,hP=6e4,Tc=1e12;class dP{constructor(e){this.auth=e,this.counter=Tc,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new mP(e,this.auth.name,t||{})),this.counter++,r}reset(e){var r;const t=e||Tc;(r=this._widgets.get(t))==null||r.delete(),this._widgets.delete(t)}getResponse(e){var r;const t=e||Tc;return((r=this._widgets.get(t))==null?void 0:r.getResponse())||""}async execute(e){var r;const t=e||Tc;return(r=this._widgets.get(t))==null||r.execute(),""}}class fP{constructor(){this.enterprise=new pP}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class pP{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class mP{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;x(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=gP(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},hP)},uP))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function gP(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const _P="recaptcha-enterprise",qo="NO_RECAPTCHA";class AE{constructor(e){this.type=_P,this.auth=Oe(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{lE(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const u=new cE(l);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,o(u.siteKey)}}).catch(l=>{a(l)})})}function i(s,o,a){const l=window.grecaptcha;Gg(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(u=>{o(u)}).catch(()=>{o(qo)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new fP().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&Gg(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=cP();l.length!==0&&(l+=a),df(l).then(()=>{i(a,s,o)}).catch(u=>{o(u)})}}).catch(a=>{o(a)})})}}async function Io(n,e,t,r=!1,i=!1){const s=new AE(n);let o;if(i)o=qo;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const a={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const l=a.phoneEnrollmentInfo.phoneNumber,u=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const l=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ar(n,e,t,r,i){var s,o;if(i==="EMAIL_PASSWORD_PROVIDER")if((s=n._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Io(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Io(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(a)});else if(i==="PHONE_PROVIDER")if((o=n._getRecaptchaConfig())!=null&&o.isProviderEnabled("PHONE_PROVIDER")){const a=await Io(n,e,t);return r(n,a).catch(async l=>{var u;if(((u=n._getRecaptchaConfig())==null?void 0:u.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const h=await Io(n,e,t,!1,!0);return r(n,h)}return Promise.reject(l)})}else{const a=await Io(n,e,t,!1,!0);return r(n,a)}else return Promise.reject(i+" provider is not supported.")}async function bE(n){const e=Oe(n),t=await lE(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new cE(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new AE(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RE(n,e){const t=$t(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(xt(s,e??{}))return i;Rt(i,"already-initialized")}return t.initialize({options:e})}function yP(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(vn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function SE(n,e,t){const r=Oe(n);x(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=CE(e),{host:o,port:a}=IP(e),l=a===null?"":`:${a}`,u={url:`${s}//${o}${l}/`},h=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){x(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),x(xt(u,r.config.emulator)&&xt(h,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,en(o)?(Da(`${s}//${o}${l}`),$l("Auth",!0)):i||EP()}function CE(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function IP(n){const e=CE(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Qg(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Qg(o)}}}function Qg(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function EP(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return an("not implemented")}_getIdTokenResponse(e){return an("not implemented")}_linkToIdToken(e,t){return an("not implemented")}_getReauthenticationResolver(e){return an("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PE(n,e){return ve(n,"POST","/v1/accounts:resetPassword",we(n,e))}async function TP(n,e){return ve(n,"POST","/v1/accounts:update",e)}async function wP(n,e){return ve(n,"POST","/v1/accounts:signUp",e)}async function vP(n,e){return ve(n,"POST","/v1/accounts:update",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AP(n,e){return Ln(n,"POST","/v1/accounts:signInWithPassword",we(n,e))}async function zl(n,e){return ve(n,"POST","/v1/accounts:sendOobCode",we(n,e))}async function bP(n,e){return zl(n,e)}async function RP(n,e){return zl(n,e)}async function SP(n,e){return zl(n,e)}async function CP(n,e){return zl(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PP(n,e){return Ln(n,"POST","/v1/accounts:signInWithEmailLink",we(n,e))}async function kP(n,e){return Ln(n,"POST","/v1/accounts:signInWithEmailLink",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os extends Ls{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new os(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new os(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ar(e,t,"signInWithPassword",AP,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return PP(e,{email:this._email,oobCode:this._password});default:Rt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ar(e,r,"signUpPassword",wP,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return kP(e,{idToken:t,email:this._email,oobCode:this._password});default:Rt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cn(n,e){return Ln(n,"POST","/v1/accounts:signInWithIdp",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NP="http://localhost";class fn extends Ls{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new fn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Rt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const o=new fn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Cn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Cn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Cn(e,t)}buildRequest(){const e={requestUri:NP,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ri(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yg(n,e){return ve(n,"POST","/v1/accounts:sendVerificationCode",we(n,e))}async function DP(n,e){return Ln(n,"POST","/v1/accounts:signInWithPhoneNumber",we(n,e))}async function OP(n,e){const t=await Ln(n,"POST","/v1/accounts:signInWithPhoneNumber",we(n,e));if(t.temporaryProof)throw Oo(n,"account-exists-with-different-credential",t);return t}const xP={USER_NOT_FOUND:"user-not-found"};async function VP(n,e){const t={...e,operation:"REAUTH"};return Ln(n,"POST","/v1/accounts:signInWithPhoneNumber",we(n,t),xP)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr extends Ls{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new cr({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new cr({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return DP(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return OP(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return VP(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new cr({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MP(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function LP(n){const e=No(Do(n)).link,t=e?No(Do(e)).deep_link_id:null,r=No(Do(n)).deep_link_id;return(r?No(Do(r)).link:null)||r||t||e||n}class Fs{constructor(e){const t=No(Do(e)),r=t.apiKey??null,i=t.oobCode??null,s=MP(t.mode??null);x(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=LP(e);try{return new Fs(t)}catch{return null}}}function FP(n){return Fs.parseLink(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(){this.providerId=Pr.PROVIDER_ID}static credential(e,t){return os._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Fs.parseLink(t);return x(r,"argument-error"),os._fromEmailAndCode(e,r.code,r.tenantId)}}Pr.PROVIDER_ID="password";Pr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Pr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us extends Fn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class $o extends Us{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return x("providerId"in t&&"signInMethod"in t,"argument-error"),fn._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return x(e.idToken||e.accessToken,"argument-error"),fn._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return $o.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return $o.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:a}=e;if(!r&&!i&&!t&&!s||!a)return null;try{return new $o(a)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends Us{constructor(){super("facebook.com")}static credential(e){return fn._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return In.credential(e.oauthAccessToken)}catch{return null}}}In.FACEBOOK_SIGN_IN_METHOD="facebook.com";In.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends Us{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return fn._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return En.credential(t,r)}catch{return null}}}En.GOOGLE_SIGN_IN_METHOD="google.com";En.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends Us{constructor(){super("github.com")}static credential(e){return fn._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tn.credential(e.oauthAccessToken)}catch{return null}}}Tn.GITHUB_SIGN_IN_METHOD="github.com";Tn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UP="http://localhost";class la extends Ls{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return Cn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Cn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Cn(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=t;return!r||!i||!s||r!==i?null:new la(r,s)}static _create(e,t){return new la(e,t)}buildRequest(){return{requestUri:UP,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BP="saml.";class il extends Fn{constructor(e){x(e.startsWith(BP),"argument-error"),super(e)}static credentialFromResult(e){return il.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return il.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=la.fromJSON(e);return x(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return la._create(r,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn extends Us{constructor(){super("twitter.com")}static credential(e,t){return fn._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return wn.credential(t,r)}catch{return null}}}wn.TWITTER_SIGN_IN_METHOD="twitter.com";wn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kE(n,e){return Ln(n,"POST","/v1/accounts:signUp",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await jt._fromIdTokenResponse(e,r,i),o=Jg(r);return new Bt({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Jg(r);return new Bt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Jg(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qP(n){var i;if(Ee(n.app))return Promise.reject(et(n));const e=Oe(n);if(await e._initializationPromise,(i=e.currentUser)!=null&&i.isAnonymous)return new Bt({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await kE(e,{returnSecureToken:!0}),r=await Bt._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl extends qt{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,sl.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new sl(e,t,r,i)}}function NE(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?sl._fromErrorAndOperation(n,s,e,r):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DE(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $P(n,e){const t=M(n);await jl(!0,t,e);const{providerUserInfo:r}=await jC(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=DE(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function ff(n,e,t=!1){const r=await Nn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Bt._forOperation(n,"link",r)}async function jl(n,e,t){await ca(e);const r=DE(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";x(r.has(t)===n,e.auth,i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OE(n,e,t=!1){const{auth:r}=n;if(Ee(r.app))return Promise.reject(et(r));const i="reauthenticate";try{const s=await Nn(n,NE(r,i,e,n),t);x(s.idToken,r,"internal-error");const o=Gl(s.idToken);x(o,r,"internal-error");const{sub:a}=o;return x(n.uid===a,r,"user-mismatch"),Bt._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Rt(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xE(n,e,t=!1){if(Ee(n.app))return Promise.reject(et(n));const r="signIn",i=await NE(n,r,e),s=await Bt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Hl(n,e){return xE(Oe(n),e)}async function VE(n,e){const t=M(n);return await jl(!1,t,e.providerId),ff(t,e)}async function ME(n,e){return OE(M(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WP(n,e){return Ln(n,"POST","/v1/accounts:signInWithCustomToken",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GP(n,e){if(Ee(n.app))return Promise.reject(et(n));const t=Oe(n),r=await WP(t,{token:e,returnSecureToken:!0}),i=await Bt._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?pf._fromServerResponse(e,t):"totpInfo"in t?mf._fromServerResponse(e,t):Rt(e,"internal-error")}}class pf extends Ma{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new pf(t)}}class mf extends Ma{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new mf(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(n,e,t){var r;x(((r=t.url)==null?void 0:r.length)>0,n,"invalid-continue-uri"),x(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),x(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(x(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(x(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gf(n){const e=Oe(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function zP(n,e,t){const r=Oe(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Kl(r,i,t),await ar(r,i,"getOobCode",RP,"EMAIL_PASSWORD_PROVIDER")}async function jP(n,e,t){await PE(M(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&gf(n),r})}async function HP(n,e){await vP(M(n),{oobCode:e})}async function LE(n,e){const t=M(n),r=await PE(t,{oobCode:e}),i=r.requestType;switch(x(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":x(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":x(r.mfaInfo,t,"internal-error");default:x(r.email,t,"internal-error")}let s=null;return r.mfaInfo&&(s=Ma._fromServerResponse(Oe(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function KP(n,e){const{data:t}=await LE(M(n),e);return t.email}async function QP(n,e,t){if(Ee(n.app))return Promise.reject(et(n));const r=Oe(n),o=await ar(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",kE,"EMAIL_PASSWORD_PROVIDER").catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&gf(n),l}),a=await Bt._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function YP(n,e,t){return Ee(n.app)?Promise.reject(et(n)):Hl(M(n),Pr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&gf(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JP(n,e,t){const r=Oe(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,a){x(a.handleCodeInApp,r,"argument-error"),a&&Kl(r,o,a)}s(i,t),await ar(r,i,"getOobCode",SP,"EMAIL_PASSWORD_PROVIDER")}function XP(n,e){const t=Fs.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function ZP(n,e,t){if(Ee(n.app))return Promise.reject(et(n));const r=M(n),i=Pr.credentialWithLink(e,t||aa());return x(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Hl(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ek(n,e){return ve(n,"POST","/v1/accounts:createAuthUri",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tk(n,e){const t=lf()?aa():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await ek(M(n),r);return i||[]}async function nk(n,e){const t=M(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Kl(t.auth,i,e);const{email:s}=await bP(t.auth,i);s!==n.email&&await n.reload()}async function rk(n,e,t){const r=M(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Kl(r.auth,s,t);const{email:o}=await CP(r.auth,s);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ik(n,e){return ve(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sk(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=M(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await Nn(r,ik(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:l})=>l==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function ok(n,e){const t=M(n);return Ee(t.auth.app)?Promise.reject(et(t.auth)):FE(t,e,null)}function ak(n,e){return FE(M(n),null,e)}async function FE(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await Nn(n,TP(r,s));await n._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ck(n){var i,s;if(!n)return null;const{providerId:e}=n,t=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},r=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&(n!=null&&n.idToken)){const o=(s=(i=Gl(n.idToken))==null?void 0:i.firebase)==null?void 0:s.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new Zi(r,a)}}if(!e)return null;switch(e){case"facebook.com":return new lk(r,t);case"github.com":return new uk(r,t);case"google.com":return new hk(r,t);case"twitter.com":return new dk(r,t,n.screenName||null);case"custom":case"anonymous":return new Zi(r,null);default:return new Zi(r,e,t)}}class Zi{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class UE extends Zi{constructor(e,t,r,i){super(e,t,r),this.username=i}}class lk extends Zi{constructor(e,t){super(e,"facebook.com",t)}}class uk extends UE{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class hk extends Zi{constructor(e,t){super(e,"google.com",t)}}class dk extends UE{constructor(e,t,r){super(e,"twitter.com",t,r)}}function fk(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:ck(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pk(n,e){return M(n).setPersistence(e)}function mk(n){return bE(n)}async function gk(n,e){return Oe(n).validatePassword(e)}function BE(n,e,t,r){return M(n).onIdTokenChanged(e,t,r)}function qE(n,e,t){return M(n).beforeAuthStateChanged(e,t)}function _k(n,e,t,r){return M(n).onAuthStateChanged(e,t,r)}function yk(n){M(n).useDeviceLanguage()}function Ik(n,e){return M(n).updateCurrentUser(e)}function Ek(n){return M(n).signOut()}function Tk(n,e){return Oe(n).revokeAccessToken(e)}async function wk(n){return M(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new Zr("enroll",e,t)}static _fromMfaPendingCredential(e){return new Zr("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,r;if(e!=null&&e.multiFactorSession){if((t=e.multiFactorSession)!=null&&t.pendingCredential)return Zr._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if((r=e.multiFactorSession)!=null&&r.idToken)return Zr._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=Oe(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(a=>Ma._fromServerResponse(r,a));x(i.mfaPendingCredential,r,"internal-error");const o=Zr._fromMfaPendingCredential(i.mfaPendingCredential);return new _f(o,s,async a=>{const l=await a._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const u={...i,idToken:l.idToken,refreshToken:l.refreshToken};switch(t.operationType){case"signIn":const h=await Bt._fromIdTokenResponse(r,t.operationType,u);return await r._updateCurrentUser(h.user),h;case"reauthenticate":return x(t.user,r,"internal-error"),Bt._forOperation(t.user,t.operationType,u);default:Rt(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function vk(n,e){var i;const t=M(n),r=e;return x(e.customData.operationType,t,"argument-error"),x((i=r.customData._serverResponse)==null?void 0:i.mfaPendingCredential,t,"argument-error"),_f._fromError(t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(n,e){return ve(n,"POST","/v2/accounts/mfaEnrollment:start",we(n,e))}function Ak(n,e){return ve(n,"POST","/v2/accounts/mfaEnrollment:finalize",we(n,e))}function bk(n,e){return ve(n,"POST","/v2/accounts/mfaEnrollment:start",we(n,e))}function Rk(n,e){return ve(n,"POST","/v2/accounts/mfaEnrollment:finalize",we(n,e))}function Sk(n,e){return ve(n,"POST","/v2/accounts/mfaEnrollment:withdraw",we(n,e))}class yf{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>Ma._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new yf(e)}async getSession(){return Zr._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),s=await Nn(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await Nn(this.user,Sk(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const Th=new WeakMap;function Ck(n){const e=M(n);return Th.has(e)||Th.set(e,yf._fromUser(e)),Th.get(e)}const ol="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ol,"1"),this.storage.removeItem(ol),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pk=1e3,kk=10;class WE extends $E{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=TE(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);eP()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,kk):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Pk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}WE.type="LOCAL";const GE=WE;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nk=1e3;function wh(n){var r;const e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return((r=document.cookie.match(t))==null?void 0:r[1])??null}function vh(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}class zE{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=vh(e);if(window.cookieStore){const r=await window.cookieStore.get(t);return r==null?void 0:r.value}return wh(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;const r=vh(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const r=vh(e);if(window.cookieStore){const a=(u=>{const h=u.changed.find(m=>m.name===r);h&&t(h.value),u.deleted.find(m=>m.name===r)&&t(null)}),l=()=>window.cookieStore.removeEventListener("change",a);return this.listenerUnsubscribes.set(t,l),window.cookieStore.addEventListener("change",a)}let i=wh(r);const s=setInterval(()=>{const a=wh(r);a!==i&&(t(a),i=a)},Nk),o=()=>clearInterval(s);this.listenerUnsubscribes.set(t,o)}_removeListener(e,t){const r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}}zE.type="COOKIE";const Dk=zE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE extends $E{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}jE.type="SESSION";const If=jE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ok(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Ql(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async u=>u(t.origin,s)),l=await Ok(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ql.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,l)=>{const u=Yl("",20);i.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const m=f;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(m.data.response);break;default:clearTimeout(h),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(){return window}function Vk(n){Fe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ef(){return typeof Fe().WorkerGlobalScope<"u"&&typeof Fe().importScripts=="function"}async function Mk(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Lk(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Fk(){return Ef()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HE="firebaseLocalStorageDb",Uk=1,al="firebaseLocalStorage",KE="fbase_key";class La{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Jl(n,e){return n.transaction([al],e?"readwrite":"readonly").objectStore(al)}function Bk(){const n=indexedDB.deleteDatabase(HE);return new La(n).toPromise()}function nd(){const n=indexedDB.open(HE,Uk);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(al,{keyPath:KE})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(al)?e(r):(r.close(),await Bk(),e(await nd()))})})}async function Zg(n,e,t){const r=Jl(n,!0).put({[KE]:e,value:t});return new La(r).toPromise()}async function qk(n,e){const t=Jl(n,!1).get(e),r=await new La(t).toPromise();return r===void 0?null:r.value}function e_(n,e){const t=Jl(n,!0).delete(e);return new La(t).toPromise()}const $k=800,Wk=3;class QE{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await nd(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Wk)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ef()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ql._getInstance(Fk()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Mk(),!this.activeServiceWorker)return;this.sender=new xk(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Lk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await nd();return await Zg(e,ol,"1"),await e_(e,ol),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Zg(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>qk(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>e_(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Jl(i,!1).getAll();return new La(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),$k)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}QE.type="LOCAL";const YE=QE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(n,e){return ve(n,"POST","/v2/accounts/mfaSignIn:start",we(n,e))}function Gk(n,e){return ve(n,"POST","/v2/accounts/mfaSignIn:finalize",we(n,e))}function zk(n,e){return ve(n,"POST","/v2/accounts/mfaSignIn:finalize",we(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah=vE("rcb"),jk=new xa(3e4,6e4);class Hk{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=Fe().grecaptcha)!=null&&e.render)}load(e,t=""){return x(Kk(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Wg(Fe().grecaptcha)?Promise.resolve(Fe().grecaptcha):new Promise((r,i)=>{const s=Fe().setTimeout(()=>{i(gt(e,"network-request-failed"))},jk.get());Fe()[Ah]=()=>{Fe().clearTimeout(s),delete Fe()[Ah];const a=Fe().grecaptcha;if(!a||!Wg(a)){i(gt(e,"internal-error"));return}const l=a.render;a.render=(u,h)=>{const f=l(u,h);return this.counter++,f},this.hostLanguage=t,r(a)};const o=`${aP()}?${Ri({onload:Ah,render:"explicit",hl:t})}`;df(o).catch(()=>{clearTimeout(s),i(gt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!((t=Fe().grecaptcha)!=null&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Kk(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class Qk{async load(e){return new dP(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo="recaptcha",Yk={theme:"light",type:"image"};class Jk{constructor(e,t,r={...Yk}){this.parameters=r,this.type=Wo,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Oe(e),this.isInvisible=this.parameters.size==="invisible",x(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;x(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Qk:new Hk,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){x(!this.parameters.sitekey,this.auth,"argument-error"),x(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),x(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=Fe()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){x(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){x(lf()&&!Ef(),this.auth,"internal-error"),await Xk(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await GC(this.auth);x(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return x(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Xk(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=cr._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Zk(n,e,t){if(Ee(n.app))return Promise.reject(et(n));const r=Oe(n),i=await Xl(r,e,M(t));return new Tf(i,s=>Hl(r,s))}async function eN(n,e,t){const r=M(n);await jl(!1,r,"phone");const i=await Xl(r.auth,e,M(t));return new Tf(i,s=>VE(r,s))}async function tN(n,e,t){const r=M(n);if(Ee(r.auth.app))return Promise.reject(et(r.auth));const i=await Xl(r.auth,e,M(t));return new Tf(i,s=>ME(r,s))}async function Xl(n,e,t){var r;if(!n._getRecaptchaConfig())try{await bE(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const s=i.session;if("phoneNumber"in i){x(s.type==="enroll",n,"internal-error");const o={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await ar(n,o,"mfaSmsEnrollment",async(h,f)=>{if(f.phoneEnrollmentInfo.captchaResponse===qo){x((t==null?void 0:t.type)===Wo,h,"argument-error");const m=await bh(h,f,t);return Xg(h,m)}return Xg(h,f)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneSessionInfo.sessionInfo}else{x(s.type==="signin",n,"internal-error");const o=((r=i.multiFactorHint)==null?void 0:r.uid)||i.multiFactorUid;x(o,n,"missing-multi-factor-info");const a={mfaPendingCredential:s.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await ar(n,a,"mfaSmsSignIn",async(f,m)=>{if(m.phoneSignInInfo.captchaResponse===qo){x((t==null?void 0:t.type)===Wo,f,"argument-error");const _=await bh(f,m,t);return t_(f,_)}return t_(f,m)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await ar(n,s,"sendVerificationCode",async(u,h)=>{if(h.captchaResponse===qo){x((t==null?void 0:t.type)===Wo,u,"argument-error");const f=await bh(u,h,t);return Yg(u,f)}return Yg(u,h)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).sessionInfo}}finally{t==null||t._reset()}}async function nN(n,e){const t=M(n);if(Ee(t.auth.app))return Promise.reject(et(t.auth));await ff(t,e)}async function bh(n,e,t){x(t.type===Wo,n,"argument-error");const r=await t.verify();x(typeof r=="string",n,"argument-error");const i={...e};if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,a=i.phoneEnrollmentInfo.clientType,l=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:a,recaptchaVersion:l}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,a=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:a}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e){this.providerId=ri.PROVIDER_ID,this.auth=Oe(e)}verifyPhoneNumber(e,t){return Xl(this.auth,e,M(t))}static credential(e,t){return cr._fromVerification(e,t)}static credentialFromResult(e){const t=e;return ri.credentialFromTaggedObject(t)}static credentialFromError(e){return ri.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?cr._fromTokenResponse(t,r):null}}ri.PROVIDER_ID="phone";ri.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(n,e){return e?vn(e):(x(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf extends Ls{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Cn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Cn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Cn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function rN(n){return xE(n.auth,new wf(n),n.bypassAuthState)}function iN(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),OE(t,new wf(n),n.bypassAuthState)}async function sN(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),ff(t,new wf(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rN;case"linkViaPopup":case"linkViaRedirect":return sN;case"reauthViaPopup":case"reauthViaRedirect":return iN;default:Rt(this.auth,"internal-error")}}resolve(e){kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oN=new xa(2e3,1e4);async function aN(n,e,t){if(Ee(n.app))return Promise.reject(gt(n,"operation-not-supported-in-this-environment"));const r=Oe(n);Ms(n,e,Fn);const i=Si(r,t);return new An(r,"signInViaPopup",e,i).executeNotNull()}async function cN(n,e,t){const r=M(n);if(Ee(r.auth.app))return Promise.reject(gt(r.auth,"operation-not-supported-in-this-environment"));Ms(r.auth,e,Fn);const i=Si(r.auth,t);return new An(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function lN(n,e,t){const r=M(n);Ms(r.auth,e,Fn);const i=Si(r.auth,t);return new An(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class An extends JE{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,An.currentPopupAction&&An.currentPopupAction.cancel(),An.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){kn(this.filter.length===1,"Popup operations only handle one event");const e=Yl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(gt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(gt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,An.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(gt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,oN.get())};e()}}An.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uN="pendingRedirect",Fc=new Map;class hN extends JE{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Fc.get(this.auth._key());if(!e){try{const r=await dN(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Fc.set(this.auth._key(),e)}return this.bypassAuthState||Fc.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function dN(n,e){const t=ZE(e),r=XE(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function vf(n,e){return XE(n)._set(ZE(e),"true")}function fN(n,e){Fc.set(n._key(),e)}function XE(n){return vn(n._redirectPersistence)}function ZE(n){return Lc(uN,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pN(n,e,t){return mN(n,e,t)}async function mN(n,e,t){if(Ee(n.app))return Promise.reject(et(n));const r=Oe(n);Ms(n,e,Fn),await r._initializationPromise;const i=Si(r,t);return await vf(i,r),i._openRedirect(r,e,"signInViaRedirect")}function gN(n,e,t){return _N(n,e,t)}async function _N(n,e,t){const r=M(n);if(Ms(r.auth,e,Fn),Ee(r.auth.app))return Promise.reject(et(r.auth));await r.auth._initializationPromise;const i=Si(r.auth,t);await vf(i,r.auth);const s=await tT(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function yN(n,e,t){return IN(n,e,t)}async function IN(n,e,t){const r=M(n);Ms(r.auth,e,Fn),await r.auth._initializationPromise;const i=Si(r.auth,t);await jl(!1,r,e.providerId),await vf(i,r.auth);const s=await tT(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function EN(n,e){return await Oe(n)._initializationPromise,eT(n,e,!1)}async function eT(n,e,t=!1){if(Ee(n.app))return Promise.reject(et(n));const r=Oe(n),i=Si(r,e),o=await new hN(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function tT(n){const e=Yl(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TN=600*1e3;class wN{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!vN(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!nT(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(gt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=TN&&this.cachedEventUids.clear(),this.cachedEventUids.has(n_(e))}saveEventToCache(e){this.cachedEventUids.add(n_(e)),this.lastProcessedEventTime=Date.now()}}function n_(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function nT({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function vN(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return nT(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AN(n,e={}){return ve(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bN=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,RN=/^https?/;async function SN(n){if(n.config.emulator)return;const{authorizedDomains:e}=await AN(n);for(const t of e)try{if(CN(t))return}catch{}Rt(n,"unauthorized-domain")}function CN(n){const e=aa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!RN.test(t))return!1;if(bN.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PN=new xa(3e4,6e4);function r_(){const n=Fe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function kN(n){return new Promise((e,t)=>{var i,s,o;function r(){r_(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{r_(),t(gt(n,"network-request-failed"))},timeout:PN.get()})}if((s=(i=Fe().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=Fe().gapi)!=null&&o.load)r();else{const a=vE("iframefcb");return Fe()[a]=()=>{gapi.load?r():t(gt(n,"network-request-failed"))},df(`${lP()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw Uc=null,e})}let Uc=null;function NN(n){return Uc=Uc||kN(n),Uc}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DN=new xa(5e3,15e3),ON="__/auth/iframe",xN="emulator/auth/iframe",VN={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},MN=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function LN(n){const e=n.config;x(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?uf(e,xN):`https://${n.config.authDomain}/${ON}`,r={apiKey:e.apiKey,appName:n.name,v:Cr},i=MN.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ri(r).slice(1)}`}async function FN(n){const e=await NN(n),t=Fe().gapi;return x(t,n,"internal-error"),e.open({where:document.body,url:LN(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:VN,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=gt(n,"network-request-failed"),a=Fe().setTimeout(()=>{s(o)},DN.get());function l(){Fe().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UN={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},BN=500,qN=600,$N="_blank",WN="http://localhost";class i_{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function GN(n,e,t,r=BN,i=qN){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l={...UN,width:r.toString(),height:i.toString(),top:s,left:o},u=We().toLowerCase();t&&(a=gE(u)?$N:t),pE(u)&&(e=e||WN,l.scrollbars="yes");const h=Object.entries(l).reduce((m,[_,v])=>`${m}${_}=${v},`,"");if(ZC(u)&&a!=="_self")return zN(e||"",a),new i_(null);const f=window.open(e||"",a,h);x(f,n,"popup-blocked");try{f.focus()}catch{}return new i_(f)}function zN(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jN="__/auth/handler",HN="emulator/auth/handler",KN=encodeURIComponent("fac");async function s_(n,e,t,r,i,s){x(n.config.authDomain,n,"auth-domain-config-required"),x(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Cr,eventId:i};if(e instanceof Fn){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Xc(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,f]of Object.entries({}))o[h]=f}if(e instanceof Us){const h=e.getScopes().filter(f=>f!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),u=l?`#${KN}=${encodeURIComponent(l)}`:"";return`${QN(n)}?${Ri(a).slice(1)}${u}`}function QN({config:n}){return n.emulator?uf(n,HN):`https://${n.authDomain}/${jN}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="webStorageSupport";class YN{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=If,this._completeRedirectFn=eT,this._overrideRedirectResult=fN}async _openPopup(e,t,r,i){var o;kn((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await s_(e,t,r,aa(),i);return GN(e,s,Yl())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await s_(e,t,r,aa(),i);return Vk(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(kn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await FN(e),r=new wN(e);return t.register("authEvent",i=>(x(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Rh,{type:Rh},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Rh];s!==void 0&&t(!!s),Rt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=SN(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return TE()||mE()||hf()}}const rT=YN;class iT{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return an("unexpected MultiFactorSessionType")}}}class Af extends iT{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Af(e)}_finalizeEnroll(e,t,r){return Ak(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Gk(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class sT{constructor(){}static assertion(e){return Af._fromCredential(e)}}sT.FACTOR_ID="phone";class oT{static assertionForEnrollment(e,t){return ua._fromSecret(e,t)}static assertionForSignIn(e,t){return ua._fromEnrollmentId(e,t)}static async generateSecret(e){var i;const t=e;x(typeof((i=t.user)==null?void 0:i.auth)<"u","internal-error");const r=await bk(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Zl._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}}oT.FACTOR_ID="totp";class ua extends iT{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new ua(t,void 0,e)}static _fromEnrollmentId(e,t){return new ua(t,e)}async _finalizeEnroll(e,t,r){return x(typeof this.secret<"u",e,"argument-error"),Rk(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){x(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const r={verificationCode:this.otp};return zk(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class Zl{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Zl(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var i;let r=!1;return(wc(e)||wc(t))&&(r=!0),r&&(wc(e)&&(e=((i=this.auth.currentUser)==null?void 0:i.email)||"unknownuser"),wc(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function wc(n){return typeof n>"u"||(n==null?void 0:n.length)===0}var o_="@firebase/auth",a_="1.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JN{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XN(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ZN(n){ut(new Ge("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;x(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wE(n)},u=new sP(r,i,s,l);return yP(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),ut(new Ge("auth-internal",e=>{const t=Oe(e.getProvider("auth").getImmediate());return(r=>new JN(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),$e(o_,a_,XN(n)),$e(o_,a_,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eD=300,tD=zI("authIdTokenMaxAge")||eD;let c_=null;const nD=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>tD)return;const i=t==null?void 0:t.token;c_!==i&&(c_=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function rD(n=Vs()){const e=$t(n,"auth");if(e.isInitialized())return e.getImmediate();const t=RE(n,{popupRedirectResolver:rT,persistence:[YE,GE,If]}),r=zI("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=nD(s.toString());qE(t,o,()=>o(t.currentUser)),BE(t,a=>o(a))}}const i=WI("auth");return i&&SE(t,`http://${i}`),t}function iD(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}oP({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=gt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",iD().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ZN("Browser");const G4=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:DC,ActionCodeURL:Fs,AuthCredential:Ls,AuthErrorCodes:VC,EmailAuthCredential:os,EmailAuthProvider:Pr,FacebookAuthProvider:In,FactorId:CC,GithubAuthProvider:Tn,GoogleAuthProvider:En,OAuthCredential:fn,OAuthProvider:$o,OperationType:NC,PhoneAuthCredential:cr,PhoneAuthProvider:ri,PhoneMultiFactorGenerator:sT,ProviderId:PC,RecaptchaVerifier:Jk,SAMLAuthProvider:il,SignInMethod:kC,TotpMultiFactorGenerator:oT,TotpSecret:Zl,TwitterAuthProvider:wn,applyActionCode:HP,beforeAuthStateChanged:qE,browserCookiePersistence:Dk,browserLocalPersistence:GE,browserPopupRedirectResolver:rT,browserSessionPersistence:If,checkActionCode:LE,confirmPasswordReset:jP,connectAuthEmulator:SE,createUserWithEmailAndPassword:QP,debugErrorMap:xC,deleteUser:wk,fetchSignInMethodsForEmail:tk,getAdditionalUserInfo:fk,getAuth:rD,getIdToken:HC,getIdTokenResult:uE,getMultiFactorResolver:vk,getRedirectResult:EN,inMemoryPersistence:td,indexedDBLocalPersistence:YE,initializeAuth:RE,initializeRecaptchaConfig:mk,isSignInWithEmailLink:XP,linkWithCredential:VE,linkWithPhoneNumber:eN,linkWithPopup:lN,linkWithRedirect:yN,multiFactor:Ck,onAuthStateChanged:_k,onIdTokenChanged:BE,parseActionCodeURL:FP,prodErrorMap:rE,reauthenticateWithCredential:ME,reauthenticateWithPhoneNumber:tN,reauthenticateWithPopup:cN,reauthenticateWithRedirect:gN,reload:hE,revokeAccessToken:Tk,sendEmailVerification:nk,sendPasswordResetEmail:zP,sendSignInLinkToEmail:JP,setPersistence:pk,signInAnonymously:qP,signInWithCredential:Hl,signInWithCustomToken:GP,signInWithEmailAndPassword:YP,signInWithEmailLink:ZP,signInWithPhoneNumber:Zk,signInWithPopup:aN,signInWithRedirect:pN,signOut:Ek,unlink:$P,updateCurrentUser:Ik,updateEmail:ok,updatePassword:ak,updatePhoneNumber:nN,updateProfile:sk,useDeviceLanguage:yk,validatePassword:gk,verifyBeforeUpdateEmail:rk,verifyPasswordResetCode:KP},Symbol.toStringTag,{value:"Module"}));var l_=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var lr,aT;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function E(){}E.prototype=y.prototype,T.F=y.prototype,T.prototype=new E,T.prototype.constructor=T,T.D=function(A,w,C){for(var I=Array(arguments.length-2),yt=2;yt<arguments.length;yt++)I[yt-2]=arguments[yt];return y.prototype[w].apply(A,I)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,y,E){E||(E=0);const A=Array(16);if(typeof y=="string")for(var w=0;w<16;++w)A[w]=y.charCodeAt(E++)|y.charCodeAt(E++)<<8|y.charCodeAt(E++)<<16|y.charCodeAt(E++)<<24;else for(w=0;w<16;++w)A[w]=y[E++]|y[E++]<<8|y[E++]<<16|y[E++]<<24;y=T.g[0],E=T.g[1],w=T.g[2];let C=T.g[3],I;I=y+(C^E&(w^C))+A[0]+3614090360&4294967295,y=E+(I<<7&4294967295|I>>>25),I=C+(w^y&(E^w))+A[1]+3905402710&4294967295,C=y+(I<<12&4294967295|I>>>20),I=w+(E^C&(y^E))+A[2]+606105819&4294967295,w=C+(I<<17&4294967295|I>>>15),I=E+(y^w&(C^y))+A[3]+3250441966&4294967295,E=w+(I<<22&4294967295|I>>>10),I=y+(C^E&(w^C))+A[4]+4118548399&4294967295,y=E+(I<<7&4294967295|I>>>25),I=C+(w^y&(E^w))+A[5]+1200080426&4294967295,C=y+(I<<12&4294967295|I>>>20),I=w+(E^C&(y^E))+A[6]+2821735955&4294967295,w=C+(I<<17&4294967295|I>>>15),I=E+(y^w&(C^y))+A[7]+4249261313&4294967295,E=w+(I<<22&4294967295|I>>>10),I=y+(C^E&(w^C))+A[8]+1770035416&4294967295,y=E+(I<<7&4294967295|I>>>25),I=C+(w^y&(E^w))+A[9]+2336552879&4294967295,C=y+(I<<12&4294967295|I>>>20),I=w+(E^C&(y^E))+A[10]+4294925233&4294967295,w=C+(I<<17&4294967295|I>>>15),I=E+(y^w&(C^y))+A[11]+2304563134&4294967295,E=w+(I<<22&4294967295|I>>>10),I=y+(C^E&(w^C))+A[12]+1804603682&4294967295,y=E+(I<<7&4294967295|I>>>25),I=C+(w^y&(E^w))+A[13]+4254626195&4294967295,C=y+(I<<12&4294967295|I>>>20),I=w+(E^C&(y^E))+A[14]+2792965006&4294967295,w=C+(I<<17&4294967295|I>>>15),I=E+(y^w&(C^y))+A[15]+1236535329&4294967295,E=w+(I<<22&4294967295|I>>>10),I=y+(w^C&(E^w))+A[1]+4129170786&4294967295,y=E+(I<<5&4294967295|I>>>27),I=C+(E^w&(y^E))+A[6]+3225465664&4294967295,C=y+(I<<9&4294967295|I>>>23),I=w+(y^E&(C^y))+A[11]+643717713&4294967295,w=C+(I<<14&4294967295|I>>>18),I=E+(C^y&(w^C))+A[0]+3921069994&4294967295,E=w+(I<<20&4294967295|I>>>12),I=y+(w^C&(E^w))+A[5]+3593408605&4294967295,y=E+(I<<5&4294967295|I>>>27),I=C+(E^w&(y^E))+A[10]+38016083&4294967295,C=y+(I<<9&4294967295|I>>>23),I=w+(y^E&(C^y))+A[15]+3634488961&4294967295,w=C+(I<<14&4294967295|I>>>18),I=E+(C^y&(w^C))+A[4]+3889429448&4294967295,E=w+(I<<20&4294967295|I>>>12),I=y+(w^C&(E^w))+A[9]+568446438&4294967295,y=E+(I<<5&4294967295|I>>>27),I=C+(E^w&(y^E))+A[14]+3275163606&4294967295,C=y+(I<<9&4294967295|I>>>23),I=w+(y^E&(C^y))+A[3]+4107603335&4294967295,w=C+(I<<14&4294967295|I>>>18),I=E+(C^y&(w^C))+A[8]+1163531501&4294967295,E=w+(I<<20&4294967295|I>>>12),I=y+(w^C&(E^w))+A[13]+2850285829&4294967295,y=E+(I<<5&4294967295|I>>>27),I=C+(E^w&(y^E))+A[2]+4243563512&4294967295,C=y+(I<<9&4294967295|I>>>23),I=w+(y^E&(C^y))+A[7]+1735328473&4294967295,w=C+(I<<14&4294967295|I>>>18),I=E+(C^y&(w^C))+A[12]+2368359562&4294967295,E=w+(I<<20&4294967295|I>>>12),I=y+(E^w^C)+A[5]+4294588738&4294967295,y=E+(I<<4&4294967295|I>>>28),I=C+(y^E^w)+A[8]+2272392833&4294967295,C=y+(I<<11&4294967295|I>>>21),I=w+(C^y^E)+A[11]+1839030562&4294967295,w=C+(I<<16&4294967295|I>>>16),I=E+(w^C^y)+A[14]+4259657740&4294967295,E=w+(I<<23&4294967295|I>>>9),I=y+(E^w^C)+A[1]+2763975236&4294967295,y=E+(I<<4&4294967295|I>>>28),I=C+(y^E^w)+A[4]+1272893353&4294967295,C=y+(I<<11&4294967295|I>>>21),I=w+(C^y^E)+A[7]+4139469664&4294967295,w=C+(I<<16&4294967295|I>>>16),I=E+(w^C^y)+A[10]+3200236656&4294967295,E=w+(I<<23&4294967295|I>>>9),I=y+(E^w^C)+A[13]+681279174&4294967295,y=E+(I<<4&4294967295|I>>>28),I=C+(y^E^w)+A[0]+3936430074&4294967295,C=y+(I<<11&4294967295|I>>>21),I=w+(C^y^E)+A[3]+3572445317&4294967295,w=C+(I<<16&4294967295|I>>>16),I=E+(w^C^y)+A[6]+76029189&4294967295,E=w+(I<<23&4294967295|I>>>9),I=y+(E^w^C)+A[9]+3654602809&4294967295,y=E+(I<<4&4294967295|I>>>28),I=C+(y^E^w)+A[12]+3873151461&4294967295,C=y+(I<<11&4294967295|I>>>21),I=w+(C^y^E)+A[15]+530742520&4294967295,w=C+(I<<16&4294967295|I>>>16),I=E+(w^C^y)+A[2]+3299628645&4294967295,E=w+(I<<23&4294967295|I>>>9),I=y+(w^(E|~C))+A[0]+4096336452&4294967295,y=E+(I<<6&4294967295|I>>>26),I=C+(E^(y|~w))+A[7]+1126891415&4294967295,C=y+(I<<10&4294967295|I>>>22),I=w+(y^(C|~E))+A[14]+2878612391&4294967295,w=C+(I<<15&4294967295|I>>>17),I=E+(C^(w|~y))+A[5]+4237533241&4294967295,E=w+(I<<21&4294967295|I>>>11),I=y+(w^(E|~C))+A[12]+1700485571&4294967295,y=E+(I<<6&4294967295|I>>>26),I=C+(E^(y|~w))+A[3]+2399980690&4294967295,C=y+(I<<10&4294967295|I>>>22),I=w+(y^(C|~E))+A[10]+4293915773&4294967295,w=C+(I<<15&4294967295|I>>>17),I=E+(C^(w|~y))+A[1]+2240044497&4294967295,E=w+(I<<21&4294967295|I>>>11),I=y+(w^(E|~C))+A[8]+1873313359&4294967295,y=E+(I<<6&4294967295|I>>>26),I=C+(E^(y|~w))+A[15]+4264355552&4294967295,C=y+(I<<10&4294967295|I>>>22),I=w+(y^(C|~E))+A[6]+2734768916&4294967295,w=C+(I<<15&4294967295|I>>>17),I=E+(C^(w|~y))+A[13]+1309151649&4294967295,E=w+(I<<21&4294967295|I>>>11),I=y+(w^(E|~C))+A[4]+4149444226&4294967295,y=E+(I<<6&4294967295|I>>>26),I=C+(E^(y|~w))+A[11]+3174756917&4294967295,C=y+(I<<10&4294967295|I>>>22),I=w+(y^(C|~E))+A[2]+718787259&4294967295,w=C+(I<<15&4294967295|I>>>17),I=E+(C^(w|~y))+A[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(w+(I<<21&4294967295|I>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+C&4294967295}r.prototype.v=function(T,y){y===void 0&&(y=T.length);const E=y-this.blockSize,A=this.C;let w=this.h,C=0;for(;C<y;){if(w==0)for(;C<=E;)i(this,T,C),C+=this.blockSize;if(typeof T=="string"){for(;C<y;)if(A[w++]=T.charCodeAt(C++),w==this.blockSize){i(this,A),w=0;break}}else for(;C<y;)if(A[w++]=T[C++],w==this.blockSize){i(this,A),w=0;break}}this.h=w,this.o+=y},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;y=this.o*8;for(var E=T.length-8;E<T.length;++E)T[E]=y&255,y/=256;for(this.v(T),T=Array(16),y=0,E=0;E<4;++E)for(let A=0;A<32;A+=8)T[y++]=this.g[E]>>>A&255;return T};function s(T,y){var E=a;return Object.prototype.hasOwnProperty.call(E,T)?E[T]:E[T]=y(T)}function o(T,y){this.h=y;const E=[];let A=!0;for(let w=T.length-1;w>=0;w--){const C=T[w]|0;A&&C==y||(E[w]=C,A=!1)}this.g=E}var a={};function l(T){return-128<=T&&T<128?s(T,function(y){return new o([y|0],y<0?-1:0)}):new o([T|0],T<0?-1:0)}function u(T){if(isNaN(T)||!isFinite(T))return f;if(T<0)return k(u(-T));const y=[];let E=1;for(let A=0;T>=E;A++)y[A]=T/E|0,E*=4294967296;return new o(y,0)}function h(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return k(h(T.substring(1),y));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=u(Math.pow(y,8));let A=f;for(let C=0;C<T.length;C+=8){var w=Math.min(8,T.length-C);const I=parseInt(T.substring(C,C+w),y);w<8?(w=u(Math.pow(y,w)),A=A.j(w).add(u(I))):(A=A.j(E),A=A.add(u(I)))}return A}var f=l(0),m=l(1),_=l(16777216);n=o.prototype,n.m=function(){if(P(this))return-k(this).m();let T=0,y=1;for(let E=0;E<this.g.length;E++){const A=this.i(E);T+=(A>=0?A:4294967296+A)*y,y*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(v(this))return"0";if(P(this))return"-"+k(this).toString(T);const y=u(Math.pow(T,6));var E=this;let A="";for(;;){const w=H(E,y).g;E=U(E,w.j(y));let C=((E.g.length>0?E.g[0]:E.h)>>>0).toString(T);if(E=w,v(E))return C+A;for(;C.length<6;)C="0"+C;A=C+A}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function v(T){if(T.h!=0)return!1;for(let y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function P(T){return T.h==-1}n.l=function(T){return T=U(this,T),P(T)?-1:v(T)?0:1};function k(T){const y=T.g.length,E=[];for(let A=0;A<y;A++)E[A]=~T.g[A];return new o(E,~T.h).add(m)}n.abs=function(){return P(this)?k(this):this},n.add=function(T){const y=Math.max(this.g.length,T.g.length),E=[];let A=0;for(let w=0;w<=y;w++){let C=A+(this.i(w)&65535)+(T.i(w)&65535),I=(C>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);A=I>>>16,C&=65535,I&=65535,E[w]=I<<16|C}return new o(E,E[E.length-1]&-2147483648?-1:0)};function U(T,y){return T.add(k(y))}n.j=function(T){if(v(this)||v(T))return f;if(P(this))return P(T)?k(this).j(k(T)):k(k(this).j(T));if(P(T))return k(this.j(k(T)));if(this.l(_)<0&&T.l(_)<0)return u(this.m()*T.m());const y=this.g.length+T.g.length,E=[];for(var A=0;A<2*y;A++)E[A]=0;for(A=0;A<this.g.length;A++)for(let w=0;w<T.g.length;w++){const C=this.i(A)>>>16,I=this.i(A)&65535,yt=T.i(w)>>>16,Fr=T.i(w)&65535;E[2*A+2*w]+=I*Fr,$(E,2*A+2*w),E[2*A+2*w+1]+=C*Fr,$(E,2*A+2*w+1),E[2*A+2*w+1]+=I*yt,$(E,2*A+2*w+1),E[2*A+2*w+2]+=C*yt,$(E,2*A+2*w+2)}for(T=0;T<y;T++)E[T]=E[2*T+1]<<16|E[2*T];for(T=y;T<2*y;T++)E[T]=0;return new o(E,0)};function $(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function q(T,y){this.g=T,this.h=y}function H(T,y){if(v(y))throw Error("division by zero");if(v(T))return new q(f,f);if(P(T))return y=H(k(T),y),new q(k(y.g),k(y.h));if(P(y))return y=H(T,k(y)),new q(k(y.g),y.h);if(T.g.length>30){if(P(T)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var E=m,A=y;A.l(T)<=0;)E=Z(E),A=Z(A);var w=ie(E,1),C=ie(A,1);for(A=ie(A,2),E=ie(E,2);!v(A);){var I=C.add(A);I.l(T)<=0&&(w=w.add(E),C=I),A=ie(A,1),E=ie(E,1)}return y=U(T,w.j(y)),new q(w,y)}for(w=f;T.l(y)>=0;){for(E=Math.max(1,Math.floor(T.m()/y.m())),A=Math.ceil(Math.log(E)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),C=u(E),I=C.j(y);P(I)||I.l(T)>0;)E-=A,C=u(E),I=C.j(y);v(C)&&(C=m),w=w.add(C),T=U(T,I)}return new q(w,T)}n.B=function(T){return H(this,T).h},n.and=function(T){const y=Math.max(this.g.length,T.g.length),E=[];for(let A=0;A<y;A++)E[A]=this.i(A)&T.i(A);return new o(E,this.h&T.h)},n.or=function(T){const y=Math.max(this.g.length,T.g.length),E=[];for(let A=0;A<y;A++)E[A]=this.i(A)|T.i(A);return new o(E,this.h|T.h)},n.xor=function(T){const y=Math.max(this.g.length,T.g.length),E=[];for(let A=0;A<y;A++)E[A]=this.i(A)^T.i(A);return new o(E,this.h^T.h)};function Z(T){const y=T.g.length+1,E=[];for(let A=0;A<y;A++)E[A]=T.i(A)<<1|T.i(A-1)>>>31;return new o(E,T.h)}function ie(T,y){const E=y>>5;y%=32;const A=T.g.length-E,w=[];for(let C=0;C<A;C++)w[C]=y>0?T.i(C+E)>>>y|T.i(C+E+1)<<32-y:T.i(C+E);return new o(w,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,aT=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,lr=o}).apply(typeof l_<"u"?l_:typeof self<"u"?self:typeof window<"u"?window:{});var vc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cT,xo,lT,Bc,rd,uT,hT,dT;(function(){var n,e=Object.defineProperty;function t(c){c=[typeof globalThis=="object"&&globalThis,c,typeof window=="object"&&window,typeof self=="object"&&self,typeof vc=="object"&&vc];for(var d=0;d<c.length;++d){var p=c[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=t(this);function i(c,d){if(d)e:{var p=r;c=c.split(".");for(var g=0;g<c.length-1;g++){var R=c[g];if(!(R in p))break e;p=p[R]}c=c[c.length-1],g=p[c],d=d(g),d!=g&&d!=null&&e(p,c,{configurable:!0,writable:!0,value:d})}}i("Symbol.dispose",function(c){return c||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(c){return c||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(c){return c||function(d){var p=[],g;for(g in d)Object.prototype.hasOwnProperty.call(d,g)&&p.push([g,d[g]]);return p}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function a(c){var d=typeof c;return d=="object"&&c!=null||d=="function"}function l(c,d,p){return c.call.apply(c.bind,arguments)}function u(c,d,p){return u=l,u.apply(null,arguments)}function h(c,d){var p=Array.prototype.slice.call(arguments,1);return function(){var g=p.slice();return g.push.apply(g,arguments),c.apply(this,g)}}function f(c,d){function p(){}p.prototype=d.prototype,c.Z=d.prototype,c.prototype=new p,c.prototype.constructor=c,c.Ob=function(g,R,N){for(var B=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)B[Y-2]=arguments[Y];return d.prototype[R].apply(g,B)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?c=>c&&AsyncContext.Snapshot.wrap(c):c=>c;function _(c){const d=c.length;if(d>0){const p=Array(d);for(let g=0;g<d;g++)p[g]=c[g];return p}return[]}function v(c,d){for(let g=1;g<arguments.length;g++){const R=arguments[g];var p=typeof R;if(p=p!="object"?p:R?Array.isArray(R)?"array":p:"null",p=="array"||p=="object"&&typeof R.length=="number"){p=c.length||0;const N=R.length||0;c.length=p+N;for(let B=0;B<N;B++)c[p+B]=R[B]}else c.push(R)}}class P{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return this.h>0?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function k(c){o.setTimeout(()=>{throw c},0)}function U(){var c=T;let d=null;return c.g&&(d=c.g,c.g=c.g.next,c.g||(c.h=null),d.next=null),d}class ${constructor(){this.h=this.g=null}add(d,p){const g=q.get();g.set(d,p),this.h?this.h.next=g:this.g=g,this.h=g}}var q=new P(()=>new H,c=>c.reset());class H{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let Z,ie=!1,T=new $,y=()=>{const c=Promise.resolve(void 0);Z=()=>{c.then(E)}};function E(){for(var c;c=U();){try{c.h.call(c.g)}catch(p){k(p)}var d=q;d.j(c),d.h<100&&(d.h++,c.next=d.g,d.g=c)}ie=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(c,d){this.type=c,this.g=this.target=d,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var C=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var c=!1,d=Object.defineProperty({},"passive",{get:function(){c=!0}});try{const p=()=>{};o.addEventListener("test",p,d),o.removeEventListener("test",p,d)}catch{}return c})();function I(c){return/^[\s\xa0]*$/.test(c)}function yt(c,d){w.call(this,c?c.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,c&&this.init(c,d)}f(yt,w),yt.prototype.init=function(c,d){const p=this.type=c.type,g=c.changedTouches&&c.changedTouches.length?c.changedTouches[0]:null;this.target=c.target||c.srcElement,this.g=d,d=c.relatedTarget,d||(p=="mouseover"?d=c.fromElement:p=="mouseout"&&(d=c.toElement)),this.relatedTarget=d,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=c.clientX!==void 0?c.clientX:c.pageX,this.clientY=c.clientY!==void 0?c.clientY:c.pageY,this.screenX=c.screenX||0,this.screenY=c.screenY||0),this.button=c.button,this.key=c.key||"",this.ctrlKey=c.ctrlKey,this.altKey=c.altKey,this.shiftKey=c.shiftKey,this.metaKey=c.metaKey,this.pointerId=c.pointerId||0,this.pointerType=c.pointerType,this.state=c.state,this.i=c,c.defaultPrevented&&yt.Z.h.call(this)},yt.prototype.h=function(){yt.Z.h.call(this);const c=this.i;c.preventDefault?c.preventDefault():c.returnValue=!1};var Fr="closure_listenable_"+(Math.random()*1e6|0),AR=0;function bR(c,d,p,g,R){this.listener=c,this.proxy=null,this.src=d,this.type=p,this.capture=!!g,this.ha=R,this.key=++AR,this.da=this.fa=!1}function oc(c){c.da=!0,c.listener=null,c.proxy=null,c.src=null,c.ha=null}function ac(c,d,p){for(const g in c)d.call(p,c[g],g,c)}function RR(c,d){for(const p in c)d.call(void 0,c[p],p,c)}function Dm(c){const d={};for(const p in c)d[p]=c[p];return d}const Om="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function xm(c,d){let p,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(p in g)c[p]=g[p];for(let N=0;N<Om.length;N++)p=Om[N],Object.prototype.hasOwnProperty.call(g,p)&&(c[p]=g[p])}}function cc(c){this.src=c,this.g={},this.h=0}cc.prototype.add=function(c,d,p,g,R){const N=c.toString();c=this.g[N],c||(c=this.g[N]=[],this.h++);const B=Ku(c,d,g,R);return B>-1?(d=c[B],p||(d.fa=!1)):(d=new bR(d,this.src,N,!!g,R),d.fa=p,c.push(d)),d};function Hu(c,d){const p=d.type;if(p in c.g){var g=c.g[p],R=Array.prototype.indexOf.call(g,d,void 0),N;(N=R>=0)&&Array.prototype.splice.call(g,R,1),N&&(oc(d),c.g[p].length==0&&(delete c.g[p],c.h--))}}function Ku(c,d,p,g){for(let R=0;R<c.length;++R){const N=c[R];if(!N.da&&N.listener==d&&N.capture==!!p&&N.ha==g)return R}return-1}var Qu="closure_lm_"+(Math.random()*1e6|0),Yu={};function Vm(c,d,p,g,R){if(Array.isArray(d)){for(let N=0;N<d.length;N++)Vm(c,d[N],p,g,R);return null}return p=Fm(p),c&&c[Fr]?c.J(d,p,a(g)?!!g.capture:!1,R):SR(c,d,p,!1,g,R)}function SR(c,d,p,g,R,N){if(!d)throw Error("Invalid event type");const B=a(R)?!!R.capture:!!R;let Y=Xu(c);if(Y||(c[Qu]=Y=new cc(c)),p=Y.add(d,p,g,B,N),p.proxy)return p;if(g=CR(),p.proxy=g,g.src=c,g.listener=p,c.addEventListener)C||(R=B),R===void 0&&(R=!1),c.addEventListener(d.toString(),g,R);else if(c.attachEvent)c.attachEvent(Lm(d.toString()),g);else if(c.addListener&&c.removeListener)c.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return p}function CR(){function c(p){return d.call(c.src,c.listener,p)}const d=PR;return c}function Mm(c,d,p,g,R){if(Array.isArray(d))for(var N=0;N<d.length;N++)Mm(c,d[N],p,g,R);else g=a(g)?!!g.capture:!!g,p=Fm(p),c&&c[Fr]?(c=c.i,N=String(d).toString(),N in c.g&&(d=c.g[N],p=Ku(d,p,g,R),p>-1&&(oc(d[p]),Array.prototype.splice.call(d,p,1),d.length==0&&(delete c.g[N],c.h--)))):c&&(c=Xu(c))&&(d=c.g[d.toString()],c=-1,d&&(c=Ku(d,p,g,R)),(p=c>-1?d[c]:null)&&Ju(p))}function Ju(c){if(typeof c!="number"&&c&&!c.da){var d=c.src;if(d&&d[Fr])Hu(d.i,c);else{var p=c.type,g=c.proxy;d.removeEventListener?d.removeEventListener(p,g,c.capture):d.detachEvent?d.detachEvent(Lm(p),g):d.addListener&&d.removeListener&&d.removeListener(g),(p=Xu(d))?(Hu(p,c),p.h==0&&(p.src=null,d[Qu]=null)):oc(c)}}}function Lm(c){return c in Yu?Yu[c]:Yu[c]="on"+c}function PR(c,d){if(c.da)c=!0;else{d=new yt(d,this);const p=c.listener,g=c.ha||c.src;c.fa&&Ju(c),c=p.call(g,d)}return c}function Xu(c){return c=c[Qu],c instanceof cc?c:null}var Zu="__closure_events_fn_"+(Math.random()*1e9>>>0);function Fm(c){return typeof c=="function"?c:(c[Zu]||(c[Zu]=function(d){return c.handleEvent(d)}),c[Zu])}function rt(){A.call(this),this.i=new cc(this),this.M=this,this.G=null}f(rt,A),rt.prototype[Fr]=!0,rt.prototype.removeEventListener=function(c,d,p,g){Mm(this,c,d,p,g)};function ht(c,d){var p,g=c.G;if(g)for(p=[];g;g=g.G)p.push(g);if(c=c.M,g=d.type||d,typeof d=="string")d=new w(d,c);else if(d instanceof w)d.target=d.target||c;else{var R=d;d=new w(g,c),xm(d,R)}R=!0;let N,B;if(p)for(B=p.length-1;B>=0;B--)N=d.g=p[B],R=lc(N,g,!0,d)&&R;if(N=d.g=c,R=lc(N,g,!0,d)&&R,R=lc(N,g,!1,d)&&R,p)for(B=0;B<p.length;B++)N=d.g=p[B],R=lc(N,g,!1,d)&&R}rt.prototype.N=function(){if(rt.Z.N.call(this),this.i){var c=this.i;for(const d in c.g){const p=c.g[d];for(let g=0;g<p.length;g++)oc(p[g]);delete c.g[d],c.h--}}this.G=null},rt.prototype.J=function(c,d,p,g){return this.i.add(String(c),d,!1,p,g)},rt.prototype.K=function(c,d,p,g){return this.i.add(String(c),d,!0,p,g)};function lc(c,d,p,g){if(d=c.i.g[String(d)],!d)return!0;d=d.concat();let R=!0;for(let N=0;N<d.length;++N){const B=d[N];if(B&&!B.da&&B.capture==p){const Y=B.listener,Be=B.ha||B.src;B.fa&&Hu(c.i,B),R=Y.call(Be,g)!==!1&&R}}return R&&!g.defaultPrevented}function kR(c,d){if(typeof c!="function")if(c&&typeof c.handleEvent=="function")c=u(c.handleEvent,c);else throw Error("Invalid listener argument");return Number(d)>2147483647?-1:o.setTimeout(c,d||0)}function Um(c){c.g=kR(()=>{c.g=null,c.i&&(c.i=!1,Um(c))},c.l);const d=c.h;c.h=null,c.m.apply(null,d)}class NR extends A{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:Um(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function no(c){A.call(this),this.h=c,this.g={}}f(no,A);var Bm=[];function qm(c){ac(c.g,function(d,p){this.g.hasOwnProperty(p)&&Ju(d)},c),c.g={}}no.prototype.N=function(){no.Z.N.call(this),qm(this)},no.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var eh=o.JSON.stringify,DR=o.JSON.parse,OR=class{stringify(c){return o.JSON.stringify(c,void 0)}parse(c){return o.JSON.parse(c,void 0)}};function $m(){}function Wm(){}var ro={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function th(){w.call(this,"d")}f(th,w);function nh(){w.call(this,"c")}f(nh,w);var Ur={},Gm=null;function uc(){return Gm=Gm||new rt}Ur.Ia="serverreachability";function zm(c){w.call(this,Ur.Ia,c)}f(zm,w);function io(c){const d=uc();ht(d,new zm(d))}Ur.STAT_EVENT="statevent";function jm(c,d){w.call(this,Ur.STAT_EVENT,c),this.stat=d}f(jm,w);function dt(c){const d=uc();ht(d,new jm(d,c))}Ur.Ja="timingevent";function Hm(c,d){w.call(this,Ur.Ja,c),this.size=d}f(Hm,w);function so(c,d){if(typeof c!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){c()},d)}function oo(){this.g=!0}oo.prototype.ua=function(){this.g=!1};function xR(c,d,p,g,R,N){c.info(function(){if(c.g)if(N){var B="",Y=N.split("&");for(let pe=0;pe<Y.length;pe++){var Be=Y[pe].split("=");if(Be.length>1){const He=Be[0];Be=Be[1];const rn=He.split("_");B=rn.length>=2&&rn[1]=="type"?B+(He+"="+Be+"&"):B+(He+"=redacted&")}}}else B=null;else B=N;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+d+`
`+p+`
`+B})}function VR(c,d,p,g,R,N,B){c.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+d+`
`+p+`
`+N+" "+B})}function Li(c,d,p,g){c.info(function(){return"XMLHTTP TEXT ("+d+"): "+LR(c,p)+(g?" "+g:"")})}function MR(c,d){c.info(function(){return"TIMEOUT: "+d})}oo.prototype.info=function(){};function LR(c,d){if(!c.g)return d;if(!d)return null;try{const N=JSON.parse(d);if(N){for(c=0;c<N.length;c++)if(Array.isArray(N[c])){var p=N[c];if(!(p.length<2)){var g=p[1];if(Array.isArray(g)&&!(g.length<1)){var R=g[0];if(R!="noop"&&R!="stop"&&R!="close")for(let B=1;B<g.length;B++)g[B]=""}}}}return eh(N)}catch{return d}}var hc={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Km={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Qm;function rh(){}f(rh,$m),rh.prototype.g=function(){return new XMLHttpRequest},Qm=new rh;function ao(c){return encodeURIComponent(String(c))}function FR(c){var d=1;c=c.split(":");const p=[];for(;d>0&&c.length;)p.push(c.shift()),d--;return c.length&&p.push(c.join(":")),p}function Wn(c,d,p,g){this.j=c,this.i=d,this.l=p,this.S=g||1,this.V=new no(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ym}function Ym(){this.i=null,this.g="",this.h=!1}var Jm={},ih={};function sh(c,d,p){c.M=1,c.A=fc(nn(d)),c.u=p,c.R=!0,Xm(c,null)}function Xm(c,d){c.F=Date.now(),dc(c),c.B=nn(c.A);var p=c.B,g=c.S;Array.isArray(g)||(g=[String(g)]),hg(p.i,"t",g),c.C=0,p=c.j.L,c.h=new Ym,c.g=Pg(c.j,p?d:null,!c.u),c.P>0&&(c.O=new NR(u(c.Y,c,c.g),c.P)),d=c.V,p=c.g,g=c.ba;var R="readystatechange";Array.isArray(R)||(R&&(Bm[0]=R.toString()),R=Bm);for(let N=0;N<R.length;N++){const B=Vm(p,R[N],g||d.handleEvent,!1,d.h||d);if(!B)break;d.g[B.key]=B}d=c.J?Dm(c.J):{},c.u?(c.v||(c.v="POST"),d["Content-Type"]="application/x-www-form-urlencoded",c.g.ea(c.B,c.v,c.u,d)):(c.v="GET",c.g.ea(c.B,c.v,null,d)),io(),xR(c.i,c.v,c.B,c.l,c.S,c.u)}Wn.prototype.ba=function(c){c=c.target;const d=this.O;d&&jn(c)==3?d.j():this.Y(c)},Wn.prototype.Y=function(c){try{if(c==this.g)e:{const Y=jn(this.g),Be=this.g.ya(),pe=this.g.ca();if(!(Y<3)&&(Y!=3||this.g&&(this.h.h||this.g.la()||yg(this.g)))){this.K||Y!=4||Be==7||(Be==8||pe<=0?io(3):io(2)),oh(this);var d=this.g.ca();this.X=d;var p=UR(this);if(this.o=d==200,VR(this.i,this.v,this.B,this.l,this.S,Y,d),this.o){if(this.U&&!this.L){t:{if(this.g){var g,R=this.g;if((g=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(g)){var N=g;break t}}N=null}if(c=N)Li(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ah(this,c);else{this.o=!1,this.m=3,dt(12),Br(this),co(this);break e}}if(this.R){c=!0;let He;for(;!this.K&&this.C<p.length;)if(He=BR(this,p),He==ih){Y==4&&(this.m=4,dt(14),c=!1),Li(this.i,this.l,null,"[Incomplete Response]");break}else if(He==Jm){this.m=4,dt(15),Li(this.i,this.l,p,"[Invalid Chunk]"),c=!1;break}else Li(this.i,this.l,He,null),ah(this,He);if(Zm(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||p.length!=0||this.h.h||(this.m=1,dt(16),c=!1),this.o=this.o&&c,!c)Li(this.i,this.l,p,"[Invalid Chunked Response]"),Br(this),co(this);else if(p.length>0&&!this.W){this.W=!0;var B=this.j;B.g==this&&B.aa&&!B.P&&(B.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),mh(B),B.P=!0,dt(11))}}else Li(this.i,this.l,p,null),ah(this,p);Y==4&&Br(this),this.o&&!this.K&&(Y==4?bg(this.j,this):(this.o=!1,dc(this)))}else eS(this.g),d==400&&p.indexOf("Unknown SID")>0?(this.m=3,dt(12)):(this.m=0,dt(13)),Br(this),co(this)}}}catch{}finally{}};function UR(c){if(!Zm(c))return c.g.la();const d=yg(c.g);if(d==="")return"";let p="";const g=d.length,R=jn(c.g)==4;if(!c.h.i){if(typeof TextDecoder>"u")return Br(c),co(c),"";c.h.i=new o.TextDecoder}for(let N=0;N<g;N++)c.h.h=!0,p+=c.h.i.decode(d[N],{stream:!(R&&N==g-1)});return d.length=0,c.h.g+=p,c.C=0,c.h.g}function Zm(c){return c.g?c.v=="GET"&&c.M!=2&&c.j.Aa:!1}function BR(c,d){var p=c.C,g=d.indexOf(`
`,p);return g==-1?ih:(p=Number(d.substring(p,g)),isNaN(p)?Jm:(g+=1,g+p>d.length?ih:(d=d.slice(g,g+p),c.C=g+p,d)))}Wn.prototype.cancel=function(){this.K=!0,Br(this)};function dc(c){c.T=Date.now()+c.H,eg(c,c.H)}function eg(c,d){if(c.D!=null)throw Error("WatchDog timer not null");c.D=so(u(c.aa,c),d)}function oh(c){c.D&&(o.clearTimeout(c.D),c.D=null)}Wn.prototype.aa=function(){this.D=null;const c=Date.now();c-this.T>=0?(MR(this.i,this.B),this.M!=2&&(io(),dt(17)),Br(this),this.m=2,co(this)):eg(this,this.T-c)};function co(c){c.j.I==0||c.K||bg(c.j,c)}function Br(c){oh(c);var d=c.O;d&&typeof d.dispose=="function"&&d.dispose(),c.O=null,qm(c.V),c.g&&(d=c.g,c.g=null,d.abort(),d.dispose())}function ah(c,d){try{var p=c.j;if(p.I!=0&&(p.g==c||ch(p.h,c))){if(!c.L&&ch(p.h,c)&&p.I==3){try{var g=p.Ba.g.parse(d)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<c.F)yc(p),gc(p);else break e;ph(p),dt(18)}}else p.xa=R[1],0<p.xa-p.K&&R[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=so(u(p.Va,p),6e3));rg(p.h)<=1&&p.ta&&(p.ta=void 0)}else $r(p,11)}else if((c.L||p.g==c)&&yc(p),!I(d))for(R=p.Ba.g.parse(d),d=0;d<R.length;d++){let pe=R[d];const He=pe[0];if(!(He<=p.K))if(p.K=He,pe=pe[1],p.I==2)if(pe[0]=="c"){p.M=pe[1],p.ba=pe[2];const rn=pe[3];rn!=null&&(p.ka=rn,p.j.info("VER="+p.ka));const Wr=pe[4];Wr!=null&&(p.za=Wr,p.j.info("SVER="+p.za));const Hn=pe[5];Hn!=null&&typeof Hn=="number"&&Hn>0&&(g=1.5*Hn,p.O=g,p.j.info("backChannelRequestTimeoutMs_="+g)),g=p;const Kn=c.g;if(Kn){const Ec=Kn.g?Kn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ec){var N=g.h;N.g||Ec.indexOf("spdy")==-1&&Ec.indexOf("quic")==-1&&Ec.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(lh(N,N.h),N.h=null))}if(g.G){const gh=Kn.g?Kn.g.getResponseHeader("X-HTTP-Session-Id"):null;gh&&(g.wa=gh,ye(g.J,g.G,gh))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-c.F,p.j.info("Handshake RTT: "+p.T+"ms")),g=p;var B=c;if(g.na=Cg(g,g.L?g.ba:null,g.W),B.L){ig(g.h,B);var Y=B,Be=g.O;Be&&(Y.H=Be),Y.D&&(oh(Y),dc(Y)),g.g=B}else vg(g);p.i.length>0&&_c(p)}else pe[0]!="stop"&&pe[0]!="close"||$r(p,7);else p.I==3&&(pe[0]=="stop"||pe[0]=="close"?pe[0]=="stop"?$r(p,7):fh(p):pe[0]!="noop"&&p.l&&p.l.qa(pe),p.A=0)}}io(4)}catch{}}var qR=class{constructor(c,d){this.g=c,this.map=d}};function tg(c){this.l=c||10,o.PerformanceNavigationTiming?(c=o.performance.getEntriesByType("navigation"),c=c.length>0&&(c[0].nextHopProtocol=="hq"||c[0].nextHopProtocol=="h2")):c=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=c?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ng(c){return c.h?!0:c.g?c.g.size>=c.j:!1}function rg(c){return c.h?1:c.g?c.g.size:0}function ch(c,d){return c.h?c.h==d:c.g?c.g.has(d):!1}function lh(c,d){c.g?c.g.add(d):c.h=d}function ig(c,d){c.h&&c.h==d?c.h=null:c.g&&c.g.has(d)&&c.g.delete(d)}tg.prototype.cancel=function(){if(this.i=sg(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const c of this.g.values())c.cancel();this.g.clear()}};function sg(c){if(c.h!=null)return c.i.concat(c.h.G);if(c.g!=null&&c.g.size!==0){let d=c.i;for(const p of c.g.values())d=d.concat(p.G);return d}return _(c.i)}var og=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $R(c,d){if(c){c=c.split("&");for(let p=0;p<c.length;p++){const g=c[p].indexOf("=");let R,N=null;g>=0?(R=c[p].substring(0,g),N=c[p].substring(g+1)):R=c[p],d(R,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function Gn(c){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let d;c instanceof Gn?(this.l=c.l,lo(this,c.j),this.o=c.o,this.g=c.g,uo(this,c.u),this.h=c.h,uh(this,dg(c.i)),this.m=c.m):c&&(d=String(c).match(og))?(this.l=!1,lo(this,d[1]||"",!0),this.o=ho(d[2]||""),this.g=ho(d[3]||"",!0),uo(this,d[4]),this.h=ho(d[5]||"",!0),uh(this,d[6]||"",!0),this.m=ho(d[7]||"")):(this.l=!1,this.i=new po(null,this.l))}Gn.prototype.toString=function(){const c=[];var d=this.j;d&&c.push(fo(d,ag,!0),":");var p=this.g;return(p||d=="file")&&(c.push("//"),(d=this.o)&&c.push(fo(d,ag,!0),"@"),c.push(ao(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&c.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&c.push("/"),c.push(fo(p,p.charAt(0)=="/"?zR:GR,!0))),(p=this.i.toString())&&c.push("?",p),(p=this.m)&&c.push("#",fo(p,HR)),c.join("")},Gn.prototype.resolve=function(c){const d=nn(this);let p=!!c.j;p?lo(d,c.j):p=!!c.o,p?d.o=c.o:p=!!c.g,p?d.g=c.g:p=c.u!=null;var g=c.h;if(p)uo(d,c.u);else if(p=!!c.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var R=d.h.lastIndexOf("/");R!=-1&&(g=d.h.slice(0,R+1)+g)}if(R=g,R==".."||R==".")g="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){g=R.lastIndexOf("/",0)==0,R=R.split("/");const N=[];for(let B=0;B<R.length;){const Y=R[B++];Y=="."?g&&B==R.length&&N.push(""):Y==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),g&&B==R.length&&N.push("")):(N.push(Y),g=!0)}g=N.join("/")}else g=R}return p?d.h=g:p=c.i.toString()!=="",p?uh(d,dg(c.i)):p=!!c.m,p&&(d.m=c.m),d};function nn(c){return new Gn(c)}function lo(c,d,p){c.j=p?ho(d,!0):d,c.j&&(c.j=c.j.replace(/:$/,""))}function uo(c,d){if(d){if(d=Number(d),isNaN(d)||d<0)throw Error("Bad port number "+d);c.u=d}else c.u=null}function uh(c,d,p){d instanceof po?(c.i=d,KR(c.i,c.l)):(p||(d=fo(d,jR)),c.i=new po(d,c.l))}function ye(c,d,p){c.i.set(d,p)}function fc(c){return ye(c,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),c}function ho(c,d){return c?d?decodeURI(c.replace(/%25/g,"%2525")):decodeURIComponent(c):""}function fo(c,d,p){return typeof c=="string"?(c=encodeURI(c).replace(d,WR),p&&(c=c.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c):null}function WR(c){return c=c.charCodeAt(0),"%"+(c>>4&15).toString(16)+(c&15).toString(16)}var ag=/[#\/\?@]/g,GR=/[#\?:]/g,zR=/[#\?]/g,jR=/[#\?@]/g,HR=/#/g;function po(c,d){this.h=this.g=null,this.i=c||null,this.j=!!d}function qr(c){c.g||(c.g=new Map,c.h=0,c.i&&$R(c.i,function(d,p){c.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}n=po.prototype,n.add=function(c,d){qr(this),this.i=null,c=Fi(this,c);let p=this.g.get(c);return p||this.g.set(c,p=[]),p.push(d),this.h+=1,this};function cg(c,d){qr(c),d=Fi(c,d),c.g.has(d)&&(c.i=null,c.h-=c.g.get(d).length,c.g.delete(d))}function lg(c,d){return qr(c),d=Fi(c,d),c.g.has(d)}n.forEach=function(c,d){qr(this),this.g.forEach(function(p,g){p.forEach(function(R){c.call(d,R,g,this)},this)},this)};function ug(c,d){qr(c);let p=[];if(typeof d=="string")lg(c,d)&&(p=p.concat(c.g.get(Fi(c,d))));else for(c=Array.from(c.g.values()),d=0;d<c.length;d++)p=p.concat(c[d]);return p}n.set=function(c,d){return qr(this),this.i=null,c=Fi(this,c),lg(this,c)&&(this.h-=this.g.get(c).length),this.g.set(c,[d]),this.h+=1,this},n.get=function(c,d){return c?(c=ug(this,c),c.length>0?String(c[0]):d):d};function hg(c,d,p){cg(c,d),p.length>0&&(c.i=null,c.g.set(Fi(c,d),_(p)),c.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const c=[],d=Array.from(this.g.keys());for(let g=0;g<d.length;g++){var p=d[g];const R=ao(p);p=ug(this,p);for(let N=0;N<p.length;N++){let B=R;p[N]!==""&&(B+="="+ao(p[N])),c.push(B)}}return this.i=c.join("&")};function dg(c){const d=new po;return d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),d}function Fi(c,d){return d=String(d),c.j&&(d=d.toLowerCase()),d}function KR(c,d){d&&!c.j&&(qr(c),c.i=null,c.g.forEach(function(p,g){const R=g.toLowerCase();g!=R&&(cg(this,g),hg(this,R,p))},c)),c.j=d}function QR(c,d){const p=new oo;if(o.Image){const g=new Image;g.onload=h(zn,p,"TestLoadImage: loaded",!0,d,g),g.onerror=h(zn,p,"TestLoadImage: error",!1,d,g),g.onabort=h(zn,p,"TestLoadImage: abort",!1,d,g),g.ontimeout=h(zn,p,"TestLoadImage: timeout",!1,d,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=c}else d(!1)}function YR(c,d){const p=new oo,g=new AbortController,R=setTimeout(()=>{g.abort(),zn(p,"TestPingServer: timeout",!1,d)},1e4);fetch(c,{signal:g.signal}).then(N=>{clearTimeout(R),N.ok?zn(p,"TestPingServer: ok",!0,d):zn(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(R),zn(p,"TestPingServer: error",!1,d)})}function zn(c,d,p,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(p)}catch{}}function JR(){this.g=new OR}function hh(c){this.i=c.Sb||null,this.h=c.ab||!1}f(hh,$m),hh.prototype.g=function(){return new pc(this.i,this.h)};function pc(c,d){rt.call(this),this.H=c,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(pc,rt),n=pc.prototype,n.open=function(c,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=c,this.D=d,this.readyState=1,go(this)},n.send=function(c){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const d={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};c&&(d.body=c),(this.H||o).fetch(new Request(this.D,d)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,mo(this)),this.readyState=0},n.Pa=function(c){if(this.g&&(this.l=c,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=c.headers,this.readyState=2,go(this)),this.g&&(this.readyState=3,go(this),this.g)))if(this.responseType==="arraybuffer")c.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in c){if(this.j=c.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;fg(this)}else c.text().then(this.Oa.bind(this),this.ga.bind(this))};function fg(c){c.j.read().then(c.Ma.bind(c)).catch(c.ga.bind(c))}n.Ma=function(c){if(this.g){if(this.o&&c.value)this.response.push(c.value);else if(!this.o){var d=c.value?c.value:new Uint8Array(0);(d=this.B.decode(d,{stream:!c.done}))&&(this.response=this.responseText+=d)}c.done?mo(this):go(this),this.readyState==3&&fg(this)}},n.Oa=function(c){this.g&&(this.response=this.responseText=c,mo(this))},n.Na=function(c){this.g&&(this.response=c,mo(this))},n.ga=function(){this.g&&mo(this)};function mo(c){c.readyState=4,c.l=null,c.j=null,c.B=null,go(c)}n.setRequestHeader=function(c,d){this.A.append(c,d)},n.getResponseHeader=function(c){return this.h&&this.h.get(c.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const c=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,c.push(p[0]+": "+p[1]),p=d.next();return c.join(`\r
`)};function go(c){c.onreadystatechange&&c.onreadystatechange.call(c)}Object.defineProperty(pc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(c){this.m=c?"include":"same-origin"}});function pg(c){let d="";return ac(c,function(p,g){d+=g,d+=":",d+=p,d+=`\r
`}),d}function dh(c,d,p){e:{for(g in p){var g=!1;break e}g=!0}g||(p=pg(p),typeof c=="string"?p!=null&&ao(p):ye(c,d,p))}function Ne(c){rt.call(this),this.headers=new Map,this.L=c||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Ne,rt);var XR=/^https?$/i,ZR=["POST","PUT"];n=Ne.prototype,n.Fa=function(c){this.H=c},n.ea=function(c,d,p,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+c);d=d?d.toUpperCase():"GET",this.D=c,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Qm.g(),this.g.onreadystatechange=m(u(this.Ca,this));try{this.B=!0,this.g.open(d,String(c),!0),this.B=!1}catch(N){mg(this,N);return}if(c=p||"",p=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)p.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const N of g.keys())p.set(N,g.get(N));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(p.keys()).find(N=>N.toLowerCase()=="content-type"),R=o.FormData&&c instanceof o.FormData,!(Array.prototype.indexOf.call(ZR,d,void 0)>=0)||g||R||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,B]of p)this.g.setRequestHeader(N,B);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(c),this.v=!1}catch(N){mg(this,N)}};function mg(c,d){c.h=!1,c.g&&(c.j=!0,c.g.abort(),c.j=!1),c.l=d,c.o=5,gg(c),mc(c)}function gg(c){c.A||(c.A=!0,ht(c,"complete"),ht(c,"error"))}n.abort=function(c){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=c||7,ht(this,"complete"),ht(this,"abort"),mc(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),mc(this,!0)),Ne.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?_g(this):this.Xa())},n.Xa=function(){_g(this)};function _g(c){if(c.h&&typeof s<"u"){if(c.v&&jn(c)==4)setTimeout(c.Ca.bind(c),0);else if(ht(c,"readystatechange"),jn(c)==4){c.h=!1;try{const N=c.ca();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var g;if(g=N===0){let B=String(c.D).match(og)[1]||null;!B&&o.self&&o.self.location&&(B=o.self.location.protocol.slice(0,-1)),g=!XR.test(B?B.toLowerCase():"")}p=g}if(p)ht(c,"complete"),ht(c,"success");else{c.o=6;try{var R=jn(c)>2?c.g.statusText:""}catch{R=""}c.l=R+" ["+c.ca()+"]",gg(c)}}finally{mc(c)}}}}function mc(c,d){if(c.g){c.m&&(clearTimeout(c.m),c.m=null);const p=c.g;c.g=null,d||ht(c,"ready");try{p.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function jn(c){return c.g?c.g.readyState:0}n.ca=function(){try{return jn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(c){if(this.g){var d=this.g.responseText;return c&&d.indexOf(c)==0&&(d=d.substring(c.length)),DR(d)}};function yg(c){try{if(!c.g)return null;if("response"in c.g)return c.g.response;switch(c.F){case"":case"text":return c.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in c.g)return c.g.mozResponseArrayBuffer}return null}catch{return null}}function eS(c){const d={};c=(c.g&&jn(c)>=2&&c.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<c.length;g++){if(I(c[g]))continue;var p=FR(c[g]);const R=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const N=d[R]||[];d[R]=N,N.push(p)}RR(d,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function _o(c,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[c]||d}function Ig(c){this.za=0,this.i=[],this.j=new oo,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=_o("failFast",!1,c),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=_o("baseRetryDelayMs",5e3,c),this.Za=_o("retryDelaySeedMs",1e4,c),this.Ta=_o("forwardChannelMaxRetries",2,c),this.va=_o("forwardChannelRequestTimeoutMs",2e4,c),this.ma=c&&c.xmlHttpFactory||void 0,this.Ua=c&&c.Rb||void 0,this.Aa=c&&c.useFetchStreams||!1,this.O=void 0,this.L=c&&c.supportsCrossDomainXhr||!1,this.M="",this.h=new tg(c&&c.concurrentRequestLimit),this.Ba=new JR,this.S=c&&c.fastHandshake||!1,this.R=c&&c.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=c&&c.Pb||!1,c&&c.ua&&this.j.ua(),c&&c.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&c&&c.detectBufferingProxy||!1,this.ia=void 0,c&&c.longPollingTimeout&&c.longPollingTimeout>0&&(this.ia=c.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ig.prototype,n.ka=8,n.I=1,n.connect=function(c,d,p,g){dt(0),this.W=c,this.H=d||{},p&&g!==void 0&&(this.H.OSID=p,this.H.OAID=g),this.F=this.X,this.J=Cg(this,null,this.W),_c(this)};function fh(c){if(Eg(c),c.I==3){var d=c.V++,p=nn(c.J);if(ye(p,"SID",c.M),ye(p,"RID",d),ye(p,"TYPE","terminate"),yo(c,p),d=new Wn(c,c.j,d),d.M=2,d.A=fc(nn(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(d.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=d.A,p=!0),p||(d.g=Pg(d.j,null),d.g.ea(d.A)),d.F=Date.now(),dc(d)}Sg(c)}function gc(c){c.g&&(mh(c),c.g.cancel(),c.g=null)}function Eg(c){gc(c),c.v&&(o.clearTimeout(c.v),c.v=null),yc(c),c.h.cancel(),c.m&&(typeof c.m=="number"&&o.clearTimeout(c.m),c.m=null)}function _c(c){if(!ng(c.h)&&!c.m){c.m=!0;var d=c.Ea;Z||y(),ie||(Z(),ie=!0),T.add(d,c),c.D=0}}function tS(c,d){return rg(c.h)>=c.h.j-(c.m?1:0)?!1:c.m?(c.i=d.G.concat(c.i),!0):c.I==1||c.I==2||c.D>=(c.Sa?0:c.Ta)?!1:(c.m=so(u(c.Ea,c,d),Rg(c,c.D)),c.D++,!0)}n.Ea=function(c){if(this.m)if(this.m=null,this.I==1){if(!c){this.V=Math.floor(Math.random()*1e5),c=this.V++;const R=new Wn(this,this.j,c);let N=this.o;if(this.U&&(N?(N=Dm(N),xm(N,this.U)):N=this.U),this.u!==null||this.R||(R.J=N,N=null),this.S)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var g=this.i[p];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(d+=g,d>4096){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=wg(this,R,d),p=nn(this.J),ye(p,"RID",c),ye(p,"CVER",22),this.G&&ye(p,"X-HTTP-Session-Id",this.G),yo(this,p),N&&(this.R?d="headers="+ao(pg(N))+"&"+d:this.u&&dh(p,this.u,N)),lh(this.h,R),this.Ra&&ye(p,"TYPE","init"),this.S?(ye(p,"$req",d),ye(p,"SID","null"),R.U=!0,sh(R,p,null)):sh(R,p,d),this.I=2}}else this.I==3&&(c?Tg(this,c):this.i.length==0||ng(this.h)||Tg(this))};function Tg(c,d){var p;d?p=d.l:p=c.V++;const g=nn(c.J);ye(g,"SID",c.M),ye(g,"RID",p),ye(g,"AID",c.K),yo(c,g),c.u&&c.o&&dh(g,c.u,c.o),p=new Wn(c,c.j,p,c.D+1),c.u===null&&(p.J=c.o),d&&(c.i=d.G.concat(c.i)),d=wg(c,p,1e3),p.H=Math.round(c.va*.5)+Math.round(c.va*.5*Math.random()),lh(c.h,p),sh(p,g,d)}function yo(c,d){c.H&&ac(c.H,function(p,g){ye(d,g,p)}),c.l&&ac({},function(p,g){ye(d,g,p)})}function wg(c,d,p){p=Math.min(c.i.length,p);const g=c.l?u(c.l.Ka,c.l,c):null;e:{var R=c.i;let Y=-1;for(;;){const Be=["count="+p];Y==-1?p>0?(Y=R[0].g,Be.push("ofs="+Y)):Y=0:Be.push("ofs="+Y);let pe=!0;for(let He=0;He<p;He++){var N=R[He].g;const rn=R[He].map;if(N-=Y,N<0)Y=Math.max(0,R[He].g-100),pe=!1;else try{N="req"+N+"_"||"";try{var B=rn instanceof Map?rn:Object.entries(rn);for(const[Wr,Hn]of B){let Kn=Hn;a(Hn)&&(Kn=eh(Hn)),Be.push(N+Wr+"="+encodeURIComponent(Kn))}}catch(Wr){throw Be.push(N+"type="+encodeURIComponent("_badmap")),Wr}}catch{g&&g(rn)}}if(pe){B=Be.join("&");break e}}B=void 0}return c=c.i.splice(0,p),d.G=c,B}function vg(c){if(!c.g&&!c.v){c.Y=1;var d=c.Da;Z||y(),ie||(Z(),ie=!0),T.add(d,c),c.A=0}}function ph(c){return c.g||c.v||c.A>=3?!1:(c.Y++,c.v=so(u(c.Da,c),Rg(c,c.A)),c.A++,!0)}n.Da=function(){if(this.v=null,Ag(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var c=4*this.T;this.j.info("BP detection timer enabled: "+c),this.B=so(u(this.Wa,this),c)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,dt(10),gc(this),Ag(this))};function mh(c){c.B!=null&&(o.clearTimeout(c.B),c.B=null)}function Ag(c){c.g=new Wn(c,c.j,"rpc",c.Y),c.u===null&&(c.g.J=c.o),c.g.P=0;var d=nn(c.na);ye(d,"RID","rpc"),ye(d,"SID",c.M),ye(d,"AID",c.K),ye(d,"CI",c.F?"0":"1"),!c.F&&c.ia&&ye(d,"TO",c.ia),ye(d,"TYPE","xmlhttp"),yo(c,d),c.u&&c.o&&dh(d,c.u,c.o),c.O&&(c.g.H=c.O);var p=c.g;c=c.ba,p.M=1,p.A=fc(nn(d)),p.u=null,p.R=!0,Xm(p,c)}n.Va=function(){this.C!=null&&(this.C=null,gc(this),ph(this),dt(19))};function yc(c){c.C!=null&&(o.clearTimeout(c.C),c.C=null)}function bg(c,d){var p=null;if(c.g==d){yc(c),mh(c),c.g=null;var g=2}else if(ch(c.h,d))p=d.G,ig(c.h,d),g=1;else return;if(c.I!=0){if(d.o)if(g==1){p=d.u?d.u.length:0,d=Date.now()-d.F;var R=c.D;g=uc(),ht(g,new Hm(g,p)),_c(c)}else vg(c);else if(R=d.m,R==3||R==0&&d.X>0||!(g==1&&tS(c,d)||g==2&&ph(c)))switch(p&&p.length>0&&(d=c.h,d.i=d.i.concat(p)),R){case 1:$r(c,5);break;case 4:$r(c,10);break;case 3:$r(c,6);break;default:$r(c,2)}}}function Rg(c,d){let p=c.Qa+Math.floor(Math.random()*c.Za);return c.isActive()||(p*=2),p*d}function $r(c,d){if(c.j.info("Error code "+d),d==2){var p=u(c.bb,c),g=c.Ua;const R=!g;g=new Gn(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||lo(g,"https"),fc(g),R?QR(g.toString(),p):YR(g.toString(),p)}else dt(2);c.I=0,c.l&&c.l.pa(d),Sg(c),Eg(c)}n.bb=function(c){c?(this.j.info("Successfully pinged google.com"),dt(2)):(this.j.info("Failed to ping google.com"),dt(1))};function Sg(c){if(c.I=0,c.ja=[],c.l){const d=sg(c.h);(d.length!=0||c.i.length!=0)&&(v(c.ja,d),v(c.ja,c.i),c.h.i.length=0,_(c.i),c.i.length=0),c.l.oa()}}function Cg(c,d,p){var g=p instanceof Gn?nn(p):new Gn(p);if(g.g!="")d&&(g.g=d+"."+g.g),uo(g,g.u);else{var R=o.location;g=R.protocol,d=d?d+"."+R.hostname:R.hostname,R=+R.port;const N=new Gn(null);g&&lo(N,g),d&&(N.g=d),R&&uo(N,R),p&&(N.h=p),g=N}return p=c.G,d=c.wa,p&&d&&ye(g,p,d),ye(g,"VER",c.ka),yo(c,g),g}function Pg(c,d,p){if(d&&!c.L)throw Error("Can't create secondary domain capable XhrIo object.");return d=c.Aa&&!c.ma?new Ne(new hh({ab:p})):new Ne(c.ma),d.Fa(c.L),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function kg(){}n=kg.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ic(){}Ic.prototype.g=function(c,d){return new Pt(c,d)};function Pt(c,d){rt.call(this),this.g=new Ig(d),this.l=c,this.h=d&&d.messageUrlParams||null,c=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(c?c["X-Client-Protocol"]="webchannel":c={"X-Client-Protocol":"webchannel"}),this.g.o=c,c=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(c?c["X-WebChannel-Content-Type"]=d.messageContentType:c={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.sa&&(c?c["X-WebChannel-Client-Profile"]=d.sa:c={"X-WebChannel-Client-Profile":d.sa}),this.g.U=c,(c=d&&d.Qb)&&!I(c)&&(this.g.u=c),this.A=d&&d.supportsCrossDomainXhr||!1,this.v=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!I(d)&&(this.g.G=d,c=this.h,c!==null&&d in c&&(c=this.h,d in c&&delete c[d])),this.j=new Ui(this)}f(Pt,rt),Pt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Pt.prototype.close=function(){fh(this.g)},Pt.prototype.o=function(c){var d=this.g;if(typeof c=="string"){var p={};p.__data__=c,c=p}else this.v&&(p={},p.__data__=eh(c),c=p);d.i.push(new qR(d.Ya++,c)),d.I==3&&_c(d)},Pt.prototype.N=function(){this.g.l=null,delete this.j,fh(this.g),delete this.g,Pt.Z.N.call(this)};function Ng(c){th.call(this),c.__headers__&&(this.headers=c.__headers__,this.statusCode=c.__status__,delete c.__headers__,delete c.__status__);var d=c.__sm__;if(d){e:{for(const p in d){c=p;break e}c=void 0}(this.i=c)&&(c=this.i,d=d!==null&&c in d?d[c]:void 0),this.data=d}else this.data=c}f(Ng,th);function Dg(){nh.call(this),this.status=1}f(Dg,nh);function Ui(c){this.g=c}f(Ui,kg),Ui.prototype.ra=function(){ht(this.g,"a")},Ui.prototype.qa=function(c){ht(this.g,new Ng(c))},Ui.prototype.pa=function(c){ht(this.g,new Dg)},Ui.prototype.oa=function(){ht(this.g,"b")},Ic.prototype.createWebChannel=Ic.prototype.g,Pt.prototype.send=Pt.prototype.o,Pt.prototype.open=Pt.prototype.m,Pt.prototype.close=Pt.prototype.close,dT=function(){return new Ic},hT=function(){return uc()},uT=Ur,rd={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},hc.NO_ERROR=0,hc.TIMEOUT=8,hc.HTTP_ERROR=6,Bc=hc,Km.COMPLETE="complete",lT=Km,Wm.EventType=ro,ro.OPEN="a",ro.CLOSE="b",ro.ERROR="c",ro.MESSAGE="d",rt.prototype.listen=rt.prototype.J,xo=Wm,Ne.prototype.listenOnce=Ne.prototype.K,Ne.prototype.getLastError=Ne.prototype.Ha,Ne.prototype.getLastErrorCode=Ne.prototype.ya,Ne.prototype.getStatus=Ne.prototype.ca,Ne.prototype.getResponseJson=Ne.prototype.La,Ne.prototype.getResponseText=Ne.prototype.la,Ne.prototype.send=Ne.prototype.ea,Ne.prototype.setWithCredentials=Ne.prototype.Fa,cT=Ne}).apply(typeof vc<"u"?vc:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ye.UNAUTHENTICATED=new Ye(null),Ye.GOOGLE_CREDENTIALS=new Ye("google-credentials-uid"),Ye.FIRST_PARTY=new Ye("first-party-uid"),Ye.MOCK_USER=new Ye("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bs="12.10.0";function sD(n){Bs=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=new xs("@firebase/firestore");function Hi(){return pr.logLevel}function oD(n){pr.setLogLevel(n)}function O(n,...e){if(pr.logLevel<=re.DEBUG){const t=e.map(bf);pr.debug(`Firestore (${Bs}): ${n}`,...t)}}function Ve(n,...e){if(pr.logLevel<=re.ERROR){const t=e.map(bf);pr.error(`Firestore (${Bs}): ${n}`,...t)}}function St(n,...e){if(pr.logLevel<=re.WARN){const t=e.map(bf);pr.warn(`Firestore (${Bs}): ${n}`,...t)}}function bf(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,fT(n,r,t)}function fT(n,e,t){let r=`FIRESTORE (${Bs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ve(r),new Error(r)}function G(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||fT(e,i,r)}function aD(n,e){n||W(57014,e)}function F(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends qt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class mT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ye.UNAUTHENTICATED)))}shutdown(){}}class cD{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class lD{constructor(e){this.t=e,this.currentUser=Ye.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){G(this.o===void 0,42304);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new tt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new tt,e.enqueueRetryable((()=>i(this.currentUser)))};const o=()=>{const l=s;e.enqueueRetryable((async()=>{await l.promise,await i(this.currentUser)}))},a=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((l=>a(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new tt)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(G(typeof r.accessToken=="string",31837,{l:r}),new pT(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return G(e===null||typeof e=="string",2055,{h:e}),new Ye(e)}}class uD{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ye.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class hD{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new uD(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ye.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class id{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class dD{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ee(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){G(this.o===void 0,3512);const r=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,O("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new id(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(G(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new id(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class fD{getToken(){return Promise.resolve(new id(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pD(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=pD(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function K(n,e){return n<e?-1:n>e?1:0}function sd(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return Sh(i)===Sh(s)?K(i,s):Sh(i)?1:-1}return K(n.length,e.length)}const mD=55296,gD=57343;function Sh(n){const e=n.charCodeAt(0);return e>=mD&&e<=gD}function as(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}function gT(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od="__name__";class sn{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&W(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return sn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof sn?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=sn.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return K(e.length,t.length)}static compareSegments(e,t){const r=sn.isNumericId(e),i=sn.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?sn.extractNumericId(e).compare(sn.extractNumericId(t)):sd(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return lr.fromString(e.substring(4,e.length-2))}}class ee extends sn{construct(e,t,r){return new ee(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new ee(t)}static emptyPath(){return new ee([])}}const _D=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Te extends sn{construct(e,t,r){return new Te(e,t,r)}static isValidIdentifier(e){return _D.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Te.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===od}static keyField(){return new Te([od])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new D(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new D(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new D(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new D(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Te(t)}static emptyPath(){return new Te([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(ee.fromString(e))}static fromName(e){return new L(ee.fromString(e).popFirst(5))}static empty(){return new L(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new ee(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n,e,t){if(!t)throw new D(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function _T(n,e,t,r){if(e===!0&&r===!0)throw new D(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function u_(n){if(!L.isDocumentKey(n))throw new D(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function h_(n){if(L.isDocumentKey(n))throw new D(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function yT(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function tu(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W(12329,{type:typeof n})}function ne(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=tu(n);throw new D(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function IT(n,e){if(e<=0)throw new D(S.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ci(n,e){if(!yT(n))throw new D(S.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(i&&typeof o!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new D(S.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=-62135596800,f_=1e6;class ce{static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*f_);return new ce(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<d_)throw new D(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/f_}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ce._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ci(e,ce._jsonSchema))return new ce(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-d_;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ce._jsonSchemaVersion="firestore/timestamp/1.0",ce._jsonSchema={type:Ue("string",ce._jsonSchemaVersion),seconds:Ue("number"),nanoseconds:Ue("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(e){return new z(e)}static min(){return new z(new ce(0,0))}static max(){return new z(new ce(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs=-1;class ls{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function ad(n){return n.fields.find((e=>e.kind===2))}function jr(n){return n.fields.filter((e=>e.kind!==2))}function yD(n,e){let t=K(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=ID(n.fields[r],e.fields[r]),t!==0)return t;return K(n.fields.length,e.fields.length)}ls.UNKNOWN_ID=-1;class ii{constructor(e,t){this.fieldPath=e,this.kind=t}}function ID(n,e){const t=Te.comparator(n.fieldPath,e.fieldPath);return t!==0?t:K(n.kind,e.kind)}class us{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new us(0,Vt.min())}}function ET(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=z.fromTimestamp(r===1e9?new ce(t+1,0):new ce(t,r));return new Vt(i,L.empty(),e)}function TT(n){return new Vt(n.readTime,n.key,cs)}class Vt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Vt(z.min(),L.empty(),cs)}static max(){return new Vt(z.max(),L.empty(),cs)}}function Sf(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class vT{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kr(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==wT)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b(((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):b.reject(t)}static resolve(e){return new b(((t,r)=>{t(e)}))}static reject(e){return new b(((t,r)=>{r(e)}))}static waitFor(e){return new b(((t,r)=>{let i=0,s=0,o=!1;e.forEach((a=>{++i,a.next((()=>{++s,o&&s===i&&t()}),(l=>r(l)))})),o=!0,s===i&&t()}))}static or(e){let t=b.resolve(!1);for(const r of e)t=t.next((i=>i?b.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,s)=>{r.push(t.call(this,i,s))})),this.waitFor(r)}static mapArray(e,t){return new b(((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let l=0;l<s;l++){const u=l;t(e[u]).next((h=>{o[u]=h,++a,a===s&&r(o)}),(h=>i(h)))}}))}static doWhile(e,t){return new b(((r,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):r()};s()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt="SimpleDb";class nu{static open(e,t,r,i){try{return new nu(t,e.transaction(i,r))}catch(s){throw new Go(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new tt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Go(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const i=Cf(r.target.error);this.S.reject(new Go(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(O(kt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new TD(t)}}class un{static delete(e){return O(kt,"Removing database:",e),Qr($I().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!Oa())return!1;if(un.F())return!0;const e=We(),t=un.M(e),r=0<t&&t<10,i=AT(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,un.M(We())===12.2&&Ve("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(O(kt,"Opening database:",this.name),this.db=await new Promise(((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Go(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new D(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new D(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Go(e,o))},i.onupgradeneeded=s=>{O(kt,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.N.k(o,i.transaction,s.oldVersion,this.version).next((()=>{O(kt,"Database upgrade to version "+this.version+" complete")}))}}))),this.K&&(this.db.onversionchange=t=>this.K(t)),this.db}q(e){this.K=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const a=nu.open(this.db,e,s?"readonly":"readwrite",r),l=i(a).next((u=>(a.C(),u))).catch((u=>(a.abort(u),b.reject(u)))).toPromise();return l.catch((()=>{})),await a.D,l}catch(a){const l=a,u=l.name!=="FirebaseError"&&o<3;if(O(kt,"Transaction failed with error:",l.message,"Retrying:",u),this.close(),!u)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function AT(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class ED{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return Qr(this.U.delete())}}class Go extends D{constructor(e,t){super(S.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Nr(n){return n.name==="IndexedDbTransactionError"}class TD{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(O(kt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(O(kt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Qr(r)}add(e){return O(kt,"ADD",this.store.name,e,e),Qr(this.store.add(e))}get(e){return Qr(this.store.get(e)).next((t=>(t===void 0&&(t=null),O(kt,"GET",this.store.name,e,t),t)))}delete(e){return O(kt,"DELETE",this.store.name,e),Qr(this.store.delete(e))}count(){return O(kt,"COUNT",this.store.name),Qr(this.store.count())}H(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new b(((o,a)=>{s.onerror=l=>{a(l.target.error)},s.onsuccess=l=>{o(l.target.result)}}))}{const s=this.cursor(r),o=[];return this.J(s,((a,l)=>{o.push(l)})).next((()=>o))}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new b(((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}}))}X(e,t){O(kt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const i=this.cursor(r);return this.J(i,((s,o,a)=>a.delete()))}ee(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.J(i,t)}te(e){const t=this.cursor({});return new b(((r,i)=>{t.onerror=s=>{const o=Cf(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next((a=>{a?o.continue():r()})):r()}}))}J(e,t){const r=[];return new b(((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const l=new ED(a),u=t(a.primaryKey,a.value,l);if(u instanceof b){const h=u.catch((f=>(l.done(),b.reject(f))));r.push(h)}l.isDone?i():l.G===null?a.continue():a.continue(l.G)}})).next((()=>b.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Qr(n){return new b(((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Cf(r.target.error);t(i)}}))}let p_=!1;function Cf(n){const e=un.M(We());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return p_||(p_=!0,setTimeout((()=>{throw r}),0)),r}}return n}const zo="IndexBackfiller";class wD{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){O(zo,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();O(zo,`Documents written: ${t}`)}catch(t){Nr(t)?O(zo,"Ignoring IndexedDB error during index backfill: ",t):await kr(t)}await this.re(6e4)}))}}class vD{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const r=new Set;let i=t,s=!0;return b.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return O(zo,`Processing collection: ${o}`),this.oe(e,o,i).next((a=>{i-=a,r.add(o)}));s=!1})))).next((()=>t-i))}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next((s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(i,s))).next((a=>(O(zo,`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a)))).next((()=>o.size))}))))}_e(e,t){let r=e;return t.changes.forEach(((i,s)=>{const o=TT(s);Sf(o,r)>0&&(r=o)})),new Vt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Et.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=-1;function Fa(n){return n==null}function ha(n){return n===0&&1/n==-1/0}function bT(n){return typeof n=="number"&&Number.isInteger(n)&&!ha(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl="";function ot(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=m_(e)),e=AD(n.get(t),e);return m_(e)}function AD(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case cl:t+="";break;default:t+=s}}return t}function m_(n){return n+cl+""}function cn(n){const e=n.length;if(G(e>=2,64408,{path:n}),e===2)return G(n.charAt(0)===cl&&n.charAt(1)==="",56145,{path:n}),ee.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf(cl,s);switch((o<0||o>t)&&W(50515,{path:n}),n.charAt(o+1)){case"":const a=n.substring(s,o);let l;i.length===0?l=a:(i+=a,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:W(61167,{path:n})}s=o+2}return new ee(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr="remoteDocuments",Ua="owner",Bi="owner",da="mutationQueues",bD="userId",zt="mutations",g_="batchId",ei="userMutationsIndex",__=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(n,e){return[n,ot(e)]}function RT(n,e,t){return[n,ot(e),t]}const RD={},hs="documentMutations",ll="remoteDocumentsV14",SD=["prefixPath","collectionGroup","readTime","documentId"],$c="documentKeyIndex",CD=["prefixPath","collectionGroup","documentId"],ST="collectionGroupIndex",PD=["collectionGroup","readTime","prefixPath","documentId"],fa="remoteDocumentGlobal",cd="remoteDocumentGlobalKey",ds="targets",CT="queryTargetsIndex",kD=["canonicalId","targetId"],fs="targetDocuments",ND=["targetId","path"],Pf="documentTargetsIndex",DD=["path","targetId"],ul="targetGlobalKey",si="targetGlobal",pa="collectionParents",OD=["collectionId","parent"],ps="clientMetadata",xD="clientId",ru="bundles",VD="bundleId",iu="namedQueries",MD="name",kf="indexConfiguration",LD="indexId",ld="collectionGroupIndex",FD="collectionGroup",jo="indexState",UD=["indexId","uid"],PT="sequenceNumberIndex",BD=["uid","sequenceNumber"],Ho="indexEntries",qD=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],kT="documentKeyIndex",$D=["indexId","uid","orderedDocumentKey"],su="documentOverlays",WD=["userId","collectionPath","documentId"],ud="collectionPathOverlayIndex",GD=["userId","collectionPath","largestBatchId"],NT="collectionGroupOverlayIndex",zD=["userId","collectionGroup","largestBatchId"],Nf="globals",jD="name",DT=[da,zt,hs,Hr,ds,Ua,si,fs,ps,fa,pa,ru,iu],HD=[...DT,su],OT=[da,zt,hs,ll,ds,Ua,si,fs,ps,fa,pa,ru,iu,su],xT=OT,Df=[...xT,kf,jo,Ho],KD=Df,VT=[...Df,Nf],QD=VT;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd extends vT{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function je(n,e){const t=F(n);return un.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y_(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Dr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function MT(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function LT(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pe=class dd{constructor(e,t){this.comparator=e,this.root=t||hr.EMPTY}insert(e,t){return new dd(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,hr.BLACK,null,null))}remove(e){return new dd(this.comparator,this.root.remove(e,this.comparator).copy(null,null,hr.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ac(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ac(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ac(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ac(this.root,e,this.comparator,!0)}},Ac=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},hr=class _n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??_n.RED,this.left=i??_n.EMPTY,this.right=s??_n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new _n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return _n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return _n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw W(43730,{key:this.key,value:this.value});if(this.right.isRed())throw W(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw W(27949);return e+(this.isRed()?0:1)}};hr.EMPTY=null,hr.RED=!0,hr.BLACK=!1;hr.EMPTY=new class{constructor(){this.size=0}get key(){throw W(57766)}get value(){throw W(16141)}get color(){throw W(16727)}get left(){throw W(29726)}get right(){throw W(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new hr(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new I_(this.data.getIterator())}getIteratorFrom(e){return new I_(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof de)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new de(this.comparator);return t.data=e,t}}class I_{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function qi(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.fields=e,e.sort(Te.comparator)}static empty(){return new Tt([])}unionWith(e){let t=new de(Te.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Tt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return as(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YD(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new FT("Invalid base64 string: "+s):s}})(e);return new ke(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s})(e);return new ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ke.EMPTY_BYTE_STRING=new ke("");const JD=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Dn(n){if(G(!!n,39018),typeof n=="string"){let e=0;const t=JD.exec(n);if(G(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ae(n.seconds),nanos:Ae(n.nanos)}}function Ae(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function On(n){return typeof n=="string"?ke.fromBase64String(n):ke.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UT="server_timestamp",BT="__type__",qT="__previous_value__",$T="__local_write_time__";function ou(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[BT])==null?void 0:r.stringValue)===UT}function au(n){const e=n.mapValue.fields[qT];return ou(e)?au(e):e}function ma(n){const e=Dn(n.mapValue.fields[$T].timestampValue);return new ce(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XD{constructor(e,t,r,i,s,o,a,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=u,this.isUsingEmulator=h,this.apiKey=f}}const ga="(default)";class mr{constructor(e,t){this.projectId=e,this.database=t||ga}static empty(){return new mr("","")}get isDefaultDatabase(){return this.database===ga}isEqual(e){return e instanceof mr&&e.projectId===this.projectId&&e.database===this.database}}function ZD(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new mr(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of="__type__",WT="__max__",nr={mapValue:{fields:{__type__:{stringValue:WT}}}},xf="__vector__",ms="value",Wc={nullValue:"NULL_VALUE"};function gr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ou(n)?4:GT(n)?9007199254740991:cu(n)?10:11:W(28295,{value:n})}function pn(n,e){if(n===e)return!0;const t=gr(n);if(t!==gr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ma(n).isEqual(ma(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Dn(i.timestampValue),a=Dn(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return On(i.bytesValue).isEqual(On(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return Ae(i.geoPointValue.latitude)===Ae(s.geoPointValue.latitude)&&Ae(i.geoPointValue.longitude)===Ae(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return Ae(i.integerValue)===Ae(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Ae(i.doubleValue),a=Ae(s.doubleValue);return o===a?ha(o)===ha(a):isNaN(o)&&isNaN(a)}return!1})(n,e);case 9:return as(n.arrayValue.values||[],e.arrayValue.values||[],pn);case 10:case 11:return(function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(y_(o)!==y_(a))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(a[l]===void 0||!pn(o[l],a[l])))return!1;return!0})(n,e);default:return W(52216,{left:n})}}function _a(n,e){return(n.values||[]).find((t=>pn(t,e)))!==void 0}function _r(n,e){if(n===e)return 0;const t=gr(n),r=gr(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return(function(s,o){const a=Ae(s.integerValue||s.doubleValue),l=Ae(o.integerValue||o.doubleValue);return a<l?-1:a>l?1:a===l?0:isNaN(a)?isNaN(l)?0:-1:1})(n,e);case 3:return E_(n.timestampValue,e.timestampValue);case 4:return E_(ma(n),ma(e));case 5:return sd(n.stringValue,e.stringValue);case 6:return(function(s,o){const a=On(s),l=On(o);return a.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(s,o){const a=s.split("/"),l=o.split("/");for(let u=0;u<a.length&&u<l.length;u++){const h=K(a[u],l[u]);if(h!==0)return h}return K(a.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,o){const a=K(Ae(s.latitude),Ae(o.latitude));return a!==0?a:K(Ae(s.longitude),Ae(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return T_(n.arrayValue,e.arrayValue);case 10:return(function(s,o){var m,_,v,P;const a=s.fields||{},l=o.fields||{},u=(m=a[ms])==null?void 0:m.arrayValue,h=(_=l[ms])==null?void 0:_.arrayValue,f=K(((v=u==null?void 0:u.values)==null?void 0:v.length)||0,((P=h==null?void 0:h.values)==null?void 0:P.length)||0);return f!==0?f:T_(u,h)})(n.mapValue,e.mapValue);case 11:return(function(s,o){if(s===nr.mapValue&&o===nr.mapValue)return 0;if(s===nr.mapValue)return 1;if(o===nr.mapValue)return-1;const a=s.fields||{},l=Object.keys(a),u=o.fields||{},h=Object.keys(u);l.sort(),h.sort();for(let f=0;f<l.length&&f<h.length;++f){const m=sd(l[f],h[f]);if(m!==0)return m;const _=_r(a[l[f]],u[h[f]]);if(_!==0)return _}return K(l.length,h.length)})(n.mapValue,e.mapValue);default:throw W(23264,{he:t})}}function E_(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);const t=Dn(n),r=Dn(e),i=K(t.seconds,r.seconds);return i!==0?i:K(t.nanos,r.nanos)}function T_(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=_r(t[i],r[i]);if(s)return s}return K(t.length,r.length)}function gs(n){return fd(n)}function fd(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Dn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return On(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return L.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=fd(s);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${fd(t.fields[o])}`;return i+"}"})(n.mapValue):W(61005,{value:n})}function Gc(n){switch(gr(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=au(n);return e?16+Gc(e):16;case 5:return 2*n.stringValue.length;case 6:return On(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+Gc(s)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return Dr(r.fields,((s,o)=>{i+=s.length+Gc(o)})),i})(n.mapValue);default:throw W(13486,{value:n})}}function hi(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function pd(n){return!!n&&"integerValue"in n}function ya(n){return!!n&&"arrayValue"in n}function w_(n){return!!n&&"nullValue"in n}function v_(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function zc(n){return!!n&&"mapValue"in n}function cu(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Of])==null?void 0:r.stringValue)===xf}function Ko(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Dr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ko(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ko(n.arrayValue.values[t]);return e}return{...n}}function GT(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===WT}const zT={mapValue:{fields:{[Of]:{stringValue:xf},[ms]:{arrayValue:{}}}}};function e0(n){return"nullValue"in n?Wc:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?hi(mr.empty(),L.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?cu(n)?zT:{mapValue:{}}:W(35942,{value:n})}function t0(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?hi(mr.empty(),L.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?zT:"mapValue"in n?cu(n)?{mapValue:{}}:nr:W(61959,{value:n})}function A_(n,e){const t=_r(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function b_(n,e){const t=_r(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.value=e}static empty(){return new Ze({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!zc(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ko(t)}setAll(e){let t=Te.emptyPath(),r={},i=[];e.forEach(((o,a)=>{if(!t.isImmediateParentOf(a)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=Ko(o):i.push(a.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());zc(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return pn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];zc(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Dr(t,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new Ze(Ko(this.value))}}function jT(n){const e=[];return Dr(n.fields,((t,r)=>{const i=new Te([t]);if(zc(r)){const s=jT(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)})),new Tt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Ie(e,0,z.min(),z.min(),z.min(),Ze.empty(),0)}static newFoundDocument(e,t,r,i){return new Ie(e,1,t,z.min(),r,i,0)}static newNoDocument(e,t){return new Ie(e,2,t,z.min(),z.min(),Ze.empty(),0)}static newUnknownDocument(e,t){return new Ie(e,3,t,z.min(),z.min(),Ze.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ze.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ze.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ie&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ie(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t){this.position=e,this.inclusive=t}}function R_(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=L.comparator(L.fromName(o.referenceValue),t.key):r=_r(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function S_(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!pn(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e,t="asc"){this.field=e,this.dir=t}}function n0(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT{}class se extends HT{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new r0(e,t,r):t==="array-contains"?new o0(e,r):t==="in"?new ZT(e,r):t==="not-in"?new a0(e,r):t==="array-contains-any"?new c0(e,r):new se(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new i0(e,r):new s0(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(_r(t,this.value)):t!==null&&gr(this.value)===gr(t)&&this.matchesComparison(_r(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ue extends HT{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ue(e,t)}matches(e){return _s(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function _s(n){return n.op==="and"}function md(n){return n.op==="or"}function Vf(n){return KT(n)&&_s(n)}function KT(n){for(const e of n.filters)if(e instanceof ue)return!1;return!0}function gd(n){if(n instanceof se)return n.field.canonicalString()+n.op.toString()+gs(n.value);if(Vf(n))return n.filters.map((e=>gd(e))).join(",");{const e=n.filters.map((t=>gd(t))).join(",");return`${n.op}(${e})`}}function QT(n,e){return n instanceof se?(function(r,i){return i instanceof se&&r.op===i.op&&r.field.isEqual(i.field)&&pn(r.value,i.value)})(n,e):n instanceof ue?(function(r,i){return i instanceof ue&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,o,a)=>s&&QT(o,i.filters[a])),!0):!1})(n,e):void W(19439)}function YT(n,e){const t=n.filters.concat(e);return ue.create(t,n.op)}function JT(n){return n instanceof se?(function(t){return`${t.field.canonicalString()} ${t.op} ${gs(t.value)}`})(n):n instanceof ue?(function(t){return t.op.toString()+" {"+t.getFilters().map(JT).join(" ,")+"}"})(n):"Filter"}class r0 extends se{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class i0 extends se{constructor(e,t){super(e,"in",t),this.keys=XT("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class s0 extends se{constructor(e,t){super(e,"not-in",t),this.keys=XT("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function XT(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>L.fromName(r.referenceValue)))}class o0 extends se{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ya(t)&&_a(t.arrayValue,this.value)}}class ZT extends se{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&_a(this.value.arrayValue,t)}}class a0 extends se{constructor(e,t){super(e,"not-in",t)}matches(e){if(_a(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!_a(this.value.arrayValue,t)}}class c0 extends se{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ya(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>_a(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.Te=null}}function _d(n,e=null,t=[],r=[],i=null,s=null,o=null){return new l0(n,e,t,r,i,s,o)}function di(n){const e=F(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>gd(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),Fa(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>gs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>gs(r))).join(",")),e.Te=t}return e.Te}function Ba(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!n0(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!QT(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!S_(n.startAt,e.startAt)&&S_(n.endAt,e.endAt)}function hl(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function dl(n,e){return n.filters.filter((t=>t instanceof se&&t.field.isEqual(e)))}function C_(n,e,t){let r=Wc,i=!0;for(const s of dl(n,e)){let o=Wc,a=!0;switch(s.op){case"<":case"<=":o=e0(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=Wc}A_({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];A_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function P_(n,e,t){let r=nr,i=!0;for(const s of dl(n,e)){let o=nr,a=!0;switch(s.op){case">=":case">":o=t0(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=nr}b_({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];b_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function ew(n,e,t,r,i,s,o,a){return new Un(n,e,t,r,i,s,o,a)}function qs(n){return new Un(n)}function k_(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function u0(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Mf(n){return n.collectionGroup!==null}function es(n){const e=F(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new de(Te.comparator);return o.filters.forEach((l=>{l.getFlattenedFilters().forEach((u=>{u.isInequality()&&(a=a.add(u.field))}))})),a})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Ia(s,r))})),t.has(Te.keyField().canonicalString())||e.Ie.push(new Ia(Te.keyField(),r))}return e.Ie}function at(n){const e=F(n);return e.Ee||(e.Ee=nw(e,es(n))),e.Ee}function tw(n){const e=F(n);return e.Re||(e.Re=nw(e,n.explicitOrderBy)),e.Re}function nw(n,e){if(n.limitType==="F")return _d(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new Ia(i.field,s)}));const t=n.endAt?new yr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new yr(n.startAt.position,n.startAt.inclusive):null;return _d(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function yd(n,e){const t=n.filters.concat([e]);return new Un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function h0(n,e){const t=n.explicitOrderBy.concat([e]);return new Un(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function fl(n,e,t){return new Un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function d0(n,e){return new Un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function f0(n,e){return new Un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function qa(n,e){return Ba(at(n),at(e))&&n.limitType===e.limitType}function rw(n){return`${di(at(n))}|lt:${n.limitType}`}function Ki(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>JT(i))).join(", ")}]`),Fa(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>gs(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>gs(i))).join(",")),`Target(${r})`})(at(n))}; limitType=${n.limitType})`}function $a(n,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):L.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(n,e)&&(function(r,i){for(const s of es(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(o,a,l){const u=R_(o,a,l);return o.inclusive?u<=0:u<0})(r.startAt,es(r),i)||r.endAt&&!(function(o,a,l){const u=R_(o,a,l);return o.inclusive?u>=0:u>0})(r.endAt,es(r),i))})(n,e)}function iw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function sw(n){return(e,t)=>{let r=!1;for(const i of es(n)){const s=p0(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function p0(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):(function(s,o,a){const l=o.data.field(s),u=a.data.field(s);return l!==null&&u!==null?_r(l,u):W(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Dr(this.inner,((t,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return LT(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m0=new Pe(L.comparator);function wt(){return m0}const ow=new Pe(L.comparator);function Vo(...n){let e=ow;for(const t of n)e=e.insert(t.key,t);return e}function aw(n){let e=ow;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function ln(){return Qo()}function cw(){return Qo()}function Qo(){return new Bn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const g0=new Pe(L.comparator),_0=new de(L.comparator);function Q(...n){let e=_0;for(const t of n)e=e.add(t);return e}const y0=new de(K);function Lf(){return y0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ff(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ha(e)?"-0":e}}function lw(n){return{integerValue:""+n}}function uw(n,e){return bT(e)?lw(e):Ff(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(){this._=void 0}}function I0(n,e,t){return n instanceof ys?(function(i,s){const o={fields:{[BT]:{stringValue:UT},[$T]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ou(s)&&(s=au(s)),s&&(o.fields[qT]=s),{mapValue:o}})(t,e):n instanceof fi?dw(n,e):n instanceof pi?fw(n,e):(function(i,s){const o=hw(i,s),a=N_(o)+N_(i.Ae);return pd(o)&&pd(i.Ae)?lw(a):Ff(i.serializer,a)})(n,e)}function E0(n,e,t){return n instanceof fi?dw(n,e):n instanceof pi?fw(n,e):t}function hw(n,e){return n instanceof Is?(function(r){return pd(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class ys extends lu{}class fi extends lu{constructor(e){super(),this.elements=e}}function dw(n,e){const t=pw(e);for(const r of n.elements)t.some((i=>pn(i,r)))||t.push(r);return{arrayValue:{values:t}}}class pi extends lu{constructor(e){super(),this.elements=e}}function fw(n,e){let t=pw(e);for(const r of n.elements)t=t.filter((i=>!pn(i,r)));return{arrayValue:{values:t}}}class Is extends lu{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function N_(n){return Ae(n.integerValue||n.doubleValue)}function pw(n){return ya(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t){this.field=e,this.transform=t}}function T0(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof fi&&i instanceof fi||r instanceof pi&&i instanceof pi?as(r.elements,i.elements,pn):r instanceof Is&&i instanceof Is?pn(r.Ae,i.Ae):r instanceof ys&&i instanceof ys})(n.transform,e.transform)}class w0{constructor(e,t){this.version=e,this.transformResults=t}}class be{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new be}static exists(e){return new be(void 0,e)}static updateTime(e){return new be(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function jc(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class uu{}function mw(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ws(n.key,be.none()):new $s(n.key,n.data,be.none());{const t=n.data,r=Ze.empty();let i=new de(Te.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new qn(n.key,r,new Tt(i.toArray()),be.none())}}function v0(n,e,t){n instanceof $s?(function(i,s,o){const a=i.value.clone(),l=O_(i.fieldTransforms,s,o.transformResults);a.setAll(l),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(n,e,t):n instanceof qn?(function(i,s,o){if(!jc(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=O_(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(gw(i)),l.setAll(a),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):(function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Yo(n,e,t,r){return n instanceof $s?(function(s,o,a,l){if(!jc(s.precondition,o))return a;const u=s.value.clone(),h=x_(s.fieldTransforms,l,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(n,e,t,r):n instanceof qn?(function(s,o,a,l){if(!jc(s.precondition,o))return a;const u=x_(s.fieldTransforms,l,o),h=o.data;return h.setAll(gw(s)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((f=>f.field)))})(n,e,t,r):(function(s,o,a){return jc(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(n,e,t)}function A0(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=hw(r.transform,i||null);s!=null&&(t===null&&(t=Ze.empty()),t.set(r.field,s))}return t||null}function D_(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&as(r,i,((s,o)=>T0(s,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class $s extends uu{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class qn extends uu{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function gw(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function O_(n,e,t){const r=new Map;G(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,E0(o,a,t[i]))}return r}function x_(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,I0(s,o,e))}return r}class Ws extends uu{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Uf extends uu{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&v0(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Yo(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Yo(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=cw();return this.mutations.forEach((i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const l=mw(o,a);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(z.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Q())}isEqual(e){return this.batchId===e.batchId&&as(this.mutations,e.mutations,((t,r)=>D_(t,r)))&&as(this.baseMutations,e.baseMutations,((t,r)=>D_(t,r)))}}class qf{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){G(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=(function(){return g0})();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new qf(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b0{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Le,oe;function yw(n){switch(n){case S.OK:return W(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return W(15467,{code:n})}}function Iw(n){if(n===void 0)return Ve("GRPC error has no .code"),S.UNKNOWN;switch(n){case Le.OK:return S.OK;case Le.CANCELLED:return S.CANCELLED;case Le.UNKNOWN:return S.UNKNOWN;case Le.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case Le.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case Le.INTERNAL:return S.INTERNAL;case Le.UNAVAILABLE:return S.UNAVAILABLE;case Le.UNAUTHENTICATED:return S.UNAUTHENTICATED;case Le.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case Le.NOT_FOUND:return S.NOT_FOUND;case Le.ALREADY_EXISTS:return S.ALREADY_EXISTS;case Le.PERMISSION_DENIED:return S.PERMISSION_DENIED;case Le.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case Le.ABORTED:return S.ABORTED;case Le.OUT_OF_RANGE:return S.OUT_OF_RANGE;case Le.UNIMPLEMENTED:return S.UNIMPLEMENTED;case Le.DATA_LOSS:return S.DATA_LOSS;default:return W(39323,{code:n})}}(oe=Le||(Le={}))[oe.OK=0]="OK",oe[oe.CANCELLED=1]="CANCELLED",oe[oe.UNKNOWN=2]="UNKNOWN",oe[oe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",oe[oe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",oe[oe.NOT_FOUND=5]="NOT_FOUND",oe[oe.ALREADY_EXISTS=6]="ALREADY_EXISTS",oe[oe.PERMISSION_DENIED=7]="PERMISSION_DENIED",oe[oe.UNAUTHENTICATED=16]="UNAUTHENTICATED",oe[oe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",oe[oe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",oe[oe.ABORTED=10]="ABORTED",oe[oe.OUT_OF_RANGE=11]="OUT_OF_RANGE",oe[oe.UNIMPLEMENTED=12]="UNIMPLEMENTED",oe[oe.INTERNAL=13]="INTERNAL",oe[oe.UNAVAILABLE=14]="UNAVAILABLE",oe[oe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jo=null;function R0(n){if(Jo)throw new Error("a TestingHooksSpi instance is already set");Jo=n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ew(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S0=new lr([4294967295,4294967295],0);function V_(n){const e=Ew().encode(n),t=new aT;return t.update(e),new Uint8Array(t.digest())}function M_(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new lr([t,r],0),new lr([i,s],0)]}class Wf{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Mo(`Invalid padding: ${t}`);if(r<0)throw new Mo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Mo(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Mo(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=lr.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(lr.fromNumber(r)));return i.compare(S0)===1&&(i=new lr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=V_(e),[r,i]=M_(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Wf(s,i,t);return r.forEach((a=>o.insert(a))),o}insert(e){if(this.ge===0)return;const t=V_(e),[r,i]=M_(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.be(o)}}be(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Mo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,za.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ga(z.min(),i,new Pe(K),wt(),Q())}}class za{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new za(r,t,Q(),Q(),Q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=i}}class Tw{constructor(e,t){this.targetId=e,this.Ce=t}}class ww{constructor(e,t,r=ke.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class L_{constructor(){this.ve=0,this.Fe=F_(),this.Me=ke.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Q(),t=Q(),r=Q();return this.Fe.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:W(38017,{changeType:s})}})),new za(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=F_()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,G(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class C0{constructor(e){this.Ge=e,this.ze=new Map,this.je=wt(),this.He=bc(),this.Je=bc(),this.Ze=new Pe(K)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:W(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,i)=>{this.rt(i)&&t(i)}))}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(hl(s))if(r===0){const o=new L(s.path);this.et(t,o,Ie.newNoDocument(o,z.min()))}else G(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const a=this.ut(e),l=a?this.ct(a,e,o):1;if(l!==0){this.it(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}Jo==null||Jo.lt((function(h,f,m,_,v){var U,$,q;const P={localCacheCount:h,existenceFilterCount:f.count,databaseId:m.database,projectId:m.projectId},k=f.unchangedNames;return k&&(P.bloomFilter={applied:v===0,hashCount:(k==null?void 0:k.hashCount)??0,bitmapLength:(($=(U=k==null?void 0:k.bits)==null?void 0:U.bitmap)==null?void 0:$.length)??0,padding:((q=k==null?void 0:k.bits)==null?void 0:q.padding)??0,mightContain:H=>(_==null?void 0:_.mightContain(H))??!1}),P})(o,e.Ce,this.Ge.ht(),a,l))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,a;try{o=On(r).toUint8Array()}catch(l){if(l instanceof FT)return St("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{a=new Wf(o,i,s)}catch(l){return St(l instanceof Mo?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return a.ge===0?null:a}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach((s=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.et(t,s,null),i++)})),i}Tt(e){const t=new Map;this.ze.forEach(((s,o)=>{const a=this.ot(o);if(a){if(s.current&&hl(a.target)){const l=new L(a.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,Ie.newNoDocument(l,e))}s.Be&&(t.set(o,s.ke()),s.Ke())}}));let r=Q();this.Je.forEach(((s,o)=>{let a=!0;o.forEachWhile((l=>{const u=this.ot(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(s))})),this.je.forEach(((s,o)=>o.setReadTime(e)));const i=new Ga(e,t,this.Ze,this.je,r);return this.je=wt(),this.He=bc(),this.Je=bc(),this.Ze=new Pe(K),i}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new L_,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new de(K),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new de(K),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new L_),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function bc(){return new Pe(L.comparator)}function F_(){return new Pe(L.comparator)}const P0={asc:"ASCENDING",desc:"DESCENDING"},k0={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},N0={and:"AND",or:"OR"};class D0{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Id(n,e){return n.useProto3Json||Fa(e)?e:{value:e}}function Es(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function vw(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function O0(n,e){return Es(n,e.toTimestamp())}function Me(n){return G(!!n,49232),z.fromTimestamp((function(t){const r=Dn(t);return new ce(r.seconds,r.nanos)})(n))}function Gf(n,e){return Ed(n,e).canonicalString()}function Ed(n,e){const t=(function(i){return new ee(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Aw(n){const e=ee.fromString(n);return G(Ow(e),10190,{key:e.toString()}),e}function Ea(n,e){return Gf(n.databaseId,e.path)}function hn(n,e){const t=Aw(e);if(t.get(1)!==n.databaseId.projectId)throw new D(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(Sw(t))}function bw(n,e){return Gf(n.databaseId,e)}function Rw(n){const e=Aw(n);return e.length===4?ee.emptyPath():Sw(e)}function Td(n){return new ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Sw(n){return G(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function U_(n,e,t){return{name:Ea(n,e),fields:t.value.mapValue.fields}}function hu(n,e,t){const r=hn(n,e.name),i=Me(e.updateTime),s=e.createTime?Me(e.createTime):z.min(),o=new Ze({mapValue:{fields:e.fields}}),a=Ie.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function x0(n,e){return"found"in e?(function(r,i){G(!!i.found,43571),i.found.name,i.found.updateTime;const s=hn(r,i.found.name),o=Me(i.found.updateTime),a=i.found.createTime?Me(i.found.createTime):z.min(),l=new Ze({mapValue:{fields:i.found.fields}});return Ie.newFoundDocument(s,o,a,l)})(n,e):"missing"in e?(function(r,i){G(!!i.missing,3894),G(!!i.readTime,22933);const s=hn(r,i.missing),o=Me(i.readTime);return Ie.newNoDocument(s,o)})(n,e):W(7234,{result:e})}function V0(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:W(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(u,h){return u.useProto3Json?(G(h===void 0||typeof h=="string",58123),ke.fromBase64String(h||"")):(G(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),ke.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(u){const h=u.code===void 0?S.UNKNOWN:Iw(u.code);return new D(h,u.message||"")})(o);t=new ww(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=hn(n,r.document.name),s=Me(r.document.updateTime),o=r.document.createTime?Me(r.document.createTime):z.min(),a=new Ze({mapValue:{fields:r.document.fields}}),l=Ie.newFoundDocument(i,s,o,a),u=r.targetIds||[],h=r.removedTargetIds||[];t=new Hc(u,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=hn(n,r.document),s=r.readTime?Me(r.readTime):z.min(),o=Ie.newNoDocument(i,s),a=r.removedTargetIds||[];t=new Hc([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=hn(n,r.document),s=r.removedTargetIds||[];t=new Hc([],s,i,null)}else{if(!("filter"in e))return W(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new b0(i,s),a=r.targetId;t=new Tw(a,o)}}return t}function Ta(n,e){let t;if(e instanceof $s)t={update:U_(n,e.key,e.value)};else if(e instanceof Ws)t={delete:Ea(n,e.key)};else if(e instanceof qn)t={update:U_(n,e.key,e.data),updateMask:q0(e.fieldMask)};else{if(!(e instanceof Uf))return W(16599,{dt:e.type});t={verify:Ea(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(s,o){const a=o.transform;if(a instanceof ys)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof fi)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof pi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Is)return{fieldPath:o.field.canonicalString(),increment:a.Ae};throw W(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:O0(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:W(27497)})(n,e.precondition)),t}function wd(n,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?be.updateTime(Me(s.updateTime)):s.exists!==void 0?be.exists(s.exists):be.none()})(e.currentDocument):be.none(),r=e.updateTransforms?e.updateTransforms.map((i=>(function(o,a){let l=null;if("setToServerValue"in a)G(a.setToServerValue==="REQUEST_TIME",16630,{proto:a}),l=new ys;else if("appendMissingElements"in a){const h=a.appendMissingElements.values||[];l=new fi(h)}else if("removeAllFromArray"in a){const h=a.removeAllFromArray.values||[];l=new pi(h)}else"increment"in a?l=new Is(o,a.increment):W(16584,{proto:a});const u=Te.fromServerFormat(a.fieldPath);return new Wa(u,l)})(n,i))):[];if(e.update){e.update.name;const i=hn(n,e.update.name),s=new Ze({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(l){const u=l.fieldPaths||[];return new Tt(u.map((h=>Te.fromServerFormat(h))))})(e.updateMask);return new qn(i,s,o,t,r)}return new $s(i,s,t,r)}if(e.delete){const i=hn(n,e.delete);return new Ws(i,t)}if(e.verify){const i=hn(n,e.verify);return new Uf(i,t)}return W(1463,{proto:e})}function M0(n,e){return n&&n.length>0?(G(e!==void 0,14353),n.map((t=>(function(i,s){let o=i.updateTime?Me(i.updateTime):Me(s);return o.isEqual(z.min())&&(o=Me(s)),new w0(o,i.transformResults||[])})(t,e)))):[]}function Cw(n,e){return{documents:[bw(n,e.path)]}}function du(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=bw(n,i);const s=(function(u){if(u.length!==0)return Dw(ue.create(u,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(u){if(u.length!==0)return u.map((h=>(function(m){return{field:Zn(m.field),direction:F0(m.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=Id(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:t,parent:i}}function Pw(n,e,t,r){const{ft:i,parent:s}=du(n,e),o={},a=[];let l=0;return t.forEach((u=>{const h=r?u.alias:"aggregate_"+l++;o[h]=u.alias,u.aggregateType==="count"?a.push({alias:h,count:{}}):u.aggregateType==="avg"?a.push({alias:h,avg:{field:Zn(u.fieldPath)}}):u.aggregateType==="sum"&&a.push({alias:h,sum:{field:Zn(u.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},gt:o,parent:s}}function kw(n){let e=Rw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){G(r===1,65062);const h=t.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=(function(f){const m=Nw(f);return m instanceof ue&&Vf(m)?m.getFilters():[m]})(t.where));let o=[];t.orderBy&&(o=(function(f){return f.map((m=>(function(v){return new Ia(Qi(v.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(v.direction))})(m)))})(t.orderBy));let a=null;t.limit&&(a=(function(f){let m;return m=typeof f=="object"?f.value:f,Fa(m)?null:m})(t.limit));let l=null;t.startAt&&(l=(function(f){const m=!!f.before,_=f.values||[];return new yr(_,m)})(t.startAt));let u=null;return t.endAt&&(u=(function(f){const m=!f.before,_=f.values||[];return new yr(_,m)})(t.endAt)),ew(e,i,o,s,a,"F",l,u)}function L0(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W(28987,{purpose:i})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Nw(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Qi(t.unaryFilter.field);return se.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Qi(t.unaryFilter.field);return se.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Qi(t.unaryFilter.field);return se.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Qi(t.unaryFilter.field);return se.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return W(61313);default:return W(60726)}})(n):n.fieldFilter!==void 0?(function(t){return se.create(Qi(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return W(58110);default:return W(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ue.create(t.compositeFilter.filters.map((r=>Nw(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W(1026)}})(t.compositeFilter.op))})(n):W(30097,{filter:n})}function F0(n){return P0[n]}function U0(n){return k0[n]}function B0(n){return N0[n]}function Zn(n){return{fieldPath:n.canonicalString()}}function Qi(n){return Te.fromServerFormat(n.fieldPath)}function Dw(n){return n instanceof se?(function(t){if(t.op==="=="){if(v_(t.value))return{unaryFilter:{field:Zn(t.field),op:"IS_NAN"}};if(w_(t.value))return{unaryFilter:{field:Zn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(v_(t.value))return{unaryFilter:{field:Zn(t.field),op:"IS_NOT_NAN"}};if(w_(t.value))return{unaryFilter:{field:Zn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zn(t.field),op:U0(t.op),value:t.value}}})(n):n instanceof ue?(function(t){const r=t.getFilters().map((i=>Dw(i)));return r.length===1?r[0]:{compositeFilter:{op:B0(t.op),filters:r}}})(n):W(54877,{filter:n})}function q0(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Ow(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function xw(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t,r,i,s=z.min(),o=z.min(),a=ke.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new bn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new bn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new bn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new bn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(e){this.yt=e}}function $0(n,e){let t;if(e.document)t=hu(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=L.fromSegments(e.noDocument.path),i=gi(e.noDocument.readTime);t=Ie.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return W(56709);{const r=L.fromSegments(e.unknownDocument.path),i=gi(e.unknownDocument.version);t=Ie.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime((function(i){const s=new ce(i[0],i[1]);return z.fromTimestamp(s)})(e.readTime)),t}function B_(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:pl(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(s,o){return{name:Ea(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Es(s,o.version.toTimestamp()),createTime:Es(s,o.createTime.toTimestamp())}})(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:mi(e.version)};else{if(!e.isUnknownDocument())return W(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:mi(e.version)}}return r}function pl(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function mi(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function gi(n){const e=new ce(n.seconds,n.nanoseconds);return z.fromTimestamp(e)}function Yr(n,e){const t=(e.baseMutations||[]).map((s=>wd(n.yt,s)));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map((s=>wd(n.yt,s))),i=ce.fromMillis(e.localWriteTimeMs);return new Bf(e.batchId,i,t,r)}function Lo(n){const e=gi(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?gi(n.lastLimboFreeSnapshotVersion):z.min();let r;return r=(function(s){return s.documents!==void 0})(n.query)?(function(s){const o=s.documents.length;return G(o===1,1966,{count:o}),at(qs(Rw(s.documents[0])))})(n.query):(function(s){return at(kw(s))})(n.query),new bn(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,ke.fromBase64String(n.resumeToken))}function Mw(n,e){const t=mi(e.snapshotVersion),r=mi(e.lastLimboFreeSnapshotVersion);let i;i=hl(e.target)?Cw(n.yt,e.target):du(n.yt,e.target).ft;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:di(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function fu(n){const e=kw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?fl(e,e.limit,"L"):e}function Ch(n,e){return new $f(e.largestBatchId,wd(n.yt,e.overlayMutation))}function q_(n,e){const t=e.path.lastSegment();return[n,ot(e.path.popLast()),t]}function $_(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:mi(r.readTime),documentKey:ot(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W0{getBundleMetadata(e,t){return W_(e).get(t).next((r=>{if(r)return(function(s){return{id:s.bundleId,createTime:gi(s.createTime),version:s.version}})(r)}))}saveBundleMetadata(e,t){return W_(e).put((function(i){return{bundleId:i.id,createTime:mi(Me(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return G_(e).get(t).next((r=>{if(r)return(function(s){return{name:s.name,query:fu(s.bundledQuery),readTime:gi(s.readTime)}})(r)}))}saveNamedQuery(e,t){return G_(e).put((function(i){return{name:i.name,readTime:mi(Me(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function W_(n){return je(n,ru)}function G_(n){return je(n,iu)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new pu(e,r)}getOverlay(e,t){return Eo(e).get(q_(this.userId,t)).next((r=>r?Ch(this.serializer,r):null))}getOverlays(e,t){const r=ln();return b.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){const i=[];return r.forEach(((s,o)=>{const a=new $f(t,o);i.push(this.bt(e,a))})),b.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach((o=>i.add(ot(o.getCollectionPath()))));const s=[];return i.forEach((o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Eo(e).X(ud,a))})),b.waitFor(s)}getOverlaysForCollection(e,t,r){const i=ln(),s=ot(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Eo(e).H(ud,o).next((a=>{for(const l of a){const u=Ch(this.serializer,l);i.set(u.getKey(),u)}return i}))}getOverlaysForCollectionGroup(e,t,r,i){const s=ln();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Eo(e).ee({index:NT,range:a},((l,u,h)=>{const f=Ch(this.serializer,u);s.size()<i||f.largestBatchId===o?(s.set(f.getKey(),f),o=f.largestBatchId):h.done()})).next((()=>s))}bt(e,t){return Eo(e).put((function(i,s,o){const[a,l,u]=q_(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:u,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ta(i.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Eo(n){return je(n,su)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G0{St(e){return je(e,Nf)}getSessionToken(e){return this.St(e).get("sessionToken").next((t=>{const r=t==null?void 0:t.value;return r?ke.fromUint8Array(r):ke.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(Ae(e.integerValue));else if("doubleValue"in e){const r=Ae(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),ha(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=Dn(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(On(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?GT(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):cu(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):W(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){const r=e.fields||{};this.Ft(t,55);for(const i of Object.keys(r))this.Ot(i,t),this.Ct(r[i],t)}kt(e,t){var o,a;const r=e.fields||{};this.Ft(t,53);const i=ms,s=((a=(o=r[i].arrayValue)==null?void 0:o.values)==null?void 0:a.length)||0;this.Ft(t,15),t.Mt(Ae(s)),this.Ot(i,t),this.Ct(r[i],t)}qt(e,t){const r=e.values||[];this.Ft(t,50);for(const i of r)this.Ct(i,t)}Lt(e,t){this.Ft(t,37),L.fromName(e).path.forEach((r=>{this.Ft(t,60),this.$t(r,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Jr.Wt=new Jr;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $i=255;function z0(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function z_(n){const e=64-(function(r){let i=0;for(let s=0;s<8;++s){const o=z0(255&r[s]);if(i+=o,o!==8)break}return i})(n);return Math.ceil(e/8)}class j0{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ht(r.value),r=t.next();this.Jt()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const i=t.codePointAt(0);this.Gt(240|i>>>18),this.Gt(128|63&i>>>12),this.Gt(128|63&i>>>6),this.Gt(128|63&i)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ht(r);else if(r<2048)this.Ht(960|r>>>6),this.Ht(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ht(480|r>>>12),this.Ht(128|63&r>>>6),this.Ht(128|63&r);else{const i=t.codePointAt(0);this.Ht(240|i>>>18),this.Ht(128|63&i>>>12),this.Ht(128|63&i>>>6),this.Ht(128|63&i)}}this.Jt()}Yt(e){const t=this.en(e),r=z_(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}nn(e){const t=this.en(e),r=z_(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}rn(){this.sn($i),this.sn(255)}_n(){this.an($i),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)})(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===$i?(this.sn($i),this.sn(0)):this.sn(t)}Ht(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===$i?(this.an($i),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Jt(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class H0{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class K0{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class To{constructor(){this.cn=new j0,this.ascending=new H0(this.cn),this.descending=new K0(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e,t,r,i){this.hn=e,this.Pn=t,this.Tn=r,this.In=i}En(){const e=this.In.length,t=e===0||this.In[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.In,0),t!==e?r.set([0],this.In.length):++r[r.length-1],new Xr(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:Kc(this.Tn),directionalValue:Kc(this.In),orderedDocumentKey:Kc(t),documentKey:r.path.toArray()}}An(e,t,r){const i=this.Rn(e,t,r);return[i.indexId,i.uid,i.arrayValue,i.directionalValue,i.orderedDocumentKey,i.documentKey]}}function Yn(n,e){let t=n.hn-e.hn;return t!==0?t:(t=j_(n.Tn,e.Tn),t!==0?t:(t=j_(n.In,e.In),t!==0?t:L.comparator(n.Pn,e.Pn)))}function j_(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function Kc(n){return YI()?(function(t){let r="";for(let i=0;i<t.length;i++)r+=String.fromCharCode(t[i]);return r})(n):n}function H_(n){return typeof n!="string"?n:(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(n)}class K_{constructor(e){this.Vn=new de(((t,r)=>Te.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(G(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=ad(e);if(t!==void 0&&!this.pn(t))return!1;const r=jr(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.pn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Vn.size>0){const a=this.Vn.getIterator().getNext();if(!i.has(a.field.canonicalString())){const l=r[s];if(!this.yn(a,l)||!this.wn(this.dn[o++],l))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.dn.length||!this.wn(this.dn[o++],a))return!1}return!0}bn(){if(this.fn)return null;let e=new de(Te.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new ii(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new ii(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new ii(r.field,r.dir==="asc"?0:1)));return new ls(ls.UNKNOWN_ID,this.collectionId,t,us.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lw(n){var t,r;if(G(n instanceof se||n instanceof ue,20012),n instanceof se){if(n instanceof ZT){const i=((r=(t=n.value.arrayValue)==null?void 0:t.values)==null?void 0:r.map((s=>se.create(n.field,"==",s))))||[];return ue.create(i,"or")}return n}const e=n.filters.map((i=>Lw(i)));return ue.create(e,n.op)}function Q0(n){if(n.getFilters().length===0)return[];const e=bd(Lw(n));return G(Fw(e),7391),vd(e)||Ad(e)?[e]:e.getFilters()}function vd(n){return n instanceof se}function Ad(n){return n instanceof ue&&Vf(n)}function Fw(n){return vd(n)||Ad(n)||(function(t){if(t instanceof ue&&md(t)){for(const r of t.getFilters())if(!vd(r)&&!Ad(r))return!1;return!0}return!1})(n)}function bd(n){if(G(n instanceof se||n instanceof ue,34018),n instanceof se)return n;if(n.filters.length===1)return bd(n.filters[0]);const e=n.filters.map((r=>bd(r)));let t=ue.create(e,n.op);return t=ml(t),Fw(t)?t:(G(t instanceof ue,64498),G(_s(t),40251),G(t.filters.length>1,57927),t.filters.reduce(((r,i)=>zf(r,i))))}function zf(n,e){let t;return G(n instanceof se||n instanceof ue,38388),G(e instanceof se||e instanceof ue,25473),t=n instanceof se?e instanceof se?(function(i,s){return ue.create([i,s],"and")})(n,e):Q_(n,e):e instanceof se?Q_(e,n):(function(i,s){if(G(i.filters.length>0&&s.filters.length>0,48005),_s(i)&&_s(s))return YT(i,s.getFilters());const o=md(i)?i:s,a=md(i)?s:i,l=o.filters.map((u=>zf(u,a)));return ue.create(l,"or")})(n,e),ml(t)}function Q_(n,e){if(_s(e))return YT(e,n.getFilters());{const t=e.filters.map((r=>zf(n,r)));return ue.create(t,"or")}}function ml(n){if(G(n instanceof se||n instanceof ue,11850),n instanceof se)return n;const e=n.getFilters();if(e.length===1)return ml(e[0]);if(KT(n))return n;const t=e.map((i=>ml(i))),r=[];return t.forEach((i=>{i instanceof se?r.push(i):i instanceof ue&&(i.op===n.op?r.push(...i.filters):r.push(i))})),r.length===1?r[0]:ue.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y0{constructor(){this.Sn=new jf}addToCollectionParentIndex(e,t){return this.Sn.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(Vt.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(Vt.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class jf{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new de(ee.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new de(ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_="IndexedDbIndexManager",Rc=new Uint8Array(0);class J0{constructor(e,t){this.databaseId=t,this.Dn=new jf,this.Cn=new Bn((r=>di(r)),((r,i)=>Ba(r,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const s={collectionId:r,parent:ot(i)};return J_(e).put(s)}return b.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[gT(t),""],!1,!0);return J_(e).H(i).next((s=>{for(const o of s){if(o.collectionId!==t)break;r.push(cn(o.parent))}return r}))}addFieldIndex(e,t){const r=wo(e),i=(function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map((l=>[l.fieldPath.canonicalString(),l.kind]))}})(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Gi(e);return s.next((a=>{o.put($_(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const r=wo(e),i=Gi(e),s=Wi(e);return r.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=wo(e),r=Wi(e),i=Gi(e);return t.X().next((()=>r.X())).next((()=>i.X()))}createTargetIndexes(e,t){return b.forEach(this.vn(t),(r=>this.getIndexType(e,r).next((i=>{if(i===0||i===1){const s=new K_(r).bn();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const r=Wi(e);let i=!0;const s=new Map;return b.forEach(this.vn(t),(o=>this.Fn(e,o).next((a=>{i&&(i=!!a),s.set(o,a)})))).next((()=>{if(i){let o=Q();const a=[];return b.forEach(s,((l,u)=>{O(Y_,`Using index ${(function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map((H=>`${H.fieldPath}:${H.kind}`)).join(",")}`})(l)} to execute ${di(t)}`);const h=(function(q,H){const Z=ad(H);if(Z===void 0)return null;for(const ie of dl(q,Z.fieldPath))switch(ie.op){case"array-contains-any":return ie.value.arrayValue.values||[];case"array-contains":return[ie.value]}return null})(u,l),f=(function(q,H){const Z=new Map;for(const ie of jr(H))for(const T of dl(q,ie.fieldPath))switch(T.op){case"==":case"in":Z.set(ie.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return Z.set(ie.fieldPath.canonicalString(),T.value),Array.from(Z.values())}return null})(u,l),m=(function(q,H){const Z=[];let ie=!0;for(const T of jr(H)){const y=T.kind===0?C_(q,T.fieldPath,q.startAt):P_(q,T.fieldPath,q.startAt);Z.push(y.value),ie&&(ie=y.inclusive)}return new yr(Z,ie)})(u,l),_=(function(q,H){const Z=[];let ie=!0;for(const T of jr(H)){const y=T.kind===0?P_(q,T.fieldPath,q.endAt):C_(q,T.fieldPath,q.endAt);Z.push(y.value),ie&&(ie=y.inclusive)}return new yr(Z,ie)})(u,l),v=this.Mn(l,u,m),P=this.Mn(l,u,_),k=this.xn(l,u,f),U=this.On(l.indexId,h,v,m.inclusive,P,_.inclusive,k);return b.forEach(U,($=>r.Z($,t.limit).next((q=>{q.forEach((H=>{const Z=L.fromSegments(H.documentKey);o.has(Z)||(o=o.add(Z),a.push(Z))}))}))))})).next((()=>a))}return b.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=Q0(ue.create(e.filters,"and")).map((r=>_d(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,r,i,s,o,a){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),u=l/(t!=null?t.length:1),h=[];for(let f=0;f<l;++f){const m=t?this.Nn(t[f/u]):Rc,_=this.Bn(e,m,r[f%u],i),v=this.Ln(e,m,s[f%u],o),P=a.map((k=>this.Bn(e,m,k,!0)));h.push(...this.createRange(_,v,P))}return h}Bn(e,t,r,i){const s=new Xr(e,L.empty(),t,r);return i?s:s.En()}Ln(e,t,r,i){const s=new Xr(e,L.empty(),t,r);return i?s.En():s}Fn(e,t){const r=new K_(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let o=null;for(const a of s)r.gn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o}))}getIndexType(e,t){let r=2;const i=this.vn(t);return b.forEach(i,(s=>this.Fn(e,s).next((o=>{o?r!==0&&o.fields.length<(function(l){let u=new de(Te.comparator),h=!1;for(const f of l.filters)for(const m of f.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?h=!0:u=u.add(m.field));for(const f of l.orderBy)f.field.isKeyField()||(u=u.add(f.field));return u.size+(h?1:0)})(s)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&i.length>1&&r===2?1:r))}kn(e,t){const r=new To;for(const i of jr(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.ln(i.kind);Jr.Wt.Dt(s,o)}return r.un()}Nn(e){const t=new To;return Jr.Wt.Dt(e,t.ln(0)),t.un()}Kn(e,t){const r=new To;return Jr.Wt.Dt(hi(this.databaseId,t),r.ln((function(s){const o=jr(s);return o.length===0?0:o[o.length-1].kind})(e))),r.un()}xn(e,t,r){if(r===null)return[];let i=[];i.push(new To);let s=0;for(const o of jr(e)){const a=r[s++];for(const l of i)if(this.qn(t,o.fieldPath)&&ya(a))i=this.Un(i,o,a);else{const u=l.ln(o.kind);Jr.Wt.Dt(a,u)}}return this.$n(i)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const l=new To;l.seed(a.un()),Jr.Wt.Dt(o,l.ln(t.kind)),s.push(l)}return s}qn(e,t){return!!e.filters.find((r=>r instanceof se&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=wo(e),i=Gi(e);return(t?r.H(ld,IDBKeyRange.bound(t,t)):r.H()).next((s=>{const o=[];return b.forEach(s,(a=>i.get([a.indexId,this.uid]).next((l=>{o.push((function(h,f){const m=f?new us(f.sequenceNumber,new Vt(gi(f.readTime),new L(cn(f.documentKey)),f.largestBatchId)):us.empty(),_=h.fields.map((([v,P])=>new ii(Te.fromServerFormat(v),P)));return new ls(h.indexId,h.collectionGroup,_,m)})(a,l))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:K(r.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const i=wo(e),s=Gi(e);return this.Wn(e).next((o=>i.H(ld,IDBKeyRange.bound(t,t)).next((a=>b.forEach(a,(l=>s.put($_(l.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return b.forEach(t,((i,s)=>{const o=r.get(i.collectionGroup);return(o?b.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next((a=>(r.set(i.collectionGroup,a),b.forEach(a,(l=>this.Qn(e,i,l).next((u=>{const h=this.Gn(s,l);return u.isEqual(h)?b.resolve():this.zn(e,s,l,u,h)})))))))}))}jn(e,t,r,i){return Wi(e).put(i.Rn(this.uid,this.Kn(r,t.key),t.key))}Hn(e,t,r,i){return Wi(e).delete(i.An(this.uid,this.Kn(r,t.key),t.key))}Qn(e,t,r){const i=Wi(e);let s=new de(Yn);return i.ee({index:kT,range:IDBKeyRange.only([r.indexId,this.uid,Kc(this.Kn(r,t))])},((o,a)=>{s=s.add(new Xr(r.indexId,t,H_(a.arrayValue),H_(a.directionalValue)))})).next((()=>s))}Gn(e,t){let r=new de(Yn);const i=this.kn(t,e);if(i==null)return r;const s=ad(t);if(s!=null){const o=e.data.field(s.fieldPath);if(ya(o))for(const a of o.arrayValue.values||[])r=r.add(new Xr(t.indexId,e.key,this.Nn(a),i))}else r=r.add(new Xr(t.indexId,e.key,Rc,i));return r}zn(e,t,r,i,s){O(Y_,"Updating index entries for document '%s'",t.key);const o=[];return(function(l,u,h,f,m){const _=l.getIterator(),v=u.getIterator();let P=qi(_),k=qi(v);for(;P||k;){let U=!1,$=!1;if(P&&k){const q=h(P,k);q<0?$=!0:q>0&&(U=!0)}else P!=null?$=!0:U=!0;U?(f(k),k=qi(v)):$?(m(P),P=qi(_)):(P=qi(_),k=qi(v))}})(i,s,Yn,(a=>{o.push(this.jn(e,t,r,a))}),(a=>{o.push(this.Hn(e,t,r,a))})),b.waitFor(o)}Wn(e){let t=1;return Gi(e).ee({index:PT,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,a)=>Yn(o,a))).filter(((o,a,l)=>!a||Yn(o,l[a-1])!==0));const i=[];i.push(e);for(const o of r){const a=Yn(o,e),l=Yn(o,t);if(a===0)i[0]=e.En();else if(a>0&&l<0)i.push(o),i.push(o.En());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Jn(i[o],i[o+1]))return[];const a=i[o].An(this.uid,Rc,L.empty()),l=i[o+1].An(this.uid,Rc,L.empty());s.push(IDBKeyRange.bound(a,l))}return s}Jn(e,t){return Yn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(X_)}getMinOffset(e,t){return b.mapArray(this.vn(t),(r=>this.Fn(e,r).next((i=>i||W(44426))))).next(X_)}}function J_(n){return je(n,pa)}function Wi(n){return je(n,Ho)}function wo(n){return je(n,kf)}function Gi(n){return je(n,jo)}function X_(n){G(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;Sf(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Vt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Uw=41943040;class st{static withCacheSize(e){return new st(e,st.DEFAULT_COLLECTION_PERCENTILE,st.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(n,e,t){const r=n.store(zt),i=n.store(hs),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const l=r.ee({range:o},((h,f,m)=>(a++,m.delete())));s.push(l.next((()=>{G(a===1,47070,{batchId:t.batchId})})));const u=[];for(const h of t.mutations){const f=RT(e,h.key.path,t.batchId);s.push(i.delete(f)),u.push(h.key)}return b.waitFor(s).next((()=>u))}function gl(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw W(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */st.DEFAULT_COLLECTION_PERCENTILE=10,st.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,st.DEFAULT=new st(Uw,st.DEFAULT_COLLECTION_PERCENTILE,st.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),st.DISABLED=new st(-1,0,0);class mu{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Zn={}}static wt(e,t,r,i){G(e.uid!=="",64387);const s=e.isAuthenticated()?e.uid:"";return new mu(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Jn(e).ee({index:ei,range:r},((i,s,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,i){const s=Yi(e),o=Jn(e);return o.add({}).next((a=>{G(typeof a=="number",49019);const l=new Bf(a,t,r,i),u=(function(_,v,P){const k=P.baseMutations.map(($=>Ta(_.yt,$))),U=P.mutations.map(($=>Ta(_.yt,$)));return{userId:v,batchId:P.batchId,localWriteTimeMs:P.localWriteTime.toMillis(),baseMutations:k,mutations:U}})(this.serializer,this.userId,l),h=[];let f=new de(((m,_)=>K(m.canonicalString(),_.canonicalString())));for(const m of i){const _=RT(this.userId,m.key.path,a);f=f.add(m.key.path.popLast()),h.push(o.put(u)),h.push(s.put(_,RD))}return f.forEach((m=>{h.push(this.indexManager.addToCollectionParentIndex(e,m))})),e.addOnCommittedListener((()=>{this.Zn[a]=l.keys()})),b.waitFor(h).next((()=>l))}))}lookupMutationBatch(e,t){return Jn(e).get(t).next((r=>r?(G(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),Yr(this.serializer,r)):null))}Xn(e,t){return this.Zn[t]?b.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const i=r.keys();return this.Zn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return Jn(e).ee({index:ei,range:i},((o,a,l)=>{a.userId===this.userId&&(G(a.batchId>=r,47524,{Yn:r}),s=Yr(this.serializer,a)),l.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=ur;return Jn(e).ee({index:ei,range:t,reverse:!0},((i,s,o)=>{r=s.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,ur],[this.userId,Number.POSITIVE_INFINITY]);return Jn(e).H(ei,t).next((r=>r.map((i=>Yr(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=qc(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Yi(e).ee({range:i},((o,a,l)=>{const[u,h,f]=o,m=cn(h);if(u===this.userId&&t.path.isEqual(m))return Jn(e).get(f).next((_=>{if(!_)throw W(61480,{er:o,batchId:f});G(_.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:_.userId,batchId:f}),s.push(Yr(this.serializer,_))}));l.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new de(K);const i=[];return t.forEach((s=>{const o=qc(this.userId,s.path),a=IDBKeyRange.lowerBound(o),l=Yi(e).ee({range:a},((u,h,f)=>{const[m,_,v]=u,P=cn(_);m===this.userId&&s.path.isEqual(P)?r=r.add(v):f.done()}));i.push(l)})),b.waitFor(i).next((()=>this.tr(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=qc(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new de(K);return Yi(e).ee({range:o},((l,u,h)=>{const[f,m,_]=l,v=cn(m);f===this.userId&&r.isPrefixOf(v)?v.length===i&&(a=a.add(_)):h.done()})).next((()=>this.tr(e,a)))}tr(e,t){const r=[],i=[];return t.forEach((s=>{i.push(Jn(e).get(s).next((o=>{if(o===null)throw W(35274,{batchId:s});G(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:s}),r.push(Yr(this.serializer,o))})))})),b.waitFor(i).next((()=>r))}removeMutationBatch(e,t){return Bw(e.le,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),b.forEach(r,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return b.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),i=[];return Yi(e).ee({range:r},((s,o,a)=>{if(s[0]===this.userId){const l=cn(s[1]);i.push(l)}else a.done()})).next((()=>{G(i.length===0,56720,{rr:i.map((s=>s.canonicalString()))})}))}))}containsKey(e,t){return qw(e,this.userId,t)}ir(e){return $w(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:ur,lastStreamToken:""}))}}function qw(n,e,t){const r=qc(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Yi(n).ee({range:s,Y:!0},((a,l,u)=>{const[h,f,m]=a;h===e&&f===i&&(o=!0),u.done()})).next((()=>o))}function Jn(n){return je(n,zt)}function Yi(n){return je(n,hs)}function $w(n){return je(n,da)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new _i(0)}static ar(){return new _i(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X0{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const r=new _i(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>z.fromTimestamp(new ce(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.ur(e).next((i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.cr(e,i))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>zi(e).delete(t.targetId))).next((()=>this.ur(e))).next((r=>(G(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r))))}removeTargets(e,t,r){let i=0;const s=[];return zi(e).ee(((o,a)=>{const l=Lo(a);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))})).next((()=>b.waitFor(s))).next((()=>i))}forEachTarget(e,t){return zi(e).ee(((r,i)=>{const s=Lo(i);t(s)}))}ur(e){return ey(e).get(ul).next((t=>(G(t!==null,2888),t)))}cr(e,t){return ey(e).put(ul,t)}lr(e,t){return zi(e).put(Mw(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const r=di(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return zi(e).ee({range:i,index:CT},((o,a,l)=>{const u=Lo(a);Ba(t,u.target)&&(s=u,l.done())})).next((()=>s))}addMatchingKeys(e,t,r){const i=[],s=er(e);return t.forEach((o=>{const a=ot(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))})),b.waitFor(i)}removeMatchingKeys(e,t,r){const i=er(e);return b.forEach(t,(s=>{const o=ot(s.path);return b.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])}))}removeMatchingKeysForTargetId(e,t){const r=er(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=er(e);let s=Q();return i.ee({range:r,Y:!0},((o,a,l)=>{const u=cn(o[1]),h=new L(u);s=s.add(h)})).next((()=>s))}containsKey(e,t){const r=ot(t.path),i=IDBKeyRange.bound([r],[gT(r)],!1,!0);let s=0;return er(e).ee({index:Pf,Y:!0,range:i},(([o,a],l,u)=>{o!==0&&(s++,u.done())})).next((()=>s>0))}At(e,t){return zi(e).get(t).next((r=>r?Lo(r):null))}}function zi(n){return je(n,ds)}function ey(n){return je(n,si)}function er(n){return je(n,fs)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty="LruGarbageCollector",Ww=1048576;function ny([n,e],[t,r]){const i=K(n,t);return i===0?K(e,r):i}class Z0{constructor(e){this.Pr=e,this.buffer=new de(ny),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();ny(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Gw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){O(ty,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Nr(t)?O(ty,"Ignoring IndexedDB error during garbage collection: ",t):await kr(t)}await this.Ar(3e5)}))}}class eO{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return b.resolve(Et.ce);const r=new Z0(t);return this.Vr.forEachTarget(e,(i=>r.Er(i.sequenceNumber))).next((()=>this.Vr.mr(e,(i=>r.Er(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(Z_)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Z_):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,s,o,a,l,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),i=this.params.maximumSequenceNumbersToCollect):i=f,o=Date.now(),this.nthSequenceNumber(e,i)))).next((f=>(r=f,a=Date.now(),this.removeTargets(e,r,t)))).next((f=>(s=f,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((f=>(u=Date.now(),Hi()<=re.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(l-a)+`ms
	Removed ${f} documents in `+(u-l)+`ms
Total Duration: ${u-h}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:f}))))}}function zw(n,e){return new eO(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tO{constructor(e,t){this.db=e,this.garbageCollector=zw(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((r,i)=>t(i)))}addReference(e,t,r){return Sc(e,r)}removeReference(e,t,r){return Sc(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Sc(e,t)}wr(e,t){return(function(i,s){let o=!1;return $w(i).te((a=>qw(i,a,s).next((l=>(l&&(o=!0),b.resolve(!l)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.yr(e,((o,a)=>{if(a<=t){const l=this.wr(e,o).next((u=>{if(!u)return s++,r.getEntry(e,o).next((()=>(r.removeEntry(o,z.min()),er(e).delete((function(f){return[0,ot(f.path)]})(o)))))}));i.push(l)}})).next((()=>b.waitFor(i))).next((()=>r.apply(e))).next((()=>s))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Sc(e,t)}yr(e,t){const r=er(e);let i,s=Et.ce;return r.ee({index:Pf},(([o,a],{path:l,sequenceNumber:u})=>{o===0?(s!==Et.ce&&t(new L(cn(i)),s),s=u,i=l):s=Et.ce})).next((()=>{s!==Et.ce&&t(new L(cn(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Sc(n,e){return er(n).put((function(r,i){return{targetId:0,path:ot(r.path),sequenceNumber:i}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(){this.changes=new Bn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Gr(e).put(r)}removeEntry(e,t,r){return Gr(e).delete((function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],pl(o),a[a.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.br(e,r))))}getEntry(e,t){let r=Ie.newInvalidDocument(t);return Gr(e).ee({index:$c,range:IDBKeyRange.only(vo(t))},((i,s)=>{r=this.Sr(t,s)})).next((()=>r))}Dr(e,t){let r={size:0,document:Ie.newInvalidDocument(t)};return Gr(e).ee({index:$c,range:IDBKeyRange.only(vo(t))},((i,s)=>{r={document:this.Sr(t,s),size:gl(s)}})).next((()=>r))}getEntries(e,t){let r=wt();return this.Cr(e,t,((i,s)=>{const o=this.Sr(i,s);r=r.insert(i,o)})).next((()=>r))}vr(e,t){let r=wt(),i=new Pe(L.comparator);return this.Cr(e,t,((s,o)=>{const a=this.Sr(s,o);r=r.insert(s,a),i=i.insert(s,gl(o))})).next((()=>({documents:r,Fr:i})))}Cr(e,t,r){if(t.isEmpty())return b.resolve();let i=new de(sy);t.forEach((l=>i=i.add(l)));const s=IDBKeyRange.bound(vo(i.first()),vo(i.last())),o=i.getIterator();let a=o.getNext();return Gr(e).ee({index:$c,range:s},((l,u,h)=>{const f=L.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;a&&sy(a,f)<0;)r(a,null),a=o.getNext();a&&a.isEqual(f)&&(r(a,u),a=o.hasNext()?o.getNext():null),a?h.j(vo(a)):h.done()})).next((()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,a=[o.popLast().toArray(),o.lastSegment(),pl(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Gr(e).H(IDBKeyRange.bound(a,l,!0)).next((u=>{s==null||s.incrementDocumentReadCount(u.length);let h=wt();for(const f of u){const m=this.Sr(L.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);m.isFoundDocument()&&($a(t,m)||i.has(m.key))&&(h=h.insert(m.key,m))}return h}))}getAllFromCollectionGroup(e,t,r,i){let s=wt();const o=iy(t,r),a=iy(t,Vt.max());return Gr(e).ee({index:ST,range:IDBKeyRange.bound(o,a,!0)},((l,u,h)=>{const f=this.Sr(L.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);s=s.insert(f.key,f),s.size===i&&h.done()})).next((()=>s))}newChangeBuffer(e){return new rO(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return ry(e).get(cd).next((t=>(G(!!t,20021),t)))}br(e,t){return ry(e).put(cd,t)}Sr(e,t){if(t){const r=$0(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(z.min())))return r}return Ie.newInvalidDocument(e)}}function Hw(n){return new nO(n)}class rO extends jw{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new Bn((r=>r.toString()),((r,i)=>r.isEqual(i)))}applyChanges(e){const t=[];let r=0,i=new de(((s,o)=>K(s.canonicalString(),o.canonicalString())));return this.changes.forEach(((s,o)=>{const a=this.Or.get(s);if(t.push(this.Mr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const l=B_(this.Mr.serializer,o);i=i.add(s.path.popLast());const u=gl(l);r+=u-a.size,t.push(this.Mr.addEntry(e,s,l))}else if(r-=a.size,this.trackRemovals){const l=B_(this.Mr.serializer,o.convertToNoDocument(z.min()));t.push(this.Mr.addEntry(e,s,l))}})),i.forEach((s=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.Mr.updateMetadata(e,r)),b.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:r,Fr:i})=>(i.forEach(((s,o)=>{this.Or.set(s,{size:o,readTime:r.get(s).readTime})})),r)))}}function ry(n){return je(n,fa)}function Gr(n){return je(n,ll)}function vo(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function iy(n,e){const t=e.documentKey.path.toArray();return[n,pl(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function sy(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=K(t[s],r[s]),i)return i;return i=K(t.length,r.length),i||(i=K(t[t.length-2],r[r.length-2]),i||K(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iO{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&Yo(r.mutation,i,Tt.empty(),ce.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Q()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Q()){const i=ln();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((s=>{let o=Vo();return s.forEach(((a,l)=>{o=o.insert(a,l.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=ln();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Q())))}populateOverlays(e,t,r){const i=[];return r.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((o,a)=>{t.set(o,a)}))}))}computeViews(e,t,r,i){let s=wt();const o=Qo(),a=(function(){return Qo()})();return t.forEach(((l,u)=>{const h=r.get(u.key);i.has(u.key)&&(h===void 0||h.mutation instanceof qn)?s=s.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),Yo(h.mutation,u,h.mutation.getFieldMask(),ce.now())):o.set(u.key,Tt.empty())})),this.recalculateAndSaveOverlays(e,s).next((l=>(l.forEach(((u,h)=>o.set(u,h))),t.forEach(((u,h)=>a.set(u,new iO(h,o.get(u)??null)))),a)))}recalculateAndSaveOverlays(e,t){const r=Qo();let i=new Pe(((o,a)=>o-a)),s=Q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const a of o)a.keys().forEach((l=>{const u=t.get(l);if(u===null)return;let h=r.get(l)||Tt.empty();h=a.applyToLocalView(u,h),r.set(l,h);const f=(i.get(a.batchId)||Q()).add(l);i=i.insert(a.batchId,f)}))})).next((()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),u=l.key,h=l.value,f=cw();h.forEach((m=>{if(!s.has(m)){const _=mw(t.get(m),r.get(m));_!==null&&f.set(m,_),s=s.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,f))}return b.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return u0(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Mf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):b.resolve(ln());let a=cs,l=s;return o.next((u=>b.forEach(u,((h,f)=>(a<f.largestBatchId&&(a=f.largestBatchId),s.get(h)?b.resolve():this.remoteDocumentCache.getEntry(e,h).next((m=>{l=l.insert(h,m)}))))).next((()=>this.populateOverlays(e,u,s))).next((()=>this.computeViews(e,l,u,Q()))).next((h=>({batchId:a,changes:aw(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next((r=>{let i=Vo();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=Vo();return this.indexManager.getCollectionParents(e,s).next((a=>b.forEach(a,(l=>{const u=(function(f,m){return new Un(m,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,r,i).next((h=>{h.forEach(((f,m)=>{o=o.insert(f,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i)))).next((o=>{s.forEach(((l,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,Ie.newInvalidDocument(h)))}));let a=Vo();return o.forEach(((l,u)=>{const h=s.get(l);h!==void 0&&Yo(h.mutation,u,Tt.empty(),ce.now()),$a(t,u)&&(a=a.insert(l,u))})),a}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sO{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return b.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:Me(i.createTime)}})(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(i){return{name:i.name,query:fu(i.bundledQuery),readTime:Me(i.readTime)}})(t)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oO{constructor(){this.overlays=new Pe(L.comparator),this.Lr=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const r=ln();return b.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,s)=>{this.bt(e,t,s)})),b.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Lr.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){const i=ln(),s=t.length+1,o=new L(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Pe(((u,h)=>u-h));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let h=s.get(u.largestBatchId);h===null&&(h=ln(),s=s.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const a=ln(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((u,h)=>a.set(u,h))),!(a.size()>=i)););return b.resolve(a)}bt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new $f(t,r));let s=this.Lr.get(t);s===void 0&&(s=Q(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aO{constructor(){this.sessionToken=ke.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(){this.kr=new de(Qe.Kr),this.qr=new de(Qe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Qe(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new Qe(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new L(new ee([])),r=new Qe(t,e),i=new Qe(t,e+1),s=[];return this.qr.forEachInRange([r,i],(o=>{this.Wr(o),s.push(o.key)})),s}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new L(new ee([])),r=new Qe(t,e),i=new Qe(t,e+1);let s=Q();return this.qr.forEachInRange([r,i],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new Qe(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Qe{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return L.comparator(e.key,t.key)||K(e.Hr,t.Hr)}static Ur(e,t){return K(e.Hr,t.Hr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cO{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new de(Qe.Kr)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Bf(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.Jr=this.Jr.add(new Qe(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?ur:this.Yn-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Qe(t,0),i=new Qe(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([r,i],(o=>{const a=this.Zr(o.Hr);s.push(a)})),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new de(K);return t.forEach((i=>{const s=new Qe(i,0),o=new Qe(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],(a=>{r=r.add(a.Hr)}))})),b.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;L.isDocumentKey(s)||(s=s.child(""));const o=new Qe(new L(s),0);let a=new de(K);return this.Jr.forEachWhile((l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===i&&(a=a.add(l.Hr)),!0)}),o),b.resolve(this.Yr(a))}Yr(e){const t=[];return e.forEach((r=>{const i=this.Zr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){G(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return b.forEach(t.mutations,(i=>{const s=new Qe(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.Jr=r}))}nr(e){}containsKey(e,t){const r=new Qe(t,0),i=this.Jr.firstAfterOrEqual(r);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lO{constructor(e){this.ti=e,this.docs=(function(){return new Pe(L.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():Ie.newInvalidDocument(t))}getEntries(e,t){let r=wt();return t.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ie.newInvalidDocument(i))})),b.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=wt();const o=t.path,a=new L(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:u,value:{document:h}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||Sf(TT(h),r)<=0||(i.has(h.key)||$a(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,t,r,i){W(9500)}ni(e,t){return b.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new uO(this)}getSize(e){return b.resolve(this.size)}}class uO extends jw{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)})),b.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hO{constructor(e){this.persistence=e,this.ri=new Bn((t=>di(t)),Ba),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.ii=0,this.si=new Hf,this.targetCount=0,this.oi=_i._r()}forEachTarget(e,t){return this.ri.forEach(((r,i)=>t(i))),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),b.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new _i(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.lr(t),b.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ri.forEach(((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)})),b.waitFor(s).next((()=>i))}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((o=>{s.push(i.markPotentiallyOrphaned(e,o))})),b.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e,t){this._i={},this.overlays={},this.ai=new Et(0),this.ui=!1,this.ui=!0,this.ci=new aO,this.referenceDelegate=e(this),this.li=new hO(this),this.indexManager=new Y0,this.remoteDocumentCache=(function(i){return new lO(i)})((r=>this.referenceDelegate.hi(r))),this.serializer=new Vw(t),this.Pi=new sO(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new oO,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new cO(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const i=new dO(this.ai.next());return this.referenceDelegate.Ti(),r(i).next((s=>this.referenceDelegate.Ii(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Ei(e,t){return b.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class dO extends vT{constructor(e){super(),this.currentSequenceNumber=e}}class gu{constructor(e){this.persistence=e,this.Ri=new Hf,this.Ai=null}static Vi(e){return new gu(e)}get di(){if(this.Ai)return this.Ai;throw W(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),b.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((i=>this.di.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.di.add(s.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.di,(r=>{const i=L.fromPath(r);return this.mi(e,i).next((s=>{s||t.removeEntry(i,z.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return b.or([()=>b.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class _l{constructor(e,t){this.persistence=e,this.fi=new Bn((r=>ot(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=zw(this,t)}static Vi(e,t){return new _l(e,t)}Ti(){}Ii(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return b.forEach(this.fi,((r,i)=>this.wr(e,r,i).next((s=>s?b.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,(o=>this.wr(e,o,t).next((a=>{a||(r++,s.removeEntry(o,z.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),b.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),b.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gc(e.data.value)),t}wr(e,t,r){return b.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return b.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fO{constructor(e){this.serializer=e}k(e,t,r,i){const s=new nu("createOrUpgrade",t);r<1&&i>=1&&((function(l){l.createObjectStore(Ua)})(e),(function(l){l.createObjectStore(da,{keyPath:bD}),l.createObjectStore(zt,{keyPath:g_,autoIncrement:!0}).createIndex(ei,__,{unique:!0}),l.createObjectStore(hs)})(e),oy(e),(function(l){l.createObjectStore(Hr)})(e));let o=b.resolve();return r<3&&i>=3&&(r!==0&&((function(l){l.deleteObjectStore(fs),l.deleteObjectStore(ds),l.deleteObjectStore(si)})(e),oy(e)),o=o.next((()=>(function(l){const u=l.store(si),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return u.put(ul,h)})(s)))),r<4&&i>=4&&(r!==0&&(o=o.next((()=>(function(l,u){return u.store(zt).H().next((f=>{l.deleteObjectStore(zt),l.createObjectStore(zt,{keyPath:g_,autoIncrement:!0}).createIndex(ei,__,{unique:!0});const m=u.store(zt),_=f.map((v=>m.put(v)));return b.waitFor(_)}))})(e,s)))),o=o.next((()=>{(function(l){l.createObjectStore(ps,{keyPath:xD})})(e)}))),r<5&&i>=5&&(o=o.next((()=>this.gi(s)))),r<6&&i>=6&&(o=o.next((()=>((function(l){l.createObjectStore(fa)})(e),this.pi(s))))),r<7&&i>=7&&(o=o.next((()=>this.yi(s)))),r<8&&i>=8&&(o=o.next((()=>this.wi(e,s)))),r<9&&i>=9&&(o=o.next((()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&i>=10&&(o=o.next((()=>this.bi(s)))),r<11&&i>=11&&(o=o.next((()=>{(function(l){l.createObjectStore(ru,{keyPath:VD})})(e),(function(l){l.createObjectStore(iu,{keyPath:MD})})(e)}))),r<12&&i>=12&&(o=o.next((()=>{(function(l){const u=l.createObjectStore(su,{keyPath:WD});u.createIndex(ud,GD,{unique:!1}),u.createIndex(NT,zD,{unique:!1})})(e)}))),r<13&&i>=13&&(o=o.next((()=>(function(l){const u=l.createObjectStore(ll,{keyPath:SD});u.createIndex($c,CD),u.createIndex(ST,PD)})(e))).next((()=>this.Si(e,s))).next((()=>e.deleteObjectStore(Hr)))),r<14&&i>=14&&(o=o.next((()=>this.Di(e,s)))),r<15&&i>=15&&(o=o.next((()=>(function(l){l.createObjectStore(kf,{keyPath:LD,autoIncrement:!0}).createIndex(ld,FD,{unique:!1}),l.createObjectStore(jo,{keyPath:UD}).createIndex(PT,BD,{unique:!1}),l.createObjectStore(Ho,{keyPath:qD}).createIndex(kT,$D,{unique:!1})})(e)))),r<16&&i>=16&&(o=o.next((()=>{t.objectStore(jo).clear()})).next((()=>{t.objectStore(Ho).clear()}))),r<17&&i>=17&&(o=o.next((()=>{(function(l){l.createObjectStore(Nf,{keyPath:jD})})(e)}))),r<18&&i>=18&&YI()&&(o=o.next((()=>{t.objectStore(jo).clear()})).next((()=>{t.objectStore(Ho).clear()}))),o}pi(e){let t=0;return e.store(Hr).ee(((r,i)=>{t+=gl(i)})).next((()=>{const r={byteSize:t};return e.store(fa).put(cd,r)}))}gi(e){const t=e.store(da),r=e.store(zt);return t.H().next((i=>b.forEach(i,(s=>{const o=IDBKeyRange.bound([s.userId,ur],[s.userId,s.lastAcknowledgedBatchId]);return r.H(ei,o).next((a=>b.forEach(a,(l=>{G(l.userId===s.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const u=Yr(this.serializer,l);return Bw(e,s.userId,u).next((()=>{}))}))))}))))}yi(e){const t=e.store(fs),r=e.store(Hr);return e.store(si).get(ul).next((i=>{const s=[];return r.ee(((o,a)=>{const l=new ee(o),u=(function(f){return[0,ot(f)]})(l);s.push(t.get(u).next((h=>h?b.resolve():(f=>t.put({targetId:0,path:ot(f),sequenceNumber:i.highestListenSequenceNumber}))(l))))})).next((()=>b.waitFor(s)))}))}wi(e,t){e.createObjectStore(pa,{keyPath:OD});const r=t.store(pa),i=new jf,s=o=>{if(i.add(o)){const a=o.lastSegment(),l=o.popLast();return r.put({collectionId:a,parent:ot(l)})}};return t.store(Hr).ee({Y:!0},((o,a)=>{const l=new ee(o);return s(l.popLast())})).next((()=>t.store(hs).ee({Y:!0},(([o,a,l],u)=>{const h=cn(a);return s(h.popLast())}))))}bi(e){const t=e.store(ds);return t.ee(((r,i)=>{const s=Lo(i),o=Mw(this.serializer,s);return t.put(o)}))}Si(e,t){const r=t.store(Hr),i=[];return r.ee(((s,o)=>{const a=t.store(ll),l=(function(f){return f.document?new L(ee.fromString(f.document.name).popFirst(5)):f.noDocument?L.fromSegments(f.noDocument.path):f.unknownDocument?L.fromSegments(f.unknownDocument.path):W(36783)})(o).path.toArray(),u={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(u))})).next((()=>b.waitFor(i)))}Di(e,t){const r=t.store(zt),i=Hw(this.serializer),s=new Kf(gu.Vi,this.serializer.yt);return r.H().next((o=>{const a=new Map;return o.forEach((l=>{let u=a.get(l.userId)??Q();Yr(this.serializer,l).keys().forEach((h=>u=u.add(h))),a.set(l.userId,u)})),b.forEach(a,((l,u)=>{const h=new Ye(u),f=pu.wt(this.serializer,h),m=s.getIndexManager(h),_=mu.wt(h,this.serializer,m,s.referenceDelegate);return new Kw(i,_,f,m).recalculateAndSaveOverlaysForDocumentKeys(new hd(t,Et.ce),l).next()}))}))}}function oy(n){n.createObjectStore(fs,{keyPath:ND}).createIndex(Pf,DD,{unique:!0}),n.createObjectStore(ds,{keyPath:"targetId"}).createIndex(CT,kD,{unique:!0}),n.createObjectStore(si)}const Xn="IndexedDbPersistence",Ph=18e5,kh=5e3,Nh="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Qw="main";class Qf{constructor(e,t,r,i,s,o,a,l,u,h,f=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=s,this.window=o,this.document=a,this.Fi=u,this.Mi=h,this.xi=f,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=m=>Promise.resolve(),!Qf.v())throw new D(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new tO(this,i),this.Ki=t+Qw,this.serializer=new Vw(l),this.qi=new un(this.Ki,this.xi,new fO(this.serializer)),this.ci=new G0,this.li=new X0(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Hw(this.serializer),this.Pi=new W0,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,h===!1&&Ve(Xn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(S.FAILED_PRECONDITION,Nh);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new Et(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.qi&&this.qi.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.qi.q((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Cc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Hi(e))).next((t=>this.isPrimary&&!t?this.Ji(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(Nr(e))return O(Xn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return O(Xn,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Ao(e).get(Bi).next((t=>b.resolve(this.Xi(t))))}Yi(e){return Cc(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Ph)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=je(t,ps);return r.H().next((i=>{const s=this.ns(i,Ph),o=i.filter((a=>s.indexOf(a)===-1));return b.forEach(o,(a=>r.delete(a.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.Mi?b.resolve(!0):Ao(e).get(Bi).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,kh)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(S.FAILED_PRECONDITION,Nh);return!1}}return!(!this.networkEnabled||!this.inForeground)||Cc(e).H().next((r=>this.ns(r,kh).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&O(Xn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.qi.runTransaction("shutdown","readwrite",[Ua,ps],(e=>{const t=new hd(e,Et.ce);return this.Ji(t).next((()=>this.Yi(t)))})),this.qi.close(),this.ls()}ns(e,t){return e.filter((r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>Cc(e).H().next((t=>this.ns(t,Ph).map((r=>r.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return mu.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new J0(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return pu.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){O(Xn,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(l){return l===18?QD:l===17?VT:l===16?KD:l===15?Df:l===14?xT:l===13?OT:l===12?HD:l===11?DT:void W(60245)})(this.xi);let o;return this.qi.runTransaction(e,i,s,(a=>(o=new hd(a,this.ai?this.ai.next():Et.ce),t==="readwrite-primary"?this.ji(o).next((l=>!!l||this.Hi(o))).next((l=>{if(!l)throw Ve(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new D(S.FAILED_PRECONDITION,wT);return r(o)})).next((l=>this.Zi(o).next((()=>l)))):this.Ps(o).next((()=>r(o)))))).then((a=>(o.raiseOnCommittedEvent(),a)))}Ps(e){return Ao(e).get(Bi).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,kh)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(S.FAILED_PRECONDITION,Nh)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ao(e).put(Bi,t)}static v(){return un.v()}Ji(e){const t=Ao(e);return t.get(Bi).next((r=>this.Xi(r)?(O(Xn,"Releasing primary lease."),t.delete(Bi)):b.resolve()))}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ve(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;QI()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const r=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return O(Xn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Ve(Xn,"Failed to get zombied client id.",r),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){Ve("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ao(n){return je(n,Ua)}function Cc(n){return je(n,ps)}function Yf(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=i}static Es(e,t){let r=Q(),i=Q();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Jf(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pO{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return QI()?8:AT(We())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.gs(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.ps(e,t,i,r).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new pO;return this.ys(e,t,o).next((a=>{if(s.result=a,this.As)return this.ws(e,t,o,a.size)}))})).next((()=>s.result))}ws(e,t,r,i){return r.documentReadCount<this.Vs?(Hi()<=re.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Ki(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),b.resolve()):(Hi()<=re.DEBUG&&O("QueryEngine","Query:",Ki(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(Hi()<=re.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Ki(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):b.resolve())}gs(e,t){if(k_(t))return b.resolve(null);let r=at(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=fl(t,null,"F"),r=at(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const o=Q(...s);return this.fs.getDocuments(e,o).next((a=>this.indexManager.getMinOffset(e,r).next((l=>{const u=this.bs(t,a);return this.Ss(t,u,o,l.readTime)?this.gs(e,fl(t,null,"F")):this.Ds(e,u,t,l)}))))})))))}ps(e,t,r,i){return k_(t)||i.isEqual(z.min())?b.resolve(null):this.fs.getDocuments(e,r).next((s=>{const o=this.bs(t,s);return this.Ss(t,o,r,i)?b.resolve(null):(Hi()<=re.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ki(t)),this.Ds(e,o,t,ET(i,cs)).next((a=>a)))}))}bs(e,t){let r=new de(sw(e));return t.forEach(((i,s)=>{$a(e,s)&&(r=r.add(s))})),r}Ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,r){return Hi()<=re.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Ki(t)),this.fs.getDocumentsMatchingQuery(e,t,Vt.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf="LocalStore",mO=3e8;class gO{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new Pe(K),this.Fs=new Bn((s=>di(s)),Ba),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Kw(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function Jw(n,e,t,r){return new gO(n,e,t,r)}async function Xw(n,e){const t=F(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((s=>{const o=[],a=[];let l=Q();for(const u of i){o.push(u.batchId);for(const h of u.mutations)l=l.add(h.key)}for(const u of s){a.push(u.batchId);for(const h of u.mutations)l=l.add(h.key)}return t.localDocuments.getDocuments(r,l).next((u=>({Ns:u,removedBatchIds:o,addedBatchIds:a})))}))}))}function _O(n,e){const t=F(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return(function(a,l,u,h){const f=u.batch,m=f.keys();let _=b.resolve();return m.forEach((v=>{_=_.next((()=>h.getEntry(l,v))).next((P=>{const k=u.docVersions.get(v);G(k!==null,48541),P.version.compareTo(k)<0&&(f.applyToRemoteDocument(P,u),P.isValidDocument()&&(P.setReadTime(u.commitVersion),h.addEntry(P)))}))})),_.next((()=>a.mutationQueue.removeMutationBatch(l,f)))})(t,r,e,s).next((()=>s.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(a){let l=Q();for(let u=0;u<a.mutationResults.length;++u)a.mutationResults[u].transformResults.length>0&&(l=l.add(a.batch.mutations[u].key));return l})(e)))).next((()=>t.localDocuments.getDocuments(r,i)))}))}function Zw(n){const e=F(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function yO(n,e){const t=F(n),r=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const a=[];e.targetChanges.forEach(((h,f)=>{const m=i.get(f);if(!m)return;a.push(t.li.removeMatchingKeys(s,h.removedDocuments,f).next((()=>t.li.addMatchingKeys(s,h.addedDocuments,f))));let _=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(f)!==null?_=_.withResumeToken(ke.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):h.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(h.resumeToken,r)),i=i.insert(f,_),(function(P,k,U){return P.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=mO?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0})(m,_,h)&&a.push(t.li.updateTargetData(s,_))}));let l=wt(),u=Q();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))})),a.push(ev(s,o,e.documentUpdates).next((h=>{l=h.Bs,u=h.Ls}))),!r.isEqual(z.min())){const h=t.li.getLastRemoteSnapshotVersion(s).next((f=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,r)));a.push(h)}return b.waitFor(a).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,l,u))).next((()=>l))})).then((s=>(t.vs=i,s)))}function ev(n,e,t){let r=Q(),i=Q();return t.forEach((s=>r=r.add(s))),e.getEntries(n,r).next((s=>{let o=wt();return t.forEach(((a,l)=>{const u=s.get(a);l.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(a)),l.isNoDocument()&&l.version.isEqual(z.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):O(Xf,"Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",l.version)})),{Bs:o,Ls:i}}))}function IO(n,e){const t=F(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=ur),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function Ts(n,e){const t=F(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return t.li.getTargetData(r,e).next((s=>s?(i=s,b.resolve(i)):t.li.allocateTargetId(r).next((o=>(i=new bn(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function ws(n,e,t){const r=F(n),i=r.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,(o=>r.persistence.referenceDelegate.removeTarget(o,i)))}catch(o){if(!Nr(o))throw o;O(Xf,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function yl(n,e,t){const r=F(n);let i=z.min(),s=Q();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(l,u,h){const f=F(l),m=f.Fs.get(h);return m!==void 0?b.resolve(f.vs.get(m)):f.li.getTargetData(u,h)})(r,o,at(e)).next((a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,a.targetId).next((l=>{s=l}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,t?i:z.min(),t?s:Q()))).next((a=>(rv(r,iw(e),a),{documents:a,ks:s})))))}function tv(n,e){const t=F(n),r=F(t.li),i=t.vs.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",(s=>r.At(s,e).next((o=>o?o.target:null))))}function nv(n,e){const t=F(n),r=t.Ms.get(e)||z.min();return t.persistence.runTransaction("Get new document changes","readonly",(i=>t.xs.getAllFromCollectionGroup(i,e,ET(r,cs),Number.MAX_SAFE_INTEGER))).then((i=>(rv(t,e,i),i)))}function rv(n,e,t){let r=n.Ms.get(e)||z.min();t.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),n.Ms.set(e,r)}async function EO(n,e,t,r){const i=F(n);let s=Q(),o=wt();for(const u of t){const h=e.Ks(u.metadata.name);u.document&&(s=s.add(h));const f=e.qs(u);f.setReadTime(e.Us(u.metadata.readTime)),o=o.insert(h,f)}const a=i.xs.newChangeBuffer({trackRemovals:!0}),l=await Ts(i,(function(h){return at(qs(ee.fromString(`__bundle__/docs/${h}`)))})(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",(u=>ev(u,a,o).next((h=>(a.apply(u),h))).next((h=>i.li.removeMatchingKeysForTargetId(u,l.targetId).next((()=>i.li.addMatchingKeys(u,s,l.targetId))).next((()=>i.localDocuments.getLocalViewOfDocuments(u,h.Bs,h.Ls))).next((()=>h.Bs))))))}async function TO(n,e,t=Q()){const r=await Ts(n,at(fu(e.bundledQuery))),i=F(n);return i.persistence.runTransaction("Save named query","readwrite",(s=>{const o=Me(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Pi.saveNamedQuery(s,e);const a=r.withResumeToken(ke.EMPTY_BYTE_STRING,o);return i.vs=i.vs.insert(a.targetId,a),i.li.updateTargetData(s,a).next((()=>i.li.removeMatchingKeysForTargetId(s,r.targetId))).next((()=>i.li.addMatchingKeys(s,t,r.targetId))).next((()=>i.Pi.saveNamedQuery(s,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iv="firestore_clients";function ay(n,e){return`${iv}_${n}_${e}`}const sv="firestore_mutations";function cy(n,e,t){let r=`${sv}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const ov="firestore_targets";function Dh(n,e){return`${ov}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on="SharedClientState";class Il{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static $s(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new D(i.error.code,i.error.message))),o?new Il(e,t,i.state,s):(Ve(on,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Xo{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new D(r.error.code,r.error.message))),s?new Xo(e,r.state,i):(Ve(on,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class El{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Lf();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=bT(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new El(e,s):(Ve(on,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Zf{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Zf(t.clientId,t.onlineState):(Ve(on,`Failed to parse online state: ${e}`),null)}}class Rd{constructor(){this.activeTargetIds=Lf()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Oh{constructor(e,t,r,i,s){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Hs.bind(this),this.Js=new Pe(K),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Xs=ay(this.persistenceKey,this.zs),this.Ys=(function(l){return`firestore_sequence_number_${l}`})(this.persistenceKey),this.Js=this.Js.insert(this.zs,new Rd),this.eo=new RegExp(`^${iv}_${o}_([^_]*)$`),this.no=new RegExp(`^${sv}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${ov}_${o}_(\\d+)$`),this.io=(function(l){return`firestore_online_state_${l}`})(this.persistenceKey),this.so=(function(l){return`firestore_bundle_loaded_v2_${l}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const i=this.getItem(ay(this.persistenceKey,r));if(i){const s=El.$s(r,i);s&&(this.Js=this.Js.insert(s.clientId,s))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Hs(r);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Js)}isActiveQueryTarget(e){let t=!1;return this.Js.forEach(((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Dh(this.persistenceKey,e));if(i){const s=Xo.$s(e,i);s&&(r=s.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Dh(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach((i=>{this.lo(i)})),this.currentUser=e,r.forEach((i=>{this.addPendingMutation(i)}))}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Io(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return O(on,"READ",e,t),t}setItem(e,t){O(on,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){O(on,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(O(on,"EVENT",t.key,t.newValue),t.key===this.Xs)return void Ve("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Eo(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=(function(s){let o=Et.ce;if(s!=null)try{const a=JSON.parse(s);G(typeof a=="number",30636,{yo:s}),o=a}catch(a){Ve(on,"Failed to read sequence number from WebStorage",a)}return o})(t.newValue);r!==Et.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map((i=>this.syncEngine.bo(i))))}}}else this.Zs.push(t)}))}}get ho(){return this.Js.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const i=new Il(this.currentUser,e,t,r),s=cy(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Ws())}lo(e){const t=cy(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const i=Dh(this.persistenceKey,e),s=new Xo(e,t,r);this.setItem(i,s.Ws())}Io(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Eo(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Eo(e);return El.$s(r,t)}Vo(e,t){const r=this.no.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return Il.$s(new Ye(s),i,t)}fo(e,t){const r=this.ro.exec(e),i=Number(r[1]);return Xo.$s(i,t)}_o(e){return Zf.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.So(e.batchId,e.state,e.error);O(on,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Js.insert(e,t):this.Js.remove(e),i=this.uo(this.Js),s=this.uo(r),o=[],a=[];return s.forEach((l=>{i.has(l)||o.push(l)})),i.forEach((l=>{s.has(l)||a.push(l)})),this.syncEngine.Co(o,a).then((()=>{this.Js=r}))}ao(e){this.Js.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Lf();return e.forEach(((r,i)=>{t=t.unionWith(i.activeTargetIds)})),t}}class av{constructor(){this.vo=new Rd,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Rd,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wO{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ly="ConnectivityMonitor";class uy{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){O(ly,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){O(ly,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pc=null;function Sd(){return Pc===null?Pc=(function(){return 268435456+Math.round(2147483648*Math.random())})():Pc++,"0x"+Pc.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="RestConnection",vO={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class AO{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===ga?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const o=Sd(),a=this.Qo(e,t.toUriEncodedString());O(xh,`Sending RPC '${e}' ${o}:`,a,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(l,i,s);const{host:u}=new URL(a),h=en(u);return this.zo(e,a,l,r,h).then((f=>(O(xh,`Received RPC '${e}' ${o}: `,f),f)),(f=>{throw St(xh,`RPC '${e}' ${o} failed with error: `,f,"url: ",a,"request:",r),f}))}jo(e,t,r,i,s,o){return this.Wo(e,t,r,i,s)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Bs})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((i,s)=>e[s]=i)),r&&r.headers.forEach(((i,s)=>e[s]=i))}Qo(e,t){const r=vO[e];let i=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bO{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it="WebChannelConnection",bo=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(i){setTimeout((()=>{throw i}),0)}}))};class ts extends AO{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!ts.c_){const e=hT();bo(e,uT.STAT_EVENT,(t=>{t.stat===rd.PROXY?O(it,"STAT_EVENT: detected buffering proxy"):t.stat===rd.NOPROXY&&O(it,"STAT_EVENT: detected no buffering proxy")})),ts.c_=!0}}zo(e,t,r,i,s){const o=Sd();return new Promise(((a,l)=>{const u=new cT;u.setWithCredentials(!0),u.listenOnce(lT.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case Bc.NO_ERROR:const f=u.getResponseJson();O(it,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),a(f);break;case Bc.TIMEOUT:O(it,`RPC '${e}' ${o} timed out`),l(new D(S.DEADLINE_EXCEEDED,"Request time out"));break;case Bc.HTTP_ERROR:const m=u.getStatus();if(O(it,`RPC '${e}' ${o} failed with status:`,m,"response text:",u.getResponseText()),m>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const v=_==null?void 0:_.error;if(v&&v.status&&v.message){const P=(function(U){const $=U.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf($)>=0?$:S.UNKNOWN})(v.status);l(new D(P,v.message))}else l(new D(S.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new D(S.UNAVAILABLE,"Connection failed."));break;default:W(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{O(it,`RPC '${e}' ${o} completed.`)}}));const h=JSON.stringify(i);O(it,`RPC '${e}' ${o} sending request:`,i),u.send(t,"POST",h,r,15)}))}T_(e,t,r){const i=Sd(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(a.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Go(a.initMessageHeaders,t,r),a.encodeInitMessageHeaders=!0;const u=s.join("");O(it,`Creating RPC '${e}' stream ${i}: ${u}`,a);const h=o.createWebChannel(u,a);this.I_(h);let f=!1,m=!1;const _=new bO({Ho:v=>{m?O(it,`Not sending because RPC '${e}' stream ${i} is closed:`,v):(f||(O(it,`Opening RPC '${e}' stream ${i} transport.`),h.open(),f=!0),O(it,`RPC '${e}' stream ${i} sending:`,v),h.send(v))},Jo:()=>h.close()});return bo(h,xo.EventType.OPEN,(()=>{m||(O(it,`RPC '${e}' stream ${i} transport opened.`),_.i_())})),bo(h,xo.EventType.CLOSE,(()=>{m||(m=!0,O(it,`RPC '${e}' stream ${i} transport closed`),_.o_(),this.E_(h))})),bo(h,xo.EventType.ERROR,(v=>{m||(m=!0,St(it,`RPC '${e}' stream ${i} transport errored. Name:`,v.name,"Message:",v.message),_.o_(new D(S.UNAVAILABLE,"The operation could not be completed")))})),bo(h,xo.EventType.MESSAGE,(v=>{var P;if(!m){const k=v.data[0];G(!!k,16349);const U=k,$=(U==null?void 0:U.error)||((P=U[0])==null?void 0:P.error);if($){O(it,`RPC '${e}' stream ${i} received error:`,$);const q=$.status;let H=(function(T){const y=Le[T];if(y!==void 0)return Iw(y)})(q),Z=$.message;q==="NOT_FOUND"&&Z.includes("database")&&Z.includes("does not exist")&&Z.includes(this.databaseId.database)&&St(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),H===void 0&&(H=S.INTERNAL,Z="Unknown error status: "+q+" with message "+$.message),m=!0,_.o_(new D(H,Z)),h.close()}else O(it,`RPC '${e}' stream ${i} received:`,k),_.__(k)}})),ts.u_(),setTimeout((()=>{_.s_()}),0),_}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return dT()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RO(n){return new ts(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cv(){return typeof window<"u"?window:null}function Qc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(n){return new D0(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ts.c_=!1;class ep{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy="PersistentStream";class lv{constructor(e,t,r,i,s,o,a,l){this.Ci=e,this.b_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ep(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(Ve(t.toString()),Ve("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.D_===t&&this.G_(r,i)}),(r=>{e((()=>{const i=new D(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((i=>{r((()=>this.z_(i)))})),this.stream.onMessage((i=>{r((()=>++this.F_==1?this.H_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return O(hy,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(O(hy,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class SO extends lv{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=V0(this.serializer,e),r=(function(s){if(!("targetChange"in s))return z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?Me(o.readTime):z.min()})(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=Td(this.serializer),t.addTarget=(function(s,o){let a;const l=o.target;if(a=hl(l)?{documents:Cw(s,l)}:{query:du(s,l).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=vw(s,o.resumeToken);const u=Id(s,o.expectedCount);u!==null&&(a.expectedCount=u)}else if(o.snapshotVersion.compareTo(z.min())>0){a.readTime=Es(s,o.snapshotVersion.toTimestamp());const u=Id(s,o.expectedCount);u!==null&&(a.expectedCount=u)}return a})(this.serializer,e);const r=L0(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=Td(this.serializer),t.removeTarget=e,this.K_(t)}}class CO extends lv{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return G(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,G(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){G(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=M0(e.writeResults,e.commitTime),r=Me(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Td(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Ta(this.serializer,r)))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PO{}class kO extends PO{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new D(S.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Wo(e,Ed(t,r),i,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new D(S.UNKNOWN,s.toString())}))}jo(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.jo(e,Ed(t,r),i,o,a,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(S.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function NO(n,e,t,r){return new kO(n,e,t,r)}class DO{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ve(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yi="RemoteStore";class OO{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo((o=>{r.enqueueAndForget((async()=>{Or(this)&&(O(yi,"Restarting streams for network reachability change."),await(async function(l){const u=F(l);u.Ea.add(4),await Gs(u),u.Va.set("Unknown"),u.Ea.delete(4),await ja(u)})(this))}))})),this.Va=new DO(r,i)}}async function ja(n){if(Or(n))for(const e of n.Ra)await e(!0)}async function Gs(n){for(const e of n.Ra)await e(!1)}function _u(n,e){const t=F(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),rp(t)?np(t):js(t).O_()&&tp(t,e))}function vs(n,e){const t=F(n),r=js(t);t.Ia.delete(e),r.O_()&&uv(t,e),t.Ia.size===0&&(r.O_()?r.L_():Or(t)&&t.Va.set("Unknown"))}function tp(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}js(n).Z_(e)}function uv(n,e){n.da.$e(e),js(n).X_(e)}function np(n){n.da=new C0({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),js(n).start(),n.Va.ua()}function rp(n){return Or(n)&&!js(n).x_()&&n.Ia.size>0}function Or(n){return F(n).Ea.size===0}function hv(n){n.da=void 0}async function xO(n){n.Va.set("Online")}async function VO(n){n.Ia.forEach(((e,t)=>{tp(n,e)}))}async function MO(n,e){hv(n),rp(n)?(n.Va.ha(e),np(n)):n.Va.set("Unknown")}async function LO(n,e,t){if(n.Va.set("Online"),e instanceof ww&&e.state===2&&e.cause)try{await(async function(i,s){const o=s.cause;for(const a of s.targetIds)i.Ia.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.Ia.delete(a),i.da.removeTarget(a))})(n,e)}catch(r){O(yi,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Tl(n,r)}else if(e instanceof Hc?n.da.Xe(e):e instanceof Tw?n.da.st(e):n.da.tt(e),!t.isEqual(z.min()))try{const r=await Zw(n.localStore);t.compareTo(r)>=0&&await(function(s,o){const a=s.da.Tt(o);return a.targetChanges.forEach(((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const h=s.Ia.get(u);h&&s.Ia.set(u,h.withResumeToken(l.resumeToken,o))}})),a.targetMismatches.forEach(((l,u)=>{const h=s.Ia.get(l);if(!h)return;s.Ia.set(l,h.withResumeToken(ke.EMPTY_BYTE_STRING,h.snapshotVersion)),uv(s,l);const f=new bn(h.target,l,u,h.sequenceNumber);tp(s,f)})),s.remoteSyncer.applyRemoteEvent(a)})(n,t)}catch(r){O(yi,"Failed to raise snapshot:",r),await Tl(n,r)}}async function Tl(n,e,t){if(!Nr(e))throw e;n.Ea.add(1),await Gs(n),n.Va.set("Offline"),t||(t=()=>Zw(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{O(yi,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ja(n)}))}function dv(n,e){return e().catch((t=>Tl(n,t,e)))}async function zs(n){const e=F(n),t=Ir(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ur;for(;FO(e);)try{const i=await IO(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,UO(e,i)}catch(i){await Tl(e,i)}fv(e)&&pv(e)}function FO(n){return Or(n)&&n.Ta.length<10}function UO(n,e){n.Ta.push(e);const t=Ir(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function fv(n){return Or(n)&&!Ir(n).x_()&&n.Ta.length>0}function pv(n){Ir(n).start()}async function BO(n){Ir(n).ra()}async function qO(n){const e=Ir(n);for(const t of n.Ta)e.ea(t.mutations)}async function $O(n,e,t){const r=n.Ta.shift(),i=qf.from(r,e,t);await dv(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await zs(n)}async function WO(n,e){e&&Ir(n).Y_&&await(async function(r,i){if((function(o){return yw(o)&&o!==S.ABORTED})(i.code)){const s=r.Ta.shift();Ir(r).B_(),await dv(r,(()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i))),await zs(r)}})(n,e),fv(n)&&pv(n)}async function dy(n,e){const t=F(n);t.asyncQueue.verifyOperationInProgress(),O(yi,"RemoteStore received new credentials");const r=Or(t);t.Ea.add(3),await Gs(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ja(t)}async function Cd(n,e){const t=F(n);e?(t.Ea.delete(2),await ja(t)):e||(t.Ea.add(2),await Gs(t),t.Va.set("Unknown"))}function js(n){return n.ma||(n.ma=(function(t,r,i){const s=F(t);return s.sa(),new SO(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:xO.bind(null,n),Yo:VO.bind(null,n),t_:MO.bind(null,n),J_:LO.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),rp(n)?np(n):n.Va.set("Unknown")):(await n.ma.stop(),hv(n))}))),n.ma}function Ir(n){return n.fa||(n.fa=(function(t,r,i){const s=F(t);return s.sa(),new CO(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:BO.bind(null,n),t_:WO.bind(null,n),ta:qO.bind(null,n),na:$O.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await zs(n)):(await n.fa.stop(),n.Ta.length>0&&(O(yi,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new tt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new ip(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Hs(n,e){if(Ve("AsyncQueue",`${e}: ${n}`),Nr(n))return new D(S.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{static emptySet(e){return new oi(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=Vo(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof oi)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new oi;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(){this.ga=new Pe(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):W(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Ii{constructor(e,t,r,i,s,o,a,l,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach((a=>{o.push({type:0,doc:a})})),new Ii(e,t,oi.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&qa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GO{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class zO{constructor(){this.queries=py(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=F(t),s=i.queries;i.queries=py(),s.forEach(((o,a)=>{for(const l of a.ba)l.onError(r)}))})(this,new D(S.ABORTED,"Firestore shutting down"))}}function py(){return new Bn((n=>rw(n)),qa)}async function sp(n,e){const t=F(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.Da()&&(r=2):(s=new GO,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const a=Hs(o,`Initialization of query '${Ki(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&ap(t)}async function op(n,e){const t=F(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ba.indexOf(e);o>=0&&(s.ba.splice(o,1),s.ba.length===0?i=e.Da()?0:1:!s.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function jO(n,e){const t=F(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.ba)a.Fa(i)&&(r=!0);o.wa=i}}r&&ap(t)}function HO(n,e,t){const r=F(n),i=r.queries.get(e);if(i)for(const s of i.ba)s.onError(t);r.queries.delete(e)}function ap(n){n.Ca.forEach((e=>{e.next()}))}var Pd,my;(my=Pd||(Pd={})).Ma="default",my.Cache="cache";class cp{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Ii(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Ii.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Pd.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(e,t){this.qa=e,this.byteLength=t}Ua(){return"metadata"in this.qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e){this.serializer=e}Ks(e){return hn(this.serializer,e)}qs(e){return e.metadata.exists?hu(this.serializer,e.document,!1):Ie.newNoDocument(this.Ks(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return Me(e)}}class lp{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=gv(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.qa.namedQuery)this.Wa.push(e.qa.namedQuery);else if(e.qa.documentMetadata){this.Qa.push({metadata:e.qa.documentMetadata}),e.qa.documentMetadata.exists||++t;const r=ee.fromString(e.qa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.qa.document&&(this.Qa[this.Qa.length-1].document=e.qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,r=new gy(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Ks(i.metadata.name);for(const o of i.metadata.queries){const a=(t.get(o)||Q()).add(s);t.set(o,a)}}return t}async ja(e){const t=await EO(e,new gy(this.serializer),this.Qa,this.$a.id),r=this.za(this.documents);for(const i of this.Wa)await TO(e,i,r.get(i.name));return this.progress.taskState="Success",{progress:this.progress,Ha:this.collectionGroups,Ja:t}}}function gv(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _v{constructor(e){this.key=e}}class yv{constructor(e){this.key=e}}class Iv{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Q(),this.mutatedKeys=Q(),this.eu=sw(e),this.tu=new oi(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new fy,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((h,f)=>{const m=i.get(h),_=$a(this.query,f)?f:null,v=!!m&&this.mutatedKeys.has(m.key),P=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let k=!1;m&&_?m.data.isEqual(_.data)?v!==P&&(r.track({type:3,doc:_}),k=!0):this.su(m,_)||(r.track({type:2,doc:_}),k=!0,(l&&this.eu(_,l)>0||u&&this.eu(_,u)<0)&&(a=!0)):!m&&_?(r.track({type:0,doc:_}),k=!0):m&&!_&&(r.track({type:1,doc:m}),k=!0,(l||u)&&(a=!0)),k&&(_?(o=o.add(_),s=P?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{tu:o,iu:r,Ss:a,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((h,f)=>(function(_,v){const P=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W(20277,{Vt:k})}};return P(_)-P(v)})(h.type,f.type)||this.eu(h.doc,f.doc))),this.ou(r),i=i??!1;const a=t&&!i?this._u():[],l=this.Ya.size===0&&this.current&&!i?1:0,u=l!==this.Xa;return this.Xa=l,o.length!==0||u?{snapshot:new Ii(this.query,e.tu,s,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new fy,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Q(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new yv(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new _v(r))})),t}cu(e){this.Za=e.ks,this.Ya=Q();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Ii.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const xr="SyncEngine";class KO{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class QO{constructor(e){this.key=e,this.hu=!1}}class YO{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Bn((a=>rw(a)),qa),this.Iu=new Map,this.Eu=new Set,this.Ru=new Pe(L.comparator),this.Au=new Map,this.Vu=new Hf,this.du={},this.mu=new Map,this.fu=_i.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function JO(n,e,t=!0){const r=yu(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await Ev(r,e,t,!0),i}async function XO(n,e){const t=yu(n);await Ev(t,e,!0,!1)}async function Ev(n,e,t,r){const i=await Ts(n.localStore,at(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let a;return r&&(a=await up(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&_u(n.remoteStore,i),a}async function up(n,e,t,r,i){n.pu=(f,m,_)=>(async function(P,k,U,$){let q=k.view.ru(U);q.Ss&&(q=await yl(P.localStore,k.query,!1).then((({documents:T})=>k.view.ru(T,q))));const H=$&&$.targetChanges.get(k.targetId),Z=$&&$.targetMismatches.get(k.targetId)!=null,ie=k.view.applyChanges(q,P.isPrimaryClient,H,Z);return kd(P,k.targetId,ie.au),ie.snapshot})(n,f,m,_);const s=await yl(n.localStore,e,!0),o=new Iv(e,s.ks),a=o.ru(s.documents),l=za.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),u=o.applyChanges(a,n.isPrimaryClient,l);kd(n,t,u.au);const h=new KO(e,t,o);return n.Tu.set(e,h),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function ZO(n,e,t){const r=F(n),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter((o=>!qa(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ws(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),t&&vs(r.remoteStore,i.targetId),As(r,i.targetId)})).catch(kr)):(As(r,i.targetId),await ws(r.localStore,i.targetId,!0))}async function ex(n,e){const t=F(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),vs(t.remoteStore,r.targetId))}async function tx(n,e,t){const r=pp(n);try{const i=await(function(o,a){const l=F(o),u=ce.now(),h=a.reduce(((_,v)=>_.add(v.key)),Q());let f,m;return l.persistence.runTransaction("Locally write mutations","readwrite",(_=>{let v=wt(),P=Q();return l.xs.getEntries(_,h).next((k=>{v=k,v.forEach(((U,$)=>{$.isValidDocument()||(P=P.add(U))}))})).next((()=>l.localDocuments.getOverlayedDocuments(_,v))).next((k=>{f=k;const U=[];for(const $ of a){const q=A0($,f.get($.key).overlayedDocument);q!=null&&U.push(new qn($.key,q,jT(q.value.mapValue),be.exists(!0)))}return l.mutationQueue.addMutationBatch(_,u,U,a)})).next((k=>{m=k;const U=k.applyToLocalDocumentSet(f,P);return l.documentOverlayCache.saveOverlays(_,k.batchId,U)}))})).then((()=>({batchId:m.batchId,changes:aw(f)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(o,a,l){let u=o.du[o.currentUser.toKey()];u||(u=new Pe(K)),u=u.insert(a,l),o.du[o.currentUser.toKey()]=u})(r,i.batchId,t),await $n(r,i.changes),await zs(r.remoteStore)}catch(i){const s=Hs(i,"Failed to persist write");t.reject(s)}}async function Tv(n,e){const t=F(n);try{const r=await yO(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const o=t.Au.get(s);o&&(G(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?G(o.hu,14607):i.removedDocuments.size>0&&(G(o.hu,42227),o.hu=!1))})),await $n(t,r,e)}catch(r){await kr(r)}}function _y(n,e,t){const r=F(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach(((s,o)=>{const a=o.view.va(e);a.snapshot&&i.push(a.snapshot)})),(function(o,a){const l=F(o);l.onlineState=a;let u=!1;l.queries.forEach(((h,f)=>{for(const m of f.ba)m.va(a)&&(u=!0)})),u&&ap(l)})(r.eventManager,e),i.length&&r.Pu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function nx(n,e,t){const r=F(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let o=new Pe(L.comparator);o=o.insert(s,Ie.newNoDocument(s,z.min()));const a=Q().add(s),l=new Ga(z.min(),new Map,new Pe(K),o,a);await Tv(r,l),r.Ru=r.Ru.remove(s),r.Au.delete(e),fp(r)}else await ws(r.localStore,e,!1).then((()=>As(r,e,t))).catch(kr)}async function rx(n,e){const t=F(n),r=e.batch.batchId;try{const i=await _O(t.localStore,e);dp(t,r,null),hp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await $n(t,i)}catch(i){await kr(i)}}async function ix(n,e,t){const r=F(n);try{const i=await(function(o,a){const l=F(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let h;return l.mutationQueue.lookupMutationBatch(u,a).next((f=>(G(f!==null,37113),h=f.keys(),l.mutationQueue.removeMutationBatch(u,f)))).next((()=>l.mutationQueue.performConsistencyCheck(u))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(u,h,a))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h))).next((()=>l.localDocuments.getDocuments(u,h)))}))})(r.localStore,e);dp(r,e,t),hp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await $n(r,i)}catch(i){await kr(i)}}async function sx(n,e){const t=F(n);Or(t.remoteStore)||O(xr,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const a=F(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(l=>a.mutationQueue.getHighestUnacknowledgedBatchId(l)))})(t.localStore);if(r===ur)return void e.resolve();const i=t.mu.get(r)||[];i.push(e),t.mu.set(r,i)}catch(r){const i=Hs(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function hp(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function dp(n,e,t){const r=F(n);let i=r.du[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function As(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||wv(n,r)}))}function wv(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(vs(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),fp(n))}function kd(n,e,t){for(const r of t)r instanceof _v?(n.Vu.addReference(r.key,e),ox(n,r)):r instanceof yv?(O(xr,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||wv(n,r.key)):W(19791,{wu:r})}function ox(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||(O(xr,"New document in limbo: "+t),n.Eu.add(r),fp(n))}function fp(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new L(ee.fromString(e)),r=n.fu.next();n.Au.set(r,new QO(t)),n.Ru=n.Ru.insert(t,r),_u(n.remoteStore,new bn(at(qs(t.path)),r,"TargetPurposeLimboResolution",Et.ce))}}async function $n(n,e,t){const r=F(n),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((a,l)=>{o.push(r.pu(l,e,t).then((u=>{var h;if((u||t)&&r.isPrimaryClient){const f=u?!u.fromCache:(h=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:h.current;r.sharedClientState.updateQueryState(l.targetId,f?"current":"not-current")}if(u){i.push(u);const f=Jf.Es(l.targetId,u);s.push(f)}})))})),await Promise.all(o),r.Pu.J_(i),await(async function(l,u){const h=F(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>b.forEach(u,(m=>b.forEach(m.Ts,(_=>h.persistence.referenceDelegate.addReference(f,m.targetId,_))).next((()=>b.forEach(m.Is,(_=>h.persistence.referenceDelegate.removeReference(f,m.targetId,_)))))))))}catch(f){if(!Nr(f))throw f;O(Xf,"Failed to update sequence numbers: "+f)}for(const f of u){const m=f.targetId;if(!f.fromCache){const _=h.vs.get(m),v=_.snapshotVersion,P=_.withLastLimboFreeSnapshotVersion(v);h.vs=h.vs.insert(m,P)}}})(r.localStore,s))}async function ax(n,e){const t=F(n);if(!t.currentUser.isEqual(e)){O(xr,"User change. New user:",e.toKey());const r=await Xw(t.localStore,e);t.currentUser=e,(function(s,o){s.mu.forEach((a=>{a.forEach((l=>{l.reject(new D(S.CANCELLED,o))}))})),s.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await $n(t,r.Ns)}}function cx(n,e){const t=F(n),r=t.Au.get(e);if(r&&r.hu)return Q().add(r.key);{let i=Q();const s=t.Iu.get(e);if(!s)return i;for(const o of s){const a=t.Tu.get(o);i=i.unionWith(a.view.nu)}return i}}async function lx(n,e){const t=F(n),r=await yl(t.localStore,e.query,!0),i=e.view.cu(r);return t.isPrimaryClient&&kd(t,e.targetId,i.au),i}async function ux(n,e){const t=F(n);return nv(t.localStore,e).then((r=>$n(t,r)))}async function hx(n,e,t,r){const i=F(n),s=await(function(a,l){const u=F(a),h=F(u.mutationQueue);return u.persistence.runTransaction("Lookup mutation documents","readonly",(f=>h.Xn(f,l).next((m=>m?u.localDocuments.getDocuments(f,m):b.resolve(null)))))})(i.localStore,e);s!==null?(t==="pending"?await zs(i.remoteStore):t==="acknowledged"||t==="rejected"?(dp(i,e,r||null),hp(i,e),(function(a,l){F(F(a).mutationQueue).nr(l)})(i.localStore,e)):W(6720,"Unknown batchState",{bu:t}),await $n(i,s)):O(xr,"Cannot apply mutation batch with id: "+e)}async function dx(n,e){const t=F(n);if(yu(t),pp(t),e===!0&&t.gu!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await yy(t,r.toArray());t.gu=!0,await Cd(t.remoteStore,!0);for(const s of i)_u(t.remoteStore,s)}else if(e===!1&&t.gu!==!1){const r=[];let i=Promise.resolve();t.Iu.forEach(((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then((()=>(As(t,o),ws(t.localStore,o,!0)))),vs(t.remoteStore,o)})),await i,await yy(t,r),(function(o){const a=F(o);a.Au.forEach(((l,u)=>{vs(a.remoteStore,u)})),a.Vu.zr(),a.Au=new Map,a.Ru=new Pe(L.comparator)})(t),t.gu=!1,await Cd(t.remoteStore,!1)}}async function yy(n,e,t){const r=F(n),i=[],s=[];for(const o of e){let a;const l=r.Iu.get(o);if(l&&l.length!==0){a=await Ts(r.localStore,at(l[0]));for(const u of l){const h=r.Tu.get(u),f=await lx(r,h);f.snapshot&&s.push(f.snapshot)}}else{const u=await tv(r.localStore,o);a=await Ts(r.localStore,u),await up(r,vv(u),o,!1,a.resumeToken)}i.push(a)}return r.Pu.J_(s),i}function vv(n){return ew(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function fx(n){return(function(t){return F(F(t).persistence).hs()})(F(n).localStore)}async function px(n,e,t,r){const i=F(n);if(i.gu)return void O(xr,"Ignoring unexpected query state notification.");const s=i.Iu.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await nv(i.localStore,iw(s[0])),a=Ga.createSynthesizedRemoteEventForCurrentChange(e,t==="current",ke.EMPTY_BYTE_STRING);await $n(i,o,a);break}case"rejected":await ws(i.localStore,e,!0),As(i,e,r);break;default:W(64155,t)}}async function mx(n,e,t){const r=yu(n);if(r.gu){for(const i of e){if(r.Iu.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){O(xr,"Adding an already active target "+i);continue}const s=await tv(r.localStore,i),o=await Ts(r.localStore,s);await up(r,vv(s),o.targetId,!1,o.resumeToken),_u(r.remoteStore,o)}for(const i of t)r.Iu.has(i)&&await ws(r.localStore,i,!1).then((()=>{vs(r.remoteStore,i),As(r,i)})).catch(kr)}}function yu(n){const e=F(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Tv.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=cx.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=nx.bind(null,e),e.Pu.J_=jO.bind(null,e.eventManager),e.Pu.yu=HO.bind(null,e.eventManager),e}function pp(n){const e=F(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=rx.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ix.bind(null,e),e}function gx(n,e,t){const r=F(n);(async function(s,o,a){try{const l=await o.getMetadata();if(await(function(_,v){const P=F(_),k=Me(v.createTime);return P.persistence.runTransaction("hasNewerBundle","readonly",(U=>P.Pi.getBundleMetadata(U,v.id))).then((U=>!!U&&U.createTime.compareTo(k)>=0))})(s.localStore,l))return await o.close(),a._completeWith((function(_){return{taskState:"Success",documentsLoaded:_.totalDocuments,bytesLoaded:_.totalBytes,totalDocuments:_.totalDocuments,totalBytes:_.totalBytes}})(l)),Promise.resolve(new Set);a._updateProgress(gv(l));const u=new lp(l,o.serializer);let h=await o.Su();for(;h;){const m=await u.Ga(h);m&&a._updateProgress(m),h=await o.Su()}const f=await u.ja(s.localStore);return await $n(s,f.Ja,void 0),await(function(_,v){const P=F(_);return P.persistence.runTransaction("Save bundle","readwrite",(k=>P.Pi.saveBundleMetadata(k,v)))})(s.localStore,l),a._completeWith(f.progress),Promise.resolve(f.Ha)}catch(l){return St(xr,`Loading bundle failed with ${l}`),a._failWith(l),Promise.resolve(new Set)}})(r,e,t).then((i=>{r.sharedClientState.notifyBundleLoaded(i)}))}class bs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Pi(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Jw(this.persistence,new Yw,e.initialUser,this.serializer)}Cu(e){return new Kf(gu.Vi,this.serializer)}Du(e){return new av}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}bs.provider={build:()=>new bs};class mp extends bs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){G(this.persistence.referenceDelegate instanceof _l,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Gw(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?st.withCacheSize(this.cacheSizeBytes):st.DEFAULT;return new Kf((r=>_l.Vi(r,t)),this.serializer)}}class gp extends bs{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await pp(this.xu.syncEngine),await zs(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return Jw(this.persistence,new Yw,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Gw(r,e.asyncQueue,t)}Mu(e,t){const r=new vD(t,this.persistence);return new wD(e.asyncQueue,r)}Cu(e){const t=Yf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?st.withCacheSize(this.cacheSizeBytes):st.DEFAULT;return new Qf(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,cv(),Qc(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new av}}class Av extends gp{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Oh&&(this.sharedClientState.syncEngine={So:hx.bind(null,t),Do:px.bind(null,t),Co:mx.bind(null,t),hs:fx.bind(null,t),bo:ux.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi((async r=>{await dx(this.xu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Du(e){const t=cv();if(!Oh.v(t))throw new D(S.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Yf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Oh(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Er{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>_y(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ax.bind(null,this.syncEngine),await Cd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new zO})()}createDatastore(e){const t=Pi(e.databaseInfo.databaseId),r=RO(e.databaseInfo);return NO(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,s,o,a){return new OO(r,i,s,o,a)})(this.localStore,this.datastore,e.asyncQueue,(t=>_y(this.syncEngine,t,0)),(function(){return uy.v()?new uy:new wO})())}createSyncEngine(e,t){return(function(i,s,o,a,l,u,h){const f=new YO(i,s,o,a,l,u);return h&&(f.gu=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=F(i);O(yi,"RemoteStore shutting down."),s.Ea.add(5),await Gs(s),s.Aa.shutdown(),s.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Er.provider={build:()=>new Er};function Iy(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ve("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _x{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new tt,this.buffer=new Uint8Array,this.Lu=(function(){return new TextDecoder("utf-8")})(),this.ku().then((r=>{r&&r.Ua()?this.metadata.resolve(r.qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.qa)}`))}),(r=>this.metadata.reject(r)))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async Su(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.Ku();if(e===null)return null;const t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.qu(`length string (${t}) is not valid number`);const i=await this.Uu(r);return new mv(JSON.parse(i),e.length+r)}$u(){return this.buffer.findIndex((e=>e===123))}async Ku(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.qu("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}qu(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yx{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.Su();if(!r||!r.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r==null?void 0:r.qa)}`);this.metadata=r;do r=this.Su(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Qu(){return this.elements}Su(){if(this.cursor===this.bundleData.length)return null;const e=this.Ku(),t=this.Uu(e);return new mv(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new D(S.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}Ku(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ix=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(S.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(i,s){const o=F(i),a={documents:s.map((f=>Ea(o.serializer,f)))},l=await o.jo("BatchGetDocuments",o.serializer.databaseId,ee.emptyPath(),a,s.length),u=new Map;l.forEach((f=>{const m=x0(o.serializer,f);u.set(m.key.toString(),m)}));const h=[];return s.forEach((f=>{const m=u.get(f.toString());G(!!m,55234,{key:f}),h.push(m)})),h})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Ws(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const i=L.fromPath(r);this.mutations.push(new Uf(i,this.precondition(i)))})),await(async function(r,i){const s=F(r),o={writes:i.map((a=>Ta(s.serializer,a)))};await s.Wo("Commit",s.serializer.databaseId,ee.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw W(50498,{Gu:e.constructor.name});t=z.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(S.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(z.min())?be.exists(!1):be.updateTime(t):be.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(z.min()))throw new D(S.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return be.updateTime(t)}return be.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ex{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.zu=r.maxAttempts,this.M_=new ep(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Hu()}Hu(){this.M_.p_((async()=>{const e=new Ix(this.datastore),t=this.Ju(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((i=>{this.Zu(i)}))))})).catch((r=>{this.Zu(r)}))}))}Ju(e){try{const t=this.updateFunction(e);return!Fa(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Hu(),Promise.resolve())))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!yw(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr="FirestoreClient";class Tx{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=Ye.UNAUTHENTICATED,this.clientId=eu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async o=>{O(Tr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(O(Tr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new tt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Hs(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Vh(n,e){n.asyncQueue.verifyOperationInProgress(),O(Tr,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await Xw(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Ey(n,e){n.asyncQueue.verifyOperationInProgress();const t=await _p(n);O(Tr,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>dy(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>dy(e.remoteStore,i))),n._onlineComponents=e}async function _p(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(Tr,"Using user provided OfflineComponentProvider");try{await Vh(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;St("Error using user provided cache. Falling back to memory cache: "+t),await Vh(n,new bs)}}else O(Tr,"Using default OfflineComponentProvider"),await Vh(n,new mp(void 0));return n._offlineComponents}async function Eu(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(Tr,"Using user provided OnlineComponentProvider"),await Ey(n,n._uninitializedComponentsProvider._online)):(O(Tr,"Using default OnlineComponentProvider"),await Ey(n,new Er))),n._onlineComponents}function bv(n){return _p(n).then((e=>e.persistence))}function Ks(n){return _p(n).then((e=>e.localStore))}function Rv(n){return Eu(n).then((e=>e.remoteStore))}function yp(n){return Eu(n).then((e=>e.syncEngine))}function Sv(n){return Eu(n).then((e=>e.datastore))}async function Rs(n){const e=await Eu(n),t=e.eventManager;return t.onListen=JO.bind(null,e.syncEngine),t.onUnlisten=ZO.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=XO.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=ex.bind(null,e.syncEngine),t}function wx(n){return n.asyncQueue.enqueue((async()=>{const e=await bv(n),t=await Rv(n);return e.setNetworkEnabled(!0),(function(i){const s=F(i);return s.Ea.delete(0),ja(s)})(t)}))}function vx(n){return n.asyncQueue.enqueue((async()=>{const e=await bv(n),t=await Rv(n);return e.setNetworkEnabled(!1),(async function(i){const s=F(i);s.Ea.add(0),await Gs(s),s.Va.set("Offline")})(t)}))}function Ax(n,e,t,r){const i=new Iu(r),s=new cp(e,i,t);return n.asyncQueue.enqueueAndForget((async()=>sp(await Rs(n),s))),()=>{i.Nu(),n.asyncQueue.enqueueAndForget((async()=>op(await Rs(n),s)))}}function bx(n,e){const t=new tt;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await(function(u,h){const f=F(u);return f.persistence.runTransaction("read document","readonly",(m=>f.localDocuments.getDocument(m,h)))})(i,s);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new D(S.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const l=Hs(a,`Failed to get document '${s} from cache`);o.reject(l)}})(await Ks(n),e,t))),t.promise}function Cv(n,e,t={}){const r=new tt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,l,u){const h=new Iu({next:m=>{h.Nu(),o.enqueueAndForget((()=>op(s,f)));const _=m.docs.has(a);!_&&m.fromCache?u.reject(new D(S.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&m.fromCache&&l&&l.source==="server"?u.reject(new D(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(m)},error:m=>u.reject(m)}),f=new cp(qs(a.path),h,{includeMetadataChanges:!0,Ka:!0});return sp(s,f)})(await Rs(n),n.asyncQueue,e,t,r))),r.promise}function Rx(n,e){const t=new tt;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await yl(i,s,!0),l=new Iv(s,a.ks),u=l.ru(a.documents),h=l.applyChanges(u,!1);o.resolve(h.snapshot)}catch(a){const l=Hs(a,`Failed to execute query '${s} against cache`);o.reject(l)}})(await Ks(n),e,t))),t.promise}function Pv(n,e,t={}){const r=new tt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,l,u){const h=new Iu({next:m=>{h.Nu(),o.enqueueAndForget((()=>op(s,f))),m.fromCache&&l.source==="server"?u.reject(new D(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(m)},error:m=>u.reject(m)}),f=new cp(a,h,{includeMetadataChanges:!0,Ka:!0});return sp(s,f)})(await Rs(n),n.asyncQueue,e,t,r))),r.promise}function Sx(n,e,t){const r=new tt;return n.asyncQueue.enqueueAndForget((async()=>{try{const i=await Sv(n);r.resolve((async function(o,a,l){var P;const u=F(o),{request:h,gt:f,parent:m}=Pw(u.serializer,tw(a),l);u.connection.Ko||delete h.parent;const _=(await u.jo("RunAggregationQuery",u.serializer.databaseId,m,h,1)).filter((k=>!!k.result));G(_.length===1,64727);const v=(P=_[0].result)==null?void 0:P.aggregateFields;return Object.keys(v).reduce(((k,U)=>(k[f[U]]=v[U],k)),{})})(i,e,t))}catch(i){r.reject(i)}})),r.promise}function Cx(n,e){const t=new tt;return n.asyncQueue.enqueueAndForget((async()=>tx(await yp(n),e,t))),t.promise}function Px(n,e){const t=new Iu(e);return n.asyncQueue.enqueueAndForget((async()=>(function(i,s){F(i).Ca.add(s),s.next()})(await Rs(n),t))),()=>{t.Nu(),n.asyncQueue.enqueueAndForget((async()=>(function(i,s){F(i).Ca.delete(s)})(await Rs(n),t)))}}function kx(n,e,t){const r=new tt;return n.asyncQueue.enqueueAndForget((async()=>{const i=await Sv(n);new Ex(n.asyncQueue,i,t,e,r).ju()})),r.promise}function Nx(n,e,t,r){const i=(function(o,a){let l;return l=typeof o=="string"?Ew().encode(o):o,(function(h,f){return new _x(h,f)})((function(h,f){if(h instanceof Uint8Array)return Iy(h,f);if(h instanceof ArrayBuffer)return Iy(new Uint8Array(h),f);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(l),a)})(t,Pi(e));n.asyncQueue.enqueueAndForget((async()=>{gx(await yp(n),i,r)}))}function Dx(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){const s=F(r);return s.persistence.runTransaction("Get named query","readonly",(o=>s.Pi.getNamedQuery(o,i)))})(await Ks(n),e)))}function kv(n,e){return(function(r,i){return new yx(r,i)})(n,e)}function Ox(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,i){const s=F(r),o=s.indexManager,a=[];return s.persistence.runTransaction("Configure indexes","readwrite",(l=>o.getFieldIndexes(l).next((u=>(function(f,m,_,v,P){f=[...f],m=[...m],f.sort(_),m.sort(_);const k=f.length,U=m.length;let $=0,q=0;for(;$<U&&q<k;){const H=_(f[q],m[$]);H<0?P(f[q++]):H>0?v(m[$++]):($++,q++)}for(;$<U;)v(m[$++]);for(;q<k;)P(f[q++])})(u,i,yD,(h=>{a.push(o.addFieldIndex(l,h))}),(h=>{a.push(o.deleteFieldIndex(l,h))})))).next((()=>b.waitFor(a)))))})(await Ks(n),e)))}function xx(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){F(r).Cs.As=i})(await Ks(n),e)))}function Vx(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=F(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(s=>i.deleteAllFieldIndexes(s)))})(await Ks(n))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nv(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mx="ComponentProvider",Ty=new Map;function Lx(n,e,t,r,i){return new XD(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,Nv(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv="firestore.googleapis.com",wy=!0;class vy{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Dv,this.ssl=wy}else this.host=e.host,this.ssl=e.ssl??wy;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Uw;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ww)throw new D(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}_T("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Nv(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ha{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new vy({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new vy(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new mT;switch(r.type){case"firstParty":return new hD(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Ty.get(t);r&&(O(Mx,"Removing Datastore"),Ty.delete(t),r.terminate())})(this),Promise.resolve()}}function Ov(n,e,t,r={}){var u;n=ne(n,Ha);const i=en(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},a=`${e}:${t}`;i&&(Da(`https://${a}`),$l("Firestore",!0)),s.host!==Dv&&s.host!==a&&St("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...s,host:a,ssl:i,emulatorOptions:r};if(!xt(l,o)&&(n._setSettings(l),r.mockUserToken)){let h,f;if(typeof r.mockUserToken=="string")h=r.mockUserToken,f=Ye.MOCK_USER;else{h=rf(r.mockUserToken,(u=n._app)==null?void 0:u.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new D(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ye(m)}n._authCredentials=new cD(new pT(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ze(this.firestore,e,this._query)}}class he{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new he(this.firestore,e,this._key)}toJSON(){return{type:he._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ci(t,he._jsonSchema))return new he(e,r||null,new L(ee.fromString(t.referencePath)))}}he._jsonSchemaVersion="firestore/documentReference/1.0",he._jsonSchema={type:Ue("string",he._jsonSchemaVersion),referencePath:Ue("string")};class Yt extends ze{constructor(e,t,r){super(e,t,qs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new he(this.firestore,null,new L(e))}withConverter(e){return new Yt(this.firestore,e,this._path)}}function Fx(n,e,...t){if(n=M(n),Rf("collection","path",e),n instanceof Ha){const r=ee.fromString(e,...t);return h_(r),new Yt(n,null,r)}{if(!(n instanceof he||n instanceof Yt))throw new D(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return h_(r),new Yt(n.firestore,null,r)}}function Ux(n,e){if(n=ne(n,Ha),Rf("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(S.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ze(n,null,(function(r){return new Un(ee.emptyPath(),r)})(e))}function xv(n,e,...t){if(n=M(n),arguments.length===1&&(e=eu.newId()),Rf("doc","path",e),n instanceof Ha){const r=ee.fromString(e,...t);return u_(r),new he(n,null,new L(r))}{if(!(n instanceof he||n instanceof Yt))throw new D(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return u_(r),new he(n.firestore,n instanceof Yt?n.converter:null,new L(r))}}function Bx(n,e){return n=M(n),e=M(e),(n instanceof he||n instanceof Yt)&&(e instanceof he||e instanceof Yt)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Ip(n,e){return n=M(n),e=M(e),n instanceof ze&&e instanceof ze&&n.firestore===e.firestore&&qa(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay="AsyncQueue";class by{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ep(this,"async_queue_retry"),this._c=()=>{const r=Qc();r&&O(Ay,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Qc();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Qc();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new tt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Nr(e))throw e;O(Ay,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,Ve("INTERNAL UNHANDLED ERROR: ",Ry(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=ip.createAndSchedule(this,e,t,r,(s=>this.hc(s)));return this.tc.push(i),i}uc(){this.nc&&W(47125,{Pc:Ry(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Ry(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vv{constructor(){this._progressObserver={},this._taskCompletionResolver=new tt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qx=-1;class fe extends Ha{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new by,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new by(e),this._firestoreClient=void 0,await e}}}function $x(n,e,t){t||(t=ga);const r=$t(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(xt(s,e))return i;throw new D(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(S.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ww)throw new D(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&en(e.host)&&Da(e.host),r.initialize({options:e,instanceIdentifier:t})}function Wx(n,e){const t=typeof n=="object"?n:Vs(),r=typeof n=="string"?n:e||ga,i=$t(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=nf("firestore");s&&Ov(i,...s)}return i}function Se(n){if(n._terminated)throw new D(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Mv(n),n._firestoreClient}function Mv(n){var r,i,s,o;const e=n._freezeSettings(),t=Lx(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(i=n._app)==null?void 0:i.options.apiKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Tx(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}})(n._componentsProvider))}function Gx(n,e){St("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return Lv(n,Er.provider,{build:r=>new gp(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function zx(n){St("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();Lv(n,Er.provider,{build:t=>new Av(t,e.cacheSizeBytes)})}function Lv(n,e,t){if((n=ne(n,fe))._firestoreClient||n._terminated)throw new D(S.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new D(S.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Mv(n)}function jx(n){if(n._initialized&&!n._terminated)throw new D(S.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new tt;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!un.v())return Promise.resolve();const i=r+Qw;await un.delete(i)})(Yf(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function Hx(n){return(function(t){const r=new tt;return t.asyncQueue.enqueueAndForget((async()=>sx(await yp(t),r))),r.promise})(Se(n=ne(n,fe)))}function Kx(n){return wx(Se(n=ne(n,fe)))}function Qx(n){return vx(Se(n=ne(n,fe)))}function Yx(n){return dC(n.app,"firestore",n._databaseId.database),n._delete()}function Nd(n,e){const t=Se(n=ne(n,fe)),r=new Vv;return Nx(t,n._databaseId,e,r),r}function Fv(n,e){return Dx(Se(n=ne(n,fe)),e).then((t=>t?new ze(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this._byteString=e}static fromBase64String(e){try{return new It(ke.fromBase64String(e))}catch(t){throw new D(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new It(ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:It._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ci(e,It._jsonSchema))return It.fromBase64String(e.bytes)}}It._jsonSchemaVersion="firestore/bytes/1.0",It._jsonSchema={type:Ue("string",It._jsonSchemaVersion),bytes:Ue("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Te(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function Jx(){return new ki(od)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Jt._jsonSchemaVersion}}static fromJSON(e){if(Ci(e,Jt._jsonSchema))return new Jt(e.latitude,e.longitude)}}Jt._jsonSchemaVersion="firestore/geoPoint/1.0",Jt._jsonSchema={type:Ue("string",Jt._jsonSchemaVersion),latitude:Ue("number"),longitude:Ue("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Dt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ci(e,Dt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Dt(e.vectorValues);throw new D(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Dt._jsonSchemaVersion="firestore/vectorValue/1.0",Dt._jsonSchema={type:Ue("string",Dt._jsonSchemaVersion),vectorValues:Ue("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xx=/^__.*__$/;class Zx{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new qn(e,this.data,this.fieldMask,t,this.fieldTransforms):new $s(e,this.data,t,this.fieldTransforms)}}class Uv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new qn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Bv(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W(40011,{dataSource:n})}}class Tu{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Tu({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return wl(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Bv(this.dataSource)&&Xx.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class eV{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Pi(e)}createContext(e,t,r,i=!1){return new Tu({dataSource:e,methodName:t,targetDoc:r,path:Te.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ni(n){const e=n._freezeSettings(),t=Pi(n._databaseId);return new eV(n._databaseId,!!e.ignoreUndefinedProperties,t)}function wu(n,e,t,r,i,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,e,t,i);Rp("Data must be an object, but it was:",o,r);const a=Wv(r,o);let l,u;if(s.merge)l=new Tt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const f of s.mergeFields){const m=xn(e,f,t);if(!o.contains(m))throw new D(S.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);zv(h,m)||h.push(m)}l=new Tt(h),u=o.fieldTransforms.filter((f=>l.covers(f.field)))}else l=null,u=o.fieldTransforms;return new Zx(new Ze(a),l,u)}class Ka extends Vr{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ka}}function qv(n,e,t){return new Tu({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Ep extends Vr{_toFieldTransform(e){return new Wa(e.path,new ys)}isEqual(e){return e instanceof Ep}}class Tp extends Vr{constructor(e,t){super(e),this.Ac=t}_toFieldTransform(e){const t=qv(this,e,!0),r=this.Ac.map((s=>Di(s,t))),i=new fi(r);return new Wa(e.path,i)}isEqual(e){return e instanceof Tp&&xt(this.Ac,e.Ac)}}class wp extends Vr{constructor(e,t){super(e),this.Ac=t}_toFieldTransform(e){const t=qv(this,e,!0),r=this.Ac.map((s=>Di(s,t))),i=new pi(r);return new Wa(e.path,i)}isEqual(e){return e instanceof wp&&xt(this.Ac,e.Ac)}}class vp extends Vr{constructor(e,t){super(e),this.Vc=t}_toFieldTransform(e){const t=new Is(e.serializer,uw(e.serializer,this.Vc));return new Wa(e.path,t)}isEqual(e){return e instanceof vp&&this.Vc===e.Vc}}function Ap(n,e,t,r){const i=n.createContext(1,e,t);Rp("Data must be an object, but it was:",i,r);const s=[],o=Ze.empty();Dr(r,((l,u)=>{const h=Sp(e,l,t);u=M(u);const f=i.childContextForFieldPath(h);if(u instanceof Ka)s.push(h);else{const m=Di(u,f);m!=null&&(s.push(h),o.set(h,m))}}));const a=new Tt(s);return new Uv(o,a,i.fieldTransforms)}function bp(n,e,t,r,i,s){const o=n.createContext(1,e,t),a=[xn(e,r,t)],l=[i];if(s.length%2!=0)throw new D(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)a.push(xn(e,s[m])),l.push(s[m+1]);const u=[],h=Ze.empty();for(let m=a.length-1;m>=0;--m)if(!zv(u,a[m])){const _=a[m];let v=l[m];v=M(v);const P=o.childContextForFieldPath(_);if(v instanceof Ka)u.push(_);else{const k=Di(v,P);k!=null&&(u.push(_),h.set(_,k))}}const f=new Tt(u);return new Uv(h,f,o.fieldTransforms)}function $v(n,e,t,r=!1){return Di(t,n.createContext(r?4:3,e))}function Di(n,e){if(Gv(n=M(n)))return Rp("Unsupported field value:",e,n),Wv(n,e);if(n instanceof Vr)return(function(r,i){if(!Bv(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(r,i){const s=[];let o=0;for(const a of r){let l=Di(a,i.childContextForArray(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}})(n,e)}return(function(r,i){if((r=M(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return uw(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ce.fromDate(r);return{timestampValue:Es(i.serializer,s)}}if(r instanceof ce){const s=new ce(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Es(i.serializer,s)}}if(r instanceof Jt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof It)return{bytesValue:vw(i.serializer,r._byteString)};if(r instanceof he){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Gf(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Dt)return(function(o,a){const l=o instanceof Dt?o.toArray():o;return{mapValue:{fields:{[Of]:{stringValue:xf},[ms]:{arrayValue:{values:l.map((h=>{if(typeof h!="number")throw a.createError("VectorValues must only contain numeric values.");return Ff(a.serializer,h)}))}}}}}})(r,i);if(xw(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${tu(r)}`)})(n,e)}function Wv(n,e){const t={};return LT(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Dr(n,((r,i)=>{const s=Di(i,e.childContextForField(r));s!=null&&(t[r]=s)})),{mapValue:{fields:t}}}function Gv(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ce||n instanceof Jt||n instanceof It||n instanceof he||n instanceof Vr||n instanceof Dt||xw(n))}function Rp(n,e,t){if(!Gv(t)||!yT(t)){const r=tu(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function xn(n,e,t){if((e=M(e))instanceof ki)return e._internalPath;if(typeof e=="string")return Sp(n,e);throw wl("Field path arguments must be of type string or ",n,!1,void 0,t)}const tV=new RegExp("[~\\*/\\[\\]]");function Sp(n,e,t){if(e.search(tV)>=0)throw wl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ki(...e.split("."))._internalPath}catch{throw wl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function wl(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new D(S.INVALID_ARGUMENT,a+n+l)}function zv(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{convertValue(e,t="none"){switch(gr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(On(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw W(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Dr(e,((i,s)=>{r[i]=this.convertValue(s,t)})),r}convertVectorValue(e){var r,i,s;const t=(s=(i=(r=e.fields)==null?void 0:r[ms].arrayValue)==null?void 0:i.values)==null?void 0:s.map((o=>Ae(o.doubleValue)));return new Dt(t)}convertGeoPoint(e){return new Jt(Ae(e.latitude),Ae(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=au(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ma(e));default:return null}}convertTimestamp(e){const t=Dn(e);return new ce(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ee.fromString(e);G(Ow(r),9688,{name:e});const i=new mr(r.get(1),r.get(3)),s=new L(r.popFirst(5));return i.isEqual(t)||Ve(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr extends Cp{constructor(e){super(),this.firestore=e}convertBytes(e){return new It(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new he(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nV(){return new Ka("deleteField")}function rV(){return new Ep("serverTimestamp")}function iV(...n){return new Tp("arrayUnion",n)}function sV(...n){return new wp("arrayRemove",n)}function oV(n){return new vp("increment",n)}function aV(n){return new Dt(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cV(n){var r;const e=Se(ne(n.firestore,fe)),t=(r=e._onlineComponents)==null?void 0:r.datastore.serializer;return t===void 0?null:du(t,at(n._query)).ft}function lV(n,e){var s;const t=MT(e,((o,a)=>new _w(a,o.aggregateType,o._internalFieldPath))),r=Se(ne(n.firestore,fe)),i=(s=r._onlineComponents)==null?void 0:s.datastore.serializer;return i===void 0?null:Pw(i,tw(n._query),t,!0).request}const Sy="@firebase/firestore",Cy="4.12.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class jv{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new Ze({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new he(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new uV(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(xn("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class uV extends wa{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Pp{}let Qs=class extends Pp{};function hV(n,e,...t){let r=[];e instanceof Pp&&r.push(e),r=r.concat(t),(function(s){const o=s.filter((l=>l instanceof Oi)).length,a=s.filter((l=>l instanceof Ys)).length;if(o>1||o>0&&a>0)throw new D(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class Ys extends Qs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ys(e,t,r)}_apply(e){const t=this._parse(e);return Jv(e._query,t),new ze(e.firestore,e.converter,yd(e._query,t))}_parse(e){const t=Ni(e.firestore);return(function(s,o,a,l,u,h,f){let m;if(u.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new D(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){ky(f,h);const v=[];for(const P of f)v.push(Py(l,s,P));m={arrayValue:{values:v}}}else m=Py(l,s,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||ky(f,h),m=$v(a,o,f,h==="in"||h==="not-in");return se.create(u,h,m)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function dV(n,e,t){const r=e,i=xn("where",n);return Ys._create(i,r,t)}class Oi extends Pp{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Oi(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:ue.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let o=i;const a=s.getFlattenedFilters();for(const l of a)Jv(o,l),o=yd(o,l)})(e._query,t),new ze(e.firestore,e.converter,yd(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function fV(...n){return n.forEach((e=>Xv("or",e))),Oi._create("or",n)}function pV(...n){return n.forEach((e=>Xv("and",e))),Oi._create("and",n)}class vu extends Qs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new vu(e,t)}_apply(e){const t=(function(i,s,o){if(i.startAt!==null)throw new D(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ia(s,o)})(e._query,this._field,this._direction);return new ze(e.firestore,e.converter,h0(e._query,t))}}function mV(n,e="asc"){const t=e,r=xn("orderBy",n);return vu._create(r,t)}class Qa extends Qs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Qa(e,t,r)}_apply(e){return new ze(e.firestore,e.converter,fl(e._query,this._limit,this._limitType))}}function gV(n){return IT("limit",n),Qa._create("limit",n,"F")}function _V(n){return IT("limitToLast",n),Qa._create("limitToLast",n,"L")}let kp=class Kv extends Qs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Kv(e,t,r)}_apply(e){const t=Yv(e,this.type,this._docOrFields,this._inclusive);return new ze(e.firestore,e.converter,d0(e._query,t))}};function yV(...n){return kp._create("startAt",n,!0)}function IV(...n){return kp._create("startAfter",n,!1)}let Np=class Qv extends Qs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Qv(e,t,r)}_apply(e){const t=Yv(e,this.type,this._docOrFields,this._inclusive);return new ze(e.firestore,e.converter,f0(e._query,t))}};function EV(...n){return Np._create("endBefore",n,!1)}function TV(...n){return Np._create("endAt",n,!0)}function Yv(n,e,t,r){if(t[0]=M(t[0]),t[0]instanceof wa)return(function(s,o,a,l,u){if(!l)throw new D(S.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const h=[];for(const f of es(s))if(f.field.isKeyField())h.push(hi(o,l.key));else{const m=l.data.field(f.field);if(ou(m))throw new D(S.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const _=f.field.canonicalString();throw new D(S.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${_}' (used as the orderBy) does not exist.`)}h.push(m)}return new yr(h,u)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Ni(n.firestore);return(function(o,a,l,u,h,f){const m=o.explicitOrderBy;if(h.length>m.length)throw new D(S.INVALID_ARGUMENT,`Too many arguments provided to ${u}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const _=[];for(let v=0;v<h.length;v++){const P=h[v];if(m[v].field.isKeyField()){if(typeof P!="string")throw new D(S.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${u}(), but got a ${typeof P}`);if(!Mf(o)&&P.indexOf("/")!==-1)throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${u}() must be a plain document ID, but '${P}' contains a slash.`);const k=o.path.child(ee.fromString(P));if(!L.isDocumentKey(k))throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${u}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const U=new L(k);_.push(hi(a,U))}else{const k=$v(l,u,P);_.push(k)}}return new yr(_,f)})(n._query,n.firestore._databaseId,i,e,t,r)}}function Py(n,e,t){if(typeof(t=M(t))=="string"){if(t==="")throw new D(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Mf(e)&&t.indexOf("/")!==-1)throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ee.fromString(t));if(!L.isDocumentKey(r))throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return hi(n,new L(r))}if(t instanceof he)return hi(n,t._key);throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${tu(t)}.`)}function ky(n,e){if(!Array.isArray(n)||n.length===0)throw new D(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Jv(n,e){const t=(function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Xv(n,e){if(!(e instanceof Ys||e instanceof Oi))throw new D(S.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Au(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Dp extends Cp{constructor(e){super(),this.firestore=e}convertBytes(e){return new It(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new he(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wV(n){return new Ss("sum",xn("sum",n))}function vV(n){return new Ss("avg",xn("average",n))}function Zv(){return new Ss("count")}function AV(n,e){var t,r;return n instanceof Ss&&e instanceof Ss&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)==null?void 0:t.canonicalString())===((r=e._internalFieldPath)==null?void 0:r.canonicalString())}function bV(n,e){return Ip(n.query,e.query)&&xt(n.data(),e.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RV(n){return eA(n,{count:Zv()})}function eA(n,e){const t=ne(n.firestore,fe),r=Se(t),i=MT(e,((s,o)=>new _w(o,s.aggregateType,s._internalFieldPath)));return Sx(r,n._query,i).then((s=>(function(a,l,u){const h=new Mr(a);return new jv(l,h,u)})(t,n,s)))}class SV{constructor(e){this.kind="memory",this._onlineComponentProvider=Er.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new mp(void 0)}}toJSON(){return{kind:this.kind}}}class CV{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=tA(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class PV{constructor(){this.kind="memoryEager",this._offlineComponentProvider=bs.provider}toJSON(){return{kind:this.kind}}}class kV{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new mp(e)}}toJSON(){return{kind:this.kind}}}function NV(){return new PV}function DV(n){return new kV(n==null?void 0:n.cacheSizeBytes)}function OV(n){return new SV(n)}function xV(n){return new CV(n)}class VV{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Er.provider,this._offlineComponentProvider={build:t=>new gp(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class MV{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Er.provider,this._offlineComponentProvider={build:t=>new Av(t,e==null?void 0:e.cacheSizeBytes)}}}function tA(n){return new VV(n==null?void 0:n.forceOwnership)}function LV(){return new MV}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nA="NOT SUPPORTED";class Rn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class At extends wa{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(xn("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=At._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function FV(n,e,t){if(Ci(e,At._jsonSchema)){if(e.bundle===nA)throw new D(S.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Pi(n._databaseId),i=kv(e.bundle,r),s=i.t(),o=new lp(i.getMetadata(),r);for(const h of s)o.o(h);const a=o.documents;if(a.length!==1)throw new D(S.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${a.length} documents.`);const l=hu(r,a[0].document),u=new L(ee.fromString(e.bundleName));return new At(n,new Dp(n),u,l,new Rn(!1,!1),t||null)}}At._jsonSchemaVersion="firestore/documentSnapshot/1.0",At._jsonSchema={type:Ue("string",At._jsonSchemaVersion),bundleSource:Ue("string","DocumentSnapshot"),bundleName:Ue("string"),bundle:Ue("string")};class Zo extends At{data(e={}){return super.data(e)}}class bt{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Rn(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Zo(this._firestore,this._userDataWriter,r.key,r,new Rn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map((a=>{const l=new Zo(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Rn(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}}))}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((a=>s||a.type!==3)).map((a=>{const l=new Zo(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Rn(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let u=-1,h=-1;return a.type!==0&&(u=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:BV(a.type),doc:l,oldIndex:u,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=bt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=eu.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach((s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function UV(n,e,t){if(Ci(e,bt._jsonSchema)){if(e.bundle===nA)throw new D(S.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Pi(n._databaseId),i=kv(e.bundle,r),s=i.t(),o=new lp(i.getMetadata(),r);for(const m of s)o.o(m);if(o.queries.length!==1)throw new D(S.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const a=fu(o.queries[0].bundledQuery),l=o.documents;let u=new oi;l.map((m=>{const _=hu(r,m.document);u=u.add(_)}));const h=Ii.fromInitialDocuments(a,u,Q(),!1,!1),f=new ze(n,t||null,a);return new bt(n,new Dp(n),f,h)}}function BV(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W(61501,{type:n})}}function qV(n,e){return n instanceof At&&e instanceof At?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof bt&&e instanceof bt&&n._firestore===e._firestore&&Ip(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bt._jsonSchemaVersion="firestore/querySnapshot/1.0",bt._jsonSchema={type:Ue("string",bt._jsonSchemaVersion),bundleSource:Ue("string","QuerySnapshot"),bundleName:Ue("string"),bundle:Ue("string")};const $V={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Ni(e)}set(e,t,r){this._verifyNotCommitted();const i=rr(e,this._firestore),s=Au(i.converter,t,r),o=wu(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,be.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=rr(e,this._firestore);let o;return o=typeof(t=M(t))=="string"||t instanceof ki?bp(this._dataReader,"WriteBatch.update",s._key,t,r,i):Ap(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,be.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=rr(e,this._firestore);return this._mutations=this._mutations.concat(new Ws(t._key,be.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function rr(n,e){if((n=M(n)).firestore!==e)throw new D(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WV{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Ni(e)}get(e){const t=rr(e,this._firestore),r=new Dp(this._firestore);return this._transaction.lookup([t._key]).then((i=>{if(!i||i.length!==1)return W(24041);const s=i[0];if(s.isFoundDocument())return new wa(this._firestore,r,s.key,s,t.converter);if(s.isNoDocument())return new wa(this._firestore,r,t._key,null,t.converter);throw W(18433,{doc:s})}))}set(e,t,r){const i=rr(e,this._firestore),s=Au(i.converter,t,r),o=wu(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(e,t,r,...i){const s=rr(e,this._firestore);let o;return o=typeof(t=M(t))=="string"||t instanceof ki?bp(this._dataReader,"Transaction.update",s._key,t,r,i):Ap(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,o),this}delete(e){const t=rr(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA extends WV{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=rr(e,this._firestore),r=new Mr(this._firestore);return super.get(e).then((i=>new At(this._firestore,r,t._key,i._document,new Rn(!1,!1),t.converter)))}}function GV(n,e,t){n=ne(n,fe);const r={...$V,...t};(function(o){if(o.maxAttempts<1)throw new D(S.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const i=Se(n);return kx(i,(s=>e(new iA(n,s))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zV(n){n=ne(n,he);const e=ne(n.firestore,fe),t=Se(e);return Cv(t,n._key).then((r=>Op(e,n,r)))}function jV(n){n=ne(n,he);const e=ne(n.firestore,fe),t=Se(e),r=new Mr(e);return bx(t,n._key).then((i=>new At(e,r,n._key,i,new Rn(i!==null&&i.hasLocalMutations,!0),n.converter)))}function HV(n){n=ne(n,he);const e=ne(n.firestore,fe),t=Se(e);return Cv(t,n._key,{source:"server"}).then((r=>Op(e,n,r)))}function KV(n){n=ne(n,ze);const e=ne(n.firestore,fe),t=Se(e),r=new Mr(e);return Hv(n._query),Pv(t,n._query).then((i=>new bt(e,r,n,i)))}function QV(n){n=ne(n,ze);const e=ne(n.firestore,fe),t=Se(e),r=new Mr(e);return Rx(t,n._query).then((i=>new bt(e,r,n,i)))}function YV(n){n=ne(n,ze);const e=ne(n.firestore,fe),t=Se(e),r=new Mr(e);return Pv(t,n._query,{source:"server"}).then((i=>new bt(e,r,n,i)))}function JV(n,e,t){n=ne(n,he);const r=ne(n.firestore,fe),i=Au(n.converter,e,t),s=Ni(r);return Js(r,[wu(s,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,be.none())])}function XV(n,e,t,...r){n=ne(n,he);const i=ne(n.firestore,fe),s=Ni(i);let o;return o=typeof(e=M(e))=="string"||e instanceof ki?bp(s,"updateDoc",n._key,e,t,r):Ap(s,"updateDoc",n._key,e),Js(i,[o.toMutation(n._key,be.exists(!0))])}function ZV(n){return Js(ne(n.firestore,fe),[new Ws(n._key,be.none())])}function eM(n,e){const t=ne(n.firestore,fe),r=xv(n),i=Au(n.converter,e),s=Ni(n.firestore);return Js(t,[wu(s,"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,be.exists(!1))]).then((()=>r))}function Dd(n,...e){var u,h,f;n=M(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||ns(e[r])||(t=e[r++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ns(e[r])){const m=e[r];e[r]=(u=m.next)==null?void 0:u.bind(m),e[r+1]=(h=m.error)==null?void 0:h.bind(m),e[r+2]=(f=m.complete)==null?void 0:f.bind(m)}let s,o,a;if(n instanceof he)o=ne(n.firestore,fe),a=qs(n._key.path),s={next:m=>{e[r]&&e[r](Op(o,n,m))},error:e[r+1],complete:e[r+2]};else{const m=ne(n,ze);o=ne(m.firestore,fe),a=m._query;const _=new Mr(o);s={next:v=>{e[r]&&e[r](new bt(o,_,m,v))},error:e[r+1],complete:e[r+2]},Hv(n._query)}const l=Se(o);return Ax(l,a,i,s)}function tM(n,e,...t){const r=M(n),i=(function(l){const u={bundle:"",bundleName:"",bundleSource:""},h=["bundle","bundleName","bundleSource"];for(const f of h){if(!(f in l)){u.error=`snapshotJson missing required field: ${f}`;break}const m=l[f];if(typeof m!="string"){u.error=`snapshotJson field '${f}' must be a string.`;break}if(m.length===0){u.error=`snapshotJson field '${f}' cannot be an empty string.`;break}f==="bundle"?u.bundle=m:f==="bundleName"?u.bundleName=m:f==="bundleSource"&&(u.bundleSource=m)}return u})(e);if(i.error)throw new D(S.INVALID_ARGUMENT,i.error);let s,o=0;if(typeof t[o]!="object"||ns(t[o])||(s=t[o++]),i.bundleSource==="QuerySnapshot"){let a=null;if(typeof t[o]=="object"&&ns(t[o])){const l=t[o++];a={next:l.next,error:l.error,complete:l.complete}}else a={next:t[o++],error:t[o++],complete:t[o++]};return(function(u,h,f,m,_){let v,P=!1;return Nd(u,h.bundle).then((()=>Fv(u,h.bundleName))).then((U=>{U&&!P&&(_&&U.withConverter(_),v=Dd(U,f||{},m))})).catch((U=>(m.error&&m.error(U),()=>{}))),()=>{P||(P=!0,v&&v())}})(r,i,s,a,t[o])}if(i.bundleSource==="DocumentSnapshot"){let a=null;if(typeof t[o]=="object"&&ns(t[o])){const l=t[o++];a={next:l.next,error:l.error,complete:l.complete}}else a={next:t[o++],error:t[o++],complete:t[o++]};return(function(u,h,f,m,_){let v,P=!1;return Nd(u,h.bundle).then((()=>{if(!P){const U=new he(u,_||null,L.fromPath(h.bundleName));v=Dd(U,f||{},m)}})).catch((U=>(m.error&&m.error(U),()=>{}))),()=>{P||(P=!0,v&&v())}})(r,i,s,a,t[o])}throw new D(S.INVALID_ARGUMENT,`unsupported bundle source: ${i.bundleSource}`)}function nM(n,e){n=ne(n,fe);const t=Se(n),r=ns(e)?e:{next:e};return Px(t,r)}function Js(n,e){const t=Se(n);return Cx(t,e)}function Op(n,e,t){const r=t.docs.get(e._key),i=new Mr(n);return new At(n,i,e._key,r,new Rn(t.hasPendingWrites,t.fromCache),e.converter)}function rM(n){return n=ne(n,fe),Se(n),new rA(n,(e=>Js(n,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iM(n,e){n=ne(n,fe);const t=Se(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return St("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(s){const o=typeof s=="string"?(function(u){try{return JSON.parse(u)}catch(h){throw new D(S.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}})(s):s,a=[];if(Array.isArray(o.indexes))for(const l of o.indexes){const u=Ny(l,"collectionGroup"),h=[];if(Array.isArray(l.fields))for(const f of l.fields){const m=Ny(f,"fieldPath"),_=Sp("setIndexConfiguration",m);f.arrayConfig==="CONTAINS"?h.push(new ii(_,2)):f.order==="ASCENDING"?h.push(new ii(_,0)):f.order==="DESCENDING"&&h.push(new ii(_,1))}a.push(new ls(ls.UNKNOWN_ID,u,h,us.empty()))}return a})(e);return Ox(t,r)}function Ny(n,e){if(typeof n[e]!="string")throw new D(S.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sA{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function sM(n){var i;n=ne(n,fe);const e=Dy.get(n);if(e)return e;if(((i=Se(n)._uninitializedComponentsProvider)==null?void 0:i._offline.kind)!=="persistent")return null;const r=new sA(n);return Dy.set(n,r),r}function oM(n){oA(n,!0)}function aM(n){oA(n,!1)}function cM(n){const e=Se(n._firestore);Vx(e).then((t=>O("deleting all persistent cache indexes succeeded"))).catch((t=>St("deleting all persistent cache indexes failed",t)))}function oA(n,e){const t=Se(n._firestore);xx(t,e).then((r=>O(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((r=>St(`setting persistent cache index auto creation isEnabled=${e} failed`,r)))}const Dy=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lM{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return xp.instance.onExistenceFilterMismatch(e)}}class xp{constructor(){this.i=new Map}static get instance(){return kc||(kc=new xp,R0(kc)),kc}u(e){this.i.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.i;return r.set(t,e),()=>r.delete(t)}}let kc=null;(function(e,t=!0){sD(Cr),ut(new Ge("firestore",((r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new fe(new lD(r.getProvider("auth-internal")),new dD(o,r.getProvider("app-check-internal")),ZD(o,i),o);return s={useFetchStreams:t,...s},a._setSettings(s),a}),"PUBLIC").setMultipleInstances(!0)),$e(Sy,Cy,e),$e(Sy,Cy,"esm2020")})();const Q4=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Cp,AggregateField:Ss,AggregateQuerySnapshot:jv,Bytes:It,CACHE_SIZE_UNLIMITED:qx,CollectionReference:Yt,DocumentReference:he,DocumentSnapshot:At,FieldPath:ki,FieldValue:Vr,Firestore:fe,FirestoreError:D,GeoPoint:Jt,LoadBundleTask:Vv,PersistentCacheIndexManager:sA,Query:ze,QueryCompositeFilterConstraint:Oi,QueryConstraint:Qs,QueryDocumentSnapshot:Zo,QueryEndAtConstraint:Np,QueryFieldFilterConstraint:Ys,QueryLimitConstraint:Qa,QueryOrderByConstraint:vu,QuerySnapshot:bt,QueryStartAtConstraint:kp,SnapshotMetadata:Rn,Timestamp:ce,Transaction:iA,VectorValue:Dt,WriteBatch:rA,_AutoId:eu,_ByteString:ke,_DatabaseId:mr,_DocumentKey:L,_EmptyAppCheckTokenProvider:fD,_EmptyAuthCredentialsProvider:mT,_FieldPath:Te,_TestingHooks:lM,_cast:ne,_debugAssert:aD,_internalAggregationQueryToProtoRunAggregationQueryRequest:lV,_internalQueryToProtoQueryTarget:cV,_isBase64Available:YD,_logWarn:St,_validateIsNotUsedTogether:_T,addDoc:eM,aggregateFieldEqual:AV,aggregateQuerySnapshotEqual:bV,and:pV,arrayRemove:sV,arrayUnion:iV,average:vV,clearIndexedDbPersistence:jx,collection:Fx,collectionGroup:Ux,connectFirestoreEmulator:Ov,count:Zv,deleteAllPersistentCacheIndexes:cM,deleteDoc:ZV,deleteField:nV,disableNetwork:Qx,disablePersistentCacheIndexAutoCreation:aM,doc:xv,documentId:Jx,documentSnapshotFromJSON:FV,enableIndexedDbPersistence:Gx,enableMultiTabIndexedDbPersistence:zx,enableNetwork:Kx,enablePersistentCacheIndexAutoCreation:oM,endAt:TV,endBefore:EV,ensureFirestoreConfigured:Se,executeWrite:Js,getAggregateFromServer:eA,getCountFromServer:RV,getDoc:zV,getDocFromCache:jV,getDocFromServer:HV,getDocs:KV,getDocsFromCache:QV,getDocsFromServer:YV,getFirestore:Wx,getPersistentCacheIndexManager:sM,increment:oV,initializeFirestore:$x,limit:gV,limitToLast:_V,loadBundle:Nd,memoryEagerGarbageCollector:NV,memoryLocalCache:OV,memoryLruGarbageCollector:DV,namedQuery:Fv,onSnapshot:Dd,onSnapshotResume:tM,onSnapshotsInSync:nM,or:fV,orderBy:mV,persistentLocalCache:xV,persistentMultipleTabManager:LV,persistentSingleTabManager:tA,query:hV,queryEqual:Ip,querySnapshotFromJSON:UV,refEqual:Bx,runTransaction:GV,serverTimestamp:rV,setDoc:JV,setIndexConfiguration:iM,setLogLevel:oD,snapshotEqual:qV,startAfter:IV,startAt:yV,sum:wV,terminate:Yx,updateDoc:XV,vector:aV,waitForPendingWrites:Hx,where:dV,writeBatch:rM},Symbol.toStringTag,{value:"Module"})),aA="@firebase/installations",Vp="0.6.20";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cA=1e4,lA=`w:${Vp}`,uA="FIS_v2",uM="https://firebaseinstallations.googleapis.com/v1",hM=3600*1e3,dM="installations",fM="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pM={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ei=new Mn(dM,fM,pM);function hA(n){return n instanceof qt&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dA({projectId:n}){return`${uM}/projects/${n}/installations`}function fA(n){return{token:n.token,requestStatus:2,expiresIn:gM(n.expiresIn),creationTime:Date.now()}}async function pA(n,e){const r=(await e.json()).error;return Ei.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function mA({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function mM(n,{refreshToken:e}){const t=mA(n);return t.append("Authorization",_M(e)),t}async function gA(n){const e=await n();return e.status>=500&&e.status<600?n():e}function gM(n){return Number(n.replace("s","000"))}function _M(n){return`${uA} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yM({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=dA(n),i=mA(n),s=e.getImmediate({optional:!0});if(s){const u=await s.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const o={fid:t,authVersion:uA,appId:n.appId,sdkVersion:lA},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await gA(()=>fetch(r,a));if(l.ok){const u=await l.json();return{fid:u.fid||t,registrationStatus:2,refreshToken:u.refreshToken,authToken:fA(u.authToken)}}else throw await pA("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _A(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IM(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EM=/^[cdef][\w-]{21}$/,Od="";function TM(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=wM(n);return EM.test(t)?t:Od}catch{return Od}}function wM(n){return IM(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yA=new Map;function IA(n,e){const t=bu(n);EA(t,e),vM(t,e)}function EA(n,e){const t=yA.get(n);if(t)for(const r of t)r(e)}function vM(n,e){const t=AM();t&&t.postMessage({key:n,fid:e}),bM()}let ti=null;function AM(){return!ti&&"BroadcastChannel"in self&&(ti=new BroadcastChannel("[Firebase] FID Change"),ti.onmessage=n=>{EA(n.data.key,n.data.fid)}),ti}function bM(){yA.size===0&&ti&&(ti.close(),ti=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RM="firebase-installations-database",SM=1,Ti="firebase-installations-store";let Mh=null;function Mp(){return Mh||(Mh=Ul(RM,SM,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Ti)}}})),Mh}async function vl(n,e){const t=bu(n),i=(await Mp()).transaction(Ti,"readwrite"),s=i.objectStore(Ti),o=await s.get(t);return await s.put(e,t),await i.done,(!o||o.fid!==e.fid)&&IA(n,e.fid),e}async function TA(n){const e=bu(n),r=(await Mp()).transaction(Ti,"readwrite");await r.objectStore(Ti).delete(e),await r.done}async function Ru(n,e){const t=bu(n),i=(await Mp()).transaction(Ti,"readwrite"),s=i.objectStore(Ti),o=await s.get(t),a=e(o);return a===void 0?await s.delete(t):await s.put(a,t),await i.done,a&&(!o||o.fid!==a.fid)&&IA(n,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lp(n){let e;const t=await Ru(n.appConfig,r=>{const i=CM(r),s=PM(n,i);return e=s.registrationPromise,s.installationEntry});return t.fid===Od?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function CM(n){const e=n||{fid:TM(),registrationStatus:0};return wA(e)}function PM(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Ei.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=kM(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:NM(n)}:{installationEntry:e}}async function kM(n,e){try{const t=await yM(n,e);return vl(n.appConfig,t)}catch(t){throw hA(t)&&t.customData.serverCode===409?await TA(n.appConfig):await vl(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function NM(n){let e=await Oy(n.appConfig);for(;e.registrationStatus===1;)await _A(100),e=await Oy(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await Lp(n);return r||t}return e}function Oy(n){return Ru(n,e=>{if(!e)throw Ei.create("installation-not-found");return wA(e)})}function wA(n){return DM(n)?{fid:n.fid,registrationStatus:0}:n}function DM(n){return n.registrationStatus===1&&n.registrationTime+cA<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OM({appConfig:n,heartbeatServiceProvider:e},t){const r=xM(n,t),i=mM(n,t),s=e.getImmediate({optional:!0});if(s){const u=await s.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const o={installation:{sdkVersion:lA,appId:n.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await gA(()=>fetch(r,a));if(l.ok){const u=await l.json();return fA(u)}else throw await pA("Generate Auth Token",l)}function xM(n,{fid:e}){return`${dA(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fp(n,e=!1){let t;const r=await Ru(n.appConfig,s=>{if(!vA(s))throw Ei.create("not-registered");const o=s.authToken;if(!e&&LM(o))return s;if(o.requestStatus===1)return t=VM(n,e),s;{if(!navigator.onLine)throw Ei.create("app-offline");const a=UM(s);return t=MM(n,a),a}});return t?await t:r.authToken}async function VM(n,e){let t=await xy(n.appConfig);for(;t.authToken.requestStatus===1;)await _A(100),t=await xy(n.appConfig);const r=t.authToken;return r.requestStatus===0?Fp(n,e):r}function xy(n){return Ru(n,e=>{if(!vA(e))throw Ei.create("not-registered");const t=e.authToken;return BM(t)?{...e,authToken:{requestStatus:0}}:e})}async function MM(n,e){try{const t=await OM(n,e),r={...e,authToken:t};return await vl(n.appConfig,r),t}catch(t){if(hA(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await TA(n.appConfig);else{const r={...e,authToken:{requestStatus:0}};await vl(n.appConfig,r)}throw t}}function vA(n){return n!==void 0&&n.registrationStatus===2}function LM(n){return n.requestStatus===2&&!FM(n)}function FM(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+hM}function UM(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function BM(n){return n.requestStatus===1&&n.requestTime+cA<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qM(n){const e=n,{installationEntry:t,registrationPromise:r}=await Lp(e);return r?r.catch(console.error):Fp(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $M(n,e=!1){const t=n;return await WM(t),(await Fp(t,e)).token}async function WM(n){const{registrationPromise:e}=await Lp(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GM(n){if(!n||!n.options)throw Lh("App Configuration");if(!n.name)throw Lh("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Lh(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Lh(n){return Ei.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AA="installations",zM="installations-internal",jM=n=>{const e=n.getProvider("app").getImmediate(),t=GM(e),r=$t(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},HM=n=>{const e=n.getProvider("app").getImmediate(),t=$t(e,AA).getImmediate();return{getId:()=>qM(t),getToken:i=>$M(t,i)}};function KM(){ut(new Ge(AA,jM,"PUBLIC")),ut(new Ge(zM,HM,"PRIVATE"))}KM();$e(aA,Vp);$e(aA,Vp,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QM="/firebase-messaging-sw.js",YM="/firebase-cloud-messaging-push-scope",bA="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",JM="https://fcmregistrations.googleapis.com/v1",RA="google.c.a.c_id",XM="google.c.a.c_l",ZM="google.c.a.ts",e1="google.c.a.e",Vy=1e4;var My;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(My||(My={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var va;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(va||(va={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function t1(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(t),i=new Uint8Array(r.length);for(let s=0;s<r.length;++s)i[s]=r.charCodeAt(s);return i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh="fcm_token_details_db",n1=5,Ly="fcm_token_object_Store";async function r1(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(s=>s.name).includes(Fh))return null;let e=null;return(await Ul(Fh,n1,{upgrade:async(r,i,s,o)=>{if(i<2||!r.objectStoreNames.contains(Ly))return;const a=o.objectStore(Ly),l=await a.index("fcmSenderId").get(n);if(await a.clear(),!!l){if(i===2){const u=l;if(!u.auth||!u.p256dh||!u.endpoint)return;e={token:u.fcmToken,createTime:u.createTime??Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:yn(u.vapidKey)}}}else if(i===3){const u=l;e={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:yn(u.auth),p256dh:yn(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:yn(u.vapidKey)}}}else if(i===4){const u=l;e={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:yn(u.auth),p256dh:yn(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:yn(u.vapidKey)}}}}}})).close(),await _h(Fh),await _h("fcm_vapid_details_db"),await _h("undefined"),i1(e)?e:null}function i1(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s1="firebase-messaging-database",o1=1,Aa="firebase-messaging-store";let Uh=null;function SA(){return Uh||(Uh=Ul(s1,o1,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Aa)}}})),Uh}async function a1(n){const e=CA(n),r=await(await SA()).transaction(Aa).objectStore(Aa).get(e);if(r)return r;{const i=await r1(n.appConfig.senderId);if(i)return await Up(n,i),i}}async function Up(n,e){const t=CA(n),i=(await SA()).transaction(Aa,"readwrite");return await i.objectStore(Aa).put(e,t),await i.done,e}function CA({appConfig:n}){return n.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c1={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ct=new Mn("messaging","Messaging",c1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function l1(n,e){const t=await qp(n),r=PA(e),i={method:"POST",headers:t,body:JSON.stringify(r)};let s;try{s=await(await fetch(Bp(n.appConfig),i)).json()}catch(o){throw ct.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw ct.create("token-subscribe-failed",{errorInfo:o})}if(!s.token)throw ct.create("token-subscribe-no-token");return s.token}async function u1(n,e){const t=await qp(n),r=PA(e.subscriptionOptions),i={method:"PATCH",headers:t,body:JSON.stringify(r)};let s;try{s=await(await fetch(`${Bp(n.appConfig)}/${e.token}`,i)).json()}catch(o){throw ct.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw ct.create("token-update-failed",{errorInfo:o})}if(!s.token)throw ct.create("token-update-no-token");return s.token}async function h1(n,e){const r={method:"DELETE",headers:await qp(n)};try{const s=await(await fetch(`${Bp(n.appConfig)}/${e}`,r)).json();if(s.error){const o=s.error.message;throw ct.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw ct.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function Bp({projectId:n}){return`${JM}/projects/${n}/registrations`}async function qp({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function PA({p256dh:n,auth:e,endpoint:t,vapidKey:r}){const i={web:{endpoint:t,auth:e,p256dh:n}};return r!==bA&&(i.web.applicationPubKey=r),i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d1=10080*60*1e3;async function f1(n){const e=await m1(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:yn(e.getKey("auth")),p256dh:yn(e.getKey("p256dh"))},r=await a1(n.firebaseDependencies);if(r){if(g1(r.subscriptionOptions,t))return Date.now()>=r.createTime+d1?p1(n,{token:r.token,createTime:Date.now(),subscriptionOptions:t}):r.token;try{await h1(n.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Fy(n.firebaseDependencies,t)}else return Fy(n.firebaseDependencies,t)}async function p1(n,e){try{const t=await u1(n.firebaseDependencies,e),r={...e,token:t,createTime:Date.now()};return await Up(n.firebaseDependencies,r),t}catch(t){throw t}}async function Fy(n,e){const r={token:await l1(n,e),createTime:Date.now(),subscriptionOptions:e};return await Up(n,r),r.token}async function m1(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:t1(e)})}function g1(n,e){const t=e.vapidKey===n.vapidKey,r=e.endpoint===n.endpoint,i=e.auth===n.auth,s=e.p256dh===n.p256dh;return t&&r&&i&&s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return _1(e,n),y1(e,n),I1(e,n),e}function _1(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const r=e.notification.body;r&&(n.notification.body=r);const i=e.notification.image;i&&(n.notification.image=i);const s=e.notification.icon;s&&(n.notification.icon=s)}function y1(n,e){e.data&&(n.data=e.data)}function I1(n,e){var i,s,o,a;if(!e.fcmOptions&&!((i=e.notification)!=null&&i.click_action))return;n.fcmOptions={};const t=((s=e.fcmOptions)==null?void 0:s.link)??((o=e.notification)==null?void 0:o.click_action);t&&(n.fcmOptions.link=t);const r=(a=e.fcmOptions)==null?void 0:a.analytics_label;r&&(n.fcmOptions.analyticsLabel=r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E1(n){return typeof n=="object"&&!!n&&RA in n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T1(n){if(!n||!n.options)throw Bh("App Configuration Object");if(!n.name)throw Bh("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const r of e)if(!t[r])throw Bh(r);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function Bh(n){return ct.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w1{constructor(e,t,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=T1(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function v1(n){try{n.swRegistration=await navigator.serviceWorker.register(QM,{scope:YM}),n.swRegistration.update().catch(()=>{}),await A1(n.swRegistration)}catch(e){throw ct.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function A1(n){return new Promise((e,t)=>{const r=setTimeout(()=>t(new Error(`Service worker not registered after ${Vy} ms`)),Vy),i=n.installing||n.waiting;n.active?(clearTimeout(r),e()):i?i.onstatechange=s=>{var o;((o=s.target)==null?void 0:o.state)==="activated"&&(i.onstatechange=null,clearTimeout(r),e())}:(clearTimeout(r),t(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function b1(n,e){if(!e&&!n.swRegistration&&await v1(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ct.create("invalid-sw-registration");n.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function R1(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=bA)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kA(n,e){if(!navigator)throw ct.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ct.create("permission-blocked");return await R1(n,e==null?void 0:e.vapidKey),await b1(n,e==null?void 0:e.serviceWorkerRegistration),f1(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function S1(n,e,t){const r=C1(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:t[RA],message_name:t[XM],message_time:t[ZM],message_device_time:Math.floor(Date.now()/1e3)})}function C1(n){switch(n){case va.NOTIFICATION_CLICKED:return"notification_open";case va.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function P1(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===va.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(Uy(t)):n.onMessageHandler.next(Uy(t)));const r=t.data;E1(r)&&r[e1]==="1"&&await S1(n,t.messageType,r)}const By="@firebase/messaging",qy="0.12.24";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k1=n=>{const e=new w1(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>P1(e,t)),e},N1=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:r=>kA(e,r)}};function D1(){ut(new Ge("messaging",k1,"PUBLIC")),ut(new Ge("messaging-internal",N1,"PRIVATE")),$e(By,qy),$e(By,qy,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function O1(){try{await of()}catch{return!1}return typeof window<"u"&&Oa()&&JI()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x1(n,e){if(!navigator)throw ct.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y4(n=Vs()){return O1().then(e=>{if(!e)throw ct.create("unsupported-browser")},e=>{throw ct.create("indexed-db-unsupported")}),$t(M(n),"messaging").getImmediate()}async function J4(n,e){return n=M(n),kA(n,e)}function X4(n,e){return n=M(n),x1(n,e)}D1();var $y={};const Wy="@firebase/database",Gy="1.1.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let NA="";function $p(n){NA=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V1{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),qe(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:sa(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M1{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return tn(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DA=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new V1(e)}}catch{}return new M1},ni=DA("localStorage"),xd=DA("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=new xs("@firebase/database"),OA=(function(){let n=1;return function(){return n++}})(),xA=function(n){const e=AS(n),t=new ES;t.update(e);const r=t.digest();return Bl.encodeByteArray(r)},Ya=function(...n){let e="";for(let t=0;t<n.length;t++){const r=n[t];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Ya.apply(null,r):typeof r=="object"?e+=qe(r):e+=r,e+=" "}return e};let ai=null,zy=!0;const VA=function(n,e){V(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(rs.logLevel=re.VERBOSE,ai=rs.log.bind(rs),e&&xd.set("logging_enabled",!0)):typeof n=="function"?ai=n:(ai=null,xd.remove("logging_enabled"))},Xe=function(...n){if(zy===!0&&(zy=!1,ai===null&&xd.get("logging_enabled")===!0&&VA(!0)),ai){const e=Ya.apply(null,n);ai(e)}},Ja=function(n){return function(...e){Xe(n,...e)}},Vd=function(...n){const e="FIREBASE INTERNAL ERROR: "+Ya(...n);rs.error(e)},mn=function(...n){const e=`FIREBASE FATAL ERROR: ${Ya(...n)}`;throw rs.error(e),new Error(e)},lt=function(...n){const e="FIREBASE WARNING: "+Ya(...n);rs.warn(e)},L1=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&lt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Su=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},F1=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},wr="[MIN_NAME]",Vn="[MAX_NAME]",xi=function(n,e){if(n===e)return 0;if(n===wr||e===Vn)return-1;if(e===wr||n===Vn)return 1;{const t=jy(n),r=jy(e);return t!==null?r!==null?t-r===0?n.length-e.length:t-r:-1:r!==null?1:n<e?-1:1}},U1=function(n,e){return n===e?0:n<e?-1:1},Ro=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+qe(e))},Wp=function(n){if(typeof n!="object"||n===null)return qe(n);const e=[];for(const r in n)e.push(r);e.sort();let t="{";for(let r=0;r<e.length;r++)r!==0&&(t+=","),t+=qe(e[r]),t+=":",t+=Wp(n[e[r]]);return t+="}",t},MA=function(n,e){const t=n.length;if(t<=e)return[n];const r=[];for(let i=0;i<t;i+=e)i+e>t?r.push(n.substring(i,t)):r.push(n.substring(i,i+e));return r};function nt(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const LA=function(n){V(!Su(n),"Invalid JSON number");const e=11,t=52,r=(1<<e-1)-1;let i,s,o,a,l;n===0?(s=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),r),s=a+r,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-r-t))));const u=[];for(l=t;l;l-=1)u.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)u.push(s%2?1:0),s=Math.floor(s/2);u.push(i?1:0),u.reverse();const h=u.join("");let f="";for(l=0;l<64;l+=8){let m=parseInt(h.substr(l,8),2).toString(16);m.length===1&&(m="0"+m),f=f+m}return f.toLowerCase()},B1=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},q1=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function $1(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const r=new Error(n+" at "+e._path.toString()+": "+t);return r.code=n.toUpperCase(),r}const W1=new RegExp("^-?(0*)\\d{1,10}$"),G1=-2147483648,z1=2147483647,jy=function(n){if(W1.test(n)){const e=Number(n);if(e>=G1&&e<=z1)return e}return null},Xs=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw lt("Exception was thrown by user callback.",t),e},Math.floor(0))}},j1=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ea=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H1{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Ee(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){lt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K1{constructor(e,t,r){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Xe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',lt(e)}}class is{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}is.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp="5",FA="v",UA="s",BA="r",qA="f",$A=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,WA="ls",GA="p",Md="ac",zA="websocket",jA="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HA{constructor(e,t,r,i,s=!1,o="",a=!1,l=!1,u=null){this.secure=t,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ni.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ni.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Q1(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function KA(n,e,t){V(typeof e=="string","typeof type must == string"),V(typeof t=="object","typeof params must == object");let r;if(e===zA)r=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===jA)r=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Q1(n)&&(t.ns=n.namespace);const i=[];return nt(t,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y1{constructor(){this.counters_={}}incrementCounter(e,t=1){tn(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return sS(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh={},$h={};function zp(n){const e=n.toString();return qh[e]||(qh[e]=new Y1),qh[e]}function J1(n,e){const t=n.toString();return $h[t]||($h[t]=e()),$h[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X1{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&Xs(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy="start",Z1="close",eL="pLPCommand",tL="pRTLPCB",QA="id",YA="pw",JA="ser",nL="cb",rL="seg",iL="ts",sL="d",oL="dframe",XA=1870,ZA=30,aL=XA-ZA,cL=25e3,lL=3e4;class ir{constructor(e,t,r,i,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ja(e),this.stats_=zp(t),this.urlFn=l=>(this.appCheckToken&&(l[Md]=this.appCheckToken),KA(t,jA,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new X1(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(lL)),F1(()=>{if(this.isClosed_)return;this.scriptTagHolder=new jp((...s)=>{const[o,a,l,u,h]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Hy)this.id=a,this.password=l;else if(o===Z1)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[Hy]="t",r[JA]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[nL]=this.scriptTagHolder.uniqueCallbackIdentifier),r[FA]=Gp,this.transportSessionId&&(r[UA]=this.transportSessionId),this.lastSessionId&&(r[WA]=this.lastSessionId),this.applicationId&&(r[GA]=this.applicationId),this.appCheckToken&&(r[Md]=this.appCheckToken),typeof location<"u"&&location.hostname&&$A.test(location.hostname)&&(r[BA]=qA);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ir.forceAllow_=!0}static forceDisallow(){ir.forceDisallow_=!0}static isAvailable(){return ir.forceAllow_?!0:!ir.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!B1()&&!q1()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=qe(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=BI(t),i=MA(r,aL);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const r={};r[oL]="t",r[QA]=e,r[YA]=t,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=qe(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class jp{constructor(e,t,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=OA(),window[eL+this.uniqueCallbackIdentifier]=e,window[tL+this.uniqueCallbackIdentifier]=t,this.myIFrame=jp.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Xe("frame writing exception"),a.stack&&Xe(a.stack),Xe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Xe("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[QA]=this.myID,e[YA]=this.myPW,e[JA]=this.currentSerial;let t=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ZA+r.length<=XA;){const o=this.pendingSegs.shift();r=r+"&"+rL+i+"="+o.seg+"&"+iL+i+"="+o.ts+"&"+sL+i+"="+o.d,i++}return t=t+r,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,r){this.pendingSegs.push({seg:e,ts:t,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const r=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(r,Math.floor(cL)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),t())},r.onerror=()=>{Xe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uL=16384,hL=45e3;let Al=null;typeof MozWebSocket<"u"?Al=MozWebSocket:typeof WebSocket<"u"&&(Al=WebSocket);class Lt{constructor(e,t,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ja(this.connId),this.stats_=zp(t),this.connURL=Lt.connectionURL_(t,o,a,i,r),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,r,i,s){const o={};return o[FA]=Gp,typeof location<"u"&&location.hostname&&$A.test(location.hostname)&&(o[BA]=qA),t&&(o[UA]=t),r&&(o[WA]=r),i&&(o[Md]=i),s&&(o[GA]=s),KA(e,zA,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ni.set("previous_websocket_failure",!0);try{let r;pS(),this.mySock=new Al(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Lt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(t);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Al!==null&&!Lt.forceDisallow_}static previouslyFailed(){return ni.isInMemoryStorage||ni.get("previous_websocket_failure")===!0}markConnectionHealthy(){ni.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const r=sa(t);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(V(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const r=this.extractFrameCount_(t);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const t=qe(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=MA(t,uL);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(hL))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Lt.responsesRequiredToBeHealthy=2;Lt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{static get ALL_TRANSPORTS(){return[ir,Lt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Lt&&Lt.isAvailable();let r=t&&!Lt.previouslyFailed();if(e.webSocketOnly&&(t||lt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Lt];else{const i=this.transports_=[];for(const s of Cs.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);Cs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Cs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dL=6e4,fL=5e3,pL=10*1024,mL=100*1024,Wh="t",Ky="d",gL="s",Qy="r",_L="e",Yy="o",Jy="a",Xy="n",Zy="p",yL="h";class IL{constructor(e,t,r,i,s,o,a,l,u,h){this.id=e,this.repoInfo_=t,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=u,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ja("c:"+this.id+":"),this.transportManager_=new Cs(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=ea(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>mL?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>pL?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Wh in e){const t=e[Wh];t===Jy?this.upgradeIfSecondaryHealthy_():t===Qy?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Yy&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Ro("t",e),r=Ro("d",e);if(t==="c")this.onSecondaryControl_(r);else if(t==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Zy,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Jy,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Xy,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Ro("t",e),r=Ro("d",e);t==="c"?this.onControl_(r):t==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Ro(Wh,e);if(Ky in e){const r=e[Ky];if(t===yL){const i={...r};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Xy){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===gL?this.onConnectionShutdown_(r):t===Qy?this.onReset_(r):t===_L?Vd("Server Error: "+r):t===Yy?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Vd("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Gp!==r&&lt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,r),ea(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(dL))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ea(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(fL))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Zy,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ni.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{put(e,t,r,i){}merge(e,t,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,r){}onDisconnectMerge(e,t,r){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e){this.allowedEvents_=e,this.listeners_={},V(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,t)}}on(e,t,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:r});const i=this.getInitialEvent(e);i&&t.apply(r,i)}off(e,t,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){V(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl extends tb{static getInstance(){return new bl}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!sf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return V(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eI=32,tI=768;class le{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ae(){return new le("")}function J(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function vr(n){return n.pieces_.length-n.pieceNum_}function me(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new le(n.pieces_,e)}function Hp(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function EL(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function ba(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function nb(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new le(e,0)}function Re(n,e){const t=[];for(let r=n.pieceNum_;r<n.pieces_.length;r++)t.push(n.pieces_[r]);if(e instanceof le)for(let r=e.pieceNum_;r<e.pieces_.length;r++)t.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&t.push(r[i])}return new le(t,0)}function X(n){return n.pieceNum_>=n.pieces_.length}function mt(n,e){const t=J(n),r=J(e);if(t===null)return e;if(t===r)return mt(me(n),me(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function TL(n,e){const t=ba(n,0),r=ba(e,0);for(let i=0;i<t.length&&i<r.length;i++){const s=xi(t[i],r[i]);if(s!==0)return s}return t.length===r.length?0:t.length<r.length?-1:1}function Kp(n,e){if(vr(n)!==vr(e))return!1;for(let t=n.pieceNum_,r=e.pieceNum_;t<=n.pieces_.length;t++,r++)if(n.pieces_[t]!==e.pieces_[r])return!1;return!0}function Ft(n,e){let t=n.pieceNum_,r=e.pieceNum_;if(vr(n)>vr(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[r])return!1;++t,++r}return!0}class wL{constructor(e,t){this.errorPrefix_=t,this.parts_=ba(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Wl(this.parts_[r]);rb(this)}}function vL(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Wl(e),rb(n)}function AL(n){const e=n.parts_.pop();n.byteLength_-=Wl(e),n.parts_.length>0&&(n.byteLength_-=1)}function rb(n){if(n.byteLength_>tI)throw new Error(n.errorPrefix_+"has a key path longer than "+tI+" bytes ("+n.byteLength_+").");if(n.parts_.length>eI)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+eI+") or object contains a cycle "+Kr(n))}function Kr(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp extends tb{static getInstance(){return new Qp}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return V(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So=1e3,bL=300*1e3,nI=30*1e3,RL=1.3,SL=3e4,CL="server_kill",rI=3;class Ut extends eb{constructor(e,t,r,i,s,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ut.nextPersistentConnectionId_++,this.log_=Ja("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=So,this.maxReconnectDelay_=bL,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Qp.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&bl.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,r){const i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(qe(s)),V(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const t=new pt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),V(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),V(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(r)})}sendListen_(e){const t=e.query,r=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const l=a.d,u=a.s;Ut.warnOnListenWarnings_(l,t),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),u!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(u,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&tn(e,"w")){const r=li(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();lt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||IS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=nI)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=yS(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(t,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,r=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,r)})}unlisten(e,t){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),V(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,t)}sendUnlisten_(e,t,r,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:r})}onDisconnectMerge(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:r})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,r,i){const s={p:t,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,r,i){this.putInternal("p",e,t,r,i)}merge(e,t,r,i){this.putInternal("m",e,t,r,i)}putInternal(e,t,r,i,s){this.initConnection_();const o={p:t,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,r,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+qe(e));const t=e.r,r=this.requestCBHash_[t];r&&(delete this.requestCBHash_[t],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Vd("Unrecognized action received from server: "+qe(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){V(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=So,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=So,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>SL&&(this.reconnectDelay_=So),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*RL)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ut.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,r())},u=function(f){V(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(f)};this.realtime_={close:l,sendRequest:u};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[f,m]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?Xe("getToken() completed but was canceled"):(Xe("getToken() completed. Creating connection."),this.authToken_=f&&f.accessToken,this.appCheckToken_=m&&m.token,a=new IL(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,r,_=>{lt(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(CL)},s))}catch(f){this.log_("Failed to get token: "+f),o||(this.repoInfo_.nodeAdmin&&lt(f),l())}}}interrupt(e){Xe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Xe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Xc(this.interruptReasons_)&&(this.reconnectDelay_=So,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let r;t?r=t.map(s=>Wp(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const r=new le(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(t),s.delete(t),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,t){Xe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=rI&&(this.reconnectDelay_=nI,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Xe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=rI&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+NA.replace(/\./g,"-")]=1,sf()?e["framework.cordova"]=1:KI()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=bl.getInstance().currentlyOnline();return Xc(this.interruptReasons_)&&e}}Ut.nextPersistentConnectionId_=0;Ut.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new te(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const r=new te(wr,e),i=new te(wr,t);return this.compare(r,i)!==0}minPost(){return te.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nc;class ib extends Cu{static get __EMPTY_NODE(){return Nc}static set __EMPTY_NODE(e){Nc=e}compare(e,t){return xi(e.name,t.name)}isDefinedOn(e){throw Os("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return te.MIN}maxPost(){return new te(Vn,Nc)}makePost(e,t){return V(typeof e=="string","KeyIndex indexValue must always be a string."),new te(e,Nc)}toString(){return".key"}}const dn=new ib;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,t,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?r(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Je{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Je.RED,this.left=i??vt.EMPTY_NODE,this.right=s??vt.EMPTY_NODE}copy(e,t,r,i,s){return new Je(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return vt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let r,i;if(r=this,t(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),t(e,r.key)===0){if(r.right.isEmpty())return vt.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Je.RED=!0;Je.BLACK=!1;class PL{copy(e,t,r,i,s){return this}insert(e,t,r){return new Je(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class vt{constructor(e,t=vt.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new vt(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Je.BLACK,null,null))}remove(e){return new vt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Je.BLACK,null,null))}get(e){let t,r=this.root_;for(;!r.isEmpty();){if(t=this.comparator_(e,r.key),t===0)return r.value;t<0?r=r.left:t>0&&(r=r.right)}return null}getPredecessorKey(e){let t,r=this.root_,i=null;for(;!r.isEmpty();)if(t=this.comparator_(e,r.key),t===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else t<0?r=r.left:t>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Dc(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Dc(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Dc(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Dc(this.root_,null,this.comparator_,!0,e)}}vt.EMPTY_NODE=new PL;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kL(n,e){return xi(n.name,e.name)}function Yp(n,e){return xi(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ld;function NL(n){Ld=n}const sb=function(n){return typeof n=="number"?"number:"+LA(n):"string:"+n},ob=function(n){if(n.isLeafNode()){const e=n.val();V(typeof e=="string"||typeof e=="number"||typeof e=="object"&&tn(e,".sv"),"Priority must be a string or number.")}else V(n===Ld||n.isEmpty(),"priority of unexpected type.");V(n===Ld||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iI;class Ke{static set __childrenNodeConstructor(e){iI=e}static get __childrenNodeConstructor(){return iI}constructor(e,t=Ke.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,V(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ob(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ke(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ke.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return X(e)?this:J(e)===".priority"?this.priorityNode_:Ke.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Ke.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const r=J(e);return r===null?t:t.isEmpty()&&r!==".priority"?this:(V(r!==".priority"||vr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Ke.__childrenNodeConstructor.EMPTY_NODE.updateChild(me(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+sb(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=LA(this.value_):e+=this.value_,this.lazyHash_=xA(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ke.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ke.__childrenNodeConstructor?-1:(V(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,r=typeof this.value_,i=Ke.VALUE_TYPE_ORDER.indexOf(t),s=Ke.VALUE_TYPE_ORDER.indexOf(r);return V(i>=0,"Unknown leaf type: "+t),V(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Ke.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ab,cb;function DL(n){ab=n}function OL(n){cb=n}class xL extends Cu{compare(e,t){const r=e.node.getPriority(),i=t.node.getPriority(),s=r.compareTo(i);return s===0?xi(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return te.MIN}maxPost(){return new te(Vn,new Ke("[PRIORITY-POST]",cb))}makePost(e,t){const r=ab(e);return new te(t,new Ke("[PRIORITY-POST]",r))}toString(){return".priority"}}const _e=new xL;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VL=Math.log(2);class ML{constructor(e){const t=s=>parseInt(Math.log(s)/VL,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Rl=function(n,e,t,r){n.sort(e);const i=function(l,u){const h=u-l;let f,m;if(h===0)return null;if(h===1)return f=n[l],m=t?t(f):f,new Je(m,f.node,Je.BLACK,null,null);{const _=parseInt(h/2,10)+l,v=i(l,_),P=i(_+1,u);return f=n[_],m=t?t(f):f,new Je(m,f.node,Je.BLACK,v,P)}},s=function(l){let u=null,h=null,f=n.length;const m=function(v,P){const k=f-v,U=f;f-=v;const $=i(k+1,U),q=n[k],H=t?t(q):q;_(new Je(H,q.node,P,null,$))},_=function(v){u?(u.left=v,u=v):(h=v,u=v)};for(let v=0;v<l.count;++v){const P=l.nextBitIsOne(),k=Math.pow(2,l.count-(v+1));P?m(k,Je.BLACK):(m(k,Je.BLACK),m(k,Je.RED))}return h},o=new ML(n.length),a=s(o);return new vt(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gh;const ji={};class Sn{static get Default(){return V(ji&&_e,"ChildrenNode.ts has not been loaded"),Gh=Gh||new Sn({".priority":ji},{".priority":_e}),Gh}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=li(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof vt?t:null}hasIndex(e){return tn(this.indexSet_,e.toString())}addIndex(e,t){V(e!==dn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=t.getIterator(te.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=Rl(r,e.getCompare()):a=ji;const l=e.toString(),u={...this.indexSet_};u[l]=e;const h={...this.indexes_};return h[l]=a,new Sn(h,u)}addToIndexes(e,t){const r=Zc(this.indexes_,(i,s)=>{const o=li(this.indexSet_,s);if(V(o,"Missing index implementation for "+s),i===ji)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(te.Wrap);let u=l.getNext();for(;u;)u.name!==e.name&&a.push(u),u=l.getNext();return a.push(e),Rl(a,o.getCompare())}else return ji;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new te(e.name,a))),l.insert(e,e.node)}});return new Sn(r,this.indexSet_)}removeFromIndexes(e,t){const r=Zc(this.indexes_,i=>{if(i===ji)return i;{const s=t.get(e.name);return s?i.remove(new te(e.name,s)):i}});return new Sn(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Co;class j{static get EMPTY_NODE(){return Co||(Co=new j(new vt(Yp),null,Sn.Default))}constructor(e,t,r){this.children_=e,this.priorityNode_=t,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&ob(this.priorityNode_),this.children_.isEmpty()&&V(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Co}updatePriority(e){return this.children_.isEmpty()?this:new j(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Co:t}}getChild(e){const t=J(e);return t===null?this:this.getImmediateChild(t).getChild(me(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(V(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const r=new te(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?Co:this.priorityNode_;return new j(i,o,s)}}updateChild(e,t){const r=J(e);if(r===null)return t;{V(J(e)!==".priority"||vr(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(me(e),t);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let r=0,i=0,s=!0;if(this.forEachChild(_e,(o,a)=>{t[o]=a.val(e),r++,s&&j.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+sb(this.getPriority().val())+":"),this.forEachChild(_e,(t,r)=>{const i=r.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":xA(e)}return this.lazyHash_}getPredecessorChildName(e,t,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new te(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new te(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new te(t,this.children_.get(t)):null}forEachChild(e,t){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,te.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,te.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Xa?-1:0}withIndex(e){if(e===dn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new j(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===dn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const r=this.getIterator(_e),i=t.getIterator(_e);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===dn?null:this.indexMap_.get(e.toString())}}j.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class LL extends j{constructor(){super(new vt(Yp),j.EMPTY_NODE,Sn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return j.EMPTY_NODE}isEmpty(){return!1}}const Xa=new LL;Object.defineProperties(te,{MIN:{value:new te(wr,j.EMPTY_NODE)},MAX:{value:new te(Vn,Xa)}});ib.__EMPTY_NODE=j.EMPTY_NODE;Ke.__childrenNodeConstructor=j;NL(Xa);OL(Xa);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FL=!0;function Ce(n,e=null){if(n===null)return j.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),V(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Ke(t,Ce(e))}if(!(n instanceof Array)&&FL){const t=[];let r=!1;if(nt(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=Ce(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),t.push(new te(o,l)))}}),t.length===0)return j.EMPTY_NODE;const s=Rl(t,kL,o=>o.name,Yp);if(r){const o=Rl(t,_e.getCompare());return new j(s,Ce(e),new Sn({".priority":o},{".priority":_e}))}else return new j(s,Ce(e),Sn.Default)}else{let t=j.EMPTY_NODE;return nt(n,(r,i)=>{if(tn(n,r)&&r.substring(0,1)!=="."){const s=Ce(i);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(r,s))}}),t.updatePriority(Ce(e))}}DL(Ce);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jp extends Cu{constructor(e){super(),this.indexPath_=e,V(!X(e)&&J(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const r=this.extractChild(e.node),i=this.extractChild(t.node),s=r.compareTo(i);return s===0?xi(e.name,t.name):s}makePost(e,t){const r=Ce(e),i=j.EMPTY_NODE.updateChild(this.indexPath_,r);return new te(t,i)}maxPost(){const e=j.EMPTY_NODE.updateChild(this.indexPath_,Xa);return new te(Vn,e)}toString(){return ba(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UL extends Cu{compare(e,t){const r=e.node.compareTo(t.node);return r===0?xi(e.name,t.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return te.MIN}maxPost(){return te.MAX}makePost(e,t){const r=Ce(e);return new te(t,r)}toString(){return".value"}}const Xp=new UL;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lb(n){return{type:"value",snapshotNode:n}}function Ps(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ra(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Sa(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function BL(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e){this.index_=e}updateChild(e,t,r,i,s,o){V(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(t)?o.trackChildChange(Ra(t,a)):V(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Ps(t,r)):o.trackChildChange(Sa(t,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(t,r).withIndex(this.index_)}updateFullNode(e,t,r){return r!=null&&(e.isLeafNode()||e.forEachChild(_e,(i,s)=>{t.hasChild(i)||r.trackChildChange(Ra(i,s))}),t.isLeafNode()||t.forEachChild(_e,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(Sa(i,s,o))}else r.trackChildChange(Ps(i,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?j.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e){this.indexedFilter_=new Zp(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ca.getStartPost_(e),this.endPost_=Ca.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&r}updateChild(e,t,r,i,s,o){return this.matches(new te(t,r))||(r=j.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,r,i,s,o)}updateFullNode(e,t,r){t.isLeafNode()&&(t=j.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(j.EMPTY_NODE);const s=this;return t.forEachChild(_e,(o,a)=>{s.matches(new te(o,a))||(i=i.updateImmediateChild(o,j.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qL{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=t=>{const r=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Ca(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,r,i,s,o){return this.rangedFilter_.matches(new te(t,r))||(r=j.EMPTY_NODE),e.getImmediateChild(t).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,r,i,s,o):this.fullLimitUpdateChild_(e,t,r,s,o)}updateFullNode(e,t,r){let i;if(t.isLeafNode()||t.isEmpty())i=j.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=j.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(j.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,j.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,r,i,s){let o;if(this.reverse_){const f=this.index_.getCompare();o=(m,_)=>f(_,m)}else o=this.index_.getCompare();const a=e;V(a.numChildren()===this.limit_,"");const l=new te(t,r),u=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const f=a.getImmediateChild(t);let m=i.getChildAfterChild(this.index_,u,this.reverse_);for(;m!=null&&(m.name===t||a.hasChild(m.name));)m=i.getChildAfterChild(this.index_,m,this.reverse_);const _=m==null?1:o(m,l);if(h&&!r.isEmpty()&&_>=0)return s!=null&&s.trackChildChange(Sa(t,r,f)),a.updateImmediateChild(t,r);{s!=null&&s.trackChildChange(Ra(t,f));const P=a.updateImmediateChild(t,j.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(s!=null&&s.trackChildChange(Ps(m.name,m.node)),P.updateImmediateChild(m.name,m.node)):P}}else return r.isEmpty()?e:h&&o(u,l)>=0?(s!=null&&(s.trackChildChange(Ra(u.name,u.node)),s.trackChildChange(Ps(t,r))),a.updateImmediateChild(t,r).updateImmediateChild(u.name,j.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=_e}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return V(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return V(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:wr}hasEnd(){return this.endSet_}getIndexEndValue(){return V(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return V(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Vn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return V(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===_e}copy(){const e=new Pu;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function $L(n){return n.loadsAllData()?new Zp(n.getIndex()):n.hasLimit()?new qL(n):new Ca(n)}function WL(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="l",t}function GL(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Fd(n,e,t){const r=n.copy();return r.startSet_=!0,e===void 0&&(e=null),r.indexStartValue_=e,t!=null?(r.startNameSet_=!0,r.indexStartName_=t):(r.startNameSet_=!1,r.indexStartName_=""),r}function zL(n,e,t){let r;return n.index_===dn||t?r=Fd(n,e,t):r=Fd(n,e,Vn),r.startAfterSet_=!0,r}function Ud(n,e,t){const r=n.copy();return r.endSet_=!0,e===void 0&&(e=null),r.indexEndValue_=e,t!==void 0?(r.endNameSet_=!0,r.indexEndName_=t):(r.endNameSet_=!1,r.indexEndName_=""),r}function jL(n,e,t){let r;return n.index_===dn||t?r=Ud(n,e,t):r=Ud(n,e,wr),r.endBeforeSet_=!0,r}function ku(n,e){const t=n.copy();return t.index_=e,t}function sI(n){const e={};if(n.isDefault())return e;let t;if(n.index_===_e?t="$priority":n.index_===Xp?t="$value":n.index_===dn?t="$key":(V(n.index_ instanceof Jp,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=qe(t),n.startSet_){const r=n.startAfterSet_?"startAfter":"startAt";e[r]=qe(n.indexStartValue_),n.startNameSet_&&(e[r]+=","+qe(n.indexStartName_))}if(n.endSet_){const r=n.endBeforeSet_?"endBefore":"endAt";e[r]=qe(n.indexEndValue_),n.endNameSet_&&(e[r]+=","+qe(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function oI(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==_e&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl extends eb{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(V(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Ja("p:rest:"),this.listens_={}}listen(e,t,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Sl.getListenId_(e,r),a={};this.listens_[o]=a;const l=sI(e._queryParams);this.restRequest_(s+".json",l,(u,h)=>{let f=h;if(u===404&&(f=null,u=null),u===null&&this.onDataUpdate_(s,f,!1,r),li(this.listens_,o)===a){let m;u?u===401?m="permission_denied":m="rest_error:"+u:m="ok",i(m,null)}})}unlisten(e,t){const r=Sl.getListenId_(e,t);delete this.listens_[r]}get(e){const t=sI(e._queryParams),r=e._path.toString(),i=new pt;return this.restRequest_(r+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},r){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ri(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=sa(a.responseText)}catch{lt("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&lt("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HL{constructor(){this.rootNode_=j.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(){return{value:null,children:new Map}}function Zs(n,e,t){if(X(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const r=J(e);n.children.has(r)||n.children.set(r,Cl());const i=n.children.get(r);e=me(e),Zs(i,e,t)}}function Bd(n,e){if(X(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(_e,(r,i)=>{Zs(n,new le(r),i)}),Bd(n,e)}}else if(n.children.size>0){const t=J(e);return e=me(e),n.children.has(t)&&Bd(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function qd(n,e,t){n.value!==null?t(e,n.value):KL(n,(r,i)=>{const s=new le(e.toString()+"/"+r);qd(i,s,t)})}function KL(n,e){n.children.forEach((t,r)=>{e(r,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QL{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&nt(this.last_,(r,i)=>{t[r]=t[r]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aI=10*1e3,YL=30*1e3,JL=300*1e3;class XL{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new QL(e);const r=aI+(YL-aI)*Math.random();ea(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),t={};let r=!1;nt(e,(i,s)=>{s>0&&tn(this.statsToReport_,i)&&(t[i]=s,r=!0)}),r&&this.server_.reportStats(t),ea(this.reportStats_.bind(this),Math.floor(Math.random()*2*JL))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ht;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ht||(Ht={}));function em(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function tm(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function nm(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e,t,r){this.path=e,this.affectedTree=t,this.revert=r,this.type=Ht.ACK_USER_WRITE,this.source=em()}operationForChild(e){if(X(this.path)){if(this.affectedTree.value!=null)return V(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new le(e));return new Pl(ae(),t,this.revert)}}else return V(J(this.path)===e,"operationForChild called for unrelated child."),new Pl(me(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,t){this.source=e,this.path=t,this.type=Ht.LISTEN_COMPLETE}operationForChild(e){return X(this.path)?new Pa(this.source,ae()):new Pa(this.source,me(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,t,r){this.source=e,this.path=t,this.snap=r,this.type=Ht.OVERWRITE}operationForChild(e){return X(this.path)?new wi(this.source,ae(),this.snap.getImmediateChild(e)):new wi(this.source,me(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e,t,r){this.source=e,this.path=t,this.children=r,this.type=Ht.MERGE}operationForChild(e){if(X(this.path)){const t=this.children.subtree(new le(e));return t.isEmpty()?null:t.value?new wi(this.source,ae(),t.value):new ks(this.source,ae(),t)}else return V(J(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ks(this.source,me(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e,t,r){this.node_=e,this.fullyInitialized_=t,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(X(e))return this.isFullyInitialized()&&!this.filtered_;const t=J(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZL{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function eF(n,e,t,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(BL(o.childName,o.snapshotNode))}),Po(n,i,"child_removed",e,r,t),Po(n,i,"child_added",e,r,t),Po(n,i,"child_moved",s,r,t),Po(n,i,"child_changed",e,r,t),Po(n,i,"value",e,r,t),i}function Po(n,e,t,r,i,s){const o=r.filter(a=>a.type===t);o.sort((a,l)=>nF(n,a,l)),o.forEach(a=>{const l=tF(n,a,s);i.forEach(u=>{u.respondsTo(a.type)&&e.push(u.createEvent(l,n.query_))})})}function tF(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function nF(n,e,t){if(e.childName==null||t.childName==null)throw Os("Should only compare child_ events.");const r=new te(e.childName,e.snapshotNode),i=new te(t.childName,t.snapshotNode);return n.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(n,e){return{eventCache:n,serverCache:e}}function ta(n,e,t,r){return Nu(new Ar(e,t,r),n.serverCache)}function ub(n,e,t,r){return Nu(n.eventCache,new Ar(e,t,r))}function kl(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function vi(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zh;const rF=()=>(zh||(zh=new vt(U1)),zh);class ge{static fromObject(e){let t=new ge(null);return nt(e,(r,i)=>{t=t.set(new le(r),i)}),t}constructor(e,t=rF()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ae(),value:this.value};if(X(e))return null;{const r=J(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(me(e),t);return s!=null?{path:Re(new le(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(X(e))return this;{const t=J(e),r=this.children.get(t);return r!==null?r.subtree(me(e)):new ge(null)}}set(e,t){if(X(e))return new ge(t,this.children);{const r=J(e),s=(this.children.get(r)||new ge(null)).set(me(e),t),o=this.children.insert(r,s);return new ge(this.value,o)}}remove(e){if(X(e))return this.children.isEmpty()?new ge(null):new ge(null,this.children);{const t=J(e),r=this.children.get(t);if(r){const i=r.remove(me(e));let s;return i.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,i),this.value===null&&s.isEmpty()?new ge(null):new ge(this.value,s)}else return this}}get(e){if(X(e))return this.value;{const t=J(e),r=this.children.get(t);return r?r.get(me(e)):null}}setTree(e,t){if(X(e))return t;{const r=J(e),s=(this.children.get(r)||new ge(null)).setTree(me(e),t);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new ge(this.value,o)}}fold(e){return this.fold_(ae(),e)}fold_(e,t){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(Re(e,i),t)}),t(e,this.value,r)}findOnPath(e,t){return this.findOnPath_(e,ae(),t)}findOnPath_(e,t,r){const i=this.value?r(t,this.value):!1;if(i)return i;if(X(e))return null;{const s=J(e),o=this.children.get(s);return o?o.findOnPath_(me(e),Re(t,s),r):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ae(),t)}foreachOnPath_(e,t,r){if(X(e))return this;{this.value&&r(t,this.value);const i=J(e),s=this.children.get(i);return s?s.foreachOnPath_(me(e),Re(t,i),r):new ge(null)}}foreach(e){this.foreach_(ae(),e)}foreach_(e,t){this.children.inorderTraversal((r,i)=>{i.foreach_(Re(e,r),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,r)=>{r.value&&e(t,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.writeTree_=e}static empty(){return new Xt(new ge(null))}}function na(n,e,t){if(X(e))return new Xt(new ge(t));{const r=n.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=mt(i,e);return s=s.updateChild(o,t),new Xt(n.writeTree_.set(i,s))}else{const i=new ge(t),s=n.writeTree_.setTree(e,i);return new Xt(s)}}}function $d(n,e,t){let r=n;return nt(t,(i,s)=>{r=na(r,Re(e,i),s)}),r}function cI(n,e){if(X(e))return Xt.empty();{const t=n.writeTree_.setTree(e,new ge(null));return new Xt(t)}}function Wd(n,e){return Vi(n,e)!=null}function Vi(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(mt(t.path,e)):null}function lI(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(_e,(r,i)=>{e.push(new te(r,i))}):n.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new te(r,i.value))}),e}function dr(n,e){if(X(e))return n;{const t=Vi(n,e);return t!=null?new Xt(new ge(t)):new Xt(n.writeTree_.subtree(e))}}function Gd(n){return n.writeTree_.isEmpty()}function Ns(n,e){return hb(ae(),n.writeTree_,e)}function hb(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(V(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):t=hb(Re(n,i),s,t)}),!t.getChild(n).isEmpty()&&r!==null&&(t=t.updateChild(Re(n,".priority"),r)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Du(n,e){return mb(e,n)}function iF(n,e,t,r,i){V(r>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:r,visible:i}),i&&(n.visibleWrites=na(n.visibleWrites,e,t)),n.lastWriteId=r}function sF(n,e,t,r){V(r>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:r,visible:!0}),n.visibleWrites=$d(n.visibleWrites,e,t),n.lastWriteId=r}function oF(n,e){for(let t=0;t<n.allWrites.length;t++){const r=n.allWrites[t];if(r.writeId===e)return r}return null}function aF(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);V(t>=0,"removeWrite called with nonexistent writeId.");const r=n.allWrites[t];n.allWrites.splice(t,1);let i=r.visible,s=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&cF(a,r.path)?i=!1:Ft(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return lF(n),!0;if(r.snap)n.visibleWrites=cI(n.visibleWrites,r.path);else{const a=r.children;nt(a,l=>{n.visibleWrites=cI(n.visibleWrites,Re(r.path,l))})}return!0}else return!1}function cF(n,e){if(n.snap)return Ft(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Ft(Re(n.path,t),e))return!0;return!1}function lF(n){n.visibleWrites=db(n.allWrites,uF,ae()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function uF(n){return n.visible}function db(n,e,t){let r=Xt.empty();for(let i=0;i<n.length;++i){const s=n[i];if(e(s)){const o=s.path;let a;if(s.snap)Ft(t,o)?(a=mt(t,o),r=na(r,a,s.snap)):Ft(o,t)&&(a=mt(o,t),r=na(r,ae(),s.snap.getChild(a)));else if(s.children){if(Ft(t,o))a=mt(t,o),r=$d(r,a,s.children);else if(Ft(o,t))if(a=mt(o,t),X(a))r=$d(r,ae(),s.children);else{const l=li(s.children,J(a));if(l){const u=l.getChild(me(a));r=na(r,ae(),u)}}}else throw Os("WriteRecord should have .snap or .children")}}return r}function fb(n,e,t,r,i){if(!r&&!i){const s=Vi(n.visibleWrites,e);if(s!=null)return s;{const o=dr(n.visibleWrites,e);if(Gd(o))return t;if(t==null&&!Wd(o,ae()))return null;{const a=t||j.EMPTY_NODE;return Ns(o,a)}}}else{const s=dr(n.visibleWrites,e);if(!i&&Gd(s))return t;if(!i&&t==null&&!Wd(s,ae()))return null;{const o=function(u){return(u.visible||i)&&(!r||!~r.indexOf(u.writeId))&&(Ft(u.path,e)||Ft(e,u.path))},a=db(n.allWrites,o,e),l=t||j.EMPTY_NODE;return Ns(a,l)}}}function hF(n,e,t){let r=j.EMPTY_NODE;const i=Vi(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(_e,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(t){const s=dr(n.visibleWrites,e);return t.forEachChild(_e,(o,a)=>{const l=Ns(dr(s,new le(o)),a);r=r.updateImmediateChild(o,l)}),lI(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=dr(n.visibleWrites,e);return lI(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function dF(n,e,t,r,i){V(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=Re(e,t);if(Wd(n.visibleWrites,s))return null;{const o=dr(n.visibleWrites,s);return Gd(o)?i.getChild(t):Ns(o,i.getChild(t))}}function fF(n,e,t,r){const i=Re(e,t),s=Vi(n.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(t)){const o=dr(n.visibleWrites,i);return Ns(o,r.getNode().getImmediateChild(t))}else return null}function pF(n,e){return Vi(n.visibleWrites,e)}function mF(n,e,t,r,i,s,o){let a;const l=dr(n.visibleWrites,e),u=Vi(l,ae());if(u!=null)a=u;else if(t!=null)a=Ns(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],f=o.getCompare(),m=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let _=m.getNext();for(;_&&h.length<i;)f(_,r)!==0&&h.push(_),_=m.getNext();return h}else return[]}function gF(){return{visibleWrites:Xt.empty(),allWrites:[],lastWriteId:-1}}function Nl(n,e,t,r){return fb(n.writeTree,n.treePath,e,t,r)}function rm(n,e){return hF(n.writeTree,n.treePath,e)}function uI(n,e,t,r){return dF(n.writeTree,n.treePath,e,t,r)}function Dl(n,e){return pF(n.writeTree,Re(n.treePath,e))}function _F(n,e,t,r,i,s){return mF(n.writeTree,n.treePath,e,t,r,i,s)}function im(n,e,t){return fF(n.writeTree,n.treePath,e,t)}function pb(n,e){return mb(Re(n.treePath,e),n.writeTree)}function mb(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yF{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,r=e.childName;V(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),V(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(r,Sa(r,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(r,Ra(r,i.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(r,Ps(r,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(r,Sa(r,e.snapshotNode,i.oldSnap));else throw Os("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IF{getCompleteChild(e){return null}getChildAfterChild(e,t,r){return null}}const gb=new IF;class sm{constructor(e,t,r=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=r}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Ar(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return im(this.writes_,e,r)}}getChildAfterChild(e,t,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:vi(this.viewCache_),s=_F(this.writes_,i,t,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EF(n){return{filter:n}}function TF(n,e){V(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),V(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function wF(n,e,t,r,i){const s=new yF;let o,a;if(t.type===Ht.OVERWRITE){const u=t;u.source.fromUser?o=zd(n,e,u.path,u.snap,r,i,s):(V(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered()&&!X(u.path),o=Ol(n,e,u.path,u.snap,r,i,a,s))}else if(t.type===Ht.MERGE){const u=t;u.source.fromUser?o=AF(n,e,u.path,u.children,r,i,s):(V(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered(),o=jd(n,e,u.path,u.children,r,i,a,s))}else if(t.type===Ht.ACK_USER_WRITE){const u=t;u.revert?o=SF(n,e,u.path,r,i,s):o=bF(n,e,u.path,u.affectedTree,r,i,s)}else if(t.type===Ht.LISTEN_COMPLETE)o=RF(n,e,t.path,r,s);else throw Os("Unknown operation type: "+t.type);const l=s.getChanges();return vF(e,o,l),{viewCache:o,changes:l}}function vF(n,e,t){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=kl(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&t.push(lb(kl(e)))}}function _b(n,e,t,r,i,s){const o=e.eventCache;if(Dl(r,t)!=null)return e;{let a,l;if(X(t))if(V(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const u=vi(e),h=u instanceof j?u:j.EMPTY_NODE,f=rm(r,h);a=n.filter.updateFullNode(e.eventCache.getNode(),f,s)}else{const u=Nl(r,vi(e));a=n.filter.updateFullNode(e.eventCache.getNode(),u,s)}else{const u=J(t);if(u===".priority"){V(vr(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const f=uI(r,t,h,l);f!=null?a=n.filter.updatePriority(h,f):a=o.getNode()}else{const h=me(t);let f;if(o.isCompleteForChild(u)){l=e.serverCache.getNode();const m=uI(r,t,o.getNode(),l);m!=null?f=o.getNode().getImmediateChild(u).updateChild(h,m):f=o.getNode().getImmediateChild(u)}else f=im(r,u,e.serverCache);f!=null?a=n.filter.updateChild(o.getNode(),u,f,h,i,s):a=o.getNode()}}return ta(e,a,o.isFullyInitialized()||X(t),n.filter.filtersNodes())}}function Ol(n,e,t,r,i,s,o,a){const l=e.serverCache;let u;const h=o?n.filter:n.filter.getIndexedFilter();if(X(t))u=h.updateFullNode(l.getNode(),r,null);else if(h.filtersNodes()&&!l.isFiltered()){const _=l.getNode().updateChild(t,r);u=h.updateFullNode(l.getNode(),_,null)}else{const _=J(t);if(!l.isCompleteForPath(t)&&vr(t)>1)return e;const v=me(t),k=l.getNode().getImmediateChild(_).updateChild(v,r);_===".priority"?u=h.updatePriority(l.getNode(),k):u=h.updateChild(l.getNode(),_,k,v,gb,null)}const f=ub(e,u,l.isFullyInitialized()||X(t),h.filtersNodes()),m=new sm(i,f,s);return _b(n,f,t,i,m,a)}function zd(n,e,t,r,i,s,o){const a=e.eventCache;let l,u;const h=new sm(i,e,s);if(X(t))u=n.filter.updateFullNode(e.eventCache.getNode(),r,o),l=ta(e,u,!0,n.filter.filtersNodes());else{const f=J(t);if(f===".priority")u=n.filter.updatePriority(e.eventCache.getNode(),r),l=ta(e,u,a.isFullyInitialized(),a.isFiltered());else{const m=me(t),_=a.getNode().getImmediateChild(f);let v;if(X(m))v=r;else{const P=h.getCompleteChild(f);P!=null?Hp(m)===".priority"&&P.getChild(nb(m)).isEmpty()?v=P:v=P.updateChild(m,r):v=j.EMPTY_NODE}if(_.equals(v))l=e;else{const P=n.filter.updateChild(a.getNode(),f,v,m,h,o);l=ta(e,P,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function hI(n,e){return n.eventCache.isCompleteForChild(e)}function AF(n,e,t,r,i,s,o){let a=e;return r.foreach((l,u)=>{const h=Re(t,l);hI(e,J(h))&&(a=zd(n,a,h,u,i,s,o))}),r.foreach((l,u)=>{const h=Re(t,l);hI(e,J(h))||(a=zd(n,a,h,u,i,s,o))}),a}function dI(n,e,t){return t.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function jd(n,e,t,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,u;X(t)?u=r:u=new ge(null).setTree(t,r);const h=e.serverCache.getNode();return u.children.inorderTraversal((f,m)=>{if(h.hasChild(f)){const _=e.serverCache.getNode().getImmediateChild(f),v=dI(n,_,m);l=Ol(n,l,new le(f),v,i,s,o,a)}}),u.children.inorderTraversal((f,m)=>{const _=!e.serverCache.isCompleteForChild(f)&&m.value===null;if(!h.hasChild(f)&&!_){const v=e.serverCache.getNode().getImmediateChild(f),P=dI(n,v,m);l=Ol(n,l,new le(f),P,i,s,o,a)}}),l}function bF(n,e,t,r,i,s,o){if(Dl(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(X(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Ol(n,e,t,l.getNode().getChild(t),i,s,a,o);if(X(t)){let u=new ge(null);return l.getNode().forEachChild(dn,(h,f)=>{u=u.set(new le(h),f)}),jd(n,e,t,u,i,s,a,o)}else return e}else{let u=new ge(null);return r.foreach((h,f)=>{const m=Re(t,h);l.isCompleteForPath(m)&&(u=u.set(h,l.getNode().getChild(m)))}),jd(n,e,t,u,i,s,a,o)}}function RF(n,e,t,r,i){const s=e.serverCache,o=ub(e,s.getNode(),s.isFullyInitialized()||X(t),s.isFiltered());return _b(n,o,t,r,gb,i)}function SF(n,e,t,r,i,s){let o;if(Dl(r,t)!=null)return e;{const a=new sm(r,e,i),l=e.eventCache.getNode();let u;if(X(t)||J(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Nl(r,vi(e));else{const f=e.serverCache.getNode();V(f instanceof j,"serverChildren would be complete if leaf node"),h=rm(r,f)}h=h,u=n.filter.updateFullNode(l,h,s)}else{const h=J(t);let f=im(r,h,e.serverCache);f==null&&e.serverCache.isCompleteForChild(h)&&(f=l.getImmediateChild(h)),f!=null?u=n.filter.updateChild(l,h,f,me(t),a,s):e.eventCache.getNode().hasChild(h)?u=n.filter.updateChild(l,h,j.EMPTY_NODE,me(t),a,s):u=l,u.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Nl(r,vi(e)),o.isLeafNode()&&(u=n.filter.updateFullNode(u,o,s)))}return o=e.serverCache.isFullyInitialized()||Dl(r,ae())!=null,ta(e,u,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CF{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Zp(r.getIndex()),s=$L(r);this.processor_=EF(s);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(j.EMPTY_NODE,o.getNode(),null),u=s.updateFullNode(j.EMPTY_NODE,a.getNode(),null),h=new Ar(l,o.isFullyInitialized(),i.filtersNodes()),f=new Ar(u,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Nu(f,h),this.eventGenerator_=new ZL(this.query_)}get query(){return this.query_}}function PF(n){return n.viewCache_.serverCache.getNode()}function kF(n){return kl(n.viewCache_)}function NF(n,e){const t=vi(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!X(e)&&!t.getImmediateChild(J(e)).isEmpty())?t.getChild(e):null}function fI(n){return n.eventRegistrations_.length===0}function DF(n,e){n.eventRegistrations_.push(e)}function pI(n,e,t){const r=[];if(t){V(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(t,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<n.eventRegistrations_.length;++s){const o=n.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(s+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return r}function mI(n,e,t,r){e.type===Ht.MERGE&&e.source.queryId!==null&&(V(vi(n.viewCache_),"We should always have a full cache before handling merges"),V(kl(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,s=wF(n.processor_,i,e,t,r);return TF(n.processor_,s.viewCache),V(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,yb(n,s.changes,s.viewCache.eventCache.getNode(),null)}function OF(n,e){const t=n.viewCache_.eventCache,r=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(_e,(s,o)=>{r.push(Ps(s,o))}),t.isFullyInitialized()&&r.push(lb(t.getNode())),yb(n,r,t.getNode(),e)}function yb(n,e,t,r){const i=r?[r]:n.eventRegistrations_;return eF(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xl;class Ib{constructor(){this.views=new Map}}function xF(n){V(!xl,"__referenceConstructor has already been defined"),xl=n}function VF(){return V(xl,"Reference.ts has not been loaded"),xl}function MF(n){return n.views.size===0}function om(n,e,t,r){const i=e.source.queryId;if(i!==null){const s=n.views.get(i);return V(s!=null,"SyncTree gave us an op for an invalid query."),mI(s,e,t,r)}else{let s=[];for(const o of n.views.values())s=s.concat(mI(o,e,t,r));return s}}function Eb(n,e,t,r,i){const s=e._queryIdentifier,o=n.views.get(s);if(!o){let a=Nl(t,i?r:null),l=!1;a?l=!0:r instanceof j?(a=rm(t,r),l=!1):(a=j.EMPTY_NODE,l=!1);const u=Nu(new Ar(a,l,!1),new Ar(r,i,!1));return new CF(e,u)}return o}function LF(n,e,t,r,i,s){const o=Eb(n,e,r,i,s);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),DF(o,t),OF(o,t)}function FF(n,e,t,r){const i=e._queryIdentifier,s=[];let o=[];const a=br(n);if(i==="default")for(const[l,u]of n.views.entries())o=o.concat(pI(u,t,r)),fI(u)&&(n.views.delete(l),u.query._queryParams.loadsAllData()||s.push(u.query));else{const l=n.views.get(i);l&&(o=o.concat(pI(l,t,r)),fI(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||s.push(l.query)))}return a&&!br(n)&&s.push(new(VF())(e._repo,e._path)),{removed:s,events:o}}function Tb(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function fr(n,e){let t=null;for(const r of n.views.values())t=t||NF(r,e);return t}function wb(n,e){if(e._queryParams.loadsAllData())return Ou(n);{const r=e._queryIdentifier;return n.views.get(r)}}function vb(n,e){return wb(n,e)!=null}function br(n){return Ou(n)!=null}function Ou(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vl;function UF(n){V(!Vl,"__referenceConstructor has already been defined"),Vl=n}function BF(){return V(Vl,"Reference.ts has not been loaded"),Vl}let qF=1;class gI{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ge(null),this.pendingWriteTree_=gF(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function am(n,e,t,r,i){return iF(n.pendingWriteTree_,e,t,r,i),i?eo(n,new wi(em(),e,t)):[]}function $F(n,e,t,r){sF(n.pendingWriteTree_,e,t,r);const i=ge.fromObject(t);return eo(n,new ks(em(),e,i))}function sr(n,e,t=!1){const r=oF(n.pendingWriteTree_,e);if(aF(n.pendingWriteTree_,e)){let s=new ge(null);return r.snap!=null?s=s.set(ae(),!0):nt(r.children,o=>{s=s.set(new le(o),!0)}),eo(n,new Pl(r.path,s,t))}else return[]}function Za(n,e,t){return eo(n,new wi(tm(),e,t))}function WF(n,e,t){const r=ge.fromObject(t);return eo(n,new ks(tm(),e,r))}function GF(n,e){return eo(n,new Pa(tm(),e))}function zF(n,e,t){const r=cm(n,t);if(r){const i=lm(r),s=i.path,o=i.queryId,a=mt(s,e),l=new Pa(nm(o),a);return um(n,s,l)}else return[]}function Ml(n,e,t,r,i=!1){const s=e._path,o=n.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||vb(o,e))){const l=FF(o,e,t,r);MF(o)&&(n.syncPointTree_=n.syncPointTree_.remove(s));const u=l.removed;if(a=l.events,!i){const h=u.findIndex(m=>m._queryParams.loadsAllData())!==-1,f=n.syncPointTree_.findOnPath(s,(m,_)=>br(_));if(h&&!f){const m=n.syncPointTree_.subtree(s);if(!m.isEmpty()){const _=KF(m);for(let v=0;v<_.length;++v){const P=_[v],k=P.query,U=Sb(n,P);n.listenProvider_.startListening(ra(k),ka(n,k),U.hashFn,U.onComplete)}}}!f&&u.length>0&&!r&&(h?n.listenProvider_.stopListening(ra(e),null):u.forEach(m=>{const _=n.queryToTagMap.get(Vu(m));n.listenProvider_.stopListening(ra(m),_)}))}QF(n,u)}return a}function Ab(n,e,t,r){const i=cm(n,r);if(i!=null){const s=lm(i),o=s.path,a=s.queryId,l=mt(o,e),u=new wi(nm(a),l,t);return um(n,o,u)}else return[]}function jF(n,e,t,r){const i=cm(n,r);if(i){const s=lm(i),o=s.path,a=s.queryId,l=mt(o,e),u=ge.fromObject(t),h=new ks(nm(a),l,u);return um(n,o,h)}else return[]}function Hd(n,e,t,r=!1){const i=e._path;let s=null,o=!1;n.syncPointTree_.foreachOnPath(i,(m,_)=>{const v=mt(m,i);s=s||fr(_,v),o=o||br(_)});let a=n.syncPointTree_.get(i);a?(o=o||br(a),s=s||fr(a,ae())):(a=new Ib,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;s!=null?l=!0:(l=!1,s=j.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((_,v)=>{const P=fr(v,ae());P&&(s=s.updateImmediateChild(_,P))}));const u=vb(a,e);if(!u&&!e._queryParams.loadsAllData()){const m=Vu(e);V(!n.queryToTagMap.has(m),"View does not exist, but we have a tag");const _=YF();n.queryToTagMap.set(m,_),n.tagToQueryMap.set(_,m)}const h=Du(n.pendingWriteTree_,i);let f=LF(a,e,t,h,s,l);if(!u&&!o&&!r){const m=wb(a,e);f=f.concat(JF(n,e,m))}return f}function xu(n,e,t){const i=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=mt(o,e),u=fr(a,l);if(u)return u});return fb(i,e,s,t,!0)}function HF(n,e){const t=e._path;let r=null;n.syncPointTree_.foreachOnPath(t,(u,h)=>{const f=mt(u,t);r=r||fr(h,f)});let i=n.syncPointTree_.get(t);i?r=r||fr(i,ae()):(i=new Ib,n.syncPointTree_=n.syncPointTree_.set(t,i));const s=r!=null,o=s?new Ar(r,!0,!1):null,a=Du(n.pendingWriteTree_,e._path),l=Eb(i,e,a,s?o.getNode():j.EMPTY_NODE,s);return kF(l)}function eo(n,e){return bb(e,n.syncPointTree_,null,Du(n.pendingWriteTree_,ae()))}function bb(n,e,t,r){if(X(n.path))return Rb(n,e,t,r);{const i=e.get(ae());t==null&&i!=null&&(t=fr(i,ae()));let s=[];const o=J(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const u=t?t.getImmediateChild(o):null,h=pb(r,o);s=s.concat(bb(a,l,u,h))}return i&&(s=s.concat(om(i,n,r,t))),s}}function Rb(n,e,t,r){const i=e.get(ae());t==null&&i!=null&&(t=fr(i,ae()));let s=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,u=pb(r,o),h=n.operationForChild(o);h&&(s=s.concat(Rb(h,a,l,u)))}),i&&(s=s.concat(om(i,n,r,t))),s}function Sb(n,e){const t=e.query,r=ka(n,t);return{hashFn:()=>(PF(e)||j.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?zF(n,t._path,r):GF(n,t._path);{const s=$1(i,t);return Ml(n,t,null,s)}}}}function ka(n,e){const t=Vu(e);return n.queryToTagMap.get(t)}function Vu(n){return n._path.toString()+"$"+n._queryIdentifier}function cm(n,e){return n.tagToQueryMap.get(e)}function lm(n){const e=n.indexOf("$");return V(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new le(n.substr(0,e))}}function um(n,e,t){const r=n.syncPointTree_.get(e);V(r,"Missing sync point for query tag that we're tracking");const i=Du(n.pendingWriteTree_,e);return om(r,t,i,null)}function KF(n){return n.fold((e,t,r)=>{if(t&&br(t))return[Ou(t)];{let i=[];return t&&(i=Tb(t)),nt(r,(s,o)=>{i=i.concat(o)}),i}})}function ra(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(BF())(n._repo,n._path):n}function QF(n,e){for(let t=0;t<e.length;++t){const r=e[t];if(!r._queryParams.loadsAllData()){const i=Vu(r),s=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(s)}}}function YF(){return qF++}function JF(n,e,t){const r=e._path,i=ka(n,e),s=Sb(n,t),o=n.listenProvider_.startListening(ra(e),i,s.hashFn,s.onComplete),a=n.syncPointTree_.subtree(r);if(i)V(!br(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((u,h,f)=>{if(!X(u)&&h&&br(h))return[Ou(h).query];{let m=[];return h&&(m=m.concat(Tb(h).map(_=>_.query))),nt(f,(_,v)=>{m=m.concat(v)}),m}});for(let u=0;u<l.length;++u){const h=l[u];n.listenProvider_.stopListening(ra(h),ka(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new hm(t)}node(){return this.node_}}class dm{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Re(this.path_,e);return new dm(this.syncTree_,t)}node(){return xu(this.syncTree_,this.path_)}}const XF=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},_I=function(n,e,t){if(!n||typeof n!="object")return n;if(V(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return ZF(n[".sv"],e,t);if(typeof n[".sv"]=="object")return eU(n[".sv"],e);V(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},ZF=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:V(!1,"Unexpected server value: "+n)}},eU=function(n,e,t){n.hasOwnProperty("increment")||V(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const r=n.increment;typeof r!="number"&&V(!1,"Unexpected increment value: "+r);const i=e.node();if(V(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},Cb=function(n,e,t,r){return pm(e,new dm(t,n),r)},fm=function(n,e,t){return pm(n,new hm(e),t)};function pm(n,e,t){const r=n.getPriority().val(),i=_I(r,e.getImmediateChild(".priority"),t);let s;if(n.isLeafNode()){const o=n,a=_I(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new Ke(a,Ce(i)):n}else{const o=n;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Ke(i))),o.forEachChild(_e,(a,l)=>{const u=pm(l,e.getImmediateChild(a),t);u!==l&&(s=s.updateImmediateChild(a,u))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(e="",t=null,r={children:{},childCount:0}){this.name=e,this.parent=t,this.node=r}}function Mu(n,e){let t=e instanceof le?e:new le(e),r=n,i=J(t);for(;i!==null;){const s=li(r.node.children,i)||{children:{},childCount:0};r=new mm(i,r,s),t=me(t),i=J(t)}return r}function Mi(n){return n.node.value}function gm(n,e){n.node.value=e,Kd(n)}function Pb(n){return n.node.childCount>0}function tU(n){return Mi(n)===void 0&&!Pb(n)}function Lu(n,e){nt(n.node.children,(t,r)=>{e(new mm(t,n,r))})}function kb(n,e,t,r){t&&e(n),Lu(n,i=>{kb(i,e,!0)})}function nU(n,e,t){let r=n.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function ec(n){return new le(n.parent===null?n.name:ec(n.parent)+"/"+n.name)}function Kd(n){n.parent!==null&&rU(n.parent,n.name,n)}function rU(n,e,t){const r=tU(t),i=tn(n.node.children,e);r&&i?(delete n.node.children[e],n.node.childCount--,Kd(n)):!r&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Kd(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iU=/[\[\].#$\/\u0000-\u001F\u007F]/,sU=/[\[\].#$\u0000-\u001F\u007F]/,jh=10*1024*1024,Fu=function(n){return typeof n=="string"&&n.length!==0&&!iU.test(n)},Nb=function(n){return typeof n=="string"&&n.length!==0&&!sU.test(n)},oU=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Nb(n)},Na=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Su(n)||n&&typeof n=="object"&&tn(n,".sv")},gn=function(n,e,t,r){r&&e===void 0||tc(ui(n,"value"),e,t)},tc=function(n,e,t){const r=t instanceof le?new wL(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Kr(r));if(typeof e=="function")throw new Error(n+"contains a function "+Kr(r)+" with contents = "+e.toString());if(Su(e))throw new Error(n+"contains "+e.toString()+" "+Kr(r));if(typeof e=="string"&&e.length>jh/3&&Wl(e)>jh)throw new Error(n+"contains a string greater than "+jh+" utf8 bytes "+Kr(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(nt(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Fu(o)))throw new Error(n+" contains an invalid key ("+o+") "+Kr(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);vL(r,o),tc(n,a,r),AL(r)}),i&&s)throw new Error(n+' contains ".value" child '+Kr(r)+" in addition to actual children.")}},aU=function(n,e){let t,r;for(t=0;t<e.length;t++){r=e[t];const s=ba(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Fu(s[o]))throw new Error(n+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(TL);let i=null;for(t=0;t<e.length;t++){if(r=e[t],i!==null&&Ft(i,r))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},Db=function(n,e,t,r){const i=ui(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];nt(e,(o,a)=>{const l=new le(o);if(tc(i,a,Re(t,l)),Hp(l)===".priority"&&!Na(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(l)}),aU(i,s)},_m=function(n,e,t){if(Su(e))throw new Error(ui(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Na(e))throw new Error(ui(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},nc=function(n,e,t,r){if(t!==void 0&&!Fu(t))throw new Error(ui(n,e)+'was an invalid key = "'+t+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},Uu=function(n,e,t,r){if(!(r&&t===void 0)&&!Nb(t))throw new Error(ui(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},cU=function(n,e,t,r){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Uu(n,e,t,r)},Kt=function(n,e){if(J(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Ob=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Fu(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!oU(t))throw new Error(ui(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lU{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Bu(n,e){let t=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();t!==null&&!Kp(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(i)}t&&n.eventLists_.push(t)}function xb(n,e,t){Bu(n,t),Vb(n,r=>Kp(r,e))}function Mt(n,e,t){Bu(n,t),Vb(n,r=>Ft(r,e)||Ft(e,r))}function Vb(n,e){n.recursionDepth_++;let t=!0;for(let r=0;r<n.eventLists_.length;r++){const i=n.eventLists_[r];if(i){const s=i.path;e(s)?(uU(n.eventLists_[r]),n.eventLists_[r]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function uU(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const r=t.getEventRunner();ai&&Xe("event: "+t.toString()),Xs(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb="repo_interrupt",hU=25;class dU{constructor(e,t,r,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new lU,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Cl(),this.transactionQueueTree_=new mm,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function fU(n,e,t){if(n.stats_=zp(n.repoInfo_),n.forceRestClient_||j1())n.server_=new Sl(n.repoInfo_,(r,i,s,o)=>{yI(n,r,i,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>II(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{qe(t)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}n.persistentConnection_=new Ut(n.repoInfo_,e,(r,i,s,o)=>{yI(n,r,i,s,o)},r=>{II(n,r)},r=>{pU(n,r)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(r=>{n.server_.refreshAuthToken(r)}),n.appCheckProvider_.addTokenChangeListener(r=>{n.server_.refreshAppCheckToken(r.token)}),n.statsReporter_=J1(n.repoInfo_,()=>new XL(n.stats_,n.server_)),n.infoData_=new HL,n.infoSyncTree_=new gI({startListening:(r,i,s,o)=>{let a=[];const l=n.infoData_.getNode(r._path);return l.isEmpty()||(a=Za(n.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ym(n,"connected",!1),n.serverSyncTree_=new gI({startListening:(r,i,s,o)=>(n.server_.listen(r,s,i,(a,l)=>{const u=o(a,l);Mt(n.eventQueue_,r._path,u)}),[]),stopListening:(r,i)=>{n.server_.unlisten(r,i)}})}function Lb(n){const t=n.infoData_.getNode(new le(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function rc(n){return XF({timestamp:Lb(n)})}function yI(n,e,t,r,i){n.dataUpdateCount++;const s=new le(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(r){const l=Zc(t,u=>Ce(u));o=jF(n.serverSyncTree_,s,l,i)}else{const l=Ce(t);o=Ab(n.serverSyncTree_,s,l,i)}else if(r){const l=Zc(t,u=>Ce(u));o=WF(n.serverSyncTree_,s,l)}else{const l=Ce(t);o=Za(n.serverSyncTree_,s,l)}let a=s;o.length>0&&(a=Ds(n,s)),Mt(n.eventQueue_,a,o)}function II(n,e){ym(n,"connected",e),e===!1&&_U(n)}function pU(n,e){nt(e,(t,r)=>{ym(n,t,r)})}function ym(n,e,t){const r=new le("/.info/"+e),i=Ce(t);n.infoData_.updateSnapshot(r,i);const s=Za(n.infoSyncTree_,r,i);Mt(n.eventQueue_,r,s)}function qu(n){return n.nextWriteId_++}function mU(n,e,t){const r=HF(n.serverSyncTree_,e);return r!=null?Promise.resolve(r):n.server_.get(e).then(i=>{const s=Ce(i).withIndex(e._queryParams.getIndex());Hd(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Za(n.serverSyncTree_,e._path,s);else{const a=ka(n.serverSyncTree_,e);o=Ab(n.serverSyncTree_,e._path,s,a)}return Mt(n.eventQueue_,e._path,o),Ml(n.serverSyncTree_,e,t,null,!0),s},i=>(to(n,"get for query "+qe(e)+" failed: "+i),Promise.reject(new Error(i))))}function Im(n,e,t,r,i){to(n,"set",{path:e.toString(),value:t,priority:r});const s=rc(n),o=Ce(t,r),a=xu(n.serverSyncTree_,e),l=fm(o,a,s),u=qu(n),h=am(n.serverSyncTree_,e,l,u,!0);Bu(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(m,_)=>{const v=m==="ok";v||lt("set at "+e+" failed: "+m);const P=sr(n.serverSyncTree_,u,!v);Mt(n.eventQueue_,e,P),Rr(n,i,m,_)});const f=Tm(n,e);Ds(n,f),Mt(n.eventQueue_,f,[])}function gU(n,e,t,r){to(n,"update",{path:e.toString(),value:t});let i=!0;const s=rc(n),o={};if(nt(t,(a,l)=>{i=!1,o[a]=Cb(Re(e,a),Ce(l),n.serverSyncTree_,s)}),i)Xe("update() called with empty data.  Don't do anything."),Rr(n,r,"ok",void 0);else{const a=qu(n),l=$F(n.serverSyncTree_,e,o,a);Bu(n.eventQueue_,l),n.server_.merge(e.toString(),t,(u,h)=>{const f=u==="ok";f||lt("update at "+e+" failed: "+u);const m=sr(n.serverSyncTree_,a,!f),_=m.length>0?Ds(n,e):e;Mt(n.eventQueue_,_,m),Rr(n,r,u,h)}),nt(t,u=>{const h=Tm(n,Re(e,u));Ds(n,h)}),Mt(n.eventQueue_,e,[])}}function _U(n){to(n,"onDisconnectEvents");const e=rc(n),t=Cl();qd(n.onDisconnect_,ae(),(i,s)=>{const o=Cb(i,s,n.serverSyncTree_,e);Zs(t,i,o)});let r=[];qd(t,ae(),(i,s)=>{r=r.concat(Za(n.serverSyncTree_,i,s));const o=Tm(n,i);Ds(n,o)}),n.onDisconnect_=Cl(),Mt(n.eventQueue_,ae(),r)}function yU(n,e,t){n.server_.onDisconnectCancel(e.toString(),(r,i)=>{r==="ok"&&Bd(n.onDisconnect_,e),Rr(n,t,r,i)})}function EI(n,e,t,r){const i=Ce(t);n.server_.onDisconnectPut(e.toString(),i.val(!0),(s,o)=>{s==="ok"&&Zs(n.onDisconnect_,e,i),Rr(n,r,s,o)})}function IU(n,e,t,r,i){const s=Ce(t,r);n.server_.onDisconnectPut(e.toString(),s.val(!0),(o,a)=>{o==="ok"&&Zs(n.onDisconnect_,e,s),Rr(n,i,o,a)})}function EU(n,e,t,r){if(Xc(t)){Xe("onDisconnect().update() called with empty data.  Don't do anything."),Rr(n,r,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(i,s)=>{i==="ok"&&nt(t,(o,a)=>{const l=Ce(a);Zs(n.onDisconnect_,Re(e,o),l)}),Rr(n,r,i,s)})}function TU(n,e,t){let r;J(e._path)===".info"?r=Hd(n.infoSyncTree_,e,t):r=Hd(n.serverSyncTree_,e,t),xb(n.eventQueue_,e._path,r)}function Qd(n,e,t){let r;J(e._path)===".info"?r=Ml(n.infoSyncTree_,e,t):r=Ml(n.serverSyncTree_,e,t),xb(n.eventQueue_,e._path,r)}function Fb(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Mb)}function wU(n){n.persistentConnection_&&n.persistentConnection_.resume(Mb)}function to(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Xe(t,...e)}function Rr(n,e,t,r){e&&Xs(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function vU(n,e,t,r,i,s){to(n,"transaction on "+e);const o={path:e,update:t,onComplete:r,status:null,order:OA(),applyLocally:s,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Em(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{tc("transaction failed: Data returned ",l,o.path),o.status=0;const u=Mu(n.transactionQueueTree_,e),h=Mi(u)||[];h.push(o),gm(u,h);let f;typeof l=="object"&&l!==null&&tn(l,".priority")?(f=li(l,".priority"),V(Na(f),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):f=(xu(n.serverSyncTree_,e)||j.EMPTY_NODE).getPriority().val();const m=rc(n),_=Ce(l,f),v=fm(_,a,m);o.currentOutputSnapshotRaw=_,o.currentOutputSnapshotResolved=v,o.currentWriteId=qu(n);const P=am(n.serverSyncTree_,e,v,o.currentWriteId,o.applyLocally);Mt(n.eventQueue_,e,P),$u(n,n.transactionQueueTree_)}}function Em(n,e,t){return xu(n.serverSyncTree_,e,t)||j.EMPTY_NODE}function $u(n,e=n.transactionQueueTree_){if(e||Wu(n,e),Mi(e)){const t=Bb(n,e);V(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&AU(n,ec(e),t)}else Pb(e)&&Lu(e,t=>{$u(n,t)})}function AU(n,e,t){const r=t.map(u=>u.currentWriteId),i=Em(n,e,r);let s=i;const o=i.hash();for(let u=0;u<t.length;u++){const h=t[u];V(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const f=mt(e,h.path);s=s.updateChild(f,h.currentOutputSnapshotRaw)}const a=s.val(!0),l=e;n.server_.put(l.toString(),a,u=>{to(n,"transaction put response",{path:l.toString(),status:u});let h=[];if(u==="ok"){const f=[];for(let m=0;m<t.length;m++)t[m].status=2,h=h.concat(sr(n.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&f.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();Wu(n,Mu(n.transactionQueueTree_,e)),$u(n,n.transactionQueueTree_),Mt(n.eventQueue_,e,h);for(let m=0;m<f.length;m++)Xs(f[m])}else{if(u==="datastale")for(let f=0;f<t.length;f++)t[f].status===3?t[f].status=4:t[f].status=0;else{lt("transaction at "+l.toString()+" failed: "+u);for(let f=0;f<t.length;f++)t[f].status=4,t[f].abortReason=u}Ds(n,e)}},o)}function Ds(n,e){const t=Ub(n,e),r=ec(t),i=Bb(n,t);return bU(n,i,r),r}function bU(n,e,t){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],u=mt(t,l.path);let h=!1,f;if(V(u!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,f=l.abortReason,i=i.concat(sr(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=hU)h=!0,f="maxretry",i=i.concat(sr(n.serverSyncTree_,l.currentWriteId,!0));else{const m=Em(n,l.path,o);l.currentInputSnapshot=m;const _=e[a].update(m.val());if(_!==void 0){tc("transaction failed: Data returned ",_,l.path);let v=Ce(_);typeof _=="object"&&_!=null&&tn(_,".priority")||(v=v.updatePriority(m.getPriority()));const k=l.currentWriteId,U=rc(n),$=fm(v,m,U);l.currentOutputSnapshotRaw=v,l.currentOutputSnapshotResolved=$,l.currentWriteId=qu(n),o.splice(o.indexOf(k),1),i=i.concat(am(n.serverSyncTree_,l.path,$,l.currentWriteId,l.applyLocally)),i=i.concat(sr(n.serverSyncTree_,k,!0))}else h=!0,f="nodata",i=i.concat(sr(n.serverSyncTree_,l.currentWriteId,!0))}Mt(n.eventQueue_,t,i),i=[],h&&(e[a].status=2,(function(m){setTimeout(m,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(f==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(f),!1,null))))}Wu(n,n.transactionQueueTree_);for(let a=0;a<r.length;a++)Xs(r[a]);$u(n,n.transactionQueueTree_)}function Ub(n,e){let t,r=n.transactionQueueTree_;for(t=J(e);t!==null&&Mi(r)===void 0;)r=Mu(r,t),e=me(e),t=J(e);return r}function Bb(n,e){const t=[];return qb(n,e,t),t.sort((r,i)=>r.order-i.order),t}function qb(n,e,t){const r=Mi(e);if(r)for(let i=0;i<r.length;i++)t.push(r[i]);Lu(e,i=>{qb(n,i,t)})}function Wu(n,e){const t=Mi(e);if(t){let r=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[r]=t[i],r++);t.length=r,gm(e,t.length>0?t:void 0)}Lu(e,r=>{Wu(n,r)})}function Tm(n,e){const t=ec(Ub(n,e)),r=Mu(n.transactionQueueTree_,e);return nU(r,i=>{Hh(n,i)}),Hh(n,r),kb(r,i=>{Hh(n,i)}),t}function Hh(n,e){const t=Mi(e);if(t){const r=[];let i=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(V(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(V(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(sr(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&r.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?gm(e,void 0):t.length=s+1,Mt(n.eventQueue_,ec(e),i);for(let o=0;o<r.length;o++)Xs(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RU(n){let e="";const t=n.split("/");for(let r=0;r<t.length;r++)if(t[r].length>0){let i=t[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function SU(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const r=t.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):lt(`Invalid query segment '${t}' in query '${n}'`)}return e}const Yd=function(n,e){const t=CU(n),r=t.namespace;t.domain==="firebase.com"&&mn(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&t.domain!=="localhost"&&mn("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||L1();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new HA(t.host,t.secure,r,i,e,"",r!==t.subdomain),path:new le(t.pathString)}},CU=function(n){let e="",t="",r="",i="",s="",o=!0,a="https",l=443;if(typeof n=="string"){let u=n.indexOf("//");u>=0&&(a=n.substring(0,u-1),n=n.substring(u+2));let h=n.indexOf("/");h===-1&&(h=n.length);let f=n.indexOf("?");f===-1&&(f=n.length),e=n.substring(0,Math.min(h,f)),h<f&&(i=RU(n.substring(h,f)));const m=SU(n.substring(Math.min(n.length,f)));u=e.indexOf(":"),u>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(u+1),10)):u=e.length;const _=e.slice(0,u);if(_.toLowerCase()==="localhost")t="localhost";else if(_.split(".").length<=2)t=_;else{const v=e.indexOf(".");r=e.substring(0,v).toLowerCase(),t=e.substring(v+1),s=r}"ns"in m&&(s=m.ns)}return{host:e,port:l,domain:t,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",PU=(function(){let n=0;const e=[];return function(t){const r=t===n;n=t;let i;const s=new Array(8);for(i=7;i>=0;i--)s[i]=TI.charAt(t%64),t=Math.floor(t/64);V(t===0,"Cannot push at time == 0");let o=s.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=TI.charAt(e[i]);return V(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $b{constructor(e,t,r,i){this.eventType=e,this.eventRegistration=t,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+qe(this.snapshot.exportVal())}}class Wb{constructor(e,t,r){this.eventRegistration=e,this.error=t,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return V(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new pt;return yU(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Kt("OnDisconnect.remove",this._path);const e=new pt;return EI(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Kt("OnDisconnect.set",this._path),gn("OnDisconnect.set",e,this._path,!1);const t=new pt;return EI(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Kt("OnDisconnect.setWithPriority",this._path),gn("OnDisconnect.setWithPriority",e,this._path,!1),_m("OnDisconnect.setWithPriority",t);const r=new pt;return IU(this._repo,this._path,e,t,r.wrapCallback(()=>{})),r.promise}update(e){Kt("OnDisconnect.update",this._path),Db("OnDisconnect.update",e,this._path);const t=new pt;return EU(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,t,r,i){this._repo=e,this._path=t,this._queryParams=r,this._orderByCalled=i}get key(){return X(this._path)?null:Hp(this._path)}get ref(){return new Wt(this._repo,this._path)}get _queryIdentifier(){const e=oI(this._queryParams),t=Wp(e);return t==="{}"?"default":t}get _queryObject(){return oI(this._queryParams)}isEqual(e){if(e=M(e),!(e instanceof Ct))return!1;const t=this._repo===e._repo,r=Kp(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+EL(this._path)}}function Gu(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function Lr(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===dn){const r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==wr)throw new Error(r);if(typeof e!="string")throw new Error(i)}if(n.hasEnd()){if(n.getIndexEndName()!==Vn)throw new Error(r);if(typeof t!="string")throw new Error(i)}}else if(n.getIndex()===_e){if(e!=null&&!Na(e)||t!=null&&!Na(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(V(n.getIndex()instanceof Jp||n.getIndex()===Xp,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function zu(n){if(n.hasStart()&&n.hasEnd()&&n.hasLimit()&&!n.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class Wt extends Ct{constructor(e,t){super(e,t,new Pu,!1)}get parent(){const e=nb(this._path);return e===null?null:new Wt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Sr{constructor(e,t,r){this._node=e,this.ref=t,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new le(e),r=Ai(this.ref,e);return new Sr(this._node.getChild(t),r,_e)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new Sr(i,Ai(this.ref,r),_e)))}hasChild(e){const t=new le(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function zb(n,e){return n=M(n),n._checkNotDeleted("ref"),e!==void 0?Ai(n._root,e):n._root}function kU(n,e){n=M(n),n._checkNotDeleted("refFromURL");const t=Yd(e,n._repo.repoInfo_.nodeAdmin);Ob("refFromURL",t);const r=t.repoInfo;return!n._repo.repoInfo_.isCustomHost()&&r.host!==n._repo.repoInfo_.host&&mn("refFromURL: Host name does not match the current database: (found "+r.host+" but expected "+n._repo.repoInfo_.host+")"),zb(n,t.path.toString())}function Ai(n,e){return n=M(n),J(n._path)===null?cU("child","path",e,!1):Uu("child","path",e,!1),new Wt(n._repo,Re(n._path,e))}function NU(n){return n=M(n),new Gb(n._repo,n._path)}function DU(n,e){n=M(n),Kt("push",n._path),gn("push",e,n._path,!0);const t=Lb(n._repo),r=PU(t),i=Ai(n,r),s=Ai(n,r);let o;return e!=null?o=vm(s,e).then(()=>s):o=Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function OU(n){return Kt("remove",n._path),vm(n,null)}function vm(n,e){n=M(n),Kt("set",n._path),gn("set",e,n._path,!1);const t=new pt;return Im(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function xU(n,e){n=M(n),Kt("setPriority",n._path),_m("setPriority",e);const t=new pt;return Im(n._repo,Re(n._path,".priority"),e,null,t.wrapCallback(()=>{})),t.promise}function VU(n,e,t){if(Kt("setWithPriority",n._path),gn("setWithPriority",e,n._path,!1),_m("setWithPriority",t),n.key===".length"||n.key===".keys")throw"setWithPriority failed: "+n.key+" is a read-only object.";const r=new pt;return Im(n._repo,n._path,e,t,r.wrapCallback(()=>{})),r.promise}function MU(n,e){Db("update",e,n._path);const t=new pt;return gU(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function LU(n){n=M(n);const e=new wm(()=>{}),t=new ic(e);return mU(n._repo,n,t).then(r=>new Sr(r,new Wt(n._repo,n._path),n._queryParams.getIndex()))}class ic{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const r=t._queryParams.getIndex();return new $b("value",this,new Sr(e.snapshotNode,new Wt(t._repo,t._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Wb(this,e,t):null}matches(e){return e instanceof ic?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ju{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Wb(this,e,t):null}createEvent(e,t){V(e.childName!=null,"Child events should have a childName.");const r=Ai(new Wt(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new $b(e.type,this,new Sr(e.snapshotNode,r,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ju?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function sc(n,e,t,r,i){let s;if(typeof r=="object"&&(s=void 0,i=r),typeof r=="function"&&(s=r),i&&i.onlyOnce){const l=t,u=(h,f)=>{Qd(n._repo,n,a),l(h,f)};u.userCallback=t.userCallback,u.context=t.context,t=u}const o=new wm(t,s||void 0),a=e==="value"?new ic(o):new ju(e,o);return TU(n._repo,n,a),()=>Qd(n._repo,n,a)}function jb(n,e,t,r){return sc(n,"value",e,t,r)}function FU(n,e,t,r){return sc(n,"child_added",e,t,r)}function UU(n,e,t,r){return sc(n,"child_changed",e,t,r)}function BU(n,e,t,r){return sc(n,"child_moved",e,t,r)}function qU(n,e,t,r){return sc(n,"child_removed",e,t,r)}function $U(n,e,t){let r=null;const i=t?new wm(t):null;e==="value"?r=new ic(i):e&&(r=new ju(e,i)),Qd(n._repo,n,r)}class Gt{}class Hb extends Gt{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){gn("endAt",this._value,e._path,!0);const t=Ud(e._queryParams,this._value,this._key);if(zu(t),Lr(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ct(e._repo,e._path,t,e._orderByCalled)}}function WU(n,e){return nc("endAt","key",e),new Hb(n,e)}class GU extends Gt{constructor(e,t){super(),this._value=e,this._key=t,this.type="endBefore"}_apply(e){gn("endBefore",this._value,e._path,!1);const t=jL(e._queryParams,this._value,this._key);if(zu(t),Lr(t),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ct(e._repo,e._path,t,e._orderByCalled)}}function zU(n,e){return nc("endBefore","key",e),new GU(n,e)}class Kb extends Gt{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAt"}_apply(e){gn("startAt",this._value,e._path,!0);const t=Fd(e._queryParams,this._value,this._key);if(zu(t),Lr(t),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new Ct(e._repo,e._path,t,e._orderByCalled)}}function jU(n=null,e){return nc("startAt","key",e),new Kb(n,e)}class HU extends Gt{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAfter"}_apply(e){gn("startAfter",this._value,e._path,!1);const t=zL(e._queryParams,this._value,this._key);if(zu(t),Lr(t),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new Ct(e._repo,e._path,t,e._orderByCalled)}}function KU(n,e){return nc("startAfter","key",e),new HU(n,e)}class QU extends Gt{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ct(e._repo,e._path,WL(e._queryParams,this._limit),e._orderByCalled)}}function YU(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new QU(n)}class JU extends Gt{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ct(e._repo,e._path,GL(e._queryParams,this._limit),e._orderByCalled)}}function XU(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new JU(n)}class ZU extends Gt{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Gu(e,"orderByChild");const t=new le(this._path);if(X(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const r=new Jp(t),i=ku(e._queryParams,r);return Lr(i),new Ct(e._repo,e._path,i,!0)}}function e2(n){if(n==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(n==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(n==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Uu("orderByChild","path",n,!1),new ZU(n)}class t2 extends Gt{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){Gu(e,"orderByKey");const t=ku(e._queryParams,dn);return Lr(t),new Ct(e._repo,e._path,t,!0)}}function n2(){return new t2}class r2 extends Gt{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){Gu(e,"orderByPriority");const t=ku(e._queryParams,_e);return Lr(t),new Ct(e._repo,e._path,t,!0)}}function i2(){return new r2}class s2 extends Gt{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){Gu(e,"orderByValue");const t=ku(e._queryParams,Xp);return Lr(t),new Ct(e._repo,e._path,t,!0)}}function o2(){return new s2}class a2 extends Gt{constructor(e,t){super(),this._value=e,this._key=t,this.type="equalTo"}_apply(e){if(gn("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new Hb(this._value,this._key)._apply(new Kb(this._value,this._key)._apply(e))}}function c2(n,e){return nc("equalTo","key",e),new a2(n,e)}function l2(n,...e){let t=M(n);for(const r of e)t=r._apply(t);return t}xF(Wt);UF(Wt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u2="FIREBASE_DATABASE_EMULATOR_HOST",Jd={};let Qb=!1;function h2(n,e,t,r){const i=e.lastIndexOf(":"),s=e.substring(0,i),o=en(s);n.repoInfo_=new HA(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),r&&(n.authTokenProvider_=r)}function Am(n,e,t,r,i){let s=r||n.options.databaseURL;s===void 0&&(n.options.projectId||mn("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Xe("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Yd(s,i),a=o.repoInfo,l,u;typeof process<"u"&&$y&&(u=$y[u2]),u?(l=!0,s=`http://${u}?ns=${a.namespace}`,o=Yd(s,i),a=o.repoInfo):l=!o.repoInfo.secure;const h=i&&l?new is(is.OWNER):new K1(n.name,n.options,e);Ob("Invalid Firebase Database URL",o),X(o.path)||mn("Database URL must point to the root of a Firebase Database (not including a child path).");const f=f2(a,n,h,new H1(n,t));return new Yb(f,n)}function d2(n,e){const t=Jd[e];(!t||t[n.key]!==n)&&mn(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Fb(n),delete t[n.key]}function f2(n,e,t,r){let i=Jd[e.name];i||(i={},Jd[e.name]=i);let s=i[n.toURLString()];return s&&mn("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new dU(n,Qb,t,r),i[n.toURLString()]=s,s}function p2(n){Qb=n}class Yb{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(fU(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Wt(this._repo,ae())),this._rootInternal}_delete(){return this._rootInternal!==null&&(d2(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&mn("Cannot call "+e+" on a deleted database.")}}function Jb(){Cs.IS_TRANSPORT_INITIALIZED&&lt("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function m2(){Jb(),ir.forceDisallow()}function g2(){Jb(),Lt.forceDisallow(),ir.forceAllow()}function _2(n=Vs(),e){const t=$t(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const r=nf("database");r&&Xb(t,...r)}return t}function Xb(n,e,t,r={}){n=M(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,s=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&xt(r,s.repoInfo_.emulatorOptions))return;mn("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&mn('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new is(is.OWNER);else if(r.mockUserToken){const a=typeof r.mockUserToken=="string"?r.mockUserToken:rf(r.mockUserToken,n.app.options.projectId);o=new is(a)}en(e)&&(Da(e),$l("Database",!0)),h2(s,i,r,o)}function y2(n){n=M(n),n._checkNotDeleted("goOffline"),Fb(n._repo)}function I2(n){n=M(n),n._checkNotDeleted("goOnline"),wU(n._repo)}function E2(n,e){VA(n,e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T2(n){$p(Cr),ut(new Ge("database",(e,{instanceIdentifier:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return Am(r,i,s,t)},"PUBLIC").setMultipleInstances(!0)),$e(Wy,Gy,n),$e(Wy,Gy,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w2={".sv":"timestamp"};function v2(){return w2}function A2(n){return{".sv":{increment:n}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function b2(n,e,t){if(n=M(n),Kt("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const r=(t==null?void 0:t.applyLocally)??!0,i=new pt,s=(a,l,u)=>{let h=null;a?i.reject(a):(h=new Sr(u,new Wt(n._repo,n._path),_e),i.resolve(new Zb(l,h)))},o=jb(n,()=>{});return vU(n._repo,n._path,e,s,o,r),i.promise}Ut.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ut.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};const R2=function(n){const e=Ut.prototype.put;return Ut.prototype.put=function(t,r,i,s){s!==void 0&&(s=n()),e.call(this,t,r,i,s)},function(){Ut.prototype.put=e}},S2=function(n){p2(n)};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C2({app:n,url:e,version:t,customAuthImpl:r,customAppCheckImpl:i,nodeAdmin:s=!1}){$p(t);const o=new ZI("database-standalone"),a=new Jh("auth-internal",o);let l;return i&&(l=new Jh("app-check-internal",o),l.setComponent(new Ge("app-check-internal",()=>i,"PRIVATE"))),a.setComponent(new Ge("auth-internal",()=>r,"PRIVATE")),Am(n,a,l,e,s)}T2();const Z4=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:Sr,Database:Yb,OnDisconnect:Gb,QueryConstraint:Gt,TransactionResult:Zb,_QueryImpl:Ct,_QueryParams:Pu,_ReferenceImpl:Wt,_TEST_ACCESS_forceRestClient:S2,_TEST_ACCESS_hijackHash:R2,_initStandalone:C2,_repoManagerDatabaseFromApp:Am,_setSDKVersion:$p,_validatePathString:Uu,_validateWritablePath:Kt,child:Ai,connectDatabaseEmulator:Xb,enableLogging:E2,endAt:WU,endBefore:zU,equalTo:c2,forceLongPolling:g2,forceWebSockets:m2,get:LU,getDatabase:_2,goOffline:y2,goOnline:I2,increment:A2,limitToFirst:YU,limitToLast:XU,off:$U,onChildAdded:FU,onChildChanged:UU,onChildMoved:BU,onChildRemoved:qU,onDisconnect:NU,onValue:jb,orderByChild:e2,orderByKey:n2,orderByPriority:i2,orderByValue:o2,push:DU,query:l2,ref:zb,refFromURL:kU,remove:OU,runTransaction:b2,serverTimestamp:v2,set:vm,setPriority:xU,setWithPriority:VU,startAfter:KU,startAt:jU,update:MU},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eR="firebasestorage.googleapis.com",tR="storageBucket",P2=120*1e3,k2=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe extends qt{constructor(e,t,r=0){super(Kh(e),`Firebase Storage: ${t} (${Kh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,xe.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Kh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var De;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(De||(De={}));function Kh(n){return"storage/"+n}function bm(){const n="An unknown error occurred, please check the error payload for server response.";return new xe(De.UNKNOWN,n)}function N2(n){return new xe(De.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function D2(n){return new xe(De.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function O2(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new xe(De.UNAUTHENTICATED,n)}function x2(){return new xe(De.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function V2(n){return new xe(De.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function M2(){return new xe(De.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function L2(){return new xe(De.CANCELED,"User canceled the upload/download.")}function F2(n){return new xe(De.INVALID_URL,"Invalid URL '"+n+"'.")}function U2(n){return new xe(De.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function B2(){return new xe(De.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+tR+"' property when initializing the app?")}function q2(){return new xe(De.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function $2(){return new xe(De.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function W2(n){return new xe(De.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Xd(n){return new xe(De.INVALID_ARGUMENT,n)}function nR(){return new xe(De.APP_DELETED,"The Firebase app was deleted.")}function G2(n){return new xe(De.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function ia(n,e){return new xe(De.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ko(n){throw new xe(De.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Nt.makeFromUrl(e,t)}catch{return new Nt(e,"")}if(r.path==="")return r;throw U2(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(H){H.path.charAt(H.path.length-1)==="/"&&(H.path_=H.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function u(H){H.path_=decodeURIComponent(H.path)}const h="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",_=new RegExp(`^https?://${f}/${h}/b/${i}/o${m}`,"i"),v={bucket:1,path:3},P=t===eR?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",U=new RegExp(`^https?://${P}/${i}/${k}`,"i"),q=[{regex:a,indices:l,postModify:s},{regex:_,indices:v,postModify:u},{regex:U,indices:{bucket:1,path:2},postModify:u}];for(let H=0;H<q.length;H++){const Z=q[H],ie=Z.regex.exec(e);if(ie){const T=ie[Z.indices.bucket];let y=ie[Z.indices.path];y||(y=""),r=new Nt(T,y),Z.postModify(r);break}}if(r==null)throw F2(e);return r}}class z2{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j2(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function l(){return a===2}let u=!1;function h(...k){u||(u=!0,e.apply(null,k))}function f(k){i=setTimeout(()=>{i=null,n(_,l())},k)}function m(){s&&clearTimeout(s)}function _(k,...U){if(u){m();return}if(k){m(),h.call(null,k,...U);return}if(l()||o){m(),h.call(null,k,...U);return}r<64&&(r*=2);let q;a===1?(a=2,q=0):q=(r+Math.random())*1e3,f(q)}let v=!1;function P(k){v||(v=!0,m(),!u&&(i!==null?(k||(a=2),clearTimeout(i),f(0)):k||(a=1)))}return f(0),s=setTimeout(()=>{o=!0,P(!0)},t),P}function H2(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K2(n){return n!==void 0}function Q2(n){return typeof n=="object"&&!Array.isArray(n)}function Rm(n){return typeof n=="string"||n instanceof String}function wI(n){return Sm()&&n instanceof Blob}function Sm(){return typeof Blob<"u"}function vI(n,e,t,r){if(r<e)throw Xd(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Xd(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cm(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function rR(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var ci;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ci||(ci={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y2(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J2{constructor(e,t,r,i,s,o,a,l,u,h,f,m=!0,_=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=u,this.progressCallback_=h,this.connectionFactory_=f,this.retry=m,this.isUsingEmulator=_,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((v,P)=>{this.resolve_=v,this.reject_=P,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Oc(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const l=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===ci.NO_ERROR,l=s.getStatus();if(!a||Y2(l,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===ci.ABORT;r(!1,new Oc(!1,null,h));return}const u=this.successCodes_.indexOf(l)!==-1;r(!0,new Oc(u,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());K2(l)?s(l):s()}catch(l){o(l)}else if(a!==null){const l=bm();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?nR():L2();o(l)}else{const l=M2();o(l)}};this.canceled_?t(!1,new Oc(!1,null,!0)):this.backoffId_=j2(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&H2(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Oc{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function X2(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Z2(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function eB(n,e){e&&(n["X-Firebase-GMPID"]=e)}function tB(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function nB(n,e,t,r,i,s,o=!0,a=!1){const l=rR(n.urlParams),u=n.url+l,h=Object.assign({},n.headers);return eB(h,e),X2(h,t),Z2(h,s),tB(h,r),new J2(u,n.method,h,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rB(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function iB(...n){const e=rB();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Sm())return new Blob(n);throw new xe(De.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function sB(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oB(n){if(typeof atob>"u")throw W2("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Qh{constructor(e,t){this.data=e,this.contentType=t||null}}function iR(n,e){switch(n){case Qt.RAW:return new Qh(sR(e));case Qt.BASE64:case Qt.BASE64URL:return new Qh(oR(n,e));case Qt.DATA_URL:return new Qh(cB(e),lB(e))}throw bm()}function sR(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function aB(n){let e;try{e=decodeURIComponent(n)}catch{throw ia(Qt.DATA_URL,"Malformed data URL.")}return sR(e)}function oR(n,e){switch(n){case Qt.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw ia(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Qt.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw ia(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=oB(e)}catch(i){throw i.message.includes("polyfill")?i:ia(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class aR{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw ia(Qt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=uB(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function cB(n){const e=new aR(n);return e.base64?oR(Qt.BASE64,e.rest):aB(e.rest)}function lB(n){return new aR(n).contentType}function uB(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t){let r=0,i="";wI(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(wI(this.data_)){const r=this.data_,i=sB(r,e,t);return i===null?null:new tr(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new tr(r,!0)}}static getBlob(...e){if(Sm()){const t=e.map(r=>r instanceof tr?r.data_:r);return new tr(iB.apply(null,t))}else{const t=e.map(o=>Rm(o)?iR(Qt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let a=0;a<o.length;a++)i[s++]=o[a]}),new tr(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cR(n){let e;try{e=JSON.parse(n)}catch{return null}return Q2(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hB(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function dB(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function lR(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fB(n,e){return e}class ft{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||fB}}let xc=null;function pB(n){return!Rm(n)||n.length<2?n:lR(n)}function uR(){if(xc)return xc;const n=[];n.push(new ft("bucket")),n.push(new ft("generation")),n.push(new ft("metageneration")),n.push(new ft("name","fullPath",!0));function e(s,o){return pB(o)}const t=new ft("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new ft("size");return i.xform=r,n.push(i),n.push(new ft("timeCreated")),n.push(new ft("updated")),n.push(new ft("md5Hash",null,!0)),n.push(new ft("cacheControl",null,!0)),n.push(new ft("contentDisposition",null,!0)),n.push(new ft("contentEncoding",null,!0)),n.push(new ft("contentLanguage",null,!0)),n.push(new ft("contentType",null,!0)),n.push(new ft("metadata","customMetadata",!0)),xc=n,xc}function mB(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new Nt(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function gB(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return mB(r,n),r}function hR(n,e,t){const r=cR(e);return r===null?null:gB(n,r,t)}function _B(n,e,t,r){const i=cR(e);if(i===null||!Rm(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(u=>{const h=n.bucket,f=n.fullPath,m="/b/"+o(h)+"/o/"+o(f),_=Cm(m,t,r),v=rR({alt:"media",token:u});return _+v})[0]}function yB(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class dR{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fR(n){if(!n)throw bm()}function IB(n,e){function t(r,i){const s=hR(n,i,e);return fR(s!==null),s}return t}function EB(n,e){function t(r,i){const s=hR(n,i,e);return fR(s!==null),_B(s,i,n.host,n._protocol)}return t}function pR(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=x2():i=O2():t.getStatus()===402?i=D2(n.bucket):t.getStatus()===403?i=V2(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function TB(n){const e=pR(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=N2(n.path)),s.serverResponse=i.serverResponse,s}return t}function wB(n,e,t){const r=e.fullServerUrl(),i=Cm(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,a=new dR(i,s,EB(n,t),o);return a.errorHandler=TB(e),a}function vB(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function AB(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=vB(null,e)),r}function bB(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let q="";for(let H=0;H<2;H++)q=q+Math.random().toString().slice(2);return q}const l=a();o["Content-Type"]="multipart/related; boundary="+l;const u=AB(e,r,i),h=yB(u,t),f="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+l+`\r
Content-Type: `+u.contentType+`\r
\r
`,m=`\r
--`+l+"--",_=tr.getBlob(f,r,m);if(_===null)throw q2();const v={name:u.fullPath},P=Cm(s,n.host,n._protocol),k="POST",U=n.maxUploadRetryTime,$=new dR(P,k,IB(n,t),U);return $.urlParams=v,$.headers=o,$.body=_.uploadData(),$.errorHandler=pR(e),$}class RB{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ci.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ci.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ci.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i,s){if(this.sent_)throw ko("cannot .send() more than once");if(en(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ko("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ko("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ko("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ko("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class SB extends RB{initXhr(){this.xhr_.responseType="text"}}function mR(){return new SB}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,t){this._service=e,t instanceof Nt?this._location=t:this._location=Nt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new bi(e,t)}get root(){const e=new Nt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return lR(this._location.path)}get storage(){return this._service}get parent(){const e=hB(this._location.path);if(e===null)return null;const t=new Nt(this._location.bucket,e);return new bi(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw G2(e)}}function gR(n,e,t){n._throwIfRoot("uploadBytes");const r=bB(n.storage,n._location,uR(),new tr(e,!0),t);return n.storage.makeRequestWithTokens(r,mR).then(i=>({metadata:i,ref:n}))}function CB(n,e,t=Qt.RAW,r){n._throwIfRoot("uploadString");const i=iR(t,e),s={...r};return s.contentType==null&&i.contentType!=null&&(s.contentType=i.contentType),gR(n,i.data,s)}function PB(n){n._throwIfRoot("getDownloadURL");const e=wB(n.storage,n._location,uR());return n.storage.makeRequestWithTokens(e,mR).then(t=>{if(t===null)throw $2();return t})}function kB(n,e){const t=dB(n._location.path,e),r=new Nt(n._location.bucket,t);return new bi(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NB(n){return/^[A-Za-z]+:\/\//.test(n)}function DB(n,e){return new bi(n,e)}function _R(n,e){if(n instanceof Pm){const t=n;if(t._bucket==null)throw B2();const r=new bi(t,t._bucket);return e!=null?_R(r,e):r}else return e!==void 0?kB(n,e):n}function OB(n,e){if(e&&NB(e)){if(n instanceof Pm)return DB(n,e);throw Xd("To use ref(service, url), the first argument must be a Storage instance.")}else return _R(n,e)}function AI(n,e){const t=e==null?void 0:e[tR];return t==null?null:Nt.makeFromBucketSpec(t,n)}function xB(n,e,t,r={}){n.host=`${e}:${t}`;const i=en(e);i&&(Da(`https://${n.host}/b`),$l("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:rf(s,n.app.options.projectId))}class Pm{constructor(e,t,r,i,s,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=eR,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=P2,this._maxUploadRetryTime=k2,this._requests=new Set,i!=null?this._bucket=Nt.makeFromBucketSpec(i,this._host):this._bucket=AI(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Nt.makeFromBucketSpec(this._url,e):this._bucket=AI(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){vI("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){vI("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Ee(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new bi(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new z2(nR());{const o=nB(e,this._appId,r,i,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const bI="@firebase/storage",RI="0.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yR="storage";function eq(n,e,t){return n=M(n),gR(n,e,t)}function tq(n,e,t,r){return n=M(n),CB(n,e,t,r)}function nq(n){return n=M(n),PB(n)}function rq(n,e){return n=M(n),OB(n,e)}function iq(n=Vs(),e){n=M(n);const r=$t(n,yR).getImmediate({identifier:e}),i=nf("storage");return i&&VB(r,...i),r}function VB(n,e,t,r={}){xB(n,e,t,r)}function MB(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Pm(t,r,i,e,Cr)}function LB(){ut(new Ge(yR,MB,"PUBLIC").setMultipleInstances(!0)),$e(bI,RI,""),$e(bI,RI,"esm2020")}LB();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FB=new Map,UB={activated:!1,tokenObservers:[]};function Zt(n){return FB.get(n)||{...UB}}const SI={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BB{constructor(e,t,r,i,s){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new pt,this.pending.promise.catch(t=>{}),await qB(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new pt,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function qB(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $B={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Ll=new Mn("appCheck","AppCheck",$B);function IR(n){if(!Zt(n).activated)throw Ll.create("use-before-activation",{appName:n.name})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WB="firebase-app-check-database",GB=1,Zd="firebase-app-check-store";let Vc=null;function zB(){return Vc||(Vc=new Promise((n,e)=>{try{const t=indexedDB.open(WB,GB);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var i;e(Ll.create("storage-open",{originalErrorMessage:(i=r.target.error)==null?void 0:i.message}))},t.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(Zd,{keyPath:"compositeKey"})}}}catch(t){e(Ll.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}}),Vc)}function jB(n,e){return HB(KB(n),e)}async function HB(n,e){const r=(await zB()).transaction(Zd,"readwrite"),s=r.objectStore(Zd).put({compositeKey:n,value:e});return new Promise((o,a)=>{s.onsuccess=l=>{o()},r.onerror=l=>{var u;a(Ll.create("storage-set",{originalErrorMessage:(u=l.target.error)==null?void 0:u.message}))}})}function KB(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=new xs("@firebase/app-check");function CI(n,e){return Oa()?jB(n,e).catch(t=>{ef.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QB={error:"UNKNOWN_ERROR"};function YB(n){return Bl.encodeString(JSON.stringify(n),!1)}async function tf(n,e=!1,t=!1){const r=n.app;IR(r);const i=Zt(r);let s=i.token,o;if(s&&!Fo(s)&&(i.token=void 0,s=void 0),!s){const u=await i.cachedTokenPromise;u&&(Fo(u)?s=u:await CI(r,void 0))}if(!e&&s&&Fo(s))return{token:s.token};let a=!1;try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),a=!0),s=await Zt(r).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"||u.code==="appCheck/initial-throttle"?ef.warn(u.message):t&&ef.error(u),o=u}let l;return s?o?Fo(s)?l={token:s.token,internalError:o}:l=kI(o):(l={token:s.token},i.token=s,await CI(r,s)):l=kI(o),a&&e4(r,l),l}async function JB(n){const e=n.app;IR(e);const{provider:t}=Zt(e);{const{token:r}=await t.getToken();return{token:r}}}function XB(n,e,t,r){const{app:i}=n,s=Zt(i),o={next:t,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&Fo(s.token)){const a=s.token;Promise.resolve().then(()=>{t({token:a.token}),PI(n)}).catch(()=>{})}s.cachedTokenPromise.then(()=>PI(n))}function ER(n,e){const t=Zt(n),r=t.tokenObservers.filter(i=>i.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function PI(n){const{app:e}=n,t=Zt(e);let r=t.tokenRefresher;r||(r=ZB(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function ZB(n){const{app:e}=n;return new BB(async()=>{const t=Zt(e);let r;if(t.token?r=await tf(n,!0):r=await tf(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=Zt(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const i=t.token.expireTimeMillis-300*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},SI.RETRIAL_MIN_WAIT,SI.RETRIAL_MAX_WAIT)}function e4(n,e){const t=Zt(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Fo(n){return n.expireTimeMillis-Date.now()>0}function kI(n){return{token:YB(QB),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t4{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=Zt(this.app);for(const t of e)ER(this.app,t.next);return Promise.resolve()}}function n4(n,e){return new t4(n,e)}function r4(n){return{getToken:e=>tf(n,e),getLimitedUseToken:()=>JB(n),addTokenListener:e=>XB(n,"INTERNAL",e),removeTokenListener:e=>ER(n.app,e)}}const i4="@firebase/app-check",s4="0.11.1",o4="app-check",NI="app-check-internal";function a4(){ut(new Ge(o4,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return n4(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(NI).initialize()})),ut(new Ge(NI,n=>{const e=n.getProvider("app-check").getImmediate();return r4(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),$e(i4,s4)}a4();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="analytics",c4="firebase_id",l4="origin",u4=60*1e3,h4="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",km="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=new xs("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d4={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ot=new Mn("analytics","Analytics",d4);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f4(n){if(!n.startsWith(km)){const e=Ot.create("invalid-gtag-resource",{gtagURL:n});return _t.warn(e.message),""}return n}function TR(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function p4(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function m4(n,e){const t=p4("firebase-js-sdk-policy",{createScriptURL:f4}),r=document.createElement("script"),i=`${km}?l=${n}&id=${e}`;r.src=t?t==null?void 0:t.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function g4(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function _4(n,e,t,r,i,s){const o=r[i];try{if(o)await e[o];else{const l=(await TR(t)).find(u=>u.measurementId===i);l&&await e[l.appId]}}catch(a){_t.error(a)}n("config",i,s)}async function y4(n,e,t,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const a=await TR(t);for(const l of o){const u=a.find(f=>f.measurementId===l),h=u&&e[u.appId];if(h)s.push(h);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),n("event",r,i||{})}catch(s){_t.error(s)}}function I4(n,e,t,r){async function i(s,...o){try{if(s==="event"){const[a,l]=o;await y4(n,e,t,a,l)}else if(s==="config"){const[a,l]=o;await _4(n,e,t,r,a,l)}else if(s==="consent"){const[a,l]=o;n("consent",a,l)}else if(s==="get"){const[a,l,u]=o;n("get",a,l,u)}else if(s==="set"){const[a]=o;n("set",a)}else n(s,...o)}catch(a){_t.error(a)}}return i}function E4(n,e,t,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=I4(s,n,e,t),{gtagCore:s,wrappedGtag:window[i]}}function T4(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(km)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w4=30,v4=1e3;class A4{constructor(e={},t=v4){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const wR=new A4;function b4(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function R4(n){var o;const{appId:e,apiKey:t}=n,r={method:"GET",headers:b4(t)},i=h4.replace("{app-id}",e),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let a="";try{const l=await s.json();(o=l.error)!=null&&o.message&&(a=l.error.message)}catch{}throw Ot.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a})}return s.json()}async function S4(n,e=wR,t){const{appId:r,apiKey:i,measurementId:s}=n.options;if(!r)throw Ot.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw Ot.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new k4;return setTimeout(async()=>{a.abort()},u4),vR({appId:r,apiKey:i,measurementId:s},o,a,e)}async function vR(n,{throttleEndTimeMillis:e,backoffCount:t},r,i=wR){var a;const{appId:s,measurementId:o}=n;try{await C4(r,e)}catch(l){if(o)return _t.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:s,measurementId:o};throw l}try{const l=await R4(n);return i.deleteThrottleMetadata(s),l}catch(l){const u=l;if(!P4(u)){if(i.deleteThrottleMetadata(s),o)return _t.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:s,measurementId:o};throw l}const h=Number((a=u==null?void 0:u.customData)==null?void 0:a.httpStatus)===503?Mg(t,i.intervalMillis,w4):Mg(t,i.intervalMillis),f={throttleEndTimeMillis:Date.now()+h,backoffCount:t+1};return i.setThrottleMetadata(s,f),_t.debug(`Calling attemptFetch again in ${h} millis`),vR(n,f,r,i)}}function C4(n,e){return new Promise((t,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(t,i);n.addEventListener(()=>{clearTimeout(s),r(Ot.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function P4(n){if(!(n instanceof qt)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class k4{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function N4(n,e,t,r,i){if(i&&i.global){n("event",t,r);return}else{const s=await e,o={...r,send_to:s};n("event",t,o)}}async function D4(n,e,t,r){if(r&&r.global){const i={};for(const s of Object.keys(t))i[`user_properties.${s}`]=t[s];return n("set",i),Promise.resolve()}else{const i=await e;n("config",i,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function O4(){if(Oa())try{await of()}catch(n){return _t.warn(Ot.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return _t.warn(Ot.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function x4(n,e,t,r,i,s,o){const a=S4(n);a.then(m=>{t[m.measurementId]=m.appId,n.options.measurementId&&m.measurementId!==n.options.measurementId&&_t.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>_t.error(m)),e.push(a);const l=O4().then(m=>{if(m)return r.getId()}),[u,h]=await Promise.all([a,l]);T4(s)||m4(s,u.measurementId),i("js",new Date);const f=(o==null?void 0:o.config)??{};return f[l4]="firebase",f.update=!0,h!=null&&(f[c4]=h),i("config",u.measurementId,f),u.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V4{constructor(e){this.app=e}_delete(){return delete ss[this.app.options.appId],Promise.resolve()}}let ss={},DI=[];const OI={};let Yh="dataLayer",M4="gtag",xI,Nm,VI=!1;function L4(){const n=[];if(HI()&&n.push("This is a browser extension environment."),JI()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,i)=>`(${i+1}) ${r}`).join(" "),t=Ot.create("invalid-analytics-context",{errorInfo:e});_t.warn(t.message)}}function F4(n,e,t){L4();const r=n.options.appId;if(!r)throw Ot.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)_t.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ot.create("no-api-key");if(ss[r]!=null)throw Ot.create("already-exists",{id:r});if(!VI){g4(Yh);const{wrappedGtag:s,gtagCore:o}=E4(ss,DI,OI,Yh,M4);Nm=s,xI=o,VI=!0}return ss[r]=x4(n,DI,OI,e,xI,Yh,t),new V4(n)}function sq(n=Vs()){n=M(n);const e=$t(n,Fl);return e.isInitialized()?e.getImmediate():U4(n)}function U4(n,e={}){const t=$t(n,Fl);if(t.isInitialized()){const i=t.getImmediate();if(xt(e,t.getOptions()))return i;throw Ot.create("already-initialized")}return t.initialize({options:e})}function B4(n,e,t){n=M(n),D4(Nm,ss[n.app.options.appId],e,t).catch(r=>_t.error(r))}function q4(n,e,t,r){n=M(n),N4(Nm,ss[n.app.options.appId],e,t,r).catch(i=>_t.error(i))}const MI="@firebase/analytics",LI="0.10.20";function $4(){ut(new Ge(Fl,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return F4(r,i,t)},"PUBLIC")),ut(new Ge("analytics-internal",n,"PRIVATE")),$e(MI,LI),$e(MI,LI,"esm2020");function n(e){try{const t=e.getProvider(Fl).getImmediate();return{logEvent:(r,i,s)=>q4(t,r,i,s),setUserProperties:(r,i)=>B4(t,r,i)}}catch(t){throw Ot.create("interop-component-reg-failed",{reason:t})}}}$4();export{LU as A,gV as B,DU as C,v2 as D,ZV as E,rq as F,tq as G,eq as H,nq as I,Ai as J,qP as K,$U as L,X4 as M,J4 as N,O1 as O,sq as P,_k as Q,G4 as R,Q4 as S,Z4 as T,$x as a,_2 as b,iq as c,Y4 as d,LV as e,Fx as f,rD as g,xv as h,mC as i,KV as j,zV as k,JV as l,mV as m,oV as n,Dd as o,xV as p,hV as q,eM as r,rV as s,rM as t,zb as u,vm as v,dV as w,jb as x,XV as y,MU as z};
