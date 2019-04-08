
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
}

module.exports = BasePage;
