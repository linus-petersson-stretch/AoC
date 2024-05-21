import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((r) => r.split(""))

const part1 = (rawInput: string) => {
  let rows = parseInput(rawInput)

  let emptyRows = []

  for (let i = 0; i < rows.length; i++) {
    if (!rows[i].includes("#")) {
      emptyRows.push(i)
    }
  }

  emptyRows.forEach((emptyIndex, idx) => {
    rows.splice(emptyIndex + idx, 0, [...rows[emptyIndex + idx]])
  })

  let emptyCols: number[] = []

  for (let col = 0; col < rows[0].length; col++) {
    if (rows.every((r) => r.at(col) === ".")) {
      emptyCols.push(col)
    }
  }

  emptyCols.forEach((emptyIndex, idx) => {
    rows.forEach((row) => row.splice(emptyIndex + idx, 0, "."))
  })

  const galaxies = new Map()
  let iter = 1

  rows.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === "#") {
        galaxies.set(iter, [r, c])
        iter++
      }
    })
  })

  let galaxyNumbers = [...galaxies.keys()]

  let pairs = galaxyNumbers
    .map((v, i) => galaxyNumbers.slice(i + 1).map((w) => [v, w]))
    .flat()

  let distances = new Map()

  pairs.forEach((pair) => {
    const [first, second] = pair
    const [row1, col1] = galaxies.get(first)
    const [row2, col2] = galaxies.get(second)

    let distance = Math.abs(row2 - row1) + Math.abs(col2 - col1)
    distances.set(pair, distance)
  })

  return [...distances.values()].reduce((a, c) => a + c, 0)
}

const part2 = (rawInput: string) => {
  let rows = parseInput(rawInput)

  let emptyRows: number[] = []

  for (let i = 0; i < rows.length; i++) {
    if (!rows[i].includes("#")) {
      emptyRows.push(i)
    }
  }

  let emptyCols: number[] = []

  for (let col = 0; col < rows[0].length; col++) {
    if (rows.every((r) => r.at(col) === ".")) {
      emptyCols.push(col)
    }
  }

  const galaxies = new Map()
  let iter = 1

  rows.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === "#") {
        galaxies.set(iter, [r, c])
        iter++
      }
    })
  })

  const galaxyNumbers: number[] = [...galaxies.keys()]

  let pairs = galaxyNumbers
    .map((v, i) => galaxyNumbers.slice(i + 1).map((w) => [v, w]))
    .flat()

  let distances = new Map()

  pairs.forEach((pair) => {
    const [first, second] = pair
    const [row1, col1] = galaxies.get(first)
    const [row2, col2] = galaxies.get(second)

    let distance = Math.abs(row2 - row1) + Math.abs(col2 - col1)

    let crossesEmptyRow = emptyRows.filter(
      (r) => (row1 < r && row2 > r) || (row2 < r && row1 > r),
    )
    let crossesEmptyCol = emptyCols.filter(
      (c) => (col1 < c && col2 > c) || (col2 < c && col1 > c),
    )
    distance =
      distance +
      crossesEmptyRow.length * 1000000 +
      crossesEmptyCol.length * 1000000 -
      crossesEmptyCol.length -
      crossesEmptyRow.length

    distances.set(pair, distance)
  })

  return [...distances.values()].reduce((a, c) => a + c, 0)
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 82000210,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
