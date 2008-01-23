Class('linb.date',null,{
    Initialize:function(){
        var self=this;
        self._mapKeys(self.TIMEUNIT);
        var a=self._key1,b=self._key2,u=self.UNIT={};
        for(var i=0,l=a.length;i<l;i++)u[a[i]]=1;
        for(var i=0,l=b.length;i<l;i++)u[b[i]]=1;
        u.w=1;
    },
    Static:{
        _key1:'MILLISECOND,SECOND,MINUTE,HOUR,DAY,WEEK,MONTH,QUARTER,YEAR,DECADE,CENTURY'.split(','),
        _key2:'ms,s,n,h,d,ww,m,q,y,de,c'.split(','),

        // Conversion factors
        TIMEUNIT : {
            MILLISECOND : 1,
            SECOND      : 1000,           //SECONDS
            MINUTE      : 60000,          //MINUTES 60 * 1000
            HOUR        : 3600000,        //HOURS 60 * 60 * 1000
            DAY         : 86400000,       //DAYS 24 * 60 * 60 * 1000
            WEEK        : 604800000,      //WEEKS 7 * 24 * 60 * 60 * 1000
            MONTH       : 2592000000,     //MONTHS 30 * 24 * 60 * 60 * 1000  (approx = 1 month)
            QUARTER     : 7776000000,     //QUARTERS 90 * 24 * 60 * 60 * 1000  (approx = 3 months)
            YEAR        : 31557600000,    //YEARS 365 * 24 * 60 * 60 * 1000 (approx = 1 year)
            DECADE      : 315576000000,   //DECADES 10 * 365 * 24 * 60 * 60 * 1000 (approx = 1 decade)
            CENTURY     : 3155760000000   //CENTURIES 100 * 365 * 24 * 60 * 60 * 1000 (approx = 1 century)
        },
        TEXTFORMAT:{
            ms:function(d,t,o){o=linb.date;return o.fix(o.get(d,'ms',t),3)+ linb.wrapRes('date.MS')},
            s:function(d,t,o){o=linb.date;return o.fix(o.get(d,'s',t))+ linb.wrapRes('date.S')},
            n:function(d,t,o){o=linb.date;return o.fix(o.get(d,'n',t))+ linb.wrapRes('date.N')},
            h :function(d,t,o){o=linb.date;return o.fix(o.get(d,'h',t))+ linb.wrapRes('date.H')},
            d:function(d,t,o){o=linb.date;return o.get(d,'d',t)+ linb.wrapRes('date.D')},
            w : function(d,t,firstDayOfWeek,o){o=linb.date;return linb.wrapRes('date.WEEKS.'+(o.get(d,'w',t) - firstDayOfWeek +7)%7 )},
            ww : function(d,t,firstDayOfWeek,o){o=linb.date;return (o.get(d,'ww',t,firstDayOfWeek)) + linb.wrapRes('date.W')},
            m:function(d,t,o){o=linb.date;return (o.get(d,'m',t)+1) + linb.wrapRes('date.M')},
            q : function(d,t,o){o=linb.date;return (o.get(d,'q',t) + 1) + linb.wrapRes('date.Q')},
            y :function(d,t,o,r){o=linb.date;return o.get(d,'y',t) + linb.wrapRes('date.Y')},
            de:function(d,t,o){o=linb.date;return o.get(d,'de',t) + linb.wrapRes('date.DE')},
            c:function(d,t,o){o=linb.date;return o.get(d,'c',t) + linb.wrapRes('date.C')},

            hn:function(d,t,o){o=linb.date;return linb.wrapRes('date.HN-'+o.get(d,'h',t)+"-"+o.get(d,'n',t))},
            dhn:function(d,t,o){o=linb.date;return linb.wrapRes('date.DHN-'+o.get(d,'d',t)+"-"+o.get(d,'h',t)+"-"+o.get(d,'n',t))},
            mdhn:function(d,t,o){o=linb.date;return linb.wrapRes('date.MDHN-'+(o.get(d,'m',t)+1)+"-"+o.get(d,'d',t)+"-"+o.get(d,'h',t)+"-"+o.get(d,'n',t))},
            hns:function(d,t,o){o=linb.date;return linb.wrapRes('date.HNS-'+o.get(d,'h',t)+"-"+o.get(d,'n',t)+"-"+o.get(d,'s',t))},
            hnsms:function(d,t,o){o=linb.date;return linb.wrapRes('date.HNSMS-'+o.get(d,'h',t)+"-"+o.get(d,'n',t)+"-"+o.get(d,'s',t)+"-"+o.get(d,'ms',t))},

            yq:function(d,t,o){o=linb.date;return linb.wrapRes('date.YQ-'+o.get(d,'y',t)+"-"+(o.get(d,'q',t)+1))},

            ym :   function(d,t,o){o=linb.date;return linb.wrapRes('date.YM-'+o.get(d,'y',t)+"-"+(o.get(d,'m',t)+1))},
            md :  function(d,t,o){o=linb.date;return linb.wrapRes('date.MD-'+(o.get(d,'m',t)+1)+"-"+o.get(d,'d',t))},
            ymd :  function(d,t,o){o=linb.date;return linb.wrapRes('date.YMD-'+o.get(d,'y',t)+"-"+(o.get(d,'m',t)+1)+"-"+o.get(d,'d',t))},
            ymdh:  function(d,t,o){o=linb.date;return linb.wrapRes('date.YMDH-'+o.get(d,'y',t)+"-"+(o.get(d,'m',t)+1)+"-"+o.get(d,'d',t)+"-"+o.get(d,'h',t))},
            ymdhn: function(d,t,o){o=linb.date;return linb.wrapRes('date.YMDHN-'+o.get(d,'y',t)+"-"+(o.get(d,'m',t)+1)+"-"+o.get(d,'d',t)+"-"+o.get(d,'h',t)+"-"+o.get(d,'n',t))},
            ymdhns:function(d,t,o){o=linb.date;return linb.wrapRes('date.YMDHNS-'+o.get(d,'y',t)+"-"+(o.get(d,'m',t)+1)+"-"+o.get(d,'d',t)+"-"+o.get(d,'h',t)+"-"+o.get(d,'n',t)+"-"+o.get(d,'s',t))},
            'all' :  function(d,t,o){o=linb.date;return linb.wrapRes('date.ALL-'+o.get(d,'y',t)+"-"+(o.get(d,'m',t)+1)+"-"+o.get(d,'d',t)+"-"+o.get(d,'h',t)+"-"+o.get(d,'n',t)+"-"+o.get(d,'s',t)+"-"+o.get(d,'ms',t))}
        },
        TIMEZONE:[{
            id:"Asia(East,North)",
            sub:[{
                    id:"Brunei",
                    v:"+0800"
                },{
                    id:"Burma",
                    v:"+0630"
                },{
                    id:"Cambodia",
                    v:"+0700"
                },{
                    id:"China",
                    v:"+0800"
                },{
                    id:"China(HK,Macau)",
                    v:"+0800"
                },{
                    id:"China(TaiWan)",
                    v:"+0800"
                },{
                    id:"China(Urumchi)",
                    v:"+0700"
                },{
                    id:"East Timor",
                    v:"+0800"
                },{
                    id:"Indonesia",
                    v:"+0700"
                },{
                    id:"Japan",
                    v:"+0900"
                },{
                    id:"Kazakhstan(Aqtau)",
                    v:"+0400"
                },{
                    id:"Kazakhstan(Aqtobe)",
                    v:"+0500"
                },{
                    id:"Kazakhstan(Astana)",
                    v:"+0600"
                },{
                    id:"Kirghizia",
                    v:"+0500"
                },{
                    id:"Korea",
                    v:"+0900"
                },{
                    id:"Laos",
                    v:"+0700"
                },{
                    id:"Malaysia",
                    v:"+0800"
                },{
                    id:"Mongolia",
                    v:"+0800",
                    tag:"03L03|09L03"
                },{
                    id:"Philippines",
                    v:"+0800"
                },{
                    id:"Russia(Anadyr)",
                    v:"+1300",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Kamchatka)",
                    v:"+1200",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Magadan)",
                    v:"+1100",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Vladivostok)",
                    v:"+1000",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Yakutsk)",
                    v:"+0900",
                    tag:"03L03|10L03"
                },{
                    id:"Singapore",
                    v:"+0800"
                },{
                    id:"Thailand",
                    v:"+0700"
                },{
                    id:"Vietnam",
                    v:"+0700"
                }]
            },{
                id:"Asia(South,West)",
                sub:[{
                    id:"Afghanistan",
                    v:"+0430"
                },{
                    id:"Arab Emirates",
                    v:"+0400"
                },{
                    id:"Bahrain",
                    v:"+0300"
                },{
                    id:"Bangladesh",
                    v:"+0600"
                },{
                    id:"Bhutan",
                    v:"+0600"
                },{
                    id:"Cyprus",
                    v:"+0200"
                },{
                    id:"Georgia",
                    v:"+0500"
                },{
                    id:"India",
                    v:"+0530"
                },{
                    id:"Iran",
                    v:"+0330",
                    tag:"04 13|10 13"
                },{
                    id:"Iraq",
                    v:"+0300",
                    tag:"04 13|10 13"
                },{
                    id:"Israel",
                    v:"+0200",
                    tag:"04F53|09F53"
                },{
                    id:"Jordan",
                    v:"+0200"
                },{
                    id:"Kuwait",
                    v:"+0300"
                },{
                    id:"Lebanon",
                    v:"+0200",
                    tag:"03L03|10L03"
                },{
                    id:"Maldives",
                    v:"+0500"
                },{
                    id:"Nepal",
                    v:"+0545"
                },{
                    id:"Oman",
                    v:"+0400"
                },{
                    id:"Pakistan",
                    v:"+0500"
                },{
                    id:"Palestine",
                    v:"+0200"
                },{
                    id:"Qatar",
                    v:"+0300"
                },{
                    id:"Saudi Arabia",
                    v:"+0300"
                },{
                    id:"Sri Lanka",
                    v:"+0600"
                },{
                    id:"Syria",
                    v:"+0200",
                    tag:"04 13|10 13"
                },{
                    id:"Tajikistan",
                    v:"+0500"
                },{
                    id:"Turkey",
                    v:"+0200"
                },{
                    id:"Turkmenistan",
                    v:"+0500"
                },{
                    id:"Uzbekistan",
                    v:"+0500"
                },{
                    id:"Yemen",
                    v:"+0300"
                }]
            },{
                id:"North Europe",
                sub:[{
                    id:"Denmark",
                    v:"+0100",
                    tag:"04F03|10L03"
                },{
                    id:"Faroe Is.(DK)",
                    v:"+0100"
                },{
                    id:"Finland",
                    v:"+0200",
                    tag:"03L01|10L01"
                },{
                    id:"Iceland",
                    v:"+0000"
                },{
                    id:"Jan Mayen(Norway)",
                    v:"-0100"
                },{
                    id:"Norwegian",
                    v:"+0100"
                },{
                    id:"Svalbard(NORWAY)",
                    v:"+0100"
                },{
                    id:"Sweden",
                    v:"+0100",
                    tag:"03L01|10L01"
                }]
            },{
                id:"Eastern Europe",
                sub:[{
                    id:"Armenia",
                    v:"+0400"
                },{
                    id:"Austria",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Azerbaijan",
                    v:"+0400"
                },{
                    id:"Belarus",
                    v:"+0200",
                    tag:"03L03|10L03"
                },{
                    id:"Czech",
                    v:"+0100"
                },{
                    id:"Estonia",
                    v:"+0200"
                },{
                    id:"Georgia",
                    v:"+0500"
                },{
                    id:"Germany",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Hungarian",
                    v:"+0100"
                },{
                    id:"Latvia",
                    v:"+0200"
                },{
                    id:"Liechtenstein",
                    v:"+0100"
                },{
                    id:"Lithuania",
                    v:"+0200"
                },{
                    id:"Moldova",
                    v:"+0200"
                },{
                    id:"Poland",
                    v:"+0100"
                },{
                    id:"Rumania",
                    v:"+0200"
                },{
                    id:"Russia(Moscow)",
                    v:"+0300",
                    tag:"03L03|10L03"
                },{
                    id:"Slovakia",
                    v:"+0100"
                },{
                    id:"Switzerland",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Ukraine",
                    v:"+0200"
                },{
                    id:"Ukraine(Simferopol)",
                    v:"+0300"
                }]
            },{
                id:"Western Europe",
                sub:[{
                    id:"Andorra",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Belgium",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Channel Is.(UK)",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"France",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Gibraltar(UK)",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Ireland",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"Isle of Man(UK)",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"Luxembourg",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Monaco",
                    v:"+0100"
                },{
                    id:"Netherlands",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"United Kingdom",
                    v:"+0000",
                    tag:"03L01|10L01"
                }]
            },{
                id:"South Europe",
                sub:[{
                    id:"Albania",
                    v:"+0100"
                },{
                    id:"Bosnia",
                    v:"+0100"
                },{
                    id:"Bulgaria",
                    v:"+0200"
                },{
                    id:"Croatia",
                    v:"+0100"
                },{
                    id:"Greece",
                    v:"+0200",
                    tag:"03L01|10L01"
                },{
                    id:"Holy See",
                    v:"+0100"
                },{
                    id:"Italy",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Macedonia",
                    v:"+0100"
                },{
                    id:"Malta",
                    v:"+0100"
                },{
                    id:"Montenegro",
                    v:"+0100"
                },{
                    id:"Portugal",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"San Marino",
                    v:"+0100"
                },{
                    id:"Serbia",
                    v:"+0100"
                },{
                    id:"Slovenia",
                    v:"+0100"
                },{
                    id:"Span",
                    v:"+0100",
                    tag:"03L01|10L01"
                }]
            },{
                id:"North America",
                sub:[{
                    id:"Canada(AST)",
                    v:"-0400",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(CST)",
                    v:"-0600",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(EST)",
                    v:"-0500",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(MST)",
                    v:"-0700",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(NST)",
                    v:"-0330",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(PST)",
                    v:"-0800",
                    tag:"04F02|10L02"
                },{
                    id:"Greenland(DK)",
                    v:"-0300"
                },{
                    id:"US(Central)",
                    v:"-0600",
                    tag:"03S02|11F02"
                },{
                    id:"US(Eastern)",
                    v:"-0500",
                    tag:"03S02|11F02"
                },{
                    id:"US(Mountain)",
                    v:"-0700",
                    tag:"03S02|11F02"
                },{
                    id:"US(Pacific)",
                    v:"-0800",
                    tag:"03S02|11F02"
                },{
                    id:"US(Alaska)",
                    v:"-0900"
                },{
                    id:"US(Arizona)",
                    v:"-0700"
                }]
            },{
                id:"South America",
                sub:[{
                    id:"Anguilla(UK)",
                    v:"-0400"
                },{
                    id:"Antigua&amp;Barbuda",
                    v:"-0400"
                },{
                    id:"Antilles(NL)",
                    v:"-0400"
                },{
                    id:"Argentina",
                    v:"-0300"
                },{
                    id:"Aruba(NL)",
                    v:"-0400"
                },{
                    id:"Bahamas",
                    v:"-0500"
                },{
                    id:"Barbados",
                    v:"-0400"
                },{
                    id:"Belize",
                    v:"-0600"
                },{
                    id:"Bolivia",
                    v:"-0400"
                },{
                    id:"Brazil(AST)",
                    v:"-0500",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(EST)",
                    v:"-0300",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(FST)",
                    v:"-0200",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(WST)",
                    v:"-0400",
                    tag:"10F03|02L03"
                },{
                    id:"British Virgin Is.(UK)",
                    v:"-0400"
                },{
                    id:"Cayman Is.(UK)",
                    v:"-0500"
                },{
                    id:"Chilean",
                    v:"-0300",
                    tag:"10F03|03F03"
                },{
                    id:"Chilean(Hanga Roa)",
                    v:"-0500",
                    tag:"10F03|03F03"
                },{
                    id:"Colombia",
                    v:"-0500"
                },{
                    id:"Costa Rica",
                    v:"-0600"
                },{
                    id:"Cuba",
                    v:"-0500",
                    tag:"04 13|10L03"
                },{
                    id:"Dominican",
                    v:"-0400"
                },{
                    id:"Ecuador",
                    v:"-0500"
                },{
                    id:"El Salvador",
                    v:"-0600"
                },{
                    id:"Falklands",
                    v:"-0300",
                    tag:"09F03|04F03"
                },{
                    id:"Grenada",
                    v:"-0400"
                },{
                    id:"Guadeloupe(FR)",
                    v:"-0400"
                },{
                    id:"Guatemala",
                    v:"-0600"
                },{
                    id:"Guiana(FR)",
                    v:"-0300"
                },{
                    id:"Guyana",
                    v:"-0400"
                },{
                    id:"Haiti",
                    v:"-0500"
                },{
                    id:"Honduras",
                    v:"-0600"
                },{
                    id:"Jamaica",
                    v:"-0500"
                },{
                    id:"Martinique(FR)",
                    v:"-0400"
                },{
                    id:"Mexico(Mazatlan)",
                    v:"-0700"
                },{
                    id:"Mexico(Tijuana)",
                    v:"-0800"
                },{
                    id:"Mexico(Mexico)",
                    v:"-0600"
                },{
                    id:"Montserrat(UK)",
                    v:"-0400"
                },{
                    id:"Nicaragua",
                    v:"-0500"
                },{
                    id:"Panama",
                    v:"-0500"
                },{
                    id:"Paraguay",
                    v:"-0400",
                    tag:"10F03|02L03"
                },{
                    id:"Peru",
                    v:"-0500"
                },{
                    id:"Puerto Rico(US)",
                    v:"-0400"
                },{
                    id:"So. Georgia&amp;So. Sandwich Is.(UK)",
                    v:"-0200"
                },{
                    id:"St. Kitts&amp;Nevis",
                    v:"-0400"
                },{
                    id:"St. Lucia",
                    v:"-0400"
                },{
                    id:"St. Vincent&amp;Grenadines",
                    v:"-0400"
                },{
                    id:"Suriname",
                    v:"-0300"
                },{
                    id:"Trinidad&amp;Tobago",
                    v:"-0400"
                },{
                    id:"Turks&amp;Caicos Is.(UK)",
                    v:"-0500"
                },{
                    id:"Uruguay",
                    v:"-0300"
                },{
                    id:"Venezuela",
                    v:"-0400"
                },{
                    id:"Virgin Is.(US)",
                    v:"-0400"
                }]
            },{
                id:"Africa(North)",
                sub:[{
                    id:"Algeria",
                    v:"+0100"
                },{
                    id:"Egypt",
                    v:"+0200",
                    tag:"04L53|09L43"
                },{
                    id:"Libyan",
                    v:"+0200"
                },{
                    id:"Morocco",
                    v:"+0000"
                },{
                    id:"Sudan",
                    v:"+0200"
                },{
                    id:"Tunisia",
                    v:"+0100"
                }]
            },{
                id:"Africa(Western)",
                sub:[{
                    id:"Benin",
                    v:"+0100"
                },{
                    id:"Burkina Faso",
                    v:"+0000"
                },{
                    id:"Canary Is.(SP)",
                    v:"-0100"
                },{
                    id:"Cape Verde",
                    v:"-0100"
                },{
                    id:"Chad",
                    v:"+0100"
                },{
                    id:"Gambia",
                    v:"+0000"
                },{
                    id:"Ghana",
                    v:"+0000"
                },{
                    id:"Guinea",
                    v:"+0000"
                },{
                    id:"Guinea-Bissau",
                    v:"+0000"
                },{
                    id:"Ivory Coast",
                    v:"+0000"
                },{
                    id:"Liberia",
                    v:"+0000"
                },{
                    id:"Mali",
                    v:"+0000"
                },{
                    id:"Mauritania",
                    v:"+0000"
                },{
                    id:"Niger",
                    v:"+0100"
                },{
                    id:"Nigeria",
                    v:"+0100"
                },{
                    id:"Senegal",
                    v:"+0000"
                },{
                    id:"Sierra Leone",
                    v:"+0000"
                },{
                    id:"Togo",
                    v:"+0000"
                },{
                    id:"Western Sahara",
                    v:"+0000"
                }]
            },{
                id:"Africa(Central)",
                sub:[{
                    id:"Cameroon",
                    v:"+0100"
                },{
                    id:"Cen.African Rep.",
                    v:"+0100"
                },{
                    id:"Congo,Democratic",
                    v:"+0100"
                },{
                    id:"Congo,Republic",
                    v:"+0100"
                },{
                    id:"Equatorial Guinea",
                    v:"+0100"
                },{
                    id:"Gabon",
                    v:"+0100"
                },{
                    id:"Sao Tome&amp;Principe",
                    v:"+0000"
                }]
            },{
                id:"Africa(East)",
                sub:[{
                    id:"Burundi",
                    v:"+0200"
                },{
                    id:"Comoros",
                    v:"+0300"
                },{
                    id:"Djibouti",
                    v:"+0300"
                },{
                    id:"Eritrea",
                    v:"+0300"
                },{
                    id:"Ethiopia",
                    v:"+0300"
                },{
                    id:"Kenya",
                    v:"+0300"
                },{
                    id:"Madagascar",
                    v:"+0300"
                },{
                    id:"Malawi",
                    v:"+0200"
                },{
                    id:"Mauritius",
                    v:"+0400"
                },{
                    id:"Mayotte(FR)",
                    v:"+0300"
                },{
                    id:"Mozambique",
                    v:"+0200"
                },{
                    id:"Reunion(FR)",
                    v:"+0400"
                },{
                    id:"Rwanda",
                    v:"+0200"
                },{
                    id:"Seychelles",
                    v:"+0300"
                },{
                    id:"Somalia",
                    v:"+0300"
                },{
                    id:"Tanzania",
                    v:"+0300"
                },{
                    id:"Uganda",
                    v:"+0300"
                }]
            },{
                id:"Africa(South)",
                sub:[{
                    id:"Angola",
                    v:"+0100"
                },{
                    id:"Botswana",
                    v:"+0200"
                },{
                    id:"Lesotho",
                    v:"+0200"
                },{
                    id:"Namibia",
                    v:"+0200",
                    tag:"09F03|04F03"
                },{
                    id:"Saint Helena(UK)",
                    v:"-0100"
                },{
                    id:"South Africa",
                    v:"+0200"
                },{
                    id:"Swaziland",
                    v:"+0200"
                },{
                    id:"Zambia",
                    v:"+0200"
                },{
                    id:"Zimbabwe",
                    v:"+0200"
                }]
            },{
                id:"Oceania",
                sub:[{
                    id:"American Samoa(US)",
                    v:"-1100"
                },{
                    id:"Australia(Adelaide)",
                    v:"+0930",
                    sub:"10L03|03L03"
                },{
                    id:"Australia(Brisbane)",
                    v:"+1000"
                },{
                    id:"Australia(Darwin)",
                    v:"+0930"
                },{
                    id:"Australia(Hobart)",
                    v:"+1000",
                    sub:"10L03|03L03"
                },{
                    id:"Australia(Perth)",
                    v:"+0800"
                },{
                    id:"Australia(Sydney)",
                    v:"+1000",
                    sub:"10L03|03L03"
                },{
                    id:"Cook Islands(NZ)",
                    v:"-1000"
                },{
                    id:"Eniwetok",
                    v:"-1200"
                },{
                    id:"Fiji",
                    v:"+1200",
                    sub:"11F03|02L03"
                },{
                    id:"Guam",
                    v:"+1000"
                },{
                    id:"Hawaii(US)",
                    v:"-1000"
                },{
                    id:"Kiribati",
                    v:"+1100"
                },{
                    id:"Marshall Is.",
                    v:"+1200"
                },{
                    id:"Micronesia",
                    v:"+1000"
                },{
                    id:"Midway Is.(US)",
                    v:"-1100"
                },{
                    id:"Nauru Rep.",
                    v:"+1200"
                },{
                    id:"New Calednia(FR)",
                    v:"+1100"
                },{
                    id:"New Zealand",
                    v:"+1200",
                    sub:"10F03|04F63"
                },{
                    id:"New Zealand(CHADT)",
                    v:"+1245",
                    sub:"10F03|04F63"
                },{
                    id:"Niue(NZ)",
                    v:"-1100"
                },{
                    id:"Nor. Mariana Is.",
                    v:"+1000"
                },{
                    id:"Palau",
                    v:"+0900"
                },{
                    id:"Papua New Guinea",
                    v:"+1000"
                },{
                    id:"Pitcairn Is.(UK)",
                    v:"-0830"
                },{
                    id:"Polynesia(FR)",
                    v:"-1000"
                },{
                    id:"Solomon Is.",
                    v:"+1100"
                },{
                    id:"Tahiti",
                    v:"-1000"
                },{
                    id:"Tokelau(NZ)",
                    v:"-1100"
                },{
                    id:"Tonga",
                    v:"+1300",
                    tag:"10F63|04F63"
                },{
                    id:"Tuvalu",
                    v:"+1200"
                },{
                    id:"Vanuatu",
                    v:"+1100"
                },{
                    id:"Western Samoa",
                    v:"-1100"
                },{
                    id:"Data Line",
                    v:"-1200"
                }]
            }
        ],
        //map like: MILLISECOND <=> ms
        _mapKeys:function(obj){
            var self=this, t=self._key2, m=self._key1;
            for(var i=0,l=m.length;i<l;i++)
                obj[t[i]]=obj[m[i]];
        },
        //get valid unit
        _validUnit:function(unit){
            return this.UNIT[unit]?unit:'d';
        },
        _isDate:function(target)  {return !!target && target.constructor == Date},
        _date:function(value,df){return this._isDate(value)?value:this._isDate(df)?df:new Date},
        _isNumb:function(target)  {return typeof target == 'number' && isFinite(target)},
        _numb:function(value,df){return this._isNumb(value)?value:this._isNumb(df)?df:0},
        //time Zone like: -8
        _timeZone:((new Date).getTimezoneOffset()/60),
        //sun
        firstDayOfWeek:0,

        /*get specific date unit
        *
        */
        get:function(date, unit, timeZone, firstDayOfWeek){
            var self=this;

            date = self._date(date);
            timeZone=self._numb(timeZone, self._timeZone);
            unit = self._validUnit(unit);
            firstDayOfWeek = self._numb(firstDayOfWeek ,self.firstDayOfWeek );

            var timeShift = timeZone * self.TIMEUNIT.h,
                date2 = new Date(date.getTime() - timeShift),
                map = arguments.callee.map || ( arguments.callee.map = {
                    ms:function(d){return d.getUTCMilliseconds()},
                    s:function(d){return d.getUTCSeconds()},
                    n:function(d){return d.getUTCMinutes()},
                    h :function(d){return d.getUTCHours()},
                    d:function(d){return d.getUTCDate()},
                    ww:function(d,firstDayOfWeek){return linb.date.getWeek(d, 0, firstDayOfWeek)},
                    w :function(d){return d.getUTCDay()},
                    m:function(d){return d.getUTCMonth()},
                    q:function(d){return parseInt((d.getUTCMonth()+3)/3-1)},
                    y :function(d){return d.getUTCFullYear()},
                    de:function(d){return parseInt(d.getUTCFullYear()/10)},
                    c:function(d){return parseInt(d.getUTCFullYear()/100)}
                });
            return map[unit](date2,firstDayOfWeek);
        },
        /*
        * fix(1,3,'0') => '100'
        */
        fix:function(s,l,c){
            l=l||2;
            c=c||'0';
            s=String(s);
            if(s.length<l)
                for(var i=s.length;i<l;i++)
                    s=c+s;
            return s;
        },
        /*add specific unit to date
        *
        */
        add: function(date, unit, count, timeZone ){
            var self=this;

            date = self._date(date);
            timeZone=self._numb(timeZone, self._timeZone);
            unit = self._validUnit(unit);

            var timeShift = timeZone * self.TIMEUNIT.h,
                date2 = new Date(date.getTime() - timeShift),
                tu=self.TIMEUNIT,
                map;

            if(!(map=arguments.callee.map)){
                map=arguments.callee.map = {
                    MILLISECOND:function(date,count){date.setTime(date.getTime() + count*tu.ms)},
                    SECOND:function(date,count){date.setTime(date.getTime() + count*tu.s)},
                    MINUTE:function(date,count){date.setTime(date.getTime() + count*tu.n)},
                    HOUR:function(date,count){date.setTime(date.getTime() + count*tu.h)},
                    DAY:function(date,count){date.setTime(date.getTime() + count*tu.d)},
                    WEEK:function(date,count){date.setTime(date.getTime() + count*tu.ww)},
                    MONTH:function(date,count){
                        var a=date.getUTCDate(),b;
                        count = date.getUTCMonth() + count;
                        this.YEAR(date, Math.floor(count/12));
                        date.setUTCMonth((count%12+12)%12);
                        if((b=date.getUTCDate())!=a)
                            this.DAY(date, -b)
                    },
                    QUARTER:function(date,count){this.MONTH(date,count*3)},
                    YEAR:function(date,count){
                        var a=date.getUTCDate(),b;
                        date.setUTCFullYear(date.getUTCFullYear() + count)
                        if((b=date.getUTCDate())!=a)
                            this.DAY(date, -b)
                    },
                    DECADE:function(date,count){this.YEAR(date,10*count)},
                    CENTURY:function(date,count){this.YEAR(date,100*count)}
                };
                self._mapKeys(map);
            }
            map[unit](date2, count);
            date2.setTime(date2.getTime() + timeShift);
            return date2;
        },
        /*get specific unit diff between d1 and d2
        *
        */
        diff:function(d1, d2, unit, timeZone, firstDayOfWeek) {
            var self=this;

            d1 = self._date(d1);
            d2 = self._date(d2);
            timeZone=self._numb(timeZone, self._timeZone);
            unit = self._validUnit(unit);
            firstDayOfWeek = self._numb(firstDayOfWeek ,self.firstDayOfWeek );

            var tu=self.TIMEUNIT,
                timeShift = timeZone * tu.h,
                date1 = new Date(d1.getTime() - timeShift),
                date2 = new Date(d2.getTime() - timeShift),
                map;

            if(!(map=arguments.callee.map)){
                map = arguments.callee.map = {
                    MILLISECOND:function(date1,date2){return date2.getTime()-date1.getTime()},
                    SECOND:function(date1,date2){
                        var d1 = self.getRoundDown(date1,'s'),
                            d2 = self.getRoundDown(date2,'s'),
                            t=d2.getTime()-d1.getTime();
                        return t/tu.s;
                    },
                    MINUTE:function(date1,date2){
                        var d1 = self.getRoundDown(date1,'n'),
                            d2 = self.getRoundDown(date2,'n'),
                            t=d2.getTime()-d1.getTime();
                        return t/tu.n;
                    },
                    HOUR:function(date1,date2){
                        var d1 = self.getRoundDown(date1,'h'),
                            d2 = self.getRoundDown(date2,'h'),
                            t=d2.getTime()-d1.getTime();
                        return t/tu.h;
                    },
                    DAY:function(date1,date2,timeZone){
                        var d1 = self.getRoundDown(date1,'d',1,timeZone),
                            d2 = self.getRoundDown(date2,'d',1,timeZone),
                            t=d2.getTime()-d1.getTime();
                        return t/tu.d;
                    },
                    WEEK:function(date1,date2,timeZone,firstDayOfWeek){
                        var d1 = self.getRoundDown(date1,'ww',1,timeZone,firstDayOfWeek),
                            d2 = self.getRoundDown(date2,'ww',1,timeZone,firstDayOfWeek),
                            t=d2.getTime()-d1.getTime();
                        return t/tu.ww;
                    },
                    MONTH:function(date1,date2){return (date2.getUTCFullYear()-date1.getUTCFullYear())*12 + (date2.getUTCMonth()-date1.getUTCMonth())},
                    QUARTER:function(date1,date2){return (date2.getUTCFullYear()-date1.getUTCFullYear())*4 + parseInt((date2.getUTCMonth()-date1.getUTCMonth())/3)},
                    YEAR:function(date1,date2){return parseInt((date2.getUTCFullYear()-date1.getUTCFullYear()))},
                    DECADE:function(date1,date2){return parseInt((date2.getUTCFullYear()-date1.getUTCFullYear())/10)},
                    CENTURY:function(date1,date2){return parseInt((date2.getUTCFullYear()-date1.getUTCFullYear())/100)}
                };
                self._mapKeys(map);
            }
            return map[unit](date1,date2,timeZone,firstDayOfWeek);
        },
        /*get the first unit begin of certain unit
        *
        */
        getRoundDown : function(date, unit,  count, timeZone, firstDayOfWeek) {
            var self=this;

            date = self._date(date);
            timeZone=self._numb(timeZone, self._timeZone);
            unit = self._validUnit(unit);
            firstDayOfWeek = self._numb(firstDayOfWeek ,self.firstDayOfWeek );

            count=self._numb(count,1);

            var tu=self.TIMEUNIT,
                timeShift = timeZone * tu.h,
                date2 = new Date(date.getTime() - timeShift),
                map;

            if(!(map=arguments.callee.map)){
                var clearInDay = function(d) {
                        d.setUTCMilliseconds(0);
                        d.setUTCSeconds(0);
                        d.setUTCMinutes(0);
                        d.setUTCHours(0);
                    },
                    clearInYear = function(d) {
                        clearInDay(d);
                        d.setUTCDate(1);
                        d.setUTCMonth(0);
                    };

                map = arguments.callee.map = {
                    MILLISECOND:function(date,count){
                        var x = date.getUTCMilliseconds();
                        date.setUTCMilliseconds(x - (x % count));
                    },
                    SECOND:function(date,count){
                        date.setUTCMilliseconds(0);
                        var x = date.getUTCSeconds();
                        date.setUTCSeconds(x - (x % count));
                    },
                    MINUTE:function(date,count){
                        date.setUTCMilliseconds(0);
                        date.setUTCSeconds(0);
                        var x = date.getUTCMinutes();
                        date.setTime(date.getTime() - (x % count) * tu.n);
                    },
                    HOUR:function(date,count){
                        date.setUTCMilliseconds(0);
                        date.setUTCSeconds(0);
                        date.setUTCMinutes(0);

                        var x = date.getUTCHours();
                        date.setUTCHours(x - (x % count));
                    },
                    DAY:function(date,count){
                        clearInDay(date);
                        var x=date.getUTCDate();
                        date.setUTCDate(x - (x % count));
                    },
                    WEEK:function(date,count){
                        clearInDay(date);

                        var d = (date.getUTCDay() + 7 - firstDayOfWeek) % 7,d2,x
                            a=new Date();
                         date.setTime(date.getTime() - d * tu.d);
                        clearInYear(a);
                        a.setUTCFullYear(date.getUTCFullYear());
                        d2 = (a.getUTCDay() + 7 - firstDayOfWeek) % 7;
                        a.setTime(a.getTime() - d2 * tu.d);

                        x= (date.getTime()-a.getTime())/tu.d/7;

                        date.setTime(date.getTime() - (x % count) * tu.ww);
                    },
                    MONTH:function(date,count){
                        clearInDay(date);
                        date.setUTCDate(1);
                        var x = date.getUTCMonth();
                        date.setUTCMonth(x - (x % count));
                    },
                    QUARTER:function(date,count){
                        count=self._numb(count,1);
                        return this.MONTH(date, count*3);
                    },
                    YEAR:function(date,count){
                        clearInYear(date);
                        var x = date.getUTCFullYear();
                        date.setUTCFullYear(x - (x % count));
                    },
                    DECADE:function(date,count){
                        clearInYear(date);
                        date.setUTCFullYear(Math.floor(date.getUTCFullYear() / 10) * 10);
                    },
                    CENTURY:function(date,count){
                        clearInYear(date);
                        date.setUTCFullYear(Math.floor(date.getUTCFullYear() / 100) * 100);
                    }
                };
                self._mapKeys(map);

            }
            map[unit](date2,count);
            date2.setTime(date2.getTime() + timeShift);
            return date2;
        },
        /*get the last unit begin of certain unit
        *
        */
        getRoundUp : function(date, unit, count, timeZone,firstDayOfWeek) {
            var self=this;

            date = self._date(date);
            timeZone=self._numb(timeZone, self._timeZone);
            unit = self._validUnit(unit);
            firstDayOfWeek = self._numb(firstDayOfWeek ,self.firstDayOfWeek );

            count=self._numb(count,1);

            var originalTime = date.getTime(),
                date2 = self.getRoundDown(date, unit, count, timeZone, firstDayOfWeek);
            if (date2.getTime() < originalTime)
                date2=self.add(date2, unit, count, timeZone);
            return date2;
        },
        /*get specific timezone(fake) date from local date format
        *flag==true, unpack
        */
        _pack:function(date, timeZone, flag){
            var self=this;
            date=self._date(date);
            return new Date(date.getTime() + (flag?1:-1)*(timeZone - self._timeZone)*self.TIMEUNIT.h);
        },
        /*fake date for a certain timezone (based on the current timezone of "Date object")
        */
        packTimeZone:function(date, timeZone){
            return this._pack(date,timeZone);
        },
        /*return to real date from packTimezone
        */
        unpackTimeZone:function(date, timeZone){
            return this._pack(date,timeZone,true);
        },
        /*get week
        *
        */
        getWeek:function(date, timeZone, firstDayOfWeek){
            var self=this,y;
            date=self._date(date);
            timeZone = self._numb(timeZone, self._timeZone);
            firstDayOfWeek = self._numb(firstDayOfWeek ,self.firstDayOfWeek ),
            y=date.getUTCFullYear();

            date = self.add(self.getRoundDown(date, 'ww', 1, timeZone),'d',6,timeZone);

            if(date.getUTCFullYear()!=y)return 1;

            var date2 = self.getRoundDown(date, 'y', 1, timeZone);
            date2 = self.add(self.getRoundDown(date2, 'ww', 1, timeZone),'d',6,timeZone);

            return self.diff(date2, date, 'ww')+1;
        },
        getDayInYear:function(date, timeZone){
            var self=this;
            date=self._date(date);
            timeZone = self._numb(timeZone, self._timeZone);
            var date2 = self.getRoundDown(date, 'y', 1, timeZone);
            return self.diff(date2, date, 'd');
        },
        parse:function(s){
            s=String(s);
            var self=this,utc,
                me=arguments.callee,
                dp=me.dp||(me.dp={
                  FullYear: 2,
                  Month: 4,
                  Date: 6,
                  Hours: 8,
                  Minutes: 10,
                  Seconds: 12,
                  Milliseconds: 14
                }),
                match = s.match(me.iso||(me.iso=/^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/)),
                date = new Date(0)
                ;
            if(match){
                //month
                if(match[4])match[4]--;
                //ms to 3 digits
                if (match[15]>=5)match[14]++;
                utc = match[16]||match[18]?"UTC":"";
                for (var i in dp) {
                    var v = match[dp[i]];
                    if(!v)continue;
                    date["set" + utc + i](v);
                    if (date["get" + utc + i]() != match[dp[i]])
                        return null;
                }
                if(match[18]){
                    var h = Number(match[17] + match[18]),
                        m = Number(match[17] + (match[20] || 0));
                    date.setUTCMinutes(date.getUTCMinutes() + (h * 60) + m);
                }
                return date;
            }else{
                var r=Date.parse(s);
                return r?date.setTime(r) && date:null;
            }
        },
        getText:function(date, unit, timeZone, firstDayOfWeek){
            var self=this;
            date = self._date(date);
            timeZone=self._numb(timeZone, self._timeZone);
            firstDayOfWeek = self._numb(firstDayOfWeek ,self.firstDayOfWeek );
            unit=unit||'';
            return this.TEXTFORMAT[unit](date,timeZone,firstDayOfWeek);
        }
    }
});