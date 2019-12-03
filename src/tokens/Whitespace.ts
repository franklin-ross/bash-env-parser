import { TokenKind } from "./TokenKind";
import { Environment } from "../Environment";
/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export class Whitespace {
  readonly kind: TokenKind.Whitespace = TokenKind.Whitespace;
  constructor(public readonly contents: string) {}
  stringify(env: Environment, collapseWhitespace: boolean = true): string {
    return collapseWhitespace ? " " : this.contents;
  }
  toString() {
    return `(${this.contents})`;
  }
}
