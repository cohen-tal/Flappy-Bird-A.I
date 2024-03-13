import { Vector } from "./d";

//clamps a number between a min and max value
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

// returns a random integer between min (inclusive) and max (exclusive)
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function mutateVector(
  vector: number[],
  mutationRate: number = 0.1
): number[] {
  return vector.map((value) => {
    if (Math.random() < mutationRate) {
      return value + (Math.random() * 2 - 1) / 5;
    } else {
      return value;
    }
  });
}

export function mutateMatrix(
  matrix: number[][],
  mutationRate: number = 0.1
): number[][] {
  return matrix.map((vector) => mutateVector(vector, mutationRate));
}

export function crossover(
  parent1: number[][],
  parent2: number[][]
): number[][] {
  return parent1.map((vector, i) => {
    return vector.map((value, j) => {
      return Math.random() < 0.5 ? value : parent2[i][j];
    });
  });
}

export function VectorDistance(a: Vector, b: Vector): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function verticalDistance(a: Vector, b: Vector): number {
  const verticalDistance: number = a.y - b.y;
  return Math.max(verticalDistance, 1);
}

export function hideElements(
  elements: HTMLCollectionOf<Element> | HTMLElement[]
): void {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("hidden");
  }
}

export function showElements(
  elements: HTMLCollectionOf<Element> | HTMLElement[]
): void {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
}
