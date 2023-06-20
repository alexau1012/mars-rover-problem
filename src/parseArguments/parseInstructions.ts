import { Asserts } from ".";
import { Instruction } from "../RoboticRover";

const instructionsMap = {
  L: "turnLeft",
  R: "turnRight",
  M: "move",
} as const;

type InstructionInput = keyof typeof instructionsMap;

const assertsInstructions: Asserts<string[], InstructionInput[]> = (value) => {
  value.map((instruction) => {
    if (!Object.keys(instructionsMap).includes(instruction)) {
      throw Error(
        `Invalid instructions, instruction must be ${Object.keys(
          instructionsMap
        )}.`
      );
    }
  });
};

export const parseInstructions = (arg: string): Instruction[] => {
  const InstructionsInput = arg.split("");
  assertsInstructions(InstructionsInput);

  const instructions = InstructionsInput.map(
    (instruction) => instructionsMap[instruction]
  );

  return instructions;
};
