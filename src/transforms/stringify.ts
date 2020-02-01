import {
  QuotedString,
  Whitespace,
  VerbatimString,
  Word,
  transformChildren,
  VariableAssignment
} from "../tokens";

/** Converts a token to a string. Whitespace is concatenated verbatim and quoted strings are
 * expanded to their content, without the quotes. Variables which haven't been substituted are
 * stripped. */
export function stringify(token: any): string {
  return str(token) ?? "";
}

function str(token: any): string | null | undefined {
  if (typeof token === "string") return token;

  if (Array.isArray(token)) {
    return transformChildren(token, str).join("");
  }

  if (token instanceof VariableAssignment) {
    return `${token.name}=${str(token.value) ?? ""}`;
  }

  if (token instanceof QuotedString) {
    const contents = token.contents ?? "";
    if (typeof contents === "string") return contents;
    let result = "";
    for (const item of contents) {
      result += str(item) ?? "";
    }
    return result;
  }

  if (
    token instanceof Word ||
    token instanceof VerbatimString ||
    token instanceof Whitespace
  ) {
    return token.contents;
  }
}
