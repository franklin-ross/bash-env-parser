"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class Variable{constructor(t,e=null,r=null){this.name=t,this.fallbackType=e,this.fallback=r,this.kind=2}toString(){return"${"+this.name+(this.fallbackType||"")+(this.fallback||"")+"}"}}class VariableAssignment{constructor(t,e){this.name=t,this.value=e,this.kind=3}toString(){return this.name+"="+this.value.toString()}}class SubstitutedVariable{constructor(t,e=null){this.name=t,this.value=e,this.kind=4}toString(){let t=this.value;return t&&(t="string"==typeof t?t:t.toString()),"${"+this.name+"="+t+"}"}}class QuotedString{constructor(t){this.contents=t,this.kind=6}toString(){return`"${this.contents}"`}}class VerbatimString{constructor(t){this.contents=t,this.kind=7}toString(){return`'${this.contents}'`}}class Word{constructor(t){this.contents=t,this.kind=5}toString(){return`(${this.contents})`}}class List{constructor(t){this.items=t,this.kind=0}toString(){return`[${this.items}]`}}class Whitespace{constructor(t){this.contents=t,this.kind=1}toString(){return`(${this.contents})`}}!function(t){t[t.List=0]="List",t[t.Whitespace=1]="Whitespace",t[t.Variable=2]="Variable",t[t.VariableAssignment=3]="VariableAssignment",t[t.SubstitutedVariable=4]="SubstitutedVariable",t[t.Text=5]="Text",t[t.QuotedText=6]="QuotedText",t[t.LiteralText=7]="LiteralText"}(exports.TokenKind||(exports.TokenKind={}));var tokens=Object.freeze({__proto__:null,Variable:Variable,VariableAssignment:VariableAssignment,SubstitutedVariable:SubstitutedVariable,QuotedString:QuotedString,VerbatimString:VerbatimString,Word:Word,List:List,Whitespace:Whitespace,get TokenKind(){return exports.TokenKind}}),parser="use strict";function peg$subclass(t,e){function r(){this.constructor=t}r.prototype=e.prototype,t.prototype=new r}function peg$SyntaxError(t,e,r,n){this.message=t,this.expected=e,this.found=r,this.location=n,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,peg$SyntaxError)}function peg$parse(t,e){e=void 0!==e?e:{};var r,n={},s={start:dt},i=dt,a=function(t){return new Ft(t)},u="=",o=lt("=",!1),c=function(t,e){return new jt(t,new Ft(e))},l="${",h=lt("${",!1),p=":-",f=lt(":-",!1),g=":=",d=lt(":=",!1),b="}",A=lt("}",!1),x=function(t,e,r){return new Lt(t,e,r)},S=function(t){return new Lt(t)},m="$",v=lt("$",!1),y=function(){return new _t("$")},$=function(t){return 1===t.length?t[0]:new Ft(t)},V={type:"other",description:"variable name"},w=/^[a-zA-Z_]/,k=ht([["a","z"],["A","Z"],"_"],!1,!1),W=/^[a-zA-Z_0-9]/,C=ht([["a","z"],["A","Z"],"_",["0","9"]],!1,!1),E=function(){return ct()},T=/^[ \t\n\r]/,_=ht([" ","\t","\n","\r"],!1,!1),L=function(){return new zt(ct())},j="'",Q=lt("'",!1),F=function(t){return new _t(t)},z='"',K=lt('"',!1),R=function(t){return new Tt(t)},Z=function(t){return new Qt(t.join(""))},M=function(t){return t.join("")},O="\\",P=lt("\\",!1),U=/^[$"`\\]/,q=ht(["$",'"',"`","\\"],!1,!1),B=function(t){return t},D="\\\n",G=lt("\\\n",!1),H=function(){return""},I=/^[$"]/,J=ht(["$",'"'],!1,!1),N={type:"any"},X=function(t){return t},Y=/^[$}'"]/,tt=ht(["$","}","'",'"'],!1,!1),et=/^[$'"]/,rt=ht(["$","'",'"'],!1,!1),nt=0,st=0,it=[{line:1,column:1}],at=0,ut=[],ot=0;if("startRule"in e){if(!(e.startRule in s))throw new Error("Can't start parsing from rule \""+e.startRule+'".');i=s[e.startRule]}function ct(){return t.substring(st,nt)}function lt(t,e){return{type:"literal",text:t,ignoreCase:e}}function ht(t,e,r){return{type:"class",parts:t,inverted:e,ignoreCase:r}}function pt(e){var r,n=it[e];if(n)return n;for(r=e-1;!it[r];)r--;for(n={line:(n=it[r]).line,column:n.column};r<e;)10===t.charCodeAt(r)?(n.line++,n.column=1):n.column++,r++;return it[e]=n,n}function ft(t,e){var r=pt(t),n=pt(e);return{start:{offset:t,line:r.line,column:r.column},end:{offset:e,line:n.line,column:n.column}}}function gt(t){nt<at||(nt>at&&(at=nt,ut=[]),ut.push(t))}function dt(){var t,e,r;for(t=nt,e=[],(r=At())===n&&(r=bt())===n&&(r=mt());r!==n;)e.push(r),(r=At())===n&&(r=bt())===n&&(r=mt());return e!==n&&(st=t,e=a(e)),t=e}function bt(){var t;return(t=vt())===n&&(t=yt())===n&&(t=function(){var t,e,r;if(t=nt,e=[],(r=Ct())!==n)for(;r!==n;)e.push(r),r=Ct();else e=n;e!==n&&(st=t,e=Z(e));return t=e}())===n&&(t=xt()),t}function At(){var e,r,s,i,a;if(e=nt,(r=St())!==n)if(61===t.charCodeAt(nt)?(s=u,nt++):(s=n,0===ot&&gt(o)),s!==n){if(i=[],(a=bt())!==n)for(;a!==n;)i.push(a),a=bt();else i=n;i!==n?(st=e,e=r=c(r,i)):(nt=e,e=n)}else nt=e,e=n;else nt=e,e=n;return e}function xt(){var e,r,s,i,a,u;return e=nt,t.substr(nt,2)===l?(r=l,nt+=2):(r=n,0===ot&&gt(h)),r!==n&&(s=St())!==n?(t.substr(nt,2)===p?(i=p,nt+=2):(i=n,0===ot&&gt(f)),i===n&&(t.substr(nt,2)===g?(i=g,nt+=2):(i=n,0===ot&&gt(d))),i!==n&&(a=function(){var t,e,r;t=nt,e=[],(r=vt())===n&&(r=yt())===n&&(r=$t())===n&&(r=xt())===n&&(r=mt());for(;r!==n;)e.push(r),(r=vt())===n&&(r=yt())===n&&(r=$t())===n&&(r=xt())===n&&(r=mt());e!==n&&(st=t,e=$(e));return t=e}())!==n?(125===t.charCodeAt(nt)?(u=b,nt++):(u=n,0===ot&&gt(A)),u!==n?(st=e,e=r=x(s,i,a)):(nt=e,e=n)):(nt=e,e=n)):(nt=e,e=n),e===n&&(e=nt,t.substr(nt,2)===l?(r=l,nt+=2):(r=n,0===ot&&gt(h)),r!==n&&(s=St())!==n?(125===t.charCodeAt(nt)?(i=b,nt++):(i=n,0===ot&&gt(A)),i!==n?(st=e,e=r=S(s)):(nt=e,e=n)):(nt=e,e=n),e===n&&(e=nt,36===t.charCodeAt(nt)?(r=m,nt++):(r=n,0===ot&&gt(v)),r!==n&&(s=St())!==n?(st=e,e=r=S(s)):(nt=e,e=n),e===n&&(e=nt,36===t.charCodeAt(nt)?(r=m,nt++):(r=n,0===ot&&gt(v)),r!==n&&(st=e,r=y()),e=r))),e}function St(){var e,r,s,i;if(ot++,e=nt,w.test(t.charAt(nt))?(r=t.charAt(nt),nt++):(r=n,0===ot&&gt(k)),r!==n){for(s=[],W.test(t.charAt(nt))?(i=t.charAt(nt),nt++):(i=n,0===ot&&gt(C));i!==n;)s.push(i),W.test(t.charAt(nt))?(i=t.charAt(nt),nt++):(i=n,0===ot&&gt(C));s!==n?(st=e,e=r=E()):(nt=e,e=n)}else nt=e,e=n;return ot--,e===n&&(r=n,0===ot&&gt(V)),e}function mt(){var e,r,s;if(e=nt,r=[],T.test(t.charAt(nt))?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(_)),s!==n)for(;s!==n;)r.push(s),T.test(t.charAt(nt))?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(_));else r=n;return r!==n&&(st=e,r=L()),e=r}function vt(){var e,r,s,i;return e=nt,39===t.charCodeAt(nt)?(r=j,nt++):(r=n,0===ot&&gt(Q)),r!==n&&(s=function(){var t,e,r;if(t=nt,e=[],(r=kt())!==n)for(;r!==n;)e.push(r),r=kt();else e=n;e!==n&&(st=t,e=M(e));return t=e}())!==n?(39===t.charCodeAt(nt)?(i=j,nt++):(i=n,0===ot&&gt(Q)),i!==n?(st=e,e=r=F(s)):(nt=e,e=n)):(nt=e,e=n),e}function yt(){var e,r,s,i;if(e=nt,34===t.charCodeAt(nt)?(r=z,nt++):(r=n,0===ot&&gt(K)),r!==n){for(s=[],(i=Vt())===n&&(i=xt());i!==n;)s.push(i),(i=Vt())===n&&(i=xt());s!==n?(34===t.charCodeAt(nt)?(i=z,nt++):(i=n,0===ot&&gt(K)),i!==n?(st=e,e=r=R(s)):(nt=e,e=n)):(nt=e,e=n)}else nt=e,e=n;return e}function $t(){var t,e,r;if(t=nt,e=[],(r=Wt())!==n)for(;r!==n;)e.push(r),r=Wt();else e=n;return e!==n&&(st=t,e=Z(e)),t=e}function Vt(){var t,e,r;if(t=nt,e=[],(r=wt())!==n)for(;r!==n;)e.push(r),r=wt();else e=n;return e!==n&&(st=t,e=M(e)),t=e}function wt(){var e,r,s;return e=nt,92===t.charCodeAt(nt)?(r=O,nt++):(r=n,0===ot&&gt(P)),r!==n?(U.test(t.charAt(nt))?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(q)),s!==n?(st=e,e=r=B(s)):(nt=e,e=n)):(nt=e,e=n),e===n&&(e=nt,t.substr(nt,2)===D?(r=D,nt+=2):(r=n,0===ot&&gt(G)),r!==n&&(st=e,r=H()),(e=r)===n&&(e=nt,r=nt,ot++,I.test(t.charAt(nt))?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(J)),ot--,s===n?r=void 0:(nt=r,r=n),r!==n?(t.length>nt?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(N)),s!==n?(st=e,e=r=X(s)):(nt=e,e=n)):(nt=e,e=n))),e}function kt(){var e,r,s;return e=nt,r=nt,ot++,39===t.charCodeAt(nt)?(s=j,nt++):(s=n,0===ot&&gt(Q)),ot--,s===n?r=void 0:(nt=r,r=n),r!==n?(t.length>nt?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(N)),s!==n?(st=e,e=r=X(s)):(nt=e,e=n)):(nt=e,e=n),e}function Wt(){var e,r,s;return(e=Et())===n&&(e=nt,r=nt,ot++,Y.test(t.charAt(nt))?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(tt)),s===n&&(s=mt()),ot--,s===n?r=void 0:(nt=r,r=n),r!==n?(t.length>nt?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(N)),s!==n?(st=e,e=r=X(s)):(nt=e,e=n)):(nt=e,e=n)),e}function Ct(){var e,r,s;return(e=Et())===n&&(e=nt,r=nt,ot++,et.test(t.charAt(nt))?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(rt)),s===n&&(s=mt()),ot--,s===n?r=void 0:(nt=r,r=n),r!==n?(t.length>nt?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(N)),s!==n?(st=e,e=r=X(s)):(nt=e,e=n)):(nt=e,e=n)),e}function Et(){var e,r,s;return e=nt,t.substr(nt,2)===D?(r=D,nt+=2):(r=n,0===ot&&gt(G)),r!==n&&(st=e,r=H()),(e=r)===n&&(e=nt,92===t.charCodeAt(nt)?(r=O,nt++):(r=n,0===ot&&gt(P)),r!==n?(t.length>nt?(s=t.charAt(nt),nt++):(s=n,0===ot&&gt(N)),s!==n?(st=e,e=r=B(s)):(nt=e,e=n)):(nt=e,e=n)),e}const{QuotedString:Tt,VerbatimString:_t,Variable:Lt,VariableAssignment:jt,Word:Qt,List:Ft,Whitespace:zt}=tokens;if((r=i())!==n&&nt===t.length)return r;throw r!==n&&nt<t.length&&gt({type:"end"}),Kt=ut,Rt=at<t.length?t.charAt(at):null,Zt=at<t.length?ft(at,at+1):ft(at,at),new peg$SyntaxError(peg$SyntaxError.buildMessage(Kt,Rt),Kt,Rt,Zt);var Kt,Rt,Zt}peg$subclass(peg$SyntaxError,Error),peg$SyntaxError.buildMessage=function(t,e){var r={literal:function(t){return'"'+s(t.text)+'"'},class:function(t){var e,r="";for(e=0;e<t.parts.length;e++)r+=t.parts[e]instanceof Array?i(t.parts[e][0])+"-"+i(t.parts[e][1]):i(t.parts[e]);return"["+(t.inverted?"^":"")+r+"]"},any:function(t){return"any character"},end:function(t){return"end of input"},other:function(t){return t.description}};function n(t){return t.charCodeAt(0).toString(16).toUpperCase()}function s(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(t){return"\\x0"+n(t)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(t){return"\\x"+n(t)}))}function i(t){return t.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(t){return"\\x0"+n(t)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(t){return"\\x"+n(t)}))}return"Expected "+function(t){var e,n,s,i=new Array(t.length);for(e=0;e<t.length;e++)i[e]=(s=t[e],r[s.type](s));if(i.sort(),i.length>0){for(e=1,n=1;e<i.length;e++)i[e-1]!==i[e]&&(i[n]=i[e],n++);i.length=n}switch(i.length){case 1:return i[0];case 2:return i[0]+" or "+i[1];default:return i.slice(0,-1).join(", ")+", or "+i[i.length-1]}}(t)+" but "+function(t){return t?'"'+s(t)+'"':"end of input"}(e)+" found."};var parser_1=(parser={SyntaxError:peg$SyntaxError,parse:peg$parse}).parse;function substitute(t,e){switch(t.kind){case 0:return new List(t.items.map(t=>substitute(t,e)).filter(t=>null!==t));case 2:let r=e[t.name];return r||(r=t.fallback?substitute(t.fallback,e):null),new SubstitutedVariable(t.name,r);case 3:return new VariableAssignment(t.name,substitute(t.value,e));case 6:return new QuotedString(t.contents.map(t=>"string"==typeof t?t:substitute(t,e)));default:return t}}function stringify(t){switch(t.kind){case 0:return t.items.map(stringify).filter(t=>null!==t).join("");case 2:return null;case 4:const e=t.value;return null==e?null:"string"==typeof e?e:stringify(e);case 3:return`${t.name}=${stringify(t.value)||""}`;case 6:return t.contents.reduce((t,e)=>"string"==typeof e?t+e:t+(stringify(e)||""),"");case 5:case 7:case 1:return t.contents}}function toShellArgs(t){switch(t.kind){case 0:const e=[];let r=!1;for(const n of t.items)if(1===n.kind)r=!0;else{const t=toShellArgs(n);null!==t&&(r||0===e.length?e.push(t):e[e.length-1]+=t,r=!1)}return e;case 2:return null;case 4:const n=t.value;return null==n?null:"string"==typeof n?n:join(toShellArgs(n));case 3:return`${t.name}=${join(toShellArgs(t.value))}`;case 6:return t.contents.reduce((t,e)=>"string"==typeof e?t+e:t+(toShellArgs(e)||""),"");case 5:case 7:case 1:return t.contents}}function join(t){return null==t?"":"string"==typeof t?t:t.join("")}function collapseWhitespace(t){switch(t.kind){case 0:const e=[];let r=!1;for(const n of t.items)if(1===n.kind)r=!0;else{const t=collapseWhitespace(n);null!==t&&(r&&e.length>0&&e.push(new Whitespace(" ")),r=!1,e.push(t))}return new List(e);case 4:const n=t.value;return null==n?null:"string"!=typeof n?collapseWhitespace(n):new SubstitutedVariable(t.name,n.trim().replace(/\s+/g," "));default:return t}}const parse=t=>parser_1(t),replace=(t,e)=>{return stringify(collapseWhitespace(substitute(parser_1(t),e)))};exports.List=List,exports.QuotedString=QuotedString,exports.SubstitutedVariable=SubstitutedVariable,exports.Variable=Variable,exports.VariableAssignment=VariableAssignment,exports.VerbatimString=VerbatimString,exports.Whitespace=Whitespace,exports.Word=Word,exports.collapseWhitespace=collapseWhitespace,exports.parse=parse,exports.replace=replace,exports.stringify=stringify,exports.substitute=substitute,exports.toShellArgs=toShellArgs;
//# sourceMappingURL=index.js.map
