const { join } = require('path');
const { stat } = require('fs');
const { readdir } = require('fs/promises');


(async function (path) {
  try {
    const files = await readdir(path);
    
    for (const file of files) {
      const fullPath = join(__dirname, 'secret-folder', file);
      stat(fullPath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.isFile()) {
          console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${stats.size / 1000}kb`);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
})(join(__dirname, 'secret-folder'));