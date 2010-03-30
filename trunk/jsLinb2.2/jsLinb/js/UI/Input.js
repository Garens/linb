Class("linb.UI.Input", ["linb.UI.Widget","linb.absValue"] ,{
    Instance:{
        _setTB:function(type){
            var profile=this.get(0), p=profile.properties, o, t;
            if(!profile.host|| !p.tipsBinder)return;

            t = profile.tips = profile.tips||p.tips||'';
            o = linb.getObject(p.tipsBinder)|| ((o=profile.host[p.tipsBinder]) &&o.get(0) );
            if(o && (o.key=='linb.UI.Div'||o.key=='linb.UI.SLabel')){
                if(o.renderId){
                    //use innerHTML, not setHtml
                    o.getRootNode().innerHTML =  t.charAt(0)=='$'?linb.wrapRes(t):t;
                    o.getRoot().css('color', type==1?'gray':type==2?'red':'#000');
                }
            }
        },
        activate:function(){
            var profile = this.get(0);
            if(profile.renderId){
                var node=profile.getSubNode('INPUT').get(0);
                node.focus();
                //DOM node's readOnly
                if(!node.readOnly && node.select)node.select();
            }
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.isDefined(value))value='';
            return this.each(function(profile){
                profile.getSubNode('INPUT').attr('value',value+"");
            });
        },
        _getCtrlValue:function(){
            return this.getSubNode('INPUT').attr('value');
        },
        _setDirtyMark:function(){
            return this.each(function(profile){
                if(!profile.properties.dirtyMark)return;
                var properties = profile.properties,
                    o=profile.getSubNode('INPUT'),
                    cls=profile.box,
                    box=profile.boxing(),
                    d=linb.UI.$css_tag_dirty,
                    v=linb.UI.$css_tag_invalid,
                    flag=properties.value !== properties.$UIvalue;

                if(profile.inValid==2){
                    //display tips
                    profile.tips = properties.tipsErr || properties.tips;
                    if(properties.mask){
                        _.asyRun(function(){
                            box.setUIValue(o.get(0).value=profile.$Mask)
                        });
                        profile.inValid=1;
                        flag=false;
                    }
                }else{
                    if(profile.inValid==1)
                        profile.tips = properties.tips;
                    else{
                        profile.tips = properties.tipsOK || properties.tips;
                    }
                }
                if(profile._dirtyFlag==flag)return;
                //dirty mark
                if(profile.beforeDirtyMark && false===box.beforeDirtyMark(profile,flag)){}
                else{
                    profile._dirtyFlag=flag;
                    if(flag)
                        o.addClass(d);
                    else
                        o.removeClass(d);
                }
                
                //format statux
                if(profile.beforeFormatMark && false===box.beforeFormatMark(profile, profile.inValid==2)){}
                else{
                    var err = profile.getSubNode('ERROR');
                    if(profile.inValid==2){
                        o.addClass(v);
                        err.css('display','block');
                    }else{
                        o.removeClass(v);
                        err.css('display','none');
                    }
                }
                box._setTB(profile.inValid);
            });
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            style:'',
            BOX:{
                WRAP:{
                    tagName : 'div',
                    INPUT:{
                        tagName : 'input',
                        type : '{_type}',
                        tabindex:'{tabindex}',
                        cursor:'{cursor}',
                        style:'{_css}'
                    }
                }
            }
        },'all');
        t.FRAME.ERROR = {};
        this.setTemplate(t)
    },
    Static:{
        _maskMap:{
            '~':'[+-]',
    		'1':'[0-9]',
    		'a':'[A-Za-z]',
    		'*':'[A-Za-z0-9]'
        },
        _maskSpace:'_',
        Appearances:{
            KEY:{
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                position:'relative'
            },
            BORDER:{
                'line-height':'0px',
                'font-size':'0px'
            },
            WRAP:{
                left:0,
                //for firefox bug: cursor not show
                position:'absolute',
                overflow:linb.browser.gek?'auto':'hidden'
            },
            BOX:{
                left:0,
                top:0,
                position:'absolute',
                background:linb.UI.$bg('inputbg.gif', '#fff repeat-x',"Input"),
                'border':'solid 1px #B5B8C8',
                'z-index':10
            },
            "KEY-readonly input":{
                $order:2,
                color:'#909090'
            },
            "KEY-readonly BOX":{
                $order:2,
                background:'none'
            },
            'BOX-focus, BOX-mouseover':{
                'border-color':'#7EADD9'
            },
            INPUT:{
               //don't change it in custom class or style
               'padding-top':'2px',
               'padding-left':'2px',

               "background-color":"transparent",
               "background-image":linb.browser.ie?'url(.)':null,
               border:0,
               margin:0,

               'margin-top':linb.browser.ie?'-1px':null,
               'font-size':'12px',
               position:'relative',
               //give default size
               width:'102px',

               overflow:'auto',
               'overflow-y':'auto',
               'overflow-x':'hidden'
            },
            ERROR:{
                width:'16px',
                height:'16px',
                position:'absolute',
                right:'2px',
                top:'2px',
                display:'none',
                'font-size':0,
                background: linb.UI.$bg('icons.gif', 'no-repeat left -244px', true),
                'z-index':'50'
            },
//border<<<
            '.setting-linb-input':{
                'border-style':'solid',
                'border-top-width':'1px',
                'border-bottom-width':'1px',
                'border-left-width':'1px',
                'border-right-width':'1px'
            },
            'KEY-b-t':{
                height:'2px',
                top:'-1px',
                background: linb.UI.$bg('vertical.gif', 'repeat-x left top','Input')
            },
            'KEY-b-b':{
                height:'2px',
                bottom:'-1px',
                background: linb.UI.$bg('vertical.gif', 'repeat-x left bottom','Input')
            },
            'BOX-focus KEY-b-t, BOX-focus KEY-b-b, BOX-mouseover KEY-b-t, BOX-mouseover KEY-b-b':{
                $order:1,
                'background-image':linb.UI.$bg('vertical_mouseover.gif','','Input')
            },
            'KEY-b-l':{
                width:'2px',
                left:'-1px',
                background: linb.UI.$bg('horizontal.gif', 'repeat-y left top','Input')
            },
            'KEY-b-r':{
               width:'2px',
               right:'-1px',
               background: linb.UI.$bg('horizontal.gif', 'repeat-y right top','Input')
            },
            'BOX-focus KEY-b-l, BOX-focus KEY-b-r, BOX-mouseover KEY-b-l, BOX-mouseover KEY-b-r':{
                $order:1,
                'background-image': linb.UI.$bg('horizontal_mouseover.gif','','Input')
            },
            'KEY-b-lt':{
                width:'2px',
                height:'2px',
               left:'-1px',
               top:'-1px',
                background: linb.UI.$bg('corner.gif', 'no-repeat left top','Input')
            },
            'KEY-b-rt':{
               width:'2px',
               height:'2px',
               right:'-1px',
               top:'-1px',
               background: linb.UI.$bg('corner.gif', 'no-repeat right top','Input')
            },
            'KEY-b-rb':{
                width:'2px',
                height:'2px',
                right:'-1px',
                bottom:'-1px',
                background: linb.UI.$bg('corner.gif', 'no-repeat right bottom','Input')
            },
            'KEY-b-lb':{
                width:'2px',
                height:'2px',
                left:'-1px',
                bottom:'-1px',
                background: linb.UI.$bg('corner.gif', 'no-repeat left bottom','Input')
            },
            'BOX-focus KEY-b-lt, BOX-focus KEY-b-rt, BOX-focus KEY-b-rb, BOX-focus KEY-b-lb, BOX-mouseover KEY-b-lt, BOX-mouseover KEY-b-rt, BOX-mouseover KEY-b-rb, BOX-mouseover KEY-b-lb':{
                $order:1,
                'background-image': linb.UI.$bg('corner_mouseover.gif','','Input')
            }
//border>>>
        },
        Behaviors:{
            HoverEffected:{BOX:['BOX']},
            NavKeys:{INPUT:1},
            INPUT:{
                onChange:function(profile, e, src){
                    var p=profile.properties,b=profile.box,
                        o=profile.inValid,
                        value=linb.use(src).get(0).value;
                    // trigger events
                    profile.boxing().setUIValue(value);
                    // input/textarea is special, ctrl value will be set before the $UIvalue
                    p.$UIvalue=value;
                    if(o!==profile.inValid) if(profile.renderId)profile.boxing()._setDirtyMark();

                    b._asyCheck(profile);
                },
                //if properties.mask exists, onHotKeyxxx wont be tigger any more
                onKeydown:function(profile, e, src){
                   var p=profile.properties,b=profile.box,
                        m=p.multiLines,
                        evt=linb.Event,
                        k=evt.getKey(e);
                    if(p.disabled || p.readonly)return;

                    //fire onchange first
                    if(k[0]=='enter'&& (!m||k[3]))
                        linb.use(src).onChange();

                    if(k[0].length>1)
                        profile.$keyD=k[0];

                    b._asyCheck(profile);

                    if(p.mask){
                        if(k[0].length>1)profile.$ignore=true;
                        else delete profile.$ignore;
                        switch(k[0]){
                            case 'backspace':
                                b._changeMask(profile,linb.use(src).get(0),'',false);
                                return false;
                            case 'delete':
                                b._changeMask(profile,linb.use(src).get(0),'');
                                return false;
                        }
                    }
                },
                onKeypress:function(profile, e, src){
                    var p=profile.properties,
                    b=profile.box,
                    cls=profile.box,
                    map=cls._maskMap,
                    k=linb.Event.getKey(e),t,
                    caret=linb.use(src).caret();
                    
                    if(profile.$keyD)
                        k[0]=profile.$keyD;
                    delete profile.$keyD;

                    if(profile.beforeKeypress && false===profile.boxing().beforeKeypress(profile,caret, k[0],k[1],k[2],k[3],e,src))
                        return false;
                    t=profile.CF.beforeKeypress||profile.$beforeKeypress;
                    if(t && false===t(profile,caret,k[0],k[1],k[2],k[3],e,src))
                        return false;

                    b._asyCheck(profile);

                    if(p.mask){
                        if(profile.$ignore){
                            delete profile.$ignore;
                            return true;
                        }
                        if(k[1]||k[3])return true;

                        cls._changeMask(profile,linb.use(src).get(0),k[0],true);
                        return false;
                    }
                },
                onKeyup:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    if(p.dynCheck){
                        var value=linb.use(src).get(0).value;
                        profile.box._checkValid(profile, value);
                        profile.boxing()._setDirtyMark();
                    }
                    b._asyCheck(profile);
                },
                onFocus:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    if(p.disabled)return false;
                    if(profile.onFocus)profile.boxing().onFocus(profile);
                    profile.getSubNode('BORDER').tagClass('-focus');
                    //if no value, add mask
                    if(p.mask){
                        var value=linb.use(src).get(0).value;
                        if(!value)
                            _.asyRun(function(){
                                profile.boxing().setUIValue(value=profile.$Mask);
                                b._setCaret(profile,linb.use(src).get(0))
                            });
                    }
                    //show tips color
                    profile.boxing()._setTB(3);

                    b._asyCheck(profile);
                },
                onBlur:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    if(p.disabled)return false;
                    if(profile.onBlur)profile.boxing().onBlur(profile);
                    profile.getSubNode('BORDER').tagClass('-focus',false);
                    var value=linb.use(src).get(0).value;
                    //onblur check it
                    if(p.$UIvalue==value)
                        profile.box._checkValid(profile, value);

                    profile.boxing()._setDirtyMark();

                    b._asyCheck(profile);
                }
            }
        },
        DataModel:{
            _customBorder:'BOX',
            border:false,

            tipsErr:'',
            tipsOK:'',

            dynCheck:false,
            valueFormat:{
                helpinput:[
                    {caption : 'required', id: "[^.*]"},
                    {caption : 'email',id:"^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w\\.-]{2,4}$"},
                    {caption : 'charOnly',id:"^[a-zA-Z]*$"},
                    {caption : 'words',id:"^[\\w ]*$"},
                    {caption : 'integer',id:"^-?\\d\\d*$"},
                    {caption : 'positiveInteger',id:"^\\d\\d*$"},
                    {caption : 'number',id:"^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)"},
                    {caption : 'filepath',id:"([\\/]?[\\w_]+)+\\.\\w{1,9}$"},
                    {caption : 'URL', id:"^(http|https|ftp)\\:\\/\\/[\\w\\-\\_\\.]+[\\w\\-\\_](:[\\w]*)?\\/?([\\w\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$"},
                    {caption : 'color',id:"^\\#[0-9A-Fa-f]{6}$"},
                    {caption : "HH:MM", id:"^\(\([0-1][0-9]\)|\([2][0-3])\)\:\([0-5][0-9]\)$"},
                    {caption : "HH:MM:SS", id:"^\(\([0-1][0-9]\)|\([2][0-3])\)\:\([0-5][0-9]\)\\:\([0-5][0-9]\)$"},
                    {caption : "YYYY-MM-DD",id:"^\([0-9]{4}\)\\-\(\([0][0-9]\)|\([1][0-2]\)\)\\-\([0-3][0-9]\)$"},
                    {caption : "DD/MM/YYYY",id:"^\(\([0-2][0-9]\)|\([3][0-1]\)\)\/\(\([0][0-9]\)|\([1][0-2]\)\)\/\([0-9]{4}\)$"}
                ]
            },
            mask:{
                action:function(value){
                    var ns=this,
                        b=ns.box;
                    if(value){
                        ns.$MaskFormat=function(ns, v){
                            var m=ns._maskMap,a=[],r=/[A-Za-z0-9]/;
                            _.arr.each(v.split(''),function(o,i){
                                a.push(m[o]||(r.test(o)?"":"\\")+o)
                            });
                            return '^'+a.join('')+'$';
                        }(b, value);
                        ns.$Mask = function(ns, v){
                            var m=ns._maskMap,a=[],s=ns._maskSpace;
                            _.arr.each(v.split(''),function(o,i){
                                a.push(m[o]?s:o);
                            });
                            return  a.join('');
                        }(b,value);

                        //visibility mask string
                        ns.boxing()._setCtrlValue(ns.$Mask);
                   }else{
                        delete ns.$MaskFormat;
                        delete ns.$Mask;
                   }
                }
            },
            value:'',
            width:120,
            height:22,
            disabled:{
                ini:false,
                action: function(v){
                    var i=this.getSubNode('INPUT');
                    if(v)
                        i.addClass('ui-inputdisabled');
                    else
                        i.removeClass('ui-inputdisabled');
                    if((""+i.get(0).type).toLowerCase()!='button')
                        i.attr('disabled',v);
                }
            },
            readonly:{
                ini:false,
                action: function(v){
                    var n=this.getSubNode('INPUT'),
                        cls=this.getClass('KEY','-readonly');
                    n.attr('readonly',v).css('cursor',v?'pointer':'');
                    
                    if(v)this.getRoot().addClass(cls);
                    else this.getRoot().removeClass(cls);
                }
            },
            type:{
                ini:'text',
                listbox:['text','password'],
                action: function(value){
                    this.getSubNode('INPUT').attr('type',value);
                }
            },
            multiLines:{
                ini:false,
                action: function(value){
                    this.boxing().refresh();
                }
            },
            tipsBinder:{
                ini:'',
                set:function(value){
                    if(value['linb.UIProfile'])
                        value=value.$linbid;
                    if(value['linb.UI'] && (value=value.get(0)))
                        value=value.$linbid;
                    this.properties.tipsBinder = value +'';
                }
            }
        },
        EventHandlers:{
            onFocus:function(profile){},
            onBlur:function(profile){},
            beforeFormatCheck:function(profile, value){},
            beforeFormatMark:function(profile, formatErr){},
            beforeKeypress:function(profile,caret,kb,ctrl,shift,alt,e,src){}
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            d.cursor = d.readonly?'pointer':'';
            d._type = d.type || '';
            if(linb.browser.kde)
                d._css='resize:none;';
            return d;
        },
        _dynamicTemplate:function(profile){
            var properties = profile.properties,t,
                hash = profile._exhash = "$" +'multiLines:'+properties.multiLines,
                template = profile.box.getTemplate(hash);

            properties.$UIvalue = properties.value;

            // set template dynamic
            if(!template){
                template = _.clone(profile.box.getTemplate());
                if(properties.multiLines){
                    t=template.FRAME.BORDER.BOX.WRAP.INPUT;
                    t.tagName='textarea';
                    delete t.type;
                }

                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        _ensureValue:function(profile, value){
            // ensure return string
            return ""+(_.isSet(value)?value:"");
        },
        RenderTrigger:function(){
            var ns=this,p=ns.properties;
            _.asyRun(function(){
                ns.boxing()._setTB(1);
            });
            ns.getSubNode('WRAP').$firfox2();
            if(p.readonly)
                ns.boxing().setReadonly(true,true);
            if(p.tipsBinder)
                ns.boxing().setTipsBinder(p.tipsBinder,true);
            //add event for cut/paste text
            var ie=linb.browser.ie,
                src=ns.getSubNode('INPUT').get(0),
                b=ns.box,
                f=function(o){
                    if(ie && ('propertyName' in o) && o.propertyName!='value')return;
                    b._asyCheck(ns);
                };
            if(ie){
                src.attachEvent("onpropertychange",f);
                src.attachEvent("ondrop",f);
                ns.$ondestory=function(){
                    var ns=this,
                        src=ns.getSubNode('INPUT').get(0);
                    src.detachEvent("onpropertychange",f);
                    src.detachEvent("ondrop",f);
                    src=null;
                }
            }else{
                src.addEventListener("input",f,false);
                src.addEventListener("drop",f,false);
                //Firefox earlier than version 3.5
                if(linb.browser.gek)
                    src.addEventListener("dragdrop",f,false);

                ns.$ondestory=function(){
                    var ns=this,
                        src=ns.getSubNode('INPUT').get(0);
                    src.removeEventListener("input",f,false);
                    src.removeEventListener("drop",f,false);
                    if(linb.browser.gek)
                        src.removeEventListener("dragdrop",f,false);
                    src=null;
                }
            }
            src=null;
        },
        LayoutTrigger:function(){
            var p = this.properties;
            if(p.mask)this.boxing().setMask(p.mask,true);
        },
    //v=value.substr(0,caret);
    //i=v.lastIndexOf(ms);

        _changeMask:function(profile,src,v,dir){
            var ns=this,
                p=profile.properties,
                map=ns._maskMap,
                ms=ns._maskSpace,
                maskTxt=p.mask,
                maskStr = profile.$Mask,
                input = linb(src),
                caret = input.caret();
            //for backspace
            if(dir===false && caret[0]==caret[1] && caret[0]>0)
                input.caret(caret[0]-1,caret[0]);

            //for delete
            if(dir===undefined && caret[0]==caret[1])
                input.caret(caret[0],caret[0]+1);

            //for caret is from a fix char, nav to the next 'input allow' char
            if(dir===true){
                if(maskStr.charAt(caret[0])!=ms){
                    var from = caret[0] + maskStr.substr(caret[0],maskStr.length).indexOf(ms);
                    input.caret(from,Math.max(caret[1],from))
                }
            }

            var caret = input.caret(),
                value=src.value,
                reg = ns._maskMap[p.mask.charAt(caret[0])],
                i,t;
            if(reg && new RegExp('^'+reg+'$').test(v) || v==''){
                t=value;
                //if select some text
                if(caret[0]!=caret[1])
                    t=t.substr(0,caret[0]) + maskStr.substr(caret[0],caret[1]-caret[0]) + t.substr(caret[1],t.length-caret[1]);
                //if any char input
                if(v)
                    t=t.substr(0,caret[0])+v+t.substr(caret[0]+1,t.length-caret[0]-1);

                //get corret string according to maskTxt
                var a=[];
                _.arr.each(maskTxt.split(''),function(o,i){
                    a.push( (new RegExp('^'+(map[o]?map[o]:'\\'+o)+'$').test(t.charAt(i))) ? t.charAt(i) : maskStr.charAt(i))
                });

                //if input visible char
                if(dir===true){
                    v=maskStr.substr(caret[0]+1,value.length-caret[0]-1);
                    i=v.indexOf(ms);
                    i=caret[0] + (i==-1?0:i) + 1;
                }else
                    i=caret[0];
                //in opera, delete/backspace cant be stopbubbled
                //add a dummy maskSpace
                if(linb.browser.opr){
                    //delete
                    if(dir===undefined)
                        _.arr.insertAny(a,ms,i);
                    //backspace
                    if(dir===false)
                        _.arr.insertAny(a,ms,i++);
                }
                profile.boxing().setUIValue(src.value=a.join(''));
                ns._setCaret(profile,src,i);
            }

        },
        _setCaret:function(profile, src, pos){
            if(profile.properties.mask){
                if(typeof pos !='number')
                    pos=src.value.indexOf(this._maskSpace);
                linb(src).caret(pos,pos);
            }
        },
        //check valid manually
        _checkValid:function(profile, value){
            var p=profile.properties,
                vf1 = (p.mask&&profile.$MaskFormat) ,
                vf2 = p.valueFormat || profile.$valueFormat;
            if( (profile.beforeFormatCheck && (profile.boxing().beforeFormatCheck(profile, value)===false)) ||
                (vf1 && typeof vf1=='string' && !(new RegExp(vf1)).test((value===0?'0':value)||'')) ||
                (vf2 && typeof vf2=='string' && !(new RegExp(vf2)).test((value===0?'0':value)||''))
            ){
                profile.inValid=2;
                return false;
            }{
                profile.inValid=3;
                return true;
            }
        },
        _asyCheck:function(profile){
            _.resetRun(profile.$linbid+":asycheck",function(){
                if(!profile.renderId)return;

                var input=profile.getSubNode("INPUT"),
                    src=input.get(0);
                if(!src)return;

                //for onchange event
                if(profile.properties.dynCheck)
                    profile.boxing().setUIValue(src.value);

                //for mask
                if(profile.properties.mask){
                    if(src.value.length != profile.$Mask.length)
                        profile.box._changeMask(profile,src,'',true);
                }
            });
        },
        _onresize:function(profile,width,height){
                var $hborder=1, $vborder=1,
                    toff=linb.UI.$getCSSValue('linb-input-input','paddingTop'),
                    loff=linb.UI.$getCSSValue('linb-input-input','paddingTop');

                var t = profile.properties,
                    o = profile.getSubNode('BOX'),
                    v1=profile.getSubNode('INPUT'),
                    region,
                    ww=width,
                    hh=height,
                    left=Math.max(0, (t.$b_lw||0)-$hborder),
                    top=Math.max(0, (t.$b_tw||0)-$vborder);
                if(null!==ww){
                    ww -= Math.max($hborder*2, (t.$b_lw||0)+(t.$b_rw||0));
                    /*for ie6 bug*/
                    /*for example, if single number, 100% width will add 1*/
                    /*for example, if single number, attached shadow will overlap*/
                    if(linb.browser.ie6)ww=(parseInt(ww/2))*2;
                }
                if(null!==hh){
                    hh -=Math.max($vborder*2, (t.$b_lw||0) + (t.$b_rw||0));

                    if(linb.browser.ie6)hh=(parseInt(hh/2))*2;
                    /*for ie6 bug*/
                    if(linb.browser.ie6&&null===width)o.ieRemedy();
                }
                region={left:left,top:top,width:ww,height:hh};
                o.cssRegion(region);
                if(ww||hh)
                    v1.cssSize({width:ww?(ww-loff):null,height:hh?(hh-toff):null});

                /*for ie6 bug*/
                if((profile.$border||profile.$shadow||profile.$resizer) && linb.browser.ie)o.ieRemedy();
        }
    }
});