import { Clock } from "../../generic/clock";
import { LoopScheduler } from "./loop-scheduler";
import {
  SPEED_LEVEL_MS_BETWEEN_FRAMES,
  SpeedLevel,
} from "./speed-level/speed-level";
import { TickCounter } from "./tick-counter/tick-counter";

export class GameLoop {
  private _nbMillisecondsBetweenTicks;
  private _previousTickTimeMs;
  private _tickId: number | null;
  private _tickCounter: TickCounter;
  private _loopScheduler: LoopScheduler;

  public constructor(loopScheduler: LoopScheduler, clock: Clock) {
    this._nbMillisecondsBetweenTicks = SPEED_LEVEL_MS_BETWEEN_FRAMES[2];
    this._previousTickTimeMs = 0;
    this._tickId = null;
    this._tickCounter = new TickCounter(clock);
    this._loopScheduler = loopScheduler;
  }

  public setLoopScheduler(loopScheduler: LoopScheduler): void {
    this._loopScheduler = loopScheduler;
  }

  public get loopSchedulerStrategyName(): string {
    return this._loopScheduler.strategyName;
  }

  public start(tickFunction: () => void): void {
    if (this._tickId !== null) {
      return;
    }

    const gameLoopFunction = (currentTimeMs: number) => {
      const deltaTimeMs = currentTimeMs - this._previousTickTimeMs;
      if (deltaTimeMs >= this._nbMillisecondsBetweenTicks) {
        tickFunction();
        this._previousTickTimeMs = currentTimeMs;
        this._tickCounter.countTick(currentTimeMs);
      }

      if (this._loopScheduler.isRecursive) {
        this._tickId = this._loopScheduler.schedule(gameLoopFunction);
      }
    };

    this._tickId = this._loopScheduler.schedule(gameLoopFunction);
    this._tickCounter.startCount();
  }

  public stop(): void {
    if (this._tickId === null) {
      return;
    }

    this._loopScheduler.cancel(this._tickId);
    this._tickId = null;
  }

  public get isPaused(): boolean {
    return this._tickId === null;
  }

  public get nbTicksLastSecond(): number {
    return this._tickCounter.nbTicksLastSecond;
  }

  public setSpeedLevel(speedLevel: SpeedLevel) {
    this._nbMillisecondsBetweenTicks =
      SPEED_LEVEL_MS_BETWEEN_FRAMES[speedLevel];
  }

  public get speedLevel(): SpeedLevel {
    for (const key in SPEED_LEVEL_MS_BETWEEN_FRAMES) {
      const speedLevel = key as SpeedLevel;

      if (
        SPEED_LEVEL_MS_BETWEEN_FRAMES[speedLevel] ===
        this._nbMillisecondsBetweenTicks
      ) {
        return speedLevel;
      }
    }

    throw new Error(
      `Game speed not found for ${this._nbMillisecondsBetweenTicks}`,
    );
  }
}
