import run from "aocrunner"
import Matrix, { parseCharMatrix, parseNumberMatrix } from "../utils/matrix.js"
import { Direction, Position } from "../utils/position.js"

const delimiter = " "

const part1Example = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`
const part1ExampleSolution = 12
const part1 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  let xMax = 101
  let yMax = 103

  let a = input.map((line) => {
    const [p, v] = line
    const [px, py] = p.replace("p=", "").split(",").map(Number)
    const [vx, vy] = v.replace("v=", "").split(",").map(Number)
    let pos = new Position(px, py)

    return pos.warpRelative(vx * 100, vy * 100, xMax, yMax)
  })

  let q1: Position[] = []
  let q2: Position[] = []
  let q3: Position[] = []
  let q4: Position[] = []

  a.forEach((p) => {
    if (p.x < Math.floor(xMax / 2) && p.y < Math.floor(yMax / 2)) {
      q1.push(p)
    } else if (p.x > Math.floor(xMax / 2) && p.y < Math.floor(yMax / 2)) {
      q2.push(p)
    } else if (p.x < Math.floor(xMax / 2) && p.y > Math.floor(yMax / 2)) {
      q3.push(p)
    } else if (p.x > Math.floor(xMax / 2) && p.y > Math.floor(yMax / 2)) {
      q4.push(p)
    }
  })

  return [q1, q2, q3, q4].map((q) => q.length).reduce((a, b) => a * b)
}

const part2Example = part1Example
const part2ExampleSolution = 0
const runPart2Tests = false

const part2 = (rawInput: string) => {
  const input = parseCharMatrix(rawInput, delimiter)

  let xMax = 101
  let yMax = 103

  let a: [Position, number, number][] = input.map((line) => {
    const [p, v] = line
    const [px, py] = p.replace("p=", "").split(",").map(Number)
    const [vx, vy] = v.replace("v=", "").split(",").map(Number)
    let pos = new Position(px, py)

    return [pos, vx, vy]
  })

  let i = 0
  let matrix: Matrix<string>
  while (true) {
    i++
    matrix = Matrix.fillNew(yMax, xMax, ".")

    a = a.map(([p, vx, vy]) => {
      let newP = p.warpRelative(vx, vy, xMax, yMax)
      matrix.row(newP.y)[newP.x] = "#"

      return [newP, vx, vy]
    })

    let symmetric = matrix.rows().find((row) => {
      return row.join("").match(/########/g)
    })

    if (symmetric) {
      break
    }
  }

  matrix.print()

  return i
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
