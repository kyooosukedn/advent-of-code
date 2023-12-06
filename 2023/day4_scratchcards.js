const fs = require("fs");

const input = fs.readFileSync("./scratchcards.txt", { encoding: "utf8" });


function toDict(numbers) {
  return numbers.reduce((dict, number) => {
    dict[number] = true;
    return dict;
  }, {});
}


const contents = input.split("\n").map(x => {
  const values = x.split(":")[1];
  console.log("values", values);
  const [winningNumbers, totalNums] = values.split("|").map(x => x.trim());
  const wDict = toDict(winningNumbers);

  return [wDict, totalNums.split(" ").map(x => parseInt(x.trim()))];
}).reduce((acc, [wDict, totalNums]) => {
  let points = 0;
  totalNums.forEach(x => {
    if (wDict[x]) {
      if (points === 0) {
        points = 1;
      } else {
        points <<= 1;
      }
    }
  });

  return acc;
}, 0);

console.log("Sum of Points:", contents);

