import { TokenKind } from "./TokenKind";
import { Environment } from "../Environment";
import { Token } from ".";
/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export class Variable {
  readonly kind: TokenKind.Variable = TokenKind.Variable;
  constructor(
    public readonly name: string,
    public readonly fallbackType: null | ":-" | ":=" = null,
    public readonly fallback: null | Token = null
  ) {}
  stringify(
    env: Environment,
    collapseWhitespace: boolean = true
  ): null | string {
    const value = env[this.name];
    if (!value) {
      if (this.fallback) {
        return this.fallback.stringify(env, collapseWhitespace);
      } else {
        return null;
      }
    }
    return collapseWhitespace ? value.trim().replace(/\s+/g, " ") : value;
  }
  toString() {
    return (
      "${" + this.name + (this.fallbackType || "") + (this.fallback || "") + "}"
    );
  }
}
