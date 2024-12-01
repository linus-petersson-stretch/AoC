import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

function getDiffs(arr: number[]) {
  let diffs = Array(arr.length - 1).fill(0)
  return diffs.map((d, idx) => arr[idx + 1] - arr[idx])
}

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput)

  const a = rows.map((row) => {
    const nums = row.split(" ").map((x) => parseInt(x))
    const diffLists = [nums]
    let diffs = getDiffs(nums)
    do {
      diffLists.unshift(diffs)
      diffs = getDiffs(diffs)
    } while (!diffs.every((x) => x === 0))

    diffLists.unshift(diffs)

    for (let x = 1; x < diffLists.length; x++) {
      let prev = diffLists[x - 1]
      diffLists[x].push((diffLists[x].at(-1) ?? 0) + (prev.at(-1) ?? 0))
    }
    return diffLists.at(-1)?.at(-1) ?? 0
  })

  return a.reduce((a, v) => a + v)
}

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput)

  const a = rows.map((row) => {
    const nums = row.split(" ").map((x) => parseInt(x))
    const diffLists = [nums]
    let diffs = getDiffs(nums)
    do {
      diffLists.unshift(diffs)
      diffs = getDiffs(diffs)
    } while (!diffs.every((x) => x === 0))

    diffLists.unshift(diffs)

    for (let x = 1; x < diffLists.length; x++) {
      let prev = diffLists[x - 1]
      diffLists[x].unshift((diffLists[x].at(0) ?? 0) - (prev.at(0) ?? +0))
    }
    return diffLists.at(-1)?.at(0) ?? 0
  })

  return a.reduce((a, v) => a + v)
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
