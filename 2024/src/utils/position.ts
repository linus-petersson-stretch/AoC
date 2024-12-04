export type Position = { x: number; y: number }
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

export const position = (x: number, y: number): Position => ({ x, y })

export const move = (
  pos: Position,
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
