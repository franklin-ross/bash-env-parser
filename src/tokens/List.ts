import { TokenKind, Token } from ".";
import { areEqual } from "../utils";

/** A list of tokens. */
export class List {
  readonly kind: TokenKind.List = TokenKind.List;
  constructor(public readonly items: ReadonlyArray<Token>) {}
  toString() {
    return `[${this.items}]`;
  }
  /** Transforms this list, returning a new list if the result is not structurally identical. */
  transform(
    transformer: (items: ReadonlyArray<Token>) => ReadonlyArray<Token>
  ) {
    if (typeof transformer !== "function") return this;
    const transformed = transformer(this.items);
    return areEqual(this.items, transformed) ? this : new List(transformed);
  }
}
