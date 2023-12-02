// 
//
const fs = require('fs');
const filePath = './firstDayInput.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error: ", err);
    return;
  }

  const lines = data.split("\n");

  let totalSum = 0;
  lines.forEach(line => {
    const numbers = line.match(/\d/g);
    console.log(numbers);
    if (numbers && numbers.length >= 2) {
      const firstDigit = numbers[0];
      const lastDigit = parseInt(numbers[numbers.length - 1]);
      const calibrationValue = parseInt(`${firstDigit}${lastDigit}`);
      totalSum += calibrationValue;
    }
  });

  console.log(totalSum);
});

