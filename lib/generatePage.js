const Handlebars = require("handlebars");
const { readFileAsync, writeFileAsync } = require("./readFileAsync");

const buildHtml = (tpl, data) => {
  const template = Handlebars.compile(tpl);
  return template(data);
};

const generatePage = async (data) => {
  const tpl = await readFileAsync("./lib/template.html");
  const html = buildHtml(tpl, data);
  await writeFileAsync(html);
};

module.exports = {
  generatePage,
};
