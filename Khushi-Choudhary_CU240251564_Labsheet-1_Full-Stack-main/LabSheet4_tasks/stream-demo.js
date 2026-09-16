const fs = require('fs');

const fileName = 'large-file.txt';

// Step 1: Create a file with at least 50 lines
const writeStream = fs.createWriteStream(fileName);
for (let i = 1; i <= 60; i++) {
  writeStream.write(`Line ${i}: This is a long string of text written to simulate data processing via Node.js streams.\n`);
}
writeStream.end();

writeStream.on('finish', () => {
  console.log(`${fileName} successfully created. Now reading via stream...\n`);

  // Step 2: Read back using ReadStream
  const readStream = fs.createReadStream(fileName, { highWaterMark: 256 }); // Low buffer limit to trigger multiple chunks

  let chunkCount = 0;

  readStream.on('data', (chunk) => {
    chunkCount++;
    console.log(`Received Chunk #${chunkCount} | Size: ${chunk.length} bytes`);
  });

  readStream.on('end', () => {
    console.log(`\nFinished reading. Total chunks processed: ${chunkCount}`);
  });
});