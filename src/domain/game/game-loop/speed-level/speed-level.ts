export type SpeedLevel = "1" | "2" | "3";

export function isSpeedLevel(speedLevel: string): speedLevel is SpeedLevel {
  return ["1", "2", "3"].includes(speedLevel);
}

export const SPEED_LEVEL_MS_BETWEEN_FRAMES: Record<SpeedLevel, number> = {
  "1": 32,
  "2": 15.5,
  "3": 1,
};
