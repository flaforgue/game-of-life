import { LoopScheduler } from "../../../domain/game/game-loop/loop-scheduler";

export class LoopSchedulerDummy implements LoopScheduler {
  public readonly isRecursive = true;
  public readonly strategyName;

  public constructor(strategyName = "dummyLoopScheduler") {
    this.strategyName = strategyName;
  }

  public schedule(): number {
    return 0;
  }

  public cancel(): void {
    return;
  }
}
