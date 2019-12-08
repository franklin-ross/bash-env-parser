import { Environment } from "../Environment";
import { TokenKind, Variable, SubstitutedVariable } from ".";

/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export class QuotedString {
  readonly kind: TokenKind.QuotedText = TokenKind.QuotedText;
  constructor(
    public readonly contents: ReadonlyArray<
      string | Variable | SubstitutedVariable
    >
  ) {}
  toString() {
    return `"${this.contents}"`;
  }
}
