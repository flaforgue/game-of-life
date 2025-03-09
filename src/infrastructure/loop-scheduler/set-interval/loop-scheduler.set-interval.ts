import { LoopScheduler } from "../../../domain/game/game-loop/loop-scheduler";
import { Clock } from "../../../domain/generic/clock";
import { LoopStrategyName } from "../loop-scheduler.factory";

export class LoopSchedulerSetInterval implements LoopScheduler {
  private clock: Clock;
  public readonly isRecursive = false;
  public readonly strategyName: LoopStrategyName = "set-interval";

  public constructor(clock: Clock) {
    this.clock = clock;
  }

  public schedule(loopFunction: (currentTimeMs: number) => void): number {
    return setInterval(() => {
      loopFunction(this.clock.now());
    }, 0) as unknown as number;
  }

  public cancel(loopId: number): void {
    clearInterval(loopId);
  }
}
