// JavaScript Document
chrome.runtime.sendMessage({
		greeting: "Hello!"
	}, function (response)	{
});

// Modifies the window to show images and site names and to create proper links to found articles
function changeInfo(arrayOfObjects)	{	
	
	var flag = false;

	for (var i = 0; i < arrayOfObjects.length; i++)		{

		var bias = arrayOfObjects[i].bias;
		var img = bias.concat("img");
		var site = bias.concat("site");
		var biasElement = document.getElementById(bias);
		flag = true;

		biasElement.setAttribute("href", arrayOfObjects[i]["link"]);
		biasElement.style.display="flex";
		biasElement.style.cursor = "pointer";
		document.getElementById(img).src = arrayOfObjects[i]["image"];
		document.getElementById(site).innerHTML = arrayOfObjects[i]["sitename"];				
	}
		
	// If there are no results return appropriate message
	if (!flag)	{

		var loadingimg = document.getElementById("loadingimg");
		loadingimg.src="noresults.png";
		loadingimg.style.width = "200px";
		document.getElementById("explanation").innerHTML = "Sorry, no alternative sources were found for this article."
	}

	else document.getElementById("loading").style.display="none";
}

// Receives message from sample.JS when 5 sources have been loaded and modifies the page accordingly.
chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'sample') && (msg.subject === 'changeInfo')) {
    // Enable the page-action for the requesting tab
    changeInfo(msg.objArray);
  }
});

// Open any of the alternative sources
$(document).ready(function()	{

	$(".link" ).click( function()	{
		window.open($(this).attr('href'), '_blank'); 
	});
});
