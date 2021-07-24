/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var e={669:(e,t,r)=>{e.exports=r(609)},448:(e,t,r)=>{"use strict";var n=r(867),o=r(26),i=r(372),a=r(327),s=r(97),c=r(109),l=r(985),u=r(61);e.exports=function(e){return new Promise((function(t,r){var p=e.data,f=e.headers;n.isFormData(p)&&delete f["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var b=e.auth.username||"",h=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";f.Authorization="Basic "+btoa(b+":"+h)}var m=s(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),a(m,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?c(d.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:n,config:e,request:d};o(t,r,i),d=null}},d.onabort=function(){d&&(r(u("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){r(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(u(t,e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var x=(e.withCredentials||l(m))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;x&&(f[e.xsrfHeaderName]=x)}if("setRequestHeader"in d&&n.forEach(f,(function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete f[t]:d.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),r(e),d=null)})),p||(p=null),d.send(p)}))}},609:(e,t,r)=>{"use strict";var n=r(867),o=r(849),i=r(321),a=r(185);function s(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var c=s(r(655));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=r(263),c.CancelToken=r(972),c.isCancel=r(502),c.all=function(e){return Promise.all(e)},c.spread=r(713),c.isAxiosError=r(268),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var n=r(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(867),o=r(327),i=r(782),a=r(572),s=r(185);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=c},782:(e,t,r)=>{"use strict";var n=r(867);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,r)=>{"use strict";var n=r(793),o=r(303);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},61:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,o,i){var a=new Error(e);return n(a,t,r,o,i)}},572:(e,t,r)=>{"use strict";var n=r(867),o=r(527),i=r(502),a=r(655);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){t=t||{};var r={},o=["url","method","data"],i=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function l(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(e[o],t[o])}n.forEach(o,(function(e){n.isUndefined(t[e])||(r[e]=c(void 0,t[e]))})),n.forEach(i,l),n.forEach(a,(function(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(void 0,t[o])})),n.forEach(s,(function(n){n in t?r[n]=c(e[n],t[n]):n in e&&(r[n]=c(void 0,e[n]))}));var u=o.concat(i).concat(a).concat(s),p=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===u.indexOf(e)}));return n.forEach(p,l),r}},26:(e,t,r)=>{"use strict";var n=r(61);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},527:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},655:(e,t,r)=>{"use strict";var n=r(867),o=r(16),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(s=r(448)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(i)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var n=r(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var a=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},109:(e,t,r)=>{"use strict";var n=r(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,a={};return e?(n.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([r]):a[t]?a[t]+", "+r:r}})),a):a}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,r)=>{"use strict";var n=r(849),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function l(e){return"[object Function]"===o.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!a(e)&&null!==e.constructor&&!a(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:a,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:l,isStream:function(e){return s(e)&&l(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function r(r,n){c(t[n])&&c(r)?t[n]=e(t[n],r):c(r)?t[n]=e({},r):i(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)u(arguments[n],r);return t},extend:function(e,t,r){return u(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},795:function(e,t,r){var n;e=r.nmd(e),function(){"use strict";var o={function:!0,object:!0},i=o[typeof window]&&window||this,a=o[typeof t]&&t,s=o.object&&e&&!e.nodeType&&e,c=a&&s&&"object"==typeof r.g&&r.g;!c||c.global!==c&&c.window!==c&&c.self!==c||(i=c);var l=Math.pow(2,53)-1,u=/\bOpera/,p=Object.prototype,f=p.hasOwnProperty,d=p.toString;function b(e){return(e=String(e)).charAt(0).toUpperCase()+e.slice(1)}function h(e){return e=y(e),/^(?:webOS|i(?:OS|P))/.test(e)?e:b(e)}function m(e,t){for(var r in e)f.call(e,r)&&t(e[r],r,e)}function x(e){return null==e?b(e):d.call(e).slice(8,-1)}function g(e){return String(e).replace(/([ -])(?!$)/g,"$1?")}function S(e,t){var r=null;return function(e,t){var r=-1,n=e?e.length:0;if("number"==typeof n&&n>-1&&n<=l)for(;++r<n;)t(e[r],r);else m(e,t)}(e,(function(n,o){r=t(r,n,o,e)})),r}function y(e){return String(e).replace(/^ +| +$/g,"")}var v=function e(t){var r=i,n=t&&"object"==typeof t&&"String"!=x(t);n&&(r=t,t=null);var o=r.navigator||{},a=o.userAgent||"";t||(t=a);var s,c,l,p,f=n?!!o.likeChrome:/\bChrome\b/.test(t)&&!/internal|\n/i.test(d.toString()),b="Object",v=n?b:"ScriptBridgingProxyObject",w=n?b:"Environment",O=n&&r.java?"JavaPackage":x(r.java),E=n?b:"RuntimeObject",C=/\bJava/.test(O)&&r.java,P=C&&x(r.environment)==w,R=C?"a":"α",B=C?"b":"β",M=r.document||{},A=r.operamini||r.opera,k=u.test(k=n&&A?A["[[Class]]"]:x(A))?k:A=null,T=t,j=[],N=null,F=t==a,W=F&&A&&"function"==typeof A.version&&A.version(),I=S([{label:"EdgeHTML",pattern:"Edge"},"Trident",{label:"WebKit",pattern:"AppleWebKit"},"iCab","Presto","NetFront","Tasman","KHTML","Gecko"],(function(e,r){return e||RegExp("\\b"+(r.pattern||g(r))+"\\b","i").exec(t)&&(r.label||r)})),U=S(["Adobe AIR","Arora","Avant Browser","Breach","Camino","Electron","Epiphany","Fennec","Flock","Galeon","GreenBrowser","iCab","Iceweasel","K-Meleon","Konqueror","Lunascape","Maxthon",{label:"Microsoft Edge",pattern:"(?:Edge|Edg|EdgA|EdgiOS)"},"Midori","Nook Browser","PaleMoon","PhantomJS","Raven","Rekonq","RockMelt",{label:"Samsung Internet",pattern:"SamsungBrowser"},"SeaMonkey",{label:"Silk",pattern:"(?:Cloud9|Silk-Accelerated)"},"Sleipnir","SlimBrowser",{label:"SRWare Iron",pattern:"Iron"},"Sunrise","Swiftfox","Vivaldi","Waterfox","WebPositive",{label:"Yandex Browser",pattern:"YaBrowser"},{label:"UC Browser",pattern:"UCBrowser"},"Opera Mini",{label:"Opera Mini",pattern:"OPiOS"},"Opera",{label:"Opera",pattern:"OPR"},"Chromium","Chrome",{label:"Chrome",pattern:"(?:HeadlessChrome)"},{label:"Chrome Mobile",pattern:"(?:CriOS|CrMo)"},{label:"Firefox",pattern:"(?:Firefox|Minefield)"},{label:"Firefox for iOS",pattern:"FxiOS"},{label:"IE",pattern:"IEMobile"},{label:"IE",pattern:"MSIE"},"Safari"],(function(e,r){return e||RegExp("\\b"+(r.pattern||g(r))+"\\b","i").exec(t)&&(r.label||r)})),L=X([{label:"BlackBerry",pattern:"BB10"},"BlackBerry",{label:"Galaxy S",pattern:"GT-I9000"},{label:"Galaxy S2",pattern:"GT-I9100"},{label:"Galaxy S3",pattern:"GT-I9300"},{label:"Galaxy S4",pattern:"GT-I9500"},{label:"Galaxy S5",pattern:"SM-G900"},{label:"Galaxy S6",pattern:"SM-G920"},{label:"Galaxy S6 Edge",pattern:"SM-G925"},{label:"Galaxy S7",pattern:"SM-G930"},{label:"Galaxy S7 Edge",pattern:"SM-G935"},"Google TV","Lumia","iPad","iPod","iPhone","Kindle",{label:"Kindle Fire",pattern:"(?:Cloud9|Silk-Accelerated)"},"Nexus","Nook","PlayBook","PlayStation Vita","PlayStation","TouchPad","Transformer",{label:"Wii U",pattern:"WiiU"},"Wii","Xbox One",{label:"Xbox 360",pattern:"Xbox"},"Xoom"]),$=S({Apple:{iPad:1,iPhone:1,iPod:1},Alcatel:{},Archos:{},Amazon:{Kindle:1,"Kindle Fire":1},Asus:{Transformer:1},"Barnes & Noble":{Nook:1},BlackBerry:{PlayBook:1},Google:{"Google TV":1,Nexus:1},HP:{TouchPad:1},HTC:{},Huawei:{},Lenovo:{},LG:{},Microsoft:{Xbox:1,"Xbox One":1},Motorola:{Xoom:1},Nintendo:{"Wii U":1,Wii:1},Nokia:{Lumia:1},Oppo:{},Samsung:{"Galaxy S":1,"Galaxy S2":1,"Galaxy S3":1,"Galaxy S4":1},Sony:{PlayStation:1,"PlayStation Vita":1},Xiaomi:{Mi:1,Redmi:1}},(function(e,r,n){return e||(r[L]||r[/^[a-z]+(?: +[a-z]+\b)*/i.exec(L)]||RegExp("\\b"+g(n)+"(?:\\b|\\w*\\d)","i").exec(t))&&n})),G=S(["Windows Phone","KaiOS","Android","CentOS",{label:"Chrome OS",pattern:"CrOS"},"Debian",{label:"DragonFly BSD",pattern:"DragonFly"},"Fedora","FreeBSD","Gentoo","Haiku","Kubuntu","Linux Mint","OpenBSD","Red Hat","SuSE","Ubuntu","Xubuntu","Cygwin","Symbian OS","hpwOS","webOS ","webOS","Tablet OS","Tizen","Linux","Mac OS X","Macintosh","Mac","Windows 98;","Windows "],(function(e,r){var n=r.pattern||g(r);return!e&&(e=RegExp("\\b"+n+"(?:/[\\d.]+|[ \\w.]*)","i").exec(t))&&(e=function(e,t,r){var n={"10.0":"10",6.4:"10 Technical Preview",6.3:"8.1",6.2:"8",6.1:"Server 2008 R2 / 7","6.0":"Server 2008 / Vista",5.2:"Server 2003 / XP 64-bit",5.1:"XP",5.01:"2000 SP1","5.0":"2000","4.0":"NT","4.90":"ME"};return t&&r&&/^Win/i.test(e)&&!/^Windows Phone /i.test(e)&&(n=n[/[\d.]+$/.exec(e)])&&(e="Windows "+n),e=String(e),t&&r&&(e=e.replace(RegExp(t,"i"),r)),h(e.replace(/ ce$/i," CE").replace(/\bhpw/i,"web").replace(/\bMacintosh\b/,"Mac OS").replace(/_PowerPC\b/i," OS").replace(/\b(OS X) [^ \d]+/i,"$1").replace(/\bMac (OS X)\b/,"$1").replace(/\/(\d)/," $1").replace(/_/g,".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i,"").replace(/\bx86\.64\b/gi,"x86_64").replace(/\b(Windows Phone) OS\b/,"$1").replace(/\b(Chrome OS \w+) [\d.]+\b/,"$1").split(" on ")[0])}(e,n,r.label||r)),e}));function X(e){return S(e,(function(e,r){var n=r.pattern||g(r);return!e&&(e=RegExp("\\b"+n+" *\\d+[.\\w_]*","i").exec(t)||RegExp("\\b"+n+" *\\w+-[\\w]*","i").exec(t)||RegExp("\\b"+n+"(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)","i").exec(t))&&((e=String(r.label&&!RegExp(n,"i").test(r.label)?r.label:e).split("/"))[1]&&!/[\d.]+/.test(e[0])&&(e[0]+=" "+e[1]),r=r.label||r,e=h(e[0].replace(RegExp(n,"i"),r).replace(RegExp("; *(?:"+r+"[_-])?","i")," ").replace(RegExp("("+r+")[-_.]?(\\w)","i"),"$1 $2"))),e}))}function q(e){return S(e,(function(e,r){return e||(RegExp(r+"(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)","i").exec(t)||0)[1]||null}))}if(I&&(I=[I]),/\bAndroid\b/.test(G)&&!L&&(s=/\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t))&&(L=y(s[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i,"")||null),$&&!L?L=X([$]):$&&L&&(L=L.replace(RegExp("^("+g($)+")[-_.\\s]","i"),$+" ").replace(RegExp("^("+g($)+")[-_.]?(\\w)","i"),$+" $2")),(s=/\bGoogle TV\b/.exec(L))&&(L=s[0]),/\bSimulator\b/i.test(t)&&(L=(L?L+" ":"")+"Simulator"),"Opera Mini"==U&&/\bOPiOS\b/.test(t)&&j.push("running in Turbo/Uncompressed mode"),"IE"==U&&/\blike iPhone OS\b/.test(t)?($=(s=e(t.replace(/like iPhone OS/,""))).manufacturer,L=s.product):/^iP/.test(L)?(U||(U="Safari"),G="iOS"+((s=/ OS ([\d_]+)/i.exec(t))?" "+s[1].replace(/_/g,"."):"")):"Konqueror"==U&&/^Linux\b/i.test(G)?G="Kubuntu":$&&"Google"!=$&&(/Chrome/.test(U)&&!/\bMobile Safari\b/i.test(t)||/\bVita\b/.test(L))||/\bAndroid\b/.test(G)&&/^Chrome/.test(U)&&/\bVersion\//i.test(t)?(U="Android Browser",G=/\bAndroid\b/.test(G)?G:"Android"):"Silk"==U?(/\bMobi/i.test(t)||(G="Android",j.unshift("desktop mode")),/Accelerated *= *true/i.test(t)&&j.unshift("accelerated")):"UC Browser"==U&&/\bUCWEB\b/.test(t)?j.push("speed mode"):"PaleMoon"==U&&(s=/\bFirefox\/([\d.]+)\b/.exec(t))?j.push("identifying as Firefox "+s[1]):"Firefox"==U&&(s=/\b(Mobile|Tablet|TV)\b/i.exec(t))?(G||(G="Firefox OS"),L||(L=s[1])):!U||(s=!/\bMinefield\b/i.test(t)&&/\b(?:Firefox|Safari)\b/.exec(U))?(U&&!L&&/[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(s+"/")+8))&&(U=null),(s=L||$||G)&&(L||$||/\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(G))&&(U=/[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(G)?G:s)+" Browser")):"Electron"==U&&(s=(/\bChrome\/([\d.]+)\b/.exec(t)||0)[1])&&j.push("Chromium "+s),W||(W=q(["(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)","Version",g(U),"(?:Firefox|Minefield|NetFront)"])),(s=("iCab"==I&&parseFloat(W)>3?"WebKit":/\bOpera\b/.test(U)&&(/\bOPR\b/.test(t)?"Blink":"Presto"))||/\b(?:Midori|Nook|Safari)\b/i.test(t)&&!/^(?:Trident|EdgeHTML)$/.test(I)&&"WebKit"||!I&&/\bMSIE\b/i.test(t)&&("Mac OS"==G?"Tasman":"Trident")||"WebKit"==I&&/\bPlayStation\b(?! Vita\b)/i.test(U)&&"NetFront")&&(I=[s]),"IE"==U&&(s=(/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t)||0)[1])?(U+=" Mobile",G="Windows Phone "+(/\+$/.test(s)?s:s+".x"),j.unshift("desktop mode")):/\bWPDesktop\b/i.test(t)?(U="IE Mobile",G="Windows Phone 8.x",j.unshift("desktop mode"),W||(W=(/\brv:([\d.]+)/.exec(t)||0)[1])):"IE"!=U&&"Trident"==I&&(s=/\brv:([\d.]+)/.exec(t))&&(U&&j.push("identifying as "+U+(W?" "+W:"")),U="IE",W=s[1]),F){if("global",p=null!=(l=r)?typeof l.global:"number",/^(?:boolean|number|string|undefined)$/.test(p)||"object"==p&&!l.global)x(s=r.runtime)==v?(U="Adobe AIR",G=s.flash.system.Capabilities.os):x(s=r.phantom)==E?(U="PhantomJS",W=(s=s.version||null)&&s.major+"."+s.minor+"."+s.patch):"number"==typeof M.documentMode&&(s=/\bTrident\/(\d+)/i.exec(t))?(W=[W,M.documentMode],(s=+s[1]+4)!=W[1]&&(j.push("IE "+W[1]+" mode"),I&&(I[1]=""),W[1]=s),W="IE"==U?String(W[1].toFixed(1)):W[0]):"number"==typeof M.documentMode&&/^(?:Chrome|Firefox)\b/.test(U)&&(j.push("masking as "+U+" "+W),U="IE",W="11.0",I=["Trident"],G="Windows");else if(C&&(T=(s=C.lang.System).getProperty("os.arch"),G=G||s.getProperty("os.name")+" "+s.getProperty("os.version")),P){try{W=r.require("ringo/engine").version.join("."),U="RingoJS"}catch(e){(s=r.system)&&s.global.system==r.system&&(U="Narwhal",G||(G=s[0].os||null))}U||(U="Rhino")}else"object"==typeof r.process&&!r.process.browser&&(s=r.process)&&("object"==typeof s.versions&&("string"==typeof s.versions.electron?(j.push("Node "+s.versions.node),U="Electron",W=s.versions.electron):"string"==typeof s.versions.nw&&(j.push("Chromium "+W,"Node "+s.versions.node),U="NW.js",W=s.versions.nw)),U||(U="Node.js",T=s.arch,G=s.platform,W=(W=/[\d.]+/.exec(s.version))?W[0]:null));G=G&&h(G)}if(W&&(s=/(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(W)||/(?:alpha|beta)(?: ?\d)?/i.exec(t+";"+(F&&o.appMinorVersion))||/\bMinefield\b/i.test(t)&&"a")&&(N=/b/i.test(s)?"beta":"alpha",W=W.replace(RegExp(s+"\\+?$"),"")+("beta"==N?B:R)+(/\d+\+?/.exec(s)||"")),"Fennec"==U||"Firefox"==U&&/\b(?:Android|Firefox OS|KaiOS)\b/.test(G))U="Firefox Mobile";else if("Maxthon"==U&&W)W=W.replace(/\.[\d.]+/,".x");else if(/\bXbox\b/i.test(L))"Xbox 360"==L&&(G=null),"Xbox 360"==L&&/\bIEMobile\b/.test(t)&&j.unshift("mobile mode");else if(!/^(?:Chrome|IE|Opera)$/.test(U)&&(!U||L||/Browser|Mobi/.test(U))||"Windows CE"!=G&&!/Mobi/i.test(t))if("IE"==U&&F)try{null===r.external&&j.unshift("platform preview")}catch(e){j.unshift("embedded")}else(/\bBlackBerry\b/.test(L)||/\bBB10\b/.test(t))&&(s=(RegExp(L.replace(/ +/g," *")+"/([.\\d]+)","i").exec(t)||0)[1]||W)?(G=((s=[s,/BB10/.test(t)])[1]?(L=null,$="BlackBerry"):"Device Software")+" "+s[0],W=null):this!=m&&"Wii"!=L&&(F&&A||/Opera/.test(U)&&/\b(?:MSIE|Firefox)\b/i.test(t)||"Firefox"==U&&/\bOS X (?:\d+\.){2,}/.test(G)||"IE"==U&&(G&&!/^Win/.test(G)&&W>5.5||/\bWindows XP\b/.test(G)&&W>8||8==W&&!/\bTrident\b/.test(t)))&&!u.test(s=e.call(m,t.replace(u,"")+";"))&&s.name&&(s="ing as "+s.name+((s=s.version)?" "+s:""),u.test(U)?(/\bIE\b/.test(s)&&"Mac OS"==G&&(G=null),s="identify"+s):(s="mask"+s,U=k?h(k.replace(/([a-z])([A-Z])/g,"$1 $2")):"Opera",/\bIE\b/.test(s)&&(G=null),F||(W=null)),I=["Presto"],j.push(s));else U+=" Mobile";(s=(/\bAppleWebKit\/([\d.]+\+?)/i.exec(t)||0)[1])&&(s=[parseFloat(s.replace(/\.(\d)$/,".0$1")),s],"Safari"==U&&"+"==s[1].slice(-1)?(U="WebKit Nightly",N="alpha",W=s[1].slice(0,-1)):W!=s[1]&&W!=(s[2]=(/\bSafari\/([\d.]+\+?)/i.exec(t)||0)[1])||(W=null),s[1]=(/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t)||0)[1],537.36==s[0]&&537.36==s[2]&&parseFloat(s[1])>=28&&"WebKit"==I&&(I=["Blink"]),F&&(f||s[1])?(I&&(I[1]="like Chrome"),s=s[1]||((s=s[0])<530?1:s<532?2:s<532.05?3:s<533?4:s<534.03?5:s<534.07?6:s<534.1?7:s<534.13?8:s<534.16?9:s<534.24?10:s<534.3?11:s<535.01?12:s<535.02?"13+":s<535.07?15:s<535.11?16:s<535.19?17:s<536.05?18:s<536.1?19:s<537.01?20:s<537.11?"21+":s<537.13?23:s<537.18?24:s<537.24?25:s<537.36?26:"Blink"!=I?"27":"28")):(I&&(I[1]="like Safari"),s=(s=s[0])<400?1:s<500?2:s<526?3:s<533?4:s<534?"4+":s<535?5:s<537?6:s<538?7:s<601?8:s<602?9:s<604?10:s<606?11:s<608?12:"12"),I&&(I[1]+=" "+(s+="number"==typeof s?".x":/[.+]/.test(s)?"":"+")),"Safari"==U&&(!W||parseInt(W)>45)?W=s:"Chrome"==U&&/\bHeadlessChrome/i.test(t)&&j.unshift("headless")),"Opera"==U&&(s=/\bzbov|zvav$/.exec(G))?(U+=" ",j.unshift("desktop mode"),"zvav"==s?(U+="Mini",W=null):U+="Mobile",G=G.replace(RegExp(" *"+s+"$"),"")):"Safari"==U&&/\bChrome\b/.exec(I&&I[1])?(j.unshift("desktop mode"),U="Chrome Mobile",W=null,/\bOS X\b/.test(G)?($="Apple",G="iOS 4.3+"):G=null):/\bSRWare Iron\b/.test(U)&&!W&&(W=q("Chrome")),W&&0==W.indexOf(s=/[\d.]+$/.exec(G))&&t.indexOf("/"+s+"-")>-1&&(G=y(G.replace(s,""))),G&&-1!=G.indexOf(U)&&!RegExp(U+" OS").test(G)&&(G=G.replace(RegExp(" *"+g(U)+" *"),"")),I&&!/\b(?:Avant|Nook)\b/.test(U)&&(/Browser|Lunascape|Maxthon/.test(U)||"Safari"!=U&&/^iOS/.test(G)&&/\bSafari\b/.test(I[1])||/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(U)&&I[1])&&(s=I[I.length-1])&&j.push(s),j.length&&(j=["("+j.join("; ")+")"]),$&&L&&L.indexOf($)<0&&j.push("on "+$),L&&j.push((/^on /.test(j[j.length-1])?"":"on ")+L),G&&(s=/ ([\d.+]+)$/.exec(G),c=s&&"/"==G.charAt(G.length-s[0].length-1),G={architecture:32,family:s&&!c?G.replace(s[0],""):G,version:s?s[1]:null,toString:function(){var e=this.version;return this.family+(e&&!c?" "+e:"")+(64==this.architecture?" 64-bit":"")}}),(s=/\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(T))&&!/\bi686\b/i.test(T)?(G&&(G.architecture=64,G.family=G.family.replace(RegExp(" *"+s),"")),U&&(/\bWOW64\b/i.test(t)||F&&/\w(?:86|32)$/.test(o.cpuClass||o.platform)&&!/\bWin64; x64\b/i.test(t))&&j.unshift("32-bit")):G&&/^OS X/.test(G.family)&&"Chrome"==U&&parseFloat(W)>=39&&(G.architecture=64),t||(t=null);var D={};return D.description=t,D.layout=I&&I[0],D.manufacturer=$,D.name=U,D.prerelease=N,D.product=L,D.ua=t,D.version=U&&W,D.os=G||{architecture:null,family:null,version:null,toString:function(){return"null"}},D.parse=e,D.toString=function(){return this.description||""},D.version&&j.unshift(W),D.name&&j.unshift(U),G&&U&&(G!=String(G).split(" ")[0]||G!=U.split(" ")[0]&&!L)&&j.push(L?"("+G+")":"on "+G),j.length&&(D.description=j.join(" ")),D}();i.platform=v,void 0===(n=function(){return v}.call(t,r,t,e))||(e.exports=n)}.call(this)}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{"use strict";var e=r(669),t=r.n(e),n=r(795),o=function(){function e(){}return e.init=function(e){var t=this,r=e.key;window.addEventListener("error",(function(e){return t.onError(r,e)}))},e.onError=function(e,r){var o,i={apiKey:e,name:r.error.name,message:r.message,source:r.filename,colNo:r.colno,lineNo:r.lineno,stack:r.error.stack,browserName:n.name,browserVersion:(null===(o=n.description.split("on")[0])||void 0===o?void 0:o.split(" ")[1])||"unknow",osName:n.os.family,osVersion:n.os.version||"unknow",deviceName:"unknow",deviceModel:"unknow"};t().post("https://bts-backend.herokuapp.com/api/projects/errors",i)},e}();window.BTS=o})()})();