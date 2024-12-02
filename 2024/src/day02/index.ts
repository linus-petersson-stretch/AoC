import run from "aocrunner"
import { parseNumberMatrix } from "../utils/matrix.js"

const delimiter = " "

const part1Example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
const part1ExampleSolution = 2

const part1 = (rawInput: string) => {
  const rows = parseNumberMatrix(rawInput, delimiter)

  const safeRows = rows.map((row) => {
    let safe = true
    let order = row[0] - row[1] > 0 ? "desc" : "asc"
    for (let i = 0; i < row.length; i++) {
      if (order === "asc" && row[i] - row[i + 1] >= 0) {
        safe = false
        break
      }
      if (order === "desc" && row[i] - row[i + 1] <= 0) {
        safe = false
        break
      }
      if (Math.abs(row[i] - row[i + 1]) > 3) {
        safe = false
        break
      }
    }
    return safe
  })

  return safeRows.filter((row) => row).length
}

const part2Example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
const part2ExampleSolution = 4
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const rows = parseNumberMatrix(rawInput, delimiter)

  const isSafe = (row: number[]) => {
    let safe = true
    let order = row[0] - row[1] > 0 ? "desc" : "asc"

    for (let i = 0; i < row.length; i++) {
      if (order === "asc" && row[i] - row[i + 1] >= 0) {
        safe = false
        break
      }
      if (order === "desc" && row[i] - row[i + 1] <= 0) {
        safe = false
        break
      }
      if (Math.abs(row[i] - row[i + 1]) > 3) {
        safe = false
        break
      }
    }
    return safe
  }

  const safeRows = rows.map((row) => {
    let safe = false
    const orgRow = [...row]

    for (let i = 0; i < row.length; i++) {
      if (isSafe(row)) {
        safe = true
        break
      } else if (isSafe([...orgRow.slice(0, i), ...orgRow.slice(i + 1)])) {
        safe = true
        break
      }
    }
    return safe
  })

  return safeRows.filter((row) => row).length
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
