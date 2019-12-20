const isDocLine = line => /^\s+-{2}\s+@/.test(line);
const isDescriptionLine = line => /^\s+-{2}\s+[^@]/.test(line);
const isParamLine = line => /^\s+-{2}\s+@param/.test(line);
const isReturnLine = line => /^\s+-{2}\s+@return/.test(line);

module.exports = {
  isDocLine,
  isDescriptionLine,
  isParamLine,
  isReturnLine,
};
