const fs = require("fs");

const input = fs.readFileSync("./day5Input.txt", { encoding: "utf8" }).split("\n\n");

const seeds = extractSeeds(input[0]);

// Extract maps from the input and convert them to nested arrays of integers
const maps = extractMaps(input.slice(1));

// Array to store the results
const resultArray = [];

// Recursive function to translate a seed through the maps
function translate(index, value) {
  if (index === maps.length) {
    return value;
  }

  for (const [destination, source, range] of maps[index]) {
    if (isInRange(value, source, range)) {
      return translate(index + 1, destination + value - source);
    }
  }

  return translate(index + 1, value);
}

// Translate each seed and store the result in the resultArray
for (const seed of seeds) {
  resultArray.push(translate(0, seed));
}

console.log(findMin(resultArray));

function extractSeeds(inputLine) {
  return inputLine.split(": ")[1].split(" ").map(Number);
}

// Function to extract maps from the input
function extractMaps(inputLines) {
  return inputLines.map(extractMap);
}

// Function to extract a map from a set of lines
function extractMap(mapLines) {
  return mapLines.split("\n").slice(1).map(splitAndMapToInt);
}

// Function to split a string and map each part to an integer
function splitAndMapToInt(str) {
  return str.split(" ").map(Number);
}

// Function to check if a value is in a specific range
function isInRange(value, start, length) {
  return start <= value && value < start + length;
}

// Function to find the minimum value in an array
function findMin(array) {
  return Math.min(...array);
}

