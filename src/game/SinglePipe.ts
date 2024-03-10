import { Velocity } from "../d";

export default class SinglePipe {
  constructor(
    private context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number = 64,
    public length: number = 400,
    public image: HTMLImageElement = new Image()
  ) {}

  public update(): void {
    this.x -= Velocity.X;
  }

  public draw(): void {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.length);
  }

  isColliding(x: number, y: number, width: number, height: number): boolean {
    return (
      x < this.x + this.width &&
      x + width > this.x &&
      y < this.y + this.length &&
      y + height > this.y
    );
  }
}
