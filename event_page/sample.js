var jsonResponse;
var title;
var currentURL;

var hasJSONArrived = false;
var WebhoseAPIKey = "58b8f3b8-5631-4a3d-93fd-83bdd4e83155";

var WebhoseAPISearchURL = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);

var WebhosesearchTerms = "NULL";

// var json = $.getJSON("BiasList.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

var json = {
   "motherjones.com":"left",
   "chicago.suntimes.com":"leftl",
   "csbaonline.org":"rightl",
   "rasmussenreports.com":"center",
   "drudgereport.com":"right",
   "ocregister.com":"rightl",
   "freebeacon.com":"right",
   "thefederalist.com":"rightl",
   "liveactionnews.org":"rightl",
   "mediamatters.org":"left",
   "ap.org":"center",
   "slate.com":"leftl",
   "theatlantic.com":"leftl",
   "psychologicalscience.org":"center",
   "spokesman.com":"leftl",
   "lasvegassun.com":"leftl",
   "mrc.org":"right",
   "ivn.us":"center",
   "journalistsresource.org":"center",
   "mediaite.com":"leftl",
   "skyhinews.com":"leftl",
   "heralddemocrat.com":"left",
   "nymag.com":"left",
   "usatoday.com":"center",
   "chicagotribune.com":"center",
   "msnbc.com":"left",
   "sltrib.com":"leftl",
   "dailycaller.com":"rightl",
   "michellemalkin.com":"right",
   "fcnp.com":"left",
   "frankminiter.com":"right",
   "salon.com":"left",
   "pbs.org":"center",
   "vanityfair.com":"leftl",
   "time.com":"left",
   "truthorfiction.com":"center",
   "delcotimes.com":"leftl",
   "washingtonpost.com":"leftl",
   "huffingtonpost.com":"left",
   "politico.com":"center",
   "vox.com":"leftl",
   "c-span.org":"center",
   "politifact.com":"left",
   "bgdailynews.com":"leftl",
   "nmpolitics.net":"center",
   "ksl.com":"right",
   "care2.com":"left",
   "rightwingnews.com":"right",
   "yahoo.com":"leftl",
   "insidephilanthropy.com":"center",
   "newsmax.com":"right",
   "cnsnews.com":"right",
   "usnews.com":"leftl",
   "indyweek.com":"leftl",
   "inacow.com":"right",
   "democracynow.org":"left",
   "cnn.com":"center",
   "breitbart.com":"right",
   "theoracle.com":"center",
   "socialistalternative.org":"left",
   "fair.org":"center",
   "newsweek.com":"left",
   "thesaintaq":"left",
   "canyoncountryzephyr.com":"left",
   "theblaze.com":"right",
   "cbs.com":"leftl",
   "timescall.com":"leftl",
   "publicintegrity.org":"leftl",
   "esquire.com":"left",
   "washingtonmonthly.com":"leftl",
   "pressherald.com":"center",
   "thejustice.org":"leftl",
   "michigandaily.com":"leftl",
   "weeklystandard.com":"right",
   "parallax.news":"center",
   "myrecordjournal.com":"center",
   "commercialappeal.com":"leftl",
   "bostonglobe.com":"leftl",
   "redstate.com":"right",
   "nydailynews.com":"left",
   "dukechronicle.com":"center",
   "americanthinker":"right",
   "conservativehq.com":"right",
   "socialistproject.ca":"left",
   "intellectualconservative.com":"rightl",
   "factcheck.org":"center",
   "newrepublic.com":"left",
   "townhall.com":"right",
   "grist.org":"leftl",
   "bearingdrift.com":"right",
   "civilbeat.org":"center",
   "nbcnews.com":"leftl",
   "investors.com":"rightl",
   "telegraph.co.uk":"rightl",
   "sfweekly.com":"center",
   "crowdpac.com":"center",
   "wfae.org":"center",
   "infowars.com":"right",
   "judicialwatch.org":"rightl",
   "univision.com":"leftl",
   "realclearpolitics.com":"center",
   "bluevirginia.us":"left",
   "forbes.com":"center",
   "barnstablepatriot.com":"center",
   "yesmagazine.org":"left",
   "ibtimes.com":"center",
   "calmatters.org":"center",
   "eurekalert.org":"center",
   "nationaljournal.com":"center",
   "buzzfeed.com":"leftl",
   "rightsidenews.com":"right",
   "watchdog.org":"rightl",
   "psmag.com":"leftl",
   "westernjournalism.com":"right",
   "masslive.com":"center",
   "cnbc.com":"center",
   "qz.com":"center",
   "hbs.edu":"leftl",
   "amnews.com":"leftl",
   "businessinsider.com":"center",
   "loudountimes.com":"rightl",
   "thedailybeast.com":"center",
   "theweek.com":"center",
   "boingboing.net":"left",
   "dailytargum":"leftl",
   "latimes.com":"leftl",
   "wisconsingazette.com":"leftl",
   "dailywire.com":"right",
   "abcnews.go.com":"leftl",
   "economist.com":"leftl",
   "csmonitor.com":"center",
   "howdowefixit.me":"center",
   "rollingstone.com":"left",
   "nytimes.com":"leftl",
   "statesman.com":"leftl",
   "reuters.com":"center",
   "eptrail.com":"center",
   "reason.com":"rightl",
   "today.com":"leftl",
   "sfgate.com":"leftl",
   "deseretnews.com":"rightl",
   "dailynorthwestern.com":"leftl",
   "bustle.com":"leftl",
   "propublica.org":"center",
   "mercurynews.com":"leftl",
   "upworthy.com":"left",
   "thehill.com":"center",
   "alternet.org":"left",
   "courier-journal.com":"leftl",
   "arkansanonline.com":"left",
   "politicususa.com":"leftl",
   "wsj.com":"rightl",
   "hotair.com":"rightl",
   "dailykos.com":"left",
   "foxnews.com":"right",
   "vtdigger.org":"leftl",
   "cadizrecord.com":"leftl",
   "cbn.com":"right",
   "bbc.com/news":"center",
   "theindyonline.com":"center",
   "wgbh.org":"center",
   "washingtontimes.com":"rightl",
   "diplomaticourier.com":"center",
   "volanteonline.com":"center",
   "sciencedaily.com":"center",
   "npr.org":"center",
   "bloomberg.com":"center",
   "cookpolitical.com":"center",
   "techcrunch.com":"center",
   "post-gazette.com":"rightl",
   "richmond.com":"rightl",
   "cuindependent.com":"center",
   "calwatchdog.com":"center",
   "judgenap.com":"right",
   "frontpagemag.com":"right",
   "theintercept.com":"left",
   "centre-view.com":"leftl",
   "dailycardinal.com":"center",
   "rawstory.com":"left",
   "spectator.org":"right",
   "theguardian.com":"center",
   "thefiscaltimes.com":"rightl",
   "hamptonroadsmessenger.com":"center",
   "thelibertarianrepublic.com":"rightl",
   "thinkprogress.org":"left",
   "theverge.com":"leftl",
   "thenation.com":"left",
   "dailymail.co.uk":"right",
   "wnd.com":"right",
   "sacbee.com":"leftl",
   "pri.org":"center",
   "counter-currents.com":"leftl",
   "news.mit.edu":"center",
   "nypost.com":"right",
   "fivethirtyeight.com":"center",
   "truth-out.org":"leftl",
   "redandblack.com":"center",
   "ijr.com":"center",
   "thegatewaypundit.com":"rightl",
   "tallahassee.com":"left",
   "peacock-panache.com":"left",
   "dailypress.com":"center",
   "ajc.com":"leftl",
   "kqed.org":"center",
   "washingtonexaminer.com":"right"
};

//var WebhoseAPIEndpoint = new String('http://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.title%3A(' + searchTerms + ')%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy');

// var WebhoseAPIKey = "58b8f3b8-5631-4a3d-93fd-83bdd4e83155";

// var WebhoseAPISearchURL = "https://webhose.io/search?token={0}&format=json&q=thread.url:{1}".format(WebhoseAPIKey,currentURL);

// var WebhosesearchTerms = "NULL";
// var WebhoseAPIEndpoint = "http://webhose.io/search?token={0}&format=json&q=thread.title%3A({1})%20language%3A(english)%20performance_score%3A%3E1%20(site_type%3Anews)&sort=relevancy".format(WebhoseAPIKey,searchTerms);



var GoogleNatLangAPIKey = "AIzaSyDhbtlZtzf7AdRfMjntRCGTCsvYgFBog8g";
var GoogleNatLangAPIBaseURL = "https://language.googleapis.com/v1beta1/documents:analyzeEntities?key=" + "AIzaSyDhbtlZtzf7AdRfMjntRCGTCsvYgFBog8g";
    // function unshorten_callback(url) {
    //     url 
    // }
function unshorten_url(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    console.log(theUrl); 
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            jsonResponse = JSON.parse(xmlHttp.responseText);
            console.log("in unshorten");
            callback(jsonResponse[resolved_url]);
            }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function onClickHandler(info, tab) {
	currentURL = info.linkUrl;

    // for url unshortener
    if (currentURL.includes("http://")) {
        currentURL = currentURL.replace("http://","");
    } else if (currentURL.includes("https://")){
        currentURL = currentURL.replace("https://","");
    }

    var unshorten = "https://unshorten.me/json/" + currentURL;

    unshorten_url(unshorten, console.log);
// }

// function unshorten_callback(currentURL) {
	if (currentURL.includes("http://")) {
		console.log("working");
		currentURL = currentURL.replace("http://","http\\:\\/\\/");
	}   else if (currentURL.includes("https://")){
		currentURL = currentURL.replace("https://","https\\:\\/\\/");
	}
	
	WebhoseURL1 = new String('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);
    console.log('https://webhose.io/search?token=' + WebhoseAPIKey + '&format=json&q=thread.url:' + currentURL);
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
            var array = jsonResponse.posts;
            var i, seenBiases={}, articles={};
            for (i=0; i<array.length; i++)      {

                var site = array[i].thread.site;
                if (site in json)   {

                    var bias = json[site];
                    if (bias in seenBiases)  continue;
                    else    {

                        seenBiases[bias]=1;
                        articles[bias]=array[i];
                    }
                }
                else continue;
            }
			// Logic for selecting 5 articles
			// We will have a json object of lots of different articles
            console.log("RESULTS FROM SEARCH TERM:")
			//console.log(jsonResponse);
            console.log(articles);
        }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();

}






