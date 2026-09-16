const add = require('./sum');
const checkEvenOdd = require('./even-odd');

const num1 = 12;
const num2 = 5;

console.log(`Sum of ${num1} and ${num2}:`, add(num1, num2));
console.log(`${num1} is:`, checkEvenOdd(num1));
console.log(`${num2} is:`, checkEvenOdd(num2));