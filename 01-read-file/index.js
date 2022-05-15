const fs = require('fs');
const path = require('path');
const process = require('process');
const content = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
content.on('data', data => process.stdout.write(data.trim()));