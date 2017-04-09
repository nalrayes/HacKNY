var jsonResponse;
var title;
var currentURL;

var hasJSONArrived = false;
var WebhoseAPIKey = "58b8f3b8-5631-4a3d-93fd-83bdd4e83155";

var WebhoseAPISearchURL = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);

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
	
	WebhoseAPIKey = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);
	
	httpGetArticleTitle(WebhoseAPIKey,getKeywords);
	
	WebhoseAPIEndpoint = new String('http://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.title%3A(syria%20%trump)%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy');
	
	// SHOW DISPLAY BOX
	//
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var title = "Test link ayy menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":["link"],"id": "contextlinkayy"});
});

function getKeywords(title) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", GoogleNatLangAPIBaseURL, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
			var searchTerms = [];
			var item;
			for (item = 0; item < json.entities.length; item++) {
				var substr = json.entities[item]['name'].split(" ");
				for (var i = 0; i < substr.length; i++){
					searchTerms.push(substr + "%20");
				}
			}
			
			var url = "http://webhose.io/search?token=58b8f3b8-5631-4a3d-93fd-83bdd4e83155&format=json&q=";
			for (item = 0; item < searchTerms.length; item++){
				if (item > 2) {
					break;
				}
				url = url + searchTerms[item];
			}
			url = url + "language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy";
			
			httpGetFiveArticlesFromSearchTerms(url);
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
			callback(title);
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
			
			var imageArray = [];
			var siteNameArray = [];
			var linkArray = [];
			
			console.log(jsonResponse);
			
			// Logic for selecting 5 articles
			// We will have a json object of lots of different articles
			// Currently just pulls info of top 5 responses
			for(var i = 0; i < 5; i++){
				imageArray.push(jsonResponse['posts'][i]['thread']['main_image']); // adds the image
				siteNameArray.push(jsonResponse['posts'][i]['thread']['site']); // adds the site name
				linkArray.push(jsonResponse['posts'][i]['url']) // adds the link
			}
			
			// Sends the information to the Chrome Extension Pop Up (when you click icon next to search bar)
			modifyPopUp(imageArray, siteNameArray, linkArray);
		}
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

// SUPER JANKY AND NEEDS A PERMANENT SOLUTION BECAUSE ONLY WORKS IF THE POP UP WINDOW IS OPEN WHEN API REQUEST IS SENT
// NEED TO FIND A WAY FOR A SCRIPT ON THIS PAGE TO TALK WITH SCRIPT ON POP UP PAGE.
// IDEALLY THESE THINGS WOULD BE FILES ON AN ACTUAL HOSTED SERVER AND WOULD JUST PUSH UPDATES TO THE BROSWER
//
// Sends a message to the linksPopUp.js script attached to the Chrome Extension Pop Up
// Sends an array of 5 images, 5 links, and 5 site names
//
function modifyPopUp(arrayOfSiteImages, arrayOfSiteNames, arrayOfLinks) {
  chrome.runtime.sendMessage({
  from:    'sample',
  subject: 'changeInfo',
  imageArray: arrayOfSiteImages,
  siteNameArray: arrayOfSiteNames,
  linkArray: arrayOfLinks
});
}

