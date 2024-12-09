import run from "aocrunner"
import Matrix, { parseCharMatrix } from "../utils/matrix.js"
import { Position } from "../utils/position.js"

const delimiter = ""

const part1Example = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`
const part1ExampleSolution = 14
const part1 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  const matrix = new Matrix(input)

  const allChars = matrix.findAll((c) => c !== ".")

  const gs = Object.groupBy(allChars, (c) => matrix.valueAt(c))

  const antiNodes = new Set<string>()

  Object.entries(gs).forEach(([k, v]) => {
    if (!v) return
    for (let i = 0; i < v.length; i++) {
      for (let j = i + 1; j < v.length; j++) {
        const a = v[i]
        const b = v[j]

        const dx = a.x - b.x
        const dy = a.y - b.y

        const antiNodeA = new Position(a.x + dx, a.y + dy)
        const antiNodeB = new Position(b.x - dx, b.y - dy)

        if (matrix.contains(antiNodeA)) {
          antiNodes.add(antiNodeA.toString())
        }
        if (matrix.contains(antiNodeB)) {
          antiNodes.add(antiNodeB.toString())
        }
      }
    }
  })

  return antiNodes.size
}

const part2Example = part1Example
const part2ExampleSolution = 34
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  const matrix = new Matrix(input)

  const allChars = matrix.findAll((c) => c !== ".")

  const gs = Object.groupBy(allChars, (c) => matrix.valueAt(c))

  const antiNodes = new Set<string>()

  Object.entries(gs).forEach(([k, v]) => {
    if (!v) return
    for (let i = 0; i < v.length; i++) {
      for (let j = i + 1; j < v.length; j++) {
        const a = v[i]
        const b = v[j]

        antiNodes.add(a.toString())
        antiNodes.add(b.toString())

        const dx = a.x - b.x
        const dy = a.y - b.y

        let antiNodeA = new Position(a.x + dx, a.y + dy)

        while (matrix.contains(antiNodeA)) {
          antiNodes.add(antiNodeA.toString())
          antiNodeA = new Position(antiNodeA.x + dx, antiNodeA.y + dy)
        }

        let antiNodeB = new Position(b.x - dx, b.y - dy)

        while (matrix.contains(antiNodeB)) {
          antiNodes.add(antiNodeB.toString())
          antiNodeB = new Position(antiNodeB.x - dx, antiNodeB.y - dy)
        }
      }
    }
  })

  return antiNodes.size
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
          {
            input: `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`,
            expected: 9,
          },
        ]
      : [],
    solution: part2,
  },
  trimTestInputs: true,
})
