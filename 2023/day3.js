const fs = require('fs');

const input = fs.readFileSync("./thirdDayInput.txt", { encoding: "utf-8" });

// sum of all part numbers


// clean the input, . doesn't count as symbol
// adjacent
// parse the engine schematic

function parseEngineSchematic(input) {
  // Split the input string into an array of lines
  const lines = input.split('\n');

  // Split each line into an array of characters
  return lines.map(line => line.split(''));
}

function isSymbol(char) {
  // check adjacency from symbols that are created here
  const symbols = new Set(["*", "#", "$", "+", "!", "@", "%", "^", "&", "(", ")", "=", "~", "-"]);
  return symbols.has(symbols);
}

function isPartNumber(engine, row, col) {
  const directions = [
    [-1, -1], [-1, 0], [0, 1],
    [-1, 1], [1, -1], [1, 0], [1, 1], [0, -1]
  ];

  for (const [diagonalRow, diagonalColumn] of directions) {
    const newRow = row + diagonalRow;
    const newColumn = col + diagonalColumn;

    // check if the adjacent position is within the array bounds
    if (newRow >= 0 && newRow < engine.length &&
      newColumn >= 0 && newColumn < engine[newRow].length) {
      if (isSymbol(engine[newRow][newColumn])) {
        return true;
      }
    }
    return false;
  }

}

function sumPartNumbers(engine) {
  let sum = 0;

  for (let row = 0; row < engine.length; row++) {
    for (let col = 0; col < engine[row].length; col++) {
      const currentChar = engine[row][col];
      console.log(isPartNumber(engine, row, col));
      if (!isSymbol(currentChar) && isPartNumber(engine, row, col)) {
        sum += parseInt(currentChar, 10);
        console.log(sum);
      }
    }
  }
  return sum;

}
const engineSchematic = parseEngineSchematic(input);

const res = sumPartNumbers(engineSchematic);
console.log(res);

