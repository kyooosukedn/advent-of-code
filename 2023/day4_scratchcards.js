
const fs = require("fs");

const cards = fs.readFileSync("./scratchcards.txt", { encoding: "utf8" }).split("\n").filter(x => x.length);


function toDict(numbers) {
  return numbers.reduce((dict, number) => {
    dict[number] = true;
    return dict;
  }, {});
}

/*
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
  console.log(points);

  return acc + points;
}, 0);

console.log("Sum of Points:", contents);

// Part 2 using Union Find Path Compression
// A copy of matching numbers
*/

function getPoints(x, index) {
  const values = x.split(":")[1];
  const [winners, totalNums] = values.split("|");
  const winningData = winners.split(" ").filter(x => x);
  const wDict = toDict(winningData.map(x => parseInt(x)));
  const numbers = totalNums.split(" ").map(x => parseInt(x.trim()));

  let points = 0;
  numbers.forEach(element => {
    if (wDict[element]) {
      points++;
    }
  });

  return new Array(points).fill(index + 1).map((x, i) => {
    return x + i;
  });
 }

 const toProcess = new Array(cards.length).fill(0).map((_, i) => i +1);
 const seen = {};
 const count = {};

 while (toProcess.length) {
  const index = toProcess.pop();
  count[index] = count[index] ? count[index] + 1 : 1;
  const points = seen[index] ? seen[index] : getPoints(cards[index - 1], index);
  seen[index] = points;

  toProcess.push(...points);
 }

 console.log(count, Object.keys(count).reduce((acc, x ) => {
  return acc + count[x];
 }, 0));