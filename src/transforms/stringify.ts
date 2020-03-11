import {
  QuotedString,
  Whitespace,
  VerbatimString,
  Word,
  transformChildren,
  VariableAssignment,
  Token
} from "../tokens";

/** Converts a token to a string. Whitespace is concatenated verbatim and quoted strings are
 * expanded to their content, without the quotes. Variables which haven't been substituted are
 * stripped. */
export function stringify(token: null | Token | readonly Token[]): string {
  return str(token) ?? "";
}

function str(
  token: null | Token | readonly Token[]
): string | null | undefined {
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
    transformChildren(contents, item => {
      result += str(item) ?? "";
      return item;
    });
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
