/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export class Whitespace {
  constructor(public readonly contents: string) {}

  toString() {
    return `(${this.contents})`;
  }
}
