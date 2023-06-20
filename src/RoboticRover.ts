export type Coordinates = {
  x: number;
  y: number;
};

const orderedDirections = ["N", "E", "S", "W"] as const;
export type Direction = (typeof orderedDirections)[number];

export type Position = Coordinates & {
  direction: Direction;
};

export type Instruction = "turnLeft" | "turnRight" | "move";

interface Rover extends Record<Instruction, unknown> {
  turnLeft: () => void;
  turnRight: () => void;
  move: (unit?: number) => void;
}

export class RoboticRover implements Rover {
  position: Position;

  private maxCoordinates: Coordinates;

  constructor(maxCoordinates: Coordinates, startPosition: Position) {
    this.maxCoordinates = maxCoordinates;
    this.position = startPosition;
  }

  turnLeft() {
    const directionIndex = this.getDirectionIndex();
    const newDirectionIndex =
      directionIndex > 0 ? directionIndex - 1 : orderedDirections.length - 1;

    this.position.direction = orderedDirections[newDirectionIndex];
  }

  turnRight() {
    const directionIndex = this.getDirectionIndex();
    const newDirectionIndex =
      directionIndex < orderedDirections.length - 1 ? directionIndex + 1 : 0;

    this.position.direction = orderedDirections[newDirectionIndex];
  }

  // Move in rover's direction
  move(unit = 1) {
    const roverDirection = this.position.direction;

    if (roverDirection === "N") {
      this.position.y += unit;
    }
    if (roverDirection === "E") {
      this.position.x += unit;
    }
    if (roverDirection === "S") {
      this.position.y -= unit;
    }
    if (roverDirection === "W") {
      this.position.x -= unit;
    }

    if (
      this.position.x > this.maxCoordinates.x ||
      this.position.y > this.maxCoordinates.y ||
      this.position.x < 0 ||
      this.position.y < 0
    ) {
      throw Error("Robotic Rover fell off the plateau!");
    }
  }

  private getDirectionIndex(): number {
    return orderedDirections.indexOf(this.position.direction);
  }
}
