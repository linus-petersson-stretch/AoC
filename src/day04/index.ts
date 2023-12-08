import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const rounds = input.split("\n")

  const numOfWinners = rounds.map((round) => {
    const draw = round.split("|")[0].split(":")[1]
    const mine = round.split("|")[1]

    const drawnNumbers = (draw.match(/\d+/g) ?? []).map((x) => parseInt(x))
    const myNumbers = (mine.match(/\d+/g) ?? []).map((x) => parseInt(x))

    const winners = myNumbers.filter((number) => drawnNumbers.includes(number))

    return winners.length
  })

  const sum = numOfWinners.reduce((acc, wins) => {
    if (wins === 0) {
      return acc
    }
    return acc + Math.pow(2, wins - 1)
  }, 0)

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")

  const cardDict: Record<number, number> = {}

  const rounds = input.map((round, index) => {
    const draw = round.split("|")[0].split(":")[1]
    const mine = round.split("|")[1]

    const drawnNumbers = (draw.match(/\d+/g) ?? []).map((x) => parseInt(x))
    const myNumbers = (mine.match(/\d+/g) ?? []).map((x) => parseInt(x))
    const winners = myNumbers.filter((number) => drawnNumbers.includes(number))

    return {
      card: index + 1,
      wins: winners.length,
    }
  })

  rounds.forEach((r) => (cardDict[r.card] = 1))

  const a = rounds.forEach((r) => {
    let prev = cardDict[r.card]
    for (let t = r.card + 1; t <= r.card + r.wins; t++) {
      cardDict[t] += prev
    }
  })

  return Object.values(cardDict).reduce((acc, val) => acc + val, 0)
}

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
