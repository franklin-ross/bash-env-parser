import { TokenKind, List } from ".";

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export class VariableAssignment {
  readonly kind: TokenKind.VariableAssignment = TokenKind.VariableAssignment;
  constructor(public readonly name: string, public readonly value: List) {}

  toString() {
    return this.name + "=" + this.value.toString();
  }
}
