var fs = require('fs');
var path = require('path');
var XMASFinder = /** @class */ (function () {
    function XMASFinder() {
    }
    /**
     * Finds all occurrences of "XMAS" in the given grid
     * @param grid Array of strings representing the word search grid
     * @returns Number of "XMAS" occurrences found
     */
    XMASFinder.findXMAS = function (grid) {
        if (!grid || grid.length === 0 || !grid[0]) {
            return 0;
        }
        var rows = grid.length;
        var cols = grid[0].length;
        var count = 0;
        // Check every position as a potential starting point
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                // From each position, check all directions
                for (var _i = 0, _a = this.DIRECTIONS; _i < _a.length; _i++) {
                    var direction = _a[_i];
                    if (this.checkXMAS(grid, row, col, direction)) {
                        count++;
                    }
                }
            }
        }
        return count;
    };
    /**
     * Checks if "XMAS" exists starting from a position in a given direction
     * @param grid Array of strings representing the word search grid
     * @param row Starting row position
     * @param col Starting column position
     * @param direction Direction vector to search
     * @returns True if "XMAS" is found, otherwise false
     */
    XMASFinder.checkXMAS = function (grid, row, col, direction) {
        var word = 'XMAS';
        var rows = grid.length;
        var cols = grid[0].length;
        for (var i = 0; i < word.length; i++) {
            var newRow = row + i * direction[0];
            var newCol = col + i * direction[1];
            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    };
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
    return XMASFinder;
}());
// Read the input file and parse the grid
var inputFilePath = path.join(__dirname, 'day4-input.txt');
var grid = fs.readFileSync(inputFilePath, 'utf-8').trim().split('\n');
// Find and print the number of "XMAS" occurrences
var result = XMASFinder.findXMAS(grid);
console.log("The word XMAS appears ".concat(result, " times."));
