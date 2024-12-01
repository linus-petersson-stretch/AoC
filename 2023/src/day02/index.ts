import run from "aocrunner"

type Game = {
  red: number
  blue: number
  green: number
}[]

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const gamesDict: Record<number, Game> = {}

  const games = input.split("\n").forEach((gameString) => {
    const parts = gameString.split(":")
    const gameId = parseInt(parts[0].split(" ")[1])
    const results = parts[1].split(";")
    const draws = results.map((draw) => {
      const green = [...draw.matchAll(/(\d+) green/g)][0]
      const red = [...draw.matchAll(/(\d+) red/g)][0]
      const blue = [...draw.matchAll(/(\d+) blue/g)][0]

      return {
        green: green ? parseInt(green[1]) : 0,
        red: red ? parseInt(red[1]) : 0,
        blue: blue ? parseInt(blue[1]) : 0,
      }
    })

    gamesDict[gameId] = draws
  })

  const possibleGamesSum = Object.entries(gamesDict)
    .filter((game) => {
      return game[1].every((draw) => {
        return draw.red <= 12 && draw.green <= 13 && draw.blue <= 14
      })
    })
    .map((game) => parseInt(game[0]))
    .reduce((acc, val) => acc + val, 0)

  return possibleGamesSum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const gamesDict: Record<number, Game> = {}

  const games = input.split("\n").forEach((gameString) => {
    const parts = gameString.split(":")
    const gameId = parseInt(parts[0].split(" ")[1])
    const results = parts[1].split(";")
    const draws = results.map((draw) => {
      const green = [...draw.matchAll(/(\d+) green/g)][0]
      const red = [...draw.matchAll(/(\d+) red/g)][0]
      const blue = [...draw.matchAll(/(\d+) blue/g)][0]

      return {
        green: green ? parseInt(green[1]) : 0,
        red: red ? parseInt(red[1]) : 0,
        blue: blue ? parseInt(blue[1]) : 0,
      }
    })

    gamesDict[gameId] = draws
  })

  const fewest = Object.values(gamesDict).map((draws) => {
    return draws.reduce(
      (acc, { red, green, blue }) => {
        return {
          red: red > acc.red ? red : acc.red,
          green: green > acc.green ? green : acc.green,
          blue: blue > acc.blue ? blue : acc.blue,
        }
      },
      { red: 0, green: 0, blue: 0 },
    )
  })
  const powers = fewest.map(({ red, green, blue }) => red * green * blue)

  const sum = powers.reduce((acc, val) => acc + val, 0)

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
