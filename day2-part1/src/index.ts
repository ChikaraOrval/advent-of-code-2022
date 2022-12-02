import { open } from "fs/promises";

enum Shape {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

const file = await open("./src/input.txt");
let totalPoints = 0;

for await (const line of file.readLines()) {
  const [opponent, player] = line.split(" ");
  const points = getPoints(player, opponent);
  totalPoints += points;
}

console.log(totalPoints);

function getPoints(player: string, opponent: string) {
  const playerShape = getShape(player);
  const opponentShape = getShape(opponent);

  const roundPoints = calculateRoundPoints(playerShape, opponentShape);
  const playerPoints = getPointsForShape(playerShape);

  return roundPoints + playerPoints;
}

function calculateRoundPoints(player: Shape, opponent: Shape) {
  const tie = player === opponent;

  if (tie) {
    return 3;
  }

  const win =
    (player === Shape.ROCK && opponent === Shape.SCISSORS) ||
    (player === Shape.PAPER && opponent === Shape.ROCK) ||
    (player === Shape.SCISSORS && opponent === Shape.PAPER);

  if (win) {
    return 6;
  }

  return 0;
}

function getShape(shape: string) {
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

function getPointsForShape(shape: Shape) {
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
