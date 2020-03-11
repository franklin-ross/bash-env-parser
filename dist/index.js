"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const TransformChildren=Symbol("transform children");function transformChildren(r,t){var n;return Array.isArray(r)?transformArray(r,t):"function"==typeof(null===(n=r)||void 0===n?void 0:n[TransformChildren])?r[TransformChildren](t):r}function transformArray(r,t){for(let n=0,e=r.length;n<e;++n){let a=r[n],s=t(a);if(a===s)continue;const i=r.slice(0,n);for(push(i,s),++n;n<e;++n)a=r[n],s=t(a),push(i,s);return i}return r}function push(r,t){if(null!=t)if(Array.isArray(t))for(const n of t)null!=n&&r.push(n);else r.push(t)}class Variable{constructor(r,t=null,n=null){this.name=r,this.fallbackType=t,this.fallback=n}toString(){var r,t;return"${"+this.name+(null!=(r=this.fallbackType)?r:"")+(null!=(t=this.fallback)?t:"")+"}"}[TransformChildren](r){const t=this.fallback;if(null==t)return t;const n=transformChildren(t,r);return n!==t?new Variable(this.name,this.fallbackType,n):this}}class VariableAssignment{constructor(r,t){this.name=r,this.value=t}toString(){return this.name+"="+this.value}withValue(r){return this.value===r?this:new VariableAssignment(this.name,r)}[TransformChildren](r){const t=this.value,n=transformChildren(t,r);return n!==t?new VariableAssignment(this.name,n):this}}class QuotedString{constructor(r){this.contents=r}toString(){return`"${this.contents}"`}[TransformChildren](r){const t=this.contents,n=transformChildren(t,r);return n!==t?new QuotedString(n):this}}class VerbatimString{constructor(r){this.contents=r}toString(){return`'${this.contents}'`}}class Word{constructor(r){this.contents=r}toString(){return`${this.contents}`}}class Whitespace{constructor(r){this.contents=r}toString(){return`${this.contents}`}}var tokens=Object.freeze({__proto__:null,Variable:Variable,VariableAssignment:VariableAssignment,QuotedString:QuotedString,VerbatimString:VerbatimString,Word:Word,Whitespace:Whitespace,TransformChildren:TransformChildren,transformChildren:transformChildren}),parser="use strict";function peg$subclass(r,t){function n(){this.constructor=r}n.prototype=t.prototype,r.prototype=new n}function peg$SyntaxError(r,t,n,e){this.message=r,this.expected=t,this.found=n,this.location=e,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,peg$SyntaxError)}function peg$parse(r,t){t=void 0!==t?t:{};var n,e={},a={start:br,VariableValue:function(){var r,t,n;r=ir,t=[],(n=Vr())===e&&(n=Sr());for(;n!==e;)t.push(n),(n=Vr())===e&&(n=Sr());t!==e&&(or=r,t=i(t));return r=t}},s=br,i=function(r){return Pr(r)},o="=",u=pr("=",!1),c=function(r,t){return new Or(r,Pr(t))},l="${",f=pr("${",!1),h=":-",p=pr(":-",!1),g=":=",d=pr(":=",!1),A="}",m=pr("}",!1),b=function(r,t,n){return new Rr(r,t,n)},v=function(r){return new Rr(r)},y="$",x=pr("$",!1),C=function(){return new zr("$")},S=function(r){return Pr(r)},V={type:"other",description:"variable name"},$=/^[a-zA-Z_]/,W=gr([["a","z"],["A","Z"],"_"],!1,!1),w=/^[a-zA-Z_0-9]/,E=gr([["a","z"],["A","Z"],"_",["0","9"]],!1,!1),T=function(){return hr()},_=/^[ \t\n\r]/,k=gr([" ","\t","\n","\r"],!1,!1),Q=function(){return new Mr(hr())},F=/^[^ \t\n\r]/,j=gr([" ","\t","\n","\r"],!0,!1),z=function(){return new Zr(hr())},R="'",O=pr("'",!1),Z=function(r){return new zr(r)},M='"',P=pr('"',!1),U=function(r){return new jr(r)},q=function(r){return new Zr(r.join(""))},B=function(r){return r.join("")},D="\\",G=pr("\\",!1),H=/^[$"`\\]/,I=gr(["$",'"',"`","\\"],!1,!1),J=function(r){return r},K="\\\n",L=pr("\\\n",!1),N=function(){return""},X=/^[$"]/,Y=gr(["$",'"'],!1,!1),rr={type:"any"},tr=function(r){return r},nr=/^[$}'"]/,er=gr(["$","}","'",'"'],!1,!1),ar=/^[$'"]/,sr=gr(["$","'",'"'],!1,!1),ir=0,or=0,ur=[{line:1,column:1}],cr=0,lr=[],fr=0;if("startRule"in t){if(!(t.startRule in a))throw new Error("Can't start parsing from rule \""+t.startRule+'".');s=a[t.startRule]}function hr(){return r.substring(or,ir)}function pr(r,t){return{type:"literal",text:r,ignoreCase:t}}function gr(r,t,n){return{type:"class",parts:r,inverted:t,ignoreCase:n}}function dr(t){var n,e=ur[t];if(e)return e;for(n=t-1;!ur[n];)n--;for(e={line:(e=ur[n]).line,column:e.column};n<t;)10===r.charCodeAt(n)?(e.line++,e.column=1):e.column++,n++;return ur[t]=e,e}function Ar(r,t){var n=dr(r),e=dr(t);return{start:{offset:r,line:n.line,column:n.column},end:{offset:t,line:e.line,column:e.column}}}function mr(r){ir<cr||(ir>cr&&(cr=ir,lr=[]),lr.push(r))}function br(){var r,t;for(r=[],(t=yr())===e&&(t=vr())===e&&(t=Sr());t!==e;)r.push(t),(t=yr())===e&&(t=vr())===e&&(t=Sr());return r}function vr(){var r;return(r=$r())===e&&(r=Wr())===e&&(r=function(){var r,t,n;if(r=ir,t=[],(n=Qr())!==e)for(;n!==e;)t.push(n),n=Qr();else t=e;t!==e&&(or=r,t=q(t));return r=t}())===e&&(r=xr()),r}function yr(){var t,n,a,s,i;if(t=ir,(n=Cr())!==e)if(61===r.charCodeAt(ir)?(a=o,ir++):(a=e,0===fr&&mr(u)),a!==e){if(s=[],(i=vr())!==e)for(;i!==e;)s.push(i),i=vr();else s=e;s!==e?(or=t,t=n=c(n,s)):(ir=t,t=e)}else ir=t,t=e;else ir=t,t=e;return t}function xr(){var t,n,a,s,i,o;return t=ir,r.substr(ir,2)===l?(n=l,ir+=2):(n=e,0===fr&&mr(f)),n!==e&&(a=Cr())!==e?(r.substr(ir,2)===h?(s=h,ir+=2):(s=e,0===fr&&mr(p)),s===e&&(r.substr(ir,2)===g?(s=g,ir+=2):(s=e,0===fr&&mr(d))),s!==e&&(i=function(){var r,t,n;r=ir,t=[],(n=$r())===e&&(n=Wr())===e&&(n=wr())===e&&(n=xr())===e&&(n=Sr());for(;n!==e;)t.push(n),(n=$r())===e&&(n=Wr())===e&&(n=wr())===e&&(n=xr())===e&&(n=Sr());t!==e&&(or=r,t=S(t));return r=t}())!==e?(125===r.charCodeAt(ir)?(o=A,ir++):(o=e,0===fr&&mr(m)),o!==e?(or=t,t=n=b(a,s,i)):(ir=t,t=e)):(ir=t,t=e)):(ir=t,t=e),t===e&&(t=ir,r.substr(ir,2)===l?(n=l,ir+=2):(n=e,0===fr&&mr(f)),n!==e&&(a=Cr())!==e?(125===r.charCodeAt(ir)?(s=A,ir++):(s=e,0===fr&&mr(m)),s!==e?(or=t,t=n=v(a)):(ir=t,t=e)):(ir=t,t=e),t===e&&(t=ir,36===r.charCodeAt(ir)?(n=y,ir++):(n=e,0===fr&&mr(x)),n!==e&&(a=Cr())!==e?(or=t,t=n=v(a)):(ir=t,t=e),t===e&&(t=ir,36===r.charCodeAt(ir)?(n=y,ir++):(n=e,0===fr&&mr(x)),n!==e&&(or=t,n=C()),t=n))),t}function Cr(){var t,n,a,s;if(fr++,t=ir,$.test(r.charAt(ir))?(n=r.charAt(ir),ir++):(n=e,0===fr&&mr(W)),n!==e){for(a=[],w.test(r.charAt(ir))?(s=r.charAt(ir),ir++):(s=e,0===fr&&mr(E));s!==e;)a.push(s),w.test(r.charAt(ir))?(s=r.charAt(ir),ir++):(s=e,0===fr&&mr(E));a!==e?(or=t,t=n=T()):(ir=t,t=e)}else ir=t,t=e;return fr--,t===e&&(n=e,0===fr&&mr(V)),t}function Sr(){var t,n,a;if(t=ir,n=[],_.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(k)),a!==e)for(;a!==e;)n.push(a),_.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(k));else n=e;return n!==e&&(or=t,n=Q()),t=n}function Vr(){var t,n,a;if(t=ir,n=[],F.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(j)),a!==e)for(;a!==e;)n.push(a),F.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(j));else n=e;return n!==e&&(or=t,n=z()),t=n}function $r(){var t,n,a,s;return t=ir,39===r.charCodeAt(ir)?(n=R,ir++):(n=e,0===fr&&mr(O)),n!==e&&(a=function(){var r,t,n;if(r=ir,t=[],(n=_r())!==e)for(;n!==e;)t.push(n),n=_r();else t=e;t!==e&&(or=r,t=B(t));return r=t}())!==e?(39===r.charCodeAt(ir)?(s=R,ir++):(s=e,0===fr&&mr(O)),s!==e?(or=t,t=n=Z(a)):(ir=t,t=e)):(ir=t,t=e),t}function Wr(){var t,n,a,s;if(t=ir,34===r.charCodeAt(ir)?(n=M,ir++):(n=e,0===fr&&mr(P)),n!==e){for(a=[],(s=Er())===e&&(s=xr());s!==e;)a.push(s),(s=Er())===e&&(s=xr());a!==e?(34===r.charCodeAt(ir)?(s=M,ir++):(s=e,0===fr&&mr(P)),s!==e?(or=t,t=n=U(a)):(ir=t,t=e)):(ir=t,t=e)}else ir=t,t=e;return t}function wr(){var r,t,n;if(r=ir,t=[],(n=kr())!==e)for(;n!==e;)t.push(n),n=kr();else t=e;return t!==e&&(or=r,t=q(t)),r=t}function Er(){var r,t,n;if(r=ir,t=[],(n=Tr())!==e)for(;n!==e;)t.push(n),n=Tr();else t=e;return t!==e&&(or=r,t=B(t)),r=t}function Tr(){var t,n,a;return t=ir,92===r.charCodeAt(ir)?(n=D,ir++):(n=e,0===fr&&mr(G)),n!==e?(H.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(I)),a!==e?(or=t,t=n=J(a)):(ir=t,t=e)):(ir=t,t=e),t===e&&(t=ir,r.substr(ir,2)===K?(n=K,ir+=2):(n=e,0===fr&&mr(L)),n!==e&&(or=t,n=N()),(t=n)===e&&(t=ir,n=ir,fr++,X.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(Y)),fr--,a===e?n=void 0:(ir=n,n=e),n!==e?(r.length>ir?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(rr)),a!==e?(or=t,t=n=tr(a)):(ir=t,t=e)):(ir=t,t=e))),t}function _r(){var t,n,a;return t=ir,n=ir,fr++,39===r.charCodeAt(ir)?(a=R,ir++):(a=e,0===fr&&mr(O)),fr--,a===e?n=void 0:(ir=n,n=e),n!==e?(r.length>ir?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(rr)),a!==e?(or=t,t=n=tr(a)):(ir=t,t=e)):(ir=t,t=e),t}function kr(){var t,n,a;return(t=Fr())===e&&(t=ir,n=ir,fr++,nr.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(er)),a===e&&(a=Sr()),fr--,a===e?n=void 0:(ir=n,n=e),n!==e?(r.length>ir?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(rr)),a!==e?(or=t,t=n=tr(a)):(ir=t,t=e)):(ir=t,t=e)),t}function Qr(){var t,n,a;return(t=Fr())===e&&(t=ir,n=ir,fr++,ar.test(r.charAt(ir))?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(sr)),a===e&&(a=Sr()),fr--,a===e?n=void 0:(ir=n,n=e),n!==e?(r.length>ir?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(rr)),a!==e?(or=t,t=n=tr(a)):(ir=t,t=e)):(ir=t,t=e)),t}function Fr(){var t,n,a;return t=ir,r.substr(ir,2)===K?(n=K,ir+=2):(n=e,0===fr&&mr(L)),n!==e&&(or=t,n=N()),(t=n)===e&&(t=ir,92===r.charCodeAt(ir)?(n=D,ir++):(n=e,0===fr&&mr(G)),n!==e?(r.length>ir?(a=r.charAt(ir),ir++):(a=e,0===fr&&mr(rr)),a!==e?(or=t,t=n=J(a)):(ir=t,t=e)):(ir=t,t=e)),t}const{QuotedString:jr,VerbatimString:zr,Variable:Rr,VariableAssignment:Or,Word:Zr,Whitespace:Mr}=tokens;function Pr(r){return 1===r.length?r[0]:r}if((n=s())!==e&&ir===r.length)return n;throw n!==e&&ir<r.length&&mr({type:"end"}),Ur=lr,qr=cr<r.length?r.charAt(cr):null,Br=cr<r.length?Ar(cr,cr+1):Ar(cr,cr),new peg$SyntaxError(peg$SyntaxError.buildMessage(Ur,qr),Ur,qr,Br);var Ur,qr,Br}peg$subclass(peg$SyntaxError,Error),peg$SyntaxError.buildMessage=function(r,t){var n={literal:function(r){return'"'+a(r.text)+'"'},class:function(r){var t,n="";for(t=0;t<r.parts.length;t++)n+=r.parts[t]instanceof Array?s(r.parts[t][0])+"-"+s(r.parts[t][1]):s(r.parts[t]);return"["+(r.inverted?"^":"")+n+"]"},any:function(r){return"any character"},end:function(r){return"end of input"},other:function(r){return r.description}};function e(r){return r.charCodeAt(0).toString(16).toUpperCase()}function a(r){return r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(r){return"\\x0"+e(r)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(r){return"\\x"+e(r)}))}function s(r){return r.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(r){return"\\x0"+e(r)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(r){return"\\x"+e(r)}))}return"Expected "+function(r){var t,e,a,s=new Array(r.length);for(t=0;t<r.length;t++)s[t]=(a=r[t],n[a.type](a));if(s.sort(),s.length>0){for(t=1,e=1;t<s.length;t++)s[t-1]!==s[t]&&(s[e]=s[t],e++);s.length=e}switch(s.length){case 1:return s[0];case 2:return s[0]+" or "+s[1];default:return s.slice(0,-1).join(", ")+", or "+s[s.length-1]}}(r)+" but "+function(r){return r?'"'+a(r)+'"':"end of input"}(t)+" found."};var parser_1=(parser={SyntaxError:peg$SyntaxError,parse:peg$parse}).parse;function collapseWhitespace(r){if(null==r)return null;if(!Array.isArray(r))return r instanceof Whitespace?null:r;let t=!1,n=!1;return transformChildren(r,r=>{if(r instanceof Whitespace)return t=!0,null;const e=t&&n;return t=!1,n=!0,e?[new Whitespace(" "),r]:r})}function stringify(r){var t;return null!=(t=str(r))?t:""}function str(r){var t,n;if("string"==typeof r)return r;if(Array.isArray(r))return transformChildren(r,str).join("");if(r instanceof VariableAssignment)return`${r.name}=${t=str(r.value),null!=t?t:""}`;if(r instanceof QuotedString){const t=null!=(n=r.contents)?n:"";if("string"==typeof t)return t;let e="";return transformChildren(t,r=>{var t;return e+=null!=(t=str(r))?t:"",r}),e}return r instanceof Word||r instanceof VerbatimString||r instanceof Whitespace?r.contents:void 0}const parseOptions={startRule:"VariableValue"},parseEnvValue=r=>parser_1(r,parseOptions);function substitute(r,t,n=!1){return function r(e){if(e instanceof Variable){const n=t[e.name];return null==n||""===n?e.fallback?r(e.fallback):null:parseEnvValue(n)}if(e instanceof VariableAssignment){const a=r(e.value);if(null==a)return null;if(n){const r=collapseWhitespace(a);if(null==r)return null;const n=stringify(r);return t[e.name]=n,null}return e.withValue(a)}return transformChildren(e,r)}(r)}function toShellArgs(r){if(Array.isArray(r)){const t=[];let n=!1;for(const e of r)if(e instanceof Whitespace)n=!0;else{const r=toShellArgs(e);null!==r&&(n||0===t.length?t.push(r):t[t.length-1]+=r,n=!1)}return t}return r instanceof Variable||r instanceof VariableAssignment?null:r instanceof QuotedString?stringify(r):r instanceof Word||r instanceof VerbatimString||r instanceof Whitespace?r.contents:void 0}function extractEnvironment(r,t={}){return null!=r&&function r(n){if(n instanceof VariableAssignment){const r=stringify(collapseWhitespace(substitute(n.value,t,!1)));""!==r&&(t[n.name]=r)}else transformChildren(n,r);return n}(r),t}const parse=r=>parser_1(r),replace=(r,t)=>{return stringify(collapseWhitespace(substitute(parser_1(r),t)))};exports.QuotedString=QuotedString,exports.TransformChildren=TransformChildren,exports.Variable=Variable,exports.VariableAssignment=VariableAssignment,exports.VerbatimString=VerbatimString,exports.Whitespace=Whitespace,exports.Word=Word,exports.collapseWhitespace=collapseWhitespace,exports.extractEnvironment=extractEnvironment,exports.parse=parse,exports.replace=replace,exports.stringify=stringify,exports.substitute=substitute,exports.toShellArgs=toShellArgs,exports.transformChildren=transformChildren;
//# sourceMappingURL=index.js.map
