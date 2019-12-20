const normalizeDescription = value => value.replace(/^\s+-{2}\s+/, '');
const normalizeMethod = value => value.split('=')[0].trim();
const normalizeReturn = value => value.replace(/\s+{/, '').replace('}', '');
const normalizeParam = value =>
  value
    .replace(/\s+\{/g, ':')
    .replace('}', '')
    .replace(/^\s/, '');

module.exports = {
  normalizeDescription,
  normalizeMethod,
  normalizeReturn,
  normalizeParam,
};
