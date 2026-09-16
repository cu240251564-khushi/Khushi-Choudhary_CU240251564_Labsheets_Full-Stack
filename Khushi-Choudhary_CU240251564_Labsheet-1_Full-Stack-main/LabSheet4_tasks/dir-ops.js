const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'uploads');

// 1. Create uploads folder
fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Folder "uploads" created.');

  // 2. Create 3 empty files
  const files = ['file1.txt', 'file2.txt', 'file3.txt'];
  let created = 0;

  files.forEach((file) => {
    fs.writeFile(path.join(dirPath, file), '', (err) => {
      if (err) throw err;
      created++;
      
      if (created === files.length) {
        console.log('3 files created in uploads.');

        // 3. List all files in the directory
        fs.readdir(dirPath, (err, fileList) => {
          if (err) throw err;
          console.log('Files in directory:', fileList);

          // 4. Delete one file (file2.txt)
          const fileToDelete = path.join(dirPath, 'file2.txt');
          fs.unlink(fileToDelete, (err) => {
            if (err) throw err;
            console.log('file2.txt deleted.');
          });
        });
      }
    });
  });
});