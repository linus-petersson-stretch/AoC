import run from "aocrunner"
import { parseCharMatrix, parseNumberMatrix } from "../utils/matrix.js"

const delimiter = ""

const part1Example = ``
const part1ExampleSolution = 0
const part1 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  let floor = 0

  input[0].forEach((c) => {
    if (c === "(") {
      floor++
    } else if (c === ")") {
      floor--
    }
  })

  return floor
}

const part2Example = ``
const part2ExampleSolution = 0
const runPart2Tests = false

const part2 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  let floor = 0
  let pos = 0

  for (let i = 0; i < input[0].length; i++) {
    pos++
    if (input[0][i] === "(") {
      floor++
    } else if (input[0][i] === ")") {
      floor--
    }

    if (floor < 0) {
      break
    }
  }

  return pos
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
