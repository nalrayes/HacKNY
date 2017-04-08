var jsonResponse;
var currentURL;
var WebhoseAPIKey = "58b8f3b8-5631-4a3d-93fd-83bdd4e83155";

var WebhoseAPISearchURL = "https://webhose.io/search?token={0}&format=json&q=thread.url:{1}".format(WebhoseAPIKey,currentURL);

var WebhosesearchTerms = "NULL";
var WebhoseAPIEndpoint = "http://webhose.io/search?token={0}&format=json&q=thread.title%3A({1})%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy".format(WebhoseAPIKey,searchTerms);




var GoogleNatLangAPIKey = "AIzaSyDhbtlZtzf7AdRfMjntRCGTCsvYgFBog8g";
var GoogleNatLangAPIBaseURL = "https://language.googleapis.com/v1beta1/documents:analyzeEntities";


function onClickHandler(info, tab) {
	currentURL = info.linkUrl;
	
	httpGetAsync(currentURL);
	
	console.log("JSON response from {0} link : ".format(currentURL) + jsonResponse);
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var title = "Test link ayy menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                         "id": "contextlinkayy"});
    console.log("'linkayy' item:" + id);
});



// Basic HTTPGetAsyncMethod
function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
			jsonResponse = JSON.parse(this.responseText);
		}
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}





