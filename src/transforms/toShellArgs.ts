import {
  Variable,
  SubstitutedVariable,
  QuotedString,
  Word,
  Whitespace,
  VerbatimString,
  VariableAssignment
} from "../tokens";
import { stringify } from "./stringify";

/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export function toShellArgs(token: ReadonlyArray<any>): string[];
/** Unsubstituted variables are stripped from shell args. */
export function toShellArgs(token: Variable): null;
/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export function toShellArgs(token: any): string;

export function toShellArgs(token: any) {
  if (Array.isArray(token)) {
    const args: string[] = [];
    let lastWasWs = false;
    for (const child of token) {
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

  if (token instanceof Variable) {
    // Treat variables which haven't been substituted as though they have no value.
    return null;
  }

  if (token instanceof SubstitutedVariable) {
    const value = token.value;
    return value == null ? null : join(toShellArgs(value));
  }

  if (token instanceof VariableAssignment) {
    // Should variable assignments show up or be stripped?
    return `${token.name}=${join(toShellArgs(token.value))}`;
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

  return "";
}

function join(x: null | string | readonly string[]): string {
  if (x == null) return "";
  if (typeof x === "string") return x;
  return x.join("");
}
