const Jasmine = require('jasmine');

const config = {
    helpers: ['./lib/jasmineHelpers/**/*.js'],
    spec_files: ['./features/**/*.spec.js'],
    stopSpecOnExpectationFailure: false,
    random: false
};

const runner = new Jasmine();
runner.loadConfig(config);

runner.execute();
