import { TokenKind, Token, Variable, VariableAssignment } from "../tokens";
import { Environment } from "../Environment";
import { SubstitutedVariable } from "../tokens/SubstitutedVariable";
import { collapseWhitespace } from "./collapseWhitespace";
import { stringify } from "./stringify";

export function substitute(
  token: Variable,
  env: Environment,
  localVariableAssignment?: boolean
): SubstitutedVariable;
export function substitute<T extends Token>(
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
  token: Token,
  env: Environment,
  inlineAssignment: boolean = false
) {
  switch (token.kind) {
    case TokenKind.List:
      return token.transform(items =>
        items
          .map(child => substitute(child, env, inlineAssignment))
          .filter(<T>(token: T): token is Exclude<T, null> => token !== null)
      );

    case TokenKind.Variable:
      let value: string | null | undefined | Token = env[token.name];
      if (!value) {
        value = token.fallback
          ? substitute(token.fallback, env, inlineAssignment)
          : null;
      }
      return new SubstitutedVariable(token.name, value);

    case TokenKind.VariableAssignment:
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

    case TokenKind.QuotedText:
      return token.transform(contents =>
        contents.map(item =>
          typeof item === "string"
            ? item
            : substitute(item, env, inlineAssignment)
        )
      );

    default:
      return token;
  }
}
