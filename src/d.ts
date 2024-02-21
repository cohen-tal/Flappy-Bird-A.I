export interface Tile {
  image: HTMLImageElement;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IVelocity {
  x: number;
  y: number;
  acc: number;
}

export enum Velocity {
  X = 4,
  Y = -8,
  ACCELERATION = 0.2,
}

export enum GameState {
  INIT,
  RUNNING,
  GAMEOVER,
}
