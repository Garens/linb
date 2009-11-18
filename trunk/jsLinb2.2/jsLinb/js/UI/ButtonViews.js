Class("linb.UI.ButtonViews", "linb.UI.Tabs",{
    Initialize:function(){
        var t = this.getTemplate();
        t.LIST.className='uibg-bar uiborder-outset';
        delete t.LEFT;
        delete t.TOP;
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            LIST:{
                'z-index':'2',
                position:'absolute'
            },
            ITEMS:{
                'z-index':'2',
                position:'absolute',
                left:0,
                top:0
            },
            ITEM:{
                $order:0,
                margin:'2px',
                position:'relative',
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                cursor:'pointer',
                'padding-right':'4px',
                'vertical-align':'top',
                background: linb.UI.$bg('button.gif', 'no-repeat right -270px',true)
            },
            'ITEM-mouseover':{
                $order:1,
                'background-position' : 'right -360px'
            },
            'ITEM-mousedown, ITEM-checked':{
                $order:2,
                'background-position' : 'right -450px'
            },
            ITEMI:{
                $order:0,
                'padding-left':'4px',
                //keep this same with ITEM
                'vertical-align':'top',
                'text-align': 'center',
                background: linb.UI.$bg('button.gif', 'no-repeat left -330px', true)
            },
            'ITEM-mouseover ITEMI':{
                $order:1,
                'background-position' : 'left -420px'
            },
            'ITEM-mousedown ITEMI, ITEM-checked ITEMI':{
                $order:2,
                'background-position' : 'left -510px'
            },
            ITEMC:{
                $order:0,
                //keep this same with ITEM
                'vertical-align':'top',
                'text-align': 'center',
                height:'20px',
                padding:'2px 0',
                background: linb.UI.$bg('button.gif', 'repeat-x left -300px', true)
            },
            'ITEM-mouseover ITEMC':{
                $order:1,
                'background-position' : 'left -390px'
            },
            'ITEM-mousedown ITEMC, ITEM-checked ITEMC':{
                $order:2,
                'background-position' : 'left -480px'
            },
            HANDLE:{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                cursor:'pointer',
                'vertical-align':'middle',
                'font-size':'12px',
                margin:'1px'
            }
        },
        DataModel:{
            hAlign:null,
            barLocation:{
                ini:'top',
                listbox:['top','bottom','left','right'],
                action:function(v){
                    var self=this,
                        hs = self.getSubNode('LIST'),
                        h = self.getSubNodes(['ITEM','ITEMI','ITEMC'],true);
                    switch(v){
                        case 'left':
                            hs.cssRegion({left:0,top:0,right:'auto',bottom:0});
                        break;
                        case 'top':
                            hs.cssRegion({left:0,top:0,right:0,bottom:'auto'});
                        break;
                        case 'right':
                            hs.cssRegion({left:'auto',top:0,right:0,bottom:0});
                        break;
                        case 'bottom':
                            hs.cssRegion({left:0,top:'auto',right:0,bottom:0});
                       break;
                    }
                    switch(v){
                        case 'left':
                        case 'right':
                            h.css('display','block');
                            break;
                        case 'top':
                        case 'bottom':
                            h.setInlineBlock();
                            hs.height('auto');
                            break;
                    }
                    self.boxing().setBarSize(self.properties.barSize,true);
                }
            },
            barHAlign:{
                ini:'left',
                listbox:['left','center', 'right'],
                action:function(v){
                    var hl = this.getSubNode('ITEMS');
                    hl.css('textAlign',v);
                }
            },
            barVAlign:{
                ini:'top',
                listbox:['top','bottom'],
                action:function(v){
                    var hl = this.getSubNode('ITEMS');
                    if(v=='top')
                        hl.cssRegion({top:0,bottom:'auto'});
                    else
                        hl.cssRegion({bottom:0,top:'auto'});
                }
            },
            barSize:{
                ini:50,
                action:function(v){
                    var self=this,
                        t=self.properties,
                        hs = self.getSubNode('LIST'),
                        hl = self.getSubNode('ITEMS');
                    if(t.barLocation=='left'||t.barLocation=='right'){
                        hs.merge(hl).width(v);
                    }else{
                        hs.height(v);
                    }
                    var t=self.getRootNode().style;
                    linb.UI.$tryResize(self,t.width, t.height,true);
                }
            }
        },
        LayoutTrigger:function(){
            var pro = this.properties;
            this.boxing().setBarLocation(pro.barLocation,true)
            .setBarHAlign(pro.barHAlign,true)
            .setBarVAlign(pro.barVAlign,true);
        },
        _onresize:function(profile,width,height,force,key){
            var t=profile.properties,
                item = profile.getItemByItemId(key);
            if(!item)
                key=t.$UIvalue;
            var o = profile.boxing().getPanel(key),
                top, left,
                hs = profile.getSubNode('LIST'),
                hl = profile.getSubNode('ITEMS'),
                wc=null,hc=null;

            if(t.barLocation=='top'||t.barLocation=='bottom'){
                if(width){
                    hs.width(width-2);
                    hl.width(width-2);
                    left = 0;
                    wc=width;
                }
                if(height-t.barSize>0)hc=height-t.barSize-2;
                top = t.barLocation=='top'?2- -t.barSize:0;
            }else{
                if(height){
                    hs.height(height-2);
                    top=0;
                    hc=height;
                }
                if(width){
                    left = t.barLocation=='left'?2- -t.barSize:0;
                    wc=width-t.barSize-2;
                }
            }
            if(o && !o.isEmpty())o.cssRegion({width:wc?wc:null,height:hc?hc:null,left:left,top:top},true);
        },
        _adjustScroll:null
    }
});