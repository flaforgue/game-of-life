export interface LoopScheduler {
  strategyName: string;
  isRecursive: boolean;
  schedule(loopFunction: (currentTimeMs: number) => void): number;
  cancel(loopId: number): void;
}
