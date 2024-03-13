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
          this.bestBird = bird;
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

  // public nextGeneration(): void {
  //   this.birds.sort((a, b) => b.fitness - a.fitness);
  //   const newBirds: BirdAI[] = [];
  //   for (let i = 0; i < this.birds.length; i++) {
  //     const parent: BirdAI = this.birds[0];
  //     const child: BirdAI = new BirdAI(this.context, 180, 280);
  //     child.brain = parent.brain.clone();
  //     child.mutate();
  //     newBirds.push(child);
  //   }
  //   this.birds = newBirds;
  //   this.gen++;
  // }

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
    const newBirds: BirdAI[] = [];
    for (let i = 0; i < this.birds.length; i++) {
      const parentA: BirdAI = this.birds[0];
      const parentB: BirdAI = randomBird;
      const child: BirdAI = new BirdAI(this.context, 180, 320);
      child.brain = parentA.brain.crossover(parentB.brain);
      child.brain.mutate();
      newBirds.push(child);
    }
    this.birds = newBirds;
    this.gen++;
  }

  public extinct(): void {
    this.extinctPopulation = true;
    this.extinctionCount++;
  }

  // private pickOne(): BirdAI {
  //   let index: number = 0;
  //   let sum: number = 0;
  //   //calculate the sum of all the fitnesses
  //   this.birds.forEach((bird) => {
  //     sum += bird.fitness;
  //   });
  //   let r: number = Math.random() * sum;
  //   while (r > 0) {
  //     r -= this.birds[index].fitness;
  //     index++;
  //   }
  //   index--;
  //   const bird: BirdAI = this.birds[index];
  //   const child: BirdAI = new BirdAI(this.context, 180, 280);
  //   child.brain = bird.brain.clone();
  //   child.brain.mutate();
  //   return child;
  // }

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
