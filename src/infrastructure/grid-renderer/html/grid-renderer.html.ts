import { CellState } from "../../../domain/game/cell/cell";
import { Grid } from "../../../domain/game/grid/grid";
import { GridRenderer } from "../../../domain/game/grid/grid-renderer";
import { RenderStrategyName } from "../grid-renderer.factory";

const CELL_STATE_COLORS: Record<CellState, string> = {
  alive: "rgb(255, 255, 255)",
  infected: "rgb(0, 180, 0)",
  dead: "rgb(0, 0, 0)",
};

export class GridRendererHtml implements GridRenderer {
  private readonly grid: Grid;
  private readonly cellSize: number;
  private readonly htmlTable: HTMLTableElement;
  private readonly htmlTableCells: HTMLTableCellElement[][];

  public readonly strategyName: RenderStrategyName = "html";

  public constructor(grid: Grid, cellSize: number) {
    this.grid = grid;
    this.cellSize = cellSize;
    this.htmlTable = this.initTable();
    this.htmlTableCells = this.initGrid();
    this.bindClickEvent();
  }

  private initTable(): HTMLTableElement {
    const table = document.createElement("table");
    table.className = "game-container";
    table.style.width = `${this.grid.nbColumns * this.cellSize}px`;
    table.style.height = `${this.grid.nbLines * this.cellSize}px`;
    table.style.borderSpacing = "0px";
    document.body.appendChild(table);

    return table;
  }

  private initGrid(): HTMLTableCellElement[][] {
    const htmlTableCells: HTMLTableCellElement[][] = [];

    const tbody = document.createElement("tbody");
    for (let line = 0; line < this.grid.nbLines; line++) {
      htmlTableCells[line] = [];
      const row = document.createElement("tr");

      for (let column = 0; column < this.grid.nbColumns; column++) {
        const cell = document.createElement("td");
        htmlTableCells[line][column] = cell;
        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }

    this.htmlTable.appendChild(tbody);

    return htmlTableCells;
  }

  private bindClickEvent(): void {
    const makeCellAtClickLive = (e: MouseEvent) => {
      const targetRect = this.htmlTable.getBoundingClientRect();
      const x = e.clientX - targetRect.left;
      const y = e.clientY - targetRect.top;

      const line = Math.floor(y / this.cellSize);
      const column = Math.floor(x / this.cellSize);
      this.grid.cells[line][column]?.live();
      this.render();
    };

    this.htmlTable.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) {
        return;
      }

      makeCellAtClickLive(e);
    });

    this.htmlTable.addEventListener("click", makeCellAtClickLive);
  }

  public destroy(): void {
    this.htmlTable.remove();
  }

  public render(): void {
    const nbLines = this.grid.nbLines;
    const nbColumns = this.grid.nbColumns;

    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        this.renderCell(line, column);
      }
    }
  }

  private renderCell(line: number, column: number): void {
    this.htmlTableCells[line][column].style.backgroundColor =
      CELL_STATE_COLORS[this.grid.cells[line][column].currentState];
  }
}
