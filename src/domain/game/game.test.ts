import { Cell } from "./cell/cell";
import { Grid } from "./grid/grid";
import { Game } from "./game";
import { GridRendererDummy } from "../../infrastructure/grid-renderer/dummy/grid-renderer.dummy";
import { LoopSchedulerDummy } from "../../infrastructure/loop-scheduler/dummy/loop-scheduler.dummy";
import { ClockDummy } from "../../infrastructure/clock/clock.dummy";

describe("game", () => {
  function buildSUT(grid: Grid = new Grid([])): Game {
    return new Game(
      grid,
      new GridRendererDummy(),
      new LoopSchedulerDummy(),
      new ClockDummy(),
    );
  }

  describe("update", () => {
    it("should update the grid", () => {
      const grid = new Grid([[new Cell("alive")]]);
      const game = buildSUT(grid);

      game.update();

      expect(grid.cells[0][0].currentState).toStrictEqual("dead");
    });
  });

  describe("paused state", () => {
    it("should be paused by default", () => {
      const game = buildSUT();

      expect(game.isPaused).toStrictEqual(true);
    });

    it("should start", () => {
      const game = buildSUT();

      game.start();

      expect(game.isPaused).toStrictEqual(false);
    });

    it("should stop", () => {
      const game = buildSUT();
      game.start();

      game.stop();

      expect(game.isPaused).toStrictEqual(true);
    });
  });

  describe("speed", () => {
    it("should be 2 by default", () => {
      const game = buildSUT();

      expect(game.speedLevel).toStrictEqual("2");
    });

    it("should change speed level when setSpeedLevel is called", () => {
      const game = buildSUT();

      game.setSpeedLevel("1");

      expect(game.speedLevel).toStrictEqual("1");
    });
  });

  describe("render strategy", () => {
    it("should be the given strategy by default", () => {
      const givenGridRenderer = new GridRendererDummy("givenGridRenderer");

      const game = new Game(
        new Grid([[]]),
        givenGridRenderer,
        new LoopSchedulerDummy(),
        new ClockDummy(),
      );

      expect(game.renderStrategyName).toStrictEqual("givenGridRenderer");
    });

    it("should change render strategy when setRenderStrategy is called", () => {
      const game = buildSUT();
      const newDummyGridRenderer = new GridRendererDummy(
        "new-dummyGridRenderer",
      );

      game.setGridRenderer(newDummyGridRenderer);

      expect(game.renderStrategyName).toStrictEqual("new-dummyGridRenderer");
    });
  });

  describe("loop strategy", () => {
    it("should be the given strategy by default", () => {
      const game = buildSUT();

      expect(game.loopSchedulerStrategyName).toStrictEqual(
        "dummyLoopScheduler",
      );
    });

    it("should change loop strategy when setLoopScheduler is called", () => {
      const game = buildSUT();
      const newDummyLoopScheduler = new LoopSchedulerDummy(
        "new-dummyLoopScheduler",
      );

      game.setLoopScheduler(newDummyLoopScheduler);

      expect(game.loopSchedulerStrategyName).toStrictEqual(
        "new-dummyLoopScheduler",
      );
    });
  });
});
