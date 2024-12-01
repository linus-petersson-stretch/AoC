import run from "aocrunner"
import { column, parseNumberMatrix, print, valueAt } from "../utils/matrix.js"
import { Direction, move, position } from "../utils/position.js"

const part1 = (rawInput: string) => {
  const matrix = parseNumberMatrix(rawInput, "   ")

  const firstCol = column(matrix, 0)
  const secondCol = column(matrix, 1)

  firstCol.sort()
  secondCol.sort()

  const diffs = []

  for (let i = 0; i < firstCol.length; i++) {
    diffs.push(Math.abs(secondCol[i] - firstCol[i]))
  }

  return diffs.reduce((acc, curr) => acc + curr, 0)
}


const part2 = (rawInput: string) => {
  const matrix = parseNumberMatrix(rawInput, "   ")

  const firstCol = column(matrix, 0)
  const secondCol = column(matrix, 1)

  const similarities = firstCol.map((a)=> secondCol.filter((b) => a === b).length * a)

  return similarities.reduce((acc, curr) => acc + curr, 0)
}

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
