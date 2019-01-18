// Start page
wpa._startpage = (function ()
{
var url = '';
var lastpage = '';
var pagetitle = '';
var text = '';
var type = 0;

function onCreate (event) // called only once - bind events here
{
    try{
    common.PutToDebugLog(4, "EVENT, _startpage: onCreate");
    
    j$( window ).resize(function() // window resize handling
    {
        if (j$.mobile.activePage.attr('id') === 'page_startpage')
        {
            MeasureStartpage();
        }
    });

    j$('#startpage_menu_ul').on('click', 'li', function(event)
    {
        MenuItemSelected(j$(this).attr('id'));
    });
    j$("#btn_startpage_menu").on("click", function() { CreateOptionsMenu('#startpage_menu_ul'); });
    j$("#btn_startpage_menu").attr("title", stringres.get("hint_menu"));
    
    j$("#startpage_btnback").on("click", function(e)
    {
        ClosePage();
        e.preventDefault();
    });
    
    j$("#btn_sp_decline").on("click", function()
    {
        common.PutToDebugLog(5, "EVENT, _startpage: button decline onclick");
        ClosePage();
        common.OpenSettings(true);
    });
    
    j$("#btn_sp_accept").on("click", function()
    {
        try{
            common.PutToDebugLog(5, 'EVENT, _startpage: button accept onclick');
            
            var startpage_disp_count = common.GetParameterInt('startpage_disp_count', 0);
            startpage_disp_count++;
            common.SaveParameter('startpage_disp_count', startpage_disp_count.toString());
            
            ClosePage();

        } catch(err) { common.PutToDebugLogException(2, "_startpage: onCreate", err); }
    });
    
    } catch(err) { common.PutToDebugLogException(2, "_startpage: onCreate", err); }
}

function onStart(event)
{
    try{
    common.PutToDebugLog(4, "EVENT, _startpage: onStart");
    global.isStartpageStarted = true;
    
    j$('#page_startpage_content').html('');

    url = common.GetIntentParam(global.intentstartpage, 'url');
    lastpage = common.GetIntentParam(global.intentstartpage, 'lastpage');
    pagetitle = common.GetIntentParam(global.intentstartpage, 'title');
    text = common.GetIntentParam(global.intentstartpage, 'text');
    var typeStr = common.GetIntentParam(global.intentstartpage, 'type');
    if (!common.isNull(typeStr) && common.IsNumber(typeStr))
    {
        type = common.StrToInt(typeStr);
    }

    if (!common.isNull(document.getElementById('startpage_title')))
    {
        if (common.isNull(pagetitle)) { pagetitle = ''; }
        document.getElementById('startpage_title').innerHTML = pagetitle;
    }
    j$("#startpage_title").attr("title", stringres.get("hint_page"));

    if (!common.isNull(document.getElementById('startpage_btnback')))
    {
        document.getElementById('startpage_btnback').innerHTML = '<b>&LT;</b>&nbsp;' + stringres.get("go_back_btn_txt");
    }
    
    MeasureStartpage();
    
    if (common.isNull(lastpage))
    {
        lastpage = '';
    }else
    {
        lastpage = common.Trim(lastpage);
    }
    
    j$("#page_startpage").css("background", "#FFFFFF");
    
    
// 0: display once with OK button, 1: display once with confirmation, 2: display always
    if (type === 2)
    {
        j$("#btn_sp_accept").attr("title", stringres.get("btn_ok"));
        j$("#btn_sp_decline").hide();
        j$("#startpage_btnback").show();
    }
    else if (type === 1)
    {
        j$("#btn_sp_accept").attr("title", stringres.get("btn_accept"));
        j$("#btn_sp_decline").attr("title", stringres.get("btn_decline"));
        j$("#btn_sp_decline").show();
        j$("#startpage_btnback").hide();
    }
    else
    {
        j$("#btn_sp_accept").attr("title", stringres.get("btn_ok"));
        j$("#btn_sp_decline").hide();
        j$("#startpage_btnback").show();
    }


    if (text.length > 5)
    {
        j$('#page_startpage_content').html('<div style="text-align: left; margin: .5em;">' +text + '</div>');
        return;
    }
    else if (!common.isNull(url) && url.length > 0)
    {
        OpenWebpage();
    }
    
    } catch(err) { common.PutToDebugLogException(2, "_startpage: onStart", err); }
}

function MeasureStartpage() // resolve window height size change
{
    try{
    //--var pgh = common.GetDeviceHeight() - 1; j$('#page_startpage').css('min-height', pgh + 'px'); // must be set when softphone is skin in div
    j$('#page_startpage').css('min-height', 'auto'); // must be set when softphone is skin in div

    j$(".separator_line_thick").css( 'background-color', common.HoverCalc(common.getBgColor('#page_startpage'), -30) );
    
    var heightTemp = common.GetDeviceHeight() - j$("#startpage_header").height() - j$("#startpage_footer").height() - j$(".separator_line_thick").height() - 2;

    heightTemp = heightTemp - 3;
    heightTemp = Math.floor(heightTemp);
    j$("#page_startpage_content").height(heightTemp);
    
    j$("#iframe_startpage").width(common.GetDeviceWidth());
    j$("#iframe_startpage").height(heightTemp - 5);
    
    } catch(err) { common.PutToDebugLogException(2, "_startpage: MeasureStartpage", err); }
}

function OpenWebpage()
{
    try{
        
//--    url = 'http://www.mizu-voip.com';
    if (common.isNull(url) || url.length < 3 )
    {
        common.PutToDebugLog(3, 'ERROR, _startpage no url to load: ' + url);
        return;
    }
    
    var width = common.GetDeviceWidth();
    var height = Math.floor( j$('#page_startpage_content').height() - 5);
    
    var iframe = '';
    var pos = url.indexOf('[POST]');
    if (pos > 0)
    {
        var purl = common.Trim(url.substring(0, pos));
        var pdataStr = common.Trim(url.substring(pos + 6));
        var pdata = [];
        var pdataInput = '';
        
        if (!common.isNull(pdataStr) && pdataStr.length > 0)
        {
            pdata = pdataStr.split('&');
            if (common.isNull(pdata)) { pdata = []; }
        }
        
        for (var i = 0; i < pdata.length; i++)
        {
            if (common.isNull(pdata[i]) || pdata[i].length < 2 || pdata[i].indexOf('=') < 1) { continue; }
            
            var name = pdata[i].substring(0, pdata[i].indexOf('='));
            var val = pdata[i].substring(pdata[i].indexOf('=') + 1);
            
            if (common.isNull(name) || name.length < 1 || common.isNull(val)) { continue; }
            
            pdataInput += '<input type="hidden" name="' + name + '" value="' + val + '"/>';
        }

        iframe = '<form id="internalb_post" target="iframe_startpage" method="post" action="' + purl + '">' +
                    pdataInput +
                    '</form>' + 
                    '<iframe allow="microphone; camera" frameborder="0" width="' + width + '" height="' + height + '" name="iframe_startpage" id="iframe_startpage" style="margin:0px; padding:0px;" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"></iframe>' +
                    '<script type="text/javascript">' +
                        'document.getElementById("internalb_post").submit();' +
                    '</script>';
    }else
    {
//--        var iframe = '<iframe frameborder="0" width="' + width + '" height="' + height + '" src="' + url + '" name="iframe_startpage" id="iframe_startpage" style="margin:0px; padding:0px;"></iframe>';
        iframe = '<iframe style="margin:0px; padding:0px; overflow-x: hidden; overflow-y: auto;" allow="microphone; camera" frameborder="0" width="' + width + '" height="' + height + '" src="' + url + '" name="iframe_startpage" id="iframe_startpage" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"></iframe>';
    }

    j$('#page_startpage_content').html(iframe);

    } catch(err) { common.PutToDebugLogException(2, "_startpage: OpenWebpage", err); }
}

var MENUITEM_CLOSE = '#menuitem_startpage_close';

function CreateOptionsMenu (menuId) // adding items to menu, called from html
{
    try{
// remove data transition for windows softphone, because it's slow
    if (common.GetParameter('devicetype') === common.DEVICE_WIN_SOFTPHONE())
    {
        j$( "#btn_startpage_menu" ).removeAttr('data-transition');
    }

    if ( common.isNull(menuId) || menuId.lenght < 1 ) { common.PutToDebugLog(2, "ERROR, _startpage: CreateOptionsMenu menuid null"); return; }

    if (j$(menuId).length <= 0) { common.PutToDebugLog(2, "ERROR, _startpage: CreateOptionsMenu can't get reference to Menu"); return; }
    
    if (menuId.charAt(0) !== '#') { menuId = '#' + menuId; }
    
    j$(menuId).html('');
    j$(menuId).append( '<li id="' + MENUITEM_CLOSE + '"><a data-rel="back">' + stringres.get('menu_close') + '</a></li>' ).listview('refresh');

    return true;
    
    } catch(err) { common.PutToDebugLogException(2, "_startpage: CreateOptionsMenu", err); }
    
    return false;
}

function MenuItemSelected(itemid)
{
    try{
    if (common.isNull(itemid) || itemid.length < 1) { return; }
    
    j$( '#startpage_menu' ).on( 'popupafterclose', function( event )
    {
        j$( '#startpage_menu' ).off( 'popupafterclose' );
        
        switch (itemid)
        {
            case MENUITEM_CLOSE:
                ClosePage();
                break;
        }
    });
    } catch(err) { common.PutToDebugLogException(2, "_startpage: MenuItemSelected", err); }
}

function ClosePage()
{
    try{
    if (lastpage.length < 2)
    {
        j$.mobile.back();

        common.PutToDebugLog(5, 'EVENT, _startpage: ClosePage back');
    }else
    {
        j$.mobile.changePage("#" + lastpage, { transition: "pop", role: "page" });
        
        common.PutToDebugLog(5, 'EVENT, _startpage: ClosePage changepage: ' + lastpage);
    }
    } catch(err) { common.PutToDebugLogException(2, "_startpage: ClosePage", err); }
}

function onStop(event)
{
    try{
    common.PutToDebugLog(4, "EVENT, _startpage: onStop");
    global.isStartpageStarted = false;
    
    j$('#page_startpage_content').html('');
    
    } catch(err) { common.PutToDebugLogException(2, "_startpage: onStop", err); }
}

// public members and methods
return {
    onCreate: onCreate,
    onStart: onStart,
    onStop: onStop
};
})();