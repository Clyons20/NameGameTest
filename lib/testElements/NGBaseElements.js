const BaseElements = require('../elements/BaseElements');

class NGBaseElements extends BaseElements {
    /**
     * Create a BaseElement with a timeout of 120 seconds
     * @param {object}  locator - the Selenium Webdriver By locator (e.g. By.id("Login")
     */
    constructor(locator, timeout = 20000) {
        super(locator);
        this.defaultTimeout = timeout;
    }
}

module.exports = NGBaseElements;

