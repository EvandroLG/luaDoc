const Handlebars = require('handlebars');
const { readFileAsync } = require('./readFileAsync');

const buildHtml = (tpl, data) => {
  const template = Handlebars.compile(tpl);
  return template(data);
};

const generatePage = async data => {
  const tpl = await readFileAsync('./lib/template.html');
  return buildHtml(tpl, data);
};

module.exports = {
  generatePage,
};
