import { open } from "fs/promises";
var Shape;
(function (Shape) {
    Shape["ROCK"] = "ROCK";
    Shape["PAPER"] = "PAPER";
    Shape["SCISSORS"] = "SCISSORS";
})(Shape || (Shape = {}));
const file = await open("./src/input.txt");
let totalPoints = 0;
for await (const line of file.readLines()) {
    const [opponent, roundResult] = line.split(" ");
    const opponentShape = getShape(opponent);
    const playerShape = getShapeFromRoundResult(opponentShape, roundResult);
    const points = getPoints(playerShape, opponentShape);
    totalPoints += points;
}
console.log(totalPoints);
function getShapeFromRoundResult(opponentShape, roundResult) {
    switch (opponentShape) {
        case Shape.ROCK:
            return roundResult === "X" ? Shape.SCISSORS : roundResult === "Y" ? Shape.ROCK : Shape.PAPER;
        case Shape.PAPER:
            return roundResult === "X" ? Shape.ROCK : roundResult === "Y" ? Shape.PAPER : Shape.SCISSORS;
        case Shape.SCISSORS:
            return roundResult === "X" ? Shape.PAPER : roundResult === "Y" ? Shape.SCISSORS : Shape.ROCK;
        default:
            throw new Error("Unexpected shape");
    }
}
function getPoints(player, opponent) {
    const roundPoints = calculateRoundPoints(player, opponent);
    const playerPoints = getPointsForShape(player);
    return roundPoints + playerPoints;
}
function calculateRoundPoints(player, opponent) {
    const tie = player === opponent;
    if (tie) {
        return 3;
    }
    const win = (player === Shape.ROCK && opponent === Shape.SCISSORS) ||
        (player === Shape.PAPER && opponent === Shape.ROCK) ||
        (player === Shape.SCISSORS && opponent === Shape.PAPER);
    if (win) {
        return 6;
    }
    return 0;
}
function getShape(shape) {
    switch (shape) {
        case "A":
        case "X":
            return Shape.ROCK;
        case "B":
        case "Y":
            return Shape.PAPER;
        case "C":
        case "Z":
            return Shape.SCISSORS;
        default:
            throw new Error(`Unsupported shape: ${shape}`);
    }
}
function getPointsForShape(shape) {
    switch (shape) {
        case Shape.ROCK:
            return 1;
        case Shape.PAPER:
            return 2;
        case Shape.SCISSORS:
            return 3;
        default:
            throw new Error(`Unsupported shape: ${shape}`);
    }
}
