import {
  Diagonals,
  Direction,
  DirectionAdvanced,
  move,
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

export const column = <T>(matrix: T[][], col: number) => {
  return matrix.map((row) => row[col])
}

export const row = <T>(matrix: T[][], row: number) => {
  return matrix[row]
}

export const valueAt = <T>(matrix: T[][], position: Position) => {
  return matrix[position.y]?.[position.x]
}

export const print = <T>(matrix: T[][]) => {
  matrix.forEach((row) => console.log(row.join(" ")))
}

export const find = <T>(matrix: T[][], value: T) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === value) {
        return { x, y }
      }
    }
  }
}

export const findInRow = <T>(matrix: T[][], row: number, value: T) => {
  for (let x = 0; x < matrix[row].length; x++) {
    if (matrix[row][x] === value) {
      return { x, y: row }
    }
  }
}

export const findInColumn = <T>(matrix: T[][], column: number, value: T) => {
  for (let y = 0; y < matrix.length; y++) {
    if (matrix[y][column] === value) {
      return { x: column, y }
    }
  }
}

export const findBy = <T>(matrix: T[][], predicate: (value: T) => boolean) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (predicate(matrix[y][x])) {
        return { x, y }
      }
    }
  }
}

export const findAll = <T>(matrix: T[][], predicate: (value: T) => boolean) => {
  const results = []
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (predicate(matrix[y][x])) {
        results.push({ x, y })
      }
    }
  }
  return results
}

export const valueAtDirection = <T>(
  matrix: T[][],
  pos: Position,
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

  column(col: number) {
    return column(this.matrix, col)
  }

  row(r: number) {
    return row(this.matrix, r)
  }

  valueAt(pos: Position) {
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

  findAll(predicate: (value: T) => boolean) {
    return findAll(this.matrix, predicate)
  }

  valueAtDirection(pos: Position, dir: DirectionAdvanced) {
    return valueAtDirection(this.matrix, pos, dir)
  }
}

export default Matrix
