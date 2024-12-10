import run from "aocrunner"
import Matrix, { parseNumberMatrix } from "../utils/matrix.js"
import { Position } from "../utils/position.js"
import { BetterSet } from "../utils/index.js"

const delimiter = ""

const part1Example = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`
const part1ExampleSolution = 36
const part1 = (rawInput: string) => {
  const input = parseNumberMatrix(rawInput, delimiter)

  const matrix = new Matrix(input)

  const starts = matrix.findAll(0)

  let sum = 0

  for (const start of starts) {
    const visited = new BetterSet<Position>()
    const queue = Array<Position>()
    let reached = 0

    queue.push(start)

    while (queue.length > 0) {
      const p = queue.shift()!
      if (visited.has(p)) {
        continue
      }
      // console.log(p.toString())
      visited.add(p)

      const adj = matrix.adjacent(p)
      // console.log("adj", adj)
      const fil = adj.filter((x) => matrix.valueAt(x) === matrix.valueAt(p) + 1)
      // console.log("found", p, matrix.valueAt(p), fil)
      queue.push(...fil)
      if (matrix.valueAt(p) === 9) {
        reached += 1
      }
    }
    sum += reached
  }

  return sum
}

const part2Example = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`
const part2ExampleSolution = 81
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = parseNumberMatrix(rawInput, delimiter)

  const matrix = new Matrix(input)
  const starts = matrix.findAll((x) => x === 0)

  let sum = 0

  for (const start of starts) {
    const queue = Array<Position>()
    let reached = 0

    queue.push(start)

    while (queue.length > 0) {
      const p = queue.shift()!

      const adj = matrix.adjacent(p)
      const fil = adj.filter((x) => matrix.valueAt(x) === matrix.valueAt(p) + 1)
      queue.push(...fil)
      if (matrix.valueAt(p) === 9) {
        reached += 1
      }
    }
    sum += reached
  }

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
