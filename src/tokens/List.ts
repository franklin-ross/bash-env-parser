import { TokenKind, Token } from ".";

/** A list of tokens. */
export class List {
  readonly kind: TokenKind.List = TokenKind.List;
  constructor(public readonly items: ReadonlyArray<Token>) {}
  toString() {
    return `[${this.items}]`;
  }
}
