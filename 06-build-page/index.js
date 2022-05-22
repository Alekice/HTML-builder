const { join } = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');

const projectDist = join(__dirname, 'project-dist');
const stylesFile = join(projectDist, 'style.css');
const assetsFolder = join(__dirname, 'assets');
const assetsFolderCopied = join(projectDist, 'assets');
const componentsFolder = join(__dirname, 'components');

const components = ['header', 'articles', 'footer'];

fs.mkdir(projectDist, { recursive: true }, err => {
  if (err) {
    console.log(err);
  }
});

fs.mkdir(assetsFolderCopied, { recursive: true }, err => {
  if (err) {
    console.log(err);
  }
});

const input = fs.createReadStream(join(__dirname, 'template.html'), 'utf-8');
const output = fs.createWriteStream(join(projectDist, 'index.html'));

input.on('data', chunk => {

  let text = chunk.toString();

  for (let i = 0; i < components.length; i++) {
    const input = fs.createReadStream(join(componentsFolder, `${components[i]}.html`), 'utf-8');
    input.on('data', chunk => {
      let data = chunk.toString();
      let replaced = text.replace(`{{${components[i]}}}`, data);
      text = replaced;

      if (i === components.length - 1) {
        output.write(text);
      }
    });   
  }
});


(async function (path) {

  (async function (path) {

    try {

      const dirs = await readdir(path);

      for (const dir of dirs) {
        fs.mkdir(join(assetsFolderCopied, dir), { recursive: true }, err => {
          if (err) {
            console.log(err);
          }
        });

        (async function (path) {

          (async function (path) {
            try {

              const files = await readdir(path);
              
              for (const file of files) {
                fs.unlink(`${join(assetsFolderCopied, dir)}/${file}`, err => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            } catch (err) {
              console.error(err);
            }
          })(join(assetsFolderCopied, dir));

          try {

            const files = await readdir(path);
            
            for (const file of files) {
              fs.copyFile(`${join(assetsFolder, dir)}/${file}`, `${join(assetsFolderCopied, dir)}/${file}`, err => {
                if (err) {
                  console.log(err);
                }
              });
            }
          } catch (err) {
            console.error(err);
          }
        })(join(assetsFolder, dir));
      }
    } catch (err) {
      console.error(err);
    }
  })(assetsFolder);

  try {
    const styleFiles = await readdir(path);
    const output = fs.createWriteStream(stylesFile);
    
    for (const file of styleFiles) {
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