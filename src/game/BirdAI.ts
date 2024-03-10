import { Vector, Velocity } from "../d";
import NeuralNetwork from "../neural-network/nn";
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
    let closestPipes: Pipes = pipes[0];
    if (this.passedPipes(closestPipes)) {
      closestPipes = pipes[1];
    }
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

    this.context.beginPath();
    this.context.moveTo(centerPoint.x, centerPoint.y);
    this.context.lineTo(
      closestPipes.getTopPipeCenterCoordinates().x + closestPipes.width / 2,
      closestPipes.getTopPipeCenterCoordinates().y + closestPipes.gap / 2
    );
    this.context.strokeStyle = "green";
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(centerPoint.x, centerPoint.y);
    this.context.lineTo(centerPoint.x, topPipeCenter.y);
    this.context.strokeStyle = "red";
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(centerPoint.x, centerPoint.y);
    this.context.lineTo(centerPoint.x, bottomPipeCenter.y);
    this.context.strokeStyle = "blue";
    this.context.stroke();
    this.context.closePath();

    const inputs: number[] = [
      verticalDistance(centerPoint, centerGap) / 500,
      verticalDistance(topVec, centerPoint) / 500,
      verticalDistance(bottomVec, centerPoint) / 500,
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
    return this.x > pipes.pipeX + pipes.width;
  }
}
