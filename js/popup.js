var menu_all_type = [
    {
        "name":"工具",
        "id":"0",
        "paterId":"0",
        "level":0
    },
]

var menu_all_url =[
    {
        "name":"",
        "id":"",
        "url":"",
        "typeId":""
    }
]

/**
 * 组合树形菜单
 * @param type
 * @param menu
 */
function combinationMenu(type,menu) {
    var b = document.getElementById("menu-all-nodes");
    var c_obj;
    var ele;
    for(var i = 0;i<type.length;i++){
        c_obj = {
            "otag":"div",
            "oclass":"menu-node",
            "ohtml":type[i].name
        }
        if(type[i].level = 0){
            ele = createNode(c_obj);
            b.appendChild(ele);
            for(var j = 0;j<type.length;j++){
                if(type[j].paterId = type[i].id){
                    c_obj = {
                        "otag":"div",
                        "oclass":"menu-node",
                        "ohtml":type[j].name
                    }
                    ele.appendChild(createNode(c_obj));
                }
            }
        }
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