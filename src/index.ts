import Bird from "./game/Bird";
import Ground from "./game/Ground";
import Pipes from "./game/SinglePipe";
import GameEngine from "./game/GameEngine";
import "./styles.css";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

// let leftKeyPressed = false;
// let rightKeyPressed = false;

// document.addEventListener("keydown", (e: KeyboardEvent) => {
//   if (e.key === "ArrowLeft") {
//     leftKeyPressed = true;
//     gameEngine.playerDir = Direction.LEFT;
//   } else if (e.key === "ArrowRight") {
//     rightKeyPressed = true;
//     gameEngine.playerDir = Direction.RIGHT;
//   }
// });

// document.addEventListener("keyup", (e: KeyboardEvent) => {
//   if (e.key === "ArrowLeft") {
//     leftKeyPressed = false;
//   } else if (e.key === "ArrowRight") {
//     rightKeyPressed = false;
//   }
// });

const bird: Bird = new Bird(context, 100, 100);
const pipes: Pipes = new Pipes(context, 100, 0);
const ground: Ground = new Ground(context, 0);
let keyDown: boolean = false;
const gameEngine = new GameEngine(context, bird);
document.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === " ") {
    bird.flap();
    keyDown = true;
  }
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === " ") {
    keyDown = false;
  }
});

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameEngine.update();
  gameEngine.draw();
  // bird.update();
  // pipes.update();
  // ground.update();
  // pipes.draw();
  // bird.draw();
  // ground.draw();

  // if (leftKeyPressed) {
  //   gameEngine.keyDown = true;
  //   gameEngine.updateDoodlersDX(-4);
  // } else if (rightKeyPressed) {
  //   gameEngine.keyDown = true;
  //   gameEngine.updateDoodlersDX(4);
  // } else {
  //   gameEngine.keyDown = false;
  // }

  // gameEngine.update();
  // gameEngine.draw();
}

update();
