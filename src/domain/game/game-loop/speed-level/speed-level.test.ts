import { isSpeedLevel } from "./speed-level";

describe("isSpeedLevel", () => {
  it.each(["1", "2", "3"])(
    "shoule return true when speed level string given",
    (speedLevel) => {
      expect(isSpeedLevel(speedLevel)).toStrictEqual(true);
    },
  );

  it("shoule return false when non speed level string given", () => {
    expect(isSpeedLevel("0")).toStrictEqual(false);
  });
});
