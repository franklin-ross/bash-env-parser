import { Whitespace, Token, transformChildren } from "../tokens";

export function collapseWhitespace(token: null | Whitespace): null;
export function collapseWhitespace(token: Token): Token;
export function collapseWhitespace(token: readonly Token[]): readonly Token[];
export function collapseWhitespace(
  token: null | Token | readonly Token[]
): null | Token | readonly Token[];

/** Collapses adjacent whitespace down to a single space. Only collapses a single level, without
 * recursing into children.
 * @param token The token or array of tokens to process. */
export function collapseWhitespace(
  token: null | Token | readonly Token[]
): null | Token | readonly Token[] {
  if (token == null) return null;
  if (!Array.isArray(token)) {
    return token instanceof Whitespace ? null : token;
  }

  let lastWasWs = false;
  let hasOutput = false;
  return transformChildren(token, child => {
    if (child instanceof Whitespace) {
      lastWasWs = true;
      return null;
    }

    const prefixWs = lastWasWs && hasOutput;
    lastWasWs = false;
    hasOutput = true;
    return prefixWs ? [new Whitespace(" "), child] : child;
  });
}
