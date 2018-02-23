const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, files) => {
  const filesToRemove = [];
  let i, match;

  for (i = 0; i < files.length; i += 1) {
    match = files[i].match(/xmlhttp/);
    if (match !== null) {
      filesToRemove.push(files[i]);
    }
  }

  for (i = 0; i < filesToRemove.length; i += 1) {
    fs.unlink(path.join(__dirname, '/', filesToRemove[i]), () => {});
  }
});
