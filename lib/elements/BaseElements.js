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

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver setAttribute function passing in the value attribute and the value input parameter
     * @param {string} value - the value to set the HTML 'value' attribute of the element to.
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    setValue(value) {
        return this.find()
            .then(element => element.setAttribute('value', value))
    };

    /**
     * Calls the WebDriver wait function to wait for the result of the findElements function to return an array with more than 0 values in it.
     * @param {number} [timeout=20000] amount of time to pass into the selenium driver.wait function
     * @returns {Promise}
     */
    waitFor(timeout = this.defaultTimeout) {
        return driver.wait(() => this.findElements()
                .then(elements => elements.length > 0),
            timeout,
            `waitFor timed out after ${timeout} ms. ${this.locatorString}`
        )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to return a non-null value.
     * @param {string} attribute - the string value representing the name of the HTML attribute to be waited for.
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeToExist(attribute, timeout = this.defaultTimeout) {
        return driver.wait(() => this.getAttribute(attribute) !== null,
            timeout,
            `waitForAttributeToExist timed out after ${timeout} ms. {Attribute: ${attribute} }, ${this.locatorString}`)
    };

    /**
     * Calls the WebDriver wait function to wait for the result of the findElements function to return an array with a number of elements equal to the count parameter.
     * @param {number} count - the count to wait for the result of the findElements function to return
     * @param {number} [timeout=20000] - number of milliseconds to pass into the selenium driver.wait function to wait for
     * @returns {Promise}
     */
    waitForElementCount(count, timeout = this.defaultTimeout) {
        return driver.wait(() => {
                return this.findElements().then(elements => {
                    return elements.length === count;
                })
            },
            timeout,
            `waitForElementCount timed out after ${timeout} ms. {Count: ${count}}, ${this.locatorString}`
        )};

    /**
     * Calls the WebDriver wait function to wait until the element is displayed.
     * @param {number} [timeout=20000] - number of milliseconds to pass into the selenium driver.wait function to wait for
     * @returns {Promise}
     */
    waitForElementDisplayed(timeout = this.defaultTimeout) {
        return driver.wait(() => this.isDisplayed()
                .catch(() => {
                    return false;
                })
            , timeout, `waitForElementDisplayed timed out after ${timeout} ms. ${this.locatorString}`
        );
    }

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to return a specific value.
     * @param {string} attribute - the name of the HTML attribute to be retrieved
     * @param {string} value - the value of the attribute which is being waited for
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeValue(attribute, value, timeout = this.defaultTimeout) {
        return driver.wait(() => {
                return this.getAttribute(attribute).then(result => value === result)
            },
            timeout,
            `waitForAttributeValue timed out after ${timeout} ms. {Attribute: ${attribute} }, {Value: ${value} }, ${this.locatorString}`
        )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to contain a specific value.
     * @param {string} attribute - the name of the HTML attribute to be retrieved
     * @param {string} value - the value of the attribute which is being waited for
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeValueToContain(attribute, value, timeout = this.defaultTimeout) {
        return driver.wait(() => {
                return this.getAttribute(attribute).then((result) => result.includes(value))
            },
            timeout,
            `waitForAttributeValueToContain timed out after ${timeout} ms. {Attribute: ${attribute} }, {Value: ${value} }, ${this.locatorString}`
        )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to not contain a specific value.
     * @param {string} attribute - the name of the HTML attribute to be retrieved
     * @param {string} value - the value of the attribute which is being waited for
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeValueToNotContain(attribute, value, timeout = this.defaultTimeout) {
        return driver.wait(() => {
                return this.getAttribute(attribute).then((result) => !result.includes(value))
            },
            timeout,
            `waitForAttributeValueToNotContain timed out after ${timeout} ms. {Attribute: ${attribute} }, {Value: ${value} }, ${this.locatorString}`
        )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getText function to contain a specific value.
     * @param {string} value - the value of the text which is being waited for
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForGetTextToContain(value, timeout = this.defaultTimeout) {
        return driver.wait(() => {
                try {
                    return this.getText().then((result) => result.includes(value))
                } catch (e) {
                    if (e.name === 'StaleElementReferenceError') {
                        console.log('Caught StaleElementReferenceError, retrying.');
                        return false;
                    }
                    throw e;
                }
            },
            timeout,
            `waitForGetTextToContain timed out after ${timeout} ms. {Value: ${value} }, ${this.locatorString}`
        )};

    /**
     * Performs an assertion that the result of the findElements function returns an array with a length of 0.
     * @returns {Promise}
     */
    assertIsNotPresent() {
        return this.findElements()
            .then(elements => expect(elements.length).toBe(0));
    };

    /**
     * Performs an assertion that the result of the findElements function returns an array with a length greater than 0.
     * @returns {Promise}
     */
    assertIsPresent() {
        return this.findElements()
            .then(elements => expect(elements.length).toBeGreaterThan(0));
    };

    /**
     * Performs an assertion that the result of the getText function equals the input parameter.
     * @param {string} textToAssert - the string that is being compared to the result of the getText function
     * @returns {Promise}
     */
    assertText(textToAssert) {
        return this.getText()
            .then(text => expect(text).toBe(textToAssert));
    };

    /**
     * Performs an assertion that the result of the getText function does not contain the input string
     * @param {string} textToAssert - the string that is being compared to the result of the getText function
     * @returns {Promise}
     */
    assertTextToContain(textToAssert) {
        return this.getText()
            .then(text => expect(text).toContain(textToAssert));
    };

    /**
     * Performs an assertion that the result of the WebElement isDisplayed function returns true.
     * @returns {Promise}
     */
    assertIsDisplayed() {
        return this.isDisplayed()
            .then(displayed => expect(displayed).toBe(true,
                `An element was expected to be displayed, but was not displayed or found on the DOM. ${this.locatorString}`));
    }

    /**
     * Performs an assertion that the result of the WebElement isDisplayed function returns false.
     * @returns {Promise}
     */
    assertIsNotDisplayed() {
        return this.isDisplayed()
            .then(displayed => expect(displayed).toBe(false,
                `An element was not expected to be displayed, but was displayed. ${this.locatorString}`));
    }

    /**
     * Finds all elements with the instance's locator, then evaluates the returned array. If there are
     * no elements present in the array, returns false. Otherwise, evaluates the element at the corresponding
     * index using WebDriver isDisplayed.
     * @param {number} [index=0] - The index value of the element with the appropriate locator to evaluate (defaults to 0)
     * @returns {Promise}
     */
    isDisplayed(index = 0) {
        return this.findElements()
            .then(elements => {
                return (elements.length === 0) ? false : elements[index].isDisplayed();
            })
    }

    /**
     * Finds all elements with the instance's locator, then clears that field. This command has no effect if the element
     * is neither a text INPUT element nor a TEXTAREA element.
     * @param {number} [index=0] - The index value of the element with the appropriate locator to be cleared
     * @returns {Promise}
     */
    clear(index = 0) {
        return this.findElements()
            .then(elements => {
                return elements[index].clear();
            })
    }
}

module.exports = BaseElements;
