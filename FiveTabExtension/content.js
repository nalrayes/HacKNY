// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      if ($("a[href^='http']").length>5)	{

      	var i, firstHref=new Array(5);
      	for (i=0; i<5; i++)	{

      		firstHref[i]=($("a[href^='http']").eq(i).attr("href"));
      	}           	

      	// This line is new!
      	chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
      }      
    }
  }
);