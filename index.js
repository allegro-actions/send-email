const core = require('@actions/core');
const action = require('./action');

const result = action();

core.setOutput('result', result);
