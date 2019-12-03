import { Environment } from "../Environment";
import { TokenKind, Variable } from ".";
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export class QuotedString {
  readonly kind: TokenKind.QuotedText = TokenKind.QuotedText;
  constructor(public readonly contents: ReadonlyArray<string | Variable>) {}
  stringify(env: Environment): string {
    return this.contents.reduce<string>((text, next) => {
      if (typeof next !== "string") {
        next = next.stringify(env, false) || ""; // Surrounding whitespace doesn't ever collapse
      }
      return text + next;
    }, "");
  }
  toString() {
    return `"${this.contents}"`;
  }
}
