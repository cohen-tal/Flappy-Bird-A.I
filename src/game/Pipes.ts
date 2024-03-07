import { Velocity } from "../d";
import SinglePipe from "./SinglePipe";

export default class Pipes {
  private topPipe: SinglePipe;
  private bottomPipe: SinglePipe;
  public width: number = 64;
  constructor(
    private context: CanvasRenderingContext2D,
    public pipeX: number,
    public pipeLength: number,
    public gap: number = 20
  ) {
    this.topPipe = this.newTopPipe();
    this.bottomPipe = this.newBottomPipe();
  }

  public update(): void {
    this.pipeX -= Velocity.X;
    this.topPipe.update();
    this.bottomPipe.update();
  }

  public draw(): void {
    this.topPipe.draw();
    this.bottomPipe.draw();
  }

  public isColliding(
    x: number,
    y: number,
    width: number,
    height: number
  ): boolean {
    const topPipe: boolean = this.topPipe.isColliding(x, y, width, height);
    const bottomPipe: boolean = this.bottomPipe.isColliding(
      x,
      y,
      width,
      height
    );
    return topPipe || bottomPipe;
  }

  private newTopPipe(): SinglePipe {
    const topPipeY: number = 0 - this.pipeLength + this.gap;
    const topPipe: SinglePipe = new SinglePipe(
      this.context,
      this.pipeX,
      topPipeY
    );
    topPipe.image.src = "./assets/top-pipe.png";
    return topPipe;
  }

  private newBottomPipe(): SinglePipe {
    const bottomPipeY: number =
      this.context.canvas.height - 112 - this.pipeLength;
    const bottomPipe: SinglePipe = new SinglePipe(
      this.context,
      this.pipeX,
      bottomPipeY
    );
    bottomPipe.image.src = "./assets/bottom-pipe.png";
    return bottomPipe;
  }
}
