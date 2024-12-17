import run from "aocrunner"
import Matrix, { parseCharMatrix, parseNumberMatrix } from "../utils/matrix.js"
import { BetterSet } from "../utils/index.js"
import { Diagonals, Direction, Position } from "../utils/position.js"

const delimiter = ""

const part1Example = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`
const part1ExampleSolution = 772
const part1 = (rawInput: string) => {
  const input = new Matrix(parseCharMatrix(rawInput, delimiter))

  const visited = new BetterSet()
  const regions = new Map<string, BetterSet<Position>[]>()

  let queue = Array<Position>()

  for (let pos of input.findAll(() => true)) {
    if (visited.has(pos)) {
      continue
    }
    const v = new BetterSet<Position>()
    const plant = input.valueAt(pos)
    queue.push(pos)
    while (queue.length > 0) {
      const p = queue.shift()!
      if (v.has(p)) {
        continue
      }
      v.add(p)
      visited.add(p)

      const adj = input.adjacent(p)
      const fil = adj.filter((x) => input.valueAt(x) === input.valueAt(p))
      queue.push(...fil)
    }
    let r = regions.get(plant)
    if (!r) {
      r = [v]
    } else {
      r.push(v)
    }
    regions.set(plant, r)
  }

  let a = [...regions.entries()].flatMap(([k, v]) => {
    return v.map((x) => {
      let area = x.size()
      return (
        x
          .values()
          .map((y) => {
            let p = Position.fromKey(y)

            return (
              4 - input.adjacent(p).filter((x) => input.valueAt(x) == k).length
            )
          })
          .reduce((a, b) => a + b, 0) * area
      )
    })
  })

  return a.reduce((a, b) => a + b, 0)
}

const part2Example = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`
const part2ExampleSolution = 236
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = new Matrix(parseCharMatrix(rawInput, delimiter))

  const visited = new BetterSet()
  const regions = new Map<string, BetterSet<Position>[]>()

  let queue = Array<Position>()

  for (let pos of input.findAll(() => true)) {
    if (visited.has(pos)) {
      continue
    }
    const v = new BetterSet<Position>()
    const plant = input.valueAt(pos)
    queue.push(pos)
    while (queue.length > 0) {
      const p = queue.shift()!
      if (v.has(p)) {
        continue
      }
      v.add(p)
      visited.add(p)

      const adj = input.adjacent(p)
      const fil = adj.filter((x) => input.valueAt(x) === input.valueAt(p))
      queue.push(...fil)
    }
    let r = regions.get(plant)
    if (!r) {
      r = [v]
    } else {
      r.push(v)
    }
    regions.set(plant, r)
  }

  let a = [...regions.entries()].flatMap(([k, v]) => {
    return v.map((x) => {
      let area = x.size()
      return (
        x
          .values()
          .map((y) => {
            let corners = 0
            let p = Position.fromKey(y)

            let north = input.valueAtDirection(p, Direction.North)
            let south = input.valueAtDirection(p, Direction.South)
            let west = input.valueAtDirection(p, Direction.West)
            let east = input.valueAtDirection(p, Direction.East)
            let nw = input.valueAtDirection(p, Diagonals.NorthWest)
            let ne = input.valueAtDirection(p, Diagonals.NorthEast)
            let sw = input.valueAtDirection(p, Diagonals.SouthWest)
            let se = input.valueAtDirection(p, Diagonals.SouthEast)

            const checkOutsideCorner = (
              square: string,
              side1: string,
              side2: string,
            ): void => {
              if (side1 != square && side2 != square) {
                corners++
              }
            }

            const checkInsideCorner = (
              square: string,
              side1: string,
              side2: string,
              diag: string,
            ): void => {
              if (side1 == square && side2 == square && diag != square) {
                corners++
              }
            }

            // Outside corners
            checkOutsideCorner(k, north, west)
            checkOutsideCorner(k, north, east)
            checkOutsideCorner(k, south, west)
            checkOutsideCorner(k, south, east)

            // Inside corners
            checkInsideCorner(k, north, west, nw)
            checkInsideCorner(k, north, east, ne)
            checkInsideCorner(k, south, west, sw)
            checkInsideCorner(k, south, east, se)

            return corners
          })
          .reduce((a, b) => a + b, 0) * area
      )
    })
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
          {
            input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
            expected: 368,
          },
        ]
      : [],
    solution: part2,
  },
  trimTestInputs: true,
})
