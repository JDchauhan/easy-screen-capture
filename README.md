# Easy Screen Capture

A webpage capture NPM package built over puppeteer, use headless chrome to take screenshot of page in any possible viewport for UI designers and developers in RWD

### About:

Capture screenshot by calling function capture which requires 3 parameters width, height, URL respectively.

### Installation:

* To download and save in package.json file
    
        npm install --save easy-screen-capture

* To download without saving
    
        npm install easy-screen-capture

### Usage:

#### Initialization:

        var easyScreenCapture = require("easy-screen-capture")
    
#### Capture Method:

This method captures the screenshot of the page in your required viewport
        
        easyScreenCapture.capture(viewports, urls, directory)
        
**parameters:**

- _viewports:_ 
It is an array of objects. each object containing height and width property to specify the height and width of the viewport 

- _urls:_ 
It is an array of url's for whose you want to capture screenshots.

- _directory:_(optional) 
This is an optional parameter specify the path to save your screenshots. By default it is **"assets-easy-screen-capture"** located in the same directory in which the calling script exists.

#### Capturing Screenshot in default directory:

    var viewports = [{
        height: 736,
        width: 414
    }, {
        height: 1080,
        width: 1920
    }]

    let url = "https://www.google.com";
    easyScreenCapture.capture(viewports, urls)

#### Capture screenshot to custom directory:

    var viewports = [{
        height: 736,
        width: 414
    }, {
        height: 1080,
        width: 1920
    }]

    let url = "https://www.google.com";
    let directory = "/path/to/desired/directory";
    easyScreenCapture.capture(viewports, url, directory)

you can also pass multiple urls using the array of urls as we have done in the previous code example

#### Capture screenshot with multiple urls:

    var viewports = [{
        height: 736,
        width: 414
    }, {
        height: 1080,
        width: 1920
    }]

    var urls = [{
            url: "https://www.google.com"
        },
        {
            url: "https://github.com/JDchauhan/easy-screen-capture"
        },
        {
            name: "npm",
            url: "https://www.npmjs.com/~jdchauhan"
        }
    ]

    easyScreenCapture.capture(viewports, urls, directory);

#### Set output directory:

you can also save the file to a custom directory. for this you need to set the directory using

        easyScreenCapture.setDir("/path/to/desired/directory");

before call to capture();

#### Set time to wait for browser instance to start :

It is used to set maximum time in milliseconds to wait for the browser instance to start.

* Defaults to 30000 (30 seconds).
* Pass 0 to disable timeout.

        easyScreenCapture.setTimeOut(0);

### Results:

Using above code would create a folder in directory **"assets-easy-screen-capture"** located in the same directory in which the calling script exists.

All your captured PNG files are saved in this directory.

On successfull execution of code you will get a message saying it has been successfully captured.

In case of error you get errors in console as well as.

### deprecations from previous version:

The capture() method has been deprecated in this method. This method accepts only the url, height and width in previous versions but in this version it accepts an array of object for multiple viewports and an array of urls 

### dependencies:

* Puppeteer
* File-system

### Core Contributors:

* **_[Jagdish Singh](https://github.com/JDchauhan)_**

Please submit bug reports to [https://github.com/JDchauhan/easy-screen-capture](https://github.com/JDchauhan/easy-screen-capture).


Pull requests are welcome.
