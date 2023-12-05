const fs = require('fs');

const input = fs.readFileSync("./thirdDayInput.txt", { encoding: "utf-8" });

function parse(s) {
  const entities = [];
  for (const [y, line] of s.split('\n').entries()) {
    for (const m of line.matchAll(/\d+/g))
      entities.push({ type: 'number', x: m.index, y, token: m[0], value: +m[0] });

    for (const m of line.matchAll(/[^0-9\.]/g))
      entities.push({ type: 'symbol', x: m.index, y, token: m[0] });
  }
  return entities;
}

function adjacent(numberEntity, symbolEntity) {
  const x0 = numberEntity.x - 1;
  const x1 = numberEntity.x + numberEntity.token.length;
  const y0 = numberEntity.y - 1;
  const y1 = numberEntity.y + 1;
  return (
    symbolEntity.x >= x0 &&
    symbolEntity.x <= x1 &&
    symbolEntity.y >= y0 &&
    symbolEntity.y <= y1
  );
}

function part1(entities) {
  const numbers = entities.filter((e) => e.type === 'number');
  const symbols = entities.filter((e) => e.type === 'symbol');

  return numbers
    .filter((n) => symbols.some((s) => adjacent(n, s)))
    .map((n) => n.value)
    .reduce((a, b) => a + b, 0);
}

function part2(entities) {
  const numbers = entities.filter((e) => e.type === 'number');
  const symbols = entities.filter((e) => e.type === 'symbol');

  return symbols.filter(symbol => symbol.token === '*')
    .map((symbol) => {
      const adjacentNumbers = numbers.filter((number) => adjacent(number, symbol)).map((n) => n.value)
      return adjacentNumbers.length === 2 ? adjacentNumbers[0] * adjacentNumbers[1] : 0
    })
    .reduce((a, b) => a + b, 0)
}

const entities = parse(input);
const resPart1 = part1(entities);
const resPart2 = part2(entities);
console.log(resPart1);
console.log(resPart2);

