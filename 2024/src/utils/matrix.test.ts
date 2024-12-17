import { describe, it, expect } from "vitest"
import {
  parseNumberMatrix,
  parseCharMatrix,
  rows,
  columns,
  diagonals,
  column,
  row,
} from "./matrix"

describe("Matrix Utils", () => {
  const numberMatrix = `1 2 3\n4 5 6\n7 8 9`
  const charMatrix = `a b c\nd e f\ng h i`
  const withoutSpaces = `123
456
789`
  const charMatrixNoSpaces = `AAAA
BBCD
BBCC
EEEC`

  it("parseNumberMatrix", () => {
    const result = parseNumberMatrix(numberMatrix)
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  })

  it("parseCharMatrix", () => {
    const result = parseCharMatrix(charMatrix)
    expect(result).toEqual([
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ])
  })

  it("parseNumberMatrix without spaces", () => {
    const result = parseNumberMatrix(withoutSpaces, "")
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  })

  it("parseCharMatrix without spaces", () => {
    const result = parseCharMatrix(charMatrixNoSpaces, "")
    expect(result).toEqual([
      ["A", "A", "A", "A"],
      ["B", "B", "C", "D"],
      ["B", "B", "C", "C"],
      ["E", "E", "E", "C"],
    ])
  })

  it("rows", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const result = rows(matrix)
    expect(result).toEqual(matrix)
  })

  it("columns", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const result = columns(matrix)
    expect(result).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ])
  })

  it.each([
    {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      expected: [
        [1],
        [2, 4],
        [3, 5, 7],
        [6, 8],
        [9],
        [7],
        [4, 8],
        [1, 5, 9],
        [2, 6],
        [3],
      ],
    },
    {
      matrix: [
        [1, 2, 3, 10],
        [4, 5, 6, 11],
        [7, 8, 9, 12],
      ],
      expected: [
        [1],
        [2, 4],
        [3, 5, 7],
        [10, 6, 8],
        [11, 9],
        [12],
        [7],
        [4, 8],
        [1, 5, 9],
        [2, 6, 12],
        [3, 11],
        [10],
      ],
    },
  ])("diagonals %#", ({ matrix, expected }) => {
    const result = diagonals(matrix)
    expect(result).toEqual(expected)
  })

  it("column", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const result = column(matrix, 1)
    expect(result).toEqual([2, 5, 8])
  })

  it("row", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const result = row(matrix, 1)
    expect(result).toEqual([4, 5, 6])
  })
})
