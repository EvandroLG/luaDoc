#!/usr/bin/env node

const { readFileAsync } = require('./lib/readFileAsync');
const { parseFile } = require('./lib/parseFile');
const { generatePage } = require('./lib/generatePage');

(async () => {
  const fileContent = await readFileAsync(process.argv[2]);
  const data = parseFile(fileContent);
  console.log(await generatePage(data));
})();
