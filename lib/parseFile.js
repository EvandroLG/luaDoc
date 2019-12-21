const path = require('path');
const { readFileAsync } = require('./readFileAsync');

const {
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

const getLines = async (filename) => {
  const fileContent = await readFileAsync(filename);
  return fileContent.split('\n');
};

const getTokens = (lines) => {
  let hash = {};
  const tokens = [];

  lines.forEach((line, i) => {
    if (isDescriptionLine(lines[i - 1])) {
      hash = {};
      hash.description = normalizeDescription(lines[i - 1]);
    }

    if (isParamLine(line)) {
      const param = normalizeParam(line);
      hash.params = hash.params || [];
      hash.params.push(param);
    } else if (isReturnLine(line)) {
      hash['return'] = normalizeReturn(line);
      hash['method'] = normalizeMethod(lines[i + 1]);
      tokens.push(hash);
    }
  });

  return tokens;
};

const parseFile = async filename => {
  const lines = await getLines(filename);
  const output = {
    object: path.basename(filename, path.extname(filename)),
    items: getTokens(lines),
  };

  return output;
};

module.exports = {
  parseFile,
};
