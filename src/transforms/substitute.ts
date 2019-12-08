import {
  List,
  TokenKind,
  Token,
  QuotedString,
  Variable,
  VariableAssignment
} from "../tokens";
import { Environment } from "../Environment";
import { SubstitutedVariable } from "../tokens/SubstitutedVariable";

export function substitute(
  token: Variable,
  env: Environment
): SubstitutedVariable;
export function substitute<T extends Token>(token: T, env: Environment): T;

/** Returns a new syntax tree with all variable references substituted/expanded. */
export function substitute(token: Token, env: Environment) {
  switch (token.kind) {
    case TokenKind.List:
      return new List(
        token.items
          .map(child => substitute(child, env))
          .filter(<T>(token: T): token is Exclude<T, null> => token !== null)
      );

    case TokenKind.Variable:
      let value: string | null | undefined | Token = env[token.name];
      if (!value) {
        value = token.fallback ? substitute(token.fallback, env) : null;
      }
      return new SubstitutedVariable(token.name, value);

    case TokenKind.VariableAssignment:
      return new VariableAssignment(token.name, substitute(token.value, env));

    case TokenKind.QuotedText:
      return new QuotedString(
        token.contents.map(item =>
          typeof item === "string" ? item : substitute(item, env)
        )
      );

    default:
      return token;
  }
}
