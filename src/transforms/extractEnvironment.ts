import {
  List,
  TokenKind,
  Token,
  VariableAssignment,
  VerbatimString
} from "../tokens";
import { Environment } from "../Environment";
import { stringify } from "./stringify";
import { collapseWhitespace } from "./collapseWhitespace";
import { substitute } from "./substitute";

export function extractEnvironment(
  token: VariableAssignment,
  env: Environment
): null;
export function extractEnvironment<T extends Token>(
  token: T,
  env: Environment
): T;

/** Assigns any variable assignment tokens into the environment. If their value has not yet been
 * substituted then the environment at that step is used. Note that the usual order for bash is to
 * first substitute all tokens up front, then assign variables. If that ordering is preferred then
 * call @see substitute() on the tree first. */
export function extractEnvironment(token: Token, env: Environment): Token {
  switch (token.kind) {
    case TokenKind.List:
      return new List(
        token.items
          .map(child => extractEnvironment(child, env))
          .filter(<T>(token: T): token is Exclude<T, null> => token !== null)
      );

    case TokenKind.VariableAssignment:
      const substitutedValue = substitute(token.value, env);
      const collapsedValue = collapseWhitespace(substitutedValue);
      const stringValue = stringify(collapsedValue);
      const assignment = new VariableAssignment(
        token.name,
        new List([new VerbatimString(stringValue)])
      );
      env[token.name] = stringValue;
      return assignment;

    default:
      return token;
  }
}
