// JavaScript Document

// Modifies the window to show the 5 images, site names, and properly link
//
function changeInfo(arrayOfImageSRCs, arrayOfSiteNames, arrayOfLinks){
	var links = [];
	
	links.push(document.getElementById("link1").firstElementChild);
	links.push(document.getElementById("link2").firstElementChild);
	links.push(document.getElementById("link3").firstElementChild);
	links.push(document.getElementById("link4").firstElementChild);
	links.push(document.getElementById("link5").firstElementChild);
	
	for (var i = 0; i < 5; i++){
		links[i].setAttribute("href", arrayOfLinks[i]);
		links[i].children[0].firstElementChild.setAttribute("src", arrayOfImageSRCs[i]);
		links[i].children[1].textContent = arrayOfSiteNames[i];
	}
}

// Receives message from sample.JS when 5 sources have been loaded and modifies the page accordingly.
//
chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'sample') && (msg.subject === 'changeInfo')) {
    // Enable the page-action for the requesting tab
	console.log("working");
    changeInfo(msg.imageArray, msg.siteNameArray, msg.linkArray);
  }
});