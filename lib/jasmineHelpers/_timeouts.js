const envConfig = require('../../config/environment');

beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = envConfig.JASMINE_TIMEOUT;
});


