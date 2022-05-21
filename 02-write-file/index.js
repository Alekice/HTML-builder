const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Введите текст:');

rl.on('line', (line) => {
  if (line === 'exit') {
    process.exit();
  } else {
    writeStream.write(line + '\n');
  }
});

process.on('exit', () => console.log('Ввод текста завершен, спасибо!'));