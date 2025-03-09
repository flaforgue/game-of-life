import { ClockDummy } from "../../../../infrastructure/clock/clock.dummy";
import { TickCounter } from "./tick-counter";

describe("tick-counter", () => {
  it("should have an initial nbTicksLastSecond value equal to 0", () => {
    const tickCounter = new TickCounter(new ClockDummy());

    expect(tickCounter.nbTicksLastSecond).toStrictEqual(0);
  });

  describe("countTick", () => {
    it("should throw when called without previous startCount call", () => {
      const tickCounter = new TickCounter(new ClockDummy());

      const sut = () => {
        tickCounter.countTick(0);
      };

      expect(sut).toThrow(
        new Error("TickCounter cannot count tick when count has not started"),
      );
    });

    it("should keep the same nbTicksLastSecond value when one second has not past", () => {
      const now = 0;
      const nbMillisecondsPast = 999;
      const stubClock = {
        now: () => now,
      };
      const tickCounter = new TickCounter(stubClock);
      tickCounter.startCount();

      tickCounter.countTick(now + nbMillisecondsPast);

      expect(tickCounter.nbTicksLastSecond).toStrictEqual(0);
    });

    it("should update the same nbTicksLastSecond value when one second has past", () => {
      const now = 0;
      const nbMillisecondsPast = 1000;
      const stubClock = {
        now: () => now,
      };
      const tickCounter = new TickCounter(stubClock);
      tickCounter.startCount();

      tickCounter.countTick(now + nbMillisecondsPast);

      expect(tickCounter.nbTicksLastSecond).toStrictEqual(1);
    });

    it("should count 2 ticks when countTick is called once before one second is spent and once after", () => {
      const now = 0;
      const stubClock = {
        now: () => now,
      };
      const tickCounter = new TickCounter(stubClock);
      tickCounter.startCount();

      tickCounter.countTick(now + 500);
      tickCounter.countTick(now + 1500);

      expect(tickCounter.nbTicksLastSecond).toStrictEqual(2);
    });
  });

  describe("startCount", () => {
    it("should update nbTicksLastSecond with the current count", () => {
      const tickCounter = new TickCounter(new ClockDummy());
      tickCounter.startCount();
      tickCounter.countTick(0);

      tickCounter.startCount();

      expect(tickCounter.nbTicksLastSecond).toStrictEqual(1);
    });
  });
});
