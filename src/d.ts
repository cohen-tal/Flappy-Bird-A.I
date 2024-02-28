export interface Tile {
  image: HTMLImageElement;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface Physics {
  gravity: number;
  drag: number;
}

export enum Velocity {
  X = 4,
  Y = -8,
  ACCELERATION = 0.3,
}

export enum GameState {
  INIT,
  RUNNING,
  GAMEOVER,
}

export enum Direction {
  LEFT,
  RIGHT,
  STILL,
}
