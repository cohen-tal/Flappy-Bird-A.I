import { IVelocity, Velocity } from "../d";

export default class Doodler {
  private doodler: HTMLImageElement[];
  doodlerImage: HTMLImageElement;
  width: number = 46;
  height: number = 46;
  x: number = 30;
  y: number = 500;
  //   private maxJumpHeight: number = 150;
  //   private maxFallHeight: number = 150;
  private maxWidth: number;
  velocity: IVelocity = {
    x: Velocity.X,
    y: Velocity.Y,
    acc: Velocity.ACCELERATION,
  };
  private context: CanvasRenderingContext2D;

  constructor(maxWidth: number, context: CanvasRenderingContext2D) {
    this.context = context;
    this.doodler = [new Image(), new Image()];
    this.doodler[0].src = "./assets/doodler-left.png";
    this.doodler[1].src = "./assets/doodler-right.png";
    this.doodler[0].onload = () => {
      this.doodlerImage = this.doodler[0];
    };
    this.maxWidth = maxWidth - this.width;
    this.doodlerImage = this.doodler[0];
  }

  public jump() {
    this.velocity.y = Velocity.Y;
  }

  public moveLeft() {
    this.doodlerImage = this.doodler[0];
    this.x -= this.velocity.x;
    if (this.x - this.width < 0) {
      this.x = this.maxWidth;
    }
  }

  public moveRight() {
    this.doodlerImage = this.doodler[1];
    this.x += this.velocity.x;
    if (this.x + this.width > this.maxWidth) {
      this.x = 0;
    }
  }

  update() {
    this.y += this.velocity.y;
    this.velocity.y += this.velocity.acc;
  }

  public draw() {
    this.context.drawImage(
      this.doodlerImage || this.doodler[0],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
