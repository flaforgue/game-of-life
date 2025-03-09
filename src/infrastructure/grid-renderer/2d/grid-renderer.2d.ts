import { CellState } from "../../../domain/game/cell/cell";
import { Grid } from "../../../domain/game/grid/grid";
import { GridRenderer } from "../../../domain/game/grid/grid-renderer";
import { RenderStrategyName } from "../grid-renderer.factory";

const CELL_STATE_COLORS: Record<CellState, string> = {
  alive: "rgb(255, 255, 255)",
  infected: "rgb(0, 180, 0)",
  dead: "rgb(0, 0, 0)",
};

export class GridRenderer2d implements GridRenderer {
  private readonly grid: Grid;
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly cellOffscreenCanvas: {
    alive: HTMLCanvasElement;
    infected: HTMLCanvasElement;
  };
  private readonly cellSize: number;

  public readonly strategyName: RenderStrategyName = "2d";

  public constructor(grid: Grid, cellSize: number) {
    this.grid = grid;
    this.cellSize = cellSize;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "game-container";
    this.canvas.width = this.grid.nbColumns * this.cellSize;
    this.canvas.height = this.grid.nbLines * this.cellSize;

    this.bindClickEvent();

    document.body.appendChild(this.canvas);
    const context = this.canvas.getContext("2d", { alpha: false });
    if (context === null) {
      throw new Error("GridRenderer could not retrieve canvas 2d context");
    }

    this.context = context;
    this.cellOffscreenCanvas = {
      alive: this.createCellOffscreenCanvas("alive"),
      infected: this.createCellOffscreenCanvas("infected"),
    };
  }

  private bindClickEvent(): void {
    const makeCellAtPositionLive = (x: number, y: number) => {
      const line = Math.floor(y / this.cellSize);
      const column = Math.floor(x / this.cellSize);
      this.grid.cells[line][column]?.live();
      this.render();
    };

    this.canvas.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) {
        return;
      }

      makeCellAtPositionLive(e.offsetX, e.offsetY);
    });

    this.canvas.addEventListener("click", (e) => {
      makeCellAtPositionLive(e.offsetX, e.offsetY);
    });
  }

  public destroy(): void {
    this.canvas.remove();
  }

  private createCellOffscreenCanvas(cellState: CellState): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = this.cellSize;
    canvas.height = this.cellSize;
    const context = canvas.getContext("2d");
    if (context === null) {
      throw new Error("Could not get context for offscreen canvas");
    }

    context.beginPath();
    context.fillStyle = CELL_STATE_COLORS[cellState];
    context.fillRect(0, 0, this.cellSize, this.cellSize);

    return canvas;
  }

  private drawCell(line: number, column: number, cellState: CellState): void {
    if (cellState === "dead") {
      return;
    }

    this.context.drawImage(
      this.cellOffscreenCanvas[cellState],
      column * this.cellSize,
      line * this.cellSize,
    );
  }

  public render(): void {
    const nbLines = this.grid.nbLines;
    const nbColumns = this.grid.nbColumns;

    this.context.clearRect(
      0,
      0,
      this.grid.nbColumns * this.cellSize,
      this.grid.nbLines * this.cellSize,
    );
    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        this.drawCell(line, column, this.grid.cells[line][column].currentState);
      }
    }
  }
}
