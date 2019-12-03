import { TokenKind } from "./TokenKind";
/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
export class VerbatimString {
  readonly kind: TokenKind.LiteralText = TokenKind.LiteralText;
  constructor(public readonly contents: string) {}
  stringify(): string {
    return this.contents;
  }
  toString() {
    return `'${this.contents}'`;
  }
}
