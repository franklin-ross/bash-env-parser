import { TokenKind } from "./TokenKind";
import { Environment } from "../Environment";
import { Variable } from "./Variable";
import { QuotedString } from "./QuotedString";
import { VerbatimString } from "./VerbatimString";
import { Word } from "./Word";
import { Whitespace } from "./Whitespace";
/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
export class List {
  readonly kind: TokenKind.List = TokenKind.List;
  constructor(
    public readonly items: ReadonlyArray<
      Variable | Word | QuotedString | VerbatimString | Whitespace
    >
  ) {}
  /** Converts the contained items into a string, with support for collapsing whitespace around
   * "words". */
  stringify(env: Environment, collapseWhitespace: boolean = true): string {
    if (collapseWhitespace) {
      let lastWasWs = false;
      return this.items.reduce((text: string, token) => {
        if (token.kind === TokenKind.Whitespace) {
          lastWasWs = true;
          return text;
        }
        const next = token.stringify(env, true);
        if (next === null) return text;
        if (lastWasWs && text !== "") {
          text += " ";
        }
        lastWasWs = false;
        return text + next;
      }, "");
    }
    return this.items
      .map(token => token.stringify(env, false))
      .filter(<T>(token: T): token is Exclude<T, null> => token !== null)
      .join("");
  }
  toString() {
    return `[${this.items}]`;
  }
}
