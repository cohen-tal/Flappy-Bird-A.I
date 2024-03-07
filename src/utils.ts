//clamps a number between a min and max value
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

// returns a random integer between min (inclusive) and max (exclusive)
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
