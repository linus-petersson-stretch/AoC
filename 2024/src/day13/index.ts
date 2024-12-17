import run from "aocrunner"
import { parseNumberMatrix } from "../utils/matrix.js"

const delimiter = " "

const part1Example = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

const part1ExampleSolution = 480
const part1 = (rawInput: string) => {
  const machines = rawInput.split("\n\n").map((line) => {
    return line.split("\n").map((l) => {
      const [key, value] = l.split(": ")
      const [x, y] = value
        .split(", ")
        .map((v) => v.split(/\+|=/).map(Number)[1])
      return { key, x, y }
    })
  })

  let a = machines.map((m) => {
    let found = []
    const goalx = m[2].x
    const goaly = m[2].y

    let ax = 0
    let ay = 0
    let bx = 0
    let by = 0
    let i
    let j

    for (i = 1; i <= 100; i++) {
      ax += m[0].x
      ay += m[0].y
      bx = 0
      by = 0
      for (j = 1; j <= 100; j++) {
        bx += m[1].x
        by += m[1].y
        if (ax + bx === goalx && ay + by === goaly) {
          found.push(i * 3 + j)
        }
      }
    }
    return found.length > 0 ? Math.min(...found) : 0
  })

  return a.reduce((a, b) => a + b, 0)
}

const part2Example = part1Example
const part2ExampleSolution = 0
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const machines = rawInput.split("\n\n").map((line) => {
    return line.split("\n").map((l) => {
      const [key, value] = l.split(": ")
      const [x, y] = value
        .split(", ")
        .map((v) => v.split(/\+|=/).map(Number)[1])
      return { key, x, y }
    })
  })

  const solve = (
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    z1: number,
    z2: number,
  ) => {
    let b = x1 * y2 - x2 * y1
    let da = y2 * z1 - x2 * z2
    let db = x1 * z2 - y1 * z1
    if (da % b === 0 && db % b === 0) {
      return 3 * (da / b) + db / b
    } else {
      return 0
    }
  }

  let a = machines.map((m) => {
    return solve(
      m[0].x,
      m[1].x,
      m[0].y,
      m[1].y,
      m[2].x + 10000000000000,
      m[2].y + 10000000000000,
    )
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
