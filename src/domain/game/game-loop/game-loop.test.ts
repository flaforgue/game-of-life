import { ClockDummy } from "../../../infrastructure/clock/clock.dummy";
import { LoopSchedulerDummy } from "../../../infrastructure/loop-scheduler/dummy/loop-scheduler.dummy";
import { GameLoop } from "./game-loop";

describe("game-loop", () => {
  function buildSUT(): GameLoop {
    return new GameLoop(new LoopSchedulerDummy(), new ClockDummy());
  }

  describe("loop strategy", () => {
    it("should be the given strategy by default", () => {
      const givenLoopStrategy = new LoopSchedulerDummy("givenLoopScheduler");

      const gameLoop = new GameLoop(givenLoopStrategy, new ClockDummy());

      expect(gameLoop.loopSchedulerStrategyName).toStrictEqual(
        "givenLoopScheduler",
      );
    });

    it("should change loop strategy when setLoopScheduler is called", () => {
      const gameLoop = buildSUT();
      const newDummyLoopScheduler = new LoopSchedulerDummy(
        "new-dummyLoopScheduler",
      );

      gameLoop.setLoopScheduler(newDummyLoopScheduler);

      expect(gameLoop.loopSchedulerStrategyName).toStrictEqual(
        "new-dummyLoopScheduler",
      );
    });
  });

  describe("speed", () => {
    it("should be 2 by default", () => {
      const gameLoop = buildSUT();

      expect(gameLoop.speedLevel).toStrictEqual("2");
    });

    it("should change speed level when setSpeedLevel is called", () => {
      const gameLoop = buildSUT();

      gameLoop.setSpeedLevel("1");

      expect(gameLoop.speedLevel).toStrictEqual("1");
    });
  });

  describe("paused state", () => {
    it("should be paused by default", () => {
      const gameLoop = buildSUT();

      expect(gameLoop.isPaused).toStrictEqual(true);
    });

    it("should start", () => {
      const gameLoop = buildSUT();

      gameLoop.start(() => {
        return;
      });

      expect(gameLoop.isPaused).toStrictEqual(false);
    });

    it("should stop", () => {
      const gameLoop = buildSUT();
      gameLoop.start(() => {
        return;
      });

      gameLoop.stop();

      expect(gameLoop.isPaused).toStrictEqual(true);
    });
  });
});
