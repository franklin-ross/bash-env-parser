import { Whitespace, SubstitutedVariable, transformChildren } from "../tokens";

export function collapseWhitespace(
  token: SubstitutedVariable
): SubstitutedVariable | null;
export function collapseWhitespace(token: Whitespace): Whitespace | null;
export function collapseWhitespace<T>(token: T): T;

/** Collapses adjacent whitespace down to a single space. Substituted variables which have no value
 * are removed, and whitespace around them is considered adjacent.
 * @param token The token to process. */
export function collapseWhitespace(token: any): any {
  if (Array.isArray(token)) {
    let lastWasWs = false;
    let hasOutput = false;
    return transformChildren(token, child => {
      if (child instanceof Whitespace) {
        lastWasWs = true;
        return;
      }

      const next = collapseWhitespace(child);
      if (next == null) return;
      const prefixWs = lastWasWs && hasOutput;
      lastWasWs = false;
      hasOutput = true;
      return prefixWs ? [new Whitespace(" "), next] : next;
    });
  }

  if (token instanceof SubstitutedVariable) {
    const value = token.value;
    if (typeof value === "string") {
      const collapsed = value.trim().replace(/\s+/g, " ");
      return collapsed === value
        ? token
        : new SubstitutedVariable(token.name, collapsed);
    }
    return collapseWhitespace(value);
  }

  return token;
}
