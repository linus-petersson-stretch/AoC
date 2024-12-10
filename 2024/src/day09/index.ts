import run from "aocrunner"

const delimiter = ""

const part1Example = `2333133121414131402`
const part1ExampleSolution = 1928
const part1 = (rawInput: string) => {
  const input = rawInput.split(delimiter)

  let res: string[] = []
  let totalSpace = 0
  let id = 0
  for (let i = 0; i < input.length; i += 2) {
    const fileSize = Number(input[i])
    const space = Number(input[i + 1])
    totalSpace += space || 0

    res.push(
      ...new Array(fileSize).fill(id.toString()),
      ...new Array(space ? space : 0).fill("."),
    )
    id += 1
  }

  for (let i = 0; i < totalSpace; i++) {
    let s = res.pop()
    let ix = res.findIndex((x) => x === ".")
    if (ix === -1) {
      break
    }
    res[ix] = s!
  }

  return res.map((x, i) => Number(x) * i).reduce((a, b) => a + b, 0)
}

const part2Example = part1Example
const part2ExampleSolution = 2858
const runPart2Tests = true

const part2 = (rawInput: string) => {
  const input = rawInput.split(delimiter)

  let res: string[] = []
  let files: string[][] = []
  let spaces: string[][] = []
  let id = 0
  for (let i = 0; i < input.length; i += 2) {
    const fileSize = Number(input[i])
    const space = Number(input[i + 1])

    files.push(new Array(fileSize).fill(id.toString()))
    if (!isNaN(space)) {
      spaces.push(new Array(space).fill("."))
    }
    id += 1
  }

  files.reverse()

  for (let i = 0; i < files.length; i++) {
    let s = files[i]
    let ix: number = spaces.findIndex(
      (x) => x.filter((d) => d === ".").length >= s.length,
    )
    if (ix === -1) {
      continue
    }
    if (ix > files.length - i) {
      continue
    }
    spaces[ix].splice(
      spaces[ix].findIndex((d) => d === "."),
      s.length,
      ...s,
    )
    files[i] = new Array(s.length).fill(".")
  }

  files.reverse()

  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let space = spaces[i] || []
    res.push(...file, ...space)
  }

  return res
    .map((x, i) => (x !== "." ? Number(x) : 0) * i)
    .reduce((a, b) => a + b, 0)
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
