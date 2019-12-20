const path = require('path');
const { readFileAsync } = require('./readFileAsync');

const {
  isDocLine,
  isDescriptionLine,
  isParamLine,
  isReturnLine,
} = require('./identify');

const {
  normalizeDescription,
  normalizeMethod,
  normalizeReturn,
  normalizeParam,
} = require('./normalizers');

const parseFile = async filename => {
  const fileContent = await readFileAsync(filename);
  const lines = fileContent.split('\n');
  let hash = {};
  const output = {
    object: path.basename(filename, path.extname(filename)),
    items: [],
  };

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
        hash['return'] = normalizeReturn(line.split('@return')[1]);
        hash['method'] = normalizeMethod(lines[key + 1]);
        output.items.push(hash);
      }
    }
  });

  return output;
};

module.exports = {
  parseFile,
};
