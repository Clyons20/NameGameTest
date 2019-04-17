
class BasePage {
    /**
     * Create a BasePage
     * @param {object} expectedValues - an object containing sets of key value pair of expected values that can be referenced
     * @param {object} options
     * @param {string} options.baseUrl - the baseUrl of a web page (e.g. https://www.google.com)
     * @param {string} options.path - the remaining portion of the path of the page (e.g. /maps)
     */
    constructor(expectedValues = {}, options = {}) {
        this.expectedValues = expectedValues;
        this.baseUrl = options.baseUrl || '';
        this.path = options.path || '';
        this.url = this.baseUrl + this.path;
    }

    /**
     * Invokes Selenium WebDriver getCurrentUrl to get the current browser's URL
     * If it's different than instance's current URL, invokes the Selenium WebDriver get function to navigate to the instance's URL.
     * @param {boolean} [forceRefresh=false] - Controls whether or not to navigate to the page if you are at the current url
     * @returns {Promise}
     */

    async navigateTo() {
        await driver.get(this.url);
    }

    /**
     *Invokes Selenium WebDriver delete all cookies to delete cookies
     * @returns {Promise<void>}
     */
    async clearCookies() {
        await driver.manage().deleteAllCookies()
            .catch(() => {
                throw new Error('Failed to clear cookies');
            });
    }

    /**
     * Invokes Selenium WebDriver refresh to refresh the page
     * @returns {Promise<void>}
     */
    async refreshBrower() {
        await driver.navigate().refresh();
    }

    /**
     * Convenience wrapper for the validateUrl and validateTitle functions
     * @returns {Promise}
     */
    validateNavigationSuccess() {
        return this.validateUrl()
            .then(() => this.validateTitle());
    }

    /**
     * Calls the Selenium WebDriver getTitle function and asserts that its equal to the instance's expectedValues.title
     * @returns {Promise}
     */
    validateTitle() {
        return driver.getTitle()
            .then(currentTitle => expect(currentTitle).toBe(this.expectedValues.title));
    }

    /**
     * Invokes the Selenium WebDriver getCurrentUrl function then asserts that the  current URL matches the instance url
     * @returns {Promise}
     */
    validateUrl() {
        return driver.getCurrentUrl()
            .then(currentUrl => expect(currentUrl).toBe(this.url));
    }

    /**
     * Executes the native javascript function scrollIntoView inside of the browser using the found WebDriver Element
     * Overrides the existing scrollTo by tacking on an additional 100 pixel upward scroll to account for the new sticky header bar.
     * @returns {Promise}
     */
    async scrollTo() {
        const objContext = await driver.findElements(by.className('v-content__wrap'));

        if (objContext.length > 0) {
            return driver.executeScript('arguments[0].scrollIntoView(true);document.getElementsByClassName("v-content__wrap")[0].scrollBy(0, -100);', this.find());
        }
        return driver.executeScript('arguments[0].scrollIntoView(true);window.scrollBy(0, -100);', this.find());
    }

    async scrollBy(x = 0, y = 0) {
        driver.executeScript(`document.querySelector(arguments[0]).scrollBy(${x},${y})`, this.locator.value);
    }
}

module.exports = BasePage;
