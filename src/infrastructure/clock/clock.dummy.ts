import { Clock } from "../../domain/generic/clock";

export class ClockDummy implements Clock {
  public now(): number {
    return 0;
  }
}
