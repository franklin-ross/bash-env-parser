import { Environment } from "./Environment";
import { parse as parsePeg } from "./parser.pegjs";
import { substitute, collapseWhitespace, stringify } from "./transforms";
import { BuiltinToken } from "./tokens";

export * from "./tokens";
export * from "./transforms";
export { Environment } from "./Environment";

/** Parses the input expression for bash style variables, returning a parse tree. Supports bash
 * style quotes (double and single), and default values.
 * @param expression The input text to parse. Eg: "${NODE_ENV:-${ENV:-prod}}", "My name is $NAME",
 * "And '  quoted' spaces".
 * @returns The parse tree representing the input. */
export const parse = (expression: string) =>
  parsePeg(expression) as ReadonlyArray<BuiltinToken>;

/** Replaces environment variables in the input.
 * @param expression The input text. Eg: "${NODE_ENV:-${ENV:-prod}}", "My name is $NAME",
 * "And '  quoted' spaces".
 * @param environment An object containing the environment variables and their values to replace in
 * the expression.
 * @returns A string with all environment variables either replaced, or removed if no value could be
 * substituted. Adjacent whitespace is collapsed down to a single space unless quoted. */
export const replace = (expression: string, environment: Environment) => {
  const parsed: ReadonlyArray<BuiltinToken> = parsePeg(expression);
  const substituted = substitute(parsed, environment);
  const collapsed = collapseWhitespace(substituted);
  return stringify(collapsed);
};
