import run from "aocrunner"
import Matrix, { parseNumberMatrix } from "../utils/matrix.js"
import { memo } from "../utils/index.js"

const delimiter = " "

const part1Example = `125 17`
const part1ExampleSolution = 55312
const part1 = (rawInput: string, blinks: number = 25) => {
  const input = new Matrix(parseNumberMatrix(rawInput, delimiter)).row(0)

  let i = 0
  let a = input
  while (i < blinks) {
    a = a.flatMap((x) => {
      let xs = x.toString()
      if (x === 0) {
        return 1
      } else if (xs.length % 2 === 0) {
        return [
          Number(xs.slice(0, xs.length / 2)),
          Number(xs.slice(xs.length / 2)),
        ]
      } else {
        return x * 2024
      }
    })
    i++
  }

  return a.length
}

const part2Example = part1Example
const part2ExampleSolution = 65601038650482
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = new Matrix(parseNumberMatrix(rawInput, delimiter)).row(0)

  let blinks = 75
  let a = input

  const count = memo((x: number, d: number): number => {
    if (d === 0) {
      return 1
    }
    let s
    let xs = x.toString()
    if (x === 0) {
      s = count(1, --d)
    } else if (xs.length % 2 === 0) {
      let d2 = --d
      s =
        count(Number(xs.slice(0, xs.length / 2)), d2) +
        count(Number(xs.slice(xs.length / 2)), d2)
    } else {
      s = count(x * 2024, --d)
    }
    return s
  })

  a = a.map((x) => {
    return count(x, blinks)
  })

  return a.reduce((a, b) => a + b, 0)
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
