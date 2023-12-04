import { detect } from 'detect-browser';
const browser = detect();
console.log(`The browser detected by "detect-browser" is ${JSON.stringify(browser)}`);
if(browser){
    const browserName = browser.name && browser.name.toLowerCase();
    // const browserOs = browser.os && browser.os.toLowerCase();
    // let isValidBrowser = ["chrome", "safari", "edge", "ie"].indexOf(browserName) > -1;
    // if(!isValidBrowser && ["ios", "android"].indexOf(browserOs) > -1){
    //     // The ios and android platforms consider it to be a mobile phone, and the verification passes directly.
    //     isValidBrowser = true;
    // }
    // if(isValidBrowser){
    //     if(browserName === "ie" && parseInt(browser.version) < 11){
    //         isValidBrowser = false;
    //     }
    // }
    let isValidBrowser = true;
    if(browserName === "ie" && parseInt(browser.version) <= 11){
        isValidBrowser = false;
    }
    if(!isValidBrowser){
        console.error(`Steedos dont support the browser ${browser.name} yet.`);
        //If the browser is not supported, jump directly to the description interface.
        window.location.href = Steedos.absoluteUrl("/browsers.html");
    }
}