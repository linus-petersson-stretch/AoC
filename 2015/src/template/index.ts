import run from "aocrunner"
import { parseNumberMatrix } from "../utils/matrix.js"

const delimiter = ' '

const part1Example = ``
const part1ExampleSolution = 0
const part1 = (rawInput: string) => {
  const input = parseNumberMatrix(rawInput, delimiter)

  return
}

const part2Example = ``
const part2ExampleSolution = 0
const runPart2Tests = false

const part2 = (rawInput: string) => {
  const input = parseNumberMatrix(rawInput, delimiter)

  return
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
    tests: runPart2Tests ? [
      {
        input: part2Example,
        expected: part2ExampleSolution,
      },
    ] : [],
    solution: part2,
  },
  trimTestInputs: true,
})
