import run from "aocrunner"
import { parseInts, range } from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const categories = input.split("\n\n")
  const seeds = parseInts(categories.shift()?.split(":")[1].trim().split(" "))

  let maps = categories.map((category) => {
    return category
      .split("\n")
      .slice(1)
      .map((row) => {
        let nums = parseInts(row.split(" ")) as number[]
        return {
          destStart: nums[0],
          sourceStart: nums[1],
          length: nums[2],
        }
      })
  })

  function getDestination(
    maps: {
      destStart: number
      sourceStart: number
      length: number
    }[][],
    source: number,
  ) {
    let map = maps.shift()
    if (!map) {
      return source
    }

    let match = map.find((m) => {
      return source >= m.sourceStart && source < m.sourceStart + m.length
    })

    let dest = source

    if (match) {
      let diff = source - match.sourceStart
      dest = match.destStart + diff
    }

    return getDestination(maps, dest)
  }

  let locations = seeds?.map((seed) => {
    return getDestination([...maps], seed)
  })

  return locations?.reduce(
    (acc, l) => (l < acc ? l : acc),
    Number.MAX_SAFE_INTEGER,
  )
}

const part2_brute = (rawInput: string) => {
  const input = parseInput(rawInput)
  const categories = input.split("\n\n")
  const seedsRanges = parseInts(
    categories.shift()?.split(":")[1].trim().split(" "),
  ) as number[]

  let maps = categories.map((category) => {
    return category
      .split("\n")
      .slice(1)
      .map((row) => {
        let nums = parseInts(row.split(" ")) as number[]
        return {
          destStart: nums[0],
          sourceStart: nums[1],
          length: nums[2],
        }
      })
  })

  let minLocation = Number.MAX_SAFE_INTEGER

  for (let x = 0; x < seedsRanges.length; x = x + 2) {
    let start = seedsRanges[x]
    let length = seedsRanges[x + 1]

    for (let seed = start; seed < start + length; seed++) {
      let destination = getDestination([...maps], seed)
      if (destination < minLocation) {
        minLocation = destination
      }
    }
  }

  function getDestination(
    maps: {
      destStart: number
      sourceStart: number
      length: number
    }[][],
    source: number,
  ) {
    let map = maps.shift()
    if (!map) {
      return source
    }

    let match = map.find((m) => {
      return source >= m.sourceStart && source < m.sourceStart + m.length
    })

    let dest = source

    if (match) {
      let diff = source - match.sourceStart
      dest = match.destStart + diff
    }

    return getDestination(maps, dest)
  }

  return minLocation
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const categories = input.split("\n\n")
  const seedsRanges = parseInts(
    categories.shift()?.split(":")[1].trim().split(" "),
  ) as number[]

  let maps = categories.map((category) => {
    return category
      .split("\n")
      .slice(1)
      .map((row) => {
        let nums = parseInts(row.split(" ")) as number[]
        return {
          destStart: nums[0],
          sourceStart: nums[1],
          length: nums[2],
        }
      })
  })

  let seeds: number[][] = []
  while (seedsRanges.length > 0) {
    seeds.push([seedsRanges.shift()!, seedsRanges.shift()!])
  }

  console.log(seeds)

  let minLocation = 0
  let found = false

  let destinations = maps.at(-1)?.sort((a, b) => {
    return a.destStart - b.destStart
  })

  while (!found) {
    let seed = getSource([...maps], minLocation)
    if (seed) {
      found = true
    } else {
      minLocation++
    }
  }

  function getSource(
    maps: {
      destStart: number
      sourceStart: number
      length: number
    }[][],
    destination: number,
  ) {
    let map = maps.pop()
    if (!map) {
      let x = seeds.find(
        (x) => destination >= x[0] && destination < x[0] + x[1],
      )
      if (x) {
        return destination
      } else {
        return null
      }
    }

    let match = map.find((m) => {
      return destination >= m.destStart && destination < m.destStart + m.length
    })

    let source = destination

    if (match) {
      let diff = destination - match.destStart
      source = match.sourceStart + diff
    }

    return getSource(maps, source)
  }

  return minLocation
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },

  trimTestInputs: true,
})
