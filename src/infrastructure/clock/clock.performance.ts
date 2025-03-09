import { Clock } from "../../domain/generic/clock";

export class ClockPerformance implements Clock {
  public now(): number {
    return performance.now();
  }
}
