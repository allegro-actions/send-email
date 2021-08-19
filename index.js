const fs = require('fs');
const core = require('@actions/core');
const mailgun = require('mailgun-js');
const Handlebars = require('handlebars');
const defaultTemplate = require('./template.js');

const DEFAULT_FROM = 'Allegro Github Actions <no-reply@mailgun.allegro.tech>';

const apiKey = process.env['MAILGUN_API_KEY'];
const to = core.getInput('to');
const from = core.getInput('from') || DEFAULT_FROM;
const subject = core.getInput('subject');
const body = core.getInput('body');
const template = core.getInput('template');
const context = core.getInput('context');

if (!apiKey) {
  core.setFailed('missing required MAILGUN_API_KEY env variable');
  process.exit(1);
}

if (body && template || body && context) {
  core.setFailed('do not set body parameter if you want to use template and context');
  process.exit(1);
}

if (template && !context || !template && context) {
  core.setFailed('both context and template need to be set, when no body parameter is set');
  process.exit(1);
}

if (!body && !isJsonString(context)) {
  core.setFailed('context is empty or not a valid json string');
  process.exit(1);
}

const mg = mailgun({
  apiKey,
  domain: 'mailgun.allegro.tech',
  host: 'api.eu.mailgun.net'
});

if (body) {
  const render = Handlebars.compile(defaultTemplate);
  const data = { from, to, subject, html: render({ body }) };
  mg.messages().send(data, (error, response) => {
    if (error) core.setFailed(error);
    core.info(JSON.stringify(response));
  });
}

if (template && context) {
  const render = Handlebars.compile(String(fs.readFileSync(template)));
  const data = { from, to, subject, html: render(JSON.parse(context)) };
  mg.messages().send(data, (error, response) => {
    if (error) core.setFailed(error);
    core.info(JSON.stringify(response));
  });
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}