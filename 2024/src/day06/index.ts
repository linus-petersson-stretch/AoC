import run from "aocrunner"
import Matrix, {
  parseCharMatrix,
  parseNumberMatrix,
  valueAtDirection,
} from "../utils/matrix.js"
import { Direction, Position, turnRight } from "../utils/position.js"

const delimiter = ""

const part1Example = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
const part1ExampleSolution = 41
const part1 = (rawInput: string) => {
  const input = new Matrix(parseCharMatrix(rawInput, delimiter))

  const start = input.find("^")!

  let direction = Direction.North
  let steps = new Set<string>()
  let pos = start
  while (true) {
    steps.add(pos.toString())
    pos = pos.move(direction)
    if (!input.contains(pos)) {
      break
    }
    if (input.valueAtDirection(pos, direction) === "#") {
      direction = turnRight(direction)
    }
  }

  return steps.size
}

const part2Example = part1Example
const part2ExampleSolution = 6
const runPart2Tests = true

let a = `turning 3 35,25
turning 0 34,25
turning 1 34,24
turning 2 35,24`

const part2 = (rawInput: string) => {
  const input = new Matrix(parseCharMatrix(rawInput, delimiter))

  const start = input.find("^")!

  let direction = Direction.North
  let steps = new Set<string>()
  let pos = start
  while (true) {
    steps.add(pos.toString())
    pos = pos.move(direction)
    if (!input.contains(pos)) {
      break
    }
    if (input.valueAtDirection(pos, direction) === "#") {
      direction = turnRight(direction)
    }
  }

  const key = (p: Position, d: Direction) => `${p.x},${p.y},${d}`

  const obs = new Set<string>()

  const fixedObstacles = input.findAll((a) => a === "#")

  for (let step of steps) {
    let [x, y] = step.split(",").map(Number)
    let pos = new Position(x, y)

    let visited = new Set<string>()

    let allObstacles = new Set<string>([
      ...fixedObstacles.map((x) => x.toString()),
      pos.toString(),
    ])

    let direction = Direction.North
    let p = start

    while (true) {
      if (!input.contains(p)) {
        break
      }
      if (visited.has(key(p, direction))) {
        obs.add(step)
        break
      }
      visited.add(key(p, direction))
      let nextStep = p.move(direction)

      if (allObstacles.has(nextStep.toString())) {
        direction = turnRight(direction)
      } else {
        p = nextStep
      }
    }
  }

  return obs.size
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
