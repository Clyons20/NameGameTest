const ie = require('selenium-webdriver/ie');
const chrome = require('selenium-webdriver/chrome');

module.exports = {
    STANDARD_BROWSER_SIZE_HEIGHT: 1080,
    STANDARD_BROWSER_SIZE_WIDTH: 1018,

    IE_OPTIONS: new ie.Options()
        .introduceFlakinessByIgnoringProtectedModeSettings(true),

    CHROME_OPTIONS: new chrome.Options()
        .addArguments([
            '--enable-precise-memory-info, ' +
            '--js-flags=--expose_gc, ' +
            '--no-sandbox, ' +
            '--test-type=browser, ' +
            '--disable-infobars'
        ])
};
