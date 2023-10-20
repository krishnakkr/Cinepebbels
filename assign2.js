const fs = require('fs');

function readTextFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null); 
    } else {
      callback(null, data); 
    }
  });
}

// Example usage:
const filePath = 'yourfile.txt'; 

readTextFile(filePath, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File contents:', data);
  }
});
