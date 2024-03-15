import GameEngine from "./game/GameEngine";
import "./styles.css";
import GameEngineAI from "./game/GameEngineAI";
import { GameState, PlayerType } from "./d";
import { calculateFPS, hideElements, showElements } from "./utils";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const choosePlayerBtn: HTMLButtonElement = document.getElementById(
  "button"
) as HTMLButtonElement;

const gameScore: HTMLParagraphElement = document.getElementById(
  "score"
) as HTMLParagraphElement;

const population: HTMLParagraphElement = document.getElementById(
  "alive"
) as HTMLParagraphElement;

const generation: HTMLParagraphElement = document.getElementById(
  "generation"
) as HTMLParagraphElement;

const extinct: HTMLParagraphElement = document.getElementById(
  "extinct"
) as HTMLParagraphElement;

const bestscore: HTMLParagraphElement = document.getElementById(
  "best-score"
) as HTMLParagraphElement;

const showVectors: HTMLInputElement = document.getElementById(
  "checkbox"
) as HTMLInputElement;

const gameSpeedSlider: HTMLInputElement = document.getElementById(
  "speed"
) as HTMLInputElement;

const tapToStartBtn: HTMLDivElement = document.getElementById(
  "tap-to-start"
) as HTMLDivElement;

let playerType: PlayerType = PlayerType.AI;
let gameEngine: GameEngine;
let gameEngineAI: GameEngineAI;
let gameState: GameState = GameState.INIT;
let handle: number;
const fps: number = await calculateFPS();

document.addEventListener("keypress", (e: KeyboardEvent) => {
  if (playerType === PlayerType.HUMAN && gameState === GameState.PLAY) {
    if (e.key === " ") {
      gameEngine.bird.flap();
    }
  }
});

canvas.addEventListener("click", () => {
  if (playerType === PlayerType.HUMAN && gameState === GameState.PLAY) {
    gameEngine.bird.flap();
  }
});

tapToStartBtn?.addEventListener("click", () => {
  // reset the game each time the user clicks the start button
  gameState = GameState.PLAY;
  hideElements([tapToStartBtn]);
  initGame();
});

choosePlayerBtn?.addEventListener("click", () => {
  const aiStats: HTMLElement | null =
    document.getElementById("ai-stats-bottom");

  cancelAnimationFrame(handle);
  choosePlayerBtn.blur();

  if (choosePlayerBtn.value === PlayerType.HUMAN) {
    playerType = PlayerType.AI;
    choosePlayerBtn.value = playerType;
    choosePlayerBtn.innerHTML = "Play Yourself";
    aiStats && aiStats.classList.remove("hidden");
  } else {
    playerType = PlayerType.HUMAN;
    choosePlayerBtn.value = playerType;
    choosePlayerBtn.innerHTML = "Watch A.I Play";
    aiStats && aiStats.classList.add("hidden");
  }
  showElements([tapToStartBtn]);
  gameState = GameState.INIT;
});

function initGame(): void {
  cancelAnimationFrame(handle);

  if (playerType === PlayerType.HUMAN) {
    gameEngine = new GameEngine(
      context,
      () => (gameState = GameState.GAMEOVER)
    );
  } else {
    gameEngineAI = new GameEngineAI(context);
  }
  gameLoop(fps);
}

function runGame(fps: number): void {
  // update the game rendering based on the fps value,
  // if the fps is between 30 and 60, the game rendering speed will be twice as fast
  // this is to ensure that the game runs at the same speed on different devices
  const updateRate: number = fps > 75 ? 1 : 2;

  const gameSpeed: number = parseInt(gameSpeedSlider.value);

  for (let i = 0; i < gameSpeed * updateRate; i++) {
    if (playerType === PlayerType.HUMAN) {
      gameEngine.update();
    } else {
      gameEngineAI.update();
    }
  }

  if (playerType === PlayerType.HUMAN) {
    gameEngine.draw();
    gameScore.innerHTML = gameEngine.gameScore.toString();
  } else {
    gameEngineAI.showVectors = showVectors.checked;
    gameEngineAI.draw();
    gameScore.innerHTML = gameEngineAI.getScore();
    bestscore.innerHTML = gameEngineAI.getBestScore();
    generation.innerHTML = gameEngineAI.getGeneration();
    population.innerHTML = gameEngineAI.getPopulation();
    extinct.innerHTML = gameEngineAI.getExtinctionCount();
  }
}

function gameOver(): void {
  showElements([tapToStartBtn]);
}

function gameLoop(fps: number) {
  handle = requestAnimationFrame(() => {
    gameLoop(fps);
  });
  context.clearRect(0, 0, canvas.width, canvas.height);
  switch (gameState) {
    case GameState.INIT:
      initGame();
      break;
    case GameState.PLAY:
      runGame(fps);
      break;
    case GameState.GAMEOVER:
      runGame(fps);
      gameOver();
      break;
  }
}
