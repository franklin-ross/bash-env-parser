import { Variable, VariableAssignment, transformChildren } from "../tokens";
import { Environment } from "../Environment";
import { SubstitutedVariable } from "../tokens/SubstitutedVariable";
import { collapseWhitespace } from "./collapseWhitespace";
import { stringify } from "./stringify";

export function substitute(
  token: Variable,
  env: Environment,
  localVariableAssignment?: boolean
): SubstitutedVariable;
export function substitute<T>(
  token: T,
  env: Environment,
  localVariableAssignment?: boolean
): T;

/** Returns a new syntax tree with all variable references substituted/expanded.
 * @param token The root token to transform.
 * @param env The environment to use for looking up/assigning variables.
 * @param inlineAssignment Whether to set variable assignment tokens into the environment object as
 * they are processed, allowing them to be referenced by later substitutions. Defaults to false. Set
 * to true to enable `cross-env` style variable assignment. */
export function substitute(
  token: any,
  env: Environment,
  inlineAssignment: boolean = false
) {
  function sub(token: any): any {
    if (token instanceof Variable) {
      let value = env[token.name];
      if (value == null || value === "") {
        value = token.fallback ? sub(token.fallback) : null;
      }
      return token.substitute(value);
    }

    if (token instanceof VariableAssignment) {
      const substitutedValue = sub(token.value);
      const assignment = token.withValue(substitutedValue);
      if (inlineAssignment) {
        const collapsedValue = collapseWhitespace(substitutedValue);
        const stringValue = stringify(collapsedValue);
        env[token.name] = stringValue;
      }
      return assignment;
    }

    return transformChildren(token, sub);
  }
  return sub(token);
}
