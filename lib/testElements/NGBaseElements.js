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

    /**
     * Finds all elements with the instance's locator, waits for visible & enabled element
     * then invokes the Selenium Webdriver click method on the one with the corresponding index value.
     * Keeps clicking the element until it is successful or times out, swallowing the rejected promise.
     * @param {number} [index=0]  - The index value of the element with the appropriate locator to click (defaults to 0)
     * @param {number} [timeout=15000] amount of time to pass into the selenium driver.wait function
     * @returns {Promise} void
     */
    async click(index = 0, timeout = this.defaultTimeout) {
        await driver.wait(async () => {
            const elements = await this.findElements();
            if (elements.length === 0) {
                return false;
            }

            if (!elements[index].isDisplayed() || !elements[index].isEnabled()) {
                console.log('Warning. Click method determined the target object was either not displayed or disabled. Retrying.')
                return false;
            }

            return elements[index].click().then(() => true, () => false);
        }, timeout, `click timed out after ${timeout} ms. ${this.locatorString}`);
    }
}

module.exports = NGBaseElements;

