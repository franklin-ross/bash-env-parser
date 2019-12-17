import {
  TokenKind,
  Token,
  List,
  Whitespace,
  SubstitutedVariable
} from "../tokens";

export function collapseWhitespace(
  token: SubstitutedVariable
): SubstitutedVariable | null;
export function collapseWhitespace<T extends Token>(token: T): T;

/** Collapses adjacent whitespace down to a single space. Substituted variables which have no value
 * are removed, and whitespace around them is considered adjacent.
 * @param token The token to process. */
export function collapseWhitespace(token: Token): Token | null {
  switch (token.kind) {
    case TokenKind.List:
      return token.transform(items => {
        const words: Token[] = [];
        let lastWasWs = false;
        for (const child of items) {
          if (child.kind === TokenKind.Whitespace) {
            lastWasWs = true;
          } else {
            const next = collapseWhitespace(child);
            if (next !== null) {
              if (lastWasWs && words.length > 0) {
                words.push(new Whitespace(" "));
              }
              lastWasWs = false;
              words.push(next);
            }
          }
        }
        return words;
      });

    case TokenKind.SubstitutedVariable:
      let value = token.value;
      if (value == null) {
        return null;
      } else if (typeof value !== "string") {
        return collapseWhitespace(value);
      }
      value = value.trim().replace(/\s+/g, " ");
      return value === token.value
        ? token
        : new SubstitutedVariable(token.name, value);

    default:
      return token;
  }
}
