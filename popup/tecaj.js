/*
Listen for clicks in the popup.

If it's on a button wich contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("button-close")) {
        //browser.tabs.reload();
        window.close();
        return;
    }
});