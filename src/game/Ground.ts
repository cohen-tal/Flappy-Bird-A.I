import { Velocity } from "../d";

export default class Ground {
  private groundImage: HTMLImageElement = new Image();
  constructor(
    private context: CanvasRenderingContext2D,
    public x: number,
    public y: number = 0,
    public width: number = 360,
    public height: number = 72
  ) {
    this.groundImage.src = "./assets/ground.jpeg";
  }

  public update(): void {
    this.x -= Velocity.X;
    if (this.x <= -this.width + 30) {
      this.x = 0;
    }
  }

  public draw(): void {
    this.y = this.context.canvas.height - this.height;
    this.context.drawImage(this.groundImage, this.x, this.y);
  }
}
