import { Grid } from "./grid/grid";
import { GridRenderer } from "./grid/grid-renderer";
import { SpeedLevel } from "./game-loop/speed-level/speed-level";
import { LoopScheduler } from "./game-loop/loop-scheduler";
import { GameLoop } from "./game-loop/game-loop";
import { Clock } from "../generic/clock";

export class Game {
  private readonly _grid: Grid;

  private _gridRenderer: GridRenderer;
  private _gameLoop: GameLoop;

  public constructor(
    grid: Grid,
    gridRenderer: GridRenderer,
    loopScheduler: LoopScheduler,
    clock: Clock,
  ) {
    this._grid = grid;
    this._gridRenderer = gridRenderer;
    this._gameLoop = new GameLoop(loopScheduler, clock);
  }

  public update(): void {
    this._grid.update();
  }

  public start(): void {
    this._gameLoop.start(() => {
      this.update();
      this._gridRenderer.render();
    });
  }

  public stop(): void {
    this._gameLoop.stop();
  }

  public get isPaused(): boolean {
    return this._gameLoop.isPaused;
  }

  public get speedLevel(): SpeedLevel {
    return this._gameLoop.speedLevel;
  }

  public setSpeedLevel(speedLevel: SpeedLevel) {
    this._gameLoop.setSpeedLevel(speedLevel);
  }

  public get nbTicksLastSecond(): number {
    return this._gameLoop.nbTicksLastSecond;
  }

  public setGridRenderer(gridRenderer: GridRenderer): void {
    this._gridRenderer.destroy();
    this._gridRenderer = gridRenderer;
    this._gridRenderer.render();
  }

  public get renderStrategyName(): string {
    return this._gridRenderer.strategyName;
  }

  public setLoopScheduler(loopScheduler: LoopScheduler): void {
    this.stop();
    this._gameLoop.setLoopScheduler(loopScheduler);
    this.start();
  }

  public get loopSchedulerStrategyName(): string {
    return this._gameLoop.loopSchedulerStrategyName;
  }

  public setSupportsInfectedState(supportsInfectedState: boolean) {
    this._grid.setSupportsInfectedState(supportsInfectedState);
  }

  public get supportsInfectedState(): boolean {
    return this._grid.supportsInfectedState;
  }
}
