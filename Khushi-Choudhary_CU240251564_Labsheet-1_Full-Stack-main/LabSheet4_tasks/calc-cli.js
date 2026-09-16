const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('Usage: node calc-cli.js <number1> <number2> <operator>');
  console.log('Supported operators: +, -, *, /');
  process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);
const operator = args[2];

if (isNaN(num1) || isNaN(num2)) {
  console.log('Error: Both first and second arguments must be valid numbers.');
  process.exit(1);
}

let result;

switch (operator) {
  case '+':
    result = num1 + num2;
    break;
  case '-':
    result = num1 - num2;
    break;
  case '*':
    result = num1 * num2;
    break;
  case '/':
    result = num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
    break;
  default:
    result = 'Error: Invalid operator. Use +, -, *, or /';
}

console.log(`Result: ${num1} ${operator} ${num2} = ${result}`);