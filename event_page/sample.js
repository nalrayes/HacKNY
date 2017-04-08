// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + info.linkUrl);
    console.log("tab: " + JSON.stringify(tab));
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var title = "Test link ayy menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                         "id": "contextlinkayy"});
    console.log("'linkayy' item:" + id);


});
