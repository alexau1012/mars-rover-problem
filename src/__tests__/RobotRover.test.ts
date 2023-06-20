import { RoboticRover } from "../RoboticRover";

describe("Robotic Rover", () => {
  describe("Rover is facing North", () => {
    const rover = new RoboticRover(
      { x: 5, y: 5 },
      { x: 1, y: 1, direction: "N" }
    );
    it("should face west after turning left", () => {
      rover.turnLeft();
      expect(rover.position.direction).toEqual("W");
    });
  });
});
