/*
Determine which games would have been possible
if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
What is the sum of the IDs of those games?
*/


const fs = require('fs');

const games = fs.readFileSync("./secondDayInput.txt", {encoding: "utf-8"}).trim().split("\n");

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

