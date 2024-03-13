export interface Vector {
  x: number;
  y: number;
}

export enum Velocity {
  X = 2,
  Y = -3.6,
  ACCELERATION = 0.125,
}

export enum GameState {
  INIT,
  PLAY,
  GAMEOVER,
}

export enum PlayerType {
  HUMAN = "Human",
  AI = "AI",
}
