"use strict";
const fs = require('fs');
const path = require('path');
class XMASFinder {
    /**
     * Finds all occurrences of "XMAS" in the given grid
     * @param grid Array of strings representing the word search grid
     * @returns Number of "XMAS" occurrences found
     */
    static findXMAS(grid) {
        if (!grid || grid.length === 0 || !grid[0]) {
            return 0;
        }
        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;
        // Check every position as a potential starting point
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // From each position, check all directions
                for (const direction of this.DIRECTIONS) {
                    if (this.checkXMAS(grid, row, col, direction)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    /**
     * Checks if "XMAS" exists starting from a position in a given direction
     * @param grid Array of strings representing the word search grid
     * @param row Starting row position
     * @param col Starting column position
     * @param direction Direction vector to search
     * @returns True if "XMAS" is found, otherwise false
     */
    static checkXMAS(grid, row, col, direction) {
        const word = 'XMAS';
        const rows = grid.length;
        const cols = grid[0].length;
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * direction[0];
            const newCol = col + i * direction[1];
            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }
}
// All possible directions to search
XMASFinder.DIRECTIONS = [
    [0, 1], // right
    [1, 1], // down-right
    [1, 0], // down
    [1, -1], // down-left
    [0, -1], // left
    [-1, -1], // up-left
    [-1, 0], // up
    [-1, 1] // up-right
];
// Read the input file and parse the grid
const inputFilePath = path.join(__dirname, '../day4-input.txt');
const grid = fs.readFileSync(inputFilePath, 'utf-8').trim().split('\n');
// Find and print the number of "XMAS" occurrences
const result = XMASFinder.findXMAS(grid);
console.log(`The word XMAS appears ${result} times.`);
