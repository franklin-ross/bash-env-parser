import { Token } from "./tokens";

/** Joins consecutive strings in the input, but leaves any tokens.. */
export function collapse(contents: Array<string | Token>) {
  const result: Array<string | Token> = [];
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
