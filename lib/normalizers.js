const normalizeDescription = value => value.replace(/^\s+-{2}\s+/, '');
const normalizeMethod = value => value.match(/\s+(\w+)/)[1];
const normalizeReturn = value => value.match(/{(.*?)}/)[1];

const normalizeParam = value =>
  value
    .match(/\w+\s+{.*}/)
    .pop()
    .replace(/\s+{/, ':')
    .slice(0, -1);

module.exports = {
  normalizeDescription,
  normalizeMethod,
  normalizeReturn,
  normalizeParam,
};
