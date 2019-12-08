import { Token, TokenKind } from ".";

/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export class Variable {
  readonly kind: TokenKind.Variable = TokenKind.Variable;
  constructor(
    public readonly name: string,
    public readonly fallbackType: null | ":-" | ":=" = null,
    public readonly fallback: null | Token = null
  ) {}
  toString() {
    return (
      "${" + this.name + (this.fallbackType || "") + (this.fallback || "") + "}"
    );
  }
}
