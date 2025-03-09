import { LoopScheduler } from "../../domain/game/game-loop/loop-scheduler";
import { ClockPerformance } from "../clock/clock.performance";
import { LoopSchedulerRequestAnimationFrame } from "./request-animation-frame/loop-scheduler.request-animation-frame";
import { LoopSchedulerSetInterval } from "./set-interval/loop-scheduler.set-interval";
import { LoopSchedulerSetTimeout } from "./set-timeout/loop-scheduler.set-timeout";

export type LoopStrategyName =
  | "request-animation-frame"
  | "set-timeout"
  | "set-interval";

export function isLoopStrategyName(
  loopStrategyName: string,
): loopStrategyName is LoopStrategyName {
  return ["request-animation-frame", "set-timeout"].includes(loopStrategyName);
}

export class LoopSchedulerFactory {
  public create(loopStrategyName: LoopStrategyName): LoopScheduler {
    if (loopStrategyName === "request-animation-frame") {
      return new LoopSchedulerRequestAnimationFrame();
    } else if (loopStrategyName === "set-interval") {
      return new LoopSchedulerSetInterval(new ClockPerformance());
    }

    return new LoopSchedulerSetTimeout(new ClockPerformance());
  }
}
