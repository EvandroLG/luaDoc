const fs = require('fs');

const readFileAsync = async filename => {
  const fileData = await fs.promises.readFile(filename, 'utf8');
  return fileData;
};

module.exports = {
  readFileAsync,
};
