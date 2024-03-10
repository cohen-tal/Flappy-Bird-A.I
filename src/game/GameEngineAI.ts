// import Bird from "./Bird";
import Pipes from "./Pipes";
import Ground from "./Ground";
import { randInt } from "../utils";
import Population from "./Population";
import BirdAI from "./BirdAI";

export default class GameEngineAI {
  public gameScore: number = 0;
  public bestScore: number = 0;
  public gen: number = 1;
  public pop: number = 1;
  private canUpdateScore: boolean = true;
  private population: Population;
  constructor(
    private context: CanvasRenderingContext2D,
    private pipes: Pipes[] = [],
    private ground: Ground = new Ground(context, 0)
  ) {
    this.population = new Population(context, 100);
    this.generatePipes();
  }

  public update(): void {
    this.population.update(this.pipes);
    this.updatePipes();
    this.ground.update();
    this.updateGameScore();
    if (this.population.allDead()) {
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
    this.ground.draw();
  }

  private generatePipes(): void {
    const firstPipeX: number = Math.floor(this.context.canvas.width * 1.2);
    const firstPipeY: number = Math.floor(this.context.canvas.height / 2);
    const firstPipes: Pipes = new Pipes(this.context, firstPipeX, firstPipeY);
    this.pipes.push(firstPipes);

    for (let i = 0; i < 2; i++) {
      const pipeHeight: number = randInt(100, 340);
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
    const pipeY: number = randInt(100, 360);
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

  // private checkCollision(bird: Bird): boolean {
  //   const collisionWithPipes: boolean = this.pipes.some((pipe) => {
  //     const birdX: number = bird.x - bird.width / 2;
  //     const birdY: number = bird.y - bird.height / 2;
  //     return pipe.isColliding(birdX, birdY, bird.width, bird.height);
  //   });
  //   const collisionWithGround: boolean =
  //     this.bird.y + this.bird.height >=
  //     this.context.canvas.height - this.ground.height + 10;

  //   return collisionWithPipes || collisionWithGround;
  // }

  // private updateGameScore(): void {
  //   const closestPipe: Pipes = this.pipes[0];
  //   if (this.bird.x > closestPipe.pipeX + closestPipe.width) {
  //     this.gameScore++;
  //     this.canUpdateScore = false;
  //   }

  //   if (this.gameScore > this.bestScore) {
  //     this.bestScore = this.gameScore;
  //   }
  // }

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
