import { NumberGenerator } from "../../generic/number-generator";
import { Cell } from "../cell/cell";

export class Grid {
  public readonly cells: Cell[][];

  public constructor(cells: Cell[][]) {
    this.cells = cells;
  }

  public static createWithRandomCells(
    numberGenerator: NumberGenerator,
    nbLines: number,
    nbColumns: number,
  ): Grid {
    const cells: Cell[][] = [];
    for (let line = 0; line < nbLines; line++) {
      cells[line] = [];
      for (let column = 0; column < nbColumns; column++) {
        cells[line][column] = new Cell(
          numberGenerator.generate() < 0.5 ? "alive" : "dead",
        );
      }
    }

    return new Grid(cells);
  }

  public get nbLines() {
    return this.cells.length;
  }

  public get nbColumns() {
    return this.cells[0]?.length ?? 0;
  }

  public update(): void {
    this._computeNextStates();

    const nbLines = this.nbLines;
    const nbColumns = this.nbColumns;
    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        this.cells[line][column].update();
      }
    }
  }

  private _computeNextStates(): void {
    const nbLines = this.nbLines;
    const nbColumns = this.nbColumns;

    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        this.cells[line][column].computeNextState(
          this._getNeighbors(line, column),
        );
      }
    }
  }

  private _getNeighbors(line: number, column: number): Cell[] {
    const neighbors = [];

    const leftCell = this._getNeighbor(line, column, 0, -1);
    if (leftCell !== undefined) {
      neighbors.push(leftCell);
    }

    const rightCell = this._getNeighbor(line, column, 0, 1);
    if (rightCell !== undefined) {
      neighbors.push(rightCell);
    }

    const topCell = this._getNeighbor(line, column, -1, 0);
    if (topCell !== undefined) {
      neighbors.push(topCell);
    }

    const bottomCell = this._getNeighbor(line, column, +1, 0);
    if (bottomCell !== undefined) {
      neighbors.push(bottomCell);
    }

    const topLeftCell = this._getNeighbor(line, column, -1, -1);
    if (topLeftCell !== undefined) {
      neighbors.push(topLeftCell);
    }

    const topRightCell = this._getNeighbor(line, column, -1, 1);
    if (topRightCell !== undefined) {
      neighbors.push(topRightCell);
    }

    const bottomLeftCell = this._getNeighbor(line, column, 1, -1);
    if (bottomLeftCell !== undefined) {
      neighbors.push(bottomLeftCell);
    }

    const bottomRightCell = this._getNeighbor(line, column, 1, 1);
    if (bottomRightCell !== undefined) {
      neighbors.push(bottomRightCell);
    }

    return neighbors;
  }

  private _getNeighbor(
    originLine: number,
    originColumn: number,
    lineOffset: number,
    columnOffster: number,
  ): Cell | undefined {
    return this.cells[originLine + lineOffset]?.[originColumn + columnOffster];
  }

  public setSupportsInfectedState(supportsInfectedState: boolean) {
    const nbLines = this.nbLines;
    const nbColumns = this.nbColumns;

    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        this.cells[line][column].setSupportsInfectedState(
          supportsInfectedState,
        );
      }
    }
  }

  public get supportsInfectedState(): boolean {
    const nbLines = this.nbLines;
    const nbColumns = this.nbColumns;

    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        if (this.cells[line][column].supportsInfectedState) {
          return true;
        }
      }
    }

    return false;
  }
}
