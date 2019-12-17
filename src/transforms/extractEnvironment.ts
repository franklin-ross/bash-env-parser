import { TokenKind, Token } from "../tokens";
import { Environment } from "../Environment";
import { stringify } from "./stringify";
import { collapseWhitespace } from "./collapseWhitespace";
import { substitute } from "./substitute";

/** Assigns any variable assignment tokens into the environment. If their value has not yet been
 * substituted then the environment at that step is used. Note that the usual order for bash is to
 * first substitute all tokens up front, then assign variables. If that ordering is preferred then
 * call @see substitute() on the tree first. */
export function extractEnvironment(
  token: Token,
  env: Environment = {}
): Environment {
  switch (token.kind) {
    case TokenKind.List:
      for (const child of token.items) {
        extractEnvironment(child, env);
      }
      return env;

    case TokenKind.VariableAssignment:
      const substitutedValue = substitute(token.value, env, false);
      const collapsedValue = collapseWhitespace(substitutedValue);
      const stringValue = stringify(collapsedValue);
      env[token.name] = stringValue;
      return env;

    default:
      return env;
  }
}
