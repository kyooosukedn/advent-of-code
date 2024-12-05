const fs = require('fs');

const input = fs.readFileSync('day2-input.txt', 'utf8');

const lines = input.split('\n');

//console.log("Lines: " + lines);

const inputArray = lines.map((line) => {
    return line.trim().split(' ').map(Number);
});

console.log("Input Arr:" + inputArray);

function getSafeReports(inputArray) {
    let safeReports = 0;
    
    inputArray.forEach(row => {
        if (row.length < 2) {
            return; // not enough levels
        }
        let isDecreasing = true;
        let isIncreasing = true;
        let isSafe = true;

        for (let i = 1; i < row.length; i++) {
            if (row[i] > row[i - 1]) {
                isDecreasing = false;
            } else if (row[i] < row[i - 1]) {
                isIncreasing = false;
            }

            if (Math.abs(row[i] - row[i - 1]) < 1 || Math.abs(row[i] - row[i - 1]) > 3) {
                isSafe = false;
            }
        }

        if (!isIncreasing && !isDecreasing) {
            isSafe = false;
        }

        if ((isIncreasing || isDecreasing) && isSafe) {
            safeReports++;
        }
    })

console.log("TotalSafe Reports: " + safeReports);
}

getSafeReports(inputArray);

// part 2

function isReportSafe(row) {
    if (row.length < 2) {
        return false;
    }

    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < row.length; i++) {
        const diff = row[i] - row[i - 1];
        const absDiff = Math.abs(diff);

        if (absDiff < 1 || absDiff > 3) {
            return false;
        }

        if (diff > 0) {
            isDecreasing = false;
        } else if (diff < 0) {
            isIncreasing = false;
        } else {
            // Levels are equal
            return false;
        }

        if (!isIncreasing && !isDecreasing) {
            return false;
        }
    }

    return true;
}

function getSafeReportsWithDampener(inputArray) {
    let safeReports = 0;

    inputArray.forEach(row => {
        if (isReportSafe(row)) {
            safeReports++;
        } else {
            let reportIsSafe = false;
            for (let i = 0; i < row.length; i++) {
                const modifiedRow = row.slice(0, i).concat(row.slice(i + 1));
                if (isReportSafe(modifiedRow)) {
                    reportIsSafe = true;
                    break;
                }
            }
            if (reportIsSafe)  {
                safeReports++;
            }
        }

    })
    console.log("Total safe reports: " + safeReports)
};



getSafeReportsWithDampener(inputArray);