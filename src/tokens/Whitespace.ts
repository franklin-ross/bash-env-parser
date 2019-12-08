import { TokenKind } from ".";

/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export class Whitespace {
  readonly kind: TokenKind.Whitespace = TokenKind.Whitespace;
  constructor(public readonly contents: string) {}
  toString() {
    return `(${this.contents})`;
  }
}
