import {
  Variable,
  QuotedString,
  Word,
  Whitespace,
  VerbatimString,
  VariableAssignment,
  Token
} from "../tokens";
import { stringify } from "./stringify";

/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export function toShellArgs(token: ReadonlyArray<Token>): string[];
/** Unsubstituted variables are stripped from shell args. */
export function toShellArgs(token: Variable | VariableAssignment): null;
/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export function toShellArgs(token: Token): string;

export function toShellArgs(token: Token | ReadonlyArray<Token>) {
  if (Array.isArray(token)) {
    const args: string[] = [];
    let lastWasWs = false;
    for (const child of token as Token[]) {
      if (child instanceof Whitespace) {
        lastWasWs = true;
      } else {
        const next = toShellArgs(child);
        if (next !== null) {
          if (lastWasWs || args.length === 0) {
            args.push(next);
          } else {
            args[args.length - 1] += next;
          }
          lastWasWs = false;
        }
      }
    }
    return args;
  }

  if (token instanceof Variable || token instanceof VariableAssignment) {
    return null;
  }

  if (token instanceof QuotedString) {
    return stringify(token);
  }

  if (
    token instanceof Word ||
    token instanceof VerbatimString ||
    token instanceof Whitespace
  ) {
    return token.contents;
  }
}
