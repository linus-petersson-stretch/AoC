import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split(""))

type Tile = {
  north?: {
    row: number
    col: number
  }
  south?: {
    row: number
    col: number
  }
  east?: {
    row: number
    col: number
  }
  west?: {
    row: number
    col: number
  }
  symbol: string
  row: number
  col: number
  visited: boolean
} | null

function getTile(symbol: string, row: number, col: number): Tile {
  switch (symbol) {
    case "|":
      return {
        north: { row: row - 1, col },
        south: { row: row + 1, col },
        symbol,
        row,
        col,
        visited: false,
      }
    case "-":
      return {
        east: { row, col: col - 1 },
        west: { row, col: col + 1 },
        symbol,
        row,
        col,
        visited: false,
      }
    case "L":
      return {
        east: { row, col: col + 1 },
        north: { row: row - 1, col },
        symbol,
        row,
        col,
        visited: false,
      }
    case "J":
      return {
        north: { row: row - 1, col },
        west: { row, col: col - 1 },
        symbol,
        row,
        col,
        visited: false,
      }
    case "7":
      return {
        west: { row, col: col - 1 },
        south: { row: row + 1, col },
        symbol,
        row,
        col,
        visited: false,
      }
    case "F":
      return {
        south: { row: row + 1, col },
        east: { row, col: col + 1 },
        symbol,
        row,
        col,
        visited: false,
      }
    case "S":
      return {
        symbol,
        row,
        col,
        visited: true,
      }
    case ".":
    default:
      return null
  }
}

function findStart(rows: string[][], pipes: Tile[][]) {
  let col = -1
  let row = rows.findIndex((row) => {
    col = row.findIndex((d) => d === "S")
    return col > -1
  })

  let north = pipes[row - 1][col]
  let east = pipes[row][col + 1]
  let south = pipes[row + 1][col]
  let west = pipes[row][col - 1]

  let forward = null
  let backward = null

  if (north?.south) {
    forward = { row: row - 1, col }
  } else if (east?.west) {
    forward = { row, col: col + 1 }
  }
  if (south?.north) {
    backward = { row: row + 1, col }
  } else if (west?.east) {
    backward = { row, col: col - 1 }
  }
  return { backward, forward }
}

function getNextTile(tile: Tile, pipes: Tile[][]) {
  if (tile) {
    tile.visited = true
    if (tile.east && !pipes[tile.east.row][tile.east.col]?.visited) {
      return pipes[tile.east.row][tile.east.col]
    }
    if (tile.west && !pipes[tile.west.row][tile.west.col]?.visited) {
      return pipes[tile.west.row][tile.west.col]
    }
    if (tile.north && !pipes[tile.north.row][tile.north.col]?.visited) {
      return pipes[tile.north.row][tile.north.col]
    }
    if (tile.south && !pipes[tile.south.row][tile.south.col]?.visited) {
      return pipes[tile.south.row][tile.south.col]
    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let pipes = input.map((row, rowId) => {
    return row.map((tile, colId) => {
      return getTile(tile, rowId, colId)
    })
  })

  let start = findStart(input, pipes)

  let forward = pipes[start.forward?.row][start.forward?.col]
  let backward = pipes[start.backward?.row][start.backward?.col]

  let step = 1

  while (forward != backward) {
    forward = getNextTile(forward, pipes)
    backward = getNextTile(backward, pipes)
    step++
  }

  return step
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let firstRow = new Array(input[0].length).fill(".")
  input.unshift(firstRow)

  input.forEach((row) => {
    row.unshift(".")
    row.push(".")
  })

  let pipes = input.map((row, rowId) => {
    return row.map((tile, colId) => {
      return getTile(tile, rowId, colId)
    })
  })

  let start = findStart(input, pipes)

  console.log(start)

  let forward = pipes[start.forward?.row][start.forward?.col]
  let backward = pipes[start.backward?.row][start.backward?.col]

  while (forward != backward) {
    forward = getNextTile(forward, pipes)
    backward = getNextTile(backward, pipes)
  }

  forward.visited = true

  let cleaned = pipes.map((row, rowId) => {
    return row.map((tile, colId) => {
      return !tile?.visited ? { row: rowId, col: colId, symbol: "." } : tile
    })
  })

  let cleanedInput = cleaned.map((r) => r.map((c) => c.symbol))

  let empty = cleaned.flatMap((x) => x).filter((x) => !x?.visited)

  return empty.filter(({ row, col }) => {
    let c = col
    let linesCrossed = 0
    let ray = cleanedInput[row].slice(0, col)
    let r = ray
      .join("")
      .replaceAll("S", "J")
      .replaceAll(/[L]-*[7]/g, "|")
      .replaceAll(/[F]-*[J]/g, "|")
      .split("")
    while (c >= 0) {
      let tile = r[c]
      if (tile && "|".includes(tile)) {
        linesCrossed++
      }
      c--
    }
    return linesCrossed % 2 !== 0
  }).length
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `.....
.S-7.
.|.|.
.L-J.
.....`,
        expected: 4,
      },
      {
        input: `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`,
        expected: 4,
      },
      {
        input: `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
