var jsonResponse;
var title;
var currentURL;
var hasJSONArrived = false;
var WebhoseAPIKey = "58b8f3b8-5631-4a3d-93fd-83bdd4e83155";

var WebhoseAPISearchURL = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);

var WebhosesearchTerms = "NULL";
//var WebhoseAPIEndpoint = new String('http://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.title%3A(' + searchTerms + ')%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy');


var GoogleNatLangAPIKey = "AIzaSyDhbtlZtzf7AdRfMjntRCGTCsvYgFBog8g";
var GoogleNatLangAPIBaseURL = "https://language.googleapis.com/v1beta1/documents:analyzeEntities";


function onClickHandler(info, tab) {
	currentURL = info.linkUrl;
	if (currentURL.includes("http://")) {
		console.log("working");
		currentURL = currentURL.replace("http://","http\\:\\/\\/");
	}
	else if (currentURL.includes("https://")){
		currentURL = currentURL.replace("https://","https\\:\\/\\/");
	}
	
	WebhoseAPIKey = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);
	httpGetArticleTitle(WebhoseAPIKey);	
	
	WebhoseAPIEndpoint = new String('http://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.title%3A(syria%20%trump)%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy');
	
	httpGetFiveArticlesFromSearchTerms(WebhoseAPIEndpoint);
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var title = "Test link ayy menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                         "id": "contextlinkayy"});
});



// Basic HTTPGetAsyncMethod
function httpGetArticleTitle(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
			jsonResponse = JSON.parse(xmlHttp.responseText);
			title = jsonResponse['posts'][0]['thread']['title'];
			//callback(title);
		}
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

function httpGetFiveArticlesFromSearchTerms(theUrl){
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
			jsonResponse = JSON.parse(xmlHttp.responseText);
			// Logic for selecting 5 articles
			// We will have a json object of lots of different articles
			console.log("RESULTS FROM SEARCH TERMS: " + jsonResponse);
		}
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}





