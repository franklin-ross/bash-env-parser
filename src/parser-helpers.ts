import { StringToken, QuotedStringToken, VariableToken } from "./tokens";

/** Because of the way the grammar is structured, variables are wrapped in string tokens. This
 * detects cases of variables wrapped in strings but without significant text around them, and
 * unwraps them. */
export function unwrap(str: StringToken | QuotedStringToken) {
  const contents = str.contents;
  return contents.length === 1 && typeof contents[0] !== "string"
    ? contents[0]
    : str;
}

/** Joins consecutive strings in the input. */
export function join(contents: Array<string | VariableToken>) {
  const result: Array<string | VariableToken> = [];
  let builder = "";
  for (const x of contents) {
    if (typeof x === "string") {
      builder += x;
    } else {
      if (builder.length > 0) {
        result.push(builder);
        builder = "";
      }
      result.push(x);
    }
  }
  if (builder.length > 0) {
    result.push(builder);
  }
  return result;
}
