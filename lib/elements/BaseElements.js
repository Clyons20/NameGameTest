class BaseElements {
    /**
     * Create a BaseElement
     * @param {object}  locator - the Selenium Webdriver By locator (e.g. By.id("Login")
     */
    constructor(locator, timeout = 120000) {
        this.locator = locator;
        this.locatorString = `{Locator: ${locator}}`;
        this.defaultTimeout = timeout;
    };

    /**
     * Finds all elements with the instance's locator
     * then invokes the Selenium Webdriver click method on the one with the corresponding index value.
     * Keeps clicking the element until it is successful or times out, swallowing the rejected promise.
     * @param {number} [index=0]  - The index value of the element with the appropriate locator to click (defaults to 0)
     * @param {number} [timeout=15000] amount of time to pass into the selenium driver.wait function
     * @returns {Promise} void
     */
    async click(index = 0, timeout = this.defaultTimeout) {
        await driver.wait(() => this.findElements()
            .then(elements => elements[index].click())
            .then(() => true, () => false), timeout, `click timed out after ${timeout} ms. ${this.locatorString}`
        );
    }

    /**
     * Invokes the Selenium WebDriver findElement function with the object's locator.
     * @returns {Promise} - A Selenium WebDriver WebElementPromise
     */
    find() {
        return driver.findElement(this.locator);
    };

    /**
     * Invokes the Selenium WebDriver findElements function with the object's locator.
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    findElements() {
        return driver.findElements(this.locator)
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver getAttribute function with the attributeName parameter.
     * @param {string} attributeName - string representing the name of the html property to be retrieved from the element
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    getAttribute(attributeName) {
        return this.find()
            .then(element => element.getAttribute(attributeName))
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver getText function
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    getText() {
        return this.find()
            .then(element => element.getText())
    };
}

module.exports = BaseElements;
