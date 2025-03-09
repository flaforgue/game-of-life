export type CellState = "dead" | "alive" | "infected";

type Neighbors = (Cell | undefined)[];

export class Cell {
  private _hasInfectedState: boolean;
  private _currentState: CellState;
  private _nextState: CellState | null;
  private _nbTicksSameState: number;

  public constructor(currentState: CellState) {
    this._currentState = currentState;
    this._nextState = null;
    this._nbTicksSameState = 0;
    this._hasInfectedState = false;
  }

  public get isAlive(): boolean {
    return this._currentState === "alive";
  }

  public get currentState(): CellState {
    return this._currentState;
  }

  public computeNextState(neighbors: Neighbors): void {
    let nbAliveNeighbors = 0;
    let nbInfectedNeighbors = 0;
    for (let i = 0; i < neighbors.length; i++) {
      const neighborCurrentState = neighbors[i]?.currentState;
      if (neighborCurrentState === "alive") {
        nbAliveNeighbors++;
      } else if (neighborCurrentState === "infected") {
        nbInfectedNeighbors++;
      }
    }

    if (nbAliveNeighbors < 2 || nbAliveNeighbors > 3) {
      this._nextState = "dead";
    } else if (nbAliveNeighbors === 2) {
      this._nextState = this._currentState;
    } else if (nbAliveNeighbors === 3) {
      this._nextState = "alive";
    }

    if (this._hasInfectedState) {
      this.changeStateIfInfected(nbAliveNeighbors, nbInfectedNeighbors);

      if (this._nextState === this._currentState) {
        this._nbTicksSameState++;
      } else {
        this._nbTicksSameState = 0;
      }
    }
  }

  public get hasInfectedState(): boolean {
    return this._hasInfectedState;
  }

  public setHasInfectedState(hasInfectedState: boolean) {
    this._hasInfectedState = hasInfectedState;
    if (this._hasInfectedState) {
      return;
    }

    this._nbTicksSameState = 0;

    if (this._currentState === "infected") {
      this._currentState = "dead";
    }

    if (this._nextState === "infected") {
      this._nextState = "dead";
    }
  }

  private changeStateIfInfected(
    nbAliveNeighbors: number,
    nbInfectedNeighbors: number,
  ): void {
    if (
      this.currentState === "dead" &&
      this._nbTicksSameState >= 100 &&
      nbAliveNeighbors < 2
    ) {
      this._nextState = "infected";

      return;
    }

    if (nbInfectedNeighbors > 7) {
      this._nextState = "infected";

      return;
    }

    if (this._currentState === "infected" && this._nextState === "dead") {
      this._nextState = "infected";

      return;
    }

    if (this._currentState === "infected" && this._nbTicksSameState >= 100) {
      this._nextState = "alive";

      return;
    }
  }

  public live(): void {
    this._currentState = "alive";
  }

  public update(): void {
    if (this._nextState === null) {
      throw new Error("Cell nextState is null");
    }

    this._currentState = this._nextState;
    this._nextState = null;
  }
}
