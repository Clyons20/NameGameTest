const SeleniumBuilder = require('selenium-webdriver').Builder;

const argv = require('minimist')(process.argv.slice(2));
const browserConfig = require('../../config/browser');

const BaseDriver = require('../driver/BaseDriver');

process.env.SELENIUM_PROMISE_MANAGER = 0; // Disabled because Selenium is going to be removing this functionality eventually

beforeAll(async () => {
    switch (argv.browser) {
        case 'ie' :
            driver = await BaseDriver.buildIeDriver(new SeleniumBuilder(), browserConfig.IE_OPTIONS);
            break;
        default:
            console.log('attempting to open chrome driver');
            driver = await BaseDriver.buildChromeDriver(new SeleniumBuilder(), browserConfig.CHROME_OPTIONS);

            await driver.getCapabilities().then((val) => {
                console.log(`Chrome version: ${val.get('version')}`);
            });
    }
});

// Runs after all tests and happens in the execution cycle after all spec files are finished.
afterAll(async () => {
    await driver.quit();
});



