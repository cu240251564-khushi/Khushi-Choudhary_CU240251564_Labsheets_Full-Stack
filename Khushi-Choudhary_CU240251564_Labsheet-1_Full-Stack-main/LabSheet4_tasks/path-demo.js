const path = require('path');

const samplePath = '/home/user/data/report.pdf';

console.log('Directory Name:', path.dirname(samplePath));
console.log('Base Name:', path.basename(samplePath));
console.log('Extension:', path.extname(samplePath));

// Resolve absolute path from a relative path
const relativePath = './docs/file.txt';
console.log('Resolved Absolute Path:', path.resolve(relativePath));