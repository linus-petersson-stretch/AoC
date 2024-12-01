import { Position } from "./position"

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

export const column = (matrix: number[][], col: number) => {
  return matrix.map((row) => row[col])
}

export const row = (matrix: number[][], row: number) => {
  return matrix[row]
}

export const valueAt = (matrix: number[][], position: Position) => {
  return matrix[position.y][position.x]
}

export const print = (matrix: number[][]) => {
  matrix.forEach((row) => console.log(row.join(" ")))
}

export const find = (matrix: number[][], value: number | string) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === value) {
        return { x, y }
      }
    }
  }
}

export const findInRow = (matrix: number[][], row: number, value: number | string) => {
  for (let x = 0; x < matrix[row].length; x++) {
    if (matrix[row][x] === value) {
      return { x, y: row }
    }
  }
}

export const findInColumn = (matrix: number[][], column: number, value: number | string) => {
  for (let y = 0; y < matrix.length; y++) {
    if (matrix[y][column] === value) {
      return { x: column, y }
    }
  }
}

export const findBy = (matrix: number[][], predicate: (value: number) => boolean) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (predicate(matrix[y][x])) {
        return { x, y }
      }
    }
  }
}