const fs = require("fs");

const input = fs.readFileSync("./scratchcards.txt", { encoding: "utf8" });


function toDict(numbers) {
  return numbers.reduce((dict, number) => {
    dict[number] = true;
    return dict;
  }, {});
}


const contents = input.split("\n").filter(x => x.length).map(x => {
  const values = x.split(":")[1];
  console.log("values", values);
  const [winningNumbers, totalNums] = values.split("|");
  const winningData = winningNumbers.split(" ").filter(x => x);
  console.log(winningData);
  const winningDict = toDict(winningData.map(x => parseInt(x)));

  console.log(winningDict);

  return [winningDict, totalNums.split(" ").map(x => parseInt(x.trim()))];
}).reduce((acc, [winningDict, totalNums]) => {
  let points = 0;
  totalNums.forEach(x => {
    if (winningDict[x]) {
      if (points === 0) {
        points = 1;
      } else {
        points <<= 1;
      }
    }
  });

  return acc + points;
}, 0);

console.log("Sum of Points:", contents);



