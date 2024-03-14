import { Vector, Velocity } from "../d";
import SinglePipe from "./SinglePipe";

export default class Pipes {
  private topPipe: SinglePipe;
  private bottomPipe: SinglePipe;
  public width: number = 64;
  constructor(
    private context: CanvasRenderingContext2D,
    public pipeX: number,
    public topPipeLength: number,
    public bottomPipeLength: number = 400,
    public gap: number = 115
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

  public getTopPipeCenterCoordinates(): Vector {
    return {
      x: this.topPipe.x,
      y: this.topPipe.y + this.topPipe.length,
    };
  }

  public getBottomPipeCenterCoordinates(): Vector {
    return {
      x: this.bottomPipe.x,
      y: this.topPipe.y + this.bottomPipe.length + this.gap,
    };
  }

  private newTopPipe(): SinglePipe {
    const topPipeY: number = 0 - this.topPipeLength;
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
      this.topPipe.y + this.bottomPipeLength + this.gap;
    const bottomPipe: SinglePipe = new SinglePipe(
      this.context,
      this.pipeX,
      bottomPipeY
    );
    bottomPipe.image.src = "./assets/bottom-pipe.png";
    return bottomPipe;
  }
}
