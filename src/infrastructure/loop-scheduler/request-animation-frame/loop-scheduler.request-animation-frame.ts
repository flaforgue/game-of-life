import { LoopScheduler } from "../../../domain/game/game-loop/loop-scheduler";
import { LoopStrategyName } from "../loop-scheduler.factory";

export class LoopSchedulerRequestAnimationFrame implements LoopScheduler {
  public readonly isRecursive = true;
  public readonly strategyName: LoopStrategyName = "request-animation-frame";

  public schedule(loopFunction: (currentTimeMs: number) => void): number {
    return requestAnimationFrame(loopFunction);
  }

  public cancel(loopId: number): void {
    cancelAnimationFrame(loopId);
  }
}
