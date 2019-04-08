
class BaseDriver {
    /**
     * Builds a selenium builder instance for chrome, and requires in the chromedriver node module
     * @param {object} seleniumBuilder - an instance of selenium webdriver Builder class e.g. (new require('selenium-webdriver).Builder)
     * @param {object} chromeOptions - a selenium webdriver chrome options object.
     * @return {Promise} a built selenium webdriver driver instance for chrome with the input chromeOptions.
     */
    static buildChromeDriver(seleniumBuilder, chromeOptions) {
        require('chromedriver');
        return seleniumBuilder
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();
    }

    /**
     * Builds a selenium builder instance for internet explorer, and requires in the iedriver node module
     * @param {object} seleniumBuilder - an instance of selenium webdriver Builder class e.g. (new require('selenium-webdriver).Builder)
     * @param {object} ieOptions - a selenium webdriver internet explorer options object.
     * @return {Promise} a built selenium webdriver driver instance for internet explorer with the input ieOptions.
     */
    static buildIeDriver(seleniumBuilder, ieOptions) {
        require('iedriver');
        return seleniumBuilder
            .forBrowser('ie')
            .setIeOptions(ieOptions)
            .build();
    }

}

module.exports = BaseDriver;
