import run from "aocrunner"
import { parseNumberMatrix } from "../utils/matrix.js"

const delimiter = " "

const part1Example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
const part1ExampleSolution = 143
const part1 = (rawInput: string) => {
  const [rules, pageNumbers] = rawInput.split("\n\n")

  const rulesMatrix = parseNumberMatrix(rules, "|")

  const updates = parseNumberMatrix(pageNumbers, ",")

  let a = updates.map((update) => {
    for (let rule of rulesMatrix) {
      const ix1 = update.findIndex((u) => u === rule[0])
      const ix2 = update.findIndex((u) => u === rule[1])
      if (ix1 !== -1 && ix2 !== -1 && ix1 > ix2) {
        return 0
      }
    }
    return update[Math.floor(update.length / 2)]
  })

  return a.reduce((acc, curr) => acc + curr, 0)
}

const part2Example = part1Example
const part2ExampleSolution = 123
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const [rules, pageNumbers] = rawInput.split("\n\n")

  const rulesMatrix = parseNumberMatrix(rules, "|")

  const updates = parseNumberMatrix(pageNumbers, ",")

  let a = updates
    .filter((update) => {
      for (let rule of rulesMatrix) {
        const ix1 = update.findIndex((u) => u === rule[0])
        const ix2 = update.findIndex((u) => u === rule[1])
        if (ix1 !== -1 && ix2 !== -1 && ix1 > ix2) {
          return true
        }
      }
      return false
    })
    .map((update) => {
      return update.sort((a, b) => {
        const rule = rulesMatrix.find((r) => r[0] === a && r[1] === b)
        if (rule) {
          return -1
        }

        return 1
      })
    })
    .map((update) => update[Math.floor(update.length / 2)])

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
