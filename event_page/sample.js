var jsonResponse;
var title;
var currentURL;

var hasJSONArrived = false;
var WebhoseAPIKey = "58b8f3b8-5631-4a3d-93fd-83bdd4e83155";

var WebhoseAPISearchURL = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);

var WebhosesearchTerms = "NULL";
//var WebhoseAPIEndpoint = new String('http://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.title%3A(' + searchTerms + ')%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy');

// var WebhoseAPIKey = "58b8f3b8-5631-4a3d-93fd-83bdd4e83155";

// var WebhoseAPISearchURL = "https://webhose.io/search?token={0}&format=json&q=thread.url:{1}".format(WebhoseAPIKey,currentURL);

// var WebhosesearchTerms = "NULL";
// var WebhoseAPIEndpoint = "http://webhose.io/search?token={0}&format=json&q=thread.title%3A({1})%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy".format(WebhoseAPIKey,searchTerms);



var GoogleNatLangAPIKey = "AIzaSyDhbtlZtzf7AdRfMjntRCGTCsvYgFBog8g";
var GoogleNatLangAPIBaseURL = "https://language.googleapis.com/v1beta1/documents:analyzeEntities?key=" + "AIzaSyDhbtlZtzf7AdRfMjntRCGTCsvYgFBog8g";


function onClickHandler(info, tab) {
	currentURL = info.linkUrl;
	if (currentURL.includes("http://")) {
		console.log("working");
		currentURL = currentURL.replace("http://","http\\:\\/\\/");
	}
	else if (currentURL.includes("https://")){
		currentURL = currentURL.replace("https://","https\\:\\/\\/");
	}
	
	WebhoseURL1 = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);
	httpGetArticleTitle(WebhoseURL1,getKeywords);	
	
	WebhoseAPIEndpoint = new String('http://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=united%20states%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy');
	
	// httpGetFiveArticlesFromSearchTerms(WebhoseAPIEndpoint);
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var title = "Test link ayy menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                         "id": "contextlinkayy"});

    console.log("'linkayy' item:" + id);
    //getKeywords();
});

function getKeywords(title, callback) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", GoogleNatLangAPIBaseURL, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
			var searchTerms = [];
			var item;
            var numwords = 0;
			for (item = 0; item < json.entities.length; item++) {
                var entity = json.entities[item]['name'].split(" ");
                var i;
                for (i = 0; i < entity.length; i++) {
                    searchTerms.push(entity[i]);
                    numwords ++;
                    if (numwords == 3)
                        break;
                }
                if (numwords == 3)
                    break;
				// searchTerms.push(json.entities[item]['name']);
			}
			console.log(searchTerms);

            var term = searchTerms.join(' ');
            console.log("Term: "+term);  

            var endpoint = 'http://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=' + encodeURIComponent(term) + '%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy';
            console.log(endpoint)

            callback(endpoint);
                
        }
    }
    var data = JSON.stringify({
          "encodingType": "UTF8",
          "document": {
            "type": "PLAIN_TEXT",
            "content": title,
          }
        }
    );
    xhr.send(data);
}



// Basic HTTPGetAsyncMethod
function httpGetArticleTitle(theUrl, callback)
{

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
			jsonResponse = JSON.parse(xmlHttp.responseText);
			title = jsonResponse['posts'][0]['thread']['title'];
			callback(title, httpGetFiveArticlesFromSearchTerms);
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
            console.log("RESULTS FROM SEARCH TERM:")
			console.log(jsonResponse);

        }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}





