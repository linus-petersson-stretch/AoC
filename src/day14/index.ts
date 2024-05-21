import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const getString = (grid: Map<string, string>) => {
  let s = ""
  let r = 0
  grid.forEach((val, key) => {
    const [row, col] = key.split(",").map((v) => parseInt(v))
    if (row > r) {
      r++
      s += "\n"
    }
    s += val
  })
  s += "\n"
  return s
}

const print = (grid: Map<string, string>) => {
  console.log(getString(grid))
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const grid = new Map<string, string>()

  const rows = input.split("\n")

  rows.forEach((r, row) => {
    const cols = r.split("")
    cols.forEach((v, col) => {
      grid.set(`${row},${col}`, v)
    })
  })

  const getVal = (row: number, col: number) => {
    return grid.get(`${row},${col}`)
  }

  // print(grid)

  grid.forEach((val, key) => {
    const [row, col] = key.split(",").map((v) => parseInt(v))
    if (val === "O") {
      let up = getVal(row - 1, col)
      let r = row - 1
      while (up && up === ".") {
        r--
        up = getVal(r, col)
      }
      grid.set(`${row},${col}`, ".")
      grid.set(`${r + 1},${col}`, "O")
    }
  })
  // print(grid)

  const weights = [...grid.entries()].map(([key, value]) => {
    const [row, col] = key.split(",").map((v) => parseInt(v))
    return value === "O" ? rows.length - row : 0
  })

  return weights.reduce((acc, v) => acc + v, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const grid = new Map<string, string>()

  const rows = input.split("\n")

  rows.forEach((r, row) => {
    const cols = r.split("")
    cols.forEach((v, col) => {
      grid.set(`${row},${col}`, v)
    })
  })

  const getVal = (row: number, col: number) => {
    return grid.get(`${row},${col}`)
  }

  // print(grid)

  function cycle() {
    grid.forEach((val, key) => {
      const [row, col] = key.split(",").map((v) => parseInt(v))
      if (val === "O") {
        let up = getVal(row - 1, col)
        let r = row - 1
        while (up && up === ".") {
          r--
          up = getVal(r, col)
        }
        grid.set(`${row},${col}`, ".")
        grid.set(`${r + 1},${col}`, "O")
      }
    })

    grid.forEach((val, key) => {
      const [row, col] = key.split(",").map((v) => parseInt(v))
      if (val === "O") {
        let west = getVal(row, col - 1)
        let c = col - 1
        while (west && west === ".") {
          c--
          west = getVal(row, c)
        }
        grid.set(`${row},${col}`, ".")
        grid.set(`${row},${c + 1}`, "O")
      }
    })
    ;[...grid.entries()].reverse().forEach(([key, val]) => {
      const [row, col] = key.split(",").map((v) => parseInt(v))
      if (val === "O") {
        let south = getVal(row + 1, col)
        let r = row + 1
        while (south && south === ".") {
          r++
          south = getVal(r, col)
        }
        grid.set(`${row},${col}`, ".")
        grid.set(`${r - 1},${col}`, "O")
      }
    })
    ;[...grid.entries()].reverse().forEach(([key, val]) => {
      const [row, col] = key.split(",").map((v) => parseInt(v))
      if (val === "O") {
        let east = getVal(row, col + 1)
        let c = col + 1
        while (east && east === ".") {
          c++
          east = getVal(row, c)
        }
        grid.set(`${row},${col}`, ".")
        grid.set(`${row},${c - 1}`, "O")
      }
    })
  }

  const set = new Map()
  let foundIndex = -1
  let target = 1000000000

  for (let x = 0; x < target; x++) {
    cycle()
    let s = getString(grid)
    const weight = [...grid.entries()]
      .map(([key, value]) => {
        const [row, col] = key.split(",").map((v) => parseInt(v))
        return value === "O" ? rows.length - row : 0
      })
      .reduce((acc, v) => acc + v, 0)
    if (set.has(s)) {
      console.log(s, weight)
      foundIndex = [...set.keys()].findIndex((x) => x === s)
      console.log(foundIndex)
      break
    }
    set.set(s, weight)
  }

  let repeat = set.size - foundIndex

  let p = target % repeat

  let res = [...set.values()][p - 1]

  console.log(set.size, repeat, set.values(), p)

  return res
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
