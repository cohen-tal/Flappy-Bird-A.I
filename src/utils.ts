import { Tile } from "./d";
import Doodler from "./game/doodler";

//clamps a number between a min and max value
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

// returns a random integer between min (inclusive) and max (exclusive)
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

//detects collision between doodler and platform
export function detectCollision(doodle: Doodler, tile: Tile): boolean {
  return (
    doodle.dy > 0 &&
    doodle.prevY + doodle.getHeight() < tile.y &&
    doodle.y + doodle.getHeight() > tile.y &&
    doodle.y < tile.y + tile.height &&
    doodle.x + doodle.getWidth() > tile.x &&
    doodle.x < tile.x + tile.width
  );
}
