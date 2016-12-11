/*
messageListener():
*/
function tecaj(request, sender, sendResponse) {
    browser.runtime.onMessage.removeListener(messageListener);
}

function initTecajAction() {}

browser.runtime.onMessage.addListener(tecaj);
initTecajAction();