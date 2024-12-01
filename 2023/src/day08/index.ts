import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const directions = input.shift()?.split("")
  input.shift()
  const maps: Record<string, { left: string; right: string }> = {}
  input.forEach((r) => {
    const parts = r.split(" = ")
    const x = parts[1].replaceAll(/[\(\)]/g, "").split(", ")
    maps[parts[0]] = { left: x[0], right: x[1] }
  })

  let steps = 0
  let pos = "AAA"

  if (!directions) {
    return
  }

  while (pos !== "ZZZ") {
    let direction = directions[steps % directions.length]
    if (direction === "L") {
      pos = maps[pos].left
    } else {
      pos = maps[pos].right
    }
    steps++
  }
  return steps
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const directions = input.shift()?.split("")
  input.shift()
  const maps: Record<string, { left: string; right: string }> = {}
  input.forEach((r) => {
    const parts = r.split(" = ")
    const x = parts[1].replaceAll(/[\(\)]/g, "").split(", ")
    maps[parts[0]] = { left: x[0], right: x[1] }
  })

  let positions = Object.keys(maps).filter((key) => key.charAt(2) === "A")
  let steps = Array(positions.length).fill(0)

  if (!directions) {
    return
  }

  function allZ(positions: string[]) {
    return positions.every((p) => p.charAt(2) === "Z")
  }

  positions.forEach((p, index) => {
    while (p.charAt(2) !== "Z") {
      let direction = directions[steps[index] % directions.length]
      if (direction === "L") {
        p = maps[p].left
      } else {
        p = maps[p].right
      }

      steps[index]++
    }
  })

  const gcd: (a: number, b: number) => number = (a, b) =>
    a ? gcd(b % a, a) : b
  const lcm = (a: number, b: number) => (a * b) / gcd(a, b)
  return steps.length ? steps.reduce(lcm) : 0
}

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
