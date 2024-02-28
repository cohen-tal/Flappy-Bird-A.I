import { Physics, Direction } from "../d";

export default class Doodler {
  constructor(
    private context: CanvasRenderingContext2D,
    private images: HTMLImageElement[] = [new Image(), new Image()],
    private width: number,
    private height: number,
    public x: number,
    public y: number,
    public dx: number,
    public dy: number,
    public prevY: number,
    public physics: Physics,
    public bounceVelocity: number = -12.5,
    public direction: Direction = Direction.RIGHT
  ) {
    this.images[0].src = "./assets/doodler-left.png";
    this.images[1].src = "./assets/doodler-right.png";
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public reachedHalfway() {
    return this.dy < 0 && this.y < this.context.canvas.height / 2;
  }

  public draw() {
    const img: HTMLImageElement =
      this.direction === Direction.LEFT ? this.images[0] : this.images[1];
    this.context.drawImage(img, this.x, this.y, this.width, this.height);
    this.prevY = this.y;
  }

  public update() {
    //this.dy += this.physics.gravity;
    const canvasWidth = this.context.canvas.width;
    //make doodle wrap around the screen
    if (this.x + this.width < 0) {
      this.x = canvasWidth;
    } else if (this.x > canvasWidth) {
      this.x = -this.width;
    }
  }
}
