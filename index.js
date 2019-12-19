#!/usr/bin/env node

const { readFileAsync } = require('./lib/readFileAsync');
const { parseFile } = require('./lib/parseFile');

(async () => {
  const fileContent = await readFileAsync(process.argv[2]);
  console.log(parseFile(fileContent));
})();
