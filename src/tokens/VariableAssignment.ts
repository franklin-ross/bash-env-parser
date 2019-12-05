import { TokenKind, VerbatimString, QuotedString, Word, Variable } from ".";

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export class VariableAssignment {
  readonly kind: TokenKind.VariableAssignment = TokenKind.VariableAssignment;
  constructor(
    public readonly name: string,
    public readonly value: VerbatimString | QuotedString | Word | Variable
  ) {}

  /** VariableAssignments should be removed from string results, and surrounding whitespace should
   * collapse. */
  stringify(): null {
    return null;
  }

  toString() {
    return this.name + "=" + this.value.toString();
  }
}
