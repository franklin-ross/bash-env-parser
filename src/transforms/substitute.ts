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
  if (token instanceof Variable) {
    let value = env[token.name];
    if (!value) {
      value = token.fallback
        ? substitute(token.fallback, env, inlineAssignment)
        : null;
    }
    return new SubstitutedVariable(token.name, value);
  }

  if (token instanceof VariableAssignment) {
    const substitutedValue = substitute(token.value, env, inlineAssignment);
    const assignment =
      token.value === substitutedValue
        ? token
        : new VariableAssignment(token.name, substitutedValue);
    if (inlineAssignment) {
      const collapsedValue = collapseWhitespace(substitutedValue);
      const stringValue = stringify(collapsedValue);
      env[token.name] = stringValue;
    }
    return assignment;
  }

  return transformChildren(token, t => substitute(t, env, inlineAssignment));
}
