const fs = require('fs');

async function readFiles(filename) {
  console.log('file name in readFile.js', filename)
  try{
    const data = await fs.promises.readFile(filename, 'utf-8');
    return !data ? [] : JSON.parse(data)
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = readFiles;