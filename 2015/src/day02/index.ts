import run from "aocrunner"
import { parseCharMatrix, parseNumberMatrix } from "../utils/matrix.js"

const delimiter = "x"

const part1Example = `1x1x10`
const part1ExampleSolution = 43
const part1 = (rawInput: string) => {
  const input = parseNumberMatrix(rawInput, delimiter)

  let a = input.map(([l, w, h]) => {
    let s1 = l * w
    let s2 = w * h
    let s3 = h * l
    return 2 * s1 + 2 * s2 + 2 * s3 + Math.min(s1, s2, s3)
  })
  return a.reduce((a, b) => a + b, 0)
}

const part2Example = `2x3x4`
const part2ExampleSolution = 34
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = parseNumberMatrix(rawInput, delimiter)

  let a = input.map((box) => {
    let [l, w, h] = box
    let s1 = l + l + w + w
    let s2 = w + w + h + h
    let s3 = h + h + l + l
    let vol = l * w * h
    return Math.min(s1, s2, s3) + vol
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
