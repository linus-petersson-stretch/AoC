export interface IPosition {
  x: number
  y: number
}
export enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

export enum Diagonals {
  NorthEast = 4,
  SouthEast = 5,
  SouthWest = 6,
  NorthWest = 7,
}

export type DirectionAdvanced = Direction | Diagonals

export const position = (x: number, y: number): Position =>
  Position.from({ x, y })

export const move = (
  pos: IPosition,
  direction: DirectionAdvanced,
  distance: number = 1,
) => {
  switch (direction) {
    case Direction.North:
      return position(pos.x, pos.y - distance)
    case Direction.South:
      return position(pos.x, pos.y + distance)
    case Direction.East:
      return position(pos.x + distance, pos.y)
    case Direction.West:
      return position(pos.x - distance, pos.y)
    case Diagonals.NorthEast:
      return position(pos.x + distance, pos.y - distance)
    case Diagonals.SouthEast:
      return position(pos.x + distance, pos.y + distance)
    case Diagonals.SouthWest:
      return position(pos.x - distance, pos.y + distance)
    case Diagonals.NorthWest:
      return position(pos.x - distance, pos.y - distance)
  }
}

export class Position {
  public x = 0
  public y = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static from(pos: IPosition) {
    return new Position(pos.x, pos.y)
  }

  move(direction: DirectionAdvanced, distance: number = 1) {
    return Position.from(move(this, direction, distance))
  }

  toString() {
    return `${this.x},${this.y}`
  }

  equals(pos: IPosition) {
    return this.x === pos.x && this.y === pos.y
  }
}

export const turnRight = (dir: Direction) => {
  return (dir + 1) % 4
}
