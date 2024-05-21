import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const [workflowsRaw, partsRaw] = input.split("\n\n").map((x) => x.split("\n"))

  const parts: { x: number; m: number; a: number; s: number }[] = partsRaw.map(
    (p) => {
      return Object.fromEntries(
        p
          .replaceAll(/[{}]/g, "")
          .split(",")
          .map((v) => v.split("="))
          .map(([field, val]) => [field, parseInt(val)]),
      )
    },
  )

  const workflows = new Map()

  workflowsRaw.forEach((w) => {
    const [name, rules] = w.replace("}", "").split("{")
    workflows.set(name, rules)
  })

  const evaluateRule = (rule: string, part: (typeof parts)[0]) => {
    let rules = rule.split(",")
    const isCondition = (r: string) => r.includes(">") || r.includes("<")
    const isAccepted = (r: string) => r === "A"
    const isRejected = (r: string) => r === "R"

    for (let x = 0; x < rules.length; x++) {
      let r = rules[x]

      if (isAccepted(r)) {
        return true
      }
      if (isRejected(r)) {
        return false
      }
      if (workflows.has(r)) {
        return evaluateRule(workflows.get(r), part)
      }
      if (isCondition(r)) {
        let [condition, output] = r.split(":")
        let [field, operator, ...rest] = condition.split("")
        let value = parseInt(rest.join(""))
        let partVal = part[field]

        if (
          (operator === ">" && partVal > value) ||
          (operator === "<" && partVal < value)
        ) {
          if (isAccepted(output)) {
            return true
          }
          if (isRejected(output)) {
            return false
          }
          if (workflows.has(output)) {
            return evaluateRule(workflows.get(output), part)
          }
        }
      }
    }
  }

  let inRule = workflows.get("in")

  const a = parts
    .filter((p) => evaluateRule(inRule, p))
    .reduce((acc, p) => acc + p.x + p.m + p.a + p.s, 0)

  return a
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  onlyTests: false,
  part1: {
    tests: [
      {
        input: `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`,
        expected: 19114,
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
})
