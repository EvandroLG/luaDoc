const { readFileAsync } = require('./readFileAsync');

const buildHtml = (html, data) => {};

const generatePage = async () => {
  const html = await readFileAsync('./lib/template.html');
  return buildHtml(html, { data });
};

module.exports = {
  generatePage,
};
