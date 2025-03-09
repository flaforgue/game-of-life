import { Grid } from "../../domain/game/grid/grid";
import { GridRenderer } from "../../domain/game/grid/grid-renderer";
import { GridRenderer2d } from "./2d/grid-renderer.2d";
import { GridRendererHtml } from "./html/grid-renderer.html";
import { GridRendererText } from "./text/grid-renderer.text";
import { GridRendererWebGL } from "./webgl/grid-renderer.webgl";

export type RenderStrategyName = "webgl" | "2d" | "html" | "text";

export function isRenderStrategyName(
  strategyName: string,
): strategyName is RenderStrategyName {
  return ["webgl", "2d", "html", "text"].includes(strategyName);
}

export class GridRendererFactory {
  private readonly grid: Grid;
  private readonly cellSize: number;

  public constructor(grid: Grid, cellSize: number) {
    this.grid = grid;
    this.cellSize = cellSize;
  }

  public create(renderStrategyName: RenderStrategyName): GridRenderer {
    if (renderStrategyName === "webgl") {
      return new GridRendererWebGL(this.grid, this.cellSize);
    }

    if (renderStrategyName === "2d") {
      return new GridRenderer2d(this.grid, this.cellSize);
    }

    if (renderStrategyName === "html") {
      return new GridRendererHtml(this.grid, this.cellSize);
    }

    return new GridRendererText(this.grid, this.cellSize);
  }
}
