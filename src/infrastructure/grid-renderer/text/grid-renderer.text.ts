import { CellState } from "../../../domain/game/cell/cell";
import { Grid } from "../../../domain/game/grid/grid";
import { GridRenderer } from "../../../domain/game/grid/grid-renderer";
import { RenderStrategyName } from "../grid-renderer.factory";

const CELL_STATE_CHARS: Record<CellState, string> = {
  alive: "0",
  dead: " ",
  infected: "#",
};

export class GridRendererText implements GridRenderer {
  private readonly grid: Grid;
  private readonly container: HTMLPreElement;
  private readonly cellSize: number;

  public readonly strategyName: RenderStrategyName = "text";

  public constructor(grid: Grid, cellSize: number) {
    this.grid = grid;
    this.container = document.createElement("pre");
    this.container.className = "game-container";
    this.container.style.fontFamily = "monospace";
    this.cellSize = cellSize;
    this.container.style.fontSize = `${this.cellSize * 1.5}px`;
    this.container.style.lineHeight = `${this.cellSize * 2}px`;
    this.container.style.userSelect = "none";

    this.container.style.width = `${(this.grid.nbColumns * cellSize) / this.letterSizeFactor.column}px`;
    this.container.style.height = `${this.grid.nbLines * cellSize * this.letterSizeFactor.line}px`;

    this.bindClickEvent();

    document.body.appendChild(this.container);
  }

  private get letterSizeFactor(): { line: number; column: number } {
    // magic numbers working with the monospace font
    return {
      line: 2,
      column: 1.107,
    };
  }

  private bindClickEvent(): void {
    const makeCellAtClickLive = (e: MouseEvent) => {
      const targetRect = this.container.getBoundingClientRect();
      const x = (e.clientX - targetRect.left) * this.letterSizeFactor.column;
      const y = (e.clientY - targetRect.top) / this.letterSizeFactor.line;

      const line = Math.floor(y / this.cellSize);
      const column = Math.floor(x / this.cellSize);
      this.grid.cells[line][column]?.live();
      this.render();
    };

    this.container.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) {
        return;
      }

      makeCellAtClickLive(e);
    });

    this.container.addEventListener("click", makeCellAtClickLive);
  }

  public destroy(): void {
    this.container.remove();
  }

  public render(): void {
    const nbLines = this.grid.nbLines;
    const nbColumns = this.grid.nbColumns;

    let textContent = "";
    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        const char =
          CELL_STATE_CHARS[this.grid.cells[line][column].currentState];

        textContent += char;
      }

      textContent += "\n";
    }

    this.container.textContent = textContent;
  }
}
