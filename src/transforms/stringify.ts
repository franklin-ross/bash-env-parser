import {
  Variable,
  SubstitutedVariable,
  QuotedString,
  Whitespace,
  VerbatimString,
  Word,
  transformChildren,
  VariableAssignment
} from "../tokens";

/** Variables which have not been substituted are stripped when converting to a string. */
export function stringify(token: Variable): null;
/** Variables which didn't match during substitution are stripped when converting to a string. */
export function stringify(token: SubstitutedVariable): string | null;
/** Converts a token to a string. Whitespace is concatenated verbatim and quoted strings are
 * expanded to their content, without the quotes. Variables which haven't been substituted are
 * stripped. */
export function stringify(token: any): string;

export function stringify(token: any): string | null {
  if (Array.isArray(token)) {
    return transformChildren(token, stringify).join("");
  }

  // Treat variables which haven't been substituted as though they have no value.
  if (token instanceof Variable) return null;

  if (token instanceof SubstitutedVariable) {
    const value = token.value;
    if (value == null) {
      return null;
    } else if (typeof value === "string") {
      return value;
    }
    return stringify(value);
  }

  if (token instanceof VariableAssignment) {
    return `${token.name}=${stringify(token.value) ?? ""}`;
  }

  if (token instanceof QuotedString) {
    return token.contents.reduce<string>((text, next) => {
      if (typeof next === "string") {
        return text + next;
      }
      return text + (stringify(next) ?? "");
    }, "");
  }

  if (
    token instanceof Word ||
    token instanceof VerbatimString ||
    token instanceof Whitespace
  ) {
    return token.contents;
  }

  return null;
}
