export type Position = { x: number, y: number };
export enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3
}

export const position = (x: number, y: number): Position => ({ x, y });

export const move = (pos: Position, direction: Direction, distance: number = 1) => {
  switch (direction) {
    case Direction.North:
      return position(pos.x, pos.y - distance);
    case Direction.South:
      return position(pos.x, pos.y + distance);
    case Direction.East:
      return position(pos.x + distance, pos.y);
    case Direction.West:
      return position(pos.x - distance, pos.y);
  }
}