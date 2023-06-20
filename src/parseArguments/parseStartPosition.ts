import { Asserts } from ".";
import { Coordinates, Position } from "../RoboticRover";

const directions = ["N", "E", "S", "W"] as const;
type Direction = (typeof directions)[number];
type PositionInput = [number, number, Direction];

const assertsStartPosition: Asserts<
  (number | string)[],
  PositionInput,
  [Coordinates]
> = (value, maxCoordinates) => {
  if (value.length !== 3) {
    throw Error('Invalid starting position, e.g. "1 2 N".');
  }
  if (typeof value[0] !== "number" || typeof value[1] !== "number") {
    throw Error("Invalid coordinates, coordinates must be numbers.");
  }
  if (value[0] > maxCoordinates.x || value[1] > maxCoordinates.y) {
    throw Error(
      "Invalid starting position, coordinates must be within upper-right coordinates."
    );
  }
  if (typeof value[2] !== "string") {
    throw Error(`Invalid direction, direction must be a string.`);
  }

  const directionArg = value[2];
  if (!directions.includes(directionArg as Direction)) {
    throw Error(`Invalid direction, direction must be ${directions}.`);
  }
};

export const parseStartPosition = (
  arg: string,
  maxCoordinates: Coordinates
): Position => {
  const startPositionInput = arg.split(" ").map((value, index) => {
    return index < 2 ? parseInt(value) : value;
  });
  assertsStartPosition(startPositionInput, maxCoordinates);

  return {
    x: startPositionInput[0],
    y: startPositionInput[1],
    direction: startPositionInput[2],
  };
};
