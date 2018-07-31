var puppeteer = require('puppeteer');
var fs = require('file-system');

var dirname = "";
var timeout = 30000;

function validateUrl(url) {
    var test = true;
    //url validation
    if (!url || url === "") {
        console.error("URL must present", url);
        return false;
    }

    if (typeof (url) !== "string") {
        console.error("URL is incorrect", url);
        return false;
    }

    if (url.indexOf(".") === -1) {
        console.error("URL is incorrect", url);
        return false;
    }

    var test = url.split(":");

    if (test[0] !== "http" && test[0] !== "https" && test[0] !== "ftp") {
        console.error("URL must contain host name", url);
        return false;
    }

    if (test[1].slice(0, 2) !== "//") {
        test = false;
        console.error("URL is incorrect", url);
    }
    return test;
}

function validate(width, height, urls) {
    var test = true;
    if (isNaN(width) || width === "") {
        test = false;
        console.error("invalid width");
    }
    if (isNaN(height) || height === "") {
        test = false;
        console.error("invalid height");
    }
    for (var i = 0; i < urls.length; i++) {
        if (!validateUrl(urls[i])) {
            test = false;
        }
    }
    return test;
}

async function getScreenshots(page, browser, directory) {
    var screenshotPath;
    var filename = new Date().getTime().toString() + Math.floor((Math.random() * 100000) + 1) + ".png";

    screenshotPath = directory + "/" + filename;
    if (directory === "") {
        screenshotPath = "assets-easy-screen-capture/" + filename;
    }
    try {
        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

    } catch (err) {
        console.log(err);
    }

    console.info("successfully captured");
}

async function getUrlAndResolutions(width, height, urls) {
    if (dirname === "") {
        fs.mkdir("assets-easy-screen-capture", function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    try {
        let test = await setViewports(width, height, urls, dirname);
        if (test === false)
            return;
    } catch (err) {
        console.error(err);
    }
}

async function setViewports(width, height, urls, directory) {
    try {
        var browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            timeout: timeout,
        });

        var page = await browser.newPage();

        await page.waitFor(500);

        for (var i = 0; i < urls.length; i++) {
            await page.goto(urls[i]);

            // Setting-up viewports 
            await page.setViewport({
                width: width,
                height: height
            });

            await getScreenshots(page, browser, directory);

        }

        browser.close();

    } catch (err) {
        console.error(err);
        return false;
    }
}

function sanitizeLocation(location) {
    return location.replace(/[|"<>:*?]/g, "");
}

module.exports.capture = function (width, height, urls, location) {
    if (typeof (urls) === "string") {
        urls = [urls];
    }

    if (location) {
        this.setDir(location);
    }

    if (!validate(width, height, urls)) {
        return;
    }

    getUrlAndResolutions(width, height, urls);
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