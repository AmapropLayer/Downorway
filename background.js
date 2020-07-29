"use strict";

// Injection of the content script in the active tab
browser.tabs.executeScript({file: "downorway.js"});

// Adding a listener for a click on the extension
browser.browserAction.onClicked.addListener(listenForClick);

// Adding the button click listener
function listenForClick(){
    browser.tabs.query({active: true, currentWindow: true}).then(start).catch(reportError);
}

// Send a "start" message to the content script in the active tab.
function start(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {message: "start"}).then(response => {
        console.log(response);
        download(response);
    }).catch(reportError)
}

// Log errors
function reportError(error) {
    console.error(`Could not download: ${error}`);
}

// Function downloading files from the adresses in message
function download(message){
    browser.runtime.sendNativeMessage(
        "downorway",
        {
            links: message.links,
            path: message.path,
            name: message.name
        }
    );
}
