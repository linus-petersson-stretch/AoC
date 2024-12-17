import run from "aocrunner"
import Matrix, { parseCharMatrix, parseNumberMatrix } from "../utils/matrix.js"
import { BetterSet } from "../utils/index.js"
import { Direction, Position } from "../utils/position.js"

const delimiter = ""

const part1Example = `^>v<`
const part1ExampleSolution = 4
const part1 = (rawInput: string) => {
  const input = new Matrix(parseCharMatrix(rawInput, delimiter)) as Matrix<
    "<" | ">" | "^" | "v"
  >

  let pos = new Position(0, 0)

  let visited = new BetterSet()
  visited.add(pos)

  let directions = {
    "^": Direction.North,
    ">": Direction.East,
    v: Direction.South,
    "<": Direction.West,
  }

  input.row(0).forEach((c) => {
    pos = pos.move(directions[c])
    visited.add(pos)
  })

  return visited.size()
}

const part2Example = `^v^v^v^v^v`
const part2ExampleSolution = 11
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = new Matrix(parseCharMatrix(rawInput, delimiter)) as Matrix<
    "<" | ">" | "^" | "v"
  >

  let santapos = new Position(0, 0)
  let robosantapos = new Position(0, 0)

  let visited = new BetterSet()
  visited.add(santapos)
  visited.add(robosantapos)

  let directions = {
    "^": Direction.North,
    ">": Direction.East,
    v: Direction.South,
    "<": Direction.West,
  }

  input.row(0).forEach((c, i) => {
    if (i % 2 === 0) {
      santapos = santapos.move(directions[c])
      visited.add(santapos)
    } else {
      robosantapos = robosantapos.move(directions[c])
      visited.add(robosantapos)
    }
  })

  return visited.size()
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
