export interface GridRenderer {
  render(): void;
  destroy(): void;
  strategyName: string;
}
