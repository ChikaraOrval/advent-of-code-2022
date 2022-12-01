import { open } from "fs/promises";
const file = await open("./src/input.txt");
let maxAmount = 0;
let currentAmount = 0;
for await (const line of file.readLines()) {
    if (line === "") {
        maxAmount = Math.max(maxAmount, currentAmount);
        currentAmount = 0;
    }
    else {
        currentAmount += Number(line);
    }
}
maxAmount = Math.max(maxAmount, currentAmount);
console.log(maxAmount);
