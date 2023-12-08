import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const strings = parseInput(rawInput).split("\n")

  const numbers = strings.map((string) => {
    const numbers = string.replace(/[a-z]/g, "")
    const first = numbers.slice(0, 1)
    const last = numbers.slice(-1)
    return parseInt(`${first}${last}`)
  })

  const sum = numbers.reduce((acc, val) => acc + val, 0)

  return sum
}

const part2 = (rawInput: string) => {
  const strings = parseInput(rawInput).split("\n")

  const numbers = strings.map((string) => {
    string = string.replace(/one/g, "one1one")
    string = string.replace(/two/g, "two2two")
    string = string.replace(/three/g, "three3three")
    string = string.replace(/four/g, "four4four")
    string = string.replace(/five/g, "five5five")
    string = string.replace(/six/g, "six6six")
    string = string.replace(/seven/g, "seven7seven")
    string = string.replace(/eight/g, "eight8eight")
    string = string.replace(/nine/g, "nine9nine")
    const numbers = string.replace(/[a-z]/g, "")
    const first = numbers.slice(0, 1)
    const last = numbers.slice(-1)
    return parseInt(`${first}${last}`)
  })

  const sum = numbers.reduce((acc, val) => acc + val, 0)

  return sum
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
