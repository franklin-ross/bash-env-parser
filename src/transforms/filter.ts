import { transformChildren, Token } from "../tokens";

/** Returns a new tree with any matching tokens removed. */
export function filter(
  token: Token | readonly Token[],
  shouldRemove: (token: Token) => boolean
): Token | readonly Token[] {
  return Array.isArray(token)
    ? transformChildren(token, strip)
    : strip(token as Token);

  function strip(t: Token) {
    if (shouldRemove(t)) return null;
    return transformChildren(t, strip);
  }
}
