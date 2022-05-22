const { join } = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');


(async function (path) {
  try {
    const files = await readdir(path);
    const output = fs.createWriteStream(join(__dirname, 'project-dist','bundle.css'));
    
    for (const file of files) {
      const fullPath = join(__dirname, 'styles', file);
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.isFile() && file.split('.')[1] === 'css') {
          const input = fs.createReadStream(fullPath, 'utf-8');
          input.on('data', chunk => output.write(chunk));
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
})(join(__dirname, 'styles'));