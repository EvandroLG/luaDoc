const path = require("path");
const { readFileAsync } = require("./readFileAsync");
const { isDescriptionLine, isParamLine, isReturnLine } = require("./identify");
const {
  normalizeDescription,
  normalizeMethod,
  normalizeReturn,
  normalizeParam,
} = require("./normalizers");

const getLines = async (filename) => {
  const fileContent = await readFileAsync(filename);
  return fileContent.split("\n");
};

const getTokens = (lines) => {
  let hash = {};

  return lines.reduce((tokens, line, i) => {
    if (isDescriptionLine(lines[i - 1])) {
      hash = {};
      hash.description = normalizeDescription(lines[i - 1]);
    }

    if (isParamLine(line)) {
      const param = normalizeParam(line);
      hash.params = hash.params || [];
      hash.params.push(param);
    } else if (isReturnLine(line)) {
      hash["return"] = normalizeReturn(line);
      hash["method"] = normalizeMethod(lines[i + 1]);
      tokens.push(hash);
    }

    return tokens;
  }, []);
};

const sort = (items) => {
  const toLowerCase = (obj) => obj.method.toLowerCase();

  return [...items].sort((_a, _b) => {
    const a = toLowerCase(_a);
    const b = toLowerCase(_b);

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  });
};

const parseFile = async (filename, shouldSort) => {
  const lines = await getLines(filename);
  const items = getTokens(lines);

  return {
    object: path.basename(filename, path.extname(filename)),
    items: shouldSort ? sort(items) : items,
  };
};

module.exports = {
  parseFile,
};
