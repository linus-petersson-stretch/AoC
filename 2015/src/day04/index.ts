import run from "aocrunner"
import { parseCharMatrix, parseNumberMatrix } from "../utils/matrix.js"
import { createHash } from "crypto"

const delimiter = ""

const part1Example = `abcdef`
const part1ExampleSolution = 609043
const part1 = (rawInput: string) => {
  const input = rawInput.trim()

  const md5 = (str: string) => createHash("md5").update(str).digest("hex")

  let i = 0
  while (true) {
    if (md5(input + i).startsWith("00000")) {
      return i
    }
    i++
  }
}

const part2Example = ``
const part2ExampleSolution = 0
const runPart2Tests = false

const part2 = (rawInput: string) => {
  const input = rawInput.trim()

  const md5 = (str: string) => createHash("md5").update(str).digest("hex")

  let i = 0
  while (true) {
    if (md5(input + i).startsWith("000000")) {
      return i
    }
    i++
  }
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
