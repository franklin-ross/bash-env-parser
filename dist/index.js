"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class Variable{constructor(t,e=null,r=null){this.name=t,this.fallbackType=e,this.fallback=r,this.kind=2}toString(){return"${"+this.name+(this.fallbackType||"")+(this.fallback||"")+"}"}}class VariableAssignment{constructor(t,e){this.name=t,this.value=e,this.kind=3}toString(){return this.name+"="+this.value.toString()}}class SubstitutedVariable{constructor(t,e=null){this.name=t,this.value=e,this.kind=4}toString(){let t=this.value;return t&&(t="string"==typeof t?t:t.toString()),"${"+this.name+"="+t+"}"}}class QuotedString{constructor(t){this.contents=t,this.kind=6}toString(){return`"${this.contents}"`}}class VerbatimString{constructor(t){this.contents=t,this.kind=7}toString(){return`'${this.contents}'`}}class Word{constructor(t){this.contents=t,this.kind=5}toString(){return`(${this.contents})`}}class List{constructor(t){this.items=t,this.kind=0}toString(){return`[${this.items}]`}}class Whitespace{constructor(t){this.contents=t,this.kind=1}toString(){return`(${this.contents})`}}!function(t){t[t.List=0]="List",t[t.Whitespace=1]="Whitespace",t[t.Variable=2]="Variable",t[t.VariableAssignment=3]="VariableAssignment",t[t.SubstitutedVariable=4]="SubstitutedVariable",t[t.Text=5]="Text",t[t.QuotedText=6]="QuotedText",t[t.LiteralText=7]="LiteralText"}(exports.TokenKind||(exports.TokenKind={}));var tokens=Object.freeze({__proto__:null,Variable:Variable,VariableAssignment:VariableAssignment,SubstitutedVariable:SubstitutedVariable,QuotedString:QuotedString,VerbatimString:VerbatimString,Word:Word,List:List,Whitespace:Whitespace,get TokenKind(){return exports.TokenKind}}),parser="use strict";function peg$subclass(t,e){function r(){this.constructor=t}r.prototype=e.prototype,t.prototype=new r}function peg$SyntaxError(t,e,r,n){this.message=t,this.expected=e,this.found=r,this.location=n,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,peg$SyntaxError)}function peg$parse(t,e){e=void 0!==e?e:{};var r,n={},i={start:pt},s=pt,a=function(t){return new _t(t)},u="=",o=at("=",!1),c=function(t,e){return new Et(t,new _t(e))},l="${",p=at("${",!1),f=":-",h=at(":-",!1),g=":=",d=at(":=",!1),b="}",x=at("}",!1),A=function(t,e,r){return new Wt(t,e,r)},m=function(t){return new Wt(t)},v="$",S=at("$",!1),y=function(){return new Ct("$")},V=function(t){return 1===t.length?t[0]:new _t(t)},$={type:"other",description:"variable name"},w=/^[a-zA-Z_]/,k=ut([["a","z"],["A","Z"],"_"],!1,!1),C=/^[a-zA-z_0-9]/,W=ut([["a","z"],["A","z"],"_",["0","9"]],!1,!1),E=function(){return st()},T=/^[ \t\n\r]/,_=ut([" ","\t","\n","\r"],!1,!1),L=function(){return new Lt(st())},Q="'",F=at("'",!1),z=function(t){return new Ct(t)},j='"',K=at('"',!1),R=function(t){return new kt(t)},M=function(t){return new Tt(t.join(""))},O=function(t){return t.join("")},Z="\\",P=at("\\",!1),U=/^[$"`\\]/,q=ut(["$",'"',"`","\\"],!1,!1),B=function(t){return t},D="\\\n",G=at("\\\n",!1),H=function(){return""},I=/^[$"]/,J=ut(["$",'"'],!1,!1),N={type:"any"},X=function(t){return t},Y=0,tt=0,et=[{line:1,column:1}],rt=0,nt=[],it=0;if("startRule"in e){if(!(e.startRule in i))throw new Error("Can't start parsing from rule \""+e.startRule+'".');s=i[e.startRule]}function st(){return t.substring(tt,Y)}function at(t,e){return{type:"literal",text:t,ignoreCase:e}}function ut(t,e,r){return{type:"class",parts:t,inverted:e,ignoreCase:r}}function ot(e){var r,n=et[e];if(n)return n;for(r=e-1;!et[r];)r--;for(n={line:(n=et[r]).line,column:n.column};r<e;)10===t.charCodeAt(r)?(n.line++,n.column=1):n.column++,r++;return et[e]=n,n}function ct(t,e){var r=ot(t),n=ot(e);return{start:{offset:t,line:r.line,column:r.column},end:{offset:e,line:n.line,column:n.column}}}function lt(t){Y<rt||(Y>rt&&(rt=Y,nt=[]),nt.push(t))}function pt(){var t,e,r;for(t=Y,e=[],(r=ht())===n&&(r=ft())===n&&(r=bt());r!==n;)e.push(r),(r=ht())===n&&(r=ft())===n&&(r=bt());return e!==n&&(tt=t,e=a(e)),t=e}function ft(){var t;return(t=xt())===n&&(t=At())===n&&(t=function(){var t,e,r;if(t=Y,e=[],(r=$t())!==n)for(;r!==n;)e.push(r),r=$t();else e=n;e!==n&&(tt=t,e=M(e));return t=e}())===n&&(t=gt()),t}function ht(){var e,r,i,s,a;if(e=Y,(r=dt())!==n)if(61===t.charCodeAt(Y)?(i=u,Y++):(i=n,0===it&&lt(o)),i!==n){if(s=[],(a=ft())!==n)for(;a!==n;)s.push(a),a=ft();else s=n;s!==n?(tt=e,e=r=c(r,s)):(Y=e,e=n)}else Y=e,e=n;else Y=e,e=n;return e}function gt(){var e,r,i,s,a,u;return e=Y,t.substr(Y,2)===l?(r=l,Y+=2):(r=n,0===it&&lt(p)),r!==n&&(i=dt())!==n?(t.substr(Y,2)===f?(s=f,Y+=2):(s=n,0===it&&lt(h)),s===n&&(t.substr(Y,2)===g?(s=g,Y+=2):(s=n,0===it&&lt(d))),s!==n&&(a=function(){var t,e,r;t=Y,e=[],(r=xt())===n&&(r=At())===n&&(r=mt())===n&&(r=gt())===n&&(r=bt());for(;r!==n;)e.push(r),(r=xt())===n&&(r=At())===n&&(r=mt())===n&&(r=gt())===n&&(r=bt());e!==n&&(tt=t,e=V(e));return t=e}())!==n?(125===t.charCodeAt(Y)?(u=b,Y++):(u=n,0===it&&lt(x)),u!==n?(tt=e,e=r=A(i,s,a)):(Y=e,e=n)):(Y=e,e=n)):(Y=e,e=n),e===n&&(e=Y,t.substr(Y,2)===l?(r=l,Y+=2):(r=n,0===it&&lt(p)),r!==n&&(i=dt())!==n?(125===t.charCodeAt(Y)?(s=b,Y++):(s=n,0===it&&lt(x)),s!==n?(tt=e,e=r=m(i)):(Y=e,e=n)):(Y=e,e=n),e===n&&(e=Y,36===t.charCodeAt(Y)?(r=v,Y++):(r=n,0===it&&lt(S)),r!==n&&(i=dt())!==n?(tt=e,e=r=m(i)):(Y=e,e=n),e===n&&(e=Y,36===t.charCodeAt(Y)?(r=v,Y++):(r=n,0===it&&lt(S)),r!==n&&(tt=e,r=y()),e=r))),e}function dt(){var e,r,i,s;if(it++,e=Y,w.test(t.charAt(Y))?(r=t.charAt(Y),Y++):(r=n,0===it&&lt(k)),r!==n){if(i=[],C.test(t.charAt(Y))?(s=t.charAt(Y),Y++):(s=n,0===it&&lt(W)),s!==n)for(;s!==n;)i.push(s),C.test(t.charAt(Y))?(s=t.charAt(Y),Y++):(s=n,0===it&&lt(W));else i=n;i!==n?(tt=e,e=r=E()):(Y=e,e=n)}else Y=e,e=n;return it--,e===n&&(r=n,0===it&&lt($)),e}function bt(){var e,r,i;if(e=Y,r=[],T.test(t.charAt(Y))?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(_)),i!==n)for(;i!==n;)r.push(i),T.test(t.charAt(Y))?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(_));else r=n;return r!==n&&(tt=e,r=L()),e=r}function xt(){var e,r,i,s;return e=Y,39===t.charCodeAt(Y)?(r=Q,Y++):(r=n,0===it&&lt(F)),r!==n&&(i=function(){var t,e,r;if(t=Y,e=[],(r=yt())!==n)for(;r!==n;)e.push(r),r=yt();else e=n;e!==n&&(tt=t,e=O(e));return t=e}())!==n?(39===t.charCodeAt(Y)?(s=Q,Y++):(s=n,0===it&&lt(F)),s!==n?(tt=e,e=r=z(i)):(Y=e,e=n)):(Y=e,e=n),e}function At(){var e,r,i,s;if(e=Y,34===t.charCodeAt(Y)?(r=j,Y++):(r=n,0===it&&lt(K)),r!==n){for(i=[],(s=vt())===n&&(s=gt());s!==n;)i.push(s),(s=vt())===n&&(s=gt());i!==n?(34===t.charCodeAt(Y)?(s=j,Y++):(s=n,0===it&&lt(K)),s!==n?(tt=e,e=r=R(i)):(Y=e,e=n)):(Y=e,e=n)}else Y=e,e=n;return e}function mt(){var t,e,r;if(t=Y,e=[],(r=Vt())!==n)for(;r!==n;)e.push(r),r=Vt();else e=n;return e!==n&&(tt=t,e=M(e)),t=e}function vt(){var t,e,r;if(t=Y,e=[],(r=St())!==n)for(;r!==n;)e.push(r),r=St();else e=n;return e!==n&&(tt=t,e=O(e)),t=e}function St(){var e,r,i;return e=Y,92===t.charCodeAt(Y)?(r=Z,Y++):(r=n,0===it&&lt(P)),r!==n?(U.test(t.charAt(Y))?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(q)),i!==n?(tt=e,e=r=B(i)):(Y=e,e=n)):(Y=e,e=n),e===n&&(e=Y,t.substr(Y,2)===D?(r=D,Y+=2):(r=n,0===it&&lt(G)),r!==n&&(tt=e,r=H()),(e=r)===n&&(e=Y,r=Y,it++,I.test(t.charAt(Y))?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(J)),it--,i===n?r=void 0:(Y=r,r=n),r!==n?(t.length>Y?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(N)),i!==n?(tt=e,e=r=X(i)):(Y=e,e=n)):(Y=e,e=n))),e}function yt(){var e,r,i;return e=Y,r=Y,it++,39===t.charCodeAt(Y)?(i=Q,Y++):(i=n,0===it&&lt(F)),it--,i===n?r=void 0:(Y=r,r=n),r!==n?(t.length>Y?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(N)),i!==n?(tt=e,e=r=X(i)):(Y=e,e=n)):(Y=e,e=n),e}function Vt(){var e,r,i;return(e=wt())===n&&(e=Y,r=Y,it++,36===t.charCodeAt(Y)?(i=v,Y++):(i=n,0===it&&lt(S)),i===n&&(125===t.charCodeAt(Y)?(i=b,Y++):(i=n,0===it&&lt(x)),i===n&&(i=bt())),it--,i===n?r=void 0:(Y=r,r=n),r!==n?(t.length>Y?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(N)),i!==n?(tt=e,e=r=X(i)):(Y=e,e=n)):(Y=e,e=n)),e}function $t(){var e,r,i;return(e=wt())===n&&(e=Y,r=Y,it++,36===t.charCodeAt(Y)?(i=v,Y++):(i=n,0===it&&lt(S)),i===n&&(i=bt()),it--,i===n?r=void 0:(Y=r,r=n),r!==n?(t.length>Y?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(N)),i!==n?(tt=e,e=r=X(i)):(Y=e,e=n)):(Y=e,e=n)),e}function wt(){var e,r,i;return e=Y,t.substr(Y,2)===D?(r=D,Y+=2):(r=n,0===it&&lt(G)),r!==n&&(tt=e,r=H()),(e=r)===n&&(e=Y,92===t.charCodeAt(Y)?(r=Z,Y++):(r=n,0===it&&lt(P)),r!==n?(t.length>Y?(i=t.charAt(Y),Y++):(i=n,0===it&&lt(N)),i!==n?(tt=e,e=r=B(i)):(Y=e,e=n)):(Y=e,e=n)),e}const{QuotedString:kt,VerbatimString:Ct,Variable:Wt,VariableAssignment:Et,Word:Tt,List:_t,Whitespace:Lt}=tokens;if((r=s())!==n&&Y===t.length)return r;throw r!==n&&Y<t.length&&lt({type:"end"}),Qt=nt,Ft=rt<t.length?t.charAt(rt):null,zt=rt<t.length?ct(rt,rt+1):ct(rt,rt),new peg$SyntaxError(peg$SyntaxError.buildMessage(Qt,Ft),Qt,Ft,zt);var Qt,Ft,zt}peg$subclass(peg$SyntaxError,Error),peg$SyntaxError.buildMessage=function(t,e){var r={literal:function(t){return'"'+i(t.text)+'"'},class:function(t){var e,r="";for(e=0;e<t.parts.length;e++)r+=t.parts[e]instanceof Array?s(t.parts[e][0])+"-"+s(t.parts[e][1]):s(t.parts[e]);return"["+(t.inverted?"^":"")+r+"]"},any:function(t){return"any character"},end:function(t){return"end of input"},other:function(t){return t.description}};function n(t){return t.charCodeAt(0).toString(16).toUpperCase()}function i(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(t){return"\\x0"+n(t)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(t){return"\\x"+n(t)}))}function s(t){return t.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(t){return"\\x0"+n(t)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(t){return"\\x"+n(t)}))}return"Expected "+function(t){var e,n,i,s=new Array(t.length);for(e=0;e<t.length;e++)s[e]=(i=t[e],r[i.type](i));if(s.sort(),s.length>0){for(e=1,n=1;e<s.length;e++)s[e-1]!==s[e]&&(s[n]=s[e],n++);s.length=n}switch(s.length){case 1:return s[0];case 2:return s[0]+" or "+s[1];default:return s.slice(0,-1).join(", ")+", or "+s[s.length-1]}}(t)+" but "+function(t){return t?'"'+i(t)+'"':"end of input"}(e)+" found."};var parser_1=(parser={SyntaxError:peg$SyntaxError,parse:peg$parse}).parse;function substitute(t,e){switch(t.kind){case 0:return new List(t.items.map(t=>substitute(t,e)).filter(t=>null!==t));case 2:let r=e[t.name];return r||(r=t.fallback?substitute(t.fallback,e):null),new SubstitutedVariable(t.name,r);case 3:return new VariableAssignment(t.name,substitute(t.value,e));case 6:return new QuotedString(t.contents.map(t=>"string"==typeof t?t:substitute(t,e)));default:return t}}function stringify(t){switch(t.kind){case 0:return t.items.map(stringify).filter(t=>null!==t).join("");case 2:return null;case 4:const e=t.value;return null==e?null:"string"==typeof e?e:stringify(e);case 3:return`${t.name}=${stringify(t.value)||""}`;case 6:return t.contents.reduce((t,e)=>"string"==typeof e?t+e:t+(stringify(e)||""),"");case 5:case 7:case 1:return t.contents}}function collapseWhitespace(t){switch(t.kind){case 0:const e=[];let r=!1;for(const n of t.items)if(1===n.kind)r=!0;else{const t=collapseWhitespace(n);null!==t&&(r&&e.length>0&&e.push(new Whitespace(" ")),r=!1,e.push(t))}return new List(e);case 4:const n=t.value;return null==n?null:"string"!=typeof n?collapseWhitespace(n):new SubstitutedVariable(t.name,n.trim().replace(/\s+/g," "));default:return t}}const parse=t=>parser_1(t),replace=(t,e)=>{return stringify(collapseWhitespace(substitute(parser_1(t),e)))};exports.List=List,exports.QuotedString=QuotedString,exports.SubstitutedVariable=SubstitutedVariable,exports.Variable=Variable,exports.VariableAssignment=VariableAssignment,exports.VerbatimString=VerbatimString,exports.Whitespace=Whitespace,exports.Word=Word,exports.collapseWhitespace=collapseWhitespace,exports.parse=parse,exports.replace=replace,exports.stringify=stringify,exports.substitute=substitute;
//# sourceMappingURL=index.js.map
