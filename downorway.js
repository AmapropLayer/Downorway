"use strict";

(function() {
    // Fetch nodes from an xpath expression
    function getFromXpath(xpath, nodes){
        let xpathres;
        if(nodes != 1){
            xpathres = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        }else{
            xpathres = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }
        return xpathres
    }

    // Transform a node into an array
    function xpathResultToArray(xpath, prefix, number){
        let nodes = [];
        let node = xpath.iterateNext();
        let i = 0;
        while(node && i < number){
            nodes.push(prefix + node.textContent);
            i++;
            node = xpath.iterateNext();
        }
        return nodes;
    }

    // Complete function to get links
    function getLinks(){
        let path = window.prompt("What's the path ?");
        console.log("Starting to get links");

        // Get the name of the current lesson
        let xpathNumber = getFromXpath("/html/body/div[7]/div/div/div[1]/span[2]/div[2]/select/option[@selected]/text()", 1);
        let lessonNumber = xpathNumber.textContent.trim().split('\xa0')[0];
        let xpathTitle = getFromXpath("/html/head/title/text()", 1);
        let lessonName = "L" + lessonNumber + " - " + xpathTitle.textContent.split(" - ")[0];
        // Get pdf nodes
        let xpathPDFs = getFromXpath("/html/body/div[7]/div/div/div[2]/div[1]/div[2]/div/span[3]/span/div/ul/li/a/@downloaddata-trackurl", 2);
        // Get video nodes
        let xpathAudios = getFromXpath("/html/body/div[7]/div/div/div[2]/div[1]/div[2]/div/span[4]/span/div/ul/li/a/@data-trackurl", 2);

        // Transform audio and pdf nodes to array
        let pdfNodes = xpathResultToArray(xpathPDFs, "https://www.norwegianclass101.com", 2)
        let audioNodes = xpathResultToArray(xpathAudios, "", 3)

        // Display lesson title
        console.log("Title: " + lessonName);
        // Display PDFs links
        for(let j = 0; j < 2; j++){
            console.log(pdfNodes[j]);
        }
        // Display audio links
        for(let j = 0; j < 3; j++){
            console.log(audioNodes[j]);
        }

        let links = pdfNodes.concat(audioNodes);
        if(links.length > 0){
            return Promise.resolve({links: links, path: path});
        }
        return Promise.reject("Failed to find links");
    }

    // Listen to messages from the background script
    browser.runtime.onMessage.addListener(request => {
        if(request.message === "start"){
            return getLinks();
        }else{
            return Promise.reject("Unable to satisfy request");
        }
    });
}
)();