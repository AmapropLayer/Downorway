"use strict";

// Injection of the content script in the active tab
browser.tabs.executeScript({file: "downorway.js"});

// Adding a listener for a click on the extension
browser.browserAction.onClicked.addListener(listenForClick);

let path;

// Adding the button click listener
function listenForClick(){
    path = window.prompt("What's the path ?");
    browser.tabs.query({active: true, currentWindow: true}).then(start).catch(reportError);
}

// Send a "start" message to the content script in the active tab.
function start(tabs) {
    console.log("start1");
    browser.tabs.sendMessage(tabs[0].id, {message: "start"}).then(response => {
        download(response);
    }).catch(reportError)
}

// Log errors
function reportError(error) {
    console.error(`Could not download: ${error}`);
}

// Function downloading files from the adresses in message
function download(message){
    console.log("GOT SHIT");
    let toDownload = message.response;
    for(let j = 0; j<toDownload.length; j++){
        console.log("ONE");
        let downloading = browser.downloads.download(
            {
                url: toDownload[j],
                filename: path,
                saveAs: "false"
            });
        downloading.then(onStartedDownload, onFailed);
    }
    console.log("Done!");
}
