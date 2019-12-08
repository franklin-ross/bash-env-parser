import { TokenKind, List, VerbatimString, QuotedString, Word } from ".";
import { Variable } from "./Variable";

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export class VariableAssignment {
  readonly kind: TokenKind.VariableAssignment = TokenKind.VariableAssignment;
  constructor(
    public readonly name: string,
    public readonly value:
      | List
      | Word
      | VerbatimString
      | QuotedString
      | Variable
  ) {}

  toString() {
    return this.name + "=" + this.value.toString();
  }
}
