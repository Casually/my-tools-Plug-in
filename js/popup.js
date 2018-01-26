var menu_all_type = [
    {
        "name":"工具",
        "id":"0",
        "paterId":"0",
        "level":0
    },
    {
        "name":"娱乐",
        "id":"1",
        "paterId":"0",
        "level":0
    },
    {
        "name":"影视",
        "id":"3",
        "paterId":"1",
        "level":1
    },
    {
        "name":"音乐",
        "id":"4",
        "paterId":"1",
        "level":1
    },
    {
        "name":"常用",
        "id":"5",
        "paterId":"4",
        "level":2
    },
    {
        "name":"随心随行",
        "id":"6",
        "paterId":"4",
        "level":2
    },
    {
        "name":"临时",
        "id":"2",
        "paterId":"0",
        "level":0
    },
]

var menu_all_url =[
    {
        "name":"站长工具",
        "id":"1",
        "url":"www.baidu.com",
        "typeId":"0"
    },
    {
        "name":"DJ音乐盒",
        "id":"2",
        "url":"www.dj520.com",
        "typeId":"4"
    },
    {
        "name":"id97",
        "id":"3",
        "url":"www.id97.com",
        "typeId":"3"
    },
    {
        "name":"百度随心听",
        "id":"4",
        "url":"suixinting.baidu.com",
        "typeId":"6"
    },
]

var pater_nodes = document.getElementById("menu-all-nodes");

combinationMenu(menu_all_type,menu_all_url);

/**
 * 组合树形菜单
 * @param type 类型
 * @param menu 菜单
 * @param level 类型等级
 */
function combinationMenu(type,menu,level,eles) {
    var c_obj;
    var size = 0;
    var eles_all =  new Array();
    if(is_null(level)){
        level = 0;
    }
    if(is_null(eles)){//第一次将最外层的分类加载
        eles = new Array();
        for(var i = 0;i<type.length;i++){
            if(type[i].level === level){
                console.log(type[i].name);
                c_obj = {
                    "otag":"div",
                    "oclass":"menu-node",
                    "ohtml":"<span>" + type[i].name + "</span>",
                    "oid":type[i].id
                }
                eles_all[size] = createNode(c_obj);
                eles[size] = createNode(c_obj);
                pater_nodes.appendChild(eles_all[size]);
                size++;
            }
        }
    }else{//后续的分类加载
        for(var i = 0;i < eles.length;i++){
            var is_next = false;
            for(var j=0;j<type.length;j++){
                if(eles[i].id === type[j].paterId && type[j].level === level){
                    console.log(type[j].name);
                    c_obj = {
                        "otag":"div",
                        "oclass":"menu-node",
                        "ohtml":"<span>" + type[j].name + "</span>",
                        "oid":type[j].id
                    }
                    eles_all[size] = createNode(c_obj);
                    eles[i].appendChild(eles_all[size]);
                    is_next = true;
                }
            }
            if(is_next){
                size++;
            }
        }
    }

    for(var j = 0;j<menu.length;j++){//将菜单加载到对应的分类中
        for(var n=0;n<eles.length;n++){
            if(menu[j].typeId === eles[n].id){
                c_obj = {
                    "otag":"div",
                    "oclass":"menu-url",
                    "ohtml":"<span>" + menu[j].name + "</span>",
                    "oid":menu[j].id
                }
                eles[n].appendChild(createNode(c_obj));
            }
        }
    }

    if(size>0){
        level++;
        combinationMenu(type,menu,level,eles_all);
    }else{
        return;
    }
}

/**
 * 创建节点
 * @param obj
 * @returns {*}
 */
function createNode(obj) {
    if(is_null(obj.otag)){
        return null;
    }
    var node_div = document.createElement(obj.otag);
    if(!is_null(obj.oclass)){
        node_div.className = obj.oclass;
    }
    if(!is_null(obj.oid)){
        node_div.id = obj.oid;
    }
    if(!is_null(obj.oname)){
        node_div.name = obj.oid;
    }
    if(!is_null(obj.ohtml)){
        node_div.innerHTML = obj.ohtml;
    }
    return node_div;
}

/**
 * 判断是否为空
 * @param obj
 * @returns {boolean}
 */
function is_null(obj) {
    if(obj === null || obj === "" || obj === undefined || obj === "undefined"){
        return true;
    }else{
        return false;
    }
}

/**
 * 类型点击折叠与展开
 */
$(".menu-node").click(function(e){
    if(is_null( $(this).attr("data_h"))){
        $(this).attr("data_h",$(this).css("height"));
        $(this).css("height","25px");
    }else{
        $(this).css("height",$(this).attr("data_h"));
        $(this).attr("data_h","");
    }
})