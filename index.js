var puppeteer = require('puppeteer');
var fs = require('file-system');

var dirname = "";
var timeout = 30000;

function validate(width, height, url) {
    var test = true;
    if (isNaN(width) || width === "") {
        test = false;
        console.error("invalid width");
    }
    if (isNaN(height) || height === "") {
        test = false;
        console.error("invalid height");
    }

    //url validation
    if (!url || url === "") {
        console.error("URL must present");
        return false;
    }

    if (typeof (url) !== "string") {
        console.error("URL is incorrect");
        return false;
    }

    if (url.indexOf(".") === -1) {
        console.error("URL is incorrect");
        return false;
    }

    var test = url.split(":");

    if (test[0] !== "http" && test[0] !== "https" && test[0] !== "ftp") {
        console.error("URL must contain host name");
        return false;
    }

    if (test[1].slice(0, 2) !== "//") {
        test = false;
        console.error("URL is incorrect");
    }
    return test;
}

async function getScreenshots(page, browser) {
    var screenshotPath;
    var filename = new Date().getTime().toString() + Math.floor((Math.random() * 100000) + 1) + ".png";

    if (dirname === "") {
        fs.mkdir("assets-easy-screen-capture", function (err) {
            if (err) {
                console.log(err);
            }
        });
        screenshotPath = "assets-easy-screen-capture/" + filename;
    } else {
        screenshotPath = dirname + "/" + filename;
        console.log(screenshotPath);
    }

    try {
        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        browser.close();

    } catch (err) {
        console.log(err);
    }

    console.info("successfully captured");
}

async function getUrlAndResolutions(width, height, url) {
    try {
        let test = await setViewports(width, height, url);
        if (test === false)
            return;
    } catch (err) {
        console.error(err);
    }
}

async function setViewports(width, height, url) {
    try {
        var browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            timeout: timeout,
        });

        var page = await browser.newPage();

        await page.waitFor(500);

        await page.goto(url);

        // Setting-up viewports 
        await page.setViewport({
            width: width,
            height: height
        });

        await getScreenshots(page, browser);

    } catch (err) {
        console.error(err);
        return false;
    }
}

function sanitizeLocation(location) {
    return location.replace(/[|"<>:*?]/g, "");
}

module.exports.capture = function (width, height, url, location) {

    if(location){
       this.setDir(location); 
    }

    if (!validate(width, height, url)) {
        return;
    }

    getUrlAndResolutions(width, height, url);
};

module.exports.setDir = function (location) {
    if (typeof (location) !== "string") {
        console.log("Location must be an string");
        return;
    }
    location = sanitizeLocation(location);
    console.log("After sanitization your path will be:", location);

    if (!fs.existsSync(location)) {
        fs.mkdir(location, function (err) {
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    dirname = location;
};

module.exports.setTimeOut = function (duration = 30000) {
    if (isNaN(duration)) {
        console.error("Inavalid Duration");
        return;
    }
    timeout = duration;
};