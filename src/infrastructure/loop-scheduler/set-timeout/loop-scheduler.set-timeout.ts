import { LoopScheduler } from "../../../domain/game/game-loop/loop-scheduler";
import { Clock } from "../../../domain/generic/clock";
import { LoopStrategyName } from "../loop-scheduler.factory";

export class LoopSchedulerSetTimeout implements LoopScheduler {
  private clock: Clock;
  public readonly isRecursive = true;
  public readonly strategyName: LoopStrategyName = "set-timeout";

  public constructor(clock: Clock) {
    this.clock = clock;
  }

  public schedule(loopFunction: (currentTimeMs: number) => void): number {
    return setTimeout(() => {
      loopFunction(this.clock.now());
    }, 0) as unknown as number;
  }

  public cancel(loopId: number): void {
    clearTimeout(loopId);
  }
}
