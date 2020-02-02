import {
  Variable,
  VariableAssignment,
  transformChildren,
  Whitespace,
  Word,
  BuiltinToken,
  VerbatimString
} from "../tokens";
import { Environment } from "../Environment";
import { collapseWhitespace } from "./collapseWhitespace";
import { stringify } from "./stringify";
import { parse as parsePeg } from "../parser.pegjs";

const parseOptions = { startRule: "VariableValue" };
const parseEnvValue = (value: string) =>
  parsePeg(value, parseOptions) as Array<Whitespace | Word>;

export function substitute(
  token: readonly BuiltinToken[],
  env: Environment,
  inlineAssignment?: boolean
): BuiltinToken[];

/** Returns a new syntax tree with all variable references substituted/expanded.
 * @param token The root token to transform.
 * @param env The environment to use for looking up/assigning variables.
 * @param inlineAssignment Whether to set variable assignment tokens into the environment object as
 * they are processed, allowing them to be referenced by later substitutions. Defaults to false. Set
 * to true to enable `cross-env` style variable assignment. If true, the tokens are removed from the
 * resulting tree once assigned. */
export function substitute(
  token: any,
  env: Environment,
  inlineAssignment: boolean = false
) {
  function sub(token: any): any {
    if (token instanceof Variable) {
      const value = env[token.name];
      if (value == null || value === "") {
        return token.fallback ? sub(token.fallback) : null;
      }
      return parseEnvValue(value);
    }

    if (token instanceof VariableAssignment) {
      const substitutedValue = sub(token.value);
      if (inlineAssignment) {
        const collapsedValue = collapseWhitespace(substitutedValue);
        const stringValue = stringify(collapsedValue);
        env[token.name] = stringValue;
        return null;
      }
      return token.withValue(substitutedValue);
    }

    return transformChildren(token, sub);
  }
  return sub(token);
}
