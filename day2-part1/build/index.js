// Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.
// The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.
// The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
// Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide. You can use the same strategy guide for each round of the tournament.
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
    const [opponent, player] = line.split(" ");
    const points = getPoints(player, opponent);
    totalPoints += points;
}
console.log(totalPoints);
function getPoints(player, opponent) {
    const playerShape = getShape(player);
    const opponentShape = getShape(opponent);
    const roundPoints = calculateRoundPoints(playerShape, opponentShape);
    const playerPoints = getPointsForShape(playerShape);
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
