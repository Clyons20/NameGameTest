const BasePage = require('../pages/BasePage');
const config = require('../../config/environment');

class ConstructorPage extends BasePage {
    constructor(expectedValues = {}, path = '') {
        const options = {
            baseUrl: config.BASE_URL,
            path
        };
        super(expectedValues, options);
    }
}

module.exports = ConstructorPage;
