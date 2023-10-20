const fs = require('fs');
const path = require('path');

function listFilesRecursively(directoryPath) {
  
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      console.log(filePath); 
    } else if (stats.isDirectory()) {
      
      listFilesRecursively(filePath);
    }
  });
}

const startingDirectory = '/path/to/your/directory'; 

listFilesRecursively(startingDirectory);
