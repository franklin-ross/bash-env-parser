import { TokenKind } from ".";

/** An unquoted word containing no whitespace. */
export class Word {
  readonly kind: TokenKind.Text = TokenKind.Text;
  constructor(public readonly contents: string) {}
  toString() {
    return `(${this.contents})`;
  }
}
