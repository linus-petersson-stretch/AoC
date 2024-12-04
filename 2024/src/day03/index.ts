import run from "aocrunner"
import { parseInput } from "../utils/parse.js"

const part1Example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
const part1ExampleSolution = 161
const part1 = (rawInput: string) => {
  const multiplications = parseInput(rawInput).match(/mul\(\d*,\d*\)/g)
  let sum = 0
  multiplications?.forEach((multiplication) => {
    const [a, b] = multiplication.match(/\d+/g)!.map(Number)
    sum += a * b
  })

  return sum
}

const part2Example = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
const part2ExampleSolution = 48
const runPart2Tests = true

const part2 = (rawInput: string) => {
  //remove newlines
  const input = parseInput(rawInput).replace(/\n/g, "")

  //remove everything after a don't() and before a do()"
  const cleanedInput = input.replace(/don't\(\).*?do\(\)/g, "")

  const multiplications = cleanedInput.match(/mul\(\d*,\d*\)/g)

  let sum = 0
  multiplications?.forEach((multiplication) => {
    const [a, b] = multiplication.match(/\d+/g)!.map(Number)
    sum += a * b
  })

  return sum
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
