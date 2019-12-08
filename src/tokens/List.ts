import {
  TokenKind,
  Variable,
  QuotedString,
  VerbatimString,
  Word,
  Whitespace,
  SubstitutedVariable,
  VariableAssignment
} from ".";

/** The types of token allowed in a List. */
export type ListItem =
  | Variable
  | SubstitutedVariable
  | VariableAssignment
  | Word
  | QuotedString
  | VerbatimString
  | Whitespace;

/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
export class List {
  readonly kind: TokenKind.List = TokenKind.List;
  constructor(public readonly items: ReadonlyArray<ListItem>) {}
  toString() {
    return `[${this.items}]`;
  }
}
