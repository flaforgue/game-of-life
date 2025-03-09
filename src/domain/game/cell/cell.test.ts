import { Cell } from "./cell";

describe("cell", () => {
  describe("isAlive", () => {
    it("should return true when current state is alive", () => {
      const cell = new Cell("alive");

      expect(cell.isAlive).toStrictEqual(true);
    });

    it("should return false when current state is alive", () => {
      const cell = new Cell("dead");

      expect(cell.isAlive).toStrictEqual(false);
    });
  });

  describe("live", () => {
    it("should make cell stay alive when current state is alive", () => {
      const cell = new Cell("alive");

      cell.live();

      expect(cell.isAlive).toStrictEqual(true);
    });

    it("should make cell become alive when current state is dead", () => {
      const cell = new Cell("dead");

      cell.live();

      expect(cell.isAlive).toStrictEqual(true);
    });
  });

  describe("update", () => {
    it("should throw when called without previous computeNextStep call", () => {
      const cell = new Cell("alive");

      const sut = () => {
        cell.update();
      };

      expect(sut).toThrow(new Error("Cell nextState is null"));
    });

    describe("when exactly 2 neighbors are alive", () => {
      it("should stay alive when current state is alive", () => {
        const neighbors = [
          new Cell("alive"),
          new Cell("alive"),
          new Cell("dead"),
        ];
        const cell = new Cell("alive");

        cell.computeNextState(neighbors);
        cell.update();

        expect(cell.isAlive).toStrictEqual(true);
      });

      it("should stay dead when current state is dead", () => {
        const neighbors = [
          new Cell("alive"),
          new Cell("alive"),
          new Cell("dead"),
        ];
        const cell = new Cell("dead");

        cell.computeNextState(neighbors);
        cell.update();

        expect(cell.isAlive).toStrictEqual(false);
      });
    });

    describe("when exactly 3 neighbors are alive", () => {
      const neighbors = [
        new Cell("alive"),
        new Cell("alive"),
        new Cell("alive"),
        new Cell("dead"),
      ];

      it("should stay alive when initial state is alive", () => {
        const cell = new Cell("alive");

        cell.computeNextState(neighbors);
        cell.update();

        expect(cell.isAlive).toStrictEqual(true);
      });

      it("should become alive when initial state is dead", () => {
        const cell = new Cell("dead");

        cell.computeNextState(neighbors);
        cell.update();

        expect(cell.isAlive).toStrictEqual(true);
      });
    });

    describe.each([0, 1])(
      "when less than 2 neighbors are alive",
      (nbAliveNeighbors) => {
        const neighbors = [
          ...new Array<Cell>(nbAliveNeighbors).fill(new Cell("alive")),
          new Cell("dead"),
        ];

        it("should stay dead when initial state is dead", () => {
          const cell = new Cell("dead");

          cell.computeNextState(neighbors);
          cell.update();

          expect(cell.isAlive).toStrictEqual(false);
        });

        it("should become dead when initial state is alive", () => {
          const cell = new Cell("alive");

          cell.computeNextState(neighbors);
          cell.update();

          expect(cell.isAlive).toStrictEqual(false);
        });
      },
    );

    describe.each([4, 5, 6, 7, 8])(
      "when more than 3 neighbors are alive",
      (nbAliveNeighbors) => {
        const neighbors = [
          ...new Array<Cell>(nbAliveNeighbors).fill(new Cell("alive")),
          new Cell("dead"),
        ];

        it("should stay dead when initial state is dead", () => {
          const cell = new Cell("dead");

          cell.computeNextState(neighbors);
          cell.update();

          expect(cell.isAlive).toStrictEqual(false);
        });

        it("should become dead when initial state is alive", () => {
          const cell = new Cell("alive");

          cell.computeNextState(neighbors);
          cell.update();

          expect(cell.isAlive).toStrictEqual(false);
        });
      },
    );
  });
});
