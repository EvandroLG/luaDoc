const isDocLine = line => /^\s+-{2}\s+@/.test(line);
const isDescriptionLine = line => /^\s+-{2}\s+[^@]/.test(line);
const isParamLine = line => /^\s+-{2}\s+@param/.test(line);
const isReturnLine = line => /^\s+-{2}\s+@return/.test(line);

const normalizeDescription = value => value.replace(/^\s+-{2}\s+/, '');
const normalizeReturn = value => value.replace(/\s+{/, '').replace('}', '');
const normalizeParam = value =>
  value
    .replace(/\s+\{/g, ':')
    .replace('}', '')
    .replace(/^\s/, '');

const parseFile = data => {
  const lines = data.split('\n');
  const output = [];
  let hash = {};

  lines.forEach((line, key) => {
    if (isDocLine(line)) {
      if (isDescriptionLine(lines[key - 1])) {
        hash = {};
        hash.description = normalizeDescription(lines[key - 1]);
      } else if (isParamLine(line)) {
        const param = normalizeParam(line.split('@param')[1]);
        hash.params = hash.params || [];
        hash.params.push(param);
      } else if (isReturnLine(line)) {
        hash.return = normalizeReturn(line.split('@return')[1]);
        output.push(hash);
      }
    }
  });

  return output;
};

module.exports = {
  parseFile,
};
