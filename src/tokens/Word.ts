import { TokenKind } from "./TokenKind";
/** An unquoted word containing no whitespace. */
export class Word {
  readonly kind: TokenKind.Text = TokenKind.Text;
  constructor(public readonly contents: string) {}
  stringify(): string {
    return this.contents;
  }
  toString() {
    return `(${this.contents})`;
  }
}
