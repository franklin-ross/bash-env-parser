import { TokenKind, VerbatimString, QuotedString, Word, Variable } from ".";
import { Environment } from "..";

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export class VariableAssignment {
  readonly kind: TokenKind.VariableAssignment = TokenKind.VariableAssignment;
  constructor(
    public readonly name: string,
    public readonly value: VerbatimString | QuotedString | Word | Variable
  ) {}

  stringify(env: Environment, collapseWhitespace: boolean = true) {
    return `${this.name}=${this.value.stringify(env, collapseWhitespace)}`;
  }

  toString() {
    return this.name + "=" + this.value.toString();
  }
}
