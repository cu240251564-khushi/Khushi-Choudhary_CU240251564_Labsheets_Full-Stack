const fs = require('fs');

// 1. Create and write name and roll number
fs.writeFile('student.txt', 'Name: Alex Mercer\nRoll No: 101\n', (err) => {
  if (err) throw err;
  console.log('student.txt created and initial data written.');

  // 2. Append course name
  fs.appendFile('student.txt', 'Course: Computer Science\n', (err) => {
    if (err) throw err;
    console.log('Course name appended.');

    // 3. Read and print file content
    fs.readFile('student.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log('\n--- Student Details ---');
      console.log(data);

      // 4. Rename file to profile.txt
      fs.rename('student.txt', 'profile.txt', (err) => {
        if (err) throw err;
        console.log('File successfully renamed to profile.txt');
      });
    });
  });
});