// import { Direction, Tile } from "../d";
// import DoodlerAI from "./Doodler-AI";

// export default class Population {
//   public doodlers: DoodlerAI[] = [];
//   public bestDoodler: DoodlerAI;
//   public currentBestDoodler: DoodlerAI;

//   constructor(
//     private context: CanvasRenderingContext2D,
//     private numDoodlers: number,
//     public tiles: Tile[],
//     public gen: number = 1
//   ) {
//     for (let i = 0; i < this.numDoodlers; i++) {
//       this.doodlers.push(
//         new DoodlerAI(
//           context,
//           [new Image(), new Image()],
//           46,
//           46,
//           context.canvas.width / 2 - 20,
//           context.canvas.height - 80,
//           0,
//           0,
//           context.canvas.height - 80,
//           { gravity: 0.33, drag: 0.3 },
//           -12.5,
//           Direction.RIGHT,
//           this.tiles
//         )
//       );
//     }
//     this.currentBestDoodler = this.doodlers[0];
//     this.bestDoodler = this.currentBestDoodler;
//   }

//   public update(): void {
//     this.doodlers.forEach((doodler) => {
//       doodler.update();
//     });
//   }

//   public draw(): void {
//     this.doodlers.forEach((doodler) => {
//       doodler.draw();
//     });
//   }

//   public isDone(): boolean {
//     return this.doodlers.every((doodler) => {
//       return doodler.dead;
//     });
//   }

//   public newGeneration(tiles: Tile[]): void {
//     this.naturalSelection();
//     this.doodlers.forEach((doodler) => {
//       doodler.tiles = tiles;
//       doodler.dead = false;
//       doodler.y = this.context.canvas.height - 80;
//       doodler.x = this.context.canvas.width / 2 - 20;
//       doodler.dx = 0;
//       doodler.dy = 0;
//       doodler.fitness = 0;
//       doodler.score = 0;
//     });
//   }

//   public getBestDoodler(): DoodlerAI {
//     this.currentBestDoodler = this.doodlers.reduce((prev, curr) => {
//       return prev.score > curr.score ? prev : curr;
//     });
//     return this.currentBestDoodler;
//   }

//   public naturalSelection(): void {
//     this.gen++;
//     if (this.bestDoodler.score < this.currentBestDoodler.score) {
//       this.bestDoodler = this.currentBestDoodler;
//     }
//     const newDoodlers: DoodlerAI[] = [];
//     newDoodlers.push(this.bestDoodler.clone());
//     for (let i = 1; i < this.numDoodlers; i++) {
//       const parent: DoodlerAI = this.pickParent();
//       const child: DoodlerAI = parent.clone();
//       child.mutate();
//       newDoodlers.push(child);
//     }
//     this.doodlers = newDoodlers;
//   }

//   private pickParent(): DoodlerAI {
//     let fitnessSum: number = 0;
//     this.doodlers.forEach((doodler) => {
//       fitnessSum += doodler.fitness;
//     });
//     const rand: number = Math.random() * fitnessSum;
//     let parent: DoodlerAI = this.doodlers[0];
//     for (let i = 0; i < this.doodlers.length; i++) {
//       if (rand > fitnessSum) {
//         parent = this.doodlers[i];
//         break;
//       }
//       fitnessSum -= this.doodlers[i].fitness;
//     }
//     return parent;
//   }
// }
