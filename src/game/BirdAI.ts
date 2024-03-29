import { Vector, Velocity } from "../d";
import NeuralNetwork from "../neural-network/neural-network";
import { verticalDistance } from "../utils";
import Bird from "./Bird";
import Pipes from "./Pipes";

export default class BirdAI extends Bird {
  public fitness: number = 0;
  public brain: NeuralNetwork = new NeuralNetwork(3, 1);
  public score: number = 0;
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
    super(context, x, y, images, frame, width, height, velocity, gravity);
  }

  public update(): void {
    super.update();
    this.fitness += 0.1;
  }

  public draw(): void {
    super.draw();
  }

  public flap(): void {
    super.flap();
  }

  public kill(): void {
    super.kill();
  }

  public think(pipes: Pipes[]): void {
    const closestPipes: Pipes = this.closestPipes(pipes);
    const topPipeCenter: Vector = closestPipes.getTopPipeCenterCoordinates();
    const bottomPipeCenter: Vector =
      closestPipes.getBottomPipeCenterCoordinates();

    const centerPoint: Vector = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };

    const topVec: Vector = { x: centerPoint.x, y: topPipeCenter.y };
    const bottomVec: Vector = { x: centerPoint.x, y: bottomPipeCenter.y };
    const centerGap: Vector = {
      x: closestPipes.getTopPipeCenterCoordinates().x + closestPipes.width / 2,
      y: closestPipes.getTopPipeCenterCoordinates().y + closestPipes.gap / 2,
    };

    const inputs: number[] = [
      verticalDistance(centerPoint, centerGap),
      verticalDistance(topVec, centerPoint),
      verticalDistance(bottomVec, centerPoint),
    ];

    const output: number[] = this.brain.predict(inputs);

    if (output[0] > 0.5) {
      this.flap();
    }
  }

  public mutate(): void {
    this.brain.mutate();
  }

  public calculateFitness(weight: number): void {
    this.fitness = this.score / weight;
  }

  public passedPipes(pipes: Pipes): boolean {
    return this.x > pipes.pipeX + pipes.width + 2;
  }

  public drawVectors(
    pipes: Pipes[],
    centerPoint: Vector = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    }
  ): void {
    const nearest: Pipes = this.closestPipes(pipes);
    this.context.beginPath();
    this.context.moveTo(centerPoint.x, centerPoint.y);
    this.context.lineTo(
      nearest.getTopPipeCenterCoordinates().x,
      nearest.getTopPipeCenterCoordinates().y
    );
    this.context.strokeStyle = "green";
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(centerPoint.x, centerPoint.y);
    this.context.lineTo(
      nearest.getBottomPipeCenterCoordinates().x,
      nearest.getBottomPipeCenterCoordinates().y
    );
    this.context.strokeStyle = "green";
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(centerPoint.x, centerPoint.y);
    this.context.lineTo(centerPoint.x, nearest.getTopPipeCenterCoordinates().y);
    this.context.strokeStyle = "red";
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(centerPoint.x, centerPoint.y);
    this.context.lineTo(
      centerPoint.x,
      nearest.getBottomPipeCenterCoordinates().y
    );
    this.context.strokeStyle = "blue";
    this.context.stroke();
    this.context.closePath();
  }

  private closestPipes(pipes: Pipes[]): Pipes {
    return this.passedPipes(pipes[0]) ? pipes[1] : pipes[0];
  }
}
