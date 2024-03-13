import Bird from "./Bird";
import Pipes from "./Pipes";
import Ground from "./Ground";
import { randInt } from "../utils";

export default class GameEngine {
  public keyDown: boolean = false;
  public gameScore: number = 0;
  public bestScore: number = 0;
  public gen: number = 1;
  public pop: number = 1;
  private canUpdateScore: boolean = true;
  constructor(
    private context: CanvasRenderingContext2D,
    private gameOver: () => void,
    public bird: Bird = new Bird(context, 100, 100),
    private pipes: Pipes[] = [],
    private ground: Ground = new Ground(context, 0)
  ) {
    this.generatePipes();
  }

  public update(): void {
    if (this.keyDown) {
      this.bird.flap();
    }
    this.bird.update();
    if (!this.bird.dead) {
      this.updatePipes();
      this.ground.update();
      if (this.checkCollision(this.bird)) {
        this.bird.kill();
        this.gameOver();
      }
    }
    if (this.canUpdateScore) {
      this.updateGameScore();
    }
  }

  public draw(): void {
    this.pipes.forEach((pipe) => {
      pipe.draw();
    });
    this.bird.draw();
    this.ground.draw();
  }

  private generatePipes(): void {
    const firstPipeX: number = Math.floor(this.context.canvas.width * 1.5);
    const firstPipeY: number = Math.floor(this.context.canvas.height / 3);
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
    const pipeY: number = randInt(100, 340);
    const pipe: Pipes = new Pipes(this.context, pipeX, pipeY);
    this.pipes.push(pipe);
  }

  private checkCollision(bird: Bird): boolean {
    const collisionWithPipes: boolean = this.pipes.some((pipe) => {
      const birdX: number = bird.x - bird.width / 2;
      const birdY: number = bird.y - bird.height / 2;
      return pipe.isColliding(birdX, birdY, bird.width, bird.height);
    });
    const collisionWithGround: boolean =
      this.bird.y + this.bird.height >=
      this.context.canvas.height - this.ground.height + 10;

    return collisionWithPipes || collisionWithGround;
  }

  private updateGameScore(): void {
    const closestPipe: Pipes = this.pipes[0];
    if (this.bird.x > closestPipe.pipeX + closestPipe.width) {
      this.gameScore++;
      this.canUpdateScore = false;
    }

    if (this.gameScore > this.bestScore) {
      this.bestScore = this.gameScore;
    }
  }
}
