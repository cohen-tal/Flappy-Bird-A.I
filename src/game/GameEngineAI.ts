// import Bird from "./Bird";
import Pipes from "./Pipes";
import Ground from "./Ground";
import { randInt } from "../utils";
import Population from "./Population";
import BirdAI from "./BirdAI";

export default class GameEngineAI {
  public gameScore: number = 0;
  public bestScore: number = 0;
  public extinctionCount: number = 0;
  public showVectors: boolean = false;
  private canUpdateScore: boolean = true;
  private population: Population;
  constructor(
    private context: CanvasRenderingContext2D,
    private pipes: Pipes[] = [],
    private ground: Ground = new Ground(context, 0)
  ) {
    this.population = new Population(context, 500);
    this.generatePipes();
  }

  public update(): void {
    this.population.update(this.pipes);
    this.updatePipes();
    this.ground.update();
    this.updateGameScore();
    if (this.population.allDead()) {
      // check if we need to extinct the population and create a new one
      if (this.gameScore === 0 && this.population.gen > 5) {
        this.population.extinct();
      }
      this.population.nextGeneration();
      this.pipes = [];
      this.gameScore = 0;
      this.canUpdateScore = true;
      this.generatePipes();
    }
  }

  public draw(): void {
    this.pipes.forEach((pipe) => {
      pipe.draw();
    });
    this.population.draw();
    if (this.showVectors) {
      this.population.drawVectors(this.pipes);
    }
    this.ground.draw();
  }

  public getScore(): string {
    return this.gameScore.toString();
  }

  public getBestScore(): string {
    return this.bestScore.toString();
  }

  public getPopulation(): string {
    return this.population.birds.filter((bird) => !bird.dead).length.toString();
  }

  public getGeneration(): string {
    return this.population.gen.toString();
  }

  public getExtinctionCount(): string {
    return this.population.extinctionCount.toString();
  }

  private generatePipes(): void {
    const firstPipeX: number = Math.floor(this.context.canvas.width * 1);
    const firstPipeY: number = Math.floor(this.context.canvas.height / 3);
    const firstPipes: Pipes = new Pipes(this.context, firstPipeX, firstPipeY);
    this.pipes.push(firstPipes);

    for (let i = 0; i < 2; i++) {
      const pipeHeight: number = randInt(110, 350);
      const pipeX: number = this.pipes[this.pipes.length - 1].pipeX + 300;
      const pipe: Pipes = new Pipes(this.context, pipeX, pipeHeight);
      this.pipes.push(pipe);
    }
  }

  private updatePipes(): void {
    this.pipes.forEach((pipe) => {
      pipe.update();
    });
    if (this.pipes[0].pipeX < -this.pipes[0].width) {
      this.pipes.shift();
      this.addPipe();
      this.canUpdateScore = true;
    }
  }

  private addPipe(): void {
    const pipeX: number = this.pipes[this.pipes.length - 1].pipeX + 300;
    const pipeY: number = randInt(110, 350);
    const pipe: Pipes = new Pipes(this.context, pipeX, pipeY);
    this.pipes.push(pipe);
  }

  private updateGameScore(): void {
    const closestPipe: Pipes = this.pipes[0];

    const update: boolean = this.population.birds.some((bird) => {
      if (bird.passedPipes(closestPipe)) {
        return true;
      }
      return false;
    });

    if (update && this.canUpdateScore) {
      this.gameScore++;
      this.canUpdateScore = false;
    }

    if (this.gameScore > this.bestScore) {
      this.bestScore = this.gameScore;
    }
  }

  private drawLinesFromBirdToPipes(bird: BirdAI): void {
    const pipe: Pipes = this.pipes[0];
    this.context.beginPath();
    this.context.moveTo(bird.x, bird.y);
    this.context.lineTo(bird.x, pipe.getBottomPipeCenterCoordinates().y);
    this.context.strokeStyle = "blue";
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(bird.x, bird.y);
    this.context.lineTo(
      pipe.getTopPipeCenterCoordinates().x,
      pipe.getTopPipeCenterCoordinates().y
    );
    this.context.strokeStyle = "red";
    this.context.stroke();
    this.context.closePath();
  }
}
