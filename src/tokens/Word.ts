/** An unquoted word containing no whitespace. */
export class Word {
  constructor(public readonly contents: string) {}

  toString() {
    return `${this.contents}`;
  }
}
