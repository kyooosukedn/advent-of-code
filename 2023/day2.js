/*
Determine which games would have been possible
if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
What is the sum of the IDs of those games?
*/


const fs = require('fs');

const games = fs.readFileSync("./secondDayInput.txt", { encoding: "utf-8" }).trim().split("\n");

/*

function getPossibleGames(games, redCubes, greenCubes, blueCubes) {
    const possibleGames = games
    .map((game, index) => {
        const [, cubeStr] = game.match(/: (.+)/) || [];
        const cubes = cubeStr.split('; ').map(set => set.split(', '));
        const isValid = cubes.every(set => (
            set.every(cube => {
                const [count, color] = cube.split(" ");
                return (
                    (color === "red" && count <= redCubes) ||
                    (color === "green" && count <= greenCubes) || 
                    (color === "blue" && count <= blueCubes)
                );
            })
        ));  
        return isValid ? index + 1 : null;
    })
    .filter(gameIndex => gameIndex !== null);


    return possibleGames;
}

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;
const possibleGames = getPossibleGames(games,redCubes, greenCubes, blueCubes);
const sumOfIDs = possibleGames.reduce((sum, gameID) => sum + gameID, 0)

console.log(sumOfIDs);
*/


// Regular expression to match any non-numeric characters
const nonAlphanumericRegex = /[^0-9]+/;

// Utility function to remove non-numeric characters from a string
function clearString(str) {
  return str.replace(nonAlphanumericRegex, '');
}

// Main function
function solve(games) {

  let idSum = 0;
  let powerSum = 0;
  const maxGreen = 13;
  const maxRed = 12;
  const maxBlue = 14;

  let holdId = 0;

  // Iterate through each line in the input data
  for (const line of games) {
    let validGame = true;

    // Split to get game id
    const gameStr = line.split(':');

    // Iterate through each part of the line
    for (const part of gameStr) {
      if (part.includes('Game')) {
        // If part contains "Game", get the id for sum
        holdId = parseInt(clearString(part));
      } else {
        let fewRed = 0;
        let fewGreen = 0;
        let fewBlue = 0;

        // Must be the start of draw listings, split into draws
        const draws = part.split(';');

        // Iterate through each draw in the game
        for (const drawPart of draws) {
          // Split into colors
          const colors = drawPart.split(',');

          // Iterate through each color in the draw
          for (const colorPart of colors) {
            if (colorPart.includes('green')) {
              const colorCount = parseInt(clearString(colorPart));
              if (colorCount > maxGreen) {
                validGame = false;
              }
              if (colorCount > fewGreen) {
                fewGreen = colorCount;
              }
            }
            if (colorPart.includes('red')) {
              const colorCount = parseInt(clearString(colorPart));
              if (colorCount > maxRed) {
                validGame = false;
              }
              if (colorCount > fewRed) {
                fewRed = colorCount;
              }
            }
            if (colorPart.includes('blue')) {
              const colorCount = parseInt(clearString(colorPart));
              if (colorCount > maxBlue) {
                validGame = false;
              }
              if (colorCount > fewBlue) {
                fewBlue = colorCount;
              }
            }
          }
        }

        // Calculate power sum and check if the game is valid
        powerSum += fewBlue * fewRed * fewGreen;
        if (validGame) {
          idSum += holdId;
        }
      }
    }
  }

  // Print the results
  console.log('Valid Game Sum:', idSum);
  console.log('Power Sum:', powerSum);
}

// Call the main function
solve(games);

