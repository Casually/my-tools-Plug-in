var tab_context = {
    url: "",
    title: ""
};

var _login = false;
var menuType = new Array();
var menuUrl = new Array();
var menu_json = {
    "menuType": menuType,
    "menuUrl": menuUrl
}
var NodeDatas = new Array();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    tab_context.url = tab.url;
    tab_context.title = tab.title;
});

chrome.bookmarks.getTree(function (btns) {
    print_node(btns);
})

function print_node(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (!isNull(nodes[i].children)) {
            console.log("当前为书签类型节点：ID = " + nodes[i].id + "parentId = " + nodes[i].parentId + "name = " + nodes[i].title + "parentId = " + nodes[i].parentId)
            if (nodes[i].parentId) {
                NodeDatas.push({
                    "name": nodes[i].title,
                    "id": nodes[i].id,
                    "parentId": nodes[i].parentId,
                    "level": 0
                })
            }

            print_node(nodes[i].children);
        } else {
            console.log("当前为书签：ID = " + nodes[i].id + "parentId = " + nodes[i].parentId + "name = " + nodes[i].title + "URL = " + nodes[i].url);

            NodeDatas.push({
                "name": nodes[i].title,
                "id": nodes[i].id,
                "url": nodes[i].url,
                "parentId": nodes[i].parentId
            });
        }
    }
}

function isNull(e) {
    if (e === "" || e === " " || e === null || e === undefined || e === "undefined") {
        return true;
    }
    return false;
}