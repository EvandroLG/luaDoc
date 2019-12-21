const validation = (param, value) => new RegExp(`^\\s+-{2}\\s+${param}`).test(value);

const isDescriptionLine = line => validation("[^@]", line);
const isParamLine = line => validation("@param", line);
const isReturnLine = line => validation("@return", line);

module.exports = {
  isDescriptionLine,
  isParamLine,
  isReturnLine
};
