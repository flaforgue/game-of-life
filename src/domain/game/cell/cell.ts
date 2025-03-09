export type CellState = "dead" | "alive" | "infected";

type Neighbors = (Cell | undefined)[];

export class Cell {
  private _supportsInfectedState: boolean;
  private _currentState: CellState;
  private _nextState: CellState | null;
  private _infectionCharge: number;

  public constructor(currentState: CellState) {
    this._currentState = currentState;
    this._nextState = null;
    this._infectionCharge = 0;
    this._supportsInfectedState = false;
  }

  public get isAlive(): boolean {
    return this._currentState === "alive";
  }

  public get currentState(): CellState {
    return this._currentState;
  }

  public computeNextState(neighbors: Neighbors): void {
    const { nbAliveNeighbors, nbInfectedNeighbors } =
      this.parseNeighbors(neighbors);

    if (nbAliveNeighbors < 2 || nbAliveNeighbors > 3) {
      this._nextState = "dead";
    } else if (nbAliveNeighbors === 2) {
      this._nextState = this._currentState;
    } else if (nbAliveNeighbors === 3) {
      this._nextState = "alive";
    }

    if (!this._supportsInfectedState) {
      return;
    }

    this.computeInfection(nbAliveNeighbors, nbInfectedNeighbors);
  }

  private parseNeighbors(neighbors: Neighbors): {
    nbAliveNeighbors: number;
    nbInfectedNeighbors: number;
  } {
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

    return {
      nbAliveNeighbors,
      nbInfectedNeighbors,
    };
  }

  private computeInfection(
    nbAliveNeighbors: number,
    nbInfectedNeighbors: number,
  ): void {
    if (nbInfectedNeighbors > nbAliveNeighbors) {
      this._infectionCharge++;
    }

    if (this._currentState === "alive" && this._nextState === "alive") {
      this._infectionCharge++;
    }

    if (this._currentState === "infected") {
      if (nbAliveNeighbors > 1) {
        this._nextState = "alive";
        this._infectionCharge = 0;
      } else if (this._nextState === "dead") {
        this._nextState = "infected";
      }
    } else if (this._infectionCharge >= 75) {
      this._nextState = "infected";
    }
  }

  public get supportsInfectedState(): boolean {
    return this._supportsInfectedState;
  }

  public setSupportsInfectedState(supportsInfectedState: boolean) {
    this._supportsInfectedState = supportsInfectedState;

    if (!this._supportsInfectedState) {
      this.revertInfectedState();
    }
  }

  private revertInfectedState() {
    this._infectionCharge = 0;

    if (this._currentState === "infected") {
      this._currentState = "dead";
    }

    if (this._nextState === "infected") {
      this._nextState = "dead";
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
