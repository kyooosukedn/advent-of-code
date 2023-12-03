const fs = require('fs');

const input = fs.readFileSync("./firstDayInput.txt", {encoding: "utf-8"}).split("\n");

const numberMap = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

const reg = new RegExp(`\\d|${Array.from(numberMap.keys()).join("|")}`, "g");

const getCalibrationNumberFromString = (str) => {
  // use a matching method that only grabs the first match, then removes the first character
  // and repeats the process until no characters are left.
  // This covers the use-case `5twone` -> 5 2 1 where two and one are both contained inside "twone"
  // We will get a bunch of duplicate matches but because they're ordered, it shouldn't matter since
  // we only care about first and last digit match. 
  let matches = [];
  let substr = str;
  while (substr.length > 0) {
    const m = substr.match(reg);
    if (m && m[0]) {
      matches.push(m[0]);
    }
    substr = substr.slice(1);
  }

  const digits = matches.map((digit) => {
    const fromMap = numberMap.get(digit);
    return fromMap ?? parseFloat(digit);
  });

  if (digits.length === 0) {
    return 0;
  }
  if (digits.length === 1) {
    return parseFloat(`${digits[0]}${digits[0]}`);
  }
  return parseFloat(`${digits[0]}${digits[digits.length - 1]}`);
};

const totalCalibrationValue = input.reduce(
  (acc, curr) => acc + getCalibrationNumberFromString(curr),
  0
);

console.log(totalCalibrationValue);



