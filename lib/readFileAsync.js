const fs = require("fs");

const readFileAsync = async (filename) => {
  const fileData = await fs.promises.readFile(filename, "utf8");
  return fileData;
};

const writeFileAsync = (data) => {
  return fs.promises.writeFile("./doc.html", data);
};

module.exports = {
  readFileAsync,
  writeFileAsync,
};
