function TimeStatistic() {
    var TimeStatis = new Object;
    TimeStatis.id = "222222222222222222";// 此值不使用，在后台生成
    TimeStatis.plat_id = "Unknown";
    TimeStatis.title = document.title;
    TimeStatis.openid = "";
    TimeStatis.phone_no = "";
    TimeStatis.url = window.location.href;
    TimeStatis.refer = window.document.referrer;
    TimeStatis.time_begin = new Date().getTime();
    TimeStatis.time_end = "";
    TimeStatis.ip = returnCitySN.cip;
    TimeStatis.location = returnCitySN.cname;
    TimeStatis.params = "";
    TimeStatis.description = "";
    TimeStatis.isrefresh = false;
    TimeStatis.iosBack = false;
    TimeStatis.ifios = false;
    TimeStatis.issave = false;
    TimeStatis.window = '';

    TimeStatis.ajax = function() {

    };

    TimeStatis.init = function(window, ajax, plat_id, openid, phone_no, ip,
                               params, description) {
        if (plat_id != undefined && plat_id != '') {
            TimeStatis.plat_id = plat_id;
        }

        if (openid != undefined && openid != '') {
            TimeStatis.openid = openid;
        }

        if (phone_no != undefined && phone_no != '') {
            TimeStatis.phone_no = phone_no;
        }

        if (ip != undefined && ip != '') {
            TimeStatis.ip = ip;
        }

        if (params != undefined && params != '') {
            TimeStatis.params = params;
        }

        if (description != undefined && description != '') {
            TimeStatis.description = description;
        }
        TimeStatis.window = window;
        TimeStatis.ajax = ajax;
        // TimeStatis.getIp();
        //alert("调试信息：before check!");
        if(TimeStatis.isIOS(window)){
            //alert("is IOS");
            TimeStatis.pushHistory();
            window.addEventListener("popstate", TimeStatis.popstate, false);
        }else{
            //支付宝服务窗回退按钮
            if(window.navigator.userAgent.indexOf("AlipayClient") != -1){
                document.addEventListener('back', function(e){
                    //e.preventDefault();
                    AlipayJSBridge.call('popTo', {index: 0});
                    TimeStatis.onunload();
                }, false);
            }
        }

        window.onunload = TimeStatis.onunload;
    }

    TimeStatis.onunload = function() {
        // alert("before close");
        if (!TimeStatis.isrefresh) {
            TimeStatis.setTime_end(new Date().getTime());
            TimeStatis.saveStatistic();
            //alert("before close check");
            //ios处理
            if(TimeStatis.ifios){
                //alert("ios close check");
                //TimeStatis.window.history.back();
                if(AlipayJSBridge) {
                    AlipayJSBridge.call('closeWebview');
                }
                else if(WeixinJSBridge) {
                    WeixinJSBridge.call('closeWindow');
                }
                TimeStatis.window.open("","_self").close();
                TimeStatis.window.history.go(-1);
                //alert("ios close check end");
            }
        }
    }

    TimeStatis.popstate = function(){
        //alert("popstate:");
        if(TimeStatis.iosBack){
            TimeStatis.onunload();
        }else{
            TimeStatis.iosBack = true;
        }
    }

    TimeStatis.pushHistory = function() {
        var state = {
            title: "title",
            url: "#"
        };
        TimeStatis.window.history.pushState(state, "title", "#");
    }

    TimeStatis.getIp = function() {
        //alert("get ip");
        TimeStatis.ajax({
            url : "http://chaxun.1616.net/s.php",
            data : "type=ip&output=json&callback=?&_=" + Math.random(),
            type : "post",
            dataType : "text",
            async : true, // 异步
            success : function(data) {
                alert(data);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
    }

    TimeStatis.setOpenid = function(openid) {
        TimeStatis.openid = openid;
    }

    TimeStatis.setPhone_no = function(phone_no) {
        TimeStatis.phone_no = phone_no;
    }

    TimeStatis.setTime_end = function(time_end) {
        TimeStatis.time_end = time_end;
    }

    TimeStatis.setParams = function(params) {
        TimeStatis.params = params;
    }

    TimeStatis.getParams = function() {
        return TimeStatis.params;
    }

    TimeStatis.setPlat_id = function(plat_id) {
        TimeStatis.plat_id = plat_id;
    }

    TimeStatis.setIp = function(ip) {
        TimeStatis.ip = ip;
    }

    TimeStatis.setDescription = function(description) {
        TimeStatis.description = description;
    }

    TimeStatis.isIOS = function(window) {
        var userAgentInfo = window.navigator.userAgent;
        var Agents = [ "iPhone","iPad"];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        TimeStatis.ifios = flag;
        return flag;
    }

    TimeStatis.saveStatistic = function() {
        if(TimeStatis.issave){
            return;
        }
        TimeStatis.issave = true;
        var urlData = "id=" + TimeStatis.id + "&" + "plat_id="
            + TimeStatis.plat_id + "&" + "title=" + TimeStatis.title + "&"
            + "openid=" + TimeStatis.openid + "&" + "phone_no="
            + TimeStatis.phone_no + "&" + "url=" + TimeStatis.url + "&"
            + "time_begin=" + TimeStatis.time_begin + "&" + "time_end="
            + TimeStatis.time_end + "&" + "ip=" + TimeStatis.ip + "&"
            + "params=" + TimeStatis.params + "&" + "description="
            + TimeStatis.description+"&"+"refer="+TimeStatis.refer
            + "&"+"location="+TimeStatis.location+"&"+"r="+Math.random();
        //alert("urlData:" + urlData);
        TimeStatis
            .ajax({
                url : "http://wap.nx.10086.cn/CustomActivity/globleStatistic_stayTime?randomTime="+new Date().getTime(),
                data : urlData,
                type : "post",
                dataType : "text",
                cache: false,
                async : false, // 同步
                success : function(data) {
                }
            });
    }

    return TimeStatis;
}