import { TokenKind, Variable, SubstitutedVariable } from ".";
import { areEqual } from "../utils";

type QuotedStringToken = string | Variable | SubstitutedVariable;

/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export class QuotedString {
  readonly kind: TokenKind.QuotedText = TokenKind.QuotedText;
  constructor(public readonly contents: ReadonlyArray<QuotedStringToken>) {}
  toString() {
    return `"${this.contents}"`;
  }
  /** Transforms this QuotedString, returning a new QuotedString if the result is not structurally identical. */
  transform(
    transformer: (
      items: ReadonlyArray<QuotedStringToken>
    ) => ReadonlyArray<QuotedStringToken>
  ) {
    if (typeof transformer !== "function") return this;
    const transformed = transformer(this.contents);
    return areEqual(this.contents, transformed)
      ? this
      : new QuotedString(transformed);
  }
}
