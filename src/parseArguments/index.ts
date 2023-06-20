import { Coordinates, Direction, Instruction, Position } from "../RoboticRover";
import { parseInstructions } from "./parseInstructions";
import { parseMaxCoordinates } from "./parseMaxCoordinates";
import { parseStartPosition } from "./parseStartPosition";

export type Asserts<
  Input,
  Output extends Input,
  Arg extends unknown[] = unknown[]
> = (value: Input, ...arg: Arg) => asserts value is Output;

export const parseArgs = (args: string[]) => {
  const [maxCoordinatesArg, startPositionArg, instructionsArg] = args;

  const missingArg =
    !maxCoordinatesArg || !startPositionArg || !instructionsArg;
  if (missingArg) {
    throw Error(
      "Must pass max coordinates, start position and instructions arguments respectively to script."
    );
  }

  const maxCoordinates = parseMaxCoordinates(maxCoordinatesArg);
  const startPosition = parseStartPosition(startPositionArg, maxCoordinates);

  return {
    maxCoordinates,
    startPosition,
    instructions: parseInstructions(instructionsArg),
  };
};
