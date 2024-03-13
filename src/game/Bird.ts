import { Vector, Velocity } from "../d";
import Timer from "./Timer";
import { clamp } from "../utils";

const RADIAN: number = Math.PI / 180;

export default class Bird {
  private rotationDegree: number = 0;
  private timer: Timer = new Timer();
  public dead: boolean = false;
  public centerPoint: Vector;
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public images: [HTMLImageElement, HTMLImageElement, HTMLImageElement] = [
      new Image(),
      new Image(),
      new Image(),
    ],
    public frame: number = 0,
    public width: number = 34,
    public height: number = 26,
    public velocity: Vector = { x: Velocity.X, y: 0 },
    public gravity: number = Velocity.ACCELERATION
  ) {
    images[0].src = "./assets/bird1.png";
    images[1].src = "./assets/bird2.png";
    images[2].src = "./assets/bird3.png";
    this.timer.onTick(() => {
      ++this.frame > 2 ? (this.frame = 0) : this.frame;
    }, 100);
    this.timer.start();
    this.centerPoint = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  public update(): void {
    this.y += this.velocity.y;
    this.velocity.y += this.gravity;
    const maxY: number = this.context.canvas.height - 62 - this.height;
    const minY: number = this.height;
    this.y = clamp(this.y, minY, maxY);
  }

  public draw(): void {
    this.setRotation();
    this.rotate();
  }

  public flap(): void {
    this.velocity.y = Velocity.Y;
  }

  public kill(): void {
    this.timer.stop();
    this.dead = true;
    this.gravity = Velocity.ACCELERATION;
    this.rotationDegree = 90;
  }

  private rotate(): void {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotationDegree * RADIAN);
    this.context.drawImage(
      this.images[this.frame],
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.context.restore();
  }

  private setRotation(): void {
    if (this.velocity.y >= 0) {
      this.rotationDegree = Math.min(90, this.rotationDegree + 1);
      this.frame = 1;
    } else {
      this.rotationDegree = Math.max(-12, this.rotationDegree - 12);
    }
  }

  private drawBoundingBox(): void {
    this.context.beginPath();
    this.context.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    this.context.stroke();
    this.context.closePath();
  }
}
