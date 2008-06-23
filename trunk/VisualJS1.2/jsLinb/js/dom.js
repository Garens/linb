new function(){
    /* power _
    */
    _.merge(_,{
        /*break object memory link
        target: target object
        n: depth, default 1
        */
        breakO:function(target){
            var n=arguments[1]||1, l=1+(arguments[2]||0), self=arguments.callee, _t='_$gc_',_o=self.o||(self.o={}), i, b, p;
            if(target && (typeof target=='object' || typeof target=='function') && target!==window&&target!==Object&&target!==Date&&target!==Array&&target!==document){
                if(_t in target)return; else try{target[_t]=1;}catch(e){return}
                p=(p=target.constructor)?p.prototype:_o;
                for(i in target)
                    if(i!=_t){
                        if(l<n && target[i] && (typeof target[i]=='object' || typeof target[i]=='function'))self(target[i],n,l);
                        if(!(p && p[i]) && i!="prototype" && i!="constructor")try{delete target[i]}catch(e){}
                    }
                delete target[_t];
                if(target.constructor==Array)target.length=0;
            }
        },

        /*each function for hash
        fun: fun to exec, if return false, stop the $iterator
        target:target object for 'this';
        */
        each:function(hash,fun,target){
            target = target||hash;
            for(var i in hash)
                if(false===fun.call(target, hash[i], i, hash))
                    break;
            return hash;
        },
        /*shadow copy for hash
        */
        copy:function(hash){
            var i,h;
            if(hash.constructor==Array){
                h=[];
                for(var i=0, l=hash.length; i<l; i++)h[h.length]=hash[i];
            }else{
                h={};
                for(i in hash)h[i]=hash[i];
            }
            return h;
        },
        /*deep copy for hash
        be careful for dead lock
        */
        clone:function(hash,fun){
            if(!!hash && typeof hash=='object'){
                var i, v, h=hash.constructor==Array?[]:{}, me=arguments.callee;
                for(i in hash)if(fun?fun(i):true)h[i]=((v=hash[i])&&typeof v=='object')?me(v,fun):v;
                return h;
            }else return hash;
        },
        /*filter hash/array
        fun: filter function(will delete "return false")
        */
        filter:function(obj, fun, target,force){
            if(!force && obj && obj.constructor == Array){
                var i,l,a=[],o;
                for(i=0, l=obj.length; i<l; i++)a[a.length]=obj[i];
                obj.length=0;
                for(i=0, l=a.length; i<l; i++)
                    if(fun.call(target||a,a[i],i,a)!==false)
                        obj[obj.length]=a[i];
            }else{
                var i, bak={};
                for(i in obj)
                    if(false===fun.call(target, obj[i], i, obj))
                        bak[i]=1;
                for(i in bak)
                    delete obj[i];
            }
            return obj;
        },
        /*convert iterator to Array
        value: something can be iteratorred
        _.toArr({a:1},true) => [a];
        _.toArr({a:1},false) => [1];
        _.toArr('a,b') => ['a','b'];
        _.toArr('a;b',';') => ['a','b'];
        */
        toArr:function(value, flag){
            if(!value)return [];
            var arr=[];
            //hash
            if(flag!==undefined)
                for(var i in value)
                    arr[arr.length]=flag?i:value[i];
            //other like arguments
            else{
                if(typeof value=='string')
                    arr=value.split(flag||',');
                else
                    for(var i=0,l=value.length; i<l; ++i)
                        arr[i]=value[i];
            }
            return arr;
        },
       /* output error message
       */
        Error:function(e){
            return e ? (e.message || e.description || e.toString()) :''
        }
    });
    /* environment object
    */
    _.merge(_,{
        // type detection
        exists:function(target)  {return target!==undefined},
        isNull:function(target)  {return (typeof target == 'object') && !target },
        isObj:function(target)   {return !!target  && (typeof target == 'object' || typeof target == 'function')},
        isBool:function(target)  {return typeof target == 'boolean'},
        isNumb:function(target)  {return typeof target == 'number' && isFinite(target)},
        isDate:function(target)  {return !!target && target.constructor == Date},
        isFun:function(target)   {return typeof target == "function" && target.constructor != RegExp},
        isArr:function(target)   {return !!target && target.constructor == Array},
        isHash:function(target)  {return !!target && typeof target == 'object' && target.constructor == Object},
        isReg:function(target)   {return !!target && target.constructor == RegExp},
        isStr:function(target)   {return typeof target == "string"},

        /*force type
        value : any
        df : default value to set
        return : target type
        */
        arr:function(value,df){return _.isArr(value)?value:_.isArr(df)?df:[]},
        bool:function(value,df){return _.isBool(value)?value:_.isBool(df)?df:false},
        date:function(value,df){return _.isDate(value)?value:_.isDate(df)?df:new Date},
        fun:function(value,df){return _.isFun(value)?value:_.isFun(df)?df:function(){}},
        hash:function(value,df){return _.isHash(value)?value:_.isHash(df)?df:{}},
        numb:function(value,df){return _.isNumb(value)?value:_.isNumb(df)?df:0},
        str:function(value,df){return _.isStr(value)?value:_.isStr(df)?df:''}
    },'all');

    /*
    *
    *Power function, array , and string
    *
    */
    _.merge(_.str,{
        startWith:function(s,str){
            return s.indexOf(str) === 0;
        },
        endWith:function (s,str) {
            var l=s.length-str.length;
            return l>=0 && s.lastIndexOf(str) === l;
        },
        repeat:function(s,time){
            return new Array(time+1).join(s);
        },
        initial:function(s){
            return s.charAt(0).toUpperCase() + s.substring(1);
        },
        trim:function(s){
            return this.ltrim(this.rtrim(s));
        },
        ltrim:function(s){
            return s.replace(/^ */,"");
        },
        rtrim:function(s){
            return s.replace(/ *$/,"");
        },
/*
        blen : function(s){
            var _t=s.match(/[^\x00-\xff]/ig);
            return s.length+(null===_t?0:_t.length);
        },
*/
        toDom:function(s,flag){
            var p=linb.dom.getMatix().html(s, false).get(0),t,r=[],i;
            //get nodes
            for(var i=0,t=p.childNodes,l=t.length;i<l;i++)r[r.length]=t[i];
            //clear
            if(flag!==false){
                if(linb.browser.ie)
                    while(t=p.firstChild)p.removeChild(t);
                else
                    p.innerHTML='';
            }
            return linb(r);
        }
    });
    _.merge(_.fun,{
        body:function(f){
            with (String(f))return slice(indexOf("{") + 1, lastIndexOf("}"));
        },
        args:function(f){
            with (String(f)) return slice(indexOf("(") + 1, indexOf(")")).split(',');
        },
        clone:function(f){
            return new Function(f.args(),f.body());
        }
    });
    _.merge(_.arr,{
        subIndexOf:function(arr,sub,value){
            if(value===undefined)return -1;
            for(var i=0, l=arr.length; i<l; i++)
                if(arr[i][sub] === value)
                    return i;
            return -1;
        },
        removeFrom:function(arr, index,length){
            arr.splice(index, length || 1);
            return arr;
        },
        removeValue:function(arr, value){
            for(var l=arr.length,i=l-1; i>=0; i--)
                if(arr[i]===value)
                    arr.splice(i,1);
            return arr;
        },
        /*
         insert something to array
         arr: any
         index:default is length-1
         flag: is add array

         For example:
         [1,2].insertAny(3)
            will return [1,2,3]
         [1,2].insertAny(3,0)
            will return [3,1,2]
         [1,2].insertAny([3,4])
            will return [1,2,3,4]
         [1,2].insertAny([3,4],3,true)
            will return [1,2,[3,4]]
        */
        insertAny:function (arr, target,index, flag) {
            var a,l=arr.length;
            index = index===0?0:(index||l);
            if(index<0 || index>l)index=l;
            a=arr.splice(index,l-index);
            if(target.constructor!=Array || flag)
                arr[arr.length]=target;
            else
                arr.push.apply(arr, target);

            arr.push.apply(arr, a);
            return index;
        },
        clean:function(arr){
            var i,l,a=_.copy(arr);arr.length=0;
            for(i=0, l=a.length; i<l; i++)
                if(this.indexOf(arr,a[i])==-1)
                    arr[arr.length]=a[i];
           return arr;
        },
        /*each according to 'value'
        merge array
        arr: target to merge

        For example:
        [1,2].merge([2,3,4])
            will return [1,2,3,4]
        [1,2].merge([2,3,4],false)
            will return [1]
        */
        merge:function(arr,target,flag){
            var i,l;
            if(flag!==false){
                var copy=[];
                for(i=0, l=arr.length; i<l; i++)copy[copy.length]=arr[i];
                for(i=0, l=target.length; i<l; i++)
                    if(this.indexOf(copy,target[i])==-1)
                        arr[arr.length]=target[i];
                copy.length=0;
            }else{
                for(i=0, l=arr.length; i<l; i++)
                    if(this.indexOf(target,arr[i])>-1)
                        arr.splice(i, 1);
            }
            return arr;
        },
        indexOf:function(arr, value) {
            for(var i=0, l=arr.length; i<l; i++)
                if(arr[i] === value)
                    return i;
            return -1;
        },
        /*
        fun: fun to apply
        order: true - max to min , or min to max
        atarget: for this
        */
        each:function(arr,fun,target,order){
            var i, l, a=arr;
            if(a.constructor!=Array){
                if((a=a._nodes) || a.constructor!=Array)
                    throw new Error('Iterator Array only');
                if(order===undefined)
                    order=1;
            }
            l=a.length;
            target = target||arr;
            if(!order){
                for(i=0; i<l; i++)
                    if(fun.call(target, a[i], i, a)===false)
                        break;
            }else
                for(i=l-1; i>=0; i--)
                    if(fun.call(target, a[i], i, a)===false)
                        break;
            return arr;
        }
    });
};

//linb.iBox
Class('linb.iBox',null, {
    Before:function(key, parent_key, o){
        if(linb.iBox)linb.iBox.$type[key.replace("linb.","")]=linb.iBox.$type[key]=key;
    },
    Instance:{
        ini:function(){return this},
        get:function(index){
            return  this._nodes[index]||this._nodes;
        },
/***
        set:function(value,index){
            var self=this;
            if(_.isNumb(index))
                self._nodes[index] = value;
            else
                self._nodes = value;
            return self;
        },
***/
        create:function(){
            return this;
        },
        length:function(){
            return this._nodes.length;
        },
        each:function(fun){
            var self=this;
            for(var i=0,j=self._nodes,l=j.length;i<l;i++)
                if(false===fun.call(self,j[i],i))
                    break;
            return self;
        },
        push:function(o){
            return this._nodes.push(o);
        },
        pop:function(){
            return this._nodes.pop();
        },
        exists:function(node){
            return _.arr.indexOf(this._nodes,node)!=-1;
        },
        isEmpty:function(){
            return !this._nodes.length;
        },
        //flag is ture => minus
        add:function(e, flag){
            var self=this, arr = self.constructor.clean(e);
            _.arr.merge(self._nodes,arr, flag);
            return self;
        },
        minus:function(e){
            return this.add(e, false);
        },
        unBoxing:function(){
            return this.get();
        },
        //flag: true => clean input array
        reBoxing:function(key,flag){
            var self=this, t=linb.iBox.$type[key||'dom'];
            if(t==self.KEY)return self;
            if(t=linb.SC(t))return t.pack(self._nodes, flag);
        }
    },
    Static:{
        $i:true,
        $type:{},
        pack:function(e, flag){
            var o = new this(false);
            o._nodes = e ? flag===false ? e : this.clean(e) : null;
            return o;
        },
        clean:function(e){
            return e;
        },
        plugIn:function(key, fun){
            this.prototype[key]=fun;
            return this;
        },
        support:function(key){
            return typeof this.prototype[key]=='function';
        },
        //create:function(tag, properties, events, host, template, behavior, appearance, children){
        create:function(tag, id){
            var arr,o, t,me=arguments.callee,r1=me.r1||(me.r1=/^\s*<((\n|\r|.)*?)>\s*$/);
            if(tag.constructor==Array){
                arr=[];
                _.arr.each(tag,function(v,i){
                    _.arr.insertAny(arr,me.apply(null,v instanceof Array?v:[v])._nodes,-1);
                });
                return arr;
            }
            if(typeof tag == 'string'){
                // text node
                if(id===true)
                    o = linb([document.createTextNode(tag)]);
                // linb widgets
                else if(t=linb.iBox.$type[tag]){
                    arr=[];
                    //shift will crash in opera
                    for(var i=1,l=arguments.length;i<l;i++)
                        arr[i-1]=arguments[i];
                    o =new (linb.SC(t))(false);
                    o.ini.apply(o, arr).create();
                }else if(r1.test(tag))
                    o = _.str.toDom(tag);
                //normal
                else{
                    o=document.createElement(tag);
                    o.id = typeof id=='string'?id:_.id();
                    o=linb(o);
                }
            // linb widgets
            }else
                o =new (linb.SC(tag.key))(tag).create();

            return o;
        }
    },
    Initialize:function(){
        /*
        * power linb
        */
        /* set shortcut to linb.iBox.create
        */
        linb.create=function(){return linb.iBox.create.apply(linb.iBox, arguments)};
    }
});


Class('linb.DomProfile', 'linb.iProfile', {
    Instance:{
        $gc:function(){
            var self=this,t;
            if(self.addition&&(t=self.domNode))
                _.each(self.addition,function(o,i){
                    t[i]=null;
                });
            linb.cache.dom[self.id]=null;
        },
        getEV:function(id, name){
            var funs=[],t;
            if(t=_.get(linb.cache.dom,[id, 'events',name]))
                for(var i=0,l=t.length;i<l;i++)
                    if(typeof t[t[i]]=='function')
                        funs[funs.length]=t[t[i]];
            return funs;
        }
    }
});

/*linb.dom
    linb(window)
    linb(document)
    linb("id")
    linb(["id1","id2","id3"...])
    linb(linb(...))
    linb(node)
    linb([node,node,node,...])
    linb(fun):fun will reutun dom node array
*/
Class('linb.dom','linb.iBox',{
    Instance:{
        //keep id cache in linb.cache.dom
        //if widgets, value is serial id.
        id:function(value,flag){
            var t,me=arguments.callee,cache=linb.cache.dom,f=me.f||(me.f=function(o, value,flag){
                if(!flag)
                    if(t = cache[o.id]){
                        cache[value] = t;
                        delete cache[o.id];
                    }
                o.id = value;
            });
            if(typeof value == 'string')
                return this.each(function(o){
                    f(o, value, flag);
                });
            else
                return this.get(0).id;
        },

        //dom collection:
        /*dom cellect wrap function
        selector: selector expression
        flag: true => not select just filter
        fun: fun to run
        args: arguments for fun
        */
        $sum:function(fun, args){
            var arr=[],r;
            this.each(function(o){
                r=fun.apply(o, args||[]);
                if(r)_.arr.insertAny(arr,r);
            });
            return linb(arr);
        },
        /*get all dir children
        */
        children:function(){
            return this.$sum(function(){
                return _.toArr(this.childNodes)
            });
        },
        /* clone
         deep for cloneNode
        */
        clone:function(flag){
            return this.$sum(function(flag){
                return this.cloneNode(flag?true:false);
            },arguments);
        },
        /* iterator
        // type: left : x-axis,  top :y-axis, xy: x-axis and y-axis
        // dir : true => left to right; top to buttom, false => right to left ; bottom to top
        // inn: does start consider children
         fun : number or function => number is iterator index; function is "return true ->stop"
        */
        $iterator:function(type, dir, inn, fun, top){
            return this.$sum(function(type, dir, inn, fun, top){
                var self=arguments.callee;
                if(typeof fun != 'function'){
                    var count=fun||0;
                    fun = function(n,index){return index==count;}
                }
                var index=0,m,n=this,flag=0,t;
                while(n){
                    if(n.nodeType==1)
                        if(fun(n, index++)===true)break;

                    //x-axis true: right ;false: left
                    if(type=='x')
                        n= dir?n.nextSibling:n.previousSibling;
                    //y-axis true: down ;false: up
                    else if(type=='y')
                        n= dir ? self.call(dir===1?n.lastChild:n.firstChild, 'x',(dir!==1), true, 0, top) : n.parentNode;
                    else{
                        inn=_.bool(inn, true);
                        m=null;
                        n= dir ?
                                 (t = inn && n.firstChild ) ? t
                                              : (t = n.nextSibling ) ? t
                                                              :(m=n.parentNode)
                               : (t = inn && n.lastChild) ? t
                                              : (t = n.previousSibling ) ? t
                                                              :(m=n.parentNode);
                        if(m){
                            while(!( m = dir ? n.nextSibling: n.previousSibling)){
                                n=n.parentNode;
                                //to the top node
                                if(!n)
                                    if(flag)
                                        return null;
                                    else{
                                        flag=true;
                                        m = dir ? document.body.firstChild : document.body.lastChild;
                                        break;
                                    }
                            }
                            n=m;
                        }
                        inn=true;
                    }
                }
                return n;
            },arguments);
        },
        /*
        dig('div');
        dig('div','id');
        dig('div','id','a');
        dig('div','id',/^a/);
        */
        dig:function(tag, attr, exp){
            tag = tag||'*';
            var f='getElementsByTagName',
                me=arguments.callee, f1=me.f1||(me.f1=function(tag, attr, exp){
                var all = this[f](tag), arr=[];
                if(exp.test(this[attr]))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(exp.test(o[attr]))
                        arr[arr.length]=o;
                return arr;
            }),f2=me.f2||(me.f2=function(tag, attr, exp){
                var all = this[f](tag), arr=[];
                if(this[attr]==exp)
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr]==exp)
                        arr[arr.length]=o;
                return arr;
            }),f3=me.f3||(me.f3=function(tag, attr, exp){
                var all = this[f](tag), arr=[];
                if(this[attr])
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr])
                        arr[arr.length]=o;
                return arr;
            }),f4=me.f4||(me.f4=function(tag){
                return _.toArr(this[f](tag));
            }),f5=me.f5||(me.f5=function(tag, attr){
                var all = this[f](tag), arr=[];
                if(attr(this))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(attr(o))
                        arr[arr.length]=o;
                return arr;
            });
            return this.$sum(attr?typeof attr=='function'?f5:exp?exp.constructor == RegExp?f1:f2:f3:f4, [tag, attr, exp]);
        },
        /*
        No need selector in linb
        select:function(){
        },
        */
//add
        /*
        dom add implementation
        for addPre addFirst addNext addLast

        fun :for wrap
        o: to added target
        flag: false for add one only, not clone
        */
        $add:function(fun,target){
            target=linb(target);
            var v=this.get(0);
            target.each(function(target){
                fun.call(v,target);
            });
            return this;
        },
        addFirst:function(target){
            return this.$add(function(target){
                var self=this;
                if(self.firstChild!=target){
                    if(self.firstChild)
                        self.insertBefore(target, self.firstChild);
                    else
                        self.appendChild(target);
                }
            },target);
        },
        addLast:function(target){
            return this.$add(function(target){
                if(this.lastChild!=target)
                    this.appendChild(target);
            },target);
        },
        addPre:function(target){
            return this.$add(function(target){
                if(this.previousSibling!=target)
                    this.parentNode.insertBefore(target,this);
            },target);
        },
        addNext:function(target){
            var t;
            return this.$add(function(target){
                var self=this;
                if((t=self.nextSibling)!=target){
                    if(t)
                        self.parentNode.insertBefore(target, t);
                    else
                        self.parentNode.appendChild(target);
                }
            },target);
        },
/***
        addToFirst:function(target){
            linb(target).addFirst(this);
            return this;
        },
        addToLast:function(target){
            linb(target).addLast(this);
            return this;
        },
        addToPre:function(target){
            linb(target).addPre(this);
            return this;
        },
        addToNext:function(target){
            linb(target).addNext(this);
            return this;
        },
        //str must include "{*}"
        wrap:function(str){
            var s;
            return this.each(function(o,i){
                o=linb([o]);
                o.outerHTML(str.replace('{*}', o.outerHTML()),false);
            });
        },
***/
        //add to last, and trigger Triggers
        attach:function(target, force){
            var o=this.get(0), ui, t, d, b, k;
            if(target['linb.Profile'])target=target.boxing();
            if(_.isArr(target))target=linb.iBox.pack(target, false);
            if(!target['linb.iBox'])target=target.boxing();

            //ensure to dom first
            ui = target.create();

            //add dom node
            target.each(function(v){
                d=v.domNode || v;
                if(d.style.visibility!='hidden'){
                    b=true;
                    k=d.style.visibility;
                    d.style.visibility='hidden';
                }
                //always add to last
                if(force || d.parentNode!=o)
                    o.appendChild(d);

                if(t=v.renderedTrigger)
                    for(var i=0,l=t.length;i<l;i++)
                        t[i].call(v);
                if(b)
                    d.style.visibility=k;
            });
            return this;
        },

//change
        //flag: false => no remove this from momery(IE)
        replace:function(target, flag){
            var r,v;
            target=linb(target);
            if(v=target.get(0)){
                this.get(0).parentNode.replaceChild(v,this.get(0));
                //for memory $gc
                this.remove(flag);
                r=linb([v]);
                if(target instanceof Array)
                    for(var i=1,l=target.length; i<l; i++)
                        r.addNext(target[i]);

            }
            return r;
        },
        swap:function(target){
            var self=this;
            target=linb(target);
            var t = linb.dom.getMatix().html('*',false);
            self.replace(t,false);
            target.replace(self,false);
            t.replace(target,false);
            linb([document.body]).addFirst(t.empty(false));
            return self;
        },
        //flag : false => remove from dom tree, not free memory
        remove:function(flag){
            var me=arguments.callee,c=me.c||(me.c=document.createElement('div'));
            if(flag===false)
                this.each(function(o,i){
                    if(o.parentNode)o.parentNode.removeChild(o);
                });
            else{
                this.each(function(o){
                    c.appendChild(o);
                });
                c.innerHTML='';
                _.resetRun('dom.$gc', linb.dom.$gc, 300);
            }
            return this;
        },
        //set innerHTML empty
        //flag = false: no gc
        empty:function(flag){
            return this.each(function(o){
                linb([o]).html('',flag);
            });
        },
        //call $gc dir
        gc:function(){
            linb.dom.$gc();
            return this;
        },
        //flag = false: no gc
        html:function(str,flag){
            var s='',t,bak,o=this.get(0);flag=flag!==false;
            if(str!==undefined){
                if(o.nodeType==3)
                    o.nodeValue=str;
                else{
                     if(!(bak=o.firstChild) && str=="")return this;
                     // innerHTML='' in IE, will clear it's childNodes innerHTML
                     if(!flag && linb.browser.ie)while(t=o.firstChild)o.removeChild(t);
                     //clear first
                     if(flag)o.innerHTML='';

                     o.innerHTML=str;
                     // set flag->true will not gc
                     // no original innerHTML will not gc
                     // use resetRun for performance
                     if(flag && bak)
                        _.resetRun('dom.$gc', linb.dom.$gc, 300);
                }
                return this;
            }else
                return (o.nodeType==3)?o.nodeValue:o.innerHTML;
        },
        outerHTML:function(str){
            var self=this, t,s='', o=self.get(0),id=o.id;
            if(str!==undefined){
                //clear ehandler
                if(o.addition&&(t=o.domNode))
                    _.each(o.addition,function(o,i){
                        t[i]=null;
                    });


                if(linb.browser.gek){
                    var n=self.replace(_.str.toDom(str),false);
                    self._nodes[0]=n.get(0);
                }else{
                    var b,r = (b=o.previousSibling)?o.previousSibling:o.parentNode;
                    o.outerHTML=str;
                    if(r)
                        self._nodes[0] = b?r.nextSibling:r.firstChild;
                }

                //avoid inner nodes memory leak
                linb([o]).remove();
                return self;
            }else{
                if(linb.browser.gek){
                    var dom=linb.dom, m = dom.getMatix(), n = dom.getMatix(2), np=n.parent(), p;
                    //has parentNode, need keep node in this way
                    if(p=o.parentNode)self.replace(n, false);
                    //set to box
                    m.addLast(o);
                    //get string
                    s = m.html();
                    //set back
                    if(p)n.replace(o, false);
                    m.empty();
                    np.addFirst(n);
                    return s;
                }else
                    return o.outerHTML;
            }
        },
        text:function(str){
            var s='';
            if(str!==undefined)
                return this.each(function(o){
                    var b=false,m,n=o;
                    while(m=n.childNodes[0]){
                         if(m.nodeType!=1){
                            m.nodeValue = str;
                            b=true;break;
                         }
                         n=m;
                    }
                    if(!b)n.innerHTML = str;
                });
            else{
               var f=function(o){
                  var i,a=o.childNodes,l=a.length,str='';
                  for(i=0;i<l;i++)
                    if(a[i].nodeType!= 8)
                      str += (a[i].nodeType!=1) ? a[i].nodeValue : f(a[i]);

                  return str;
                };
                this.each(function(o){
                    s+=f(o);
                });
                return s;
            }
        },

//chang profile
        /*
        attr('width','0'): set width = 0
        attr('width'): get width
        attr('width',null): try to remove width
        attr({width:3,height:4})
        */
        attr:function(key, value){
            //set one time only
            var self=this, t, me = arguments.callee, map = me.map || (me.map = {
                'class':'className',
                className:'className',
                'for':'htmlFor',
                value: "value",
                disabled: "disabled",
                checked: "checked",
                selected:'selected',
                readonly: "readOnly"
            });
            if(( t = (typeof key != 'string') )|| value !==undefined){
                if(!t){
                     t={};t[key]=value;key=t;
                }
                _.each(key,function(value,key){
                  if(value===null)
                      self.each(function(o){
                          if(map[key])
                            o[map[key]]=null;
                          else if(o.removeAttribute)
                             o.removeAttribute(key);
                          else
                            o[key]=null;
                      });
                  else
                    self.each(function(o){
                        if(map[key])
                            o[map[key]]=value;
                        else{
                            if(o.setAttribute)o.setAttribute(key,value);
                            //try{
                            o[key]=value
                            //}catch(e){}
                        }
                    });

                });
                return self;
            }else{
                var o=self.get(0);
                return map[key] ? o[map[key]] : ((o.getAttribute?o.getAttribute(key):0) || o[key]);
            }
        },
        setPxStyle:function(key, value){
            var f=linb.dom.setPxStyle;
            return this.each(function(o){
                f(o,key,value)
            });
        },
        /*
        format: 'xxxYxx', not 'xxx-yyy'
        not for opacity
        left/top/width/height like, must specify 'px'
        not fire onResize onlocation event
        */
        setStyle:function(key, value){
            return key=='opacity'?this.opacity(value):this.each(function(o){
                if(o.nodeType!=1)return;
                if(typeof key == 'string')
                    o.style[key]=value;
                else
                    for(var i in key){
                        if(i=='opacity')
                            linb([o]).opacity(key[i]);
                        else
                            o.style[i]=key[i];
                    }
            });
        },
        /*
        flag:false or not set for get from <style
        flag:ture for get from css class or other
        return 1px like
        */
        getStyle:function(key, flag){
            var o = this.get(0);
            return o.nodeType!==1?'':key=='opacity'?this.opacity():linb.dom.getStyle(o, key, flag);
        },
        opacity:function(value){
            if(value !==undefined){
                var key;
                value=parseFloat(value)||0;
                value= value >0.9999 ? '' : linb.browser.ie ? "alpha(opacity="+ 100*value +")" : value;
                return this.each(function(o){
                    if(o.nodeType != 1)return;
                    style=o.style;
                    if(linb.browser.ie){
                        key='filter';
                        value = style.filter.replace(/alpha\([^\)]*\)/ig, "") + value;
                    }else
                        key='opacity';
                    style[key]=value;
                });
            }else{
                var node=this._nodes[0];
                if(!node || node.nodeType != 1)return 1;

                var style=node.style;
                if(linb.browser.ie) {
                    value = style.filter?(parseFloat(style.filter.match(/alpha\(opacity=(.*)\)/)[1] )||0)/100:1;
                }else
                    value = style.opacity;
                return value;
            }
        },
        /*
        *IE/opera \r\n will take 2 chars
        *in IE: '/r/n'.lenght is 2, but string.length/range.move/range.select will taks '/r/n' as 1.
        */
        caret:function(begin,end){
            var input =this.get(0), tn=input.tagName, type=typeof begin,ie=linb.browser.ie, pos;
            if(!/^(input|textarea)$/i.test(tn))return this;
            input.focus();
            //set caret
            if(type=='number'){
                if(ie){
					var r = input.createTextRange();
					r.collapse(true);
					r.moveEnd('character', end);
					r.moveStart('character', begin);
					r.select();
                }else
                    input.setSelectionRange(begin, end);
                return this;
            //replace text
            }else if(type=='string'){
                    var r=this.caret(),l=0,m=0,ret,
                    v=input.value;
                    //for IE, minus \r
                    if(ie){
                        l=v.substr(0,r[0]).match(/\r/g);
                        l=(l && l.length) || 0;
                    }
                    //opera will add \r to \n, automatically
                    if(linb.browser.opr){
                        l=begin.match(/\n/g);
                        l=(l && l.length) || 0;
                        m=begin.match(/\r\n/g);
                        m=(m && m.length) || 0;
                        m=l-m;l=0;
                    }
                    input.value=v.substr(0,r[0])+begin+v.substr(r[1],v.length);
                    ret= r[0] - l + m + begin.length;
                    this.caret(ret,ret);
                    return ret;
            //get caret
            }else{
                if(ie){
                    if(tn=='TEXTAREA'){
                         var c= "\x01",
                         sel= document.selection.createRange(),
                         txt=sel.text,
                         l=txt.length,
                         dul=sel.duplicate()
                         ;
                         try{dul.moveToElementText(input)}catch(e){}
                         sel.text=txt+c;
                         len=(dul.text).indexOf(c);
                         sel.moveStart('character',-1);
                         sel.text="";
                         if(len==-1)len=input.value.length;
                         return [len-l,len];
            	    }else{
        				var r = document.selection.createRange(),
        				    b = -r.duplicate().moveStart('character', -100000),
        				    e = b + r.text.length;
        				return[b, e];
            	    }
                //firefox opera safari
                }else
                    return [input.selectionStart, input.selectionEnd];
            }
        },
        //left,top format: "23px"
        show:function(left,top){
            var style,t,auto='auto',v=linb.dom.hide_value;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;
                if( t = (top || (style.top==v && (o._top || auto))))style.top = t;
                if( t = (left || (style.left==v && (o._left || auto))))style.left = t;
                if(t=o._position)if(style.position!=t)style.position=t;
                if(style.visibility!='visible')style.visibility='visible';
                //ie6 bug
                if(linb.browser.ie6){
                    t=style.wordWrap=='normal';
                    _.asyRun(function(){
                        style.wordWrap=t?'break-word':'normal'
                    })
                }
            });
        },
        hide:function(){
            var style,t;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;t=linb([o]);
                o._position = style.position;
                o._top = style.top;
                o._left = style.left;
                if(style.position!='absolute')style.position = 'absolute';
                style.top = style.left = linb.dom.hide_value;
            });
        },
        setRegion:function(hash,flag,force) {
            var self=this, i,t,m,  node=self._nodes[0], dom=linb.dom, f=dom.setPxStyle,
                m={};

            for(var j=0,c=dom.boxArr;i=c[j++];)
                m[i] = ((i in hash) && hash[i]!==null)?f(node,i,hash[i]):false;

            if(flag){
                if(force)m.width=m.height=m.left=m.top=true;
                if(dom.hasHandler(node,'onrewh') && (m.width||m.height))self.onRewh(true, {width:m.width,height:m.height});
                if((dom.hasHandler(node,'onlocation') && m.left||m.top))self.onLocation(true, {left:m.left,top:m.top});
            }
            return self;
        },
        //for quick size
        cssSize:function(size,flag) {
            var self=this, node=self._nodes[0],dom=linb.dom,f=dom.setPxStyle,b1,b2;
           if(size){
                var t;
                b1 = size.width!==null?f(node,'width',size.width):false;
                b2 = size.height!==null?f(node,'height',size.height):false;
                if(flag && (b1||b2) && dom.hasHandler(node,'onrewh'))self.onRewh(true, {width:b1,height:b2});
                return self;
            }else
                return { width :self.W(node,1)||0,  height :self.H(node,1)};
        },
        //for quick move
        cssPos:function(pos, flag){
            var node=this._nodes[0],dom=linb.dom,f=dom.setPxStyle,b1,b2;
            if(pos){
                var t;
                b1 = pos.left!=null?f(node,'left',pos.left):false;
                b2 = pos.top!==null?f(node,'top',pos.top):false;
                if(flag && (b1||b2) && dom.hasHandler(node,'onlocation'))this.onLocation(true, {left:b1,top:b2});
                return this;
            }else{
                f=dom.getStyle;
                return {left :parseInt(f(node, 'left'))||0,  top :parseInt(f(node, 'top'))||0};
            }
        },

        getRegion:function(flag, parent){
            var self=this, pos = flag?self.absPos(null,parent):self.cssPos(),size = self.cssSize();
            return {
                left:pos.left,
                top:pos.top,
                width:size.width,
                height:size.height
            };
        },
/***
        toAbsolute:function(){
            var t,pos;
            return this.each(function(o){
                if((t=linb([o])) &&t.position() != 'absolute'){
                    pos = t.absPos();
                    t
                    .position('absolute')
                    .absPos(pos);
                }
            });
        },
***/
/*
+--------------------------+
|margin                    |
| #----------------------+ |
| |border                | |
| | +------------------+ | |
| | |padding           | | |
| | | +--------------+ | | |
| | | |   content    | | | |

# is the absPos position in jsLinb
*/
        absPos:function (pos,target){
            var r,t,
            browser = linb.browser,
            ns=this,
            node = ns.get(0),
            keepNode=node,
            parent =node.parentNode,
            op=node.offsetParent,
            doc=node.ownerDocument,
            dd=doc.documentElement,
            db=doc.body,
            _d=/^inline|table.*$/i,
            getStyle=linb.dom.getStyle,
            fixed = getStyle(node, "position") == "fixed",

            me=arguments.callee,
            add= me.add || (me.add=function(pos, l, t){
                pos.left += parseInt(l,10)||0;
                pos.top += parseInt(t,10)||0;
            }),
            border=me.border || ( me.border = function(node, pos){
                add(pos, getStyle(node,'borderLeftWidth'), getStyle(node,'borderTopWidth'));
            }),
            TTAG=me.TTAG||(me.TTAG={TABLE:1,TD:1,TH:1}),
            HTAG = me.HTAG ||(me.HTAG={BODY:1,HTML:1}),
            posDiff=me.posDiff ||(me.posDiff=function(o,target){
                var cssPos = o.cssPos(),absPos = o.absPos(null,target);
                return {left :absPos.left-cssPos.left, top :absPos.top-cssPos.top};
            });

            target=target?linb(target).get(0):doc;

            if(pos){
                //all null, return dir
                if(pos.left===null&&pos.top===null)return ns;
                var d = posDiff(ns,target);
                ns.cssPos({left :pos.left===null?null:(pos.left - d.left),  top :pos.top===null?null:(pos.top - d.top)});
                r=ns;
            }else{
                //for IE, firefox3(except document.body)
                if(!(linb.browser.gek && node==document.body) && node.getBoundingClientRect){
                    t = node.getBoundingClientRect();
                    pos = {left :t.left, top :t.top};
                    if(target.nodeType==1)
                        add(pos, -(t=target.getBoundingClientRect()).left+target.scrollLeft, -t.top+target.scrollTop);
                    else
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft)-dd.clientLeft, Math.max(dd.scrollTop,  db.scrollTop)-dd.clientTop);
                }else{
                    pos = {left :0, top :0};
                    add(pos, node.offsetLeft, node.offsetTop );
                    //get offset, stop by target or target.offsetParent
                    while(op && op!=target && op!=target.offsetParent){
                        add(pos, op.offsetLeft, op.offsetTop);
                        if(browser.kde || (browser.gek && !TTAG[op.tagName]))
                            border(op, pos);
                        if ( !fixed && getStyle(op,"position")== "fixed")
                            fixed = true;
                        if(op.tagName!='BODY')
                            keepNode=op.tagName=='BODY'?keepNode:op;
                        op = op.offsetParent;
                    }

                    //get scroll offset, stop by target
                    while (parent && parent.tagName && parent!=target && !HTAG[parent.tagName]){
                        if(!_d.test(getStyle(parent, "display")) )
                            add(pos, -parent.scrollLeft, -parent.scrollTop );
                        if(browser.gek && getStyle(parent,"overflow")!= "visible" )
                            border(parent,pos);
                        parent = parent.parentNode;
                    }
                    if((browser.gek && getStyle(keepNode,"position")!="absolute"))
                        add(pos, -db.offsetLeft, -db.offsetTop);
                    if(fixed)
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft), Math.max(dd.scrollTop,  db.scrollTop));
                }
                r=pos;
            }
            return r;
        },

//class and src
        hasClass:function(str){
            var arr = this.get(0).className.split(/\s+/);
            return _.arr.indexOf(arr,str)!=-1;
        },
        addClass:function(str){
            var arr, t, me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = (t=o.className).split(reg);
                if(_.arr.indexOf(arr,str)==-1)
                    o.className = t + " " +str;
            });
        },
        removeClass:function(str){
            var arr, i,l,a, t, bs=typeof str=='string', me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = o.className.split(reg);
                l=arr.length;
                a=[];
                for(i=0;t=arr[i];i++)
                    if(bs?(t!=str):(!str.test(String(t))))
                        a[a.length]=t;
                if(l!=a.length)o.className=a.join(' ');
            });
        },
        reClass:function(reg,replace){
            var n,r;
            return this.each(function(o){
                r = (n=o.className).replace(reg, replace);
                if(n!=r)o.className=r;
            });
        },
        /*
        value :key word
            if null, clear all tag

        examples:
            icon.gif
            toggleSrc('over')
                icon.over.gif
            toggleSrc('over')
                icon.gif

            icon.over.down.gif
            toggleSrc(null)
                icon.gif

        toggleSrc:function(value,flag){
            return this.each(function(o){
                o=linb([o]);
                var t=o.src(), reg = new RegExp("(\\."+value+")(\\.[\\w]+$)");
                if(flag)t=t.replace(/([\w]+)[\w\.]*(\.[\w]+)$/, "$1$2");
                o.src(value===null
                        ?t.replace(/([\w]+)[\w\.]*(\.[\w]+)$/, "$1$2")
                        :reg.test(t)
                            ?t.replace(reg,'$2')
                            :t.replace(/(\.[\w]+)$/, "."+value+'$1')
                     );
            });
        },
 */
//events:
        /*
        addEvent('onClick',fun,'idforthisclick';)
        addEvent([['onClick',fun,'idforthisclick'],[...]...])

        will
            add onclick to dom
            add onclick to dom attribute
            append fun to linb.cache.dom.id.events.onClick array
            append 'onclick' to linb.cache.dom.id.add array
        */
        addEventHandler:function(name, flag){
            var id,
                c,
                event=linb.event,
                type='on'+event._getEventType(name),
                f=event._eventhandler,
                fs=event.eventhandler,
                fi=event.getId,
                dom=linb.cache.dom;

            return this.each(function(o){
                if((window===o||document===o) && type=="onrewh")
                    type='onresize';
                id=fi(o);
                if(!id)id=o.id=_.id();
                if(flag===false){
                    //for before innerHTML
                    if(o.setAttribute)o.setAttribute(type, fs);
                }else{
                    //if exists
                    if(o[type])return;
                    o[type]=f;
                }
                if(!(c = dom[id])){
                    c = dom[id] = new linb.DomProfile();
                    c.domNode=o;
                    c.domId=id;
                }
                (c.addition || (c.addition={}))[type]=1;
            });
        },
        removeEventHandler:function(name){
            var type='on'+linb.event._getEventType(name);
            return this.each(function(o){
               if(o[type])o[type]=null;
               if(o.getAttribute && o.getAttribute(type))o.removeAttribute(type);
            });
        },
        clearEventHandler:function(){
            return this.each(function(o){
                _.arr.each(linb.event._events,function(s){
                   if(o[s="on"+s])o[s]=null;
                   if(o.getAttribute && o.getAttribute(s))o.removeAttribute(s);
                });
            });
        },
        addEvent:function(name, fun, event_id, index, tagVar){
            var self=this,c,t,id,type,fi=linb.event.getId,dom=linb.cache.dom,event=linb.event;
            if(!(name  instanceof Array))
                name=[[name,fun,event_id]];

            _.arr.each(name,function(o,i){
                name=o[0];fun=o[1];event_id='$'+o[2];
                type=event._getEventType(name);
                if(typeof event_id!='string')
                    event_id="$"+_.id();

                self.addEventHandler(name).each(function(o){
                    id=fi(o);
                    if(!id)id=o.id=_.id();

                    c = dom[id];

                    t = c.events || (c.events = {});
                    c = t[name] || (t[name]=[]);

                    //if no event_id input, clear all, and add a single
                    if(event_id ===undefined){
                        c.length=0;c=t[name]=[];
                        index=-1;
                    }
                    if(tagVar)c.$tagVar=tagVar;
                    c[event_id]=fun;
                    _.arr.removeValue(c,event_id);
                    _.arr.insertAny(c,event_id, index);
                });
            });
            return self;
        },
        /*
        removeEvent('onClick','idforthisclick')
        removeEvent('onClick')
            will remove all onClick in linb.cache.dom.id.events.
        removeEvent('onClick',null,true)
            will remove all onClick/beforeClick/afterClick in linb.cache.dom.id.events.
        */
        removeEvent:function(name, event_id, flag){
            var self=this,c,t,k,id,i,type,fi=linb.event.getId,dom=linb.cache.dom,event=linb.event;
            if(!(name instanceof Array))
                name=[[name,event_id]];

            _.arr.each(name,function(o,i){
                name=o[0];event_id='$'+o[1];
                type=event._getEventType(name);
                self.each(function(o){
                    if(!(id=fi(o)))return;

                    if(!(c=dom[id]))return;
                    if(!(t=c.events))return;
                    if(flag)
                        _.arr.each(event._getEventName(type),function(o){
                            delete t[o];
                        });
                    else{
                        if(typeof event_id == 'string'){
                            if(k=t[name]){
                                if(_.arr.indexOf(k,event_id)!=-1)
                                    _.arr.removeValue(k,event_id);
                                delete k[event_id];
                            }
                        }else
                            delete t[name];
                    }
// for keep widgets events handler
//                    if(_.isEmpty(t) || flag){
//                        o["on"+type]=null;
//                        delete c.addition["on"+type];
//                    }
                });
            });
            return self;
        },
        getEvent:function(name, event_id){
            var id;
            if(!(id=linb.event.getId(this.get(0))))return;

            if(event_id)
                return _.get(linb.cache.dom,[id,'events',name,'$' + event_id]);
            else{
                var r=[],arr = _.get(linb.cache.dom,[id,'events',name]);
                _.arr.each(arr,function(o,i){
                    r[r.length]=[o,arr[o]];
                });
                return r;
            }
        },

        //clearEvent binded to the current
        clearEvent:function(){
            this.clearEventHandler();
            return this.each(function(o){
                var id,c,t;
                if(!(id=linb.event.getId(o)))return;

                if(!(c=linb.cache.dom[id]))return;
                _.filter(c.addition, function(i,v){
                    if(_.str.startWith(v,"on"))return false;
                });
                _.breakO(c.events,2);
                delete c.events;
            });
        },
        /*
        for example:
        name: onResize
        event_id: 'abc'
        fun: resize tigger
        ..
        */
        addObserver:function(name, event_id, index, fun, args, target){
            return this.addEvent(name,
                function(){
                    for(var para = [], i=0, l=arguments.length,n; n=arguments[i];i++)
                        para[para.length]=(args&&args[i])||n;
                    return _.tryF(fun,para, target||this);
                }
            ,event_id, index);
        },
        removeObserver:function(name,event_id){
            return this.removeEvent(name, event_id);
        },
        /*
        can carry parameters into args
        */
        fireEvent:function(name, args){
            var type=linb.event._getEventType(name),
            t,s='on'+type,
            me=arguments.callee,
            f=linb.event._eventhandler,
            f1=me.f1||(me.f1=function(){this.returnValue=false}),
            f2=me.f2||(me.f2=function(){this.cancelBubble=true});

            args= args || {};
            return this.each(function(o){
                //for no standard events, like onDrag
                if(typeof o[s]!='function'){
                    if(!o[s] && !(o.getAttribute && o.getAttribute(s)))
                        return;
                     o[s] = f;
                }

                _.merge(args,{
                    type: type,
                    target: o,
                    button : 1,
                    $e:true,
                    $name:name,
                    preventDefault:f1,
                    stopPropagation:f2
                },'all');

                if('blur'==type || 'focus'==type)
                    //try{
                        o[type].call(o,args);
                    //}catch(e){}
                else
                   o[s].call(o,args);
            });
        },

//functions
        canFocus:function(){
            var me=arguments.callee, map = me.map || (me.map={a:1,input:1,select:1,textarea:1,button:1}),
            node;
            return !!(
                (node = this._nodes[0]) &&
                node.focus &&
                map[node.tagName.toLowerCase()] &&
                linb.dom.getStyle(node,'display')!='none' &&
                linb.dom.getStyle(node,'visibility')!='hidden' &&
                node.offsetWidth>0 &&
                node.offsetHeight>0
            );
        },
        selectable:function(v){
            var me=arguments.callee, f = me.f || (me.f=function(){return false});
             return this.each(function(o){
                if(linb.browser.gek)
                    o.style.MozUserSelect=v?"all":"none"
                else{
                    o.unselectable=v?"off":"on";
                    o.onselectstart=v?null:f;
                }
            })
        },
        activate:function(){
            if(this.canFocus()){
                var node= this.get(0);
                node.focus();
                if(node.select)node.select();
            }
            /*var o=this.get(0);
            if(!this.length() || !o.focus || o.offsetWidth<0 || o.offsetHeight<0)return this;
            try{
                o.focus();if(o.select)o.select()
            }catch(e){}finally{return this}
            */
        },
        focus:function(flag){
            if(flag || this.canFocus())
                this.get(0).focus();
            /*
            var o=this.get(0);
            if(!this.length() || !o.focus || o.offsetWidth<=0 || o.offsetHeight<=0)return this;
            try{o.focus()}catch(e){}finally{return this}
            */
        },
        blur:function(){
            if(this.canFocus())
                this.get(0).blur();
        },
        enable:function(value){
            if(value!==undefined)
                this.disabled(!value);
            else
                return !this.disabled();
            return this;
        },
        inlineBlock:function(flag){
            if(flag){
                if(linb.browser.gek)
                    this.display('-moz-inline-block').display('-moz-inline-box').display('inline-block');
                else
                    this.display('inline-block');
            }else
                this.display('');
            return this;
        },
        topZindex:function(flag){
            //<1000 for css settting
            var i=1000, j=0, k, node = this.get(0), p = node.offsetParent, t, o;
            if(node.nodeType !=1 || !p)return 1;

            t=p.childNodes;
            for(k=0;o=t[k];k++){
                if(o==node || o.nodeType !=1 || o.style.display=='none' || o.style.visibility=='hidden' || o.zIndexIgnore)continue;
                j = parseInt(o.style && o.style.zIndex) || 0 ;
                i=i>j?i:j;
            }
            i++;
            if(i>=linb.dom.top_zIndex)
                linb.dom.top_zIndex =i+1000;

            if(flag)
                 node.style.zIndex = i;
            else{
                j = parseInt(node.style.zIndex) || 0;
                return i>j?i:j;
            }
            return this;
        },
        busy:function(flag){
          var self=this, dom=linb.dom;
          if(dom._busy)return;
          var id=self.id();
          if(dom._cursor[id] ===undefined){
              dom._cursor[id] = _.str(self.cursor());
              //if(!dom.opr)
              self.cursor('wait');
              dom.busy(flag);
          }
          return self;
        },
        free:function(){
          var self=this, dom=linb.dom;
          if(!dom._busy)return;
          var id=self.id();
          if(dom._cursor[id] !==undefined){
              cursor=_.str(dom._cursor[id], 'default');
              //if(!dom.opr)
              self.cursor(cursor);
              delete dom._cursor[id];
          }
          dom.free();
          return self;
        },
        UIAction:function(fun){
          var self = this;
          linb.thread(null,
            [
              function(){self.busy()},
              fun,
              function(){self.free();}
            ]
          ).start();
        },
        /*
        dir:true for next, false for pre
        inn:true for include the inner node
        set:true for give focus
        */
        nextFocus:function(dir, inn, set){
            dir=_.bool(dir,true);
            var self=this.get(0),node = this.$iterator('',dir,inn,function(node){return node!==self && linb([node]).canFocus()});
            if(!node.isEmpty() && set!==false)node.focus();
            return node;
        },

        /*
        args:{
            with:[0,100],
            height:[0,100],
            opacity:[0,1],
            left:[..]
            top:[..]
            backgroundColor:[..]
            scrollTop:[..]
            scrollLeft:[..]
            font-size:[..]
        }
        */
        fx: function(args, onStart, onEnd, time, step, type, id){
            var me=arguments.callee,
            hash = me.lib ||  (me.lib = {
                line:function(x){return x},
                inexp:function(x){return (x==0) ? 0 : Math.pow(2, 10 * (x - 1))},
                outexp:function(x){return (x==1) ? 1 : -Math.pow(2, -10 * x) + 1},
                insine: function(x) { return -1 * Math.cos(x * (Math.PI/2)) + 1; },
                outsine: function(x) { return Math.sin(x * (Math.PI/2)); },
                inoutsine: function(x) { return -1/2 * (Math.cos(Math.PI*x) - 1); }
            }),
            color = me.color || (me.color = function(type, args, step, j){
                var f,fun,value = 0 + (100-0)*hash[type](j/step), from = args[0], to = args[1];

                if(typeof from !='string' || typeof to != 'string')return '#fff';
                if(value<0)
                    return from;
                else if(value>100)
                    return to;

                f=function(str){
                    return (str.charAt(0)!='#')?('#'+str):str;
                };
                from=f(from);to=f(to);

                f=function(str, i, j){
                    return parseInt(str.slice(i,j),16)||0;
                };
                fun=function(o){
                    return {red:f(o,1,3),green:f(o,3,5),blue:f(o,5,7)}
                };
                from = fun(from);to = fun(to);

                f=function(from, to, value,c){
                    var r= from[c]+Math.round((value/100)*(to[c]-from[c]));
                    return (r < 16 ? '0' : '') + r.toString(16)
                };

                return '#' + f(from,to, value, 'red') + f(from,to, value, 'green') + f(from,to, value, 'blue');
            });

            time = time||200;
            step = step||5;
            type = hash[type]!==undefined?type:'line';

            var self=this, threadid=id||_.id(), delay = time/step, i,j=0, value,
            funs=[function(threadid){
                //try{
                   // if(++j > step)throw new Error;
                    if(++j > step){
                        linb.thread(threadid).abort();
                        return false;
                    }
                    _.each(args,function(o,i){
                        if(typeof o == 'function') o(j, step);
                        else{
                            value = String( _.str.endWith(i.toLowerCase(),'color') ? color(type, o, step, j) : (o[0] + (o[1]-o[0])*hash[type](j/step)));
                            (self[i]) ? (self[i](value)) :(self.setStyle(i, value));
                        }
                    });
                //}catch(e){
                //    linb.thread(threadid).abort();
                //    color=hash=null;
               // }
            }];
            return linb.thread(threadid, funs, delay, null, onStart, onEnd ,true);
        },
        /*
        pos: {left:,top:} or domNode
        parent:parent node
        type:1,2,3,4
        */
        popToTop : function(pos, parent, type){
            var region, target = this;
            type = (type || 1).toString();
            parent = linb(parent || document.body);

            //prepare
            target.setStyle({position:'absolute',left:'0', top:'0',visibility:'hidden',display:'block', zIndex:linb.dom.top_zIndex});

            //add to body, avoid parent is display:none.
            parent.attach(target, true);

            if(pos['linb.dom'] || pos.nodeType){
                var node=linb(pos),
                    //base region
                    abspos = node.absPos(null, parent);
                region = {
                    left:abspos.left,
                    top:abspos.top,
                    width:node.offsetWidth(),
                    height:node.offsetHeight()
                };
             }else{
                region = pos.region || {
                    left:pos.left-8,
                    top:pos.top-8,
                    width:16,
                    height:16
                };
            }
            pos={left :0, top :0};

            //window edge
            var t=linb(window), box = {};
            box.left=t.scrollLeft();
            box.top=t.scrollTop();
            box.width =t.width()+box.left;
            box.height =t.height()+box.top;
/*
type:1
    +------------------+ +------------------+
    |        3         | |        4         |
    +--------------+---+ +---+--------------+
    |              |         |              |
    |              |         |              |
    +--------------+---+ +---+--------------+
    |        1         | |        2         |
    +------------------+ +------------------+
type:2
                         +---+              +---+
                         |   |              |   |
+---+--------------+---+ |   +--------------+   |
|   |              |   | | 3 |              | 4 |
| 2 |              | 1 | |   |              |   |
|   +--------------+   | +---+--------------+---+
|   |              |   |
+---+              +---+
type:3
                         +---+              +---+
                         | 3 |              | 4 |
    +--------------+     +---+--------------+---+
    |              |         |              |
    |              |         |              |
+---+--------------+---+     +--------------+
| 2 |              | 1 |
+---+              +---+
type:4
                     +------------------+
                     | 3                |
+--------------+---+ |   +--------------+ +----+--------------+ +--------------+----+
|              |   | |   |              | |    |              | |              |    |
|              |   | |   |              | |    |              | |              |    |
+--------------+   | +---+--------------+ |    +--------------+ +--------------+    |
|                1 |                      |  2                | |               4   |
+------------------+                      +-------------------- +-------------------+
*/

            //target size
            var w = target.offsetWidth(), h = target.offsetHeight(),
                hi,wi;
            switch(type){
                case '1':
                    hi=false;wi=true;
                break;
                case '2':
                    hi=true;wi=false;
                break;
                case '3':
                    hi=false;wi=false;
                break;
                case '4':
                    hi=wi=true;
                break;
            }
            if(hi){
                if(region.top + h < box.height)
                    pos.top=region.top;
                else
                    pos.top=region.top+region.height-h;
            }else{
                if(region.top + region.height + h < box.height)
                    pos.top=region.top + region.height;
                else
                    pos.top=region.top - h;
            }
            if(wi){
                if(region.left + w < box.width)
                    pos.left=region.left;
                else
                    pos.left=region.left+region.width-w;
            }else{
                if(region.left + region.width + w < box.width)
                    pos.left=region.left + region.width;
                else
                    pos.left=region.left - w;
            }

            //over right
            if(pos.left + w>  box.width)pos.left = box.width - w;
            //over left
            if(pos.left < box.left)pos.left = box.left;
            //over bottom
            if(pos.top + h>  box.height)pos.top = box.height - h;
            //over top
            if(pos.top < box.top)pos.top = box.top;
            //show
            target.cssPos(pos).setStyle({visibility:'visible',display:'block'});
            return this;
        },
        //for destroy obj when blur
        setBlurTrigger : function(id, trigger, group){
            var ns=this,
                doc=document,
                sid='$blur_triggers$',
                target = linb(group?group:ns.get()),
                fun=linb.dom._blurTrigger||(linb.dom._blurTrigger=function(p,e){
                    var me=arguments.callee,
                        p=linb.event.getPos(e),
                        arr=me.arr,
                        a=_.copy(arr),
                        b, pos, w, h;
                    //filter first
                    _.arr.each(a,function(i){
                        b=true;
                        if(!(v=arr[i].target))b=false;
                        else
                            v.each(function(o){
                                if(!linb.dom.byId(o.id))
                                    return b=false;
                            });
                        if(!b){
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        };
                    });
                    a=_.copy(arr);
                    _.arr.each(a,function(i){
                        v=arr[i];
                        b=true;
                        v.target.each(function(o){
                            if(o.parentNode && (w=o.offsetWidth) && (h=o.offsetHeight)){
                                pos=linb([o]).absPos();
                                if(p.left>=pos.left && p.top>=pos.top && p.left<=(pos.left+w) && p.top<=(pos.top+h))
                                    return b=false;
                            }
                        });
                        if(b){
                            _.tryF(v.trigger,[],v.target);
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        }else
                            //if the top layer popwnd cant be triggerred, prevent the other layer popwnd trigger
                            return false;
                    },null,true);
                    a.length=0;
                }),
                arr=fun.arr||(fun.arr=[]);
            if(!doc.onmousedown)doc.onmousedown=linb.event._eventhandler;

            //remove this trigger
            if(!trigger){
                _.arr.removeValue(arr,id);
                delete arr[id];
            //double link
            }else
                if(!arr[id]){
                    arr[id]={
                        trigger:trigger,
                        target:target
                    };
                    arr.push(id);
                }
            return this;
        },
        //IE not trigger dimension change, when change height only in overflow=visible.
        ieTrigger : function(flat){
            var self=this;
            _.asyRun(function(){self.setStyle('wordWrap','break-word')});
            _.asyRun(function(){self.setStyle('wordWrap','normal');});
            return this;
        }
    },
    Static:{
        hide_value : '-10000px',
        top_zIndex:10000,

        boxArr:_.toArr('width,height,left,top,right,bottom'),
        _cursor:{},
        setPxStyle:function(node, key, value){
              var style=node.style;
              if(value || value===0){
                value = (String(parseFloat(value))==String(value)) ? (parseInt(value)||0) + "px" : value;
                if((key=='width'||key=='height') && value.charAt(0)=='-')value='0';
                if(style[key]!=value){
                    style[key]=value;
                    return true;
                }
            }return false;
        },

        $gc:function(){
            var i,o,w,cache=linb.cache.dom,bak=[];
            for(i in cache){
                 o=cache[i];
                 if((!o) || (window===o.domNode) || (document===o.domNode))continue;
                 if(!document.getElementById(o.domId)){
                     o.$gc();
                     //clear the cache
                     bak[bak.length]=i;
                     //clear the cache shadow
                     if(o.$domId && o.$domId!=o.domId)
                        bak[bak.length]=o.$domId;
                 }
             }
             for(i=0;i<bak.length;)
                 delete cache[bak[i++]];
             if(linb.browser.ie6)CollectGarbage();
        },
        clean:function(e){
            var t,i,a,
            //can't be e, or opera will crash
            arr = window===e ? [window] :
                    document===e ? [e] :
                    e.constructor == Array ? e :
                    e['linb.dom'] ? e._nodes :
                    e.toDomNodes?e.toDomNodes():
                    typeof e == 'function' ? e.apply(arguments[2],arguments[1]) :
                    typeof e!='string' ? [e] :
                    e.charAt(0)=='{' ? linb.SC(e.slice(1,e.length-1)).getAll().reBoxing()._nodes :
                    [e]
            ;
            //for performance
            //Can't input mix value
            if(arr[0] && !arr[0].nodeType){
                a=[];
                //can't be e, or opera will crash
                for(i=0;i<arr.length;i++)
                    if(t=(typeof (t=arr[i])=='string' ? document.getElementById(t) : (t&&t.domNode) ? t.domNode : t ) || null)
                        a[a.length]=t;
            }else
                a=arr;
            return a;
        },

/***        getElemsByXPath : function(exp, p) {
            var r=[];
            var str = document.evaluate(expression, p || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for(var i=0, length=query.snapshotLength; i < length; i++) r.push(query.snapshotItem(i));
            return r;
        },
***/
        getStyle:function(node, key, flag){
            if(!node.style)return '';

            var value = node.style[key];
            if(!value || flag){
                var me = arguments.callee,t,
                map = me.map || (me.map = {'float':1,'cssFloat':1,'styleFloat':1}),
                cache = me.cache || (me.cache={}),
                key = cache[key] || (cache[key] = key.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()}))
                ;
                if(map[key])
                    key = linb.browser.ie?"styleFloat":"cssFloat";
                //document.defaultView first, for opera 9.0
                value = ((t=document.defaultView) && t.getComputedStyle)?(t=t.getComputedStyle(node,null))?t[key]:'':(node.currentStyle&&node.currentStyle[key]);
/*
                if(linb.browser.opr){
                    var map2 = me.map2 || (me.map2={left:1,top:1,right:1,bottom:1});
                    if(map2[key] && (linb.dom.getStyle(node,'position')=='static'))
                        value = 'auto';
                }
*/
            }
            return value||'';
        },
        /*
        index:
            2: get the second empty temp div
        */
        _matixid:"linb.matix::",
        isMatix:function(id){return id && _.str.startWith(id,this._matixid)},
        getMatix:function(index){
            var i=1,id,o,count=0,me=arguments.callee,m=me.m,doc=document;
            index=index || 1;
            while(1){
                id = this._matixid + i;
                //don't remove this {
                if(o=linb.dom.byId(id)){
                    /*use firstChild for performance*/
                    if(!o.firstChild && ++count == index)
                        return linb([o]);
                }else{
                    if(!m){
                        //no use linb.create,here
                        me.m=m=doc.createElement('div');
                        //m.style.display='none';
                        var style=m.style;
                        style.position='absolute';
                        style.visibility='hidden';
                        style.left=style.top=linb.dom.hide_value;
                    }
                    o=m.cloneNode(false);
                    o.id=id;

                    doc.body.insertBefore(o, doc.body.firstChild);
                    return linb([o]);
                }
                i++;
            }
        },
        //for overwrite
        /*
        arg1:true for show cover, false for hide cover
        arg2:true for show loading img, and this time, if arg1 is string, it will show text under the img
        arg3:true for pre text is kept
        arg4:key for setcover
        */
        setCover:function(arg1,arg2,arg3,arg4){
            // get or create first
            var me=arguments.callee,
            id="linb.temp:cover:",
            id2="linb.temp:message:",
            o1,o2,
            body=linb([document.body]),
            ini=linb.ini;

            if((o1=linb(id)).isEmpty())
                body.addFirst(o1=linb.create('<div id="'+ id +'" style="position:absolute;display:none;left:0;top:0;z-index:0;background-image:url('+ini.path+'bg.gif)">'));
            if((o2=linb(id2)).isEmpty() && arg2)
                body.addFirst(o2=linb.create('<div id="'+id2+'" style="position:absolute;display:none;"><img src="'+ini.path + 'loading.gif" border="0"/><div style="font-size:12px;"></div></div>'));

            //clear
            if(arg1 === false){
                if(typeof arg4=='string')
                    if(typeof me._key =='string' && me._key!=arg4)
                        return;
                if(me.show){
                        o1.setStyle({display:'none',zIndex:'0'});
                        body.cursor("");
                    o2.display('none').last().empty();
                    me.show=false;
                }
            }else{
                if(typeof arg4=='string')me._key=arg4;
                var t = linb([window],false), w=t.scrollWidth(), h=t.scrollHeight();
                if(!me.show){
                    o1.setStyle({ width : w +'px', height : h+'px', display:'block',zIndex:(linb.dom.top_zIndex+200),cursor:'wait'});
                    body.cursor("wait");
                    me.show=true;
                }
                //image and text showed
                if(arg2){
                    var x = t.scrollLeft()+t.width()/2, y = t.scrollTop()+t.height()/2;
                    o2.left(x).top(y).display('block').zIndex(linb.dom.top_zIndex+300);
                    if(typeof arg1=='string')
                        o2.last().get(0).innerHTML = (arg3?o2.html():'') + arg1;
                }
            }
        },

        byId:function(e){
            return  document.getElementById(e);
        },
        //safari not trigger onresize/onposition
        hasHandler:function(node, name){
            return !!(node[name] || (node.getAttribute && node.getAttribute(name)));
        },
        /*
        action: uri
        data:hash{key:value}
        method:'post'(default) or 'get'
        target: uri target: _blank etc.
        */
        submit:function(action, data, method, target, enctype){
            data=_.hash(data);method=_.str(method,'get');action=_.str(action);target=_.str('_blank');
            var _t=[];
            _.each(data,function(o,i){
                _t.push('<textarea name="'+i+'">'+(typeof o=='object'?_.serialize(o):o)+'</textarea>');
            });
            if(!_.isEmpty(data))_t.push('<input type="hidden" name="rnd" value="'+_()+'">');
            var d=_.str.toDom('<form target="'+target+'" action="'+action+'" method="'+method  + (enctype?'" enctype="' +enctype:'') +  '">'+_t.join('')+'</form>');
            linb.dom.getMatix().addLast(d);
            d.get(0).submit();
            d.remove();
        },
        busy:function(flag,key){
            var dom=linb.dom;
            if(flag!==false)
                dom.setCover(true,0,0,key);
            dom._busy=true;
        },
        free:function(key){
           var dom=linb.dom;
           dom.setCover(false,0,0,key);
           dom._busy=false;
        },
        UIAction:function(fun){
          linb.thread(null,
            [
              function(){linb.dom.busy()},
              fun,
              function(){linb.dom.free()}
            ]
          ).start();
        },
        fxProxy:function(from, to, onStart, onEnd, time, step, type, id){
            var args = {}, me=arguments.callee, arr = me.arr || (me.arr=arr=_.toArr('left,top,width,height')),
                node = me.node = (me.node=linb.create("<div style='border:dashed 1px blue;position:absolute;left:-10000px;'></div>"));
            _.arr.each(arr,function(i){
                args[i]=[from[i],to[i]];
            });
            linb(document.body).addLast(node);
            node.zIndex(linb.dom.top_zIndex+10);
            return node.fx(args, onStart, function(){
                node.cssSize({ width :0, height :0}).remove(false);
                _.tryF(onEnd);
            }, time, step, type, id);
        }
    },
    After:function(d){
        var self=this;
       //getter
        _.each({ parent:['y',false], pre:['x',false], next:['x',true], first:['y',true], last:['y',1]},function(o,i){
            self.plugIn(i, function(index){
                if(typeof index=='string'){css=index;index=0;}
                if(index===0)
                    return this;
                else
                    return this.$iterator(o[0], o[1], true, index || 1)
            });
        });

        //readonly profile
        _.arr.each(_.toArr('nodeName,nodeType,tagName,offsetLeft,offsetTop,offsetParent,scrollWidth,scrollHeight'),function(o){
            self.plugIn(o,function(value){
                var t=this.get(0),w=window,d=document;
                if(t==w||t==d){
                    if("scrollWidth"==o||"scrollHeight"==o){
                        var a=d.documentElement,b=d.body;
                        return Math.max(a[o], b[o]);
                    }else
                        t = linb.browser.contentBox ? d.documentElement : d.body;
                }
                return t[o];
            })
        });

        var p='padding',m='margin',b='border',c='client',o='offset',r='real',w='width',h='height',W='Width',H='Height',T='Top',L='Left',t='top',l='left',R='Right',B='Bottom';
        //dimesion
        _.arr.each([   [p+'H',p+T,p+B],
            [p+'W',p+L,p+R],
            [b+'H',b+T+W,b+B+W],
            [b+'W',b+L+W,b+R+W],
            [m+'W',m+L,m+R],
            [m+'H',m+T,m+B]
        ],function(o){
            //use get Style dir
            var node,fun=linb.dom.getStyle;
            self.plugIn(o[0],function(){
                node = this.get(0);
                return (parseInt(fun(node, o[1])) + parseInt(fun(node, o[2]))) || 0;
            })
        });
        /*
        get W/H for

        1:width
        2:clientWidth
        3:offsetWidth
        4:realWidth

        content-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | | |<-css width ->| | | |
        | | |<-  clientWidth ->| | |
        | |<--  offsetWidth   -->| |
        |<--    realWidth       -->|

        border-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | |<-   css width  ->| | |
        | | |<-  clientWidth ->| | |
        | |<--  offsetWidth   -->| |
        |<--    realWidth       -->|
        */

        _.arr.each([['W',w, p+'W', b+'W', m+'W', c+W, o+W],
        ['H',h, p+'H', b+'H', m+'H', c+H, o+H]],function(o){
            self.plugIn(o[0],function(node,index,value){
                var n,r,t,style=node.style,me=arguments.callee,contentBox=linb.browser.contentBox,
                r1=me.r1 || (me.r1=/%$/),
                getStyle=linb.dom.getStyle,
                f=linb.dom.setPxStyle,type=typeof value,t1;
                if(type=='undefined' || type=='boolean'){
                    if(value===true){
                        n=(getStyle(node,'display')=='none');
                        if(n){
                            var temp = linb.dom.getMatix().html('*',false);
                            linb([node]).swap(temp);
                            var b,p,d;
                            b = style.visibility,p = style.position,d = style.display; p=p||'';b=b||'';d=d||'';
                            style.visibility = 'hidden'; style.position ='absolute';style.display = 'block';
                        }
                    }
                    switch(index){
                        case 1:
                            r=getStyle(node,o[1]);
                            if(isNaN(parseInt(r)) || r1.test(r))
                                r = me(node,2) - (contentBox?linb([node])[o[2]]():0);
                            r=parseInt(r)||0;
                            break;
                        case 2:
                            r=node[o[5]];
                            //for ie
                            if(!r)
                                r=node[o[6]]-linb([node])[o[3]]();
                            break;
                        case 3:
                            //for in firefox, offsetHeight/Width's bad performance
                            //if(node._bp)
                            //    r=node['_'+o[6]];
                            //else{
                            //    t1=_();
                                r=node[o[6]];
                            //    if(_()-t1>60){
                            //        node['_'+o[6]]=r;
                            //        node._bp=1;
                            //    }
                            //}
                            if(!r)
                                //get from css setting before css applied
                                r=me(node,1)+(contentBox?(t=linb([node]))[o[2]]():0)+t[o[3]]();
                            break;
                        case 4:
                            r=me(node,3);
                            r+=linb([node])[o[4]]();
                            break;
                    }
                    if(n){
                        style.display = d; style.position = p;style.visibility = b;
                        linb([node]).swap(temp);
                        temp.empty(false);
                    }
                    return parseInt(r)||0;
                }else{
                    switch(index){
                        case 1:
                            if(f(node, o[1], value))
                                if(linb.dom.hasHandler(node,'onrewh')){
                                    var args={};args[o[1]]=1;
                                    linb([node]).onRewh(true, args);
                                }
                            break;
                        case 2:
                            me(node, 1, value - (contentBox?linb([node])[o[2]]():0));
                            break;
                        case 3:
                            //back value for offsetHeight/offsetWidth slowly
                            me(node, 1, value - (t=linb([node]))[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                        case 4:
                            me(node, 1, value - (t=linb([node]))[o[4]]() - t[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                    }
                    //if(node._bp)
                    //    node['_'+o[6]]=null;
                }
            })
        });
        _.arr.each([[c+W,'W',2],[o+W,'W',3],[r+W,'W',4],
         [c+H,'H',2],[o+H,'H',3],[r+H,'H',4]],function(o){
            self.plugIn(o[0],function(value){
                var type=typeof value;
                if(type=='undefined' || type=='boolean')
                    return this[o[1]](this.get(0), o[2]);
                else
                    return this.each(function(v){
                        this[o[1]](v, o[2],value);
                    });
            })
        });
        _.arr.each([[l+'By',l, o+L],[t+'By',t,o+T],[w+'By',w,o+W],[h+'By',h,o+H]],function(o){
            self.plugIn(o[0],function(value,flag){
                if(value===0)return this;
                var t,m,v,args,k=o[1];
                return this.each(function(node){
                    t=node.style;m=t[k];
                    if(m=='auto')m=this[o[2]](node);
                    v = (parseInt(m) || 0) + value;
                    if(k=='width'||k=='height')v=v>0?v:0;
                    t[k] =  v + 'px';
                    if(flag){
                        args={};args[k]=1;
                        if((k=='left' || k=='top')&& linb.dom.hasHandler(node,'onlocation'))
                            linb([node]).onLocation(true, args);
                        if((k=='width' || k=='height')&& linb.dom.hasHandler(node,'onrewh')){
                            linb([node]).onRewh(true, args);
                        }
                    }
                },this)
            });
        });

        self.addCustomEvent=function(o){
            if(!(o instanceof Array))o=[o];
            var self=this,f;
            _.arr.each(o,function(o){
                f=function(fun, event_id, flag, tagVar){
                    if(typeof fun  == 'function')
                        return this.addEvent(o, fun, event_id, flag, tagVar);
                    else if(fun===null)
                        return this.removeEvent(o, event_id, flag);
                    var args = arguments[1] || {};
                    args.$all = (arguments[0]===true);
                    return this.fireEvent(o, args)
                };
                f.$event$=1;
                self.plugIn(o, f)
            });
            return self;
        };
        //changable profile
        _.arr.each(_.toArr('disabled,readonly,checked,className,value,title,name,href,src'),function(o){
            self.plugIn(o,function(value){
                return this.attr(o,value);
            })
        });
        _.arr.each(_.toArr('scrollLeft,scrollTop,tabIndex'),function(o){
            self.plugIn(o,function(value,flag){
                if(value !==undefined)
                    return this.each(function(v){
                        v[o]=value;
                    });
                else{
                    var v=this.get(0);
                    if(v===window || v===document){
                        var a=document.documentElement,b=document.body;
                        if("scrollTop"==o)return window.pageYOffset || Math.max(a[o], b[o]);
                        if("scrollLeft"==o)return window.pageXOffset || Math.max(a[o], b[o]);
                    }
                    return v[o];
                }
            })
        });
        //css shortcut
        _.arr.each(_.toArr('cursor,backgroundColor,display,overflow,color,background,position,zIndex,visibility,border'),function(o){
            self.plugIn(o,function(value){
                if(value===undefined){
                    var node=this._nodes[0];
                    if(!node || node.nodeType!=1)return;
                    var r= linb.dom.getStyle(node, o);
                if('zIndex'==o)r=parseInt(r)||0;
                    return r;
                }else
                    return this.setStyle(o, value);
            });
        });
        _.arr.each(self.boxArr,function(o){
            self.plugIn(o,function(value){
                var self=this, node=self._nodes[0],b=linb.browser,type=typeof value,doc=document,t;
                if(!node || node.nodeType==3)return;
                if(type=='undefined'||type=='boolean'){
                    if((o=='width' && (t='Width'))||(o=='height' && (t='Height'))){
                        if(doc===node)return Math.max( doc.body['scroll'+t], doc.body['offset'+t], doc.documentElement['scroll'+t], doc.documentElement['offset'+t]);
                        if(window===node)return b.opr?doc.body['client'+t]:b.kde?window['inner'+t]:(linb.browser.contentBox && doc.documentElement['client'+t]) ||doc.body['client'+t];
                    }
                    //give shortcut
                    if(o=='width')value=parseInt(node.style.width)||self.W(node,1,value);
                    else if(o=='height')value=parseInt(node.style.height)||self.H(node,1,value);
                    else
                        value = linb.dom.getStyle(node, o);
                    return value=='auto'?value:(parseInt(value)||0);
                }else{
                    var f=linb.dom.setPxStyle,t,a;
                    return self.each(function(v){
                        if(v.nodeType!=1)return;
                        switch(o){
                            case 'right':
                            case 'bottom':
                                f(v, o, value);
                                break;
                            default:
                                if(v.style[o]!==value){
                                    if(o=='width')self.W(v,1,value);
                                    else if(o=='height')self.H(v,1,value);
                                    else{
                                        if(f(v, o, value))
                                            if((o=='top' || o=='left') && linb.dom.hasHandler(node,'onlocation')){
                                                a={};a[o]=1;
                                                linb([v]).onLocation(true, a);
                                            }
                                    }
                                }
                        }
                    });
                }
            });
        });
        // for linb.dom event
        _.arr.each(linb.event._events,function(o){
            _.arr.each(linb.event._getEventName(o),function(o){
                self.addCustomEvent(o);
            })
        });
    },
    Initialize:function(){
        //for hot keys
        linb([document]).onKeydown(function(p,e){
            var event=linb.event,set;
            event.currentKey=event.getKey(e);
            if(event.currentKey){
                set = linb.cache.hookKey[event.currentKey.join(":")];
                //if hot function return false, stop bubble
                if(set && (_.tryF(set[0],set[1],set[2])===false)){
                    event.stopBubble(e);
                    return false;
                }
            }
            return true;
        },"document")
        .onKeyup(function(p,e){
            linb.event.currentKey=null;
        },"document");

        //for clear memory
        linb([window]).afterUnload(function(){
            //unlink link 'App'
            linb.SC.$gc();
            linb.thread.$gc();
            linb([window, document]).clearEvent();
            linb([document.body]).empty();
            linb.dom.$gc();
            _.breakO([linb,Class,_],3);
            window.Class=window.linb=window._=undefined;
        },"window",-1);
    }
});