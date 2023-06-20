import { parseArgs } from "./parseArguments";
import { RoboticRover } from "./RoboticRover";

const main = async () => {
  const args = process.argv.slice(2);
  const { maxCoordinates, startPosition, instructions } = parseArgs(args);

  const roboticRover = new RoboticRover(maxCoordinates, startPosition);

  instructions.forEach((instruction) => roboticRover[instruction]());

  console.log(
    `${roboticRover.position.x} ${roboticRover.position.y} ${roboticRover.position.direction}`
  );
};

main().catch((err) => {
  if (err instanceof Error) {
    console.log(err);
  }
  process.exit(1);
});
