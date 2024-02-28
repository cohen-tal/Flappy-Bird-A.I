import Doodler from "./doodler";
import { Tile, Direction } from "../d";
import { randInt, detectCollision } from "../utils";

const gameScore: HTMLParagraphElement = document.getElementById(
  "score"
) as HTMLParagraphElement;

export default class GameEngine {
  private doodlers: Doodler[] = [];
  private tiles: Tile[] = [];
  private gameScore: number = 0;
  //   private gameState: number;

  constructor(
    private context: CanvasRenderingContext2D,
    private isAI: boolean,
    public keyDown: boolean = false,
    public playerDir: Direction = Direction.STILL
  ) {
    if (!this.isAI) {
      this.doodlers = [
        new Doodler(
          context,
          [new Image(), new Image()],
          46,
          46,
          context.canvas.width / 2 - 20,
          context.canvas.height - 80,
          0,
          0,
          context.canvas.height - 80,
          { gravity: 0.4, drag: 0.3 }
        ),
      ];
    }
    const startTile = {
      image: new Image(),
      width: 80,
      height: 20,
      x: this.context.canvas.width / 2 - 40,
      y: this.context.canvas.height - 20,
    };
    this.tiles.push(startTile);
    startTile.image.src = "./assets/tile.png";

    //fill other tiles on screen
    for (let i = 1; i < 7; i++) {
      this.tiles.push({
        image: new Image(),
        width: 80,
        height: 20,
        x: randInt(0, this.context.canvas.width - 80),
        y: this.tiles[i - 1].y - 75,
      });
      this.tiles[i].image.src = "./assets/tile.png";
    }
  }

  public draw() {
    this.tiles.forEach((tile) => {
      this.context.drawImage(
        tile.image,
        tile.x,
        tile.y,
        tile.width,
        tile.height
      );
    });
    this.doodlers.forEach((doodler) => {
      doodler.draw();
    });
  }

  public update() {
    const doodler = this.doodlers[0];
    doodler.dy += doodler.physics.gravity;
    if (doodler.reachedHalfway()) {
      this.slideTilesDown(doodler.dy);
      this.newTile();
      this.gameScore++;
      gameScore.innerText = `Score: ${this.gameScore.toString()}`;
    } else {
      doodler.y += doodler.dy;
    }

    this.tiles.forEach((tile) => {
      if (detectCollision(doodler, tile)) {
        doodler.y = tile.y - doodler.getHeight();
        doodler.dy = doodler.bounceVelocity;
      }
    });

    if (!this.keyDown) {
      if (this.playerDir === Direction.LEFT) {
        doodler.dx += doodler.physics.drag;
        if (doodler.dx > 0) {
          doodler.dx = 0;
          this.playerDir = Direction.STILL;
        }
      } else if (this.playerDir === Direction.RIGHT) {
        doodler.dx -= doodler.physics.drag;
        if (doodler.dx < 0) {
          doodler.dx = 0;
          this.playerDir = Direction.STILL;
        }
      }
    }
    doodler.x += doodler.dx;
    doodler.update();
  }

  public updateDoodlersDX(dx: number): void {
    this.doodlers.forEach((doodler) => {
      doodler.dx = dx;
      dx > 0
        ? (doodler.direction = Direction.RIGHT)
        : (doodler.direction = Direction.LEFT);
    });
  }

  public getGameScore(): string {
    return this.gameScore.toString();
  }

  private slideTilesDown(dy: number) {
    this.tiles.forEach((tile) => (tile.y -= dy));
  }

  private newTile() {
    const canvasHeight: number = this.context.canvas.height;
    if (this.tiles.length > 0 && this.tiles[0].y >= canvasHeight) {
      this.tiles.push({
        image: new Image(),
        width: 80,
        height: 20,
        x: randInt(0, this.context.canvas.width - 80),
        y: -20,
      });
      this.tiles[this.tiles.length - 1].image.src = "./assets/tile.png";
      this.tiles.shift();
    }
  }
}
