Class("linb.Coder",null,{Initialize:function(){linb.CSS.addStyleSheet('.sh {font-family: "Courier New" , Courier, mono;font-size: 12px;border: 1px solid #92D1E4;background:#fff;}.sh .sh-con{padding-bottom:3px;background-color: #fff;}.sh .sh-cmd{padding: 3px 8px 3px 8px;font: 9px Verdana, Geneva, Arial, Helvetica, sans-serif;color: silver;border-bottom: 1px solid #EBEADB;}.sh .sh-cmd a{font-size: 12px;color: blue;text-decoration: none;margin-right: 10px;}.sh .sh-cmd a:hover{color: red;}.sh .cmd-ruler{width:25px;}.sh .sh-toggle{width:16px;cursor:pointer;font-size:14px;color:blue;vertical-align:baseline;}.sh ol{color: #FF97A9; margin: 0px 0px 0px 45px; padding: 0; border-bottom: 1px solid #EBEADB; }.sh ol li{color: #000157;border-left: 3px solid #6CE26C;padding-left: 10px;line-height: 14px;list-style: decimal none;margin:0;border-bottom: 1px dashed #E2E2E2;}.sh-con span{vertical-align:inherit;'+(linb.browser.ie?"zoom:0;":"")+"}.sh .js .comment, .sh .php .comment{ color: green; }.sh .js .string, .sh .php .string{ color: #ff1493; }.sh .js .reg, .sh .php .reg{ color: #ff1493; }.sh .js .number,.sh .php .number { color: darkred; }.sh .js .keyword, .sh .php .keyword{ color: blue; }.sh .js .keyword2, .sh .php .keyword2 { font-weight: bold; color: red; }.sh .js .special, .sh .php .special{ font-weight: bold; color: navy; }.sh .php .vars{color:#079BFA}.sh .css .comment { color: green; }.sh .css .string { color: red; }.sh .css .colors { color: darkred; }.sh .css .vars { color: #d00; }.sh .css .number { color: blue; }.sh .css .keyword {color:teal;}.sh .css .selector {font-weight: bold; color: navy;}.sh .html .comment { color: green; }.sh .html .string{ color: #ff1493; }.sh .html .script{ color: #ff1493; }.sh .html .attr { color: blue; }.sh .html .speical{color:#079BFA}.sh .html .tag { font-weight: bold; color: navy; }",this.KEY);this._profiles={js:{multicomment:this.$COM_REG.BLOCK_COMMENT,comment:this.$COM_REG.LINE_COMMENT,reg:this.$COM_REG.REG,string1:this.$COM_REG.DQ_STRING,string2:this.$COM_REG.SQ_STRING,number:this.$COM_REG.NUMBER,keyword:"try|throw|catch|finally|arguments|break|case|continue|default|delete|do|else|false|for|function|if|in|instanceof|new|null|return|switch|this|true|typeof|var|void|while|with|toString|valueOf|window|prototype|document|escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|NaN|isNaN|Infinity|Error",keyword2:"exists|isNull|isObj|isEmpty|isArr|isBool|isDate|isFun|isHash|isNumb|isStr|_.arr|_.bool|_.cls|_.date|_.fun|_.hash|_.numb|_.str|_.id|_|alias|host|append|toArr|breakO|tryF|each|copy|clone|filter|asyRun|resetRun|merge|each|swap|removeFrom|filter|indexOf|clean|insertAny|serialize|unserialize|Class|Instance|Initialize|Before|After|Static|Constructor|reBoxing|copy|clone|left|top|right|bottom|startWith|endWith|initial|trim|ltrim|rtrim|blen|toDom|create",special:/linb[\w\.]*|(\bon|before|after|set|get)[A-Z]\w*/},css:{multicomment:this.$COM_REG.BLOCK_COMMENT,string:[this.$COM_REG.DQ_STRING,this.$COM_REG.SQ_STRING],IGNORE:/\([^'")]*\)/,keyword:[/@\w[\w.\s]*/,/attr|rect|rgb|url/],selector:/[\w-:\[.#][^{};]*\{/,colors:/\#[a-zA-Z0-9]{3,6}/,number:[/(\d*\.?\d+|\d+\.?\d*)(cm|em|ex|pt|px|%|\:)?/],vars:[/(-[\w-]+)\s*[ ]*:/,/([\w-]+)\s*[ ]*:/]},php:{multicomment:this.$COM_REG.BLOCK_COMMENT,comment:this.$COM_REG.LINE_COMMENT,reg:this.$COM_REG.REG,string:[this.$COM_REG.DQ_STRING,this.$COM_REG.SQ_STRING],number:this.$COM_REG.NUMBER,keyword:"abs|acos|acosh|addcslashes|addslashes|array_change_key_case|array_chunk|array_combine|array_count_values|array_diff|array_diff_assoc|array_diff_key|array_diff_uassoc|array_diff_ukey|array_fill|array_filter|array_flip|array_intersect|array_intersect_assoc|array_intersect_key|array_intersect_uassoc|array_intersect_ukey|array_key_exists|array_keys|array_map|array_merge|array_merge_recursive|array_multisort|array_pad|array_pop|array_product|array_push|array_rand|array_reduce|array_reverse|array_search|array_shift|array_slice|array_splice|array_sum|array_udiff|array_udiff_assoc|array_udiff_uassoc|array_uintersect|array_uintersect_assoc|array_uintersect_uassoc|array_unique|array_unshift|array_values|array_walk|array_walk_recursive|atan|atan2|atanh|base64_decode|base64_encode|base_convert|basename|bcadd|bccomp|bcdiv|bcmod|bcmul|bindec|bindtextdomain|bzclose|bzcompress|bzdecompress|bzerrno|bzerror|bzerrstr|bzflush|bzopen|bzread|bzwrite|ceil|chdir|checkdate|checkdnsrr|chgrp|chmod|chop|chown|chr|chroot|chunk_split|class_exists|closedir|closelog|copy|cos|cosh|count|count_chars|date|decbin|dechex|decoct|deg2rad|delete|ebcdic2ascii|echo|empty|end|ereg|ereg_replace|eregi|eregi_replace|error_log|error_reporting|escapeshellarg|escapeshellcmd|eval|exec|exit|exp|explode|extension_loaded|feof|fflush|fgetc|fgetcsv|fgets|fgetss|file_exists|file_get_contents|file_put_contents|fileatime|filectime|filegroup|fileinode|filemtime|fileowner|fileperms|filesize|filetype|floatval|flock|floor|flush|fmod|fnmatch|fopen|fpassthru|fprintf|fputcsv|fputs|fread|fscanf|fseek|fsockopen|fstat|ftell|ftok|getallheaders|getcwd|getdate|getenv|gethostbyaddr|gethostbyname|gethostbynamel|getimagesize|getlastmod|getmxrr|getmygid|getmyinode|getmypid|getmyuid|getopt|getprotobyname|getprotobynumber|getrandmax|getrusage|getservbyname|getservbyport|gettext|gettimeofday|gettype|glob|gmdate|gmmktime|ini_alter|ini_get|ini_get_all|ini_restore|ini_set|interface_exists|intval|ip2long|is_a|is_array|is_bool|is_callable|is_dir|is_double|is_executable|is_file|is_finite|is_float|is_infinite|is_int|is_integer|is_link|is_long|is_nan|is_null|is_numeric|is_object|is_readable|is_real|is_resource|is_scalar|is_soap_fault|is_string|is_subclass_of|is_uploaded_file|is_writable|is_writeable|mkdir|mktime|nl2br|parse_ini_file|parse_str|parse_url|passthru|pathinfo|readlink|realpath|rewind|rewinddir|rmdir|round|str_ireplace|str_pad|str_repeat|str_replace|str_rot13|str_shuffle|str_split|str_word_count|strcasecmp|strchr|strcmp|strcoll|strcspn|strftime|strip_tags|stripcslashes|stripos|stripslashes|stristr|strlen|strnatcasecmp|strnatcmp|strncasecmp|strncmp|strpbrk|strpos|strptime|strrchr|strrev|strripos|strrpos|strspn|strstr|strtok|strtolower|strtotime|strtoupper|strtr|strval|substr|substr_compare",keyword2:"and|or|xor|__FILE__|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|old_function|return|static|switch|use|require|require_once|var|while|__FUNCTION__|__CLASS__|__METHOD__|abstract|interface|public|implements|extends|private|protected|throw",vars:/\$\w+/},html:{multicomment:this.$COM_REG.HTML_COMMENT,tag:/\x02\/?\w+/,attr:/\w+=/,script:/(>([^<][^\/]*<+)*\/)(script|style)>/,special:/<!DOCTYPE[^>]+>/,string:[this.$COM_REG.DQ_STRING,this.$COM_REG.SQ_STRING]}}},Static:{$COM_REG:{HTML_COMMENT:/<!\s*(--([^-]|[\r\n]|-[^-])*--\s*)>/,BLOCK_COMMENT:/\/\*[^*]*\*+([^\/][^*]*\*+)*\//,LINE_COMMENT:/\/\/[^\n]*/,REG:/\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/,DQ_STRING:/"(\\.|[^"\\])*"/,SQ_STRING:/'(\\.|[^'\\])*'/,NUMBER:/-?(\d*\.?\d+|\d+\.?\d*)([eE][+-]?\d+|%)?\b/},replace:function(D,B,P,A){var H,J,N,E,C,G,S=[],R=[],Q=arguments.callee,O=Q.reg1||(Q.reg1=/\\./g),M=Q.reg2||(Q.reg2=/\(/g),L=Q.reg3||(Q.reg3=/\$\d/),K=Q.reg4||(Q.reg4=/^\$\d+$/),I=Q.reg5||(Q.reg5=/'/),F=Q.reg6||(Q.reg6=/\\./g),T=Q.reg11||(Q.reg11=/(['"])\1\+(.*)\+\1\1$/);if(!_.isArr(B)){B=[B,P]}else{A=P}if(!_.isArr(B[0])){B=[B]}_.arr.each(B,function(U){E=typeof U[0]=="string"?U[0]:U[0].source;C=U[1]||"";J=((E).replace(O,"").match(M)||"").length;if(typeof C!="function"){if(L.test(C)){if(K.test(C)){N=parseInt(C.slice(1));if(N<=J){C=N}}else{G=I.test(C.replace(F,""))?'"':"'";H=J;while(H+1){C=C.split("$"+H).join(G+"+a[o+"+H--+"]+"+G)}C=new Function("a,o","return"+G+C.replace(T,"$1")+G)}}}S.push(E||"^$");R.push([C,J,typeof C])});return D.replace(new RegExp("("+S.join(")|(")+")",A?"gim":"gm"),function(){var X=1,V=0,U=arguments,Y,W;if(!U[0]){return""}while(Y=R[V++]){if(W=U[X]){switch(Y[2]){case"function":return Y[0](U,X,V-1);case"number":return U[Y[0]+X];default:return Y[0]}}else{X+=Y[1]+1}}})},formatText:function(B,E,M){var I,L,R,A=[];var P=0,Q,O=20,T=function(U){var V="";while(U--){V+=" "}return V},S=[""];for(Q=1;Q<O;Q++){S.push(T(Q*4))}B=B.replace(/(\r\n|\r)/g,"\n");if(E=="html"){A.push([/[\s]*(<[\w]+[^>]+>)[\s]*/,"$1"]);A.push([/[\s]*(<\/[\w]+>)[\s]*/,"$1"]);B=this.replace(B,A);A.length=0;A.push([this.$COM_REG.HTML_COMMENT,"$0\\n"]);A.push([/<!\[CDATA\[(([^\]])|(\][^\]])|(\]\][^>]))*\]\]>/,function(U,V){return S[P]+U[V]+"\n"}]);A.push([/<input[^>]+>/,function(U,V){return S[P]+U[V]+"\n"}]);A.push([/<img[^>]+>/,function(U,V){return S[P]+U[V]+"\n"}]);A.push([/<[\w]+[^>]*\/>/,function(U,V){return S[P]+U[V]+"\n"}]);A.push([/[^<]+/,function(U,V){return S[P]+U[V]+"\n"}]);A.push([/<[\w]+[^>]*>/,function(U,V){return S[P++]+U[V]+"\n"}]);A.push([/<\/[\w]+>/,function(U,V){return S[--P]+U[V]+"\n"}]);B=this.replace(B,A,true)}else{var A=[],K=1,J=1,H=1,G=1,F=1,D=1,C=1,N={a:{},b:{},c:{},d:{},e:{},f:{},g:{}};I=this.$COM_REG;B=B.replace(/\\\r?\n/g,"");B=B.replace(/([\x01\x02\x03\x04])/g,"$1-");B=linb.Coder.replace(B,[[I.BLOCK_COMMENT.source,M?"":function(W,V){var U="\x01d"+G+++"\x02";N.d[U]=W[V];return U}],[I.LINE_COMMENT.source,M?"":function(W,V){var U="\x01e"+F+++"\x02";N.e[U]=W[V];return U}],[/\/\*@|@\*\/|\/\/@[^\n]*\n/.source,function(W,V){var U="\x01c"+H+++"\x02";N.c[U]=W[V];return U}],[I.SQ_STRING.source,function(W,V){var U="\x03a"+K+++"\x04";N.a[U]=W[V];return U}],[I.DQ_STRING.source,function(W,V){var U="\x03b"+J+++"\x04";N.b[U]=W[V];return U}],[I.REG.source,function(W,V){var U="\x03f"+D+++"\x04";N.f[U]=W[V];return U}],[/function\s*\([^)]*\)/.source,function(W,V){var U="\x03g"+C+++"\x04";N.g[U]=W[V];return U}]]);A=[["([+-])\\s+([+-])","$1 $2"],["\\b[\\s]+\\b"," "],["[\\s]+",""]];if(E=="css"){_.arr.insertAny(A,[/\s+(\.)/.source," $1"],2,true);_.arr.insertAny(A,[/(\d*\.?\d+|\d+\.?\d*)(cm|em|ex|pt|px|%|\:)?/," $0 "],-1,true)}B=linb.Coder.replace(B,A);if(!M){A=[[/[\{]/.source,function(U,V){return U[V]+"\n"+S[++P]}],[/[\x02\;]/.source,function(U,V){return U[V]+"\n"+S[P]}],[/(\,)([\x03\x04\w_\-]+\:)/.source,function(U,V){return U[V+1]+"\n"+S[P]+U[V+2]}],[/\x01/.source,function(U,V){return"\n"+S[P]+U[V]}],[/[\}]\s*[\,\;]*/.source,function(U,V){return"\n"+S[--P]+U[V]+"\n"+S[P]}]];if(E!="css"){A.push([/for\s*\([\w ]+\sin\s/.source,"$0"],[/for\s*\(([^;]*);([^;]*);([^)]*)\)/.source,"for($1; $2; $3)"],[/(,)(("[^"\n\r]*"|'[^'\n\r]*'|\w+)?(:|=>))/.source,function(U,V){return U[V+1]+"\n"+S[P]+U[V+2]}],[/\b(case|default)\b[^:]+:/.source,function(U,V){return U[V]+"\n"+S[P]}])}B=linb.Coder.replace(B,A);B=linb.Coder.replace(B,[[/ *[\n\r]/.source,"\n"],[/\{\s+\}/.source,"{}"],[/\}\n *(else|catch|finnally)/.source,"}$1"],[I.NUMBER,"$0"],[/(\/\/)|(\/\*)|(\*\/)/.source,"$0"],[/\s*((\+\+|\-\-|\&\&|\|\||!!)|([=!]==)|((<<|>>>|>>)=?)|([\+\-\*\/\%\&|^<>!=~]=?)|([?:]))\s*/.source," $1 "]])}B=linb.Coder.replace(B,[[/[\n\r]+/.source,"\n"],[/( *)(\x01[d]\d+\x02)/.source,function(V,U){V[U+1]=V[U+1]||"";return V[U+1]+N.d[V[U+2]].replace(/(\n)(\s*)/g,"$1"+V[U+1])}],[/\x03[g]\d+\x04/.source,function(V,U){return N.g[V[U]].replace(/\s*,\s*/g,","+(M?"":" "))}],[/[\x01\x03]([\w])\d+[\x02\x04]/.source,function(V,U){return N[V[U+1]][V[U]]}],[/\}\s*([\)\]])/.source,"}$1"]]);B=B.replace(/([\x01\x02\x03\x04])-/g,"$1")}return B},$linbid:1,formatHTML:function(E,L,K,D,P){if(!D){D=""+this.$linbid++}var C=this.$key,O=E,J=this,B=function(R){return R.replace(/\x02|\x03/g,function(S){return S=="\x02"?"&lt;":"&amp;"})},H=function(R){return R.replace(/<|\&/g,function(S){return S=="<"?"\x02":"\x03"})};E=E.replace(/^\s*(.*)\s*$/g,"$1");E=H(E);var M,N;if(!this._profiles[L]){L="js"}M=_.copy(this._profiles[L]);E=this.replace(E,[[/(\r\n|\r)/g,"\n"],[/( +)(\n)/g,"$2"],[/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;"],[/ /g,"&nbsp;"]]);var G=[];var I=function(T,R,S){if(T){if(!_.isArr(T)){T=[T]}_.arr.each(T,function(U){if(typeof U=="string"){U="\\b("+U+")\\b"}G.push([U,S?S:"<span class='"+R+"'>$0</span>"])})}};if(N=M.multicomment){I(N,"multicomment",function(R,S){return"<span class='comment'>"+R[S].split("\n").join("</span>\n<span class='comment'>")+"</span>"});delete M.multicomment}if(N=M.comment){I(N,"comment",function(R,S){return"<span class='comment'>"+R[S].replace("\n","")+"</span>"});delete M.comment}if(N=M.IGNORE){I(N,"IGNORE","$0");delete M.IGNORE}if(M.reg){(function(S,R){if(S){if(!_.isArr(S)){S=[S]}_.arr.each(S,function(T){if(typeof T=="string"){T="\\b("+T+")\\b"}G.push([T,"$1<span class='"+R+"'>$2</span>$5"])})}})(M.reg,"reg");delete M.reg}_.arr.each(["string1","string2","number"],function(R){if(M[R]){I(M[R],R);delete M[R]}});_.each(M,function(S,R){I(S,R)});E=this.replace(E,G);E=B(E);var Q="";var F=E.split("\n");if(F[0]==""){F.shift()}if(F[F.length-1]==""){F.pop()}var A=[];A.push("<div id='"+C+":"+D+":' class='sh'>");if(K&&K[0]){A.push("<div id='"+C+"-sh-cmd:"+D+":' class='sh-cmd'>");A.push("<span class='sh-toggle' href='javascript:;' onclick='linb.Coder._toggle(this);'>-</span> <span class='cmd-ruler'></span>");_.arr.each(K,function(R){A.push("<a id='"+C+"-"+R+":"+D+":' href='javascript:;' onclick='linb.Coder._action(this,\""+R+"\",arguments[0]);'>"+R+"</a>")});A.push("<span>"+L+" source code viewer, powered by <a href='http://www.linb.net' target='_blank' style='font-size:9px;color:#000157;'>LINB</a></span>");A.push("</div>")}A.push("<pre style='display:none'>");A.push(O.replace(/<([\w\/])/g,"&lt;$1"));A.push("</pre>");A.push("<div id='"+C+"-sh-con:"+D+":'class='sh-con' "+(P?"style='overflow:auto;height:"+P+"px;'":"")+"><ol id='"+C+"-ol:"+D+":' start='1' class='"+L+"'><li>");A.push(F.join("&nbsp;</li><li>"));A.push("</li></ol></div>");A.push("</div>");B=H=null;_.asyRun(function(){linb.Coder._remedy(D)});return A.join("")},formatAll:function(D,C,E,F,B){var A=_.toArr(arguments);A[0]=this.formatText.call(this,D,C);return this.formatHTML.apply(this,A)},applyById:function(E,D){var C=0,B=this,A=function(){if(linb.Dom.byId(E)){var G,H,F;C++;G=linb(E);F=(G.get(0).className||"").split(/\s+/g);H=_.str.toDom(linb.Coder[D?"formatAll":"formatHTML"](G.text(),F[0],F[1]&&F[1].split("-"),E+":"+C));G.replace(H)}else{return false}};linb.Thread.repeat(A)},_remedy:function(E){var C=this.$key+":"+E+":";if(!(C=linb(C)).isEmpty()){var D=C.parent(),B=D.scrollWidth(),A=D.width();D.css("positoin","relative");if(B>A){C.width(B)}}},$action:{run:function(D,C){var B=linb(D).parent().next().text(),A=new Function([],B);A.call(linb(D).parent(2),C)},plain:function(C){var B=linb(C).parent().next().text();var B=B.replace(/</g,"&lt;");var A=window.open("","_blank","width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=1");A.document.write('<pre style="width:100%;height:100%;border:none;">'+B+"</pre>");A.document.close();A=null}},_action:function(C,A,B){if(this.$action[A]){this.$action[A](C,B||window.event)}},_toggle:function(B){var A=B.parentNode.nextSibling.nextSibling.style;if(A.display=="none"){A.display="";B.innerHTML="-"}else{A.display="none";B.innerHTML="+"}}}});