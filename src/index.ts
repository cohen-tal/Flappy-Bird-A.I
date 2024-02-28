import { Direction } from "./d";
import GameEngine from "./game/GameEngine";
import "./styles.css";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const gameEngine: GameEngine = new GameEngine(context, false);

let leftKeyPressed = false;
let rightKeyPressed = false;

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "ArrowLeft") {
    leftKeyPressed = true;
    gameEngine.playerDir = Direction.LEFT;
  } else if (e.key === "ArrowRight") {
    rightKeyPressed = true;
    gameEngine.playerDir = Direction.RIGHT;
  }
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "ArrowLeft") {
    leftKeyPressed = false;
  } else if (e.key === "ArrowRight") {
    rightKeyPressed = false;
  }
});

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (leftKeyPressed) {
    gameEngine.keyDown = true;
    gameEngine.updateDoodlersDX(-4);
  } else if (rightKeyPressed) {
    gameEngine.keyDown = true;
    gameEngine.updateDoodlersDX(4);
  } else {
    gameEngine.keyDown = false;
  }

  gameEngine.update();
  gameEngine.draw();
}

update();
