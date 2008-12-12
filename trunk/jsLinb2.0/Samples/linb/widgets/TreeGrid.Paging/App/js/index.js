
Class('App', 'linb.Com',{
    Instance:{
        //base Class for linb.Com
        base:["linb.UI"], 
        //requried class for the App
        required:["linb.UI.Pane", "linb.UI.PageBar", "linb.UI.TreeGrid", "linb.UI.ComboInput"], 
        //Com events
        events:{"onRender":"_onready"}, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Pane)
                .host(host,"pane29")
                .setLeft(100)
                .setTop(60)
                .setWidth(600)
                .setHeight(300)
            );
            
            host.pane29.append((new linb.UI.Pane)
                .host(host,"pane30")
                .setDock("bottom")
                .setHeight(30)
            );
            
            host.pane30.append((new linb.UI.PageBar)
                .host(host,"pagebar2")
                .setLeft(10)
                .setTop(6)
                .onClick("_pagebar2_onclick")
            );
            
            host.pane30.append((new linb.UI.ComboInput)
                .host(host,"comboinput19")
                .setLeft(562)
                .setTop(5)
                .setType("spin")
                .setIncrement("1")
                .setMin("10")
                .setMax("20")
                .setWidth(40)
                .afterUIValueSet("_comboinput19_afteruivalueset")
            );
            
            host.pane29.append((new linb.UI.TreeGrid)
                .host(host,"tg")
                .setAltRowsBg(true)
                .setCustomStyle({"BORDER":"border:solid 1px #aaa;"})
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _onready:function () {
            SPA=this;
            var tg=SPA.tg;
            tg.setHeader([{"caption":"no", "width":60, "type":"label"}, {"caption":"country", "width":60, "type":"label"}, {"caption":"customer", "width":50, "type":"label"}, {"caption":"employee", "width":70, "type":"label"}, {"caption":"bill2005", "type":"number", "width":50}, {"caption":"bill2006", "type":"number", "width":50}, {"caption":"bill2007", "type":"number", "width":50}, {"caption":"bill2008", "type":"number", "width":50}, {"caption":"orderDate",  "width":70}]);
            tg.busy();
            linb.Ajax('App/js/data.js','',function(rsp){
                SPA._rows=_.unserialize(rsp);
                SPA.setPageCount(10);
                tg.free();
            },function(msg){
                alert(msg);
                tg.free()
            }).start();
        }, 
        setPageCount:function(count){
            SPA.count=count;
            var page=parseInt((SPA._rows.length+(SPA.count-1))/SPA.count);
            SPA.pagebar2.setValue([1,1,page].join(':')).setPage(1);
            SPA.comboinput19.setValue(count);
            SPA.setTg(1);            
        },
        setTg:function(index){
            var rows=SPA._rows.slice((index-1)*SPA.count,index*SPA.count);
            SPA.tg.removeAllRows().insertRows(rows);
        }, 
        _pagebar2_onclick:function (profile, src) {
            var value=parseInt(src.href.split('#')[1])||0;
            profile.boxing().setPage(value);
            SPA.setTg(value);
        }, 
        _comboinput19_afteruivalueset:function (profile, oldValue, newValue) {
            if(parseInt(newValue)==SPA.count)return;
            profile.boxing().updateValue();
            SPA.setPageCount(newValue);
        }
    }
});