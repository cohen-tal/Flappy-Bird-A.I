import Doodler from "./game/doodler";
import GameEngine from "./game/GameEngine";
import "./styles.css";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

const doodler: Doodler = new Doodler(canvas.width, context);

document.addEventListener("keydown", moveDoodler);

function moveDoodler(event: KeyboardEvent) {
  if (event.key === "ArrowRight" || event.key === "keyD") {
    doodler.moveRight();
  }
  if (event.key === "ArrowLeft" || event.key === "keyA") {
    doodler.moveLeft();
  }
}

const img = new Image();
img.src = "./assets/tile.png";

const gameEngine: GameEngine = new GameEngine(context);
gameEngine.init();
update();

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, canvas.width, canvas.height);
  // context.drawImage(img, 0, 0, 80, 20);
  gameEngine.update();
  // doodler.draw();
  // doodler.update();
}
