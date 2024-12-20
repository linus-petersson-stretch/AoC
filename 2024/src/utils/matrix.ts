import {
  Diagonals,
  Direction,
  DirectionAdvanced,
  move,
  IPosition,
  Position,
} from "./position.js"

export const parseNumberMatrix = (
  rawInput: string,
  separator: string = " ",
) => {
  return rawInput
    .split("\n")
    .map((line) => line.split(separator).map((n) => parseInt(n)))
}

export const parseCharMatrix = (rawInput: string, separator: string = " ") => {
  return rawInput.split("\n").map((line) => line.split(separator))
}

export const rows = <T>(matrix: T[][]) => {
  return matrix
}

export const columns = <T>(matrix: T[][]) => {
  return matrix[0].map((_, i) => column(matrix, i))
}

export const diagonals = <T>(matrix: T[][]) => {
  const diags: T[][] = []
  const height = matrix.length
  const width = matrix[0].length
  for (let i = 0; i < height + width - 1; i++) {
    const diag: T[] = []
    for (let j = 0; j < height; j++) {
      const x = i - j
      if (x >= 0 && x < width) {
        diag.push(matrix[j][x])
      }
    }
    diags.push(diag)
  }

  for (let i = 0; i < height + width - 1; i++) {
    const diag: T[] = []
    for (let j = 0; j < height; j++) {
      const x = i - (height - j) + 1
      if (x >= 0 && x < width) {
        diag.push(matrix[j][x])
      }
    }
    diags.push(diag)
  }
  return diags
}

export const column = <T>(matrix: T[][], col: number) => {
  return matrix.map((row) => row[col])
}

export const row = <T>(matrix: T[][], row: number) => {
  return matrix[row]
}

export const valueAt = <T>(matrix: T[][], position: IPosition) => {
  return matrix[position.y]?.[position.x]
}

export const print = <T>(matrix: T[][]) => {
  matrix.forEach((row) => console.log(row.join(" ")))
}

export const find = <T>(matrix: T[][], value: T) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === value) {
        return Position.from({ x, y })
      }
    }
  }
}

export const findInRow = <T>(matrix: T[][], row: number, value: T) => {
  for (let x = 0; x < matrix[row].length; x++) {
    if (matrix[row][x] === value) {
      return Position.from({ x, y: row })
    }
  }
}

export const findInColumn = <T>(matrix: T[][], column: number, value: T) => {
  for (let y = 0; y < matrix.length; y++) {
    if (matrix[y][column] === value) {
      return Position.from({ x: column, y })
    }
  }
}

export const findBy = <T>(
  matrix: T[][],
  predicate: (value: T) => boolean | T,
) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (predicate(matrix[y][x]) || predicate === matrix[y][x]) {
        return new Position(x, y)
      }
    }
  }
}
export function findAll<T>(matrix: T[][], value: T): Position[]
export function findAll<T>(
  matrix: T[][],
  predicate: (value: T) => boolean,
): Position[] {
  const results = []
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (
        predicate === matrix[y][x] ||
        (typeof predicate === "function" && predicate(matrix[y][x]))
      ) {
        results.push(new Position(x, y))
      }
    }
  }
  return results
}

export const adjacent = (matrix: any[][], pos: IPosition) => {
  return [
    move(pos, Direction.North),
    move(pos, Direction.South),
    move(pos, Direction.East),
    move(pos, Direction.West),
  ].filter((p) => contains(matrix, p))
}

export const contains = <T>(matrix: T[][], pos: Position) => {
  return matrix[pos.y]?.[pos.x] != null
}

export const valueAtDirection = <T>(
  matrix: T[][],
  pos: IPosition,
  dir: DirectionAdvanced,
) => {
  switch (dir) {
    case Direction.North:
      return valueAt(matrix, move(pos, Direction.North))
    case Direction.South:
      return valueAt(matrix, move(pos, Direction.South))
    case Direction.East:
      return valueAt(matrix, move(pos, Direction.East))
    case Direction.West:
      return valueAt(matrix, move(pos, Direction.West))
    case Diagonals.SouthEast:
      return valueAt(matrix, move(move(pos, Direction.South), Direction.East))
    case Diagonals.SouthWest:
      return valueAt(matrix, move(move(pos, Direction.South), Direction.West))
    case Diagonals.NorthEast:
      return valueAt(matrix, move(move(pos, Direction.North), Direction.East))
    case Diagonals.NorthWest:
      return valueAt(matrix, move(move(pos, Direction.North), Direction.West))
  }
}

class Matrix<T> {
  private matrix: T[][]

  constructor(matrix: T[][]) {
    this.matrix = matrix
  }

  rows() {
    return rows(this.matrix)
  }

  columns() {
    return columns(this.matrix)
  }

  diagonals() {
    return diagonals(this.matrix)
  }

  column(col: number) {
    return column(this.matrix, col)
  }

  row(r: number) {
    return row(this.matrix, r)
  }

  valueAt(pos: IPosition) {
    return valueAt(this.matrix, pos)
  }

  print() {
    print(this.matrix)
  }

  find(value: T) {
    return find(this.matrix, value)
  }

  findInRow(row: number, value: T) {
    return findInRow(this.matrix, row, value)
  }

  findInColumn(column: number, value: T) {
    return findInColumn(this.matrix, column, value)
  }

  findBy(predicate: (value: T) => boolean) {
    return findBy(this.matrix, predicate)
  }

  findAll(predicate: T | ((value: T) => boolean)) {
    return findAll(this.matrix, predicate)
  }

  valueAtDirection(pos: IPosition, dir: DirectionAdvanced) {
    return valueAtDirection(this.matrix, pos, dir)
  }

  contains(pos: Position) {
    return contains(this.matrix, pos)
  }

  adjacent(pos: IPosition) {
    return adjacent(this.matrix, pos)
  }

  static fillNew<T>(height: number, width: number, value: T) {
    const newMatrix = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => value),
    )
    return new Matrix(newMatrix)
  }
}

export default Matrix
