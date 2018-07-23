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
    
#### Capturing Screenshot in default directory:

    let width = 320;
    let height = 640;
    let url = "https://www.google.com";
    easyScreenCapture.capture(width, height, url)

#### Capture screenshot to custom directory:

    let width = 320;
    let height = 640;
    let url = "https://www.google.com";
    let directory = "/path/to/desired/directory";
    easyScreenCapture.capture(width, height, url, directory)

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

### dependencies:

* Puppeteer
* File-system

### Core Contributors:

* **_[Jagdish Singh](https://github.com/JDchauhan)_**

Please submit bug reports to [https://github.com/JDchauhan/easy-screen-capture](https://github.com/JDchauhan/easy-screen-capture).


Pull requests are welcome.
