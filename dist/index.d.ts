import { List } from "./tokens";
import { Environment } from "./Environment";
export * from "./tokens";
export { Environment } from "./Environment";
/** Parses the input expression for bash style variables, returning a parse tree. Supports bash
 * style quotes (double and single), and default values.
 * @param expression The input text to parse. Eg: "${NODE_ENV:-${ENV:-prod}}", "My name is $NAME",
 * "And '  quoted' spaces".
 * @returns A parse tree which can be combined with an environment object to generate a string. */
export declare const parse: (expression: string) => List;
/** Replaces environment variables in the input.
 * @param expression The input text. Eg: "${NODE_ENV:-${ENV:-prod}}", "My name is $NAME",
 * "And '  quoted' spaces".
 * @param environment An object containing the environment variables and their values to replace in
 * the expression.
 * @returns A string with all environment variables either replaced, or removed if no value could be
 * substituted. */
export declare const replace: (expression: string, environment: Environment) => string;
