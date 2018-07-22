var puppeteer = require('puppeteer');
var fs = require('file-system');

var filename = new Date().getTime().toString() + Math.floor((Math.random() * 100000) + 1) + ".png";

function validate(width, height, url){
    var test = true;
    if(isNaN(width) || width === ""){
        test = false;
        console.error("invalid width");
    }
    if(isNaN(height) || height === ""){
        test = false;
        console.error("invalid height");
    }

    //url validation
    if (!url || url === "") {
        console.error("URL must present");
        return false;
    }

    if(typeof(url) !== "string"){
        console.error("URL is incorrect");
        return false;
    }
    
    if(url.indexOf(".") === -1){
        console.error("URL is incorrect");
        return false;
    }

    var test = url.split(":");
    
    if(test[0] !== "http" && test[0] !== "https" && test[0] !== "ftp"){
        console.error("URL must contain host name");
        return false;
    }

    if(test[1].slice(0,2) !== "//"){
        test = false;
        console.error("URL is incorrect");
    }
    return test;
}

async function getScreenshots(page, browser) {
    fs.mkdir("../assets-capture-puppeteer", function (err) {
        if (err) {
            console.log(err);
        }
    });

    await page.screenshot({
        path: "../assets-capture-puppeteer/" + filename + '.png',
        fullPage: true
    });
    browser.close();
    console.info("successfully captured");
}

async function getUrlAndResolutions(width, height, url) {
        let test = await setViewports(width, height, url);
        if (test === "URLErr")
            return 
}

async function setViewports(width, height, url) {
    var browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 10000,
    });
    var page = await browser.newPage();
    await page.waitFor(500);
    try {
        let test = await page.goto(url);
    } catch (err) {
        console.log("Unable to visit the provided URL.");
        return "URLErr"
    }

    // Setting-up viewports 
    await page.setViewport({
        width: width,
        height: height
    });
    await getScreenshots(page, browser);
}


module.exports.capture = function (width, height, url) {

    if(!validate(width, height, url)){
        return;
    }

    getUrlAndResolutions(width, height, url);
};