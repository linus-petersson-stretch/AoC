import run from "aocrunner"
import { parseCharMatrix, parseNumberMatrix } from "../utils/matrix.js"

const delimiter = ":"

const part1Example = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
const part1ExampleSolution = 3749

const generateCombinations = <T>(n: number, arr: T[]) => {
  const x: T[][] = []
  const generate = (prefix: T[], length: number) => {
    if (length === 0) {
      x.push(prefix)
      return
    }
    for (let i = 0; i < arr.length; i++) {
      generate([...prefix, arr[i]], length - 1)
    }
  }
  generate([], n - 1)
  return x
}

const part1 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  const a = input.map((row) => {
    const [valString, numString] = row
    const val = Number(valString)
    const nums = numString.trim().split(" ").map(Number)

    const combos = generateCombinations(nums.length, ["+", "*"])

    const isTrue = combos.some((combo) => {
      let sum = nums[0]
      for (let i = 1; i < nums.length; i++) {
        if (combo[i - 1] === "+") {
          sum += nums[i]
        } else if (combo[i - 1] === "*") {
          sum *= nums[i]
        }
      }

      if (sum === val) {
        return true
      }
      return false
    })

    return isTrue ? val : 0
  })

  return a.reduce((acc, curr) => acc + curr, 0)
}

const part2Example = part1Example
const part2ExampleSolution = 11387
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  const a = input.map((row) => {
    const [valString, numString] = row
    const val = Number(valString)
    const nums = numString.trim().split(" ").map(Number)

    const combos = generateCombinations(nums.length, ["*", "+", "||"])

    const isTrue = combos.some((combo) => {
      let sum = nums[0]
      for (let i = 1; i < nums.length; i++) {
        if (combo[i - 1] === "+") {
          sum += nums[i]
        } else if (combo[i - 1] === "*") {
          sum *= nums[i]
        } else if (combo[i - 1] === "||") {
          sum = Number(String(sum) + String(nums[i]))
        }
        if (sum >= val) {
          break
        }
      }

      if (sum === val) {
        return true
      }
      return false
    })

    return isTrue ? val : 0
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
