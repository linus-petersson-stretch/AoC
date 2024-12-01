import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput).split("\n")
  const numbers: number[] = []
  rows.forEach((row, index) => {
    const a = row.matchAll(/\d+/g)
    let b = a.next()
    while (!b.done) {
      const number = b.value[0]
      if (b.value.index != null && b.value.input != null) {
        const before =
          b.value.index === 0 ||
          row.substring(b.value.index - 1, b.value.index) === "."
        const after =
          b.value.index! + number.length === b.value.input.length ||
          row.substring(
            b.value.index + number.length,
            b.value.index + number.length + 1,
          ) === "."

        const over =
          index === 0 ||
          rows[index - 1]
            .substring(b.value.index - 1, b.value.index + number.length + 1)
            .replaceAll(/\.|\d/g, "") === ""

        const under =
          index === rows.length - 1 ||
          rows[index + 1]
            .substring(b.value.index - 1, b.value.index + number.length + 1)
            .replaceAll(/\.|\d/g, "") === ""

        if (!before || !after || !over || !under) {
          numbers.push(parseInt(b.value[0]))
        }
      }
      b = a.next()
    }
  })

  const sum = numbers.reduce((acc, val) => acc + val, 0)

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
