export const parseInts = (strings?: string[]) => {
  return strings?.map((s) => parseInt(s))
}

export function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt)
}

export const compareArrays = (a: Array<unknown>, b: Array<unknown>) =>
  a.length === b.length && a.every((element, index) => b.includes(element))

export class BetterSet<
  T extends { toString(): string } | { key(): string } | {},
> {
  constructor() {
    this._set = new Set()
  }

  private _set: Set<string>
  private _key(value: T): string {
    return "key" in value
      ? value.key()
      : "toString" in value
      ? value.toString()
      : JSON.stringify(value)
  }
  public add(...values: T[]) {
    values.forEach((value) => this._set.add(this._key(value)))
    return this
  }
  public has(value: T) {
    return this._set.has(this._key(value))
  }
  public delete(value: T) {
    return this._set.delete(this._key(value))
  }
  public clear() {
    this._set.clear()
  }
  public size() {
    return this._set.size
  }
  public values() {
    return Array.from(this._set.values())
  }
}
