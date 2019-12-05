import { TokenKind, List } from ".";
import { Environment } from "..";

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export class VariableAssignment {
  readonly kind: TokenKind.VariableAssignment = TokenKind.VariableAssignment;
  constructor(public readonly name: string, public readonly value: List) {}

  stringify(env: Environment, collapseWhitespace: boolean = true) {
    return `${this.name}=${this.value.stringify(env, collapseWhitespace)}`;
  }

  toString() {
    return this.name + "=" + this.value.toString();
  }
}
