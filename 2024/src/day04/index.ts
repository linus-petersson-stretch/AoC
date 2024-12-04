import run from "aocrunner"
import Matrix, { parseCharMatrix } from "../utils/matrix.js"
import { Diagonals, Direction, move } from "../utils/position.js"

const delimiter = ""

const part1Example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`
const part1ExampleSolution = 18

const part1 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  const matrix = new Matrix(input)

  const allX = matrix.findAll((c) => c === "X")

  const allDirections = [
    Direction.East,
    Direction.West,
    Direction.North,
    Direction.South,
    Diagonals.SouthEast,
    Diagonals.SouthWest,
    Diagonals.NorthEast,
    Diagonals.NorthWest,
  ]

  const a = allX.map((x) => {
    const hasMas = allDirections.map((dir) => {
      return (
        matrix.valueAtDirection(x, dir) === "M" &&
        matrix.valueAtDirection(move(x, dir), dir) === "A" &&
        matrix.valueAtDirection(move(x, dir, 2), dir) === "S"
      )
    })

    return hasMas.filter((has) => has).length
  })

  return a.reduce((acc, curr) => acc + curr, 0)
}

const part2Example = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`
const part2ExampleSolution = 9
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  const matrix = new Matrix(input)

  const allA = matrix.findAll((c) => c === "A")

  const a: number[] = allA.map((x) => {
    const se = matrix.valueAtDirection(x, Diagonals.SouthEast)
    const sw = matrix.valueAtDirection(x, Diagonals.SouthWest)
    const ne = matrix.valueAtDirection(x, Diagonals.NorthEast)
    const nw = matrix.valueAtDirection(x, Diagonals.NorthWest)

    if (
      ((nw === "M" && se === "S") || (nw === "S" && se === "M")) &&
      ((sw === "M" && ne === "S") || (sw === "S" && ne === "M"))
    ) {
      return 1
    }
    return 0
  })

  return a.reduce((acc, curr) => acc + curr, 0)
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: part1Example,
        expected: part1ExampleSolution,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: runPart2Tests
      ? [
          {
            input: part2Example,
            expected: part2ExampleSolution,
          },
        ]
      : [],
    solution: part2,
  },
  trimTestInputs: true,
})
