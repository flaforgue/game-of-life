import { CellState } from "../../../domain/game/cell/cell";
import { Grid } from "../../../domain/game/grid/grid";
import { GridRenderer } from "../../../domain/game/grid/grid-renderer";
import { RenderStrategyName } from "../grid-renderer.factory";
import {
  colorFragmentShader,
  shaderColorVariableName,
} from "./shaders/color.fragment.shader";
import {
  positionVertexShader,
  shaderPositionAttributeName,
  shaderPositionVariableName,
} from "./shaders/position.vertex.shader";

const CELL_STATE_COLORS: Record<CellState, number[]> = {
  alive: [1, 1, 1, 1],
  infected: [0, 0.7, 0, 0],
  dead: [0, 0, 0, 0],
};

export class GridRendererWebGL implements GridRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly gl: WebGLRenderingContext;
  private readonly grid: Grid;
  private readonly program: WebGLProgram;
  private readonly cellSize: number;

  public readonly strategyName: RenderStrategyName = "webgl";

  public constructor(grid: Grid, cellSize: number) {
    this.grid = grid;
    this.cellSize = cellSize;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "game-container";
    this.canvas.width = this.grid.nbColumns * this.cellSize;
    this.canvas.height = this.grid.nbLines * this.cellSize;

    this.bindClickEvent();

    document.body.appendChild(this.canvas);

    const context = this.canvas.getContext("webgl", { alpha: false });
    if (context === null) {
      throw new Error("GridRenderer could not retrieve canvas 2d context");
    }

    this.gl = context;
    this.program = this.createProgram();

    const resolutionUniformLocation = this.gl.getUniformLocation(
      this.program,
      shaderPositionVariableName,
    );
    this.gl.uniform2f(
      resolutionUniformLocation,
      this.gl.canvas.width,
      this.gl.canvas.height,
    );

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
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

  private createProgram(): WebGLProgram {
    const glProgram = this.gl.createProgram();
    this.gl.attachShader(
      glProgram,
      this.makeShader(positionVertexShader, this.gl.VERTEX_SHADER),
    );
    this.gl.attachShader(
      glProgram,
      this.makeShader(colorFragmentShader, this.gl.FRAGMENT_SHADER),
    );
    this.gl.linkProgram(glProgram);

    const isProgramlinked = this.gl.getProgramParameter(
      glProgram,
      this.gl.LINK_STATUS,
    ) as boolean;
    if (!isProgramlinked) {
      throw new Error("Could not link the webgl program");
    }

    this.gl.useProgram(glProgram);

    return glProgram;
  }

  private makeShader(src: string, type: GLenum) {
    const shader = this.gl.createShader(type);
    if (shader === null) {
      throw new Error(`Could not create shader ${type} (${src})`);
    }

    this.gl.shaderSource(shader, src);
    this.gl.compileShader(shader);
    const isShaderCompiled = this.gl.getShaderParameter(
      shader,
      this.gl.COMPILE_STATUS,
    ) as boolean;
    if (!isShaderCompiled) {
      throw new Error(
        `Could not compile shader (${this.gl.getShaderInfoLog(shader) ?? ""})`,
      );
    }

    return shader;
  }

  public render(): void {
    this.clear();
    this.drawCellsOfState("alive");
    this.drawCellsOfState("infected");
  }

  private clear(): void {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  private drawCellsOfState(cellState: CellState) {
    const vertices = this.getVerticesForCellsOfState(cellState);
    this.setColor(CELL_STATE_COLORS[cellState]);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.DYNAMIC_DRAW,
    );
    this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 2);
  }

  private getVerticesForCellsOfState(cellState: CellState): number[] {
    const nbLines = this.grid.nbLines;
    const nbColumns = this.grid.nbColumns;
    const vertices: number[] = [];
    for (let line = 0; line < nbLines; line++) {
      for (let column = 0; column < nbColumns; column++) {
        if (this.grid.cells[line][column].currentState === cellState) {
          vertices.push(...this.getVerticesForCell(nbLines - line, column));
        }
      }
    }

    const shaderPositionAttribute = this.gl.getAttribLocation(
      this.program,
      shaderPositionAttributeName,
    );
    if (shaderPositionAttribute < 0) {
      throw new Error(
        `Failed to get the storage location of ${shaderPositionAttributeName}`,
      );
    }

    this.gl.enableVertexAttribArray(shaderPositionAttribute);
    this.gl.vertexAttribPointer(
      shaderPositionAttribute,
      2,
      this.gl.FLOAT,
      false,
      0,
      0,
    );

    return vertices;
  }

  private getVerticesForCell(line: number, column: number): number[] {
    return [
      column * this.cellSize,
      line * this.cellSize,
      column * this.cellSize,
      (line + 1) * this.cellSize,
      (column + 1) * this.cellSize,
      line * this.cellSize,

      column * this.cellSize,
      (line + 1) * this.cellSize,
      (column + 1) * this.cellSize,
      (line + 1) * this.cellSize,
      (column + 1) * this.cellSize,
      line * this.cellSize,
    ];
  }

  private setColor(rgba: number[]): void {
    const shaderColor = this.gl.getUniformLocation(
      this.program,
      shaderColorVariableName,
    );
    if (shaderColor === null) {
      throw new Error(
        `Failed to get the storage location of ${shaderColorVariableName}`,
      );
    }

    this.gl.uniform4fv(shaderColor, rgba);
  }
}
