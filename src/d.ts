export interface Vector {
  x: number;
  y: number;
}

export enum Velocity {
  X = 2,
  Y = -5.8,
  ACCELERATION = 0.33,
}

export enum GameState {
  INIT,
  RUNNING,
  GAMEOVER,
}
