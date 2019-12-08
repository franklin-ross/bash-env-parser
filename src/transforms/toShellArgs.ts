import { TokenKind, Token, Variable, List } from "../tokens";

/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export function toShellArgs(token: List): string[];
/** Unsubstituted variables are stripped from shell args. */
export function toShellArgs(token: Variable): null;
/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export function toShellArgs(token: Token): string;

export function toShellArgs(token: Token) {
  switch (token.kind) {
    case TokenKind.List:
      const args: string[] = [];
      let lastWasWs = false;
      for (const child of token.items) {
        if (child.kind === TokenKind.Whitespace) {
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

    case TokenKind.Variable:
      // Treat variables which haven't been substituted as though they have no value.
      return null;

    case TokenKind.SubstitutedVariable:
      const value = token.value;
      if (value == null) return null;
      if (typeof value === "string") return value;
      return join(toShellArgs(value));

    case TokenKind.VariableAssignment:
      // Should variable assignments should show up or be stripped?
      return `${token.name}=${join(toShellArgs(token.value))}`;

    case TokenKind.QuotedText:
      return token.contents.reduce<string>((text, next) => {
        if (typeof next === "string") return text + next;
        return text + (toShellArgs(next) || "");
      }, "");

    case TokenKind.Text:
    case TokenKind.LiteralText:
    case TokenKind.Whitespace:
      return token.contents;
  }
}

function join(x: null | string | string[]): string {
  if (x == null) return "";
  if (typeof x === "string") return x;
  return x.join("");
}
