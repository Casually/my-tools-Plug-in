var pater_nodes = document.getElementById("menu-all-nodes");
var bg = chrome.extension.getBackgroundPage();
var NodeDatas = bg.NodeDatas;

var _login = localStorage.getItem("_login");
if (_login) {
    bg._login = true;
}
/**
 * 判断是否登录
 */
if (!bg._login) {
    $("#login-view").show();
    $("#tags-view").hide();
    $("#phone").focus();
} else {
    $("#exampleInputAmount").focus();
    $("#login-view").hide();
    $("#tags-view").show();
}


/**
 * 登录
 */
$("#login").click(function (ev) {
    $.post(
        "http://www.casually.cc/casually/login.html",
        {
            "phone": $("#phone").val(),
            "password": $("#passwd").val()
        },
        function (data) {
            bg._login = true;
            localStorage.setItem('_login', true);
        }
    )
    localStorage.setItem('_login', true);
})

$("#exampleInputAmount").focus();
init_node_mune(NodeDatas);
$.post(
    /*"http://yzt.casually.cc/menu-type.json",*/
    "../data/test.json",
    {},
    function (data) {
        /* var d;
         try {
             /!*d = JSON.parse(data);*!/
             d = JSON.parse(bg.NodeDatas);
         } catch (e) {
             console.log(e);
             /!*d = data;*!/
             d = bg.NodeDatas;
         }
         //combinationMenu(d.menuType, d.menuUrl);
         console.table(bg.NodeDatas);
         init_node_mune(d);*/
    }
)

/**
 * 保存书签到网络
 */
$.post(
    // "http://www.casually.cc/casually/webtags.html",
    "http://localhost/collection/synchro",
    {
        "NodeDatas": JSON.stringify(NodeDatas),
        "phone": "13545675856"
    },
    function (data) {
        console.log("同步完成");
    }
)

var click_el;


$("#add_url").click(function (e) {
    var c_obj = {
        "otag": "div",
        "oclass": "menu-url",
        "ohtml": "<span data_url='" + bg.tab_context.url + "'>" + bg.tab_context.title + "</span>",
        "oid": 12
    }

    $.post(
        "",
        {
            "webName": "",
            "webDress": "",
            "webInfo": "",
            "webTypeId": "c6b87125428343d68cb461dbbe36cdd9",
            "webAscriptionUserId": "2"
        },
        function (data) {

        }
    )
    click_el.appendChild(createNode(c_obj));
})

/**
 * 组合树形菜单(废弃)
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
                    "ohtml": "<span data_url='" + menu[j].url + "'>" + menu[j].name + "</span>",
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
 * 遍历生成树形结构
 * @param nodes
 * @param pid
 * @param ele
 */
function init_node_mune(nodes, pid, ele) {
    if (is_null(ele)) {
        ele = pater_nodes;
    }
    if (is_null(pid)) {
        pid = 0;
    }
    for (var i = 0; i < nodes.length; i++) {
        if (parseInt(nodes[i].parentId) === parseInt(pid)) {
            var c_obj = {};
            if (is_null(nodes[i].url)) {
                c_obj = {
                    "otag": "div",
                    "oclass": "menu-node menu_close",
                    "ohtml": "<span class='span-title'>" + nodes[i].name + "</span>",
                    "oid": nodes[i].id,
                    "oattr": [
                        {
                            "name": "title",
                            "type": nodes[i].name
                        }
                    ]
                }
            } else {
                c_obj = {
                    "otag": "div",
                    "oclass": "menu-url",
                    "ohtml": "<span data_url='" + nodes[i].url + "'>" + nodes[i].name + "</span>",
                    "oid": nodes[i].id,
                    "oattr": [
                        {
                            "name": "title",
                            "type": nodes[i].name
                        }
                    ]
                }
            }
            var cele = createNode(c_obj)
            ele.appendChild(cele);
            init_node_mune(nodes, nodes[i].id, cele)
        }
    }
}

/**
 * 生成常用快捷方式
 */
function shortcuKeys() {
    $.post(
        "../data/ShortcutKeys.json",
        {},
        function (datas) {
            var data;
            try {
                data = JSON.parse(datas);
            }catch (e) {
                data = datas;
            }
            for (var i = 0; i < data.length; i++) {
                getById("shortcutKeys").appendChild(
                    createNode({
                        "otag": "div",
                        "oclass": "work_tools",
                        "oattr": [
                            {
                                "name": "data_url",
                                "type": data[i].url
                            },
                            {
                                "name": "title",
                                "type": data[i].name
                            }
                        ],
                        "ohtml": "<img src=\"" + data[i].ico + "\">"
                    })
                )
            }
        }
    )
}

shortcuKeys();
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
        click_el = el;
        switch_div(el);
    } else if (el.tagName === "SPAN" && (el.parentNode.className.indexOf("menu-url") != -1)) {
        open_url(manege_url(el.getAttribute("data_url")));
    } else if (el.tagName === "SPAN" && (el.parentNode.tagName === "LI")) {
        open_url(manege_url(el.getAttribute("data_url")));
    } else if (el.parentNode.getAttribute("class") == "work_tools") {
        open_url(manege_url(el.parentNode.getAttribute("data_url")));
    } else {
        return;
    }
})

/**
 * 菜单折叠
 * @param el
 */
function switch_div(el) {
    toggleClass(el, "menu_close");
}

/**
 * 选中高亮
 * @param el
 */
function bgcolor(el) {
    var cla = getByClass(el.className.split(" ")[0]);
    for (var i = 0; i < cla.length; i++) {
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
        "url": url
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
function manege_url(url) {
    if (url.substring(0, 4) != "http") {
        return "http://" + url;
    }
    return url;
}

var startTxt = "";
var endTxt = "";
document.addEventListener("keydown", function (ev) {
    startTxt = getById("exampleInputAmount").value;
});

document.addEventListener("keyup", function (ev) {
    endTxt = getById("exampleInputAmount").value;
    if (is_null(endTxt)) {
        $("#view-search").hide();
        return;
    } else {
        $("#view-search").show();
    }
    if (endTxt != startTxt) {
        $("#view-search").html(searchData(endTxt));
    }
})

function searchData(e) {
    var str = "<ul>"
    for (var i = 0; i < NodeDatas.length; i++) {
        if (is_null(NodeDatas[i].url)) {
            continue;
        }
        if (NodeDatas[i].name.indexOf(e) != -1) {
            c_obj = {
                "otag": "div",
                "oclass": "menu-url",
                "ohtml": "<span data_url='" + NodeDatas[i].url + "'>" + NodeDatas[i].name + "</span>",
            }
            str += "<li>" + createNode(c_obj).innerHTML + "</li>"
        }
    }
    str += "</ul>";
    return str;
}
