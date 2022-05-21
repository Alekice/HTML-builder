const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');

const dirToCopy = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

fs.mkdir(destination, { recursive: true }, err => {
  if (err) {
    console.log(err);
  }
});

(async function (path) {

  (async function (path) {
    try {

      const files = await readdir(path);
      
      for (const file of files) {
        fs.unlink(`${destination}/${file}`, err => {
          if (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  })(destination);

  try {

    const files = await readdir(path);
    
    for (const file of files) {
      fs.copyFile(`${dirToCopy}/${file}`, `${destination}/${file}`, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
})(dirToCopy);