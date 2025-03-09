import { ClockPerformance } from "../../../../infrastructure/clock/clock.performance";
import { Clock } from "../../../generic/clock";

export class TickCounter {
  private readonly _clock: Clock;
  private _tickCountStartedAt: number | null;
  private _nbTicksLastSecond: number;
  private _nbTicks: number;

  public constructor(clock: ClockPerformance) {
    this._clock = clock;
    this._tickCountStartedAt = null;
    this._nbTicksLastSecond = 0;
    this._nbTicks = 0;
  }

  public startCount(): void {
    this._nbTicksLastSecond = this._nbTicks;
    this._nbTicks = 0;
    this._tickCountStartedAt = this._clock.now();
  }

  public countTick(tickTime: number): void {
    if (this._tickCountStartedAt === null) {
      throw new Error(
        "TickCounter cannot count tick when count has not started",
      );
    }

    this._nbTicks++;

    if (tickTime - this._tickCountStartedAt >= 1000) {
      this._nbTicksLastSecond = this._nbTicks;
      this.startCount();
    }
  }

  public get nbTicksLastSecond(): number {
    return this._nbTicksLastSecond;
  }
}
