import { Asserts } from ".";
import { Coordinates } from "../RoboticRover";

export type MaxCoordinatesInput = [number, number];

const assertsMaxCoordinates: Asserts<number[], MaxCoordinatesInput> = (
  value
) => {
  if (value.length !== 2) {
    throw Error('Invalid max coordinates, e.g. "5 5".');
  }
  if (
    typeof value[0] !== "number" ||
    typeof value[1] !== "number" ||
    Number.isNaN(value[0]) ||
    Number.isNaN(value[1])
  ) {
    throw Error("Invalid max coordinates, coordinates must be numbers.");
  }
};

export const parseMaxCoordinates = (arg: string): Coordinates => {
  const maxCoordinatesInput = arg.split(" ").map((value) => parseInt(value));
  assertsMaxCoordinates(maxCoordinatesInput);

  const maxCoordinates: Coordinates = {
    x: maxCoordinatesInput[0],
    y: maxCoordinatesInput[1],
  };

  return maxCoordinates;
};
