const fs = require('fs');
const path = require('path');

// Type definition for a direction vector
type Direction = [number, number];

class XMASFinder {
    // All possible directions to search
    private static readonly DIRECTIONS: Direction[] = [
        [0, 1],   // right
        [1, 1],   // down-right
        [1, 0],   // down
        [1, -1],  // down-left
        [0, -1],  // left
        [-1, -1], // up-left
        [-1, 0],  // up
        [-1, 1]   // up-right
    ];

    /**
     * Finds all occurrences of "XMAS" in the given grid
     * @param grid Array of strings representing the word search grid
     * @returns Number of "XMAS" occurrences found
     */
    public static findXMAS(grid: string[]): number {
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
    private static checkXMAS(grid: string[], row: number, col: number, direction: Direction): boolean {
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

// Read the input file and parse the grid
const inputFilePath = path.join(__dirname, 'day4-input.txt');
const grid = fs.readFileSync(inputFilePath, 'utf-8').trim().split('\n');

// Find and print the number of "XMAS" occurrences
const result = XMASFinder.findXMAS(grid);
console.log(`The word XMAS appears ${result} times.`);

class XMASPart2 {
    /*
    check if a 3x3 geid starting at the given position forms a valid x-mas pattern
    */

    private static isValidXMAS(grid: string[], row: number, col: number): boolean  {
        // check if we have enough space for a 3x3 pattern
        if (row + 2 >= grid.length || col + 2 >= grid[0].length) {
            return false;
        }

        // get characters in both diagonals
        const diagonal1 = [
            grid[row][col],      // top-left
            grid[row+1][col+1],  // center
            grid[row+2][col+2]   // bottom-right
        ];
        const diagonal2 = [
            grid[row][col+2],    // top-right
            grid[row+1][col+1],  // center (shared)
            grid[row+2][col]     // bottom-left
        ];

        // both diagonals must be either "MAS" or "SAM"
        const isValidDiagonal = (chars: string[]): boolean => {
            const str = chars.join('');
            return str === 'MAS' || str === 'SAM';
        };

        return diagonal1[1] === 'A' && diagonal2[1] === 'A' && (isValidDiagonal(diagonal1) && isValidDiagonal(diagonal2));
    }

    public static findXMAS(grid: string[]): number {
        if (!grid || grid.length === 0 || !grid[0]) {
            return 0;
        }

        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;

        // Check every position as a potential top-left corner of an X-MAS
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (this.isValidXMAS(grid, row, col)) {
                    count++;
                }
            }
        }
        return count;


    }
}
const part2Result = XMASPart2.findXMAS(grid);
console.log(`Found ${part2Result} X-MAS patterns in the grid.`);