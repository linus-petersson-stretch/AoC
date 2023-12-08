import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

function getValues(string: string) {
  return string
    .split(":")[1]
    .split(" ")
    .map((x) => parseInt(x.trim()))
    .filter((t) => !isNaN(t))
}

function distanceTraveled(timePressed: number, raceTime: number) {
  const speed = timePressed
  return (raceTime - timePressed) * speed
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const times = getValues(input[0])
  const dists = getValues(input[1])

  const prod = times
    .map((time, i) => {
      let possibleWins = []
      for (let t = 1; t < time; t++) {
        if (distanceTraveled(t, time) > dists[i]) {
          possibleWins.push(t)
        }
      }
      return possibleWins
    })
    .reduce((acc, val) => acc * val.length, 1)

  return prod
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const times = getValues(input[0].replaceAll(" ", ""))
  const dists = getValues(input[1].replaceAll(" ", ""))

  const prod = times
    .map((time, i) => {
      let possibleWins = []
      for (let t = 1; t < time; t++) {
        if (distanceTraveled(t, time) > dists[i]) {
          possibleWins.push(t)
        }
      }
      return possibleWins
    })
    .reduce((acc, val) => acc * val.length, 1)

  return prod
}

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
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
