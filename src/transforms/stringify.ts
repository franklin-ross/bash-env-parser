import { TokenKind, Token, Variable, SubstitutedVariable } from "../tokens";

/** Variables which have not been substituted are stripped when converting to a string. */
export function stringify(token: Variable): null;
/** Variables which didn't match during substitution are stripped when converting to a string. */
export function stringify(token: SubstitutedVariable): string | null;
/** Converts a token to a string. Whitespace is concatenated verbatim and quoted strings are
 * expanded to their content, without the quotes. Variables which haven't been substituted are
 * stripped. */
export function stringify(token: Token): string;

export function stringify(token: Token): string | null {
  switch (token.kind) {
    case TokenKind.List:
      return token.items
        .map(stringify)
        .filter(<T>(token: T): token is Exclude<T, null> => token !== null)
        .join("");

    case TokenKind.Variable:
      // Treat variables which haven't been substituted as though they have no value.
      return null;

    case TokenKind.SubstitutedVariable:
      const value = token.value;
      if (value == null) {
        return null;
      } else if (typeof value === "string") {
        return value;
      }
      return stringify(value);

    case TokenKind.VariableAssignment:
      return `${token.name}=${stringify(token.value) || ""}`;

    case TokenKind.QuotedText:
      return token.contents.reduce<string>((text, next) => {
        if (typeof next === "string") {
          return text + next;
        }
        return text + (stringify(next) || "");
      }, "");

    case TokenKind.Text:
    case TokenKind.LiteralText:
    case TokenKind.Whitespace:
      return token.contents;
  }
}
