Class('App', 'linb.Page',{
    Instance:{
        //base Class for linb.Page
        base:["linb.UI"],
        //requried class for the App
        required:["linb.UI.MenuBar","linb.UI.ToolBar","linb.UI.Tabs","linb.UI.Panel","linb.UI.PanelBar","linb.UI.Stacks","linb.UI.Group","linb.UI.Input","linb.UI.Label","linb.UI.Button","linb.UI.ComboInput","linb.UI.RadioBox","linb.UI.CheckBox","linb.UI.List","linb.UI.Layout","linb.UI.TreeBar","linb.UI.TreeGrid","linb.UI.Gallery","linb.UI.ButtonViews","linb.UI.TextEditor","linb.UI.Dialog","linb.UI.Block","linb.UI.Div"],
        iniComponents:function(){
            // [[code creted by designer, don't change it manually
            this.nodes = [];

            this.menubar2 = (new linb.UI.MenuBar)
            .alias("menubar2").host(this)
            .setItems([{"id":"file","caption":"File","sub":[{"id":"newproject","caption":"New Project","icon":"img/app.gif","iconPos":"-32px top"},{"id":"openproject","caption":"Open Project","add":"Ctrl+Alt+O","icon":"img/App.gif","iconPos":"-48px top"},{"id":"closeproject","caption":"Close Project"},{"type":"split"},{"id":"save","caption":"Save","icon":"img/App.gif","iconPos":"-80px top"},{"id":"saveall","caption":"Save All","add":"Ctrl+Alt+S","icon":"img/App.gif","iconPos":"-96px top"}]},{"id":"tools","caption":"Tools","sub":[{"id":"command","caption":"Command Window","icon":"img/App.gif","iconPos":"-112px top"},{"id":"spy","caption":"Components Spy","icon":"img/App.gif","iconPos":"-128px top"}]},{"id":"build","caption":"Build","sub":[{"id":"debug","caption":"Debug","icon":"img/App.gif","iconPos":"top left","add":"F9"},{"id":"release","caption":"Release","icon":"img/App.gif","iconPos":"-64px top","add":"Ctrl+F9"},{"type":"split"},{"id":"setting","caption":"Build Setting"}]},{"id":"help","caption":"Help","sub":[{"id":"Forum","caption":"forum"},{"type":"split"},{"id":"License","caption":"License","sub":[{"id":"gpllicense","caption":"gpllicense"},{"id":"clicense","caption":"clicense"},{"id":"purchase","caption":"purchase"}]},{"type":"split"},{"id":"about","caption":"About"}]}])

            ;
            this.nodes.push(this.menubar2.get(0));

            this.toolbar8 = (new linb.UI.ToolBar)
            .alias("toolbar8").host(this)
            .setDockOrder("2").setItems([{"id":"only","sub":[{"id":"newproject","icon":"img/app.gif","iconPos":"-32px top","tips":"newp"},{"id":"openproject","icon":"img/app.gif","iconPos":"-48px top","tips":"open"},{"type":"split"},{"id":"saveall","icon":"img/app.gif","iconPos":"-96px top","tips":"saveall"},{"type":"split"},{"id":"debug","icon":"img/app.gif","iconPos":"top left","tips":"debug"},{"id":"release","icon":"img/app.gif","iconPos":"-64px top","tips":"release"},{"type":"split"},{"id":"download","tips":"$app.menu.download","icon":"img/app.gif","iconPos":"-144px 0px"},{"id":"flash","icon":"img/app.gif","iconPos":"-128px -17px","tips":"flash"},{"id":"demo","icon":"img/app.gif","iconPos":"-48px -64px ","tips":"demo"},{"type":"split"},{"id":"ec","icon":"img/app.gif","iconPos":"-98px -16px","tips":"ec"}]}])

            ;
            this.nodes.push(this.toolbar8.get(0));

            this.tabs2 = (new linb.UI.Tabs)
            .alias("tabs2").host(this)
            .setLeft(null)
            .setTop(null)
            .setItems([{"id":"a","caption":"itema","icon":"img/app.gif","iconPos":"left top"},{"id":"b","caption":"itemb","icon":"img/app.gif","iconPos":"left -16px"},{"id":"c","caption":"itemc","icon":"img/app.gif","iconPos":"left -32px"}])

            ;
            this.nodes.push(this.tabs2.get(0));

            this.panel9 = (new linb.UI.Panel)
            .alias("panel9").host(this)
            .setLeft(571).setTop(31).setWidth(180).setHeight(280)
            ;
            this.tabs2.attach(this.panel9, 'b');

            this.panelbar3 = (new linb.UI.PanelBar)
            .alias("panelbar3").host(this)
            .setLeft(0).setTop(0).setZIndex(1).setCaption("panelbar3")
            ;
            this.panel9.attach(this.panelbar3);

            this.stacks1 = (new linb.UI.Stacks)
            .alias("stacks1").host(this)
            .setLeft(0).setTop(0).setItems([{"id":"a","caption":"itema","tips":"item a"},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])

            ;
            this.panelbar3.attach(this.stacks1);

            this.treegrid3 = (new linb.UI.TreeGrid)
            .alias("treegrid3").host(this)
            .setHeader([{"id":"col1","caption":"col1","type":"input","width":50},{"id":"col2","caption":"col2","type":"input","width":80}])
            .setRows([{"id":"row1","cells":[{"value":"cell11"},{"value":"cell12"}]},{"id":"row2","cells":[{"value":"cell21","type":"label"},{"value":"cell22"}],"sub":[{"id":"row21","cells":["cell31",{"value":"cell32","type":"number"}]}]}])

            ;
            this.stacks1.attach(this.treegrid3, 'c');

            this.list5 = (new linb.UI.List)
            .alias("list5").host(this)
            .setLeft(80).setTop(60).setItems([{"id":"a","caption":"itema","icon":"img/app.gif","iconPos":"left top"},{"id":"b","caption":"itemb","icon":"img/app.gif","iconPos":"left -16px"},{"id":"c","caption":"itemc","icon":"img/app.gif","iconPos":"left -32px"},{"id":"d","caption":"itemd","icon":"img/app.gif","iconPos":"-16px top"},{"id":"e","caption":"iteme","icon":"img/app.gif","iconPos":"-16px -16px"},{"id":"f","caption":"itemf","icon":"img/app.gif","iconPos":"-16px -32px"}])
            .setValue(null)
            .setDock("fill")
            ;
            this.stacks1.attach(this.list5, 'a');

            this.radiobox1 = (new linb.UI.RadioBox)
            .alias("radiobox1").host(this)
            .setLeft(70).setTop(60).setItems([{"id":"a","caption":"itema","icon":"img/app.gif","iconPos":"left top"},{"id":"b","caption":"itemb","icon":"img/app.gif","iconPos":"left -16px"},{"id":"c","caption":"itemc","icon":"img/app.gif","iconPos":"left -32px"},{"id":"d","caption":"itemd","icon":"img/app.gif","iconPos":"-16px top"},{"id":"e","caption":"iteme","icon":"img/app.gif","iconPos":"-16px -16px"},{"id":"f","caption":"itemf","icon":"img/app.gif","iconPos":"-16px -32px"}])
            .setValue(null)
            .setDock("fill")
            ;
            this.stacks1.attach(this.radiobox1, 'b');

            this.group1 = (new linb.UI.Group)
            .alias("group1").host(this)
            .setLeft(81).setTop(null)
            .setWidth(440).setHeight(391).setCaption("group1").setIcon("img/app.gif")
            ;
            this.tabs2.attach(this.group1, 'b');

            this.input9 = (new linb.UI.Input)
            .alias("input9").host(this)
            .setLeft(30).setTop(200).setValueFormat("^(http|https|ftp)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$")
            ;
            this.group1.attach(this.input9);

            this.label18 = (new linb.UI.Label)
            .alias("label18").host(this)
            .setLeft(230).setTop(10).setCaption("label18").setWidth(130).setIcon("img/app.gif").setIconPos("-32px -32px")
            ;
            this.group1.attach(this.label18);

            this.comboinput12 = (new linb.UI.ComboInput)
            .alias("comboinput12").host(this)
            .setLeft(230).setTop(210).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])
            .setType("getter")
            ;
            this.group1.attach(this.comboinput12);

            this.input6 = (new linb.UI.Input)
            .alias("input6").host(this)
            .setLeft(30).setTop(290).setHeight(60).setInputArea("textarea")
            ;
            this.group1.attach(this.input6);

            this.comboinput13 = (new linb.UI.ComboInput)
            .alias("comboinput13").host(this)
            .setLeft(230).setTop(250).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])
            .setType("helpinput")
            ;
            this.group1.attach(this.comboinput13);

            this.comboinput17 = (new linb.UI.ComboInput)
            .alias("comboinput17").host(this)
            .setLeft(230).setTop(130).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])

            ;
            this.group1.attach(this.comboinput17);

            this.button11 = (new linb.UI.Button)
            .alias("button11").host(this)
            .setLeft(230).setTop(40).setCaption("button").setIcon("img/app.gif")
            ;
            this.group1.attach(this.button11);

            this.checkbox1 = (new linb.UI.CheckBox)
            .alias("checkbox1").host(this)
            .setLeft(230).setTop(100).setCaption("checkbox1").setIcon("img/app.gif")
            ;
            this.group1.attach(this.checkbox1);

            this.input7 = (new linb.UI.Input)
            .alias("input7").host(this)
            .setLeft(30).setTop(100).setValue("password").setType("password")
            ;
            this.group1.attach(this.input7);

            this.comboinput11 = (new linb.UI.ComboInput)
            .alias("comboinput11").host(this)
            .setLeft(230).setTop(170).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])
            .setReadonly(true).setType("listbox")
            ;
            this.group1.attach(this.comboinput11);

            this.comboinput14 = (new linb.UI.ComboInput)
            .alias("comboinput14").host(this)
            .setLeft(230).setTop(290).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])
            .setType("cmdbox")
            ;
            this.group1.attach(this.comboinput14);

            this.input10 = (new linb.UI.Input)
            .alias("input10").host(this)
            .setLeft(30).setTop(240).setValueFormat("^[a-zA-Z]*$")
            ;
            this.group1.attach(this.input10);

            this.input4 = (new linb.UI.Input)
            .alias("input4").host(this)
            .setLeft(30).setTop(50)
            ;
            this.group1.attach(this.input4);

            this.comboinput15 = (new linb.UI.ComboInput)
            .alias("comboinput15").host(this)
            .setLeft(230).setTop(330).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])
            .setType("popbox")
            ;
            this.group1.attach(this.comboinput15);

            this.div25 = (new linb.UI.Div)
            .alias("div25").host(this)
            .setLeft(30).setTop(270).setWidth(90).setHeight(null)
            .setHtml("textArea")
            ;
            this.group1.attach(this.div25);

            this.div26 = (new linb.UI.Div)
            .alias("div26").host(this)
            .setLeft(30).setTop(30).setWidth(null)
            .setHeight(20).setHtml("normal")
            ;
            this.group1.attach(this.div26);

            this.div27 = (new linb.UI.Div)
            .alias("div27").host(this)
            .setLeft(30).setTop(80).setWidth(null)
            .setHeight(20).setHtml("password")
            ;
            this.group1.attach(this.div27);

            this.div28 = (new linb.UI.Div)
            .alias("div28").host(this)
            .setLeft(30).setTop(130).setWidth(80).setHeight("20").setHtml("number only")
            ;
            this.group1.attach(this.div28);

            this.div29 = (new linb.UI.Div)
            .alias("div29").host(this)
            .setLeft(30).setTop(180).setWidth(null)
            .setHeight(20).setHtml("URL only")
            ;
            this.group1.attach(this.div29);

            this.div30 = (new linb.UI.Div)
            .alias("div30").host(this)
            .setLeft(30).setTop(220).setWidth(null)
            .setHeight(20).setHtml("char only")
            ;
            this.group1.attach(this.div30);

            this.input8 = (new linb.UI.Input)
            .alias("input8").host(this)
            .setLeft(30).setTop(150).setValueFormat("^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)")
            ;
            this.group1.attach(this.input8);

            this.button10 = (new linb.UI.Button)
            .alias("button10").host(this)
            .setLeft(230).setTop(70).setCaption("toggle").setIcon("img/app.gif").setToggleKey("toggle")
            ;
            this.group1.attach(this.button10);

            this.layout6 = (new linb.UI.Layout)
            .alias("layout6").host(this)
            .setLeft(null)
            .setTop(null)
            .setItems([{"id":"before","pos":"before","locked":false,"size":200,"min":50,"max":400,"hide":false,"cmd":true},{"id":"main","min":10}])
            .setType("horizontal")
            ;
            this.tabs2.attach(this.layout6, 'a');

            this.treebar5 = (new linb.UI.TreeBar)
            .alias("treebar5").host(this)
            .setLeft(0).setTop(0).setItems([{"id":"a","caption":"itema","tips":"item a","icon":"img/app.gif","iconPos":"left  top","sub":[{"id":"aa","caption":"suba","icon":"img/app.gif","iconPos":"left  -16px"},{"id":"ab","caption":"subb","icon":"img/app.gif","iconPos":"left  -32px"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","icon":"img/app.gif","iconPos":"-16px  -16px"},{"id":"d","caption":"itemd","tips":"item d","group":true,"iniFold":false,"icon":"img/app.gif","iconPos":"-32px  -48px","sub":[{"id":"da","caption":"suba","icon":"img/app.gif","iconPos":"-48px  -48px"},{"id":"db","caption":"subb","icon":"img/app.gif","iconPos":"-64px  -48px"},{"id":"dc","caption":"subc"}]}])
            .setValue(null)

            .setCustomAppearance({"ITEMS":"border:0"})
            ;
            this.layout6.attach(this.treebar5, 'before');

            this.treegrid3 = (new linb.UI.TreeGrid)
            .alias("treegrid3").host(this)
            .setHeader([{"id":"col1","caption":"col1","type":"input","width":50},{"id":"col2","caption":"col2","type":"number","format":"^-?\\d\\d*$","width":80},{"id":"col3","caption":"col3","type":"checkbox","width":40}])
            .setRows([{"id":"row1","cells":[{"value":"cell11"},{"value":1},{"value":false}]},{"id":"row2","cells":[{"value":"cell21"},{"value":2},{"value":false}]},{"id":"row3","cells":[{"value":"cell31"},{"value":3},{"value":false}]},{"id":"row4","cells":[{"value":"cell41"},{"value":4},{"value":false}]},{"id":"row5","cells":[{"value":"cell51"},{"value":5},{"value":false}],"sub":[{"id":"row6","cells":["in61",6,false]},{"id":"row7","cells":["in71",7,false]},{"id":"row8","cells":["in81",8,false]},{"id":"row9","cells":["in91",9,false]}]}])

            ;
            this.layout6.attach(this.treegrid3, 'main');

            this.buttonviews3 = (new linb.UI.ButtonViews)
            .alias("buttonviews3").host(this)
            .setLeft(0).setTop(0).setItems([{"id":"a","caption":"itema","tips":"item a"},{"id":"b","caption":"itemb","tips":"item b"}])
            .setHandleDock("left")
            .setCustomAppearance({"PANEL":"border-top:0;border-right:0;border-bottom:0"})
            ;
            this.tabs2.attach(this.buttonviews3, 'c');

            this.block2 = (new linb.UI.Block)
            .alias("block2").host(this)
            .setLeft(221).setTop(61).setWidth(401).setHeight(241).setBorder(true)
            ;
            this.buttonviews3.attach(this.block2, 'a');

            this.list7 = (new linb.UI.List)
            .alias("list7").host(this)
            .setLeft(30).setTop(30).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])

            ;
            this.block2.attach(this.list7);

            this.group3 = (new linb.UI.Group)
            .alias("group3").host(this)
            .setLeft(140).setTop(70).setWidth(291).setHeight(161).setCaption("group3")
            ;
            this.buttonviews3.attach(this.group3, 'b');

            this.radiobox3 = (new linb.UI.RadioBox)
            .alias("radiobox3").host(this)
            .setLeft(30).setTop(30).setItems([{"id":"a","caption":"itema","tips":"item a","sub":[{"id":"aa","caption":"suba"},{"id":"ab","caption":"subb"}]},{"id":"b","caption":"itemb","tips":"item b"},{"id":"c","caption":"itemc","tips":"item c"}])

            ;
            this.group3.attach(this.radiobox3);

            this.dialog = (new linb.UI.Dialog)
            .alias("dialog").host(this)
            .setLeft(410).setTop(40).setWidth(350).setHeight(240).setCaption("dialog6").setIcon("img/app.gif")
            ;
            this.nodes.push(this.dialog.get(0));

            this.gallery3 = (new linb.UI.Gallery)
            .alias("gallery3").host(this)
            .setDock("fill").setLeft(null)
            .setTop(null)
            .setItems([{"id":"a","caption":"itema","icon":"img/app.gif","iconPos":"left top"},{"id":"b","caption":"itemb","icon":"img/app.gif","iconPos":"left -16px"},{"id":"c","caption":"itemc","icon":"img/app.gif","iconPos":"left -32px"},{"id":"d","caption":"itemd","icon":"img/app.gif","iconPos":"-16px top"},{"id":"e","caption":"iteme","icon":"img/app.gif","iconPos":"-16px -16px"},{"id":"f","caption":"itemf","icon":"img/app.gif","iconPos":"-16px -32px"}])
            .setValue(null)
            .setItemWidth("48").setItemHeight("48")
            .setCustomAppearance({"BORDER":"border-color:#fff #fff #ACA899 #ACA899;","ITEMS":"background:#fff"})
            ;
            this.dialog.attach(this.gallery3);

            return this.nodes;
            // ]]code creted by designer
        }
    }
});