import Doodler from "./doodler";
import { Tile } from "../d";

export default class GameEngine {
  private doodler: Doodler;
  private tiles: Tile[];
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.doodler = new Doodler(360, this.context);
    this.tiles = [];
  }

  public init() {
    this.doodler = new Doodler(300, this.context);
    this.tiles = this.createTiles();
    // this.tiles.forEach((tile) => {
    //   tile.image.src = "./assets/tile.png";
    // });
  }

  public update() {
    this.context.clearRect(0, 0, 300, 600);
    this.doodler.draw();
    if (this.detectCollision(this.doodler, ...this.tiles)) {
      this.doodler.jump();
    }
    this.tiles.forEach((tile) => {
      console.log(tile.image.src);
      this.context.drawImage(
        tile.image,
        tile.x,
        tile.y,
        tile.width,
        tile.height
      );
    });
    this.doodler.update();
  }

  private createTiles(): Tile[] {
    const tiles: Tile[] = [];
    for (let i = 0; i < 6; i++) {
      const randomX = Math.floor(Math.random() * 300);
      tiles.push({
        image: new Image(),
        width: 80,
        height: 20,
        x: randomX,
        y: this.context.canvas.height - 75 * i - 150,
      });
      tiles[i].image.src = "./assets/tile.png";
    }
    return tiles;
  }

  private detectCollision(doodler: Doodler, ...tiles: Tile[]): boolean {
    return tiles.some((tile) => {
      if (
        doodler.x < tile.x + tile.width &&
        doodler.x + doodler.width > tile.x &&
        doodler.y < tile.y + tile.height &&
        doodler.y + doodler.height > tile.y
      ) {
        return true;
      }
    });
  }
}
