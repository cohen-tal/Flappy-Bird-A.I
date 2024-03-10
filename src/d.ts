export interface Vector {
  x: number;
  y: number;
}

export enum Velocity {
  X = 4,
  Y = -5,
  ACCELERATION = 0.35,
}

export enum GameState {
  INIT,
  RUNNING,
  GAMEOVER,
}
