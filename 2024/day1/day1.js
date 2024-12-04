const fs = require('fs');

const input = fs.readFileSync('day1-input.txt', 'utf8');

const inputArray = input.split('\n').map((line) => {
    return line.trim();
});

function getLeftNums(inputArray) {
    return inputArray.map((line) => {
        const num = parseInt(line.split(/\s+/)[0], 10);
        return isNaN(num) ? 0 : num; 
    });
}

function getRightNums(inputArray) {
    return inputArray.map((line) => {
        const num = parseInt(line.split(/\s+/)[1], 10);
        return isNaN(num) ? 0 : num; 
    });
}

const leftNums = getLeftNums(inputArray);
const rightNums = getRightNums(inputArray);

leftNums.sort((a, b) => a - b);
rightNums.sort((a, b) => a - b);

console.log('leftNums:', leftNums);
console.log('rightNums:', rightNums);

const totalDistanceArr = [];

for (let i = 0; i < leftNums.length; i++) {
    totalDistanceArr.push(Math.abs(leftNums[i] - rightNums[i]));
}

console.log('totalDistanceArr:', totalDistanceArr);

// sum the total distance
let totalDistance = totalDistanceArr.reduce((acc, curr) => {
    return acc + curr;
}, 0);

console.log('totalDistance:', totalDistance);


// part2
function getSimilarityScore(leftNums, rightNums) {
    const rightNumsCount = {};
    for (let i = 0; i < rightNums.length; i++) {
        if (!rightNumsCount[rightNums[i]]) {
            rightNumsCount[rightNums[i]] = 0;
        }
        rightNumsCount[rightNums[i]]++;
    }

    let similarityScore = 0;
    for (let i = 0; i < leftNums.length; i++) {
        if (rightNumsCount[leftNums[i]]) {
            similarityScore += leftNums[i] * rightNumsCount[leftNums[i]];
        }
    }

    return similarityScore;
}

console.log(getSimilarityScore(leftNums, rightNums));