#!/usr/bin/env node

const { parseFile } = require("./lib/parseFile");
const { generatePage } = require("./lib/generatePage");

(async () => {
  const filename = process.argv[2];
  const data = await parseFile(filename, true);
  console.log(await generatePage(data));
})();
