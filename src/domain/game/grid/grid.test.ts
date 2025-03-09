import { Cell } from "../cell/cell";
import { Grid } from "./grid";

describe("grid", () => {
  describe("constructor", () => {
    it("should store the cells in the correct order", () => {
      const cells = [
        [new Cell("alive"), new Cell("dead"), new Cell("dead")],
        [new Cell("alive"), new Cell("alive"), new Cell("dead")],
        [new Cell("dead"), new Cell("alive"), new Cell("dead")],
      ];

      const grid = new Grid(cells);

      // line 1
      expect(grid.cells[0][0].isAlive).toStrictEqual(true);
      expect(grid.cells[0][1].isAlive).toStrictEqual(false);
      expect(grid.cells[0][2].isAlive).toStrictEqual(false);
      // line 2
      expect(grid.cells[1][0].isAlive).toStrictEqual(true);
      expect(grid.cells[1][1].isAlive).toStrictEqual(true);
      expect(grid.cells[1][2].isAlive).toStrictEqual(false);
      // line 3
      expect(grid.cells[2][0].isAlive).toStrictEqual(false);
      expect(grid.cells[2][1].isAlive).toStrictEqual(true);
      expect(grid.cells[2][2].isAlive).toStrictEqual(false);
    });

    it("should store the number of columns in nbColumns", () => {
      const cells = [[new Cell("alive"), new Cell("dead")]];

      const grid = new Grid(cells);

      expect(grid.nbColumns).toStrictEqual(2);
    });

    it("should store the number of lines in nbLines", () => {
      const cells = [[new Cell("alive"), new Cell("dead")]];

      const grid = new Grid(cells);

      expect(grid.nbLines).toStrictEqual(1);
    });
  });

  describe("update", () => {
    it("should update one single cell", () => {
      const grid = new Grid([[new Cell("alive")]]);

      grid.update();

      expect(grid.cells[0][0].isAlive).toStrictEqual(false);
    });

    it("should update one single line of cells", () => {
      const grid = new Grid([
        [new Cell("alive"), new Cell("alive"), new Cell("alive")],
      ]);

      grid.update();

      expect(grid.cells[0][0].isAlive).toStrictEqual(false);
      expect(grid.cells[0][1].isAlive).toStrictEqual(true);
      expect(grid.cells[0][2].isAlive).toStrictEqual(false);
    });

    it("should update one single column of cells", () => {
      const grid = new Grid([
        [new Cell("alive")],
        [new Cell("alive")],
        [new Cell("alive")],
      ]);

      grid.update();

      expect(grid.cells[0][0].isAlive).toStrictEqual(false);
      expect(grid.cells[1][0].isAlive).toStrictEqual(true);
      expect(grid.cells[2][0].isAlive).toStrictEqual(false);
    });

    it("should update three lines of three cells", () => {
      const grid = new Grid([
        [new Cell("alive"), new Cell("alive"), new Cell("alive")],
        [new Cell("alive"), new Cell("alive"), new Cell("alive")],
        [new Cell("alive"), new Cell("alive"), new Cell("alive")],
      ]);

      grid.update();

      // Line 1
      expect(grid.cells[0][0].isAlive).toStrictEqual(true);
      expect(grid.cells[0][1].isAlive).toStrictEqual(false);
      expect(grid.cells[0][2].isAlive).toStrictEqual(true);
      // Line 2
      expect(grid.cells[1][0].isAlive).toStrictEqual(false);
      expect(grid.cells[1][1].isAlive).toStrictEqual(false);
      expect(grid.cells[1][2].isAlive).toStrictEqual(false);
      // Line 3
      expect(grid.cells[2][0].isAlive).toStrictEqual(true);
      expect(grid.cells[2][1].isAlive).toStrictEqual(false);
      expect(grid.cells[2][2].isAlive).toStrictEqual(true);
    });
  });

  describe("createWithRandomCells", () => {
    it("should return a Grid with the correct size", () => {
      const nbLines = 3;
      const nbColumns = 2;

      const grid = Grid.createWithRandomCells(
        { generate: Math.random },
        nbLines,
        nbColumns,
      );

      expect(grid.cells.length).toStrictEqual(nbLines);
      expect(grid.cells[0].length).toStrictEqual(nbColumns);
    });

    it("should return a living cell when random number is below 0.5", () => {
      const stubGetRandomNumber = { generate: () => 0.4 };

      const grid = Grid.createWithRandomCells(stubGetRandomNumber, 1, 1);

      expect(grid.cells[0][0].currentState).toStrictEqual("alive");
    });

    it("should return a living cell when random number is below 0.5", () => {
      const stubGetRandomNumber = { generate: () => 0.6 };

      const grid = Grid.createWithRandomCells(stubGetRandomNumber, 1, 1);

      expect(grid.cells[0][0].currentState).toStrictEqual("dead");
    });
  });
});
