import { GridRenderer } from "../../../domain/game/grid/grid-renderer";

export class GridRendererDummy implements GridRenderer {
  public readonly strategyName;

  public constructor(strategyName = "dummyGridRenderer") {
    this.strategyName = strategyName;
  }

  public render(): void {
    return;
  }

  public destroy(): void {
    return;
  }
}
