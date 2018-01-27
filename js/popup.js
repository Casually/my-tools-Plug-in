var pater_nodes = document.getElementById("menu-all-nodes");

$.post(
    "http://yzt.casually.cc/menu-type.json",
    {},
    function (data) {
        var d;
        try {
            d = JSON.parse(data)
        } catch (e) {
            console.log(e);
            d = data;
        }
        combinationMenu(d.menuType, d.menuUrl);
    }
)


/**
 * 组合树形菜单
 * @param type 类型
 * @param menu 菜单
 * @param level 类型等级
 */
function combinationMenu(type, menu, level, eles) {
    var c_obj;
    var size = 0;
    var eles_all = new Array();
    if (is_null(level)) {
        level = 0;
    }
    if (is_null(eles)) {//第一次将最外层的分类加载
        eles = new Array();
        for (var i = 0; i < type.length; i++) {
            if (type[i].level === level) {
                console.log(type[i].name);
                c_obj = {
                    "otag": "div",
                    "oclass": "menu-node menu_close",
                    "ohtml": "<span class='span-title'>" + type[i].name + "</span>",
                    "oid": type[i].id
                }
                eles_all[size] = createNode(c_obj);
                eles[size] = createNode(c_obj);
                pater_nodes.appendChild(eles_all[size]);
                size++;
            }
        }
    } else {//后续的分类加载
        for (var i = 0; i < eles.length; i++) {
            var is_next = false;
            for (var j = 0; j < type.length; j++) {
                if (eles[i].id === type[j].paterId && type[j].level === level) {
                    console.log(type[j].name);
                    c_obj = {
                        "otag": "div",
                        "oclass": "menu-node menu_close",
                        "ohtml": "<span class='span-title'>" + type[j].name + "</span>",
                        "oid": type[j].id
                    }
                    eles_all[size] = createNode(c_obj);
                    eles[i].appendChild(eles_all[size]);
                    is_next = true;
                }
            }
            if (is_next) {
                size++;
            }
        }
    }

    for (var j = 0; j < menu.length; j++) {//将菜单加载到对应的分类中
        for (var n = 0; n < eles.length; n++) {
            if (menu[j].typeId === eles[n].id) {
                c_obj = {
                    "otag": "div",
                    "oclass": "menu-url",
                    "ohtml": "<span data_url='"+ menu[j].url +"'>" + menu[j].name + "</span>",
                    "oid": menu[j].id
                }
                eles[n].appendChild(createNode(c_obj));
            }
        }
    }

    if (size > 0) {
        level++;
        combinationMenu(type, menu, level, eles_all);
    } else {
        return;
    }
}

/**
 * 点击监听，
 * 菜单的折叠。
 * 连接的打开
 */
document.addEventListener("click", function (ev) {
    var el = ev.toElement;
    if (el.tagName === "SPAN" && (el.className.indexOf("span-title") != -1)) {
        bgcolor(el);
        el = ev.toElement.parentNode;
        switch_div(el);
    } else if (el.tagName === "SPAN" && (el.parentNode.className.indexOf("menu-url") != -1)) {
        open_url(manege_url(el.getAttribute("data_url")));
    } else {
        return;
    }
})

/**
 * 菜单折叠
 * @param el
 */
function switch_div(el) {
    toggleClass(el,"menu_close");
}

/**
 * 选中高亮
 * @param el
 */
function bgcolor(el){
    var cla = getByClass(el.className.split(" ")[0]);
    for(var i = 0;i < cla.length;i++){
        cla[i].style.color = "";
    }
    el.style.color = "red";
}

/**
 * 打开连接
 * @param url
 */
function open_url(url) {
    chrome.tabs.create({
        "url":url
        })
    /*
    chrome.windows.create({
            "url": url
        })*/
}

/**
 * 处理连接
 * @param url
 * @returns {*}
 */
function manege_url(url){
    if(url.substring(0,4) != "http"){
        return "http://" + url;
    }
    return url;
}