import * as fs from 'fs';
import path from 'path';

(function clearFileFolder() {
  const filesInsideFolder = fs.readdirSync(path.join(__dirname, './results'))
  for (let file of filesInsideFolder) {
    fs.unlinkSync(path.join(__dirname, `./results/${file}`))
  }
})()