export const parseInts = (strings?: string[]) => {
  return strings?.map((s) => parseInt(s))
}

export function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt)
}

export const compareArrays = (a: Array<unknown>, b: Array<unknown>) =>
  a.length === b.length && a.every((element, index) => b.includes(element))
