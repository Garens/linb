Class('UIDesigner', 'linb.Com',{
    Instance:{
        $classEditor:null,
        $pageviewType:'linb.UI.Tabs',
        $firstView:"design",
        $dftCodePath:'template/index.js',

        $fetchedCode:'',
        $iniCode:'',

        $url:'',

        $dirty:false,

        onDestroy:function(){
            this.$classEditor.destroy();
        },
        events:{
            onReady:function(){
                SPA=this;
                linb.ComFactory.setProfile(CONF.ComFactoryProfile);
            },
            onRender:function(com, threadid){
                com.setValue(com.$fetchedCode||com.$iniCode, com.$fetchedurl);
                com.$classEditor.showPage(com.$firstView);
            },
            afterIniComponents:function(){
                var self=this;
                self.popLang.setItems(CONF.localeItems);

                self.appRoot
                .append( new linb.UI.Button(
                    {
                        caption:linb.wrapRes('VisualJS.builder.open'),
                        tips:linb.getRes('VisualJS.builder.openTips'),
                        zIndex:100, left:'auto', top:6, right:130, width:68, height:54, type:'custom', border:true, renderer:function(item){return '<img src=img/open.gif /><br />' + item.caption;}},
                    {onClick:function(){
                        if(self.$dirty){
                            if(false===confirm(linb.getRes('VisualJS.builder.nosavefirst')))
                                return;
                        }
                        if(self.$openFile){
                            self.$openFile.dlg.show(null,true,100,100);
                        }else{
                            //open file
                            linb.ComFactory.newCom('VisualJS.OpenFile',function(threadid){
                                self.$openFile=this;
                                //event handler for openFile Com
                                this.onOpenFile=function(url){
                                    linb.Thread.observableRun(function(threadid){
                                        linb.Ajax(CONF.phpPath,{
                                            key:CONF.requestKey,
                                            para:{
                                                action:'fetchwebfile',
                                                path:url
                                            }
                                        },function(txt){
                                            var obj=_.unserialize(txt);
                                            if(!obj.error)
                                                self.setValue(obj.data, url);
                                            else
                                                linb.message(obj.error.message);
                                            self.$openFile.dlg.hide();
                                        },function(){
                                            alert(linb.getRes('VisualJS.builder.noexist', url));
                                        },threadid).start();
                                    });
                                };
                                this.create(function(){
                                    this.dlg.show(null,true,100,100);
                                });
                            });
                        }
                    }})
                )
                .append( new linb.UI.Button(
                    {
                        caption:linb.wrapRes('VisualJS.builder.save'),
                        tips:linb.getRes('VisualJS.builder.saveTips'),
                        zIndex:100, left:'auto', top:6, right:210,  width:68, height:54, type:'custom', border:true, renderer:function(item){return '<img src=img/save.gif /><br />' + item.caption;}},
                    {onClick:function(p,e,src){
                        self.popSave.updateItem('savetoserver',{disabled:!self.$url || linb.absIO.isCrossDomain(self.$url)})

                        if(self.popSave.$lang!=linb.getLang()){
                            self.popSave.$lang=linb.getLang();
                            self.popSave.refresh();
                        }

                        self.popSave.pop(src);
                    }
                    })
                )
                .append( self.$btnRun = new linb.UI.Button(
                    {
                        caption:linb.wrapRes('VisualJS.builder.run'),
                        tips:linb.getRes('VisualJS.builder.runTips'),
                        zIndex:100, left:'auto', top:6, right:290, width:68, height:54, type:'custom', border:true, renderer:function(item){return '<img src=img/run.gif /><br />' + item.caption;}},
                    {onClick:function(){
                        var content=self.getValue(),
                            clsName=VisualJS.ClassTool.getClassName(content);
                        if(false===content)return;
                        if(!clsName){
                            linb.message(linb.getRes('VisualJS.classtool.noClass'));
                            return false;
                        }
                        linb.Dom.submit(CONF.testphpPath,{
                            clsName:clsName,
                            content:content,
                            theme:linb.UI.getTheme(),
                            lang:linb.getLang()
                        },'post');
                    }
                    })
                );

                self.$btnTheme=new linb.UI.Button({
                    type:'drop',
                    caption:linb.wrapRes('VisualJS.builder.dftTheme'),
                    tips:linb.getRes('VisualJS.builder.dftThemeTips'),
                    position:'absolute',
                    top:38,
                    right:4,
                    left:'auto',
                    width:110,
                    zIndex:100
                },{
                    onClick:function(profile,e,src){
                        if(SPA.popMenu.$lang!=linb.getLang()){
                            SPA.popMenu.$lang=linb.getLang();
                            SPA.popMenu.refresh();
                        }
                        SPA.popMenu.pop(src);
                    },
                    onClickDrop:function(profile,e,src){
                        if(SPA.popMenu.$lang!=linb.getLang()){
                            SPA.popMenu.$lang=linb.getLang();
                            SPA.popMenu.refresh();
                        }
                        SPA.popMenu.pop(src);
                    }
                });
                self.appRoot.append(self.$btnTheme);

                self.$btnLang=new linb.UI.Button({
                    type:'drop',
                    caption:linb.wrapRes('VisualJS.'+linb.getLang()),
                    tips:'$VisualJS.langTips',
                    position:'absolute',
                    top:6,
                    right:4,
                    left:'auto',
                    width:110,
                    zIndex:100
                },{
                    onClick:function(profile,e,src){
                        if(SPA.popLang.$lang!=linb.getLang()){
                            SPA.popLang.$lang=linb.getLang();
                            SPA.popLang.refresh();
                        }
                        SPA.popLang.pop(src);
                    },
                    onClickDrop:function(profile,e,src){
                        if(SPA.popLang.$lang!=linb.getLang()){
                            SPA.popLang.$lang=linb.getLang();
                            SPA.popLang.refresh();
                        }
                        SPA.popLang.pop(src);
                    }
                });
                self.appRoot.append(self.$btnLang);
            }
        },
        iniResource:function(com, threadid){
            //Load default code(insert to the current thread)
            var com=this,
                url=_.urlDecode(location.href.split('#')[1],'url'),
                hash={};

            hash.ajax1=linb.Ajax(com.$dftCodePath,'',function(code){
                com.$iniCode=code.replace('{className}','App');
            },function(){
                alert(linb.getRes('VisualJS.builder.noexist', com.$dftCodePath));
            });

            if(url){
                com.$url=url;
                hash.ajax2=linb.Ajax(CONF.phpPath,{
                    key:CONF.requestKey,
                    para:{
                        action:'fetchwebfile',
                        path:url
                    }
                },function(txt){
                    var obj=_.unserialize(txt);
                    if(!obj.error){
                        com.$fetchedCode=obj.data;
                        com.$fetchedurl=url;
                    }else
                        linb.message(obj.error.message);
                },function(){
                    alert(linb.getRes('VisualJS.builder.noexist', url));
                });
            }
            linb.absIO.groupCall(hash,null,null,null,threadid);
        },
        iniExComs:function(com, threadid){
            var com=this;
            //New an instance of VisualJS.ClassEditor
            linb.ComFactory.newCom('VisualJS.ClassEditor',function(threadid){
                var inn=this;
                inn.host = com;
                inn.$pageviewType=com.$pageviewType;
                inn.setEvents('onValueChanged',function(ipage, profile, b, nV){
                    com.imgEdit.setDisplay(b?'':'none');
                    com.$dirty=b;
                });

                //Create it first
                inn.create(function(o,threadid){
                    //Replace the Tag one
                    linb.UI.Tag.replace(com.container.get(0), inn.buttonview.get(0), com);
                },threadid);

                com.$classEditor=inn;
            },threadid);
        },
        getValue:function(){
            return this.$classEditor.getValue();
        },
        setValue:function(str,url){
            var self=this;
            if(str)
                self.$classEditor.setValue(str);
            if(url)
                self.$url=url;
            var dis=self.$url?!linb.absIO.isCrossDomain(self.$url)?'':'none':'none';

            self.urlLink.setDisplay(dis);
            self.divFileInfo.setDisplay(dis);

            if(self.$url)
                self.urlLink.setHref(self.$url).setCaption(self.$url);
            self.imgEdit.setDisplay('none');
            self.$dirty=false;
        },
        _pop_onmenuselected:function (profile, item, src) {
            if(linb.getLang()==item.id)return;
            SPA.$btnLang.setCaption(linb.wrapRes('VisualJS.'+item.id));
            linb.setLang(item.id);
        },

        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new linb.UI.PopMenu)
                .host(host,"popLang")
                .onMenuSelected("_pop_onmenuselected")
            );

            append((new linb.UI.PopMenu)
                .host(host,"popSave")
                .setItems([{"id":"savetoserver", "caption":"$VisualJS.builder.savetoserver"}, {"id":"savetolocal", "caption":"$VisualJS.builder.savetolocal"}, {"id":"saveashtml", "caption":"$VisualJS.builder.saveashtml"}, {"id":"saveaszip", "caption":"$VisualJS.builder.saveaszip"}])
                .onMenuSelected("_popsave_onmenusel")
            );

            append((new linb.UI.PopMenu)
                .host(host,"popMenu")
                .setItems([{"id":"default", "caption":"$VisualJS.builder.themeDft"}, {"id":"aqua", "caption":"$VisualJS.builder.themeAqua"}, {"id":"vista", "caption":"$VisualJS.builder.themeVista"}])
                .onMenuSelected("_onmenusel")
            );

            append((new linb.UI.Pane)
                .host(host,"appRoot")
                .setDock('fill')
                .setDockMinW(800)
                .setDockMinH(600)
            );

            host.appRoot.append((new linb.UI.Image)
                .host(host,"image1")
                .setTop(6)
                .setRight(370)
                .setLeft('auto')
                .setSrc("img/builder.gif")
            );

            host.appRoot.append((new linb.UI.Link)
                .host(host,"btnAdv")
                .setCaption('$VisualJS.builder.advancedBuilder')
                .setTop(6)
                .setRight(370)
                .setLeft('auto')
                .setZIndex(100)
                .setTarget('_blank')
                .setHref('index.html')
            );

            host.appRoot.append((new linb.UI.Tag)
                .host(host,"container")
                .setDock("fill")
                .setDockMargin({"left":0, "top":40, "right":0, "bottom":0})
            );

            host.appRoot.append((new linb.UI.Pane)
                .host(host,"paneTop")
                .setTop(10)
                .setWidth("auto")
                .setHeight(20)
                .setPosition("relative")
            );

            host.paneTop.append((new linb.UI.Image)
                .host(host,"imgEdit")
                .setLeft(20)
                .setTop(0)
                .setSrc('img/inedit.gif')
                .setDisplay('none')
            );
            host.paneTop.append((new linb.UI.Div)
                .host(host,"divFileInfo")
                .setLeft(40)
                .setTop(0)
                .setWidth(90)
                .setHeight(20)
                .setHtml("$VisualJS.builder.originalFile")
            );

            host.paneTop.append((new linb.UI.Link)
                .host(host,"urlLink")
                .setLeft(106)
                .setTop(1)
                .setTarget("_blank")
                .setCaption("")
                .onClick(function(){return true})
            );

            return children;
            // ]]code created by jsLinb UI Builder
        },
        _onmenusel:function(profile,item){
            var id=item.id;
            if((SPA.$curTheme||'default')==id)return;
            linb.UI.setTheme(SPA.$curTheme=id);
            SPA.$btnTheme.setCaption(linb.wrapRes(item.caption));
        },
        _popsave_onmenusel:function(profile,item){
            var self=this,
                id=item.id;
                ifrid='ifr_for_download',
                content=self.getValue(),
                clsName=VisualJS.ClassTool.getClassName(content);
            if(false===content)return;
            if(!clsName){
                linb.message(linb.getRes('VisualJS.classtool.noClass'));
                return false;
            }

            if(id=='savetolocal'){
                if(!linb.Dom.byId(ifrid))
                    linb('body').append(linb.create('<iframe id="'+ifrid+'" name="'+ifrid+'" style="display:none;"/>'));
                var hash={
                    key:CONF.requestKey,
                    para:{
                        action:'downloadjs',
                        content:content
                    }
                };
                linb.Dom.submit(CONF.phpPath, hash, 'post', ifrid);
            }else if(id=='saveashtml'){
                if(!linb.Dom.byId(ifrid))
                    linb('body').append(linb.create('<iframe id="'+ifrid+'" name="'+ifrid+'" style="display:none;"/>'));
                var hash={
                    key:CONF.requestKey,
                    para:{
                        action:'downloadhtml',
                        content:content,
                        clsName:clsName,
                        theme:linb.UI.getTheme(),
                        lang:linb.getLang()
                    }
                };
                linb.Dom.submit(CONF.phpPath, hash, 'post', ifrid);
            }else if(id=='saveaszip'){
                if(!linb.Dom.byId(ifrid))
                    linb('body').append(linb.create('<iframe id="'+ifrid+'" name="'+ifrid+'" style="display:none;"/>'));
                var hash={
                    key:CONF.requestKey,
                    para:{
                        action:'downloadzip2',
                        content:content,
                        clsName:clsName,
                        theme:linb.UI.getTheme(),
                        lang:linb.getLang()
                    }
                };
                linb.Dom.submit(CONF.phpPath, hash, 'post', ifrid);
            }else if(id=='savetoserver'){
                var path=self.$url;
                if(!path)return;
                if(self.$dirty){
                    if(false===confirm(linb.getRes('VisualJS.builder.issave2server')))
                        return;
                }else return;

                if(/^(http|https)\:\/\//.test(self.$url)){
                    //change the url to relative path format
                    var s1=self.$url.replace(/^.+\:\/\/[^/]+\//,''),
                        s2=linb.ini.appPath.replace(/^.+\:\/\/[^/]+\//,'').replace(/\/$/,''),
                        a1=s1.split('/'),
                        a2=s2.split('/'),
                        count=0,
                        as='';
                    _.arr.each(a2,function(o,i){
                        if(a1[i]!=o)
                            return false;
                        else count++;
                    });
                    as +=_.str.repeat('../',(a2.length-count));
                    path = as + a1.slice(count,a1.length).join('/');
                }

                linb.IAjax(CONF.phpPath, {
                    key:CONF.requestKey, para:{
                        action:'savetoserver',
                        hashCode:_(),
                        path: path,
                        content:content
                    }}, function(txt){
                        var obj = typeof txt=='string'?_.unserialize(txt):txt;
                        if(obj && !obj.error && obj.data && obj.data.OK){
                            linb.message(linb.getRes('VisualJS.builder.save2serverOK'));
                            self.imgEdit.setDisplay('none');
                            self.$dirty=false;
                        }else
                            linb.message(obj.error.message);
                    },function(txt){
                        linb.message(txt);
                    }).start();

            }
        }
    }
});