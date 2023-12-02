const fs = require("fs");

let data = fs.readFileSync("./firstDayInput.txt", { encoding: "utf8" });

data = data.split("\n");
let total = 0;
data.forEach((line) => {
  const numbers = line
    .split("")
    .filter((char) => Number(char))
    .join("");
  const [firstDigit = 0, lastDigit = 0] = [numbers[0], numbers[numbers.length - 1]];
  total += Number(firstDigit + lastDigit);
});

console.log(total); //56397


