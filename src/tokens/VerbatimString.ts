/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
export class VerbatimString {
  constructor(public readonly contents: string) {}

  toString() {
    return `'${this.contents}'`;
  }
}
