import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const steps = input.split(",")

  let sum = steps.reduce((acc, val) => {
    return (
      acc +
      val.split("").reduce((a, c) => {
        a += c.charCodeAt(0)
        a *= 17
        a = a % 256
        return a
      }, 0)
    )
  }, 0)

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const steps = input.split(",")

  let maps = new Map<number, Map<string, number>>()

  for (let x = 0; x < 256; x++) {
    maps.set(x, new Map())
  }

  const hash = (label: string) => {
    return label.split("").reduce((a, c) => {
      a += c.charCodeAt(0)
      a *= 17
      a = a % 256
      return a
    }, 0)
  }

  steps.forEach((val) => {
    const [, label, operator, value] = val.match(/([a-z]*)([=-])([0-9]?)/) || []
    const HASH = hash(label)
    let box = maps.get(HASH)!
    if (operator === "-") {
      box.delete(label)
    }
    if (operator === "=") {
      box.set(label, parseInt(value))
    }
  })

  let focusingPower = [...maps.entries()].reduce((acc, [box, lenses]) => {
    return (
      acc +
      [...lenses.values()].reduce((a, v, idx) => {
        let lensePower = (box + 1) * (idx + 1) * v
        console.log(lensePower)
        return a + lensePower
      }, 0)
    )
  }, 0)

  return focusingPower
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
