import {
  Variable,
  VariableAssignment,
  transformChildren,
  Whitespace,
  Word
} from "../tokens";
import { Environment } from "../Environment";
import { collapseWhitespace } from "./collapseWhitespace";
import { stringify } from "./stringify";
import { parse as parsePeg } from "../parser.pegjs";

const parseOptions = { startRule: "VariableValue" };
const parseEnvValue = (value: string) => {
  return parsePeg(value, parseOptions) as Array<Whitespace | Word>;
};

/** Returns a new syntax tree with all variable references substituted/expanded.
 * @param token The root token to transform.
 * @param env The environment to use for looking up/assigning variables.
 * @param inlineAssignment Whether to set variable assignment tokens into the environment object as
 * they are processed, allowing them to be referenced by later substitutions. Defaults to false. Set
 * to true to enable `cross-env` style variable assignment. */
export function substitute<T>(
  token: any,
  env: Environment,
  inlineAssignment: boolean = false
): T {
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
      }
      return token.withValue(substitutedValue);
    }

    return transformChildren(token, sub);
  }
  return sub(token);
}
