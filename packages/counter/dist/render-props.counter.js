!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["exports","react","prop-types"],e):e(t.Counter={},t.React,t.PropTypes)}(this,function(t,e,r){"use strict";var n;function o(t,e,r,o){n||(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=t&&t.defaultProps,u=arguments.length-3;if(e||0===u||(e={children:void 0}),e&&i)for(var a in i)void 0===e[a]&&(e[a]=i[a]);else e||(e=i||{});if(1===u)e.children=o;else if(u>1){for(var c=Array(u),f=0;u>f;f++)c[f]=arguments[f+3];e.children=c}return{$$typeof:n,type:t,key:void 0===r?null:""+r,ref:null,props:e,_owner:null}}function i(){return(i=Object.assign||function(t){for(var e=1;arguments.length>e;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}e=e&&e.hasOwnProperty("default")?e.default:e,r=r&&r.hasOwnProperty("default")?r.default:r;var a=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t},c=function(t){return Object(a(t))},f={}.hasOwnProperty,l=function(t,e){return f.call(t,e)};function s(t,e){return t(e={exports:{}},e.exports),e.exports}var p=s(function(t){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)}),y=p["__core-js_shared__"]||(p["__core-js_shared__"]={}),v=function(t){return y[t]||(y[t]={})},h=0,b=Math.random(),d=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++h+b).toString(36))},m=v("keys"),O=function(t){return m[t]||(m[t]=d(t))},g=O("IE_PROTO"),S=Object.prototype,w=Object.getPrototypeOf||function(t){return t=c(t),l(t,g)?t[g]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?S:null},j=s(function(t){var e=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=e)}),_=function(t,e,r){if(function(e){if("function"!=typeof t)throw TypeError(t+" is not a function!")}(),void 0===e)return t;switch(r){case 1:return function(r){return t.call(e,r)};case 2:return function(r,n){return t.call(e,r,n)};case 3:return function(r,n,o){return t.call(e,r,n,o)}}return function(){return t.apply(e,arguments)}},P=function(t){return"object"==typeof t?null!==t:"function"==typeof t},E=function(t){if(!P(t))throw TypeError(t+" is not an object!");return t},x=function(t){try{return!!t()}catch(t){return!0}};function V(){return 7}var L=!x(function(){return 7!=Object.defineProperty({},"a",{get:V}).a}),T=p.document,C=P(T)&&P(T.createElement),M=function(t){return C?T.createElement(t):{}};function N(){return 7}var k=!L&&!x(function(){return 7!=Object.defineProperty(M("div"),"a",{get:N}).a}),F=function(t,e){if(!P(t))return t;var r,n;if(e&&"function"==typeof(r=t.toString)&&!P(n=r.call(t)))return n;if("function"==typeof(r=t.valueOf)&&!P(n=r.call(t)))return n;if(!e&&"function"==typeof(r=t.toString)&&!P(n=r.call(t)))return n;throw TypeError("Can't convert object to primitive value")},A=Object.defineProperty,I={f:L?Object.defineProperty:function(t,e,r){if(E(t),e=F(e,!0),E(r),k)try{return A(t,e,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[e]=r.value),t}},R=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},D=L?function(t,e,r){return I.f(t,e,R(1,r))}:function(t,e,r){return t[e]=r,t},B="prototype";function G(t){var e=function(e,r,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,r)}return new t(e,r,n)}return t.apply(this,arguments)};return e[B]=t[B],e}var W=function t(e,r,n){var o,i,u,a=e&t.F,c=e&t.G,f=e&t.S,l=e&t.P,s=e&t.B,y=e&t.W,v=c?j:j[r]||(j[r]={}),h=v[B],b=c?p:f?p[r]:(p[r]||{})[B];for(o in c&&(n=r),n)(i=!a&&b&&void 0!==b[o])&&o in v||(u=i?b[o]:n[o],v[o]=c&&"function"!=typeof b[o]?n[o]:s&&i?_(u,p):y&&b[o]==u?G(u):l&&"function"==typeof u?_(Function.call,u):u,l&&((v.virtual||(v.virtual={}))[o]=u,e&t.R&&h&&!h[o]&&D(h,o,u)))};W.F=1,W.G=2,W.S=4,W.P=8,W.B=16,W.W=32,W.U=64,W.R=128;var U,H,J,q=W;(J={})[U="getPrototypeOf"]=(H=(j.Object||{})[U]||Object[U],function(t){return w(c(t))}),q(q.S+q.F*x(function(){H(1)}),"Object",J);var K=j.Object.getPrototypeOf,z=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};q(q.S+q.F*!L,"Object",{defineProperty:I.f});var Y=j.Object,$=function(t,e,r){return Y.defineProperty(t,e,r)};function Q(t,e){for(var r=0;e.length>r;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),$(t,n.key,n)}}var X=Math.ceil,Z=Math.floor,tt=function(t){return isNaN(t=+t)?0:(t>0?Z:X)(t)},et=D,rt={}.toString,nt=function(t){return rt.call(t).slice(8,-1)},ot=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==nt(t)?t.split(""):Object(t)},it=function(t){return ot(a(t))},ut=Math.min,at=Math.max,ct=Math.min,ft=function(t,e,r){for(var n,o=it(t),i=(n=o.length)>0?ut(tt(n),9007199254740991):0,u=function(t,e){return 0>(t=tt(t))?at(t+e,0):ct(t,e)}(r,i);i>u;u++)if(u in o&&o[u]===e)return u||0;return-1},lt=O("IE_PROTO"),st=function(t,e){var r,n=it(t),o=0,i=[];for(r in n)r!=lt&&l(n,r)&&i.push(r);for(;e.length>o;)l(n,r=e[o++])&&(~ft(i,r)||i.push(r));return i},pt="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),yt=Object.keys||function(t){return st(t,pt)},vt=L?Object.defineProperties:function(t,e){E(t);for(var r,n=yt(e),o=n.length,i=0;o>i;)I.f(t,r=n[i++],e[r]);return t},ht=p.document,bt=ht&&ht.documentElement,dt=O("IE_PROTO"),mt=function(){},Ot=function(){var t,e=M("iframe"),r=pt.length;for(e.style.display="none",bt.appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),Ot=t.F;r--;)delete Ot.prototype[pt[r]];return Ot()},gt=Object.create||function(t,e){var r;return null!==t?(mt.prototype=E(t),r=new mt,mt.prototype=null,r[dt]=t):r=Ot(),void 0===e?r:vt(r,e)},St=s(function(t){var e=v("wks"),r=p.Symbol,n="function"==typeof r;(t.exports=function(t){return e[t]||(e[t]=n&&r[t]||(n?r:d)("Symbol."+t))}).store=e}),wt=I.f,jt=St("toStringTag"),_t=function(t,e,r){t&&!l(t=r?t:t.prototype,jt)&&wt(t,jt,{configurable:!0,value:e})},Pt={};D(Pt,St("iterator"),function(){return this});var Et=function(t,e,r){t.prototype=gt(Pt,{next:R(1,r)}),_t(t,e+" Iterator")},xt=St("iterator"),Vt=!([].keys&&"next"in[].keys()),Lt=function(t,e,r,n,o,i,u){Et(r,e,n);var a,c,f,l=function(t){if(!Vt&&t in v)return v[t];switch(t){case"keys":case"values":return function(){return new r(this,t)}}return function(){return new r(this,t)}},s=e+" Iterator",p="values"==o,y=!1,v=t.prototype,h=v[xt]||v["@@iterator"]||o&&v[o],b=!Vt&&h||l(o),d=o?p?l("entries"):b:void 0,m="Array"==e&&v.entries||h;if(m&&(f=w(m.call(new t)))!==Object.prototype&&f.next&&_t(f,s,!0),p&&h&&"values"!==h.name&&(y=!0,b=function(){return h.call(this)}),u&&(Vt||y||!v[xt])&&D(v,xt,b),o)if(a={values:p?b:l("values"),keys:i?b:l("keys"),entries:d},u)for(c in a)c in v||et(v,c,a[c]);else q(q.P+q.F*(Vt||y),e,a);return a},Tt=function(t,e){var r,n,o=a(t)+"",i=tt(e),u=o.length;return 0>i||i>=u?"":55296>(r=o.charCodeAt(i))||r>56319||i+1===u||56320>(n=o.charCodeAt(i+1))||n>57343?o.charAt(i):o.slice(i,i+2)};Lt(String,"String",function(t){this._t=t+"",this._i=0},function(){var t,e=this._t,r=this._i;return e.length>r?(t=Tt(e,r),this._i+=t.length,{value:t,done:!1}):{value:void 0,done:!0}});for(var Ct=function(t,e){return{value:e,done:!!t}},Mt=(Lt(Array,"Array",function(t,e){this._t=it(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,r=this._i++;return t&&t.length>r?Ct(0,"keys"==e?r:"values"==e?t[r]:[r,t[r]]):(this._t=void 0,Ct(1))},"values"),St("toStringTag")),Nt="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),kt=0;Nt.length>kt;kt++){var Ft=Nt[kt],At=p[Ft],It=At&&At.prototype;It&&!It[Mt]&&D(It,Mt,Ft)}var Rt={f:St},Dt=Rt.f("iterator");function Bt(){return!0}var Gt=s(function(t){var e=d("meta"),r=I.f,n=0,o=Object.isExtensible||Bt,i=!x(function(){return o(Object.preventExtensions({}))}),u=function(t){r(t,e,{value:{i:"O"+ ++n,w:{}}})},a=t.exports={KEY:e,NEED:!1,fastKey:function(t,r){if(!P(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!l(t,e)){if(!o(t))return"F";if(!r)return"E";u(t)}return t[e].i},getWeak:function(t,r){if(!l(t,e)){if(!o(t))return!0;if(!r)return!1;u(t)}return t[e].w},onFreeze:function(t){return i&&a.NEED&&o(t)&&!l(t,e)&&u(t),t}}}),Wt=I.f,Ut=function(t){var e=j.Symbol||(j.Symbol={});"_"==t.charAt(0)||t in e||Wt(e,t,{value:Rt.f(t)})},Ht={f:Object.getOwnPropertySymbols},Jt={f:{}.propertyIsEnumerable},qt=Array.isArray||function(t){return"Array"==nt(t)},Kt=pt.concat("length","prototype"),zt={f:Object.getOwnPropertyNames||function(t){return st(t,Kt)}},Yt=zt.f,$t={}.toString,Qt="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],Xt={f:function(t){return Qt&&"[object Window]"==$t.call(t)?function(t){try{return Yt(t)}catch(t){return Qt.slice()}}(t):Yt(it(t))}},Zt=Object.getOwnPropertyDescriptor,te={f:L?Zt:function(t,e){if(t=it(t),e=F(e,!0),k)try{return Zt(t,e)}catch(t){}if(l(t,e))return R(!Jt.f.call(t,e),t[e])}},ee=Gt.KEY,re=te.f,ne=I.f,oe=Xt.f,ie=p.Symbol,ue=p.JSON,ae=ue&&ue.stringify,ce=St("_hidden"),fe=St("toPrimitive"),le={}.propertyIsEnumerable,se=v("symbol-registry"),pe=v("symbols"),ye=v("op-symbols"),ve=Object.prototype,he="function"==typeof ie,be=p.QObject,de=!be||!be.prototype||!be.prototype.findChild;function me(){return ne(this,"a",{value:7}).a}var Oe=L&&x(function(){return 7!=gt(ne({},"a",{get:me})).a})?function(t,e,r){var n=re(ve,e);n&&delete ve[e],ne(t,e,r),n&&t!==ve&&ne(ve,e,n)}:ne,ge=function(t){var e=pe[t]=gt(ie.prototype);return e._k=t,e},Se=he&&"symbol"==typeof ie.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof ie},we=function(t,e,r){return t===ve&&we(ye,e,r),E(t),e=F(e,!0),E(r),l(pe,e)?(r.enumerable?(l(t,ce)&&t[ce][e]&&(t[ce][e]=!1),r=gt(r,{enumerable:R(0,!1)})):(l(t,ce)||ne(t,ce,R(1,{})),t[ce][e]=!0),Oe(t,e,r)):ne(t,e,r)},je=function(t,e){E(t);for(var r,n=function(t){var e=yt(t),r=Ht.f;if(r)for(var n,o=r(t),i=Jt.f,u=0;o.length>u;)i.call(t,n=o[u++])&&e.push(n);return e}(e=it(e)),o=0,i=n.length;i>o;)we(t,r=n[o++],e[r]);return t},_e=function(t,e){if(t=it(t),e=F(e,!0),t!==ve||!l(pe,e)||l(ye,e)){var r=re(t,e);return!r||!l(pe,e)||l(t,ce)&&t[ce][e]||(r.enumerable=!0),r}},Pe=function(t){for(var e,r=oe(it(t)),n=[],o=0;r.length>o;)l(pe,e=r[o++])||e==ce||e==ee||n.push(e);return n},Ee=function(t){for(var e,r=t===ve,n=oe(r?ye:it(t)),o=[],i=0;n.length>i;)!l(pe,e=n[i++])||r&&!l(ve,e)||o.push(pe[e]);return o};he||(et((ie=function(){if(this instanceof ie)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0);return L&&de&&Oe(ve,t,{configurable:!0,set:function e(r){this===ve&&e.call(ye,r),l(this,ce)&&l(this[ce],t)&&(this[ce][t]=!1),Oe(this,t,R(1,r))}}),ge(t)}).prototype,"toString",function(){return this._k}),te.f=_e,I.f=we,zt.f=Xt.f=Pe,Jt.f=function(t){var e=le.call(this,t=F(t,!0));return!(this===ve&&l(pe,t)&&!l(ye,t))&&(!(e||!l(this,t)||!l(pe,t)||l(this,ce)&&this[ce][t])||e)},Ht.f=Ee,Rt.f=function(t){return ge(St(t))}),q(q.G+q.W+q.F*!he,{Symbol:ie});for(var xe="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),Ve=0;xe.length>Ve;)St(xe[Ve++]);for(var Le=yt(St.store),Te=0;Le.length>Te;)Ut(Le[Te++]);q(q.S+q.F*!he,"Symbol",{for:function(t){return l(se,t+="")?se[t]:se[t]=ie(t)},keyFor:function(t){if(!Se(t))throw TypeError(t+" is not a symbol!");for(var e in se)if(se[e]===t)return e},useSetter:function(){de=!0},useSimple:function(){de=!1}}),q(q.S+q.F*!he,"Object",{create:function(t,e){return void 0===e?gt(t):je(gt(t),e)},defineProperty:we,defineProperties:je,getOwnPropertyDescriptor:_e,getOwnPropertyNames:Pe,getOwnPropertySymbols:Ee}),ue&&q(q.S+q.F*(!he||x(function(){var t=ie();return"[null]"!=ae([t])||"{}"!=ae({a:t})||"{}"!=ae(Object(t))})),"JSON",{stringify:function(t){for(var e,r,n=[t],o=1;arguments.length>o;)n.push(arguments[o++]);if(r=e=n[1],(P(e)||void 0!==t)&&!Se(t))return qt(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!Se(e))return e}),n[1]=e,ae.apply(ue,n)}}),ie.prototype[fe]||D(ie.prototype,fe,ie.prototype.valueOf),_t(ie,"Symbol"),_t(Math,"Math",!0),_t(p.JSON,"JSON",!0),Ut("asyncIterator"),Ut("observable");var Ce=j.Symbol;function Me(t){return typeof t}function Ne(t){return t&&"function"==typeof Ce&&t.constructor===Ce&&t!==Ce.prototype?"symbol":typeof t}var ke=s(function(t){function e(t){return(e="function"==typeof Ce&&"symbol"==typeof Dt?Me:Ne)(t)}function r(t){return e(t)}function n(t){return t&&"function"==typeof Ce&&t.constructor===Ce&&t!==Ce.prototype?"symbol":e(t)}function o(i){return t.exports=o="function"==typeof Ce&&"symbol"===e(Dt)?r:n,o(i)}t.exports=o}),Fe=function(t,e){if(e&&("object"===ke(e)||"function"==typeof e))return e;if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},Ae=function(t,e){if(E(t),!P(e)&&null!==e)throw TypeError(e+": can't set as prototype!")},Ie={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=_(Function.call,te.f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return Ae(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:Ae};q(q.S,"Object",{setPrototypeOf:Ie.set});var Re=j.Object.setPrototypeOf;q(q.S,"Object",{create:gt});var De=j.Object,Be=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t};function Ge(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;e>n;n++)r[n-1]=arguments[n];return"function"==typeof t?t.apply(void 0,r):void 0}function We(t){return function(e,r){if(void 0===r.value){var n=t;return"function"==typeof t&&(n=t(e.value,r)),e.value===n?null:{value:n}}return null}}function Ue(t,e){e.value!==this.state.value&&Ge(this.props.onChange,this.state.value),void 0!==this.props.value&&this.props.value!==this.state.value&&this.setState({value:this.props.value})}function He(){return this.valueContext.value=this.state.value,this.props.children(this.valueContext)}var Je=function(t){function r(t){var e;return z(this,r),e=Fe(this,(r.__proto__||K(r)).call(this,t)),Object.defineProperty(Be(e),"setValue",{configurable:!0,enumerable:!0,writable:!0,value:function(t){return e.setState(We(t))}}),Object.defineProperty(Be(e),"resetValue",{configurable:!0,enumerable:!0,writable:!0,value:function(){return e.setState(We(e.props.initialValue))}}),Object.defineProperty(Be(e),"clearValue",{configurable:!0,enumerable:!0,writable:!0,value:function(){return e.setState(We(void 0))}}),e.state={value:void 0===t.value?t.initialValue:t.value},e.valueContext={setValue:e.setValue,resetValue:e.resetValue,clearValue:e.clearValue},e}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=De.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Re?Re(t,e):t.__proto__=e)}(r,e.Component),n=r,(o=[{key:"componentDidUpdate",value:Ue},{key:"render",value:He}])&&Q(n.prototype,o),r;var n,o}(),qe=function(t,e){return ze(i({result:(r=t,n=e,o=r.step,u=n.cast,u(r.value)-u(o))},t,e));var r,n,o,u};function Ke(){}var ze=function(t){var e=t.result,r=t.maxValue,n=t.minValue,o=t.onBoundMax,u=t.onBoundMin,a=t.cast,c={value:e,step:0},f={maxValue:r,minValue:n,onBoundMax:o,onBoundMin:u,cast:a},l=function(t){return i({},c,{step:null===t||void 0===t?c.step:t})},s={value:e,step:t.step,minValue:n,maxValue:r,setValue:function(t){e=Ye(i({},c,{value:t}),f)},incr:function(t){e=Ye(l(t),f)},decr:function(t){e=qe(l(t),f)}};return function(t){var e=t.value,r=t.lower,n=t.upper,o=t.outOfUpper,i=t.outOfLower,u=t.inBounds,a=t.cast,c=void 0===a?parseInt:a;return e=c(e),r=c(r),n=c(n),u=u||Ke,isNaN(e)?u():!isNaN(n)&&e>n?Ge(o):!isNaN(r)&&r>e?Ge(i):u()}({value:e,lower:n,upper:r,outOfUpper:function(){return Ge(o,s),e},outOfLower:function(){return Ge(u,s),e},inBounds:function(){return e},cast:a})},Ye=function(t,e){return ze(i({result:(r=t,n=e,o=r.step,u=n.cast,u(r.value)+u(o))},t,e));var r,n,o,u};function $e(t){var e=t.value;e!==this.props.value&&Ge(this.props.onChange,this.props.value),e>this.props.value&&Ge(this.props.onDecr,this.props.value),this.props.value>e&&Ge(this.props.onIncr,this.props.value)}function Qe(){return this.counterContext.step=this.props.step,this.counterContext.value=this.props.value,this.props.children(this.counterContext)}var Xe=function(t){var e,r;function n(e){var r;return r=t.call(this,e)||this,Object.defineProperty(u(r),"boundWith",{configurable:!0,enumerable:!0,writable:!0,value:function(t,e){return r.props.setValue(function(n,o){return t({value:n,step:isNaN(parseInt(e))?r.props.step:e},r.props)})}}),Object.defineProperty(u(r),"incr",{configurable:!0,enumerable:!0,writable:!0,value:function(t){return r.boundWith(Ye,t)}}),Object.defineProperty(u(r),"decr",{configurable:!0,enumerable:!0,writable:!0,value:function(t){return r.boundWith(qe,t)}}),Object.defineProperty(u(r),"setValue",{configurable:!0,enumerable:!0,writable:!0,value:function(t){return r.props.setValue(function(e,n){return Ye({value:t,step:0},r.props)})}}),Object.defineProperty(u(r),"setStep",{configurable:!0,enumerable:!0,writable:!0,value:function(t){return r.props.setStep(r.props.cast(t))}}),r.counterContext={incr:r.incr,decr:r.decr,setValue:r.setValue,setStep:r.setStep,step:e.step,value:e.value},r}(e=n).prototype=Object.create((r=t).prototype),e.prototype.constructor=e,e.__proto__=r;var o=n.prototype;return o.componentDidUpdate=$e,o.render=Qe,n}(e.Component);Object.defineProperty(Xe,"displayName",{configurable:!0,enumerable:!0,writable:!0,value:"Counter"}),t.default=function(t){var r=t.initialStep,n=void 0===r?1:r,u=t.initialValue,a=void 0===u?0:u,c=t.cast,f=void 0===c?parseInt:c,l=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;i.length>n;n++)0>e.indexOf(r=i[n])&&(o[r]=t[r]);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);for(n=0;u.length>n;n++)0>e.indexOf(r=u[n])&&Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}(t,["initialStep","initialValue","cast"]);return o(Je,{initialValue:f(n)},void 0,function(t){return o(Je,{initialValue:f(a)},void 0,function(r){return e.createElement(Xe,i({},l,r,{cast:f,step:t.value,setStep:t.setValue}))})})},Object.defineProperty(t,"__esModule",{value:!0})});
