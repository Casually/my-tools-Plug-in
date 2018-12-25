
function getById(e){
    return document.getElementById(e);
}

function getByName(e){
    return document.getElementsByName(e);
}

function getByClass(e){
    return document.getElementsByClassName(e);
}

function getByTag(e){
    return document.getElementsByTagName(e);
}

/**
 * 为指定的dom元素添加样式
 * @param ele
 * @param cls
 */
function addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * 删除指定dom元素的样式
 * @param ele
 * @param cls
 */
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}

/**
 * 如果存在(不存在)，就删除(添加)一个样式
 * @param ele
 * @param cls
 */
function toggleClass(ele,cls){
    if(hasClass(ele,cls)){
        removeClass(ele, cls);
    }else{
        addClass(ele, cls);
    }
}

/**
 * 判断是否有class属性
 * @param ele
 * @param cls
 * @returns {Promise<any> | Promise<Response> | RegExpMatchArray}
 */
function hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
* 创建节点
* @param obj
 *  {
 *      otag: 标签类型
 *      oclass: 标签class属性
 *      oid: 标签ID属性
 *      oname: 标签name属性
 *      ohtml: 标签内容
 *      oattr:{ 其他属性
 *          name: 属性名称
 *          type: 属性值
 *      }
 *  }
* @returns {*}
*/
function createNode(obj) {
    if (is_null(obj.otag)) {
        return null;
    }
    var node_div = document.createElement(obj.otag);
    if (!is_null(obj.oclass)) {
        node_div.className = obj.oclass;
    }
    if (!is_null(obj.oid)) {
        node_div.id = obj.oid;
    }
    if (!is_null(obj.oname)) {
        node_div.name = obj.oid;
    }
    if (!is_null(obj.ohtml)) {
        node_div.innerHTML = obj.ohtml;
    }
    if (!is_null(obj.oattr)) {
        for (var i = 0; i < obj.oattr.length; i++) {
            node_div.setAttribute(obj.oattr[i].name, obj.oattr[i].type);
        }
    }
    return node_div;
}

/**
 * 判断是否为空
 * @param obj
 * @returns {boolean}
 */
function is_null(obj) {
    if (obj === null || obj === "" || obj === undefined || obj === "undefined") {
        return true;
    } else {
        return false;
    }
}
