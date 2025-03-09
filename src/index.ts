import { Game } from "./domain/game/game";
import { Grid } from "./domain/game/grid/grid";
import { ClockPerformance } from "./infrastructure/clock/clock.performance";
import { GridRendererFactory } from "./infrastructure/grid-renderer/grid-renderer.factory";
import { LoopSchedulerFactory } from "./infrastructure/loop-scheduler/loop-scheduler.factory";
import { NumberGeneratorMathRandom } from "./infrastructure/number-generator/number-generator.math-random";
import { hydrateGameInterface } from "./interface/hydrate-game-interface";

const config = {
  // nbLines: 205 * 3,
  // nbColumns: 480 * 3,
  // cellSize: 1,
  nbLines: 205,
  nbColumns: 480,
  cellSize: 3,
};

const grid = Grid.createWithRandomCells(
  new NumberGeneratorMathRandom(),
  config.nbLines,
  config.nbColumns,
);
const gridRendererFactory = new GridRendererFactory(grid, config.cellSize);
const loopSchedulerFactory = new LoopSchedulerFactory();
const game = new Game(
  grid,
  gridRendererFactory.create("webgl"),
  loopSchedulerFactory.create("set-interval"),
  new ClockPerformance(),
);

game.start();

hydrateGameInterface(game, gridRendererFactory, loopSchedulerFactory);
