var easyScreenCapture = require("./index")

/*
 * Maximum time in milliseconds to wait for the browser instance to start.
 *  Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
 */
easyScreenCapture.setTimeOut(0);

/*
 * this method will set path to the desired directory in which you want your
 * images to be saved. If not called then save to the default directory 
 * i.e "assets-easy-screen-capture" located in the same directory in which
 * the calling script exists
 */
easyScreenCapture.setDir("/path/to/desired/directory");

easyScreenCapture.capture(320, 640, "https://www.google.com")