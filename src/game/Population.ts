import BirdAI from "./BirdAI";
import Pipes from "./Pipes";

export default class Population {
  public birds: BirdAI[] = [];
  public bestBird: BirdAI;
  public bestScore: number = 0;
  public gameScore: number = 0;
  public pipes: Pipes[] = [];
  public extinctPopulation: boolean = false;
  public extinctionCount: number = 0;
  constructor(
    private context: CanvasRenderingContext2D,
    private pop: number = 1,
    public gen: number = 1
  ) {
    this.populate();
    this.bestBird = this.birds[0];
  }

  public update(pipes: Pipes[]): void {
    const aliveBirds: BirdAI[] = this.birds.filter((bird) => !bird.dead);
    if (aliveBirds.length > 0) {
      aliveBirds.forEach((bird) => {
        bird.think(pipes);
        bird.update();
        if (this.checkCollision(bird, pipes)) {
          bird.kill();
        } else {
          if (bird.passedPipes(pipes[0])) {
            bird.score++;
          }
        }
        if (bird.score > this.bestScore) {
          this.bestScore = bird.score;
        }
      });
    }
  }

  public draw(): void {
    this.birds.forEach((bird) => {
      if (!bird.dead) {
        bird.draw();
      }
    });
  }

  public drawVectors(pipes: Pipes[]): void {
    this.birds.forEach((bird) => {
      if (!bird.dead) {
        bird.drawVectors(pipes);
      }
    });
  }

  public nextGeneration(): void {
    if (this.extinctPopulation) {
      this.birds = [];
      this.populate();
      this.gen = 1;
      this.extinctPopulation = false;
      return;
    }
    this.birds.sort((a, b) => b.fitness - a.fitness);
    const randomBird: BirdAI = this.birds[Math.floor(Math.random() * 3) + 1];
    const bestBird: BirdAI =
      this.bestBird.fitness > this.birds[0].fitness
        ? this.bestBird
        : this.birds[0];
    const bestBird2: BirdAI = new BirdAI(this.context, 180, 320);
    bestBird2.brain = bestBird.brain.clone();
    bestBird2.mutate();
    const newBirds: BirdAI[] = [bestBird2];
    for (let i = 1; i < this.birds.length / 2; i++) {
      const parentA: BirdAI = bestBird;
      const parentB: BirdAI = this.pickOne();
      const child: BirdAI = new BirdAI(this.context, 180, 320);
      const child2: BirdAI = new BirdAI(this.context, 180, 320);
      child.brain = parentA.brain.crossover(parentB.brain);
      child2.brain = parentB.brain.crossover(randomBird.brain);
      child.brain.mutate();
      child2.brain.mutate();
      newBirds.push(child);
      newBirds.push(child2);
    }
    this.bestBird = bestBird;
    this.birds = newBirds;
    this.gen++;
  }

  public extinct(): void {
    this.extinctPopulation = true;
    this.extinctionCount++;
  }

  private pickOne(): BirdAI {
    let index: number = 0;
    let sum: number = 0;
    //calculate the sum of all the fitnesses
    this.birds.forEach((bird) => {
      sum += bird.fitness;
    });
    let r: number = Math.random() * sum;
    while (r > 0) {
      r -= this.birds[index].fitness;
      index++;
    }
    index--;
    const bird: BirdAI = this.birds[index];
    const child: BirdAI = new BirdAI(this.context, 180, 280);
    child.brain = bird.brain.clone();
    child.brain.mutate();
    return child;
  }

  public allDead(): boolean {
    return this.birds.every((bird) => bird.dead);
  }

  private updateGameScore(birdScore: number): void {
    if (birdScore > this.gameScore) {
      this.gameScore = birdScore;
    }
  }

  private checkCollision(bird: BirdAI, pipes: Pipes[]): boolean {
    return pipes.some((pipe) => {
      const birdX: number = bird.x - bird.width / 2;
      const birdY: number = bird.y - bird.height / 2;
      return (
        pipe.isColliding(birdX, birdY, bird.width, bird.height) ||
        bird.y > this.context.canvas.height - 72 - bird.height
      );
    });
  }

  private populate(): void {
    for (let i = 0; i < this.pop; i++) {
      this.birds.push(new BirdAI(this.context, 180, 320));
    }
  }
}
