/*
messageListener():
*/
function messageListener(request, sender, sendResponse) {

  //browser.runtime.onMessage.removeListener(beastify);
}

/*
Assign messageListener() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(messageListener);
