import run from "aocrunner"
import { compareArrays } from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput.split("\n")

function getHandValue(cards: Record<string, number>) {
  if (compareArrays(Object.values(cards), [5])) {
    return 7
  } else if (compareArrays(Object.values(cards), [4, 1])) {
    return 6
  } else if (compareArrays(Object.values(cards), [2, 3])) {
    return 5
  } else if (compareArrays(Object.values(cards), [3, 1, 1])) {
    return 4
  } else if (compareArrays(Object.values(cards), [2, 2, 1])) {
    return 3
  } else if (compareArrays(Object.values(cards), [2, 1, 1, 1])) {
    return 2
  } else if (compareArrays(Object.values(cards), [1, 1, 1, 1, 1])) {
    return 1
  }
  return 0
}

const part1 = (rawInput: string) => {
  function compare(
    { cards: a, handVal: aHandVal }: { cards: string; handVal: number },
    { cards: b, handVal: bHandVal }: { cards: string; handVal: number },
  ) {
    if (aHandVal != bHandVal) {
      return aHandVal - bHandVal
    }
    let aChars = a.split("")
    let bChars = b.split("")
    let res = 0
    for (let i = 0; i < 5; i++) {
      if (charValue(aChars[i]) < charValue(bChars[i])) {
        res = -1
        break
      } else if (charValue(aChars[i]) > charValue(bChars[i])) {
        res = 1
        break
      }
    }
    return res
  }

  function charValue(c: string) {
    switch (c) {
      case "A":
        return 14
      case "K":
        return 13
      case "Q":
        return 12
      case "J":
        return 11
      case "T":
        return 10
      default:
        return parseInt(c)
    }
  }

  function getValues(hand: string) {
    let cards = hand.split("")
    let dict: Record<string, number> = {}
    for (let card of cards) {
      if (!dict[card]) {
        dict[card] = 1
      } else {
        dict[card]++
      }
    }
    return dict
  }

  const input = parseInput(rawInput).map((h) => {
    const x = h.split(" ")
    const values = getValues(x[0])
    return {
      cards: x[0],
      bid: parseInt(x[1]),
      values,
      handVal: getHandValue(values),
    }
  })

  const sorted = input.sort(compare)

  const sum = sorted.reduce((acc, val, index) => acc + (index + 1) * val.bid, 0)

  return sum
}

const part2 = (rawInput: string) => {
  function compare(
    { cards: a, handVal: aHandVal }: { cards: string; handVal: number },
    { cards: b, handVal: bHandVal }: { cards: string; handVal: number },
  ) {
    if (aHandVal != bHandVal) {
      return aHandVal - bHandVal
    }
    let aChars = a.split("")
    let bChars = b.split("")
    let res = 0
    for (let i = 0; i < 5; i++) {
      if (charValue(aChars[i]) < charValue(bChars[i])) {
        res = -1
        break
      } else if (charValue(aChars[i]) > charValue(bChars[i])) {
        res = 1
        break
      }
    }
    return res
  }

  function charValue(c: string) {
    switch (c) {
      case "A":
        return 14
      case "K":
        return 13
      case "Q":
        return 12
      case "J":
        return 1
      case "T":
        return 10
      default:
        return parseInt(c)
    }
  }

  function getValues(hand: string) {
    const cards = hand.split("")
    const noJacks = cards.filter((c) => c != "J")
    const jacks = 5 - noJacks.length
    const dict: Record<string, number> = {}
    for (let card of noJacks) {
      if (!dict[card]) {
        dict[card] = 1
      } else {
        dict[card]++
      }
    }

    if (jacks === 5) {
      return { J: 5 }
    }

    if (jacks) {
      let best = Object.entries(dict).reduce(
        (acc, val) => {
          if (val[1] > acc[1]) {
            return val
          } else if (val[1] < acc[1]) {
            return acc
          } else if (charValue(val[0]) > charValue(acc[0])) {
            return val
          } else {
            return acc
          }
        },
        ["J", 0],
      )

      dict[best[0]] += jacks
    }

    return dict
  }

  const input = parseInput(rawInput).map((h) => {
    const x = h.split(" ")
    const values = getValues(x[0])
    return {
      cards: x[0],
      bid: parseInt(x[1]),
      values,
      handVal: getHandValue(values),
    }
  })

  const sorted = input.sort(compare)

  const sum = sorted.reduce((acc, val, index) => acc + (index + 1) * val.bid, 0)

  return sum
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
