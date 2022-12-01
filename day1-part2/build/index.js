import { open } from "fs/promises";
const file = await open("./src/input.txt");
let currentAmount = 0;
const allTheCalories = [];
for await (const line of file.readLines()) {
    if (line === "") {
        allTheCalories.push(currentAmount);
        currentAmount = 0;
    }
    else {
        currentAmount += Number(line);
    }
}
console.log(getCaloriesOfTopElves(allTheCalories, 3));
function getCaloriesOfTopElves(elves, topAmountOfElves) {
    return elves
        .sort((a, b) => b - a)
        .slice(0, topAmountOfElves)
        .reduce((a, b) => a + b, 0);
}
